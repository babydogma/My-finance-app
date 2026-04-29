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
    const SAVINGS_BUCKET_SETTINGS_META_KEY = "savings_bucket_settings";

    function parseSafeBucketsMetaObject(value, fallback = {}) {
      if (!value) return fallback;

      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);

          return parsed && typeof parsed === "object" ? parsed : fallback;
        } catch (error) {
          return fallback;
        }
      }

      if (typeof value === "object") {
        return value;
      }

      return fallback;
    }

    function getStateMetaValue(key, fallback = null) {
      const possibleSources = [
        state.appMeta,
        state.app_meta,
        state.meta,
        state.settings,
      ];

      for (const source of possibleSources) {
        if (!source) continue;

        if (source instanceof Map && source.has(key)) {
          return source.get(key);
        }

        if (Array.isArray(source)) {
          const row = source.find((item) => {
            return item && item.key === key;
          });

          if (row) {
            return row.value ?? fallback;
          }
        }

        if (typeof source === "object" && Object.prototype.hasOwnProperty.call(source, key)) {
          return source[key];
        }
      }

      return fallback;
    }

    function getSavingsBucketSettingsMap() {
      return parseSafeBucketsMetaObject(
        getStateMetaValue(SAVINGS_BUCKET_SETTINGS_META_KEY, {}),
        {}
      );
    }

    function getSavingsBucketSettings(bucketId) {
      const settingsMap = getSavingsBucketSettingsMap();
      const saved = settingsMap[bucketId];

      if (!saved || typeof saved !== "object") {
        return null;
      }

      const type = saved.type || "default";
      const interestEnabled = Boolean(saved.interestEnabled);
      const annualRate = interestEnabled ? Number(saved.annualRate) || 0 : 0;

      return {
        type,
        interestEnabled,
        annualRate,
        includeInProtected:
          typeof saved.includeInProtected === "boolean"
            ? saved.includeInProtected
            : type !== "default",
        includeInFreeMoney:
          typeof saved.includeInFreeMoney === "boolean"
            ? saved.includeInFreeMoney
            : false,
      };
    }

    function normalizeSavingsBucketKind(value) {
      return String(value || "").trim().toLowerCase();
    }

    function getBucketLegacyKind(bucket) {
      return normalizeSavingsBucketKind(
        bucket?.kind ||
        bucket?.bucket_kind ||
        bucket?.type ||
        ""
      );
    }

    function getBucketSavingsType(bucket) {
      const settings = getSavingsBucketSettings(bucket?.id);

      if (settings?.type) {
        return settings.type;
      }

      const legacyKind = getBucketLegacyKind(bucket);

      if (legacyKind === "tax" || legacyKind === "housing") {
        return "required";
      }

      if (legacyKind === "reserve") {
        return "reserve";
      }

      return "default";
    }

    function isBucketProtected(bucket) {
      const settings = getSavingsBucketSettings(bucket?.id);

      if (settings) {
        return settings.includeInProtected === true;
      }

      /*
        Legacy fallback:
        раньше защищёнными считались только tax / housing / reserve.
        Обычные накопления без настроек не трогаем, чтобы не поменять математику старым данным.
      */
      const legacyKind = getBucketLegacyKind(bucket);

      return ["tax", "housing", "reserve"].includes(legacyKind);
    }

    function isStrictProtectedBucket(bucket) {
      if (!isBucketProtected(bucket)) return false;

      const type = getBucketSavingsType(bucket);
      const legacyKind = getBucketLegacyKind(bucket);

      return (
        type === "required" ||
        legacyKind === "tax" ||
        legacyKind === "housing"
      );
    }

    function isSoftProtectedBucket(bucket) {
      if (!isBucketProtected(bucket)) return false;
      if (isStrictProtectedBucket(bucket)) return false;

      const type = getBucketSavingsType(bucket);
      const legacyKind = getBucketLegacyKind(bucket);

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

      /*
        Новая нормальная логика:
        если ID есть — считаем только по ID.
        Название тут вообще не должно решать судьбу денег.
      */
      if (accountId) {
        return accountId === safeAccountId;
      }

      /*
        Legacy fallback:
        оставляем только для старых операций, где account_id / from_account_id / to_account_id пустой,
        но сохранён текстовый account / from_account / to_account.
      */
      const legacySafeAccountName = String(getSafeAccountName() || "").trim();

      if (!legacySafeAccountName) return false;

      return String(accountName || "").trim() === legacySafeAccountName;
    }

    function getTransactionSafeBucketIncomeId(transaction) {
      return (
        transaction.to_safe_bucket_id ||
        transaction.safe_bucket_id ||
        ""
      );
    }

    function getTransactionSafeBucketExpenseId(transaction) {
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

          const incomeBucketId = getTransactionSafeBucketIncomeId(transaction);

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

          const expenseBucketId = getTransactionSafeBucketExpenseId(transaction);

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

    /*
      “Не распределено” удалено из интерфейса.
      Нераспределённый остаток накопительного счёта НЕ считается свободными деньгами.
    */
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