(() => {
  function createAnalyticsOverviewRender({
    state,
    roundToTwo,
    calculateBalance,
    getFreeMoneyTotal,
    getProtectedMoneyTotal,
    getMandatoryPaymentsCoverageStats,
    getRemainingFlexibleBudgetsCurrentMonth,
    formatMoney,

    analyticsTotalBalanceValue,
    analyticsFreeMoneyValue,
    analyticsProtectedMoneyValue,
    analyticsPendingMandatoryValue,
    analyticsMandatoryTotalValue,
    analyticsMandatoryCoveredValue,
    analyticsRemainingBudgetsValue,
    analyticsCanSaveNowValue,
    analyticsCanSaveNowStatus,
    analyticsCanSaveNowHint,
  }) {
    function getAnalyticsOverviewSummary() {
      const totalBalance = roundToTwo(calculateBalance());
      const freeMoney = roundToTwo(getFreeMoneyTotal());
      const protectedMoney = roundToTwo(getProtectedMoneyTotal());

      const mandatoryStats = getMandatoryPaymentsCoverageStats();
      const pendingMandatoryTotal = mandatoryStats.total;
      const pendingMandatoryCoveredByLinkedSafes = mandatoryStats.coveredByLinkedSafes;
      const pendingMandatoryToDeduct = mandatoryStats.chargeToFreeMoney;

      const remainingBudgets = roundToTwo(getRemainingFlexibleBudgetsCurrentMonth());

      const safeInterest = roundToTwo(
        state.transactions
          .filter((item) => item.type === "income" && item.title === "Проценты по накоплению")
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
      );

      const canSaveNow = Math.max(
        0,
        roundToTwo(freeMoney - pendingMandatoryToDeduct - remainingBudgets)
      );

      return {
        totalBalance,
        freeMoney,
        protectedMoney,
        pendingMandatoryTotal,
        pendingMandatoryCoveredByLinkedSafes,
        pendingMandatoryToDeduct,
        remainingBudgets,
        canSaveNow,
        safeInterest,
      };
    }

    function renderAnalyticsOverview() {
      const summary = getAnalyticsOverviewSummary();

      if (analyticsTotalBalanceValue) {
        analyticsTotalBalanceValue.textContent = formatMoney(summary.totalBalance);
      }

      if (analyticsFreeMoneyValue) {
        analyticsFreeMoneyValue.textContent = formatMoney(summary.freeMoney);
      }

      if (analyticsProtectedMoneyValue) {
        analyticsProtectedMoneyValue.textContent = formatMoney(summary.protectedMoney);
      }

      if (analyticsPendingMandatoryValue) {
        analyticsPendingMandatoryValue.textContent = formatMoney(summary.pendingMandatoryToDeduct);
      }

      if (analyticsMandatoryTotalValue) {
        analyticsMandatoryTotalValue.textContent = formatMoney(summary.pendingMandatoryTotal);
      }

      if (analyticsMandatoryCoveredValue) {
        analyticsMandatoryCoveredValue.textContent = formatMoney(
          summary.pendingMandatoryCoveredByLinkedSafes
        );
      }

      if (analyticsRemainingBudgetsValue) {
        analyticsRemainingBudgetsValue.textContent = formatMoney(summary.remainingBudgets);
      }

      analyticsCanSaveNowValue?.classList.remove("is-positive", "is-negative");
      analyticsCanSaveNowValue?.classList.add(
        summary.canSaveNow > 0 ? "is-positive" : "is-negative"
      );

      if (analyticsCanSaveNowValue) {
        analyticsCanSaveNowValue.textContent = formatMoney(
          summary.canSaveNow > 0 ? summary.canSaveNow : 0
        );
      }

      if (summary.canSaveNow > 0) {
        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "Можно";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `После обязательных платежей и лимитов остаётся ${formatMoney(summary.canSaveNow)}.`;
        }
      } else {
        const deficit = Math.abs(
          roundToTwo(
            summary.freeMoney -
              summary.pendingMandatoryTotal -
              summary.remainingBudgets
          )
        );

        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "Сейчас рано";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `Не хватает ${formatMoney(deficit)} после учёта обязательных и лимитов.`;
        }
      }
    }

    return {
      getAnalyticsOverviewSummary,
      renderAnalyticsOverview,
    };
  }

  window.FinanceAppAnalyticsOverviewRender = {
    create: createAnalyticsOverviewRender,
  };
})();
