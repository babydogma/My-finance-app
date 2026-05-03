(() => {
  function toNumber(value) {
    return Number(value) || 0;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
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

  function getMonthTransactions(state, selectedMonth) {
    return (state.transactions || []).filter((transaction) => {
      const dateKey = getTransactionDateKey(transaction);

      return dateKey.slice(0, 7) === selectedMonth;
    });
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

  function getMonthStats(state, selectedMonth) {
    const monthTransactions = getMonthTransactions(state, selectedMonth);

    let income = 0;
    let expense = 0;

    monthTransactions.forEach((transaction) => {
      const amount = toNumber(transaction.amount);
      const type = String(transaction.type || "").toLowerCase();

      if (type === "income") {
        income += amount;
        return;
      }

      if (type === "expense") {
        expense += amount;
      }
    });

    return {
      income: roundToTwo(income),
      expense: roundToTwo(expense),
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
    const spentPercent = getPercent(stats.expense, stats.income);

    if (spentPercent > monthProgress + 12) {
      return {
        status: "bad",
        title: "Расходы впереди",
        text: `Прошло ${monthProgress}% месяца, потрачено ${spentPercent}% дохода.`,
      };
    }

    if (spentPercent > monthProgress + 5) {
      return {
        status: "warn",
        title: "На грани",
        text: `Прошло ${monthProgress}% месяца, потрачено ${spentPercent}% дохода.`,
      };
    }

    return {
      status: "good",
      title: "Темп нормальный",
      text: `Прошло ${monthProgress}% месяца, потрачено ${spentPercent}% дохода.`,
    };
  }

  function renderProgressCard(stats, selectedMonth) {
    const pace = getPaceStatus(stats, selectedMonth);
    const monthProgress = getMonthProgressPercent(selectedMonth);
    const spentPercent = stats.income > 0 ? getPercent(stats.expense, stats.income) : 0;
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

  function renderAnalyticsSafeModels({
    state,
    selectedMonth,
  }) {
    const container = document.getElementById("analyticsSafeModelsList");

    if (!container) return;

    const monthValue = selectedMonth || getCurrentMonthValue();
    const stats = getMonthStats(state, monthValue);

    container.innerHTML = `
      <div class="analytics-savings-dashboard">
        ${renderProgressCard(stats, monthValue)}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();