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