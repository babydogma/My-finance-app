(() => {
  function getTextById(id, fallback = "0 ₽") {
    const element = document.getElementById(id);
    const text = element?.textContent?.trim();

    return text || fallback;
  }

  function setTextById(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = value;
  }

  function syncHardAnalyticsPreview() {
    setTextById(
      "hardAnalyticsExpenseValue",
      getTextById("analyticsExpenseValue", "0 ₽")
    );

    setTextById(
      "hardAnalyticsLimitsValue",
      getTextById("analyticsRemainingBudgetsValue", "0 ₽")
    );

    setTextById(
      "hardAnalyticsInterestValue",
      getTextById("analyticsInterestValue", "0 ₽")
    );

    setTextById(
      "hardAnalyticsControlValue",
      getTextById("walletMandatoryControlValue", "0%")
    );
  }

  function bindHardAnalyticsButton() {
    const button = document.getElementById("hardAnalyticsOpenReportBtn");

    if (!button) return;

    button.addEventListener("click", () => {
      document.getElementById("openMonthlyReportBtn")?.click();
    });
  }

  function observeSource(id) {
    const source = document.getElementById(id);

    if (!source) return;

    const observer = new MutationObserver(syncHardAnalyticsPreview);

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function start() {
    syncHardAnalyticsPreview();
    bindHardAnalyticsButton();

    [
      "analyticsExpenseValue",
      "analyticsRemainingBudgetsValue",
      "analyticsInterestValue",
      "walletMandatoryControlValue",
    ].forEach(observeSource);

    window.addEventListener("focus", syncHardAnalyticsPreview);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      syncHardAnalyticsPreview();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();