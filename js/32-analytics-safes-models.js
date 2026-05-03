(() => {
  const UNCATEGORIZED_ID = "__uncategorized__";

  function toNumber(value) {
    return Number(value) || 0;
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
    return transaction.category_id || transaction.categoryId || UNCATEGORIZED_ID;
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

  function getMonthStats(state, selectedMonth, isRequiredCategory) {
    const monthTransactions = getMonthTransactions(state, selectedMonth);
    const calendarReserve = getCalendarReservedAmount(state, selectedMonth, monthTransactions);
    const { elapsedDays, remainingDays } = getMonthDays(selectedMonth);

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

    const totalFactExpense = requiredFactExpense + flexibleExpense;
    const averageFlexiblePerDay = elapsedDays > 0 ? flexibleExpense / elapsedDays : 0;

    const flexibleForecastRest =
      selectedMonth === getCurrentMonthValue()
        ? averageFlexiblePerDay * remainingDays
        : 0;

    const forecastLeft =
      income -
      totalFactExpense -
      calendarReserve -
      flexibleForecastRest;

    return {
      income: roundToTwo(income),
      requiredFactExpense: roundToTwo(requiredFactExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
      totalFactExpense: roundToTwo(totalFactExpense),
      calendarReserve: roundToTwo(calendarReserve),
      flexibleForecastRest: roundToTwo(flexibleForecastRest),
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

  function renderForecastCard(stats, helpers) {
    const { formatMoney } = helpers;
    const forecast = getForecastStatus(stats);

    const rows = [
      {
        label: "Доходы",
        value: formatMoney(stats.income),
      },
      {
        label: "Уже потрачено",
        value: formatMoney(stats.totalFactExpense),
        detail: `Обязательные: ${formatMoney(stats.requiredFactExpense)} · гибкие: ${formatMoney(stats.flexibleExpense)}`,
      },
      {
        label: "Календарь впереди",
        value: formatMoney(stats.calendarReserve),
        detail: "Неоплаченные календарные платежи месяца",
      },
      {
        label: "Гибкие до конца месяца",
        value: formatMoney(stats.flexibleForecastRest),
        detail: "Прогноз по текущему темпу гибких расходов",
      },
    ];

    return `
      <article class="analytics-savings-scenario-card analytics-savings-scenario-card--${forecast.status}">
        <div class="analytics-savings-scenario-card__top">
          <div>
            <h4>Прогноз остатка</h4>
            <p>${forecast.text}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${forecast.title}
          </div>
        </div>

        <div class="analytics-savings-scenario-card__result">
          <span>Останется к концу месяца</span>
          <strong>${formatSignedMoney(stats.forecastLeft, formatMoney)}</strong>
        </div>

        <div class="analytics-savings-scenario-card__rows">
          ${rows
            .map((row) => {
              return `
                <div>
                  <span>${row.label}</span>
                  <strong>${row.value}</strong>
                  ${row.detail ? `<em>${row.detail}</em>` : ""}
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