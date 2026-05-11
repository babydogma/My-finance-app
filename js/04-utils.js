// ===== js/09-safe-bucket-calculations.js =====
(() => {
  function createSafeBucketCalculations({
    state,
    roundToTwo,
    getFreeSafeBucket,
    getRealSafeBuckets,
    isRealSafeBucket,
    getSafeAccountId,
    getSafeAccountName,
    getAccountBalance,
    getSafeBucketsByKind,
    getProtectedAccounts,
    getFreeMoneyAccounts,
  }) {
    function normalizeSavingsValue(value) {
      return String(value || "").trim().toLowerCase();
    }

    function getLegacyBucketKind(bucket) {
      return normalizeSavingsValue(
        bucket?.kind ||
        bucket?.bucket_kind ||
        ""
      );
    }

    function getSavingsType(bucket) {
      const type = normalizeSavingsValue(bucket?.savings_type);

      if (type) return type;

      const legacyKind = getLegacyBucketKind(bucket);

      if (legacyKind === "tax" || legacyKind === "housing") {
        return "required";
      }

      if (legacyKind === "reserve") {
        return "reserve";
      }

      return "default";
    }

    function isBucketProtected(bucket) {
      if (typeof bucket?.include_in_protected === "boolean") {
        return bucket.include_in_protected;
      }

      if (typeof bucket?.is_protected === "boolean") {
        return bucket.is_protected;
      }

      const legacyKind = getLegacyBucketKind(bucket);

      return ["tax", "housing", "reserve"].includes(legacyKind);
    }

    function isStrictProtectedBucket(bucket) {
      if (!isBucketProtected(bucket)) return false;

      const type = getSavingsType(bucket);
      const legacyKind = getLegacyBucketKind(bucket);

      return (
        type === "required" ||
        legacyKind === "tax" ||
        legacyKind === "housing"
      );
    }

    function isSoftProtectedBucket(bucket) {
      if (!isBucketProtected(bucket)) return false;
      if (isStrictProtectedBucket(bucket)) return false;

      const type = getSavingsType(bucket);
      const legacyKind = getLegacyBucketKind(bucket);

      return (
        type === "reserve" ||
        type === "asset" ||
        legacyKind === "reserve"
      );
    }

    function getRealBucketsSafe() {
      if (typeof getRealSafeBuckets === "function") {
        return getRealSafeBuckets();
      }

      return state.safeBuckets.filter((bucket) => {
        if (typeof isRealSafeBucket === "function") {
          return isRealSafeBucket(bucket);
        }

        return bucket.include_in_free_money !== true;
      });
    }

    function isSafeAccountReference(accountId, accountName) {
      const safeAccountId = getSafeAccountId();

      if (accountId) {
        return accountId === safeAccountId;
      }

      const legacySafeAccountName = String(getSafeAccountName() || "").trim();

      if (!legacySafeAccountName) return false;

      return String(accountName || "").trim() === legacySafeAccountName;
    }

    function getIncomeBucketId(transaction) {
      return (
        transaction.to_safe_bucket_id ||
        transaction.safe_bucket_id ||
        ""
      );
    }

    function getExpenseBucketId(transaction) {
      return (
        transaction.from_safe_bucket_id ||
        transaction.safe_bucket_id ||
        ""
      );
    }

    function getSafeBucketBalance(bucketId) {
      let balance = 0;

      state.transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (!amount) return;

        if (transaction.type === "transfer") {
          const goesToSafe = isSafeAccountReference(
            transaction.to_account_id,
            transaction.to_account
          );

          const goesFromSafe = isSafeAccountReference(
            transaction.from_account_id,
            transaction.from_account
          );

          if (goesToSafe && transaction.to_safe_bucket_id === bucketId) {
            balance += amount;
          }

          if (goesFromSafe && transaction.from_safe_bucket_id === bucketId) {
            balance -= amount;
          }

          return;
        }

        if (transaction.type === "income") {
          const incomeToSafe = isSafeAccountReference(
            transaction.account_id,
            transaction.account
          );

          const incomeBucketId = getIncomeBucketId(transaction);

          if (incomeToSafe && incomeBucketId === bucketId) {
            balance += amount;
          }

          return;
        }

        if (transaction.type === "expense") {
          const expenseFromSafe = isSafeAccountReference(
            transaction.account_id,
            transaction.account
          );

          const expenseBucketId = getExpenseBucketId(transaction);

          if (expenseFromSafe && expenseBucketId === bucketId) {
            balance -= amount;
          }
        }
      });

      return roundToTwo(balance);
    }

    function getAllSafeBucketsBalance() {
      return roundToTwo(
        getRealBucketsSafe().reduce((sum, bucket) => {
          return sum + getSafeBucketBalance(bucket.id);
        }, 0)
      );
    }

    function getUnassignedSafeBalance() {
      const totalSafeBalance = getAccountBalance(getSafeAccountId());
      const distributedBalance = getAllSafeBucketsBalance();

      return roundToTwo(totalSafeBalance - distributedBalance);
    }

    function normalizeMoneyBucketName(value) {
      return String(value || "").trim().toLowerCase();
    }

    function getSafeBucketsByNames(names) {
      const normalizedNames = names.map(normalizeMoneyBucketName);

      return getRealBucketsSafe().filter((bucket) => {
        return normalizedNames.includes(normalizeMoneyBucketName(bucket.name));
      });
    }

    function getFreeSafeBalance() {
      return 0;
    }

    function getStrictSafeBalance() {
      return roundToTwo(
        getRealBucketsSafe()
          .filter(isStrictProtectedBucket)
          .reduce((sum, bucket) => {
            return sum + getSafeBucketBalance(bucket.id);
          }, 0)
      );
    }

    function getSoftReserveSafeBalance() {
      return roundToTwo(
        getRealBucketsSafe()
          .filter(isSoftProtectedBucket)
          .reduce((sum, bucket) => {
            return sum + getSafeBucketBalance(bucket.id);
          }, 0)
      );
    }

    function getCashReserveBalance() {
      return roundToTwo(
        getProtectedAccounts()
          .filter((account) => account.account_kind === "reserve")
          .reduce((sum, account) => {
            return sum + getAccountBalance(account.id);
          }, 0)
      );
    }

    function getSecondLineReserveBalance() {
      return roundToTwo(getSoftReserveSafeBalance() + getCashReserveBalance());
    }

    function getAvailableNowBalance() {
      return 0;
    }

    function getProtectedMoneyTotal() {
      return roundToTwo(getStrictSafeBalance() + getSecondLineReserveBalance());
    }

    function getFreeMoneyTotal() {
      const accountsPart = getFreeMoneyAccounts().reduce((sum, account) => {
        return sum + getAccountBalance(account.id);
      }, 0);

      return roundToTwo(Math.max(0, accountsPart));
    }

    return {
      getSafeBucketBalance,
      getAllSafeBucketsBalance,
      getUnassignedSafeBalance,
      normalizeMoneyBucketName,
      getSafeBucketsByNames,
      getFreeSafeBalance,
      getStrictSafeBalance,
      getSoftReserveSafeBalance,
      getCashReserveBalance,
      getSecondLineReserveBalance,
      getAvailableNowBalance,
      getProtectedMoneyTotal,
      getFreeMoneyTotal,
    };
  }

  window.FinanceAppSafeBucketCalculations = {
    create: createSafeBucketCalculations,
  };
})();

// ===== js/10-budget-analytics-calculations.js =====
(() => {
  function createBudgetAnalyticsCalculations({
    state,
    roundToTwo,
    UNCATEGORIZED_ID,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    isRequiredCategory,
    formatMoney,
    getCategoryName,
  }) {
    function getBudgetLimitByCategoryId(categoryId) {
      return state.budgetLimits.find((item) => item.category_id === categoryId);
    }

    function getBudgetLimitLabel(categoryId) {
      const record = getBudgetLimitByCategoryId(categoryId);
      const amount = record ? Number(record.monthly_limit) || 0 : 0;

      return amount > 0 ? formatMoney(amount) : "—";
    }

    function getAnalyticsSpentLimitLabel(spent, categoryId) {
      return `${formatMoney(spent)} / ${getBudgetLimitLabel(categoryId)}`;
    }

    function isBudgetExceeded(spent, categoryId) {
      const record = getBudgetLimitByCategoryId(categoryId);
      const limit = record ? Number(record.monthly_limit) || 0 : 0;

      return limit > 0 && spent > limit;
    }

    function getFlexibleBudgetStats(filteredTransactions) {
      const byCategory = new Map();

      filteredTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        if (isRequiredCategory(categoryId)) return;

        const current = byCategory.get(categoryId) || 0;
        byCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      let exceededCount = 0;
      let nearLimitCount = 0;
      let limitedCount = 0;

      byCategory.forEach((spent, categoryId) => {
        const limitRecord = getBudgetLimitByCategoryId(categoryId);
        const limit = limitRecord ? Number(limitRecord.monthly_limit) || 0 : 0;

        if (limit <= 0) return;

        limitedCount += 1;

        if (spent > limit) {
          exceededCount += 1;
          return;
        }

        if (spent >= limit * 0.85) {
          nearLimitCount += 1;
        }
      });

      return {
        exceededCount,
        nearLimitCount,
        limitedCount,
      };
    }

    function getCurrentMonthTransactions() {
      return filterTransactionsByPeriod(
        state.transactions,
        "month",
        getCurrentMonthValue(),
        "",
        ""
      );
    }

    function getRemainingFlexibleBudgetsCurrentMonth() {
      const monthTransactions = getCurrentMonthTransactions();
      const spentByCategory = new Map();

      monthTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const current = spentByCategory.get(categoryId) || 0;
        spentByCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      let total = 0;

      state.budgetLimits.forEach((limit) => {
        const categoryId = limit.category_id;
        const limitAmount = Number(limit.monthly_limit) || 0;

        if (limitAmount <= 0) return;
        if (isRequiredCategory(categoryId)) return;

        const spent = spentByCategory.get(categoryId) || 0;
        const remaining = Math.max(0, roundToTwo(limitAmount - spent));

        total += remaining;
      });

      return roundToTwo(total);
    }

    function getRemainingFlexibleBudgetsBreakdownCurrentMonth() {
      const monthTransactions = getCurrentMonthTransactions();
      const spentByCategory = new Map();

      monthTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const current = spentByCategory.get(categoryId) || 0;
        spentByCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      const rows = [];

      state.budgetLimits.forEach((limit) => {
        const categoryId = limit.category_id;
        const limitAmount = Number(limit.monthly_limit) || 0;

        if (limitAmount <= 0) return;
        if (isRequiredCategory(categoryId)) return;

        const spent = roundToTwo(spentByCategory.get(categoryId) || 0);
        const remaining = Math.max(0, roundToTwo(limitAmount - spent));

        rows.push({
          categoryId,
          name: getCategoryName(categoryId),
          limit: roundToTwo(limitAmount),
          spent,
          remaining,
        });
      });

      return rows
        .filter((item) => item.remaining > 0)
        .sort((a, b) => b.remaining - a.remaining);
    }

    function getInsightsWorkingMinimum(requiredExpense, flexibleExpense) {
      return roundToTwo(
        Math.max(
          requiredExpense * 0.5,
          flexibleExpense * 0.35,
          5000
        )
      );
    }

    function getInsightsCanSaveNow(
      availableNowBalance,
      workingMinimum,
      exceededCount,
      nearLimitCount
    ) {
      let canSave = Math.max(0, roundToTwo(availableNowBalance - workingMinimum));

      if (exceededCount > 0) {
        return 0;
      }

      if (nearLimitCount > 0) {
        canSave = roundToTwo(canSave * 0.5);
      }

      return Math.max(0, canSave);
    }

    return {
      getBudgetLimitByCategoryId,
      getBudgetLimitLabel,
      getAnalyticsSpentLimitLabel,
      isBudgetExceeded,
      getFlexibleBudgetStats,
      getCurrentMonthTransactions,
      getRemainingFlexibleBudgetsCurrentMonth,
      getRemainingFlexibleBudgetsBreakdownCurrentMonth,
      getInsightsWorkingMinimum,
      getInsightsCanSaveNow,
    };
  }

  window.FinanceAppBudgetAnalyticsCalculations = {
    create: createBudgetAnalyticsCalculations,
  };
})();

// ===== js/11-safe-bucket-dom-helpers.js =====
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

  // только скрываем текущую сумму, ничего не пишем в Supabase
  const valueEl =
    document.getElementById("safeBucketsUnassignedValue") ||
    row.querySelector(".list-value");
  if (valueEl) {
    const current = String(valueEl.textContent || "").trim();
    if (current) {
      localStorage.setItem("financeAppHiddenUnassignedSafeValue", current);
      valueEl.textContent = "";
      valueEl.classList.add("safe-buckets-value-hidden-by-reset");
    }
  }
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

  // только скрываем текущую сумму, ничего не пишем в Supabase
  const valueEl =
    document.getElementById("safeBucketsUnassignedValue") ||
    row.querySelector(".list-value");
  if (valueEl) {
    const current = String(valueEl.textContent || "").trim();
    if (current) {
      localStorage.setItem("financeAppHiddenUnassignedSafeValue", current);
      valueEl.textContent = "";
      valueEl.classList.add("safe-buckets-value-hidden-by-reset");
    }
  }
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

// ===== js/12-mandatory-payment-helpers.js =====
(() => {
  function createMandatoryPaymentHelpers({
    state,
    getAppMetaValue,
    roundToTwo,
    getCurrentMonthValue,
    getSelectedMonth,
    getSafeBucketBalance,
    getSafeBucketById,
  }) {
    function parseMandatoryPaymentsFromMeta() {
      const raw = getAppMetaValue("mandatory_payments");
      if (!raw) return [];

      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return parsed.map((item) => {
          const legacyLastPaidPeriod = item.last_paid_period || "";

          const paidPeriods = Array.isArray(item.paid_periods)
            ? item.paid_periods.filter(Boolean)
            : [];

          if (legacyLastPaidPeriod && !paidPeriods.includes(legacyLastPaidPeriod)) {
            paidPeriods.push(legacyLastPaidPeriod);
          }

          const startPeriod =
            item.start_period ||
            item.due_period ||
            item.period ||
            getCurrentMonthValue();

          return {
            id: item.id || crypto.randomUUID(),
            title: String(item.title || "").trim(),
            amount: roundToTwo(Number(item.amount) || 0),
            due_day: Math.min(31, Math.max(1, Number(item.due_day) || 1)),
            start_period: startPeriod,
            paid_periods: paidPeriods,
            linked_account_id: item.linked_account_id || "",
            linked_safe_bucket_id: item.linked_safe_bucket_id || "",
            enabled: item.enabled !== false,

            // legacy, чтобы старые данные не развалились
            last_paid_period: legacyLastPaidPeriod,
          };
        });
      } catch (error) {
        console.error("Ошибка mandatory_payments", error);
        return [];
      }
    }

    function getCurrentMonthKey() {
      return getCurrentMonthValue();
    }

    function getMandatoryPaymentsActiveMonthKey() {
      return getSelectedMonth() || getCurrentMonthValue();
    }

    function isMandatoryPaymentVisibleInMonth(item, monthKey) {
      if (item.enabled === false) return false;

      const startPeriod = item.start_period || getCurrentMonthValue();

      return startPeriod <= monthKey;
    }

    function getMandatoryPaymentPaidPeriods(item) {
      if (Array.isArray(item.paid_periods)) {
        return item.paid_periods.filter(Boolean);
      }

      return item.last_paid_period ? [item.last_paid_period] : [];
    }

    function isMandatoryPaymentPaidInMonth(item, monthKey) {
      return getMandatoryPaymentPaidPeriods(item).includes(monthKey);
    }

    function setMandatoryPaymentPaidInMonth(item, monthKey, isPaid) {
      const periods = new Set(getMandatoryPaymentPaidPeriods(item));

      if (isPaid) {
        periods.add(monthKey);
      } else {
        periods.delete(monthKey);
      }

      item.paid_periods = [...periods].sort();
      item.last_paid_period = item.paid_periods[item.paid_periods.length - 1] || "";
    }

    function buildMandatoryPaymentDate(monthKey, dueDay) {
      const [rawYear, rawMonth] = String(monthKey || getCurrentMonthValue()).split("-");

      const parsedYear = Number(rawYear);
      const parsedMonth = Number(rawMonth);

      const now = new Date();
      const year = Number.isFinite(parsedYear) && parsedYear > 0
        ? parsedYear
        : now.getFullYear();

      const month = Number.isFinite(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12
        ? parsedMonth
        : now.getMonth() + 1;

      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const safeDay = String(
        Math.min(lastDayOfMonth, Math.max(1, Number(dueDay) || 1))
      ).padStart(2, "0");

      return `${year}-${String(month).padStart(2, "0")}-${safeDay}`;
    }

    function buildMandatoryPaymentTransactionCreatedAt() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    function buildDateFromDueDay(dueDay, monthKey = getMandatoryPaymentsActiveMonthKey()) {
      return buildMandatoryPaymentDate(monthKey, dueDay);
    }

    function getMandatoryPaymentsStats(monthKey = getCurrentMonthKey()) {
      const unpaidItems = state.mandatoryPayments.filter((item) => {
        if (!isMandatoryPaymentVisibleInMonth(item, monthKey)) return false;
        return !isMandatoryPaymentPaidInMonth(item, monthKey);
      });

      const total = unpaidItems.reduce((sum, item) => {
        return sum + (Number(item.amount) || 0);
      }, 0);

      return {
        items: unpaidItems,
        count: unpaidItems.length,
        total: roundToTwo(total),
      };
    }

    function isProtectedSafeBucket(bucketId) {
      const bucket = getSafeBucketById(bucketId);

      if (!bucket) return false;

      if (typeof bucket.include_in_protected === "boolean") {
        return bucket.include_in_protected;
      }

      if (typeof bucket.is_protected === "boolean") {
        return bucket.is_protected;
      }

      const legacyKind = String(bucket.kind || bucket.bucket_kind || "")
        .trim()
        .toLowerCase();

      return ["tax", "housing", "reserve"].includes(legacyKind);
    }

    function getMandatoryPaymentsCoverageStats(monthKey = getCurrentMonthKey()) {
      const unpaidItems = state.mandatoryPayments
        .filter((item) => {
          if (!isMandatoryPaymentVisibleInMonth(item, monthKey)) return false;
          return !isMandatoryPaymentPaidInMonth(item, monthKey);
        })
        .sort((a, b) => {
          return buildMandatoryPaymentDate(monthKey, a.due_day)
            .localeCompare(buildMandatoryPaymentDate(monthKey, b.due_day));
        });

      const safeBalanceLeftById = new Map();

      function getLinkedSafeBalanceLeft(bucketId) {
        if (!bucketId) return 0;

        if (!safeBalanceLeftById.has(bucketId)) {
          safeBalanceLeftById.set(
            bucketId,
            Math.max(0, roundToTwo(getSafeBucketBalance(bucketId)))
          );
        }

        return safeBalanceLeftById.get(bucketId) || 0;
      }

      function consumeLinkedSafe(bucketId, amount) {
        if (!bucketId || amount <= 0) return 0;

        const balanceLeft = getLinkedSafeBalanceLeft(bucketId);
        const covered = Math.min(amount, balanceLeft);

        safeBalanceLeftById.set(bucketId, roundToTwo(balanceLeft - covered));

        return roundToTwo(covered);
      }

      let total = 0;
      let coveredByLinkedSafes = 0;
      let coveredByProtectedSafes = 0;
      let uncoveredAfterLinkedSafes = 0;
      let chargeToFreeMoney = 0;

      unpaidItems.forEach((item) => {
        const amount = roundToTwo(Number(item.amount) || 0);
        if (amount <= 0) return;

        total += amount;

        const linkedSafeId = item.linked_safe_bucket_id || "";
        const coveredByThisSafe = consumeLinkedSafe(linkedSafeId, amount);
        const uncoveredAfterLinked = Math.max(0, roundToTwo(amount - coveredByThisSafe));

        coveredByLinkedSafes += coveredByThisSafe;
        uncoveredAfterLinkedSafes += uncoveredAfterLinked;
        chargeToFreeMoney += uncoveredAfterLinked;

        if (linkedSafeId && isProtectedSafeBucket(linkedSafeId)) {
          coveredByProtectedSafes += coveredByThisSafe;
        }
      });

      return {
        items: unpaidItems,
        count: unpaidItems.length,
        total: roundToTwo(total),
        coveredByLinkedSafes: roundToTwo(coveredByLinkedSafes),
        coveredByProtectedSafes: roundToTwo(coveredByProtectedSafes),
        uncoveredAfterLinkedSafes: roundToTwo(uncoveredAfterLinkedSafes),
        chargeToFreeMoney: roundToTwo(chargeToFreeMoney),
      };
    }

    return {
      parseMandatoryPaymentsFromMeta,
      getCurrentMonthKey,
      getMandatoryPaymentsActiveMonthKey,
      isMandatoryPaymentVisibleInMonth,
      getMandatoryPaymentPaidPeriods,
      isMandatoryPaymentPaidInMonth,
      setMandatoryPaymentPaidInMonth,
      buildMandatoryPaymentDate,
      buildMandatoryPaymentTransactionCreatedAt,
      buildDateFromDueDay,
      getMandatoryPaymentsStats,
      isProtectedSafeBucket,
      getMandatoryPaymentsCoverageStats,
    };
  }

  window.FinanceAppMandatoryPaymentHelpers = {
    create: createMandatoryPaymentHelpers,
  };
})();
