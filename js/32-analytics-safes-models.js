(() => {
  const BUDGET_MODELS = [
    {
      id: "classic",
      title: "50 / 30 / 20",
      subtitle: "Классика",
      required: 0.5,
      flexible: 0.3,
      reserve: 0.2,
    },
    {
      id: "soft",
      title: "60 / 25 / 15",
      subtitle: "Мягкий режим",
      required: 0.6,
      flexible: 0.25,
      reserve: 0.15,
    },
    {
      id: "hard",
      title: "50 / 20 / 30",
      subtitle: "Жёсткий режим",
      required: 0.5,
      flexible: 0.2,
      reserve: 0.3,
    },
  ];

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
    return String(value)
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

  function getCategoryId(transaction) {
    return transaction.category_id || transaction.categoryId || UNCATEGORIZED_ID;
  }

  function getMonthTransactions(state, selectedMonth) {
    return (state.transactions || []).filter((transaction) => {
      const dateKey = getTransactionDateKey(transaction);

      return dateKey.slice(0, 7) === selectedMonth;
    });
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

    if (paidPeriods.includes(selectedMonth)) {
      return true;
    }

    return monthTransactions.some((transaction) => {
      return isCalendarPaymentTransaction(transaction, payment.id, selectedMonth);
    });
  }

  function getCalendarReservedAmount(state, selectedMonth, monthTransactions) {
    const payments = state.mandatoryPayments || state.calendarPayments || [];

    let reserved = 0;
    const items = [];

    payments.forEach((payment) => {
      if (!isPaymentEnabled(payment)) return;
      if (!isPaymentStarted(payment, selectedMonth)) return;

      const alreadyPaid = isPaymentPaidForMonth(payment, selectedMonth, monthTransactions);

      if (alreadyPaid) return;

      const amount = toNumber(payment.amount);

      if (amount <= 0) return;

      reserved += amount;

      items.push({
        id: payment.id,
        title: payment.title || "Календарный платёж",
        amount,
      });
    });

    return {
      amount: roundToTwo(reserved),
      items,
    };
  }

  function getMonthProgressPercent(selectedMonth) {
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) return 100;
    if (selectedMonth > currentMonth) return 0;

    const now = new Date();
    const currentDay = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    return Math.min(100, Math.max(1, Math.round((currentDay / daysInMonth) * 100)));
  }

  function getPercent(value, base) {
    if (base <= 0) return 0;

    return Math.round((value / base) * 100);
  }

  function getBarWidth(value, base) {
    if (base <= 0) return 0;

    return Math.min(100, Math.max(0, (value / base) * 100));
  }

  function getMonthStats(state, selectedMonth, isRequiredCategory) {
    const monthTransactions = getMonthTransactions(state, selectedMonth);
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

      if (type !== "expense") {
        return;
      }

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

    const requiredTotal = requiredFactExpense + calendarReserve.amount;
    const totalExpenseAndReserve = requiredTotal + flexibleExpense;

    return {
      income: roundToTwo(income),

      requiredFactExpense: roundToTwo(requiredFactExpense),
      calendarReserve: roundToTwo(calendarReserve.amount),
      calendarReserveItems: calendarReserve.items,

      requiredExpense: roundToTwo(requiredTotal),
      flexibleExpense: roundToTwo(flexibleExpense),

      totalExpense: roundToTwo(requiredFactExpense + flexibleExpense),
      totalExpenseAndReserve: roundToTwo(totalExpenseAndReserve),
      remainingAfterExpenses: roundToTwo(income - totalExpenseAndReserve),
    };
  }

  function getStatusLabel(status) {
    if (status === "plan") return "План месяца";
    if (status === "good") return "Влезает";
    if (status === "warn") return "На грани";
    if (status === "bad") return "Не сходится";

    return "Нет дохода";
  }

  function formatSignedMoney(value, formatMoney) {
    const amount = roundToTwo(value);

    if (amount > 0) return `+${formatMoney(amount)}`;
    if (amount < 0) return `−${formatMoney(Math.abs(amount))}`;

    return formatMoney(0);
  }

  function getScenarioStatus({
    income,
    requiredDelta,
    flexibleDelta,
    remainingAfterReserve,
    hasAnyFactOrReserve,
  }) {
    if (income <= 0) return "muted";

    if (!hasAnyFactOrReserve) {
      return "plan";
    }

    if (remainingAfterReserve < 0) return "bad";
    if (requiredDelta < 0 || flexibleDelta < 0) return "warn";

    return "good";
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
    const spentPercent = getPercent(stats.totalExpenseAndReserve, stats.income);

    if (spentPercent > monthProgress + 12) {
      return {
        status: "bad",
        title: "Расходы впереди",
        text: `Прошло ${monthProgress}% месяца, занято ${spentPercent}% дохода.`,
      };
    }

    if (spentPercent > monthProgress + 5) {
      return {
        status: "warn",
        title: "На грани",
        text: `Прошло ${monthProgress}% месяца, занято ${spentPercent}% дохода.`,
      };
    }

    return {
      status: "good",
      title: "Темп нормальный",
      text: `Прошло ${monthProgress}% месяца, занято ${spentPercent}% дохода.`,
    };
  }

  function renderSalaryMissingCard(selectedMonth) {
    return `
      <section class="analytics-savings-empty-card">
        <div class="analytics-savings-empty-card__badge">Месяц выбран</div>
        <h3>Зарплаты ещё не было</h3>
        <p>
          В ${selectedMonth} пока нет операции “Доход”.
          Модель месяца и сценарии бюджета появятся после добавления дохода.
        </p>
      </section>
    `;
  }

  function renderCurrentModel(stats, helpers) {
    const { formatMoney } = helpers;
    const income = stats.income;

    const rows = [
      {
        label: "Обязательные",
        value: stats.requiredExpense,
        percent: getPercent(stats.requiredExpense, income),
        className: "required",
        detail: `Факт: ${formatMoney(stats.requiredFactExpense)} · календарь: ${formatMoney(stats.calendarReserve)}`,
      },
      {
        label: "Гибкие",
        value: stats.flexibleExpense,
        percent: getPercent(stats.flexibleExpense, income),
        className: "flexible",
        detail: "Фактические расходы месяца",
      },
      {
        label: "Останется",
        value: stats.remainingAfterExpenses,
        percent: getPercent(Math.max(0, stats.remainingAfterExpenses), income),
        className: "remain",
        detail: "После факта, календаря и гибких расходов",
      },
    ];

    return `
      <section class="analytics-savings-card analytics-savings-current-card">
        <div class="analytics-savings-card__head">
          <div>
            <h3>Модель месяца</h3>
            <p>Факт расходов + неоплаченные календарные платежи</p>
          </div>

          <div class="analytics-savings-income-pill">
            <span>Доход</span>
            <strong>${formatMoney(income)}</strong>
          </div>
        </div>

        <div class="analytics-savings-current-card__rows">
          ${rows
            .map((row) => {
              const width = getBarWidth(Math.max(0, row.value), income);
              const valueLabel = row.value < 0
                ? formatSignedMoney(row.value, formatMoney)
                : formatMoney(row.value);

              return `
                <div class="analytics-savings-model-row analytics-savings-model-row--${row.className}">
                  <div class="analytics-savings-model-row__top">
                    <span>${row.label}</span>
                    <strong>${valueLabel}</strong>
                  </div>

                  <div class="analytics-savings-model-row__bar">
                    <i style="width:${width}%"></i>
                  </div>

                  <div class="analytics-savings-model-row__bottom">
                    ${row.percent}% от дохода
                  </div>

                  <div class="analytics-savings-model-row__detail">
                    ${row.detail}
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderProgressCard(stats, selectedMonth) {
    const pace = getPaceStatus(stats, selectedMonth);
    const monthProgress = getMonthProgressPercent(selectedMonth);
    const spentPercent =
      stats.income > 0 ? getPercent(stats.totalExpenseAndReserve, stats.income) : 0;
    const spentWidth = Math.min(100, Math.max(0, spentPercent));

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
              <strong>${spentPercent}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${spentWidth}%"></i>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderScenarioCard(model, stats, helpers) {
    const { formatMoney, escapeHtml } = helpers;

    const requiredPlan = roundToTwo(stats.income * model.required);
    const flexiblePlan = roundToTwo(stats.income * model.flexible);
    const reserveByModel = roundToTwo(stats.income * model.reserve);

    const requiredDelta = roundToTwo(requiredPlan - stats.requiredExpense);
    const flexibleDelta = roundToTwo(flexiblePlan - stats.flexibleExpense);

    const remainingAfterReserve = roundToTwo(
      stats.income - stats.requiredExpense - stats.flexibleExpense - reserveByModel
    );

    const hasAnyFactOrReserve =
      stats.requiredExpense > 0 ||
      stats.flexibleExpense > 0 ||
      stats.calendarReserve > 0;

    const status = getScenarioStatus({
      income: stats.income,
      requiredDelta,
      flexibleDelta,
      remainingAfterReserve,
      hasAnyFactOrReserve,
    });

    return `
      <article class="analytics-savings-scenario-card analytics-savings-scenario-card--${status}">
        <div class="analytics-savings-scenario-card__top">
          <div>
            <h4>${escapeHtml(model.title)}</h4>
            <p>${escapeHtml(model.subtitle)}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${getStatusLabel(status)}
          </div>
        </div>

        <div class="analytics-savings-scenario-card__result">
          <span>После факта, календаря и резерва</span>
          <strong>${formatSignedMoney(remainingAfterReserve, formatMoney)}</strong>
        </div>

        <div class="analytics-savings-scenario-card__rows">
          <div>
            <span>Обязательные</span>
            <strong>${Math.round(model.required * 100)}% · ${formatMoney(requiredPlan)}</strong>
            <em>
              Занято: ${formatMoney(stats.requiredExpense)}
              · факт: ${formatMoney(stats.requiredFactExpense)}
              · календарь: ${formatMoney(stats.calendarReserve)}
            </em>
          </div>

          <div>
            <span>Гибкие</span>
            <strong>${Math.round(model.flexible * 100)}% · ${formatMoney(flexiblePlan)}</strong>
            <em>Факт: ${formatMoney(stats.flexibleExpense)}</em>
          </div>

          <div>
            <span>Резерв по модели</span>
            <strong>${Math.round(model.reserve * 100)}% · ${formatMoney(reserveByModel)}</strong>
            <em>Не цель, а проверка системы</em>
          </div>
        </div>
      </article>
    `;
  }

  function renderScenarios(stats, helpers) {
    return `
      <section class="analytics-savings-scenarios">
        <div class="analytics-savings-section-head">
          <h3>Сценарии бюджета</h3>
          <p>Сравнение систем с занятыми деньгами месяца</p>
        </div>

        <div class="analytics-savings-scenarios__list">
          ${BUDGET_MODELS.map((model) => renderScenarioCard(model, stats, helpers)).join("")}
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

    if (stats.income <= 0) {
      container.innerHTML = `
        <div class="analytics-savings-dashboard">
          ${renderSalaryMissingCard(monthValue)}
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="analytics-savings-dashboard">
        ${renderCurrentModel(stats, helpers)}
        ${renderProgressCard(stats, monthValue)}
        ${renderScenarios(stats, helpers)}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();