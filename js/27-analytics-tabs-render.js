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
    function normalizeAnalyticsTab(tab) {
      return tab === "safes" ? "safes" : "expenses";
    }

    function renderAnalytics() {
      const rawTab = getAnalyticsTab();
      const analyticsTab = normalizeAnalyticsTab(rawTab);

      if (rawTab !== analyticsTab) {
        setAnalyticsTabValue(analyticsTab);
      }

      const isExpenses = analyticsTab === "expenses";
      const isSafes = analyticsTab === "safes";

      analyticsOverviewSection?.classList.add("hidden");
      analyticsExpensesSection?.classList.toggle("hidden", !isExpenses);
      analyticsSafesSection?.classList.toggle("hidden", !isSafes);

      analyticsTabOverviewBtn?.classList.add("hidden");
      analyticsTabExpensesBtn?.classList.toggle("is-active", isExpenses);
      analyticsTabSafesBtn?.classList.toggle("is-active", isSafes);

      /*
        Обзор как экран удалён, но его расчёты нужны:
        - "Можно отложить" теперь живёт в Накоплениях
        - значения должны обновляться при каждом рендере аналитики
      */
      renderAnalyticsOverview();

      if (isExpenses) renderAnalyticsExpensesByCategory();
      if (isSafes) renderAnalyticsSafes();
    }

    function setAnalyticsTab(nextTab) {
      setAnalyticsTabValue(normalizeAnalyticsTab(nextTab));
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