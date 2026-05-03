(() => {
  let syncTimer = null;

  function getTextById(id, fallback = "0 ₽") {
    const element = document.getElementById(id);
    const text = element?.textContent?.trim();

    return text || fallback;
  }

  function getTextBySelector(selector, fallback = "0 ₽") {
    const element = document.querySelector(selector);
    const text = element?.textContent?.trim();

    return text || fallback;
  }

  function setTextById(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = value;
  }

  function extractExpectedIncomeDate(text) {
    const source = String(text || "");
    const match = source.match(/(\d{1,2}\s+[а-яё]+)/i);

    return match?.[1] || "";
  }

  function syncExpectedIncomeCard() {
    const label = document.getElementById("walletExpectedIncomeLabel");
    const value = document.getElementById("walletExpectedIncomeValue");
    const button = document.getElementById("openExpectedIncomeModalBtn");

    if (!label || !value || !button) return;

    const valueText = value.textContent.trim();
    const hasExpectedIncome =
      valueText &&
      !valueText.toLowerCase().includes("добавь") &&
      valueText !== "0 ₽";

    if (!hasExpectedIncome) {
      label.textContent = "Будущие деньги не учтены";
      button.textContent = "Жду деньги";
      return;
    }

    label.textContent = "Ждёшь деньги";

    const dateLabel = extractExpectedIncomeDate(valueText);

    if (dateLabel) {
      button.textContent = dateLabel;
    }
  }

  function syncHardSummary() {
    setTextById(
      "hardSummaryFreeValue",
      getTextById("balanceFreeMoneyValue", "0 ₽")
    );

    setTextById(
      "hardSummaryBalanceValue",
      getTextBySelector(".hard-source-metrics .balance-amount", "0 ₽")
    );

    setTextById(
      "hardSummaryCalendarValue",
      getTextById("walletCalendarPressureValue", "0 ₽")
    );

    setTextById(
      "hardSummaryLimitsValue",
      getTextById("walletLimitsPressureValue", "0 ₽")
    );
  }

  function syncHardPressure() {
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

  function syncHardModePreview() {
    syncHardSummary();
    syncHardPressure();
    syncExpectedIncomeCard();
  }

  function scheduleSync() {
    window.clearTimeout(syncTimer);

    syncTimer = window.setTimeout(syncHardModePreview, 0);
  }

  function bindHardActions() {
    document.addEventListener("click", (event) => {
      const mandatoryCard = event.target.closest('[data-hard-open="mandatory"]');
      const accountsBtn = event.target.closest("#hardScrollAccountsBtn");

      if (mandatoryCard) {
        event.preventDefault();
        document.getElementById("openMandatoryPaymentsModalBtn")?.click();
        return;
      }

      if (accountsBtn) {
        event.preventDefault();

        document.querySelector(".accounts-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  function observeSourceById(id) {
    const source = document.getElementById(id);

    if (!source) return;

    const observer = new MutationObserver(scheduleSync);

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function observeSourceBySelector(selector) {
    const source = document.querySelector(selector);

    if (!source) return;

    const observer = new MutationObserver(scheduleSync);

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function startSyncLoop() {
    syncHardModePreview();

    window.setTimeout(syncHardModePreview, 100);
    window.setTimeout(syncHardModePreview, 350);
    window.setTimeout(syncHardModePreview, 900);
    window.setTimeout(syncHardModePreview, 1600);
  }

  function start() {
    bindHardActions();

    [
      "balanceFreeMoneyValue",
      "walletCalendarPressureValue",
      "walletLimitsPressureValue",
      "analyticsPendingMandatoryValue",
      "walletMandatoryControlValue",
      "walletExpectedIncomeLabel",
      "walletExpectedIncomeValue",
    ].forEach(observeSourceById);

    observeSourceBySelector(".hard-source-metrics .balance-amount");

    startSyncLoop();

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