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

    function getSafeBucketBalance(bucketId) {
      let balance = 0;
      const safeAccountId = getSafeAccountId();
      const safeAccountName = getSafeAccountName();

      state.transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (transaction.type === "transfer") {
          const goesToSafe =
            (transaction.to_account_id && transaction.to_account_id === safeAccountId) ||
            (!transaction.to_account_id && transaction.to_account === safeAccountName);

          const goesFromSafe =
            (transaction.from_account_id && transaction.from_account_id === safeAccountId) ||
            (!transaction.from_account_id && transaction.from_account === safeAccountName);

          if (goesToSafe && transaction.to_safe_bucket_id === bucketId) {
            balance += amount;
          }

          if (goesFromSafe && transaction.from_safe_bucket_id === bucketId) {
            balance -= amount;
          }
        }

        if (transaction.type === "income") {
          const incomeToSafe =
            (transaction.account_id && transaction.account_id === safeAccountId) ||
            (!transaction.account_id && transaction.account === safeAccountName);

          if (incomeToSafe && transaction.to_safe_bucket_id === bucketId) {
            balance += amount;
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

          if (expenseFromSafe && expenseBucketId && expenseBucketId === bucketId) {
            balance -= amount;
          }
        }
      });

      return roundToTwo(balance);
    }

    function getAllSafeBucketsBalance() {
      return getRealBucketsSafe().reduce((sum, bucket) => {
        return sum + getSafeBucketBalance(bucket.id);
      }, 0);
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

      return getRealBucketsSafe().filter((bucket) =>
        normalizedNames.includes(normalizeMoneyBucketName(bucket.name))
      );
    }

    function getFreeSafeBalance() {
      return roundToTwo(Math.max(0, getUnassignedSafeBalance()));
    }

    function getStrictSafeBalance() {
      return getSafeBucketsByKind(["tax", "housing"]).reduce((sum, bucket) => {
        return sum + getSafeBucketBalance(bucket.id);
      }, 0);
    }

    function getSoftReserveSafeBalance() {
      return getSafeBucketsByKind(["reserve"]).reduce((sum, bucket) => {
        return sum + getSafeBucketBalance(bucket.id);
      }, 0);
    }

    function getCashReserveBalance() {
      return getProtectedAccounts()
        .filter((account) => account.account_kind === "reserve")
        .reduce((sum, account) => sum + getAccountBalance(account.id), 0);
    }

    function getSecondLineReserveBalance() {
      return getSoftReserveSafeBalance() + getCashReserveBalance();
    }

    function getAvailableNowBalance() {
      return roundToTwo(getFreeSafeBalance());
    }

    function getProtectedMoneyTotal() {
      return roundToTwo(getStrictSafeBalance() + getSecondLineReserveBalance());
    }

    function getFreeMoneyTotal() {
      const accountsPart = getFreeMoneyAccounts().reduce((sum, account) => {
        return sum + getAccountBalance(account.id);
      }, 0);

      const unassignedSafePart = getFreeSafeBalance();

      return roundToTwo(Math.max(0, accountsPart + unassignedSafePart));
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