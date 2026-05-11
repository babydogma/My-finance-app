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