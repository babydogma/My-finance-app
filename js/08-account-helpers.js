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