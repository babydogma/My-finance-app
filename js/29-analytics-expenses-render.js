(() => {
  function createAnalyticsExpensesRender({
    state,
    UNCATEGORIZED_ID,
    roundToTwo,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    getCategoryName,
    formatMoney,
    escapeHtml,

    getFilterPeriod,
    setFilterPeriod,
    getSelectedMonth,
    setSelectedMonth,
    getRangeStart,
    getRangeEnd,

    analyticsExpenseValue,
    analyticsExpensesPeriodNote,
    analyticsExpensesCategoriesList,
    analyticsExpensesRing,
    analyticsExpensesRingCenterValue,
    analyticsExpensesRingCenterLabel,

    analyticsExpenseValuePremium,
    analyticsExpensesPeriodNotePremium,
    analyticsExpensesCategoriesListPremium,
    analyticsExpensesRingPremium,
    analyticsExpensesRingCenterValuePremium,
    analyticsExpensesRingCenterLabelPremium,

    analyticsExpensesMonthStrip,
    analyticsExpensesTotalRowValue,

    openAnalyticsCategoryModal,
  }) {
    let analyticsExpenseCategoryFilter = "all";

    const ANALYTICS_EXPENSE_COLORS = [
  "#4DA3FF", // bright blue
  "#FF4D5E", // coral red
  "#8DFF4A", // acid green
  "#FFD45A", // warm yellow
  "#B26BFF", // violet
  "#35E6D3", // turquoise
  "#FF8A3D", // orange
  "#F45BBD", // pink
  "#E9F2FF", // ice white
  "#5C7CFF", // electric indigo
  "#B8FF3D", // lime
  "#FF6B9A", // rose
  "#42C8FF", // sky cyan
  "#FFB13D", // amber
  "#D66BFF", // purple neon
  "#52F28A", // mint green
  "#FF3D9A", // neon magenta
  "#7DE3FF", // light aqua
  "#FFE66D", // soft gold
  "#A78BFA", // lavender
  "#34D399", // emerald
  "#FB7185", // salmon
  "#93C5FD", // pale blue
  "#FDE68A", // pale yellow
];

    function getPrimaryExpenseValueEl() {
      return analyticsExpenseValuePremium || analyticsExpenseValue;
    }

    function getPrimaryExpensePeriodNoteEl() {
      return analyticsExpensesPeriodNotePremium || analyticsExpensesPeriodNote;
    }

    function getPrimaryExpenseListEl() {
      return analyticsExpensesCategoriesListPremium || analyticsExpensesCategoriesList;
    }

    function getPrimaryExpenseRingEl() {
      return analyticsExpensesRingPremium || analyticsExpensesRing;
    }

    function getPrimaryExpenseRingCenterValueEl() {
      return analyticsExpensesRingCenterValuePremium || analyticsExpensesRingCenterValue;
    }

    function getPrimaryExpenseRingCenterLabelEl() {
      return analyticsExpensesRingCenterLabelPremium || analyticsExpensesRingCenterLabel;
    }

    function normalizeAnalyticsMonthValue(value) {
      const match = String(value || "").match(/^(\d{4})-(\d{1,2})$/);

      if (!match) {
        return getCurrentMonthValue();
      }

      const year = match[1];
      const month = String(Number(match[2])).padStart(2, "0");

      return `${year}-${month}`;
    }

    function getAnalyticsColorHash(value) {
      const text = String(value || "");
      let hash = 0;

      for (let index = 0; index < text.length; index += 1) {
        hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
      }

      return hash;
    }

    function getAnalyticsExpenseColor(categoryId) {
      const categoryIds = state.categories.map((category) => category.id);
      const allCategoryIds = Array.from(new Set([...categoryIds, UNCATEGORIZED_ID]));
      const index = allCategoryIds.indexOf(categoryId);

      if (index >= 0) {
        return ANALYTICS_EXPENSE_COLORS[index % ANALYTICS_EXPENSE_COLORS.length];
      }

      return ANALYTICS_EXPENSE_COLORS[
        getAnalyticsColorHash(categoryId) % ANALYTICS_EXPENSE_COLORS.length
      ];
    }

    function getAnalyticsExpensesPeriodNote() {
      const period = getFilterPeriod();

      if (period === "month") return "за месяц";
      if (period === "today") return "за сегодня";
      if (period === "7") return "за 7 дней";
      if (period === "range") return "за выбранный период";

      return "за период";
    }

    function getAnalyticsExpenseBaseTransactions() {
      const transactions = Array.isArray(state.transactions) ? state.transactions : [];
      const normalizedMonth = normalizeAnalyticsMonthValue(getSelectedMonth());

      if (normalizedMonth !== getSelectedMonth()) {
        setSelectedMonth(normalizedMonth);
      }

      return filterTransactionsByPeriod(
        transactions,
        getFilterPeriod(),
        normalizedMonth,
        getRangeStart(),
        getRangeEnd()
      ).filter((transaction) => transaction.type === "expense");
    }

    function getAnalyticsExpenseFilteredTransactions() {
      const expenseTransactions = getAnalyticsExpenseBaseTransactions();

      if (analyticsExpenseCategoryFilter === "all") {
        return expenseTransactions;
      }

      return expenseTransactions.filter((transaction) => {
        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        return categoryId === analyticsExpenseCategoryFilter;
      });
    }

    function getAnalyticsExpenseItems(expenseTransactions) {
      const byCategory = new Map();

      expenseTransactions.forEach((transaction) => {
        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const amount = Number(transaction.amount) || 0;

        const current = byCategory.get(categoryId) || {
          categoryId,
          name: getCategoryName(categoryId),
          amount: 0,
          color: getAnalyticsExpenseColor(categoryId),
        };

        current.amount += amount;
        byCategory.set(categoryId, current);
      });

      return Array.from(byCategory.values())
        .map((item) => ({
          ...item,
          amount: roundToTwo(item.amount),
        }))
        .filter((item) => item.amount > 0)
        .sort((a, b) => b.amount - a.amount);
    }

    function renderAnalyticsExpensesRing(items, total) {
      const ringEl = getPrimaryExpenseRingEl();
      const centerValueEl = getPrimaryExpenseRingCenterValueEl();
      const centerLabelEl = getPrimaryExpenseRingCenterLabelEl();

      if (!ringEl) return;

      if (!total || total <= 0 || items.length === 0) {
        const emptyGradient = "conic-gradient(rgba(255,255,255,0.09) 0deg 360deg)";

        ringEl.style.background = emptyGradient;
        ringEl.style.setProperty("--analytics-ring-gradient", emptyGradient);

        if (centerValueEl) {
          centerValueEl.textContent = "0%";
        }

        if (centerLabelEl) {
          centerLabelEl.textContent = "Нет расходов";
        }

        return;
      }

      let cursor = 0;

      const gradientParts = items.map((item) => {
        const percent = (item.amount / total) * 100;
        const start = cursor;
        const end = cursor + percent;

        cursor = end;

        return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
      });

      const gradient = `conic-gradient(${gradientParts.join(", ")})`;

      ringEl.style.background = gradient;
      ringEl.style.setProperty("--analytics-ring-gradient", gradient);

      const topItem = items[0];
      const topPercent = Math.round((topItem.amount / total) * 100);

      if (centerValueEl) {
        centerValueEl.textContent = `${topPercent}%`;
      }

      if (centerLabelEl) {
        centerLabelEl.textContent = topItem.name;
      }
    }

    function getAnalyticsMonthDateFromValue(value) {
      const normalized = normalizeAnalyticsMonthValue(value);
      const match = normalized.match(/^(\d{4})-(\d{2})$/);

      return new Date(Number(match[1]), Number(match[2]) - 1, 1);
    }

    function getAnalyticsMonthKeyFromDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      return `${year}-${month}`;
    }

    function getAnalyticsMonthShortLabel(monthKey) {
      const date = getAnalyticsMonthDateFromValue(monthKey);

      return date
        .toLocaleDateString("ru-RU", {
          month: "short",
        })
        .replace(".", "");
    }

    function getAnalyticsMonthStripItems() {
      const selectedDate = getAnalyticsMonthDateFromValue(getSelectedMonth());
      const items = [];

      for (let offset = -5; offset <= 1; offset += 1) {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + offset,
          1
        );

        const monthKey = getAnalyticsMonthKeyFromDate(date);

        const monthTransactions = filterTransactionsByPeriod(
          state.transactions,
          "month",
          monthKey,
          "",
          ""
        ).filter((transaction) => transaction.type === "expense");

        const total = roundToTwo(
          monthTransactions.reduce((sum, transaction) => {
            return sum + (Number(transaction.amount) || 0);
          }, 0)
        );

        items.push({
          monthKey,
          label: getAnalyticsMonthShortLabel(monthKey),
          total,
        });
      }

      return items;
    }

    function renderAnalyticsExpensesMonthStrip() {
      if (!analyticsExpensesMonthStrip) return;

      const items = getAnalyticsMonthStripItems();
      const maxTotal = Math.max(...items.map((item) => item.total), 1);
      const selectedMonth = normalizeAnalyticsMonthValue(getSelectedMonth());

      analyticsExpensesMonthStrip.innerHTML = "";

      items.forEach((item) => {
        const percent = item.total > 0 ? item.total / maxTotal : 0;
        const height = Math.max(4, Math.round(44 * percent));

        const button = document.createElement("button");
        button.type = "button";
        button.className =
          `analytics-expenses-month-item${
            item.monthKey === selectedMonth ? " is-active" : ""
          }`;

        button.innerHTML = `
          <div
            class="analytics-expenses-month-item__bar"
            style="height: ${height}px"
          ></div>
          <div class="analytics-expenses-month-item__label">
            ${escapeHtml(item.label)}
          </div>
        `;

        button.addEventListener("click", () => {
          analyticsExpenseCategoryFilter = "all";
          setSelectedMonth(item.monthKey);
          setFilterPeriod("month");
          renderAnalyticsExpensesByCategory();
        });

        analyticsExpensesMonthStrip.appendChild(button);
      });
    }

    function renderAnalyticsExpensesCategories(items, total) {
      const listEl = getPrimaryExpenseListEl();

      if (!listEl) return;

      listEl.innerHTML = "";

      if (!total || total <= 0 || items.length === 0) {
        listEl.innerHTML = `
          <div class="analytics-expenses-empty">
            За выбранный период расходов нет
          </div>
        `;
        return;
      }

      items.forEach((item) => {
        const percent = total > 0 ? Math.round((item.amount / total) * 100) : 0;

        const row = document.createElement("button");
        row.className =
          "analytics-expense-category-row analytics-expense-category-row--premium";
        row.type = "button";
        row.dataset.categoryId = item.categoryId;

        row.innerHTML = `
          <div
            class="analytics-expense-category-row__icon"
            style="--category-color: ${item.color}"
          >
            <span>${escapeHtml(item.name.slice(0, 1).toUpperCase())}</span>
          </div>

          <div class="analytics-expense-category-row__main">
            <div class="analytics-expense-category-row__top">
              <div class="analytics-expense-category-row__name">
                ${escapeHtml(item.name)}
              </div>
              <div class="analytics-expense-category-row__amount">
                ${formatMoney(item.amount)}
              </div>
            </div>

            <div class="analytics-expense-category-row__bottom">
              <div class="analytics-expense-category-row__bar">
                <div
                  class="analytics-expense-category-row__bar-fill"
                  style="width: ${Math.max(2, percent)}%; background: ${item.color}; color: ${item.color};"
                ></div>
              </div>

              <div class="analytics-expense-category-row__percent">${percent}%</div>
            </div>
          </div>
        `;

        row.addEventListener("click", () => {
          openAnalyticsCategoryModal?.(item.categoryId);
        });

        listEl.appendChild(row);
      });
    }

    function renderAnalyticsExpensesByCategory() {
      const baseExpenseTransactions = getAnalyticsExpenseBaseTransactions();
      const filteredExpenseTransactions = getAnalyticsExpenseFilteredTransactions();

      const totalAll = roundToTwo(
        baseExpenseTransactions.reduce((sum, transaction) => {
          return sum + (Number(transaction.amount) || 0);
        }, 0)
      );

      const totalFiltered = roundToTwo(
        filteredExpenseTransactions.reduce((sum, transaction) => {
          return sum + (Number(transaction.amount) || 0);
        }, 0)
      );

      const ringItems = getAnalyticsExpenseItems(baseExpenseTransactions);
      const listItems = getAnalyticsExpenseItems(filteredExpenseTransactions);

      const shownTotal =
        analyticsExpenseCategoryFilter === "all" ? totalAll : totalFiltered;

      const valueEl = getPrimaryExpenseValueEl();
      const periodNoteEl = getPrimaryExpensePeriodNoteEl();

      if (valueEl) {
        valueEl.textContent = formatMoney(shownTotal);
      }

      if (analyticsExpensesTotalRowValue) {
        analyticsExpensesTotalRowValue.textContent = formatMoney(shownTotal);
      }

      if (periodNoteEl) {
        periodNoteEl.textContent = getAnalyticsExpensesPeriodNote();
      }

      renderAnalyticsExpensesRing(ringItems, totalAll);
      renderAnalyticsExpensesMonthStrip();
      renderAnalyticsExpensesCategories(listItems, shownTotal);
    }

    function resetAnalyticsExpenseCategoryFilter() {
      analyticsExpenseCategoryFilter = "all";
    }

    return {
      getAnalyticsExpensesPeriodNote,
      getAnalyticsExpenseColor,
      getAnalyticsExpenseItems,
      renderAnalyticsExpensesByCategory,
      resetAnalyticsExpenseCategoryFilter,
    };
  }

  window.FinanceAppAnalyticsExpensesRender = {
    create: createAnalyticsExpensesRender,
  };
})();
