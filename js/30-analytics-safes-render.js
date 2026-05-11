(() => {
  function getCurrentMonthValueFallback() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getDateFromMonthValue(monthValue) {
    const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);

    if (!match) {
      return new Date();
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1);
  }

  function getMonthValueFromDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getMonthShortLabel(monthValue) {
    const date = getDateFromMonthValue(monthValue);

    return date
      .toLocaleDateString("ru-RU", {
        month: "short",
      })
      .replace(".", "");
  }

  function getYearMonths(selectedMonth) {
    const selectedDate = getDateFromMonthValue(selectedMonth);
    const year = selectedDate.getFullYear();
    const months = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      const date = new Date(year, monthIndex, 1);

      months.push({
        value: getMonthValueFromDate(date),
        label: getMonthShortLabel(getMonthValueFromDate(date)),
      });
    }

    return months;
  }

  function createAnalyticsSafesRender({
    state,
    getAnalyticsOverviewSummary,
    getSafeBucketBalance,
    isRequiredCategory,
    formatMoney,
    escapeHtml,

    analyticsInterestValue,
    analyticsSafeList,

    getSelectedMonth,
    setSelectedMonth,
  }) {
    const analyticsSafesMonthStrip = document.getElementById("analyticsSafesMonthStrip");

    function getActiveMonth() {
      if (typeof getSelectedMonth === "function") {
        return getSelectedMonth() || getCurrentMonthValueFallback();
      }

      return getCurrentMonthValueFallback();
    }

    function renderAnalyticsSafesMonthStrip() {
      if (!analyticsSafesMonthStrip) return;

      const activeMonth = getActiveMonth();
      const months = getYearMonths(activeMonth);

      analyticsSafesMonthStrip.innerHTML = "";

      months.forEach((month) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className =
          `analytics-safes-month-btn${month.value === activeMonth ? " is-active" : ""}`;
        button.dataset.monthValue = month.value;
        button.textContent = month.label;

        button.addEventListener("click", () => {
          if (typeof setSelectedMonth === "function") {
            setSelectedMonth(month.value);
          }

          renderAnalyticsSafes();
        });

        analyticsSafesMonthStrip.appendChild(button);
      });

      requestAnimationFrame(() => {
        analyticsSafesMonthStrip
          .querySelector(".analytics-safes-month-btn.is-active")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
      });
    }

    function renderAnalyticsSafes() {
      const summary = getAnalyticsOverviewSummary();
      const selectedMonth = getActiveMonth();

      renderAnalyticsSafesMonthStrip();

      if (analyticsInterestValue) {
        analyticsInterestValue.textContent = formatMoney(summary.safeInterest);
      }

      if (window.FinanceAppAnalyticsSafeModels?.renderAnalyticsSafeModels) {
        window.FinanceAppAnalyticsSafeModels.renderAnalyticsSafeModels({
          state,
          selectedMonth,
          isRequiredCategory,
          formatMoney,
          escapeHtml,
        });
      }

      /*
        В аналитике накоплений список сейфов больше не рендерим.
        Он дублирует раздел "Кошелёк" и засоряет экран.
      */
      if (analyticsSafeList) {
        analyticsSafeList.innerHTML = "";
        analyticsSafeList.classList.add("hidden");
      }
    }

    return {
      renderAnalyticsSafes,
    };
  }

  window.FinanceAppAnalyticsSafesRender = {
    create: createAnalyticsSafesRender,
  };
})();