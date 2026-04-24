(() => {
  function createAnalyticsFilters({
    analyticsFiltersModal,
    openAnimatedModal,
    closeAnimatedModal,
    closeAnalyticsMonthWheel,

    getFilterPeriod,
    getSelectedMonth,
    getRangeStart,
    getRangeEnd,

    formatMonthLabel,
    formatDateRangeLabel,
  }) {
    function openAnalyticsFiltersModal() {
      openAnimatedModal(analyticsFiltersModal);
      document.body.style.overflow = "hidden";
    }

    function closeAnalyticsFiltersModal() {
      closeAnimatedModal(analyticsFiltersModal);
      closeAnalyticsMonthWheel();
    }

    function getAnalyticsPeriodLabel() {
      const analyticsFilterPeriod = getFilterPeriod();

      if (analyticsFilterPeriod === "month") {
        return formatMonthLabel(getSelectedMonth());
      }

      if (analyticsFilterPeriod === "today") {
        return "сегодня";
      }

      if (analyticsFilterPeriod === "7") {
        return "за 7 дней";
      }

      if (analyticsFilterPeriod === "range") {
        return formatDateRangeLabel(getRangeStart(), getRangeEnd());
      }

      return "";
    }

    return {
      openAnalyticsFiltersModal,
      closeAnalyticsFiltersModal,
      getAnalyticsPeriodLabel,
    };
  }

  window.FinanceAppAnalyticsFilters = {
    create: createAnalyticsFilters,
  };
})();
