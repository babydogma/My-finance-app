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
      const [year, month] = String(monthKey).split("-");
      const safeDay = String(Math.min(31, Math.max(1, Number(dueDay) || 1))).padStart(2, "0");

      return `${year}-${month}-${safeDay}`;
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
      return Boolean(bucket?.is_protected);
    }

    function getMandatoryPaymentsCoverageStats(monthKey = getCurrentMonthKey()) {
      const unpaidItems = state.mandatoryPayments.filter((item) => {
        if (!isMandatoryPaymentVisibleInMonth(item, monthKey)) return false;
        return !isMandatoryPaymentPaidInMonth(item, monthKey);
      });

      let total = 0;
      let coveredByLinkedSafes = 0;
      let coveredByProtectedSafes = 0;
      let uncoveredAfterLinkedSafes = 0;
      let chargeToFreeMoney = 0;

      unpaidItems.forEach((item) => {
        const amount = roundToTwo(Number(item.amount) || 0);
        total += amount;

        const linkedSafeId = item.linked_safe_bucket_id || "";
        const linkedSafeBalance = linkedSafeId
          ? Math.max(0, roundToTwo(getSafeBucketBalance(linkedSafeId)))
          : 0;

        const coveredByThisSafe = Math.min(amount, linkedSafeBalance);
        coveredByLinkedSafes += coveredByThisSafe;

        const coveredByProtected =
          linkedSafeId && isProtectedSafeBucket(linkedSafeId)
            ? coveredByThisSafe
            : 0;

        coveredByProtectedSafes += coveredByProtected;

        const uncoveredAfterLinked = Math.max(0, roundToTwo(amount - coveredByThisSafe));
        uncoveredAfterLinkedSafes += uncoveredAfterLinked;

        const toChargeFromFreeMoney = Math.max(
          0,
          roundToTwo(amount - coveredByProtected)
        );

        chargeToFreeMoney += toChargeFromFreeMoney;
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