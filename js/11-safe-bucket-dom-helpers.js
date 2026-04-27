(() => {
  function createSafeBucketDomHelpers({
    state,
    isVaultAccountId,
    getRealSafeBuckets,
    getFreeSafeBucket,
    getTransferAccounts,
    accountSelect,
    fromAccountSelect,
    toAccountSelect,
    fromSafeBucketField,
    toSafeBucketField,
    fromSafeBucketSelect,
    toSafeBucketSelect,
    getCurrentMode,
  }) {
    function getRealBucketsForSelect() {
      if (typeof getRealSafeBuckets === "function") {
        return getRealSafeBuckets();
      }

      return state.safeBuckets.filter((bucket) => {
        return bucket.include_in_free_money !== true;
      });
    }

    function getFreeBucketForTransfer() {
      if (typeof getFreeSafeBucket === "function") {
        return getFreeSafeBucket();
      }

      return (
        state.safeBuckets.find((bucket) => {
          const name = String(bucket.name || "").trim().toLowerCase();
          const kind = String(bucket.bucket_kind || "").trim().toLowerCase();

          return (
            bucket.include_in_free_money === true ||
            kind === "free" ||
            kind === "system_free" ||
            name === "свободные" ||
            name === "свободно"
          );
        }) || null
      );
    }

    function getBucketsForSelect({ includeFree = false } = {}) {
      const realBuckets = getRealBucketsForSelect();
      const freeBucket = includeFree ? getFreeBucketForTransfer() : null;

      if (!freeBucket) {
        return realBuckets;
      }

      const hasFreeInRealList = realBuckets.some((bucket) => {
        return bucket.id === freeBucket.id;
      });

      if (hasFreeInRealList) {
        return realBuckets;
      }

      return [
        {
          ...freeBucket,
          name: "Свободные",
        },
        ...realBuckets,
      ];
    }

    function getAccountsForTransfer() {
      if (typeof getTransferAccounts === "function") {
        return getTransferAccounts();
      }

      return state.accounts.filter((account) => {
        return account.account_kind !== "system";
      });
    }

    function fillTransferAccountSelect(selectEl, placeholder, selectedId = "") {
      if (!selectEl) return;

      const previousValue = selectedId || selectEl.value || "";

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      getAccountsForTransfer().forEach((account) => {
        const option = document.createElement("option");

        option.value = account.id;
        option.textContent = account.name || "Счёт";

        if (previousValue && previousValue === account.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    function syncTransferAccountSelects() {
      fillTransferAccountSelect(
        fromAccountSelect,
        "С какого счёта",
        fromAccountSelect?.value || ""
      );

      fillTransferAccountSelect(
        toAccountSelect,
        "На какой счёт",
        toAccountSelect?.value || ""
      );
    }

    function fillSafeBucketSelect(
      selectEl,
      placeholder,
      selectedId = "",
      options = {}
    ) {
      if (!selectEl) return;

      const previousValue = selectedId || selectEl.value || "";

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      getBucketsForSelect(options).forEach((bucket) => {
        const option = document.createElement("option");

        option.value = bucket.id;
        option.textContent = bucket.name || "Накопление";

        if (previousValue && previousValue === bucket.id) {
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
      const mode =
        typeof getCurrentMode === "function"
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
          fromSafeBucketSelect?.value || "",
          {
            includeFree: false,
          }
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

      syncTransferAccountSelects();

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
          fromSafeBucketSelect?.value || "",
          {
            includeFree: true,
          }
        );

        fromSafeBucketField?.classList.remove("hidden");
      }

      if (toIsSafes) {
        fillSafeBucketSelect(
          toSafeBucketSelect,
          "В какое накопление",
          toSafeBucketSelect?.value || "",
          {
            includeFree: true,
          }
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