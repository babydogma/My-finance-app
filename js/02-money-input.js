(() => {
  function bindMoneyInput(input) {
    if (!input) return;

    const sanitize = () => {
      let value = String(input.value || "");

      value = value.replace(/\./g, ",");
      value = value.replace(/[^0-9,]/g, "");

      const firstCommaIndex = value.indexOf(",");

      if (firstCommaIndex !== -1) {
        value =
          value.slice(0, firstCommaIndex + 1) +
          value.slice(firstCommaIndex + 1).replace(/,/g, "");
      }

      input.value = value;
    };

    input.addEventListener("input", sanitize);

    input.addEventListener("paste", () => {
      requestAnimationFrame(sanitize);
    });

    input.addEventListener("blur", sanitize);
  }

  function parseMoneyInputValue(value) {
    const normalized = String(value || "")
      .trim()
      .replace(/\s/g, "")
      .replace(",", ".");

    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : NaN;
  }

  window.FinanceAppMoney = {
    bindMoneyInput,
    parseMoneyInputValue,
  };
})();