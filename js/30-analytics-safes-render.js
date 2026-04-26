(() => {
  function createAnalyticsSafesRender({
  state,
  getAnalyticsOverviewSummary,
  getSafeBucketBalance,
  isRequiredCategory,
  formatMoney,
  escapeHtml,

  analyticsInterestValue,
  analyticsSafeList,
}) {
    function renderAnalyticsSafes() {
      const summary = getAnalyticsOverviewSummary();

      if (analyticsInterestValue) {
  analyticsInterestValue.textContent = formatMoney(summary.safeInterest);
}

if (window.FinanceAppAnalyticsSafeModels?.renderAnalyticsSafeModels) {
  window.FinanceAppAnalyticsSafeModels.renderAnalyticsSafeModels({
    state,
    isRequiredCategory,
    formatMoney,
    escapeHtml,
  });
}

if (!analyticsSafeList) return;

      analyticsSafeList.innerHTML = "";

      if (!state.safeBuckets.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Накоплений пока нет</h3>
            <p class="list-subtitle">Создай накопление в разделе кошелька</p>
          </div>
        `;

        analyticsSafeList.appendChild(empty);
        return;
      }

      state.safeBuckets.forEach((bucket) => {
        const row = document.createElement("div");
        row.className = "list-card";

        row.innerHTML = `
          <div class="list-body">
            <div class="list-title-row">
              <h3 class="list-title">${escapeHtml(bucket.name)}</h3>
            </div>
            <p class="list-subtitle">
              ${bucket.is_locked ? "Системное накопление" : "Накопление"}
            </p>
          </div>

          <div class="list-right">
            <p class="list-value">${formatMoney(getSafeBucketBalance(bucket.id))}</p>
          </div>
        `;

        analyticsSafeList.appendChild(row);
      });
    }

    return {
      renderAnalyticsSafes,
    };
  }

  window.FinanceAppAnalyticsSafesRender = {
    create: createAnalyticsSafesRender,
  };
})();
