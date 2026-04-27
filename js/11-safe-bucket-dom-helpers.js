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

(() => {
  const PATCHED_MARK = "safeBucketsCleanupControlsPatched";
  const FREE_BUCKET_MARK = "safeBucketsFreeDeletePatched";

  function getState() {
    return window.FinanceAppState?.state || null;
  }

  function getSupabaseClient() {
    if (typeof supabaseClient === "undefined") {
      return null;
    }

    return supabaseClient;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function getTodayDateValue() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 10);
  }

  function isFreeSafeBucket(bucket) {
    if (!bucket) return false;

    const name = String(bucket.name || "").trim().toLowerCase();
    const kind = String(bucket.bucket_kind || "").trim().toLowerCase();

    return (
      bucket.include_in_free_money === true ||
      kind === "free" ||
      kind === "system_free" ||
      name === "свободные" ||
      name === "свободно"
    );
  }

  function getVaultAccount(state) {
    return (
      state?.accounts?.find((account) => account.account_kind === "vault_pool") ||
      null
    );
  }

  function getFreeSafeBucket(state) {
    return state?.safeBuckets?.find(isFreeSafeBucket) || null;
  }

  function getRealSafeBuckets(state) {
    return (state?.safeBuckets || []).filter((bucket) => !isFreeSafeBucket(bucket));
  }

  function getAccountBalance(state, account) {
    if (!state || !account) return 0;

    const accountId = account.id;
    const accountName = account.name;

    const balance = (state.transactions || []).reduce((sum, transaction) => {
      const amount = roundToTwo(transaction.amount || 0);

      if (transaction.type === "income") {
        const matchesById =
          transaction.account_id && transaction.account_id === accountId;

        const matchesLegacy =
          !transaction.account_id && transaction.account === accountName;

        if (matchesById || matchesLegacy) {
          return sum + amount;
        }
      }

      if (transaction.type === "expense") {
        const matchesById =
          transaction.account_id && transaction.account_id === accountId;

        const matchesLegacy =
          !transaction.account_id && transaction.account === accountName;

        if (matchesById || matchesLegacy) {
          return sum - amount;
        }
      }

      if (transaction.type === "transfer") {
        const fromMatchesById =
          transaction.from_account_id && transaction.from_account_id === accountId;

        const fromMatchesLegacy =
          !transaction.from_account_id && transaction.from_account === accountName;

        const toMatchesById =
          transaction.to_account_id && transaction.to_account_id === accountId;

        const toMatchesLegacy =
          !transaction.to_account_id && transaction.to_account === accountName;

        if (fromMatchesById || fromMatchesLegacy) {
          sum -= amount;
        }

        if (toMatchesById || toMatchesLegacy) {
          sum += amount;
        }
      }

      return sum;
    }, 0);

    return roundToTwo(balance);
  }

  function getSafeBucketBalance(state, bucketId) {
    const vaultAccount = getVaultAccount(state);

    if (!vaultAccount || !bucketId) return 0;

    const safeAccountId = vaultAccount.id;
    const safeAccountName = vaultAccount.name;

    const balance = (state.transactions || []).reduce((sum, transaction) => {
      const amount = roundToTwo(transaction.amount || 0);

      if (transaction.type === "transfer") {
        const goesToSafe =
          (transaction.to_account_id && transaction.to_account_id === safeAccountId) ||
          (!transaction.to_account_id && transaction.to_account === safeAccountName);

        const goesFromSafe =
          (transaction.from_account_id && transaction.from_account_id === safeAccountId) ||
          (!transaction.from_account_id && transaction.from_account === safeAccountName);

        if (goesToSafe && transaction.to_safe_bucket_id === bucketId) {
          sum += amount;
        }

        if (goesFromSafe && transaction.from_safe_bucket_id === bucketId) {
          sum -= amount;
        }
      }

      if (transaction.type === "income") {
        const incomeToSafe =
          (transaction.account_id && transaction.account_id === safeAccountId) ||
          (!transaction.account_id && transaction.account === safeAccountName);

        if (incomeToSafe && transaction.to_safe_bucket_id === bucketId) {
          sum += amount;
        }
      }

      if (transaction.type === "expense") {
        const expenseFromSafe =
          (transaction.account_id && transaction.account_id === safeAccountId) ||
          (!transaction.account_id && transaction.account === safeAccountName);

        const expenseBucketId =
          transaction.from_safe_bucket_id ||
          transaction.safe_bucket_id ||
          "";

        if (expenseFromSafe && expenseBucketId === bucketId) {
          sum -= amount;
        }
      }

      return sum;
    }, 0);

    return roundToTwo(balance);
  }

  function getUnassignedSafeBalance(state) {
    const vaultAccount = getVaultAccount(state);

    if (!vaultAccount) return 0;

    const totalSafeBalance = getAccountBalance(state, vaultAccount);
    const distributedBalance = getRealSafeBuckets(state).reduce((sum, bucket) => {
      return sum + getSafeBucketBalance(state, bucket.id);
    }, 0);

    return roundToTwo(totalSafeBalance - distributedBalance);
  }

  async function insertCorrectionTransaction(client, payload) {
    const optionalColumns = [
      "category_id",
      "comment",
      "from_safe_bucket_id",
      "to_safe_bucket_id",
      "safe_bucket_id",
      "account",
    ];

    let nextPayload = { ...payload };

    for (let attempt = 0; attempt <= optionalColumns.length; attempt += 1) {
      const { error } = await client.from("transactions").insert([nextPayload]);

      if (!error) return;

      const message = String(error.message || "");
      const missingColumn = optionalColumns.find((column) => {
        return message.includes(`'${column}'`) || message.includes(column);
      });

      if (!missingColumn) {
        throw error;
      }

      delete nextPayload[missingColumn];
    }
  }

    function patchUnassignedRow(modal) {
  const row = modal.querySelector("#safeBucketsUnassignedCard");

  if (!row) return;

  const valueEl =
    document.getElementById("safeBucketsUnassignedValue") ||
    row.querySelector(".list-value");

  if (valueEl) {
    const savedHiddenValue = localStorage.getItem("financeAppHiddenUnassignedSafeValue");
    const currentValue = String(valueEl.textContent || "").trim();

    if (savedHiddenValue && currentValue === savedHiddenValue) {
      valueEl.textContent = "";
      valueEl.classList.add("safe-buckets-value-hidden-by-reset");
    }

    if (savedHiddenValue && currentValue && currentValue !== savedHiddenValue) {
      localStorage.removeItem("financeAppHiddenUnassignedSafeValue");
      valueEl.classList.remove("safe-buckets-value-hidden-by-reset");
    }
  }

  if (row.dataset[PATCHED_MARK] === "true") return;

  row.dataset[PATCHED_MARK] = "true";

  const button = getOrCreateRowActionButton(
    row,
    "safe-buckets-row-reset-btn",
    "Обнулить"
  );

  button.setAttribute("aria-label", "Скрыть сумму не распределено");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    resetUnassignedSafeMoney();
  });
}
  
    async function clearFreeBucketReferences(client, bucketId) {
      const columns = ["from_safe_bucket_id", "to_safe_bucket_id", "safe_bucket_id"];
  
      for (const column of columns) {
        const { error } = await client
          .from("transactions")
          .update({ [column]: null })
          .eq(column, bucketId);
  
        if (error && !String(error.message || "").toLowerCase().includes("column")) {
          throw error;
        }
      }
    }
  
    async function deleteFreeSafeBucket(event) {
      event.preventDefault();
      event.stopPropagation();
  
      const state = getState();
      const client = getSupabaseClient();
      const freeBucket = getFreeSafeBucket(state);
  
      if (!state || !client || !freeBucket) {
        alert("Свободные не найдены или данные ещё не загружены.");
        return;
      }
  
      const confirmed = confirm(
        "Удалить раздел «Свободные»? Его операции станут нераспределёнными."
      );
  
      if (!confirmed) return;
  
      try {
        await clearFreeBucketReferences(client, freeBucket.id);
  
        const { error } = await client
          .from("safe_buckets")
          .delete()
          .eq("id", freeBucket.id);
  
      if (error) {
        throw error;
      }

      window.location.reload();
    } catch (error) {
      alert(`Не получилось удалить «Свободные»: ${error.message || "ошибка Supabase"}`);
    }
  }

  function getOrCreateRowActionButton(row, className, label) {
    let button = row.querySelector(`.${className}`);

    if (button) return button;

    button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;

    const rightSide = row.querySelector(".list-right") || row;
    rightSide.appendChild(button);

    return button;
  }

  function patchUnassignedRow(modal) {
    const row = modal.querySelector("#safeBucketsUnassignedCard");

    if (!row || row.dataset[PATCHED_MARK] === "true") return;

    row.dataset[PATCHED_MARK] = "true";

    const button = getOrCreateRowActionButton(
      row,
      "safe-buckets-row-reset-btn",
      "Обнулить"
    );

    button.setAttribute("aria-label", "Обнулить не распределено");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      resetUnassignedSafeMoney();
    });
  }

  function patchFreeBucketRow(modal) {
    const state = getState();
    const freeBucket = getFreeSafeBucket(state);
    const freeBucketName = String(freeBucket?.name || "Свободные")
      .trim()
      .toLowerCase();

    const rows = Array.from(modal.querySelectorAll(".safe-buckets-wallet-row"));

    rows.forEach((row) => {
      if (row.dataset[FREE_BUCKET_MARK] === "true") return;

      const title = String(row.querySelector(".list-title")?.textContent || "")
        .trim()
        .toLowerCase();

      const isFreeRow =
        title === freeBucketName ||
        title === "свободные" ||
        title === "свободно";

      if (!isFreeRow) return;

      row.dataset[FREE_BUCKET_MARK] = "true";

      const button = getOrCreateRowActionButton(
        row,
        "safe-buckets-row-delete-btn",
        "Удалить"
      );

      button.setAttribute("aria-label", "Удалить Свободные");
      button.addEventListener("click", deleteFreeSafeBucket);
    });
  }

  function patchSafeBucketsModal() {
    const modal = document.getElementById("safeBucketsModal");

    if (!modal) return;

    patchUnassignedRow(modal);
    patchFreeBucketRow(modal);
  }

  document.addEventListener("DOMContentLoaded", () => {
    let frameId = 0;

    const schedulePatch = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        frameId = 0;
        patchSafeBucketsModal();
      });
    };

    schedulePatch();

    const modal = document.getElementById("safeBucketsModal");

    if (!modal) return;

    const observer = new MutationObserver(schedulePatch);

    observer.observe(modal, {
      childList: true,
      subtree: true,
    });
  });
})();