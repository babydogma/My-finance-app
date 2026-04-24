(() => {
  function createNavigationView({
    navWalletBtn,
    navAnalyticsBtn,
    navOperationsBtn,

    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,

    closeAnalyticsMonthWheel,
    renderAnalytics,
  }) {
    function setActiveNav(next) {
      navWalletBtn?.classList.toggle("is-active", next === "wallet");
      navAnalyticsBtn?.classList.toggle("is-active", next === "analytics");
      navOperationsBtn?.classList.toggle("is-active", next === "operations");
    }

    function showWalletView() {
      document.querySelector(".app")?.classList.remove("app--analytics");

      mainView?.classList.remove("hidden");
      categoriesManagerView?.classList.add("hidden");
      analyticsView?.classList.add("hidden");
      operationsView?.classList.add("hidden");

      closeAnalyticsMonthWheel();
      setActiveNav("wallet");
    }

    function openCategoriesManager() {
      document.querySelector(".app")?.classList.remove("app--analytics");

      mainView?.classList.add("hidden");
      categoriesManagerView?.classList.remove("hidden");
      analyticsView?.classList.add("hidden");
      operationsView?.classList.add("hidden");

      closeAnalyticsMonthWheel();
      setActiveNav("wallet");
    }

    function closeCategoriesManager() {
      showWalletView();
    }

    function showAnalyticsView() {
      document.querySelector(".app")?.classList.add("app--analytics");

      mainView?.classList.add("hidden");
      categoriesManagerView?.classList.add("hidden");
      operationsView?.classList.add("hidden");
      analyticsView?.classList.remove("hidden");

      setActiveNav("analytics");
      renderAnalytics();
    }

    return {
      setActiveNav,
      showWalletView,
      openCategoriesManager,
      closeCategoriesManager,
      showAnalyticsView,
    };
  }

  window.FinanceAppNavigationView = {
    create: createNavigationView,
  };
})();
