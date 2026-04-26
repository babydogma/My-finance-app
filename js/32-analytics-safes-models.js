(() => {
  const BUDGET_MODELS = [
    {
      id: "classic",
      title: "50 / 30 / 20",
      subtitle: "Классика",
      required: 0.5,
      flexible: 0.3,
      savings: 0.2,
    },
    {
      id: "soft",
      title: "60 / 25 / 15",
      subtitle: "Мягкий режим",
      required: 0.6,
      flexible: 0.25,
      savings: 0.15,
    },
    {
      id: "hard-save",
      title: "50 / 20 / 30",
      subtitle: "Жёсткое накопление",
      required: 0.5,
      flexible: 0.2,
      savings: 0.3,
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

    if (Number.isNaN(parsedDate.getTime())) return "";

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

  function isTrueFlag(value) {
    return value === true || value === "true" || value === 1 || value === "1";
  }

  function isRequiredCategory(state, categoryId) {
    if (!categoryId || categoryId === UNCATEGORIZED_ID) {
      return false;
    }

    const budgetRecord = (state.budgetLimits || []).find((item) => {
      return item.category_id === categoryId || item.categoryId === categoryId;
    });

    if (budgetRecord) {
      return (
        isTrueFlag(budgetRecord.is_required) ||
        isTrueFlag(budgetRecord.isRequired) ||
        isTrueFlag(budgetRecord.required)
      );
    }

    const categoryRecord = (state.categories || []).find((item) => {
      return item.id === categoryId || item.category_id === categoryId;
    });

    if (!categoryRecord) return false;

    return (
      isTrueFlag(categoryRecord.is_required) ||
      isTrueFlag(categoryRecord.isRequired) ||
      isTrueFlag(categoryRecord.required)
    );
  }

  function getMonthStats(state) {
    const transactions = getCurrentMonthTransactions(state);

    let income = 0;
    let requiredExpense = 0;
    let flexibleExpense = 0;

    transactions.forEach((transaction) => {
      const amount = toNumber(transaction.amount);
      const type = String(transaction.type || "").toLowerCase();

      /*
        ВАЖНО:
        Доходом считается ТОЛЬКО операция, созданная через "Доход".
        Переводы между счетами / сейфами / накоплениями сюда не входят.
      */
      if (type === "income") {
        income += amount;
        return;
      }

      if (type !== "expense") {
        return;
      }

      const categoryId = getCategoryId(transaction);

      if (isRequiredCategory(state, categoryId)) {
        requiredExpense += amount;
      } else {
        flexibleExpense += amount;
      }
    });

    return {
      income: roundToTwo(income),
      requiredExpense: roundToTwo(requiredExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
    };
  }

  function getModelStatus({ remainingAfterPlan, requiredDelta, flexibleDelta, income }) {
    if (income <= 0) return "muted";
    if (remainingAfterPlan < 0) return "bad";
    if (requiredDelta < 0 || flexibleDelta < 0) return "warn";
    return "good";
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

  function getPercentLabel(value) {
    return `${Math.round(value * 100)}%`;
  }

  function getFillPercent(fact, plan) {
    if (plan <= 0) return 0;
    return Math.min(100, Math.max(0, (fact / plan) * 100));
  }

  function renderCompareRow({ label, fact, plan, percent, kind, formatMoney }) {
    const delta = roundToTwo(plan - fact);
    const fill = getFillPercent(fact, plan);
    const isOver = delta < 0;

    return `
      <div class="analytics-safe-model-compare analytics-safe-model-compare--${kind} ${isOver ? "is-over" : ""}">
        <div class="analytics-safe-model-compare__top">
          <div>
            <span>${label}</span>
            <strong>${getPercentLabel(percent)} · план ${formatMoney(plan)}</strong>
          </div>

          <div class="analytics-safe-model-compare__fact">
            <span>Факт</span>
            <strong>${formatMoney(fact)}</strong>
          </div>
        </div>

        <div class="analytics-safe-model-compare__bar">
          <i style="width:${fill}%"></i>
        </div>

        <div class="analytics-safe-model-compare__delta">
          ${isOver ? "Перебор" : "Запас"}: ${formatSignedMoney(delta, formatMoney)}
        </div>
      </div>
    `;
  }

  function renderModelCard(model, stats, helpers) {
    const { formatMoney, escapeHtml } = helpers;

    const requiredPlan = roundToTwo(stats.income * model.required);
    const flexiblePlan = roundToTwo(stats.income * model.flexible);
    const savingsTarget = roundToTwo(stats.income * model.savings);

    const requiredDelta = roundToTwo(requiredPlan - stats.requiredExpense);
    const flexibleDelta = roundToTwo(flexiblePlan - stats.flexibleExpense);

    const remainingAfterPlan = roundToTwo(
      stats.income - stats.requiredExpense - stats.flexibleExpense - savingsTarget
    );

    const status = getModelStatus({
      remainingAfterPlan,
      requiredDelta,
      flexibleDelta,
      income: stats.income,
    });

    return `
      <article class="analytics-safe-model-card analytics-safe-model-card--${status}">
        <div class="analytics-safe-model-card__top">
          <div>
            <div class="analytics-safe-model-card__title">${escapeHtml(model.title)}</div>
            <div class="analytics-safe-model-card__subtitle">${escapeHtml(model.subtitle)}</div>
          </div>

          <div class="analytics-safe-model-card__badge">
            ${getStatusLabel(status)}
          </div>
        </div>

        <div class="analytics-safe-model-card__summary">
          <div>
            <span>Осталось бы</span>
            <strong>${formatSignedMoney(remainingAfterPlan, formatMoney)}</strong>
          </div>

          <div>
            <span>Цель накопления</span>
            <strong>${formatMoney(savingsTarget)}</strong>
          </div>
        </div>

        <div class="analytics-safe-model-card__compare-list">
          ${renderCompareRow({
            label: "Обязательные",
            fact: stats.requiredExpense,
            plan: requiredPlan,
            percent: model.required,
            kind: "required",
            formatMoney,
          })}

          ${renderCompareRow({
            label: "Гибкие",
            fact: stats.flexibleExpense,
            plan: flexiblePlan,
            percent: model.flexible,
            kind: "flexible",
            formatMoney,
          })}
        </div>
      </article>
    `;
  }

  function renderAnalyticsSafeModels({ state, formatMoney, escapeHtml }) {
    const container = document.getElementById("analyticsSafeModelsList");

    if (!container) return;

    const helpers = {
      formatMoney: typeof formatMoney === "function" ? formatMoney : fallbackFormatMoney,
      escapeHtml: typeof escapeHtml === "function" ? escapeHtml : fallbackEscapeHtml,
    };

    const stats = getMonthStats(state);

    container.innerHTML = `
      <div class="analytics-safe-models__head">
        <div>
          <h3>Сценарии бюджета</h3>
          <p>Сравнение систем с твоими текущими расходами</p>
        </div>

        <div class="analytics-safe-models__income">
          <span>Доход</span>
          <strong>${helpers.formatMoney(stats.income)}</strong>
        </div>
      </div>

      <div class="analytics-safe-models__list">
        ${BUDGET_MODELS.map((model) => renderModelCard(model, stats, helpers)).join("")}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();