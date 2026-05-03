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

  function syncHardModePreview() {
    setTextById(
      "hardPressureMandatoryValue",
      getTextById("analyticsPendingMandatoryValue", "0 ₽")
    );

    setTextById(
      "hardPressureLimitsValue",
      getTextById("walletLimitsPressureValue", "0 ₽")
    );

    setTextById(
      "hardPressureFreeValue",
      getTextById("balanceFreeMoneyValue", "0 ₽")
    );

    setTextById(
      "hardPressureControlValue",
      getTextById("walletMandatoryControlValue", "0%")
    );
  }

  function bindHardPressureActions() {
    document.addEventListener("click", (event) => {
      const mandatoryCard = event.target.closest('[data-hard-open="mandatory"]');

      if (!mandatoryCard) return;

      event.preventDefault();

      document.getElementById("openMandatoryPaymentsModalBtn")?.click();
    });
  }

  function observeSource(id) {
    const source = document.getElementById(id);

    if (!source) return;

    const observer = new MutationObserver(syncHardModePreview);

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function start() {
    syncHardModePreview();
    bindHardPressureActions();

    [
      "analyticsPendingMandatoryValue",
      "walletLimitsPressureValue",
      "balanceFreeMoneyValue",
      "walletMandatoryControlValue",
    ].forEach(observeSource);

    window.addEventListener("focus", syncHardModePreview);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      syncHardModePreview();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();