(() => {
  function normalizeFreeMoneyText(rawText) {
    return String(rawText || "")
      .replace(/^Свободно\s*:\s*/i, "")
      .trim();
  }

  function syncFreeMoneyValue() {
    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (!valueEl) return;

    const normalizedValue = normalizeFreeMoneyText(valueEl.textContent);

    if (normalizedValue && normalizedValue !== valueEl.textContent.trim()) {
      valueEl.textContent = normalizedValue;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncFreeMoneyValue();

    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (!valueEl) return;

    const observer = new MutationObserver(() => {
      syncFreeMoneyValue();
    });

    observer.observe(valueEl, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  });
})();