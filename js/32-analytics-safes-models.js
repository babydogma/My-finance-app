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
      id: "save",
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
    if (window.FinanceAppFormatDate?.getCurrentMonthValue) {
      return window.FinanceAppFormatDate.getCurrentMonthValue();
    }

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

  function getCurrentMonthTransactions(state) {
    const currentMonth = getCurrentMonthValue();

    return (state.transactions || []).filter((transaction) => {
      const dateKey = getTransactionDateKey(transaction);

      return dateKey.slice(0, 7) === currentMonth;
    });
  }

  function getCategoryId(transaction) {
    return transaction.category_id || transaction.categoryId || UNCATEGORIZED_ID;
  }

  function getMonthProgressPercent() {
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

  function getMonthStats(state, isRequiredCategory) {
    const transactions = getCurrentMonthTransactions(state);

    let income = 0;
    let requiredExpense = 0;
    let flexibleExpense = 0;

    transactions.forEach((transaction) => {
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
        requiredExpense += amount;
      } else {
        flexibleExpense += amount;
      }
    });

    const totalExpense = requiredExpense + flexibleExpense;
    const remainingAfterExpenses = income - totalExpense;

    return {
      income: roundToTwo(income),
      requiredExpense: roundToTwo(requiredExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
      totalExpense: roundToTwo(totalExpense),
      remainingAfterExpenses: roundToTwo(remainingAfterExpenses),
    };
  }

  function getStatusLabel(status) {
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

  function getScenarioStatus({ income, requiredDelta, flexibleDelta, remainingAfterReserve }) {
    if (income <= 0) return "muted";
    if (remainingAfterReserve < 0) return "bad";
    if (requiredDelta < 0 || flexibleDelta < 0) return "warn";

    return "good";
  }

  function getPaceStatus(stats) {
    if (stats.income <= 0) {
      return {
        status: "muted",
        title: "Нет дохода",
        text: "Добавь доход за месяц, чтобы сравнить темп расходов.",
      };
    }

    const monthProgress = getMonthProgressPercent();
    const spentPercent = getPercent(stats.totalExpense, stats.income);

    if (spentPercent > monthProgress + 12) {
      return {
        status: "bad",
        title: "Расходы впереди месяца",
        text: `Прошло ${monthProgress}% месяца, а потрачено ${spentPercent}% дохода.`,
      };
    }

    if (spentPercent > monthProgress + 5) {
      return {
        status: "warn",
        title: "Темп чуть выше нормы",
        text: `Прошло ${monthProgress}% месяца, потрачено ${spentPercent}% дохода.`,
      };
    }

    return {
      status: "good",
      title: "Темп нормальный",
      text: `Прошло ${monthProgress}% месяца, потрачено ${spentPercent}% дохода.`,
    };
  }

  function renderCurrentModel(stats, helpers) {
    const { formatMoney } = helpers;

    const income = stats.income;
    const remaining = Math.max(0, stats.remainingAfterExpenses);

    const rows = [
      {
        label: "Обязательные",
        value: stats.requiredExpense,
        percent: getPercent(stats.requiredExpense, income),
        className: "required",
      },
      {
        label: "Гибкие",
        value: stats.flexibleExpense,
        percent: getPercent(stats.flexibleExpense, income),
        className: "flexible",
      },
      {
        label: "Останется",
        value: remaining,
        percent: getPercent(remaining, income),
        className: "remain",
      },
    ];

    return `
      <section class="analytics-savings-current-card">
        <div class="analytics-savings-current-card__head">
          <div>
            <h3>Модель месяца</h3>
            <p>Как сейчас распределяется доход</p>
          </div>

          <div class="analytics-savings-income-pill">
            <span>Доход</span>
            <strong>${formatMoney(income)}</strong>
          </div>
        </div>

        <div class="analytics-savings-current-card__rows">
          ${rows
            .map((row) => {
              const width = getBarWidth(row.value, income);

              return `
                <div class="analytics-savings-model-row analytics-savings-model-row--${row.className}">
                  <div class="analytics-savings-model-row__top">
                    <span>${row.label}</span>
                    <strong>${formatMoney(row.value)}</strong>
                  </div>

                  <div class="analytics-savings-model-row__bar">
                    <i style="width:${width}%"></i>
                  </div>

                  <div class="analytics-savings-model-row__bottom">
                    ${row.percent}% от дохода
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderProgressCard(stats) {
    const pace = getPaceStatus(stats);
    const monthProgress = getMonthProgressPercent();
    const spentPercent = stats.income > 0 ? getPercent(stats.totalExpense, stats.income) : 0;
    const spentWidth = Math.min(100, Math.max(0, spentPercent));

    return `
      <section class="analytics-savings-pace-card analytics-savings-pace-card--${pace.status}">
        <div class="analytics-savings-pace-card__head">
          <div>
            <h3>Темп месяца</h3>
            <p>${pace.text}</p>
          </div>

          <div class="analytics-savings-pace-card__badge">
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
              <span>Потрачено дохода</span>
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

    const status = getScenarioStatus({
      income: stats.income,
      requiredDelta,
      flexibleDelta,
      remainingAfterReserve,
    });

    return `
      <article class="analytics-savings-scenario-card analytics-savings-scenario-card--${status}">
        <div class="analytics-savings-scenario-card__top">
          <div>
            <h4>${escapeHtml(model.title)}</h4>
            <p>${escapeHtml(model.subtitle)}</p>
          </div>

          <div class="analytics-savings-scenario-card__badge">
            ${getStatusLabel(status)}
          </div>
        </div>

        <div class="analytics-savings-scenario-card__result">
          <span>После расходов и резерва</span>
          <strong>${formatSignedMoney(remainingAfterReserve, formatMoney)}</strong>
        </div>

        <div class="analytics-savings-scenario-card__grid">
          <div>
            <span>Обязательные</span>
            <strong>${Math.round(model.required * 100)}% · ${formatMoney(requiredPlan)}</strong>
            <em>Факт: ${formatMoney(stats.requiredExpense)}</em>
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
          <p>Сравнение систем с текущими расходами</p>
        </div>

        <div class="analytics-savings-scenarios__list">
          ${BUDGET_MODELS.map((model) => renderScenarioCard(model, stats, helpers)).join("")}
        </div>
      </section>
    `;
  }

  function renderAnalyticsSafeModels({ state, isRequiredCategory, formatMoney, escapeHtml }) {
    const container = document.getElementById("analyticsSafeModelsList");

    if (!container) return;

    const helpers = {
      formatMoney: typeof formatMoney === "function" ? formatMoney : fallbackFormatMoney,
      escapeHtml: typeof escapeHtml === "function" ? escapeHtml : fallbackEscapeHtml,
    };

    const stats = getMonthStats(state, isRequiredCategory);

    container.innerHTML = `
      <div class="analytics-savings-dashboard">
        ${renderCurrentModel(stats, helpers)}
        ${renderProgressCard(stats)}
        ${renderScenarios(stats, helpers)}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();