(() => {
  const UNCATEGORIZED_ID = "uncategorized";

  const state = {
    transactions: [],
    accounts: [],
    categories: [],
    budgetLimits: [],
    safeBuckets: [],
    appMeta: [],
    mandatoryPayments: [],
  };

  window.FinanceAppState = {
    UNCATEGORIZED_ID,
    state,
  };
})();