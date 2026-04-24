(() => {
  function createBudgetAnalyticsCalculations({
    state,
    roundToTwo,
    UNCATEGORIZED_ID,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    isRequiredCategory,
    formatMoney,
    getCategoryName,
  }) {
    function getBudgetLimitByCategoryId(categoryId) {
      return state.budgetLimits.find((item) => item.category_id === categoryId);
    }

    function getBudgetLimitLabel(categoryId) {
      const record = getBudgetLimitByCategoryId(categoryId);
      const amount = record ? Number(record.monthly_limit) || 0 : 0;

      return amount > 0 ? formatMoney(amount) : "—";
    }

    function getAnalyticsSpentLimitLabel(spent, categoryId) {
      return `${formatMoney(spent)} / ${getBudgetLimitLabel(categoryId)}`;
    }

    function isBudgetExceeded(spent, categoryId) {
      const record = getBudgetLimitByCategoryId(categoryId);
      const limit = record ? Number(record.monthly_limit) || 0 : 0;

      return limit > 0 && spent > limit;
    }

    function getFlexibleBudgetStats(filteredTransactions) {
      const byCategory = new Map();

      filteredTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        if (isRequiredCategory(categoryId)) return;

        const current = byCategory.get(categoryId) || 0;
        byCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      let exceededCount = 0;
      let nearLimitCount = 0;
      let limitedCount = 0;

      byCategory.forEach((spent, categoryId) => {
        const limitRecord = getBudgetLimitByCategoryId(categoryId);
        const limit = limitRecord ? Number(limitRecord.monthly_limit) || 0 : 0;

        if (limit <= 0) return;

        limitedCount += 1;

        if (spent > limit) {
          exceededCount += 1;
          return;
        }

        if (spent >= limit * 0.85) {
          nearLimitCount += 1;
        }
      });

      return {
        exceededCount,
        nearLimitCount,
        limitedCount,
      };
    }

    function getCurrentMonthTransactions() {
      return filterTransactionsByPeriod(
        state.transactions,
        "month",
        getCurrentMonthValue(),
        "",
        ""
      );
    }

    function getRemainingFlexibleBudgetsCurrentMonth() {
      const monthTransactions = getCurrentMonthTransactions();
      const spentByCategory = new Map();

      monthTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const current = spentByCategory.get(categoryId) || 0;
        spentByCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      let total = 0;

      state.budgetLimits.forEach((limit) => {
        const categoryId = limit.category_id;
        const limitAmount = Number(limit.monthly_limit) || 0;

        if (limitAmount <= 0) return;
        if (isRequiredCategory(categoryId)) return;

        const spent = spentByCategory.get(categoryId) || 0;
        const remaining = Math.max(0, roundToTwo(limitAmount - spent));

        total += remaining;
      });

      return roundToTwo(total);
    }

    function getRemainingFlexibleBudgetsBreakdownCurrentMonth() {
      const monthTransactions = getCurrentMonthTransactions();
      const spentByCategory = new Map();

      monthTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const current = spentByCategory.get(categoryId) || 0;
        spentByCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      const rows = [];

      state.budgetLimits.forEach((limit) => {
        const categoryId = limit.category_id;
        const limitAmount = Number(limit.monthly_limit) || 0;

        if (limitAmount <= 0) return;
        if (isRequiredCategory(categoryId)) return;

        const spent = roundToTwo(spentByCategory.get(categoryId) || 0);
        const remaining = Math.max(0, roundToTwo(limitAmount - spent));

        rows.push({
          categoryId,
          name: getCategoryName(categoryId),
          limit: roundToTwo(limitAmount),
          spent,
          remaining,
        });
      });

      return rows
        .filter((item) => item.remaining > 0)
        .sort((a, b) => b.remaining - a.remaining);
    }

    function getInsightsWorkingMinimum(requiredExpense, flexibleExpense) {
      return roundToTwo(
        Math.max(
          requiredExpense * 0.5,
          flexibleExpense * 0.35,
          5000
        )
      );
    }

    function getInsightsCanSaveNow(
      availableNowBalance,
      workingMinimum,
      exceededCount,
      nearLimitCount
    ) {
      let canSave = Math.max(0, roundToTwo(availableNowBalance - workingMinimum));

      if (exceededCount > 0) {
        return 0;
      }

      if (nearLimitCount > 0) {
        canSave = roundToTwo(canSave * 0.5);
      }

      return Math.max(0, canSave);
    }

    return {
      getBudgetLimitByCategoryId,
      getBudgetLimitLabel,
      getAnalyticsSpentLimitLabel,
      isBudgetExceeded,
      getFlexibleBudgetStats,
      getCurrentMonthTransactions,
      getRemainingFlexibleBudgetsCurrentMonth,
      getRemainingFlexibleBudgetsBreakdownCurrentMonth,
      getInsightsWorkingMinimum,
      getInsightsCanSaveNow,
    };
  }

  window.FinanceAppBudgetAnalyticsCalculations = {
    create: createBudgetAnalyticsCalculations,
  };
})();