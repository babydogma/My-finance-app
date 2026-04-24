(() => {
  function createAccountHelpers({ state, roundToTwo, getAccountById }) {
    function getAccountBalance(accountNameOrId) {
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
})();