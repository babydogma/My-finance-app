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
          .filter((item) => item.type === "income" && item.title === "ÐÑÐ¾ÑÐµÐ½ÑÑ Ð¿Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ")
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
          analyticsCanSaveNowStatus.textContent = "ÐÐ¾Ð¶Ð½Ð¾";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `ÐÐ¾ÑÐ»Ðµ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶ÐµÐ¹ Ð¸ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² Ð¾ÑÑÐ°ÑÑÑÑ ${formatMoney(summary.canSaveNow)}.`;
        }
      } else {
        const deficit = Math.abs(
          Math.min(
            0,
            roundToTwo(
              summary.freeMoney -
                summary.pendingMandatoryToDeduct -
                summary.remainingBudgets
            )
          )
        );

        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "Ð¡ÐµÐ¹ÑÐ°Ñ ÑÐ°Ð½Ð¾";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `ÐÐµ ÑÐ²Ð°ÑÐ°ÐµÑ ${formatMoney(deficit)} Ð¿Ð¾ÑÐ»Ðµ ÑÑÑÑÐ° Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¸ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð².`;
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
