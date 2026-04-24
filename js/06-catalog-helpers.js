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

    function getSafeBucketsByKind(kinds) {
      const list = Array.isArray(kinds) ? kinds : [kinds];
      return state.safeBuckets.filter((bucket) => list.includes(bucket.bucket_kind));
    }

    function getFreeSafeBucket() {
      return state.safeBuckets.find((bucket) => bucket.include_in_free_money === true) || null;
    }

    function getProtectedSafeBuckets() {
      return state.safeBuckets.filter((bucket) => bucket.is_protected === true);
    }

    function getSpendableAccounts() {
      return state.accounts.filter((account) => account.account_kind !== "vault_pool");
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
      getSpendableAccounts,
      getSafeBucketName,
      getSafeBucketIcon,
    };
  }

  window.FinanceAppCatalogHelpers = {
    create: createCatalogHelpers,
  };
})();