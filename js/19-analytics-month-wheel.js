(() => {
  function createAnalyticsMonthWheel({
    analyticsMonthWheelWrap,
    analyticsMonthNamesColumn,
    analyticsMonthYearsColumn,
    getCurrentMonthValue,
    getRussianMonthNames,
    getSelectedMonth,
    setSelectedMonth,
    setFilterPeriod,
    renderAnalytics,
  }) {
    let analyticsDraftMonth = "";
    let analyticsDraftYear = "";
    let isAnalyticsMonthWheelOpen = false;

    let analyticsMonthScrollTimer = null;
    let analyticsYearScrollTimer = null;

    const boundWheelColumns = new WeakSet();

    function setAnalyticsDraftMonthFromValue(monthValue) {
      const safeValue = monthValue || getCurrentMonthValue();
      const [year, month] = safeValue.split("-");

      analyticsDraftYear = year;
      analyticsDraftMonth = month;
    }

    function getAnalyticsDraftMonthValue() {
      return `${analyticsDraftYear}-${analyticsDraftMonth}`;
    }

    function getAnalyticsWheelYears() {
      const currentYear = new Date().getFullYear();
      const years = [];

      for (let year = currentYear - 3; year <= currentYear + 4; year += 1) {
        years.push(String(year));
      }

      return years;
    }

    function buildWheelColumnItems(items, activeValue, dataAttr) {
      const spacer = `<div class="month-wheel__item month-wheel__item--spacer"></div>`;

      const content = items
        .map((item) => {
          const value = typeof item === "string" ? item : item.value;
          const label = typeof item === "string" ? item : item.label;
          const activeClass = value === activeValue ? " is-active" : "";

          return `
            <button
              class="month-wheel__item${activeClass}"
              type="button"
              ${dataAttr}="${value}"
            >
              ${label}
            </button>
          `;
        })
        .join("");

      return `${spacer}${spacer}${content}${spacer}${spacer}`;
    }

    function syncWheelColumnPosition(container, activeSelector) {
      if (!container) return;

      const activeEl = container.querySelector(activeSelector);
      if (!activeEl) return;

      const top =
        activeEl.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

      container.scrollTo({ top, behavior: "auto" });
    }

    function getCenteredWheelValue(container, attrName) {
      if (!container) return null;

      const items = [...container.querySelectorAll(`.month-wheel__item[${attrName}]`)];
      if (!items.length) return null;

      const containerCenter = container.scrollTop + container.clientHeight / 2;

      let closest = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const itemCenter = item.offsetTop + item.offsetHeight / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closest = item;
        }
      });

      return closest?.getAttribute(attrName) || null;
    }

    function setWheelActiveState(container, attrName, activeValue) {
      if (!container) return;

      container.querySelectorAll(`.month-wheel__item[${attrName}]`).forEach((item) => {
        item.classList.toggle("is-active", item.getAttribute(attrName) === activeValue);
      });
    }

    function snapWheelToValue(container, attrName, value, behavior = "smooth") {
      if (!container || !value) return;

      const activeEl = container.querySelector(`.month-wheel__item[${attrName}="${value}"]`);
      if (!activeEl) return;

      const top =
        activeEl.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

      container.scrollTo({ top, behavior });
    }

    function bindWheelScroll(container, attrName, onChange) {
      if (!container) return;

      if (boundWheelColumns.has(container)) return;
      boundWheelColumns.add(container);

      container.addEventListener(
        "scroll",
        () => {
          const isMonthColumn = attrName === "data-wheel-month";

          if (isMonthColumn) {
            window.clearTimeout(analyticsMonthScrollTimer);
          } else {
            window.clearTimeout(analyticsYearScrollTimer);
          }

          const centeredValue = getCenteredWheelValue(container, attrName);

          if (centeredValue) {
            onChange(centeredValue);
            setWheelActiveState(container, attrName, centeredValue);
          }

          const timer = window.setTimeout(() => {
            const finalValue = getCenteredWheelValue(container, attrName);
            if (!finalValue) return;

            onChange(finalValue);
            setWheelActiveState(container, attrName, finalValue);
            snapWheelToValue(container, attrName, finalValue, "smooth");
          }, 90);

          if (isMonthColumn) {
            analyticsMonthScrollTimer = timer;
          } else {
            analyticsYearScrollTimer = timer;
          }
        },
        { passive: true }
      );
    }

    function updateAnalyticsWheelDraftFromScroll() {
      const nextMonth = getCenteredWheelValue(
        analyticsMonthNamesColumn,
        "data-wheel-month"
      );

      const nextYear = getCenteredWheelValue(
        analyticsMonthYearsColumn,
        "data-wheel-year"
      );

      if (nextMonth) analyticsDraftMonth = nextMonth;
      if (nextYear) analyticsDraftYear = nextYear;

      renderAnalyticsMonthWheel();
    }

    function renderAnalyticsMonthWheel() {
      if (!analyticsMonthNamesColumn || !analyticsMonthYearsColumn) return;

      const monthNames = getRussianMonthNames().map((label, index) => ({
        value: String(index + 1).padStart(2, "0"),
        label,
      }));

      const years = getAnalyticsWheelYears().map((year) => ({
        value: year,
        label: year,
      }));

      analyticsMonthNamesColumn.innerHTML = buildWheelColumnItems(
        monthNames,
        analyticsDraftMonth,
        "data-wheel-month"
      );

      analyticsMonthYearsColumn.innerHTML = buildWheelColumnItems(
        years,
        analyticsDraftYear,
        "data-wheel-year"
      );

      analyticsMonthNamesColumn.querySelectorAll("[data-wheel-month]").forEach((btn) => {
        btn.addEventListener("click", () => {
          analyticsDraftMonth = btn.dataset.wheelMonth;

          setWheelActiveState(
            analyticsMonthNamesColumn,
            "data-wheel-month",
            analyticsDraftMonth
          );

          snapWheelToValue(
            analyticsMonthNamesColumn,
            "data-wheel-month",
            analyticsDraftMonth,
            "smooth"
          );
        });
      });

      analyticsMonthYearsColumn.querySelectorAll("[data-wheel-year]").forEach((btn) => {
        btn.addEventListener("click", () => {
          analyticsDraftYear = btn.dataset.wheelYear;

          setWheelActiveState(
            analyticsMonthYearsColumn,
            "data-wheel-year",
            analyticsDraftYear
          );

          snapWheelToValue(
            analyticsMonthYearsColumn,
            "data-wheel-year",
            analyticsDraftYear,
            "smooth"
          );
        });
      });

      bindWheelScroll(analyticsMonthNamesColumn, "data-wheel-month", (value) => {
        analyticsDraftMonth = value;
      });

      bindWheelScroll(analyticsMonthYearsColumn, "data-wheel-year", (value) => {
        analyticsDraftYear = value;
      });

      requestAnimationFrame(() => {
        setWheelActiveState(
          analyticsMonthNamesColumn,
          "data-wheel-month",
          analyticsDraftMonth
        );

        setWheelActiveState(
          analyticsMonthYearsColumn,
          "data-wheel-year",
          analyticsDraftYear
        );

        snapWheelToValue(
          analyticsMonthNamesColumn,
          "data-wheel-month",
          analyticsDraftMonth,
          "auto"
        );

        snapWheelToValue(
          analyticsMonthYearsColumn,
          "data-wheel-year",
          analyticsDraftYear,
          "auto"
        );
      });
    }

    function openAnalyticsMonthWheel() {
      setAnalyticsDraftMonthFromValue(getSelectedMonth());

      isAnalyticsMonthWheelOpen = true;
      analyticsMonthWheelWrap?.classList.remove("hidden");

      if (
        !analyticsMonthNamesColumn?.children.length ||
        !analyticsMonthYearsColumn?.children.length
      ) {
        renderAnalyticsMonthWheel();
        return;
      }

      setWheelActiveState(
        analyticsMonthNamesColumn,
        "data-wheel-month",
        analyticsDraftMonth
      );

      setWheelActiveState(
        analyticsMonthYearsColumn,
        "data-wheel-year",
        analyticsDraftYear
      );

      requestAnimationFrame(() => {
        snapWheelToValue(
          analyticsMonthNamesColumn,
          "data-wheel-month",
          analyticsDraftMonth,
          "auto"
        );

        snapWheelToValue(
          analyticsMonthYearsColumn,
          "data-wheel-year",
          analyticsDraftYear,
          "auto"
        );
      });
    }

    function closeAnalyticsMonthWheel() {
      isAnalyticsMonthWheelOpen = false;
      analyticsMonthWheelWrap?.classList.add("hidden");
    }

    function applyAnalyticsMonthWheel() {
      if (!analyticsDraftYear || !analyticsDraftMonth) {
        setAnalyticsDraftMonthFromValue(getSelectedMonth() || getCurrentMonthValue());
      }

      setSelectedMonth(getAnalyticsDraftMonthValue());
      setFilterPeriod("month");

      closeAnalyticsMonthWheel();
      renderAnalytics();
    }

    function resetAnalyticsMonthWheel() {
      setAnalyticsDraftMonthFromValue(getCurrentMonthValue());
      renderAnalyticsMonthWheel();
    }

    function getAnalyticsMonthWheelOpen() {
      return isAnalyticsMonthWheelOpen;
    }

    return {
      setAnalyticsDraftMonthFromValue,
      getAnalyticsDraftMonthValue,
      getAnalyticsWheelYears,
      buildWheelColumnItems,
      syncWheelColumnPosition,
      getCenteredWheelValue,
      setWheelActiveState,
      snapWheelToValue,
      bindWheelScroll,
      updateAnalyticsWheelDraftFromScroll,
      renderAnalyticsMonthWheel,
      openAnalyticsMonthWheel,
      closeAnalyticsMonthWheel,
      applyAnalyticsMonthWheel,
      resetAnalyticsMonthWheel,
      getAnalyticsMonthWheelOpen,
    };
  }

  window.FinanceAppAnalyticsMonthWheel = {
    create: createAnalyticsMonthWheel,
  };
})();
