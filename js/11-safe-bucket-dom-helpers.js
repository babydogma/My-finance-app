(() => {
  function createSafeBucketDomHelpers({
    state,
    isVaultAccountId,
    fromAccountSelect,
    toAccountSelect,
    fromSafeBucketField,
    toSafeBucketField,
    fromSafeBucketSelect,
    toSafeBucketSelect,
  }) {
    function fillSafeBucketSelect(selectEl, placeholder, selectedId = "") {
      if (!selectEl) return;

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      state.safeBuckets.forEach((bucket) => {
        const option = document.createElement("option");
        option.value = bucket.id;
        option.textContent = bucket.name;

        if (selectedId && selectedId === bucket.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    function updateTransferSafeFields() {
      const fromIsSafes = isVaultAccountId(fromAccountSelect?.value);
      const toIsSafes = isVaultAccountId(toAccountSelect?.value);

      fromSafeBucketField?.classList.toggle("hidden", !fromIsSafes);
      toSafeBucketField?.classList.toggle("hidden", !toIsSafes);

      if (!fromIsSafes && fromSafeBucketSelect) {
        fromSafeBucketSelect.value = "";
      }

      if (!toIsSafes && toSafeBucketSelect) {
        toSafeBucketSelect.value = "";
      }

      if (fromIsSafes) {
        fillSafeBucketSelect(
          fromSafeBucketSelect,
          "Из какого накопления",
          fromSafeBucketSelect?.value || ""
        );
      }

      if (toIsSafes) {
        fillSafeBucketSelect(
          toSafeBucketSelect,
          "В какое накопление",
          toSafeBucketSelect?.value || ""
        );
      }
    }

    return {
      fillSafeBucketSelect,
      updateTransferSafeFields,
    };
  }

  window.FinanceAppSafeBucketDomHelpers = {
    create: createSafeBucketDomHelpers,
  };
})();