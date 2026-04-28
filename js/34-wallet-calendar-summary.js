(() => {
  function parseMoneyText(text) {
    return Number(
      String(text || "")
        .replace(/\s/g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")
    ) || 0;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function syncMandatoryControlPercent() {
    const totalEl = document.getElementById("analyticsMandatoryTotalValue");
    const pendingEl = document.getElementById("analyticsPendingMandatoryValue");
    const controlEl = document.getElementById("walletMandatoryControlValue");
    const controlCard = controlEl?.closest(".required-payment-card--control");

    if (!totalEl || !pendingEl || !controlEl) return;

    const total = parseMoneyText(totalEl.textContent);
    const pending = parseMoneyText(pendingEl.textContent);

    const covered = total > 0
      ? clamp(((total - pending) / total) * 100, 0, 100)
      : 0;

    const rounded = Math.round(covered);

    controlEl.textContent = `${rounded}%`;

    if (controlCard) {
      controlCard.style.setProperty("--mandatory-control-progress", `${rounded}%`);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncMandatoryControlPercent();

    const observedNodes = [
      document.getElementById("analyticsMandatoryTotalValue"),
      document.getElementById("analyticsPendingMandatoryValue"),
      document.getElementById("analyticsMandatoryCoveredValue"),
    ].filter(Boolean);

    const observer = new MutationObserver(syncMandatoryControlPercent);

    observedNodes.forEach((node) => {
      observer.observe(node, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  });
})();