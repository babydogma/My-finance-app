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
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getTransactionMainDateValue(transaction) {
    return (
      transaction.date ||
      transaction.transaction_date ||
      transaction.operation_date ||
      transaction.created_date ||
      transaction.created_at ||
      transaction.createdAt ||
      ""
    );
  }

  function getTransactionDateKey(transaction) {
    const rawValue = getTransactionMainDateValue(transaction);

    if (!rawValue) return "";

    const rawText = String(rawValue);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return rawText.slice(0, 10);
    }

    const parsedDate = new Date(rawText);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

    if (!categoryRecord) {
      return false;
    }

    return (
      isTrueFlag(categoryRecord.is_required) ||
      isTrueFlag(categoryRecord.isRequired) ||
      isTrueFlag(categoryRecord.required)
    );
  }

  function isTransferToSafe(transaction) {
    if (transaction.type !== "transfer") return false;

    return Boolean(
      transaction.to_safe_bucket_id ||
      transaction.toSafeBucketId ||
      transaction.to_bucket_id ||
      transaction.safe_bucket_id ||
      transaction.safeBucketId
    );
  }

  function getMonthStats(state) {
    const transactions = getCurrentMonthTransactions(state);

    let income = 0;
    let requiredExpense = 0;
    let flexibleExpense = 0;
    let actualSavings = 0;

    transactions.forEach((transaction) => {
      const amount = toNumber(transaction.amount);

      if (transaction.type === "income") {
        income += amount;
        return;
      }

      if (transaction.type === "expense") {
        const categoryId = getCategoryId(transaction);

        if (isRequiredCategory(state, categoryId)) {
          requiredExpense += amount;
        } else {
          flexibleExpense += amount;
        }

        return;
      }

      if (isTransferToSafe(transaction)) {
        actualSavings += amount;
      }
    });

    return {
      income: roundToTwo(income),
      requiredExpense: roundToTwo(requiredExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
      actualSavings: roundToTwo(actualSavings),
    };
  }

  function getStatus(model, stats) {
    if (stats.income <= 0) {
      return "muted";
    }

    const requiredLimit = stats.income * model.required;
    const flexibleLimit = stats.income * model.flexible;
    const savingsTarget = stats.income * model.savings;

    const remaining = stats.income - stats.requiredExpense - stats.flexibleExpense - savingsTarget;

    if (remaining < 0) {
      return "bad";
    }

    if (stats.requiredExpense > requiredLimit || stats.flexibleExpense > flexibleLimit) {
      return "warn";
    }

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

    if (amount > 0) {
      return `+${formatMoney(amount)}`;
    }

    if (amount < 0) {
      return `−${formatMoney(Math.abs(amount))}`;
    }

    return formatMoney(0);
  }

  function getProgressPercent(actual, planned) {
    if (planned <= 0) return 0;

    return Math.min(100, Math.max(0, (actual / planned) * 100));
  }

  function renderModelRow({ label, actual, planned, formatMoney }) {
    const progress = getProgressPercent(actual, planned);

    return `
      <div class="analytics-safe-model-row">
        <div class="analytics-safe-model-row__top">
          <span>${label}</span>
          <strong>${formatMoney(actual)} / ${formatMoney(planned)}</strong>
        </div>

        <div class="analytics-safe-model-row__bar">
          <i style="width:${progress}%"></i>
        </div>
      </div>
    `;
  }

  function renderModelCard(model, stats, helpers) {
    const { formatMoney, escapeHtml } = helpers;

    const requiredLimit = roundToTwo(stats.income * model.required);
    const flexibleLimit = roundToTwo(stats.income * model.flexible);
    const savingsTarget = roundToTwo(stats.income * model.savings);

    const remaining = roundToTwo(
      stats.income - stats.requiredExpense - stats.flexibleExpense - savingsTarget
    );

    const status = getStatus(model, stats);

    return `
      <article class="analytics-safe-model-card analytics-safe-model-card--${status}">
        <div class="analytics-safe-model-card__head">
          <div>
            <div class="analytics-safe-model-card__title">${escapeHtml(model.title)}</div>
            <div class="analytics-safe-model-card__subtitle">${escapeHtml(model.subtitle)}</div>
          </div>

          <div class="analytics-safe-model-card__badge">
            ${getStatusLabel(status)}
          </div>
        </div>

        <div class="analytics-safe-model-card__result">
          <span>Осталось бы</span>
          <strong>${formatSignedMoney(remaining, formatMoney)}</strong>
        </div>

        <div class="analytics-safe-model-card__target">
          <span>Цель накопления</span>
          <strong>${formatMoney(savingsTarget)}</strong>
        </div>

        <div class="analytics-safe-model-card__rows">
          ${renderModelRow({
            label: "Обязательные",
            actual: stats.requiredExpense,
            planned: requiredLimit,
            formatMoney,
          })}

          ${renderModelRow({
            label: "Гибкие",
            actual: stats.flexibleExpense,
            planned: flexibleLimit,
            formatMoney,
          })}

          ${renderModelRow({
            label: "Накоплено",
            actual: stats.actualSavings,
            planned: savingsTarget,
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
          <p>Сравнение по текущему месяцу</p>
        </div>

        <div class="analytics-safe-models__income">
          <span>Доход</span>
          <strong>${helpers.formatMoney(stats.income)}</strong>
        </div>
      </div>

      <div class="analytics-safe-models__list">
        ${BUDGET_MODELS.map((model) => {
          return renderModelCard(model, stats, helpers);
        }).join("")}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();