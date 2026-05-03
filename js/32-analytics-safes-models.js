(() => {
  const UNCATEGORIZED_ID = "__uncategorized__";

  function toNumber(value) {
    if (value === null || value === undefined || value === "") return 0;

    if (typeof value === "number") return Number.isFinite(value) ? value : 0;

    const normalized = String(value)
      .replace(/\s/g, "")
      .replace(",", ".");

    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function fallbackFormatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} ₽`;
  }

  function fallbackEscapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getCurrentMonthValue() {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  function getDateFromMonthValue(monthValue) {
    const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);

    if (!match) {
      return new Date();
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1);
  }

  function getMonthValueFromDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }

  function getPreviousMonthValue(monthValue) {
    const date = getDateFromMonthValue(monthValue);

    return getMonthValueFromDate(
      new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }

  function getMonthDays(selectedMonth) {
    const date = getDateFromMonthValue(selectedMonth);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) {
      return {
        elapsedDays: daysInMonth,
        remainingDays: 0,
        daysInMonth,
      };
    }

    if (selectedMonth > currentMonth) {
      return {
        elapsedDays: 0,
        remainingDays: daysInMonth,
        daysInMonth,
      };
    }

    const today = new Date().getDate();

    return {
      elapsedDays: Math.min(daysInMonth, Math.max(1, today)),
      remainingDays: Math.max(0, daysInMonth - today),
      daysInMonth,
    };
  }

  function getTransactionDateKey(transaction) {
    const rawValue =
      transaction.date ||
      transaction.transaction_date ||
      transaction.operation_date ||
      transaction.created_date ||
      transaction.created_at ||
      transaction.createdAt ||
      "";

    if (!rawValue) return "";

    const rawText = String(rawValue);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return rawText.slice(0, 10);
    }

    const parsedDate = new Date(rawText);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;
  }

  function getMonthTransactions(state, selectedMonth) {
    return (state.transactions || []).filter((transaction) => {
      const dateKey = getTransactionDateKey(transaction);

      return dateKey.slice(0, 7) === selectedMonth;
    });
  }

  function getCategoryId(transaction) {
    return (
      transaction.category_id ||
      transaction.categoryId ||
      transaction.category ||
      UNCATEGORIZED_ID
    );
  }

  function getCategories(state) {
    return (
      state.categories ||
      state.expenseCategories ||
      state.budgetCategories ||
      []
    );
  }

  function getCategoryById(state, categoryId) {
    return getCategories(state).find((category) => {
      return String(category.id) === String(categoryId);
    }) || null;
  }

    function getBudgetLimits(state) {
    return (
      state.budgetLimits ||
      state.budget_limits ||
      state.categoryBudgetLimits ||
      []
    );
  }

  function getBudgetLimitAmountFromItem(item) {
    if (!item) return 0;

    return toNumber(
      item.amount ??
      item.limit_amount ??
      item.limitAmount ??
      item.budget_amount ??
      item.budgetAmount ??
      item.monthly_amount ??
      item.monthlyAmount ??
      item.monthly_limit ??
      item.monthlyLimit ??
      item.budget_limit ??
      item.budgetLimit ??
      item.limit ??
      item.value ??
      0
    );
  }

  function getBudgetLimitCategoryId(item) {
    if (!item) return "";

    return (
      item.category_id ||
      item.categoryId ||
      item.category ||
      item.expense_category_id ||
      item.expenseCategoryId ||
      ""
    );
  }

  function getBudgetLimitFromCategory(category) {
    if (!category) return 0;

    return toNumber(
      category.budget_limit ??
      category.budgetLimit ??
      category.monthly_limit ??
      category.monthlyLimit ??
      category.limit ??
      category.amount_limit ??
      category.amountLimit ??
      category.budget ??
      category.plan ??
      category.month_limit ??
      category.monthLimit ??
      0
    );
  }

  function getBudgetLimitForCategory(state, categoryId) {
    const fromBudgetLimits = getBudgetLimits(state).find((item) => {
      return String(getBudgetLimitCategoryId(item)) === String(categoryId);
    });

    const budgetLimitAmount = getBudgetLimitAmountFromItem(fromBudgetLimits);

    if (budgetLimitAmount > 0) {
      return budgetLimitAmount;
    }

    const category = getCategoryById(state, categoryId);

    return getBudgetLimitFromCategory(category);
  }

  function getPaymentStartMonth(payment) {
    return (
      payment.start_period ||
      payment.startPeriod ||
      payment.start_month ||
      payment.startMonth ||
      ""
    );
  }

  function getPaymentPaidPeriods(payment) {
    if (Array.isArray(payment.paid_periods)) return payment.paid_periods;
    if (Array.isArray(payment.paidPeriods)) return payment.paidPeriods;

    return [];
  }

  function isPaymentEnabled(payment) {
    return payment.enabled !== false;
  }

  function isPaymentStarted(payment, selectedMonth) {
    const startMonth = getPaymentStartMonth(payment);

    if (!startMonth) return true;

    return startMonth <= selectedMonth;
  }

  function isCalendarPaymentTransaction(transaction, paymentId, selectedMonth) {
    const transactionPaymentId =
      transaction.calendar_payment_id ||
      transaction.mandatory_payment_id ||
      transaction.source_id ||
      "";

    const transactionPeriod =
      transaction.calendar_payment_period ||
      transaction.mandatory_payment_period ||
      "";

    const transactionMonth = getTransactionDateKey(transaction).slice(0, 7);

    const source =
      transaction.source ||
      transaction.source_type ||
      transaction.sourceType ||
      "";

    const isCalendarSource =
      source === "calendar_payment" ||
      source === "mandatory_payment" ||
      Boolean(transaction.calendar_payment_id) ||
      Boolean(transaction.mandatory_payment_id);

    if (!isCalendarSource) return false;
    if (String(transactionPaymentId) !== String(paymentId)) return false;

    if (transactionPeriod) {
      return transactionPeriod === selectedMonth;
    }

    return transactionMonth === selectedMonth;
  }

  function isPaymentPaidForMonth(payment, selectedMonth, monthTransactions) {
    const paidPeriods = getPaymentPaidPeriods(payment);

    if (paidPeriods.includes(selectedMonth)) return true;

    return monthTransactions.some((transaction) => {
      return isCalendarPaymentTransaction(transaction, payment.id, selectedMonth);
    });
  }

  function getCalendarReservedAmount(state, selectedMonth, monthTransactions) {
    const payments = state.mandatoryPayments || state.calendarPayments || [];

    let reserved = 0;

    payments.forEach((payment) => {
      if (!isPaymentEnabled(payment)) return;
      if (!isPaymentStarted(payment, selectedMonth)) return;
      if (isPaymentPaidForMonth(payment, selectedMonth, monthTransactions)) return;

      const amount = toNumber(payment.amount);

      if (amount > 0) {
        reserved += amount;
      }
    });

    return roundToTwo(reserved);
  }

  function getMonthProgressPercent(selectedMonth) {
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) return 100;
    if (selectedMonth > currentMonth) return 0;

    const { elapsedDays, daysInMonth } = getMonthDays(selectedMonth);

    return Math.min(100, Math.max(1, Math.round((elapsedDays / daysInMonth) * 100)));
  }

  function getPercent(value, base) {
    if (base <= 0) return 0;

    return Math.round((value / base) * 100);
  }

  function buildFlexibleForecast({
    state,
    selectedMonth,
    currentMonthTransactions,
    previousMonthTransactions,
    isRequiredCategory,
  }) {
    const selectedIsPast = selectedMonth < getCurrentMonthValue();

    if (selectedIsPast) {
      return {
        total: 0,
        limitedRest: 0,
        historyRest: 0,
        paceRest: 0,
        currentFlexibleSpent: 0,
        currentFlexibleLimitedSpent: 0,
        currentFlexibleNoLimitSpent: 0,
        previousFlexibleNoLimitSpent: 0,
      };
    }

    const { elapsedDays, remainingDays } = getMonthDays(selectedMonth);

    const currentFlexibleByCategory = new Map();
    const previousFlexibleByCategory = new Map();

    function collectFlexibleExpense(map, transaction) {
      const type = String(transaction.type || "").toLowerCase();

      if (type !== "expense") return;

      const categoryId = getCategoryId(transaction);
      const required =
        typeof isRequiredCategory === "function"
          ? isRequiredCategory(categoryId)
          : false;

      if (required) return;

      const amount = toNumber(transaction.amount);

      if (amount <= 0) return;

      map.set(categoryId, roundToTwo((map.get(categoryId) || 0) + amount));
    }

    currentMonthTransactions.forEach((transaction) => {
      collectFlexibleExpense(currentFlexibleByCategory, transaction);
    });

    previousMonthTransactions.forEach((transaction) => {
      collectFlexibleExpense(previousFlexibleByCategory, transaction);
    });

        const categoryIds = new Set([
      ...currentFlexibleByCategory.keys(),
      ...previousFlexibleByCategory.keys(),
      ...getCategories(state).map((category) => category.id),
      ...getBudgetLimits(state).map((item) => getBudgetLimitCategoryId(item)),
    ]);

    let limitedRest = 0;
    let historyRest = 0;
    let paceBaseCurrentNoLimitSpent = 0;

    let currentFlexibleSpent = 0;
    let currentFlexibleLimitedSpent = 0;
    let currentFlexibleNoLimitSpent = 0;
    let previousFlexibleNoLimitSpent = 0;

    categoryIds.forEach((categoryId) => {
      const currentSpent = toNumber(currentFlexibleByCategory.get(categoryId));
      const previousSpent = toNumber(previousFlexibleByCategory.get(categoryId));
            const limit = getBudgetLimitForCategory(state, categoryId);

      if (currentSpent > 0) {
        currentFlexibleSpent += currentSpent;
      }

      if (limit > 0) {
        currentFlexibleLimitedSpent += currentSpent;
        limitedRest += Math.max(0, limit - currentSpent);
        return;
      }

      currentFlexibleNoLimitSpent += currentSpent;
      previousFlexibleNoLimitSpent += previousSpent;

      if (previousSpent > 0) {
        historyRest += Math.max(0, previousSpent - currentSpent);
      } else {
        paceBaseCurrentNoLimitSpent += currentSpent;
      }
    });

    const paceRest =
      elapsedDays > 0 && remainingDays > 0
        ? (paceBaseCurrentNoLimitSpent / elapsedDays) * remainingDays
        : 0;

    return {
      total: roundToTwo(limitedRest + historyRest + paceRest),
      limitedRest: roundToTwo(limitedRest),
      historyRest: roundToTwo(historyRest),
      paceRest: roundToTwo(paceRest),
      currentFlexibleSpent: roundToTwo(currentFlexibleSpent),
      currentFlexibleLimitedSpent: roundToTwo(currentFlexibleLimitedSpent),
      currentFlexibleNoLimitSpent: roundToTwo(currentFlexibleNoLimitSpent),
      previousFlexibleNoLimitSpent: roundToTwo(previousFlexibleNoLimitSpent),
    };
  }

  function getMonthStats(state, selectedMonth, isRequiredCategory) {
    const monthTransactions = getMonthTransactions(state, selectedMonth);
    const previousMonth = getPreviousMonthValue(selectedMonth);
    const previousMonthTransactions = getMonthTransactions(state, previousMonth);

    const calendarReserve = getCalendarReservedAmount(
      state,
      selectedMonth,
      monthTransactions
    );

    let income = 0;
    let requiredFactExpense = 0;
    let flexibleExpense = 0;

    monthTransactions.forEach((transaction) => {
      const amount = toNumber(transaction.amount);
      const type = String(transaction.type || "").toLowerCase();

      if (type === "income") {
        income += amount;
        return;
      }

      if (type !== "expense") return;

      const categoryId = getCategoryId(transaction);
      const required =
        typeof isRequiredCategory === "function"
          ? isRequiredCategory(categoryId)
          : false;

      if (required) {
        requiredFactExpense += amount;
      } else {
        flexibleExpense += amount;
      }
    });

    const flexibleForecast = buildFlexibleForecast({
      state,
      selectedMonth,
      currentMonthTransactions: monthTransactions,
      previousMonthTransactions,
      isRequiredCategory,
    });

    const totalFactExpense = requiredFactExpense + flexibleExpense;

    const forecastLeft =
      income -
      totalFactExpense -
      calendarReserve -
      flexibleForecast.total;

    return {
      income: roundToTwo(income),
      requiredFactExpense: roundToTwo(requiredFactExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
      totalFactExpense: roundToTwo(totalFactExpense),
      calendarReserve: roundToTwo(calendarReserve),
      flexibleForecastRest: roundToTwo(flexibleForecast.total),
      flexibleForecast,
      forecastLeft: roundToTwo(forecastLeft),
    };
  }

  function formatSignedMoney(value, formatMoney) {
    const amount = roundToTwo(value);

    if (amount > 0) return `+${formatMoney(amount)}`;
    if (amount < 0) return `−${formatMoney(Math.abs(amount))}`;

    return formatMoney(0);
  }

  function getForecastStatus(stats) {
    if (stats.income <= 0) {
      return {
        status: "warn",
        title: "Ждём доход",
        text: "После операции “Доход” прогноз станет полезнее.",
      };
    }

    if (stats.forecastLeft < 0) {
      return {
        status: "bad",
        title: "Не хватает",
        text: "Расходы и календарные платежи уже давят на месяц.",
      };
    }

    if (stats.forecastLeft <= stats.income * 0.05) {
      return {
        status: "warn",
        title: "Почти в ноль",
        text: "Месяц сходится, но запас тонкий.",
      };
    }

    return {
      status: "good",
      title: "Есть запас",
      text: "Месяц выглядит живым по текущим данным.",
    };
  }

  function getPaceStatus(stats, selectedMonth) {
    if (stats.income <= 0) {
      return {
        status: "muted",
        title: "Ждём доход",
        text: "После операции “Доход” появится темп месяца.",
      };
    }

    if (selectedMonth > getCurrentMonthValue()) {
      return {
        status: "muted",
        title: "Месяц впереди",
        text: "Темп появится, когда выбранный месяц начнётся.",
      };
    }

    const monthProgress = getMonthProgressPercent(selectedMonth);
    const occupiedPercent = getPercent(
      stats.totalFactExpense + stats.calendarReserve,
      stats.income
    );

    if (occupiedPercent > monthProgress + 12) {
      return {
        status: "bad",
        title: "Расходы впереди",
        text: `Прошло ${monthProgress}% месяца, занято ${occupiedPercent}% дохода.`,
      };
    }

    if (occupiedPercent > monthProgress + 5) {
      return {
        status: "warn",
        title: "На грани",
        text: `Прошло ${monthProgress}% месяца, занято ${occupiedPercent}% дохода.`,
      };
    }

    return {
      status: "good",
      title: "Темп нормальный",
      text: `Прошло ${monthProgress}% месяца, занято ${occupiedPercent}% дохода.`,
    };
  }

    function getForecastRingSegments(stats) {
    const flexibleForecast = stats.flexibleForecast || {};
    const irregularFlexible =
      toNumber(flexibleForecast.historyRest) + toNumber(flexibleForecast.paceRest);

    const occupied =
      stats.totalFactExpense +
      stats.calendarReserve +
      toNumber(flexibleForecast.limitedRest) +
      irregularFlexible;

    const free = Math.max(0, stats.income - occupied);
    const base = Math.max(stats.income, occupied, 1);

    return {
      occupied: roundToTwo(occupied),
      free: roundToTwo(free),
      deficit: roundToTwo(Math.max(0, occupied - stats.income)),
      base,
      items: [
        {
          key: "spent",
          label: "Уже потрачено",
          value: roundToTwo(stats.totalFactExpense),
          note: `Факт расходов месяца: обязательные ${roundToTwo(stats.requiredFactExpense)} ₽ + гибкие ${roundToTwo(stats.flexibleExpense)} ₽`,
          color: "rgba(239, 91, 79, 0.88)",
        },
        {
          key: "calendar",
          label: "Календарь",
          value: roundToTwo(stats.calendarReserve),
          note: "Неоплаченные календарные платежи",
          color: "rgba(242, 165, 26, 0.88)",
        },
        {
          key: "planned",
          label: "План гибких",
          value: roundToTwo(flexibleForecast.limitedRest || 0),
          note: "Остаток лимитов по гибким категориям",
          color: "rgba(47, 125, 246, 0.86)",
        },
        {
          key: "irregular",
          label: "Нерегулярные",
          value: roundToTwo(irregularFlexible),
          note: "Гибкие без лимита, ориентир по прошлому месяцу",
          color: "rgba(139, 92, 246, 0.82)",
        },
        {
          key: "free",
          label: "Свободно",
          value: roundToTwo(free),
          note: "Останется после прогноза",
          color: "rgba(21, 151, 107, 0.86)",
        },
      ].filter((item) => item.value > 0),
    };
  }

  function buildForecastRingGradient(items, base) {
    let cursor = 0;

    const parts = items.map((item) => {
      const size = Math.max(0, (item.value / base) * 100);
      const start = cursor;
      const end = Math.min(100, cursor + size);

      cursor = end;

      return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    });

    if (cursor < 100) {
      parts.push(`rgba(20, 24, 33, 0.075) ${cursor.toFixed(2)}% 100%`);
    }

    return `conic-gradient(${parts.join(", ")})`;
  }

  function renderForecastCard(stats, helpers) {
    const { formatMoney } = helpers;
    const forecast = getForecastStatus(stats);
    const ring = getForecastRingSegments(stats);
    const ringGradient = buildForecastRingGradient(ring.items, ring.base);
    const resultLabel = stats.forecastLeft < 0 ? "не хватает" : "останется";
    const occupiedPercent = stats.income > 0
      ? Math.round((ring.occupied / stats.income) * 100)
      : 0;

    const resultText = stats.forecastLeft < 0
      ? `Дохода не хватает на ${formatMoney(ring.deficit)}.`
      : `После всех учтённых расходов останется ${formatMoney(ring.free)}.`;

    return `
      <article class="analytics-forecast-ring-card analytics-forecast-ring-card--${forecast.status}">
        <div class="analytics-forecast-ring-card__head">
          <div>
            <h3>Прогноз месяца</h3>
            <p>${resultText}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${forecast.title}
          </div>
        </div>

        <div class="analytics-forecast-ring-layout">
          <div
            class="analytics-forecast-ring"
            style="--forecast-ring-gradient: ${ringGradient};"
            aria-hidden="true"
          >
            <div class="analytics-forecast-ring__center">
              <span>${resultLabel}</span>
              <strong>${formatSignedMoney(stats.forecastLeft, formatMoney)}</strong>
            </div>
          </div>

          <div class="analytics-forecast-ring-summary">
            <div>
              <span>Доход</span>
              <strong>${formatMoney(stats.income)}</strong>
            </div>

            <div>
              <span>Занято</span>
              <strong>${formatMoney(ring.occupied)}</strong>
            </div>

            <div>
              <span>Нагрузка</span>
              <strong>${occupiedPercent}%</strong>
            </div>
          </div>
        </div>

        <div class="analytics-forecast-ring-list">
          ${ring.items
            .map((item) => {
              return `
                <div class="analytics-forecast-ring-row analytics-forecast-ring-row--${item.key}">
                  <span class="analytics-forecast-ring-row__dot" style="--dot-color: ${item.color};"></span>

                  <div class="analytics-forecast-ring-row__body">
                    <div class="analytics-forecast-ring-row__top">
                      <span>${item.label}</span>
                      <strong>${formatMoney(item.value)}</strong>
                    </div>

                    <p>${item.note}</p>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>
    `;
  }

  function renderProgressCard(stats, selectedMonth) {
    const pace = getPaceStatus(stats, selectedMonth);
    const monthProgress = getMonthProgressPercent(selectedMonth);

    const occupiedPercent =
      stats.income > 0
        ? getPercent(stats.totalFactExpense + stats.calendarReserve, stats.income)
        : 0;

    const occupiedWidth = Math.min(100, Math.max(0, occupiedPercent));

    return `
      <section class="analytics-savings-card analytics-savings-pace-card analytics-savings-pace-card--${pace.status}">
        <div class="analytics-savings-card__head">
          <div>
            <h3>Темп месяца</h3>
            <p>${pace.text}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${pace.title}
          </div>
        </div>

        <div class="analytics-savings-pace-card__bars">
          <div class="analytics-savings-pace-line">
            <div class="analytics-savings-pace-line__top">
              <span>Прошло месяца</span>
              <strong>${monthProgress}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${monthProgress}%"></i>
            </div>
          </div>

          <div class="analytics-savings-pace-line analytics-savings-pace-line--spent">
            <div class="analytics-savings-pace-line__top">
              <span>Занято дохода</span>
              <strong>${occupiedPercent}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${occupiedWidth}%"></i>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAnalyticsSafeModels({
    state,
    selectedMonth,
    isRequiredCategory,
    formatMoney,
    escapeHtml,
  }) {
    const container = document.getElementById("analyticsSafeModelsList");

    if (!container) return;

    const helpers = {
      formatMoney: typeof formatMoney === "function" ? formatMoney : fallbackFormatMoney,
      escapeHtml: typeof escapeHtml === "function" ? escapeHtml : fallbackEscapeHtml,
    };

    const monthValue = selectedMonth || getCurrentMonthValue();
    const stats = getMonthStats(state, monthValue, isRequiredCategory);

    container.innerHTML = `
      <div class="analytics-savings-dashboard">
        ${renderForecastCard(stats, helpers)}
        ${renderProgressCard(stats, monthValue)}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();