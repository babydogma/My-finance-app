(() => {
  function createAnalyticsTabsRender({
    analyticsOverviewSection,
    analyticsExpensesSection,
    analyticsSafesSection,

    analyticsTabOverviewBtn,
    analyticsTabExpensesBtn,
    analyticsTabSafesBtn,

    getAnalyticsTab,
    setAnalyticsTabValue,

    renderAnalyticsOverview,
    renderAnalyticsExpensesByCategory,
    renderAnalyticsSafes,
  }) {
    function renderAnalytics() {
      const analyticsTab = getAnalyticsTab();

      const isOverview = analyticsTab === "overview";
      const isExpenses = analyticsTab === "expenses";
      const isSafes = analyticsTab === "safes";

      analyticsOverviewSection?.classList.toggle("hidden", !isOverview);
      analyticsExpensesSection?.classList.toggle("hidden", !isExpenses);
      analyticsSafesSection?.classList.toggle("hidden", !isSafes);

      analyticsTabOverviewBtn?.classList.toggle("is-active", isOverview);
      analyticsTabExpensesBtn?.classList.toggle("is-active", isExpenses);
      analyticsTabSafesBtn?.classList.toggle("is-active", isSafes);

      if (isOverview) renderAnalyticsOverview();
      if (isExpenses) renderAnalyticsExpensesByCategory();
      if (isSafes) renderAnalyticsSafes();
    }

    function setAnalyticsTab(nextTab) {
      setAnalyticsTabValue(nextTab);
      renderAnalytics();
    }

    return {
      renderAnalytics,
      setAnalyticsTab,
    };
  }

  window.FinanceAppAnalyticsTabsRender = {
    create: createAnalyticsTabsRender,
  };
})();
