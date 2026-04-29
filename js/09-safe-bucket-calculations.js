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

    /*
      ВАЖНО:
      “Не распределено” удалено из интерфейса.
      Значит нераспределённый остаток сейфа больше НЕ считается свободными деньгами.
      Иначе свободные деньги становятся:
      обычные счета + наличка + хвост сейфа,
      что и давало кривые 762,03 ₽.
    */
    function getFreeSafeBalance() {
      return 0;
    }

    function getStrictSafeBalance() {
      return roundToTwo(
        getSafeBucketsByKind(["tax", "housing"]).reduce((sum, bucket) => {
          return sum + getSafeBucketBalance(bucket.id);
        }, 0)
      );
    }

    function getSoftReserveSafeBalance() {
      return roundToTwo(
        getSafeBucketsByKind(["reserve"]).reduce((sum, bucket) => {
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