// ===== js/05-app-state.js =====
(() => {
  const UNCATEGORIZED_ID = "uncategorized";

  const state = {
    transactions: [],
    accounts: [],
    categories: [],
    budgetLimits: [],
    safeBuckets: [],
    appMeta: [],
    mandatoryPayments: [],
  };

  window.FinanceAppState = {
    UNCATEGORIZED_ID,
    state,
  };
})();

// ===== js/06-catalog-helpers.js =====
(() => {
  function createCatalogHelpers({ state }) {
    function getCategoryById(categoryId) {
      return state.categories.find((item) => item.id === categoryId);
    }

    function getCategoryName(categoryId) {
      const category = getCategoryById(categoryId);
      return category ? category.name : "Без категории";
    }

    function getCategoryIcon(categoryId) {
      return "";
    }

    function isRequiredCategory(categoryId) {
      const category = getCategoryById(categoryId);
      return Boolean(category?.is_required);
    }

    function getCategoryTypeLabel(categoryId) {
      return isRequiredCategory(categoryId) ? "Обязательная" : "Гибкая";
    }

    function getSafeBucketById(bucketId) {
      return state.safeBuckets.find((item) => item.id === bucketId);
    }

    function getAccountsByKind(kind) {
      return state.accounts.filter((account) => account.account_kind === kind);
    }

    function getAccountById(accountId) {
      return state.accounts.find((account) => account.id === accountId) || null;
    }

    function getAccountNameById(accountId) {
      return getAccountById(accountId)?.name || "";
    }

    function getAccountIconById(accountId) {
      return "";
    }

    function getVaultAccount() {
      return state.accounts.find((account) => account.account_kind === "vault_pool") || null;
    }

    function getVaultAccountId() {
      return getVaultAccount()?.id || "";
    }

    function getVaultAccountName() {
      return getVaultAccount()?.name || "";
    }

    function isVaultAccountId(accountId) {
      return Boolean(accountId && accountId === getVaultAccountId());
    }

    function getPrimarySpendAccount() {
      return (
        state.accounts.find(
          (account) =>
            account.is_primary_spend === true &&
            account.account_kind !== "vault_pool"
        ) || null
      );
    }

    function getPrimarySpendAccountId() {
      return getPrimarySpendAccount()?.id || "";
    }

    function getPrimarySpendAccountName() {
      return getPrimarySpendAccount()?.name || "";
    }

    function getCashAccount() {
      return state.accounts.find((account) => account.account_kind === "cash") || null;
    }

    function getCashAccountId() {
      return getCashAccount()?.id || "";
    }

    function getSafeAccountName() {
      return getVaultAccountName();
    }

    function getSafeAccountId() {
      return getVaultAccountId();
    }

    function getProtectedAccounts() {
      return state.accounts.filter((account) => account.is_protected === true);
    }

    function getFreeMoneyAccounts() {
      return state.accounts.filter((account) => account.include_in_free_money === true);
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

    function isRealSafeBucket(bucket) {
      return Boolean(bucket) && !isFreeSafeBucket(bucket);
    }

    function getRealSafeBuckets() {
      return state.safeBuckets.filter(isRealSafeBucket);
    }

    function getSafeBucketsByKind(kinds) {
      const list = Array.isArray(kinds) ? kinds : [kinds];

      return getRealSafeBuckets().filter((bucket) => {
        return list.includes(bucket.bucket_kind);
      });
    }

    function getFreeSafeBucket() {
      return state.safeBuckets.find((bucket) => bucket.include_in_free_money === true) || null;
    }

    function getProtectedSafeBuckets() {
      return getRealSafeBuckets().filter((bucket) => {
        if (typeof bucket.include_in_protected === "boolean") {
          return bucket.include_in_protected;
        }

        if (typeof bucket.is_protected === "boolean") {
          return bucket.is_protected;
        }

        const kind = String(bucket.kind || bucket.bucket_kind || "")
          .trim()
          .toLowerCase();

        return ["tax", "housing", "reserve"].includes(kind);
      });
    }

    function getSpendableAccounts() {
      return state.accounts.filter((account) => account.account_kind !== "vault_pool");
    }

    function getTransferAccounts() {
      return state.accounts.filter((account) => {
        return account.account_kind !== "system";
      });
    }

    function getSafeBucketName(bucketId) {
      const bucket = getSafeBucketById(bucketId);
      return bucket ? bucket.name : "";
    }

    function getSafeBucketIcon(bucketId) {
      return "";
    }

    return {
      getCategoryById,
      getCategoryName,
      getCategoryIcon,
      isRequiredCategory,
      getCategoryTypeLabel,

      getSafeBucketById,
      getAccountsByKind,
      getAccountById,
      getAccountNameById,
      getAccountIconById,

      getVaultAccount,
      getVaultAccountId,
      getVaultAccountName,
      isVaultAccountId,

      getPrimarySpendAccount,
      getPrimarySpendAccountId,
      getPrimarySpendAccountName,

      getCashAccount,
      getCashAccountId,

      getSafeAccountName,
      getSafeAccountId,

      getProtectedAccounts,
      getFreeMoneyAccounts,

      getSafeBucketsByKind,
      getFreeSafeBucket,
      getProtectedSafeBuckets,
      getRealSafeBuckets,
      isFreeSafeBucket,
      isRealSafeBucket,

      getSpendableAccounts,
      getTransferAccounts,

      getSafeBucketName,
      getSafeBucketIcon,
    };
  }

  window.FinanceAppCatalogHelpers = {
    create: createCatalogHelpers,
  };
})();

// ===== js/07-app-meta.js =====
(() => {
  function createAppMetaHelpers({ state, roundToTwo }) {
    function getAppMetaValue(key) {
      const item = state.appMeta.find((entry) => entry.key === key);
      return item ? item.value : "";
    }

    function getSafeInterestAnnualRate() {
      const raw = Number(getAppMetaValue("safe_interest_annual_rate"));

      if (Number.isFinite(raw) && raw >= 0) {
        return raw;
      }

      return 0.12;
    }

    function getSafeBucketInterestRatesMap() {
      const raw = getAppMetaValue("safe_bucket_interest_rates");
      if (!raw) return {};

      try {
        const parsed = JSON.parse(raw);

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          return {};
        }

        return parsed;
      } catch (error) {
        console.error("Ошибка safe_bucket_interest_rates", error);
        return {};
      }
    }

    function getSafeBucketInterestAnnualRate(bucketId) {
      const map = getSafeBucketInterestRatesMap();
      const raw = Number(map[bucketId]);

      if (Number.isFinite(raw) && raw >= 0) {
        return raw;
      }

      return getSafeInterestAnnualRate();
    }

    function formatPercentLabel(rateDecimal) {
      const percent = (Number(rateDecimal) || 0) * 100;

      return `${new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: 2,
      }).format(percent)}%`;
    }

    function setAppMetaLocalValue(key, value) {
      const existing = state.appMeta.find((entry) => entry.key === key);

      if (existing) {
        existing.value = value;
        return;
      }

      state.appMeta.push({
        key,
        value,
      });
    }

    function getRoundedPercentFromDecimal(rateDecimal) {
      return roundToTwo((Number(rateDecimal) || 0) * 100);
    }

    return {
      getAppMetaValue,
      getSafeInterestAnnualRate,
      getSafeBucketInterestRatesMap,
      getSafeBucketInterestAnnualRate,
      formatPercentLabel,
      setAppMetaLocalValue,
      getRoundedPercentFromDecimal,
    };
  }

  window.FinanceAppMetaHelpers = {
    create: createAppMetaHelpers,
  };
})();

// ===== js/08-account-helpers.js =====
(() => {
  const ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY = "account_balance_adjustments_v1";

  function roundLocal(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function getMetaRecord(state, key) {
    if (!state || !Array.isArray(state.appMeta)) return null;

    return state.appMeta.find((item) => {
      return (
        item?.key === key ||
        item?.name === key ||
        item?.meta_key === key ||
        item?.metaKey === key
      );
    }) || null;
  }

  function getMetaValue(state, key) {
    const record = getMetaRecord(state, key);

    if (!record) return "";

    return (
      record.value ??
      record.meta_value ??
      record.metaValue ??
      record.data ??
      ""
    );
  }

  function parseAdjustments(rawValue) {
    if (!rawValue) return {};

    if (typeof rawValue === "object" && !Array.isArray(rawValue)) {
      return rawValue;
    }

    try {
      const parsed = JSON.parse(String(rawValue));

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      return {};
    }

    return {};
  }

  function getLocalStorageAdjustments() {
    try {
      return parseAdjustments(
        window.localStorage.getItem(ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY)
      );
    } catch (error) {
      return {};
    }
  }

  function getAccountBalanceAdjustments(state) {
    const fromState = parseAdjustments(
      getMetaValue(state, ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY)
    );

    if (Object.keys(fromState).length > 0) {
      return fromState;
    }

    return getLocalStorageAdjustments();
  }

  function getAccountManualAdjustment(state, accountId) {
    const adjustments = getAccountBalanceAdjustments(state);
    const value = Number(adjustments?.[accountId]);

    return Number.isFinite(value) ? roundLocal(value) : 0;
  }

  function setAccountManualAdjustmentLocal(state, accountId, adjustment) {
    if (!state) return {};

    if (!Array.isArray(state.appMeta)) {
      state.appMeta = [];
    }

    const nextAdjustments = {
      ...getAccountBalanceAdjustments(state),
    };

    const roundedAdjustment = roundLocal(adjustment);

    if (Math.abs(roundedAdjustment) < 0.005) {
      delete nextAdjustments[accountId];
    } else {
      nextAdjustments[accountId] = roundedAdjustment;
    }

    const serialized = JSON.stringify(nextAdjustments);
    let record = getMetaRecord(state, ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY);

    if (!record) {
      record = {
        key: ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
        value: serialized,
      };

      state.appMeta.push(record);
    }

    record.key = ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY;
    record.value = serialized;
    record.meta_key = ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY;
    record.meta_value = serialized;
    record.metaKey = ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY;
    record.metaValue = serialized;

    try {
      window.localStorage.setItem(
        ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
        serialized
      );
    } catch (error) {
      // localStorage может быть недоступен в приватном режиме — это не критично.
    }

    return nextAdjustments;
  }

  function createAccountHelpers({ state, roundToTwo, getAccountById }) {
    function getRawAccountBalance(accountNameOrId) {
      const account =
        getAccountById(accountNameOrId) ||
        state.accounts.find((item) => item.name === accountNameOrId) ||
        null;

      if (!account) return 0;

      const accountId = account.id;
      const accountName = account.name;

      return roundToTwo(
        state.transactions.reduce((sum, transaction) => {
          const amount = roundToTwo(Number(transaction.amount) || 0);

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
        }, 0)
      );
    }

    function getAccountBalance(accountNameOrId) {
      const account =
        getAccountById(accountNameOrId) ||
        state.accounts.find((item) => item.name === accountNameOrId) ||
        null;

      if (!account) return 0;

      const rawBalance = getRawAccountBalance(account.id);
      const manualAdjustment = getAccountManualAdjustment(state, account.id);

      return roundToTwo(rawBalance + manualAdjustment);
    }

    function getAccountRoleLabel(account) {
      if (account.account_kind === "vault_pool") return "Накопления";
      if (account.account_kind === "reserve") return "Резерв";
      if (account.account_kind === "cash") return "Наличные";
      return account.is_primary_spend ? "Основной счёт" : "Обычный счёт";
    }

    function getAccountRoleIconName(account) {
      if (account.account_kind === "vault_pool") return "vault";
      if (account.account_kind === "reserve") return "shield";
      if (account.account_kind === "cash") return "cash";
      return "card";
    }

    function getAccountRoleIconSvg(account) {
      const iconName = getAccountRoleIconName(account);

      if (iconName === "vault") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.5 12 5l8 5.5" />
            <path d="M6 10.5V19h12v-8.5" />
            <path d="M9.5 19v-5h5v5" />
          </svg>
        `;
      }

      if (iconName === "shield") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4 18 6.5v5.2c0 3.7-2.2 6.3-6 8.3-3.8-2-6-4.6-6-8.3V6.5L12 4Z" />
          </svg>
        `;
      }

      if (iconName === "cash") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 7.5h17v9h-17z" />
            <path d="M7 12h10" />
            <circle cx="12" cy="12" r="2.2" />
          </svg>
        `;
      }

      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
          <path d="M3.5 10h17" />
        </svg>
      `;
    }

    function canAccountBePrimary(role) {
      return role === "spend" || role === "cash";
    }

    function getAccountRoleFlags(role) {
      if (role === "vault_pool") {
        return {
          include_in_free_money: false,
          is_protected: false,
        };
      }

      if (role === "reserve") {
        return {
          include_in_free_money: false,
          is_protected: true,
        };
      }

      if (role === "cash") {
        return {
          include_in_free_money: true,
          is_protected: false,
        };
      }

      return {
        include_in_free_money: true,
        is_protected: false,
      };
    }

    function calculateBalance() {
      return state.accounts.reduce((sum, account) => {
        return sum + getAccountBalance(account.id);
      }, 0);
    }

    return {
      getAccountBalance,
      getRawAccountBalance,
      getAccountRoleLabel,
      getAccountRoleIconName,
      getAccountRoleIconSvg,
      canAccountBePrimary,
      getAccountRoleFlags,
      calculateBalance,
    };
  }

  window.FinanceAppAccountHelpers = {
    create: createAccountHelpers,
  };

  window.FinanceAppAccountBalanceAdjustments = {
    META_KEY: ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
    getAccountBalanceAdjustments,
    getAccountManualAdjustment,
    setAccountManualAdjustmentLocal,
    parseAdjustments,
  };
})();
