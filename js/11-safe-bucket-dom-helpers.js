(() => {
  function createSafeBucketDomHelpers({
    state,
    isVaultAccountId,
    getRealSafeBuckets,
    accountSelect,
    fromAccountSelect,
    toAccountSelect,
    fromSafeBucketField,
    toSafeBucketField,
    fromSafeBucketSelect,
    toSafeBucketSelect,
    getCurrentMode,
  }) {
    function getBucketsForSelect() {
      if (typeof getRealSafeBuckets === "function") {
        return getRealSafeBuckets();
      }

      return state.safeBuckets.filter((bucket) => {
        return bucket.include_in_free_money !== true;
      });
    }

    function fillSafeBucketSelect(selectEl, placeholder, selectedId = "") {
      if (!selectEl) return;

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      getBucketsForSelect().forEach((bucket) => {
        const option = document.createElement("option");
        option.value = bucket.id;
        option.textContent = bucket.name;

        if (selectedId && selectedId === bucket.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    function hideSafeBucketFields() {
      fromSafeBucketField?.classList.add("hidden");
      toSafeBucketField?.classList.add("hidden");
    }

    function updateTransferSafeFields() {
      const mode = typeof getCurrentMode === "function"
        ? getCurrentMode()
        : "transfer";

      hideSafeBucketFields();

      if (mode === "expense") {
        const expenseFromSafes = isVaultAccountId(accountSelect?.value);

        if (!expenseFromSafes) {
          if (fromSafeBucketSelect) fromSafeBucketSelect.value = "";
          if (toSafeBucketSelect) toSafeBucketSelect.value = "";
          return;
        }

        fillSafeBucketSelect(
          fromSafeBucketSelect,
          "Из какого накопления",
          fromSafeBucketSelect?.value || ""
        );

        fromSafeBucketField?.classList.remove("hidden");

        if (toSafeBucketSelect) {
          toSafeBucketSelect.value = "";
        }

        return;
      }

      if (mode !== "transfer") {
        if (fromSafeBucketSelect) fromSafeBucketSelect.value = "";
        if (toSafeBucketSelect) toSafeBucketSelect.value = "";
        return;
      }

      const fromIsSafes = isVaultAccountId(fromAccountSelect?.value);
      const toIsSafes = isVaultAccountId(toAccountSelect?.value);

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

        fromSafeBucketField?.classList.remove("hidden");
      }

      if (toIsSafes) {
        fillSafeBucketSelect(
          toSafeBucketSelect,
          "В какое накопление",
          toSafeBucketSelect?.value || ""
        );

        toSafeBucketField?.classList.remove("hidden");
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