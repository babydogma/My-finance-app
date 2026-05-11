// ===== js/27-analytics-tabs-render.js =====
(() => {
  function createAnalyticsTabsRender({
    analyticsOverviewSection,
    analyticsExpensesSection,
    analyticsSafesSection,

    analyticsTabOverviewBtn,
    analyticsTabExpensesBtn,
    analyticsTabSafesBtn,

    getAnalyticsTab,
    setAnalyticsTabValue,

    renderAnalyticsOverview,
    renderAnalyticsExpensesByCategory,
    renderAnalyticsSafes,
  }) {
    function normalizeAnalyticsTab(tab) {
      return tab === "safes" ? "safes" : "expenses";
    }

    function renderAnalytics() {
      const rawTab = getAnalyticsTab();
      const analyticsTab = normalizeAnalyticsTab(rawTab);

      if (rawTab !== analyticsTab) {
        setAnalyticsTabValue(analyticsTab);
      }

      const isExpenses = analyticsTab === "expenses";
      const isSafes = analyticsTab === "safes";

      analyticsOverviewSection?.classList.add("hidden");
      analyticsExpensesSection?.classList.toggle("hidden", !isExpenses);
      analyticsSafesSection?.classList.toggle("hidden", !isSafes);

      analyticsTabOverviewBtn?.classList.add("hidden");
      analyticsTabExpensesBtn?.classList.toggle("is-active", isExpenses);
      analyticsTabSafesBtn?.classList.toggle("is-active", isSafes);

      /*
        Обзор как экран удалён, но его расчёты нужны:
        - "Можно отложить" теперь живёт в Накоплениях
        - значения должны обновляться при каждом рендере аналитики
      */
      renderAnalyticsOverview();

      if (isExpenses) renderAnalyticsExpensesByCategory();
      if (isSafes) renderAnalyticsSafes();
    }

    function setAnalyticsTab(nextTab) {
      setAnalyticsTabValue(normalizeAnalyticsTab(nextTab));
      renderAnalytics();
    }

    return {
      renderAnalytics,
      setAnalyticsTab,
    };
  }

  window.FinanceAppAnalyticsTabsRender = {
    create: createAnalyticsTabsRender,
  };
})();

// ===== js/28-analytics-overview-render.js =====
(() => {
  function createAnalyticsOverviewRender({
    state,
    roundToTwo,
    calculateBalance,
    getFreeMoneyTotal,
    getProtectedMoneyTotal,
    getMandatoryPaymentsCoverageStats,
    getRemainingFlexibleBudgetsCurrentMonth,
    formatMoney,

    analyticsTotalBalanceValue,
    analyticsFreeMoneyValue,
    analyticsProtectedMoneyValue,
    analyticsPendingMandatoryValue,
    analyticsMandatoryTotalValue,
    analyticsMandatoryCoveredValue,
    analyticsRemainingBudgetsValue,
    analyticsCanSaveNowValue,
    analyticsCanSaveNowStatus,
    analyticsCanSaveNowHint,
  }) {
    function getAnalyticsOverviewSummary() {
      const totalBalance = roundToTwo(calculateBalance());
      const freeMoney = roundToTwo(getFreeMoneyTotal());
      const protectedMoney = roundToTwo(getProtectedMoneyTotal());

      const mandatoryStats = getMandatoryPaymentsCoverageStats();
      const pendingMandatoryTotal = mandatoryStats.total;
      const pendingMandatoryCoveredByLinkedSafes = mandatoryStats.coveredByLinkedSafes;
      const pendingMandatoryToDeduct = mandatoryStats.chargeToFreeMoney;

      const remainingBudgets = roundToTwo(getRemainingFlexibleBudgetsCurrentMonth());

      const safeInterest = roundToTwo(
        state.transactions
          .filter((item) => item.type === "income" && item.title === "Проценты по накоплению")
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
      );

      const canSaveNow = Math.max(
        0,
        roundToTwo(freeMoney - pendingMandatoryToDeduct - remainingBudgets)
      );

      return {
        totalBalance,
        freeMoney,
        protectedMoney,
        pendingMandatoryTotal,
        pendingMandatoryCoveredByLinkedSafes,
        pendingMandatoryToDeduct,
        remainingBudgets,
        canSaveNow,
        safeInterest,
      };
    }

    function renderAnalyticsOverview() {
      const summary = getAnalyticsOverviewSummary();

      if (analyticsTotalBalanceValue) {
        analyticsTotalBalanceValue.textContent = formatMoney(summary.totalBalance);
      }

      if (analyticsFreeMoneyValue) {
        analyticsFreeMoneyValue.textContent = formatMoney(summary.freeMoney);
      }

      if (analyticsProtectedMoneyValue) {
        analyticsProtectedMoneyValue.textContent = formatMoney(summary.protectedMoney);
      }

      if (analyticsPendingMandatoryValue) {
        analyticsPendingMandatoryValue.textContent = formatMoney(summary.pendingMandatoryToDeduct);
      }

      if (analyticsMandatoryTotalValue) {
        analyticsMandatoryTotalValue.textContent = formatMoney(summary.pendingMandatoryTotal);
      }

      if (analyticsMandatoryCoveredValue) {
        analyticsMandatoryCoveredValue.textContent = formatMoney(
          summary.pendingMandatoryCoveredByLinkedSafes
        );
      }

      if (analyticsRemainingBudgetsValue) {
        analyticsRemainingBudgetsValue.textContent = formatMoney(summary.remainingBudgets);
      }

      analyticsCanSaveNowValue?.classList.remove("is-positive", "is-negative");
      analyticsCanSaveNowValue?.classList.add(
        summary.canSaveNow > 0 ? "is-positive" : "is-negative"
      );

      if (analyticsCanSaveNowValue) {
        analyticsCanSaveNowValue.textContent = formatMoney(
          summary.canSaveNow > 0 ? summary.canSaveNow : 0
        );
      }

      if (summary.canSaveNow > 0) {
        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "Можно";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `После обязательных платежей и лимитов остаётся ${formatMoney(summary.canSaveNow)}.`;
        }
      } else {
        const deficit = Math.abs(
          Math.min(
            0,
            roundToTwo(
              summary.freeMoney -
                summary.pendingMandatoryToDeduct -
                summary.remainingBudgets
            )
          )
        );

        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "Сейчас рано";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `Не хватает ${formatMoney(deficit)} после учёта обязательных и лимитов.`;
        }
      }
    }

    return {
      getAnalyticsOverviewSummary,
      renderAnalyticsOverview,
    };
  }

  window.FinanceAppAnalyticsOverviewRender = {
    create: createAnalyticsOverviewRender,
  };
})();

// ===== js/29-analytics-expenses-render.js =====
(() => {
  function createAnalyticsExpensesRender({
    state,
    UNCATEGORIZED_ID,
    roundToTwo,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    getCategoryName,
    isRequiredCategory,
    formatMoney,
    escapeHtml,

    getFilterPeriod,
    setFilterPeriod,
    getSelectedMonth,
    setSelectedMonth,
    getRangeStart,
    getRangeEnd,

    analyticsExpenseValue,
    analyticsExpensesPeriodNote,
    analyticsExpensesCategoriesList,
    analyticsExpensesRing,
    analyticsExpensesRingCenterValue,
    analyticsExpensesRingCenterLabel,

    analyticsExpenseValuePremium,
    analyticsExpensesPeriodNotePremium,
    analyticsExpensesCategoriesListPremium,
    analyticsExpensesRingPremium,
    analyticsExpensesRingCenterValuePremium,
    analyticsExpensesRingCenterLabelPremium,

    analyticsExpensesMonthStrip,
    analyticsExpensesTotalRowValue,

    openAnalyticsCategoryModal,
  }) {
    let analyticsExpenseCategoryFilter = "all";
    let analyticsExpenseKindFilter = "all";

    let previousRingItems = null;
    let previousRingTotal = 0;
    let previousShownTotal = null;
    let previousTopPercent = 0;

    let ringAnimationFrameId = null;
    let moneyAnimationFrameId = null;
    let percentAnimationFrameId = null;

    const ANALYTICS_EXPENSE_COLORS = [
      "#D85C52",
      "#4FA864",
      "#5B8BE8",
      "#F2B84B",
      "#8A6FD6",
      "#3FA89F",
      "#D9833F",
      "#C76C95",
      "#6F7A8C",
      "#86B75F",
      "#5FA7C8",
      "#A979C9",
      "#4E9B82",
      "#D06E68",
      "#6D8FC7",
      "#B76FA4",
      "#7B8FA6",
      "#67A889",
      "#C9905A",
      "#8B7FD1",
      "#5C9CA8",
      "#A86E7E",
      "#7DAA78",
      "#B79A63",
    ];

    function getPrimaryExpenseValueEl() {
      return analyticsExpenseValuePremium || analyticsExpenseValue;
    }

    function getPrimaryExpensePeriodNoteEl() {
      return analyticsExpensesPeriodNotePremium || analyticsExpensesPeriodNote;
    }

    function getPrimaryExpenseListEl() {
      return analyticsExpensesCategoriesListPremium || analyticsExpensesCategoriesList;
    }

    function getPrimaryExpenseRingEl() {
      return analyticsExpensesRingPremium || analyticsExpensesRing;
    }

    function getPrimaryExpenseRingCenterValueEl() {
      return analyticsExpensesRingCenterValuePremium || analyticsExpensesRingCenterValue;
    }

    function getPrimaryExpenseRingCenterLabelEl() {
      return analyticsExpensesRingCenterLabelPremium || analyticsExpensesRingCenterLabel;
    }

    function normalizeAnalyticsMonthValue(value) {
      const match = String(value || "").match(/^(\d{4})-(\d{1,2})$/);

      if (!match) {
        return getCurrentMonthValue();
      }

      const year = match[1];
      const month = String(Number(match[2])).padStart(2, "0");

      return `${year}-${month}`;
    }

    function getAnalyticsColorHash(value) {
      const text = String(value || "");
      let hash = 0;

      for (let index = 0; index < text.length; index += 1) {
        hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
      }

      return hash;
    }

    function getAnalyticsExpenseColor(categoryId) {
      const categoryIds = (state.categories || []).map((category) => category.id);
      const allCategoryIds = Array.from(new Set([...categoryIds, UNCATEGORIZED_ID]));
      const index = allCategoryIds.indexOf(categoryId);

      if (index >= 0) {
        return ANALYTICS_EXPENSE_COLORS[index % ANALYTICS_EXPENSE_COLORS.length];
      }

      return ANALYTICS_EXPENSE_COLORS[
        getAnalyticsColorHash(categoryId) % ANALYTICS_EXPENSE_COLORS.length
      ];
    }

    function easeOutCubic(progress) {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    function lerpNumber(from, to, progress) {
      return from + (to - from) * progress;
    }

    function clampNumber(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function getDelayedProgress(progress, delay = 0.32) {
      return clampNumber((progress - delay) / (1 - delay), 0, 1);
    }

    function getEasedDelayedProgress(progress, delay = 0) {
      return easeOutCubic(getDelayedProgress(progress, delay));
    }

    function formatAnalyticsPercent(value) {
      const percent = Number(value) || 0;

      if (percent > 0 && percent < 1) {
        return "<1%";
      }

      return `${Math.round(percent)}%`;
    }

    function getRingTransitionProfile(fromItems, toItems, fromTotal, toTotal) {
      const fromCount = fromItems.length;
      const toCount = toItems.length;

      const safeFromTotal = Math.max(Number(fromTotal) || 0, 0);
      const safeToTotal = Math.max(Number(toTotal) || 0, 0);

      if (fromCount === 0 && toCount > 0) {
        return {
          type: "empty-in",
          duration: 1040,
          totalMode: "target",
          sharedDelay: 0,
          enterDelay: 0.08,
          exitDelay: 0,
          totalDelay: 0,
        };
      }

      if (fromCount > 0 && toCount === 0) {
        return {
          type: "empty-out",
          duration: 1040,
          totalMode: "source",
          sharedDelay: 0,
          enterDelay: 0,
          exitDelay: 0.08,
          totalDelay: 0,
        };
      }

      const heavyShrink =
        fromCount >= toCount + 4 ||
        safeFromTotal > safeToTotal * 2.15;

      if (heavyShrink) {
        return {
          type: "heavy-shrink",
          duration: 1240,
          totalMode: "delayed-shrink",
          sharedDelay: 0.08,
          enterDelay: 0.18,
          exitDelay: 0.16,
          totalDelay: 0.34,
        };
      }

      const heavyGrow =
        toCount >= fromCount + 4 ||
        safeToTotal > safeFromTotal * 2.15;

      if (heavyGrow) {
        return {
          type: "heavy-grow",
          duration: 1120,
          totalMode: "target",
          sharedDelay: 0.05,
          enterDelay: 0.16,
          exitDelay: 0.06,
          totalDelay: 0,
        };
      }

      return {
        type: "morph",
        duration: 980,
        totalMode: "mixed",
        sharedDelay: 0,
        enterDelay: 0.08,
        exitDelay: 0.08,
        totalDelay: 0,
      };
    }

    function getAnimatedRingTotal(fromTotal, toTotal, mixedItemsTotal, rawProgress, profile) {
      const safeFromTotal = Math.max(Number(fromTotal) || 0, 0);
      const safeToTotal = Math.max(Number(toTotal) || 0, 0);

      if (profile.totalMode === "target") {
        return Math.max(safeToTotal, 1);
      }

      if (profile.totalMode === "source") {
        return Math.max(safeFromTotal, 1);
      }

      if (profile.totalMode === "delayed-shrink") {
        const delayedProgress = getEasedDelayedProgress(rawProgress, profile.totalDelay);
        return Math.max(lerpNumber(safeFromTotal, safeToTotal, delayedProgress), 1);
      }

      return Math.max(mixedItemsTotal, 1);
    }

    function getTopPercentFromItems(items, total) {
      if (!total || total <= 0 || !items.length) return 0;

      const topItem = items[0];

      if (!topItem) return 0;

      return (topItem.amount / total) * 100;
    }

    function getRingItemsTotal(items) {
      return items.reduce((sum, item) => {
        return sum + (Number(item.amount) || 0);
      }, 0);
    }

    function getAnalyticsRingSeamSize(percent) {
      if (percent >= 8) return 0.34;
      if (percent >= 3) return 0.22;
      if (percent >= 1.25) return 0.13;
      if (percent >= 0.55) return 0.075;
      return 0.045;
    }

    function buildAnalyticsRingGradient(items, total) {
      const emptyColor = "rgba(255,255,255,0.09)";
      const seamColor = "rgba(8,10,14,0.62)";

      if (!total || total <= 0 || !items.length) {
        return `conic-gradient(${emptyColor} 0deg 360deg)`;
      }

      let cursor = 0;
      const visibleItems = items.filter((item) => item.amount > 0.01);

      const gradientParts = visibleItems.flatMap((item) => {
        const percent = Math.max(0, Math.min(100, (item.amount / total) * 100));
        const baseSeamSize = getAnalyticsRingSeamSize(percent);
        const seamSize = Math.min(baseSeamSize, percent * 0.22);

        const start = cursor;
        const rawEnd = Math.min(100, cursor + percent);
        const seamStart = Math.max(start, rawEnd - seamSize);

        cursor = rawEnd;

        if (seamSize <= 0.012 || seamStart <= start) {
          return [`${item.color} ${start.toFixed(2)}% ${rawEnd.toFixed(2)}%`];
        }

        return [
          `${item.color} ${start.toFixed(2)}% ${seamStart.toFixed(2)}%`,
          `${seamColor} ${seamStart.toFixed(2)}% ${rawEnd.toFixed(2)}%`,
        ];
      });

      if (!gradientParts.length) {
        return `conic-gradient(${emptyColor} 0deg 360deg)`;
      }

      if (cursor < 99.7) {
        gradientParts.push(`${emptyColor} ${cursor.toFixed(2)}% 100%`);
      }

      return `conic-gradient(${gradientParts.join(", ")})`;
    }

    function mergeRingItemsForAnimation(fromItems, toItems, rawProgress, profile) {
      const byCategory = new Map();
      const orderedCategoryIds = [];

      fromItems.forEach((item) => {
        if (!byCategory.has(item.categoryId)) {
          orderedCategoryIds.push(item.categoryId);
        }

        byCategory.set(item.categoryId, {
          categoryId: item.categoryId,
          name: item.name,
          color: item.color,
          fromAmount: item.amount,
          toAmount: 0,
        });
      });

      toItems.forEach((item) => {
        if (!byCategory.has(item.categoryId)) {
          orderedCategoryIds.push(item.categoryId);
        }

        const current = byCategory.get(item.categoryId) || {
          categoryId: item.categoryId,
          name: item.name,
          color: item.color,
          fromAmount: 0,
          toAmount: 0,
        };

        current.name = item.name;
        current.color = item.color;
        current.toAmount = item.amount;

        byCategory.set(item.categoryId, current);
      });

      return orderedCategoryIds
        .map((categoryId) => {
          const item = byCategory.get(categoryId);

          const isLeaving = item.fromAmount > 0 && item.toAmount <= 0;
          const isEntering = item.fromAmount <= 0 && item.toAmount > 0;

          let itemProgress;

          if (isLeaving) {
            itemProgress = getEasedDelayedProgress(rawProgress, profile.exitDelay);
          } else if (isEntering) {
            itemProgress = getEasedDelayedProgress(rawProgress, profile.enterDelay);
          } else {
            itemProgress = getEasedDelayedProgress(rawProgress, profile.sharedDelay);
          }

          return {
            categoryId: item.categoryId,
            name: item.name,
            color: item.color,
            amount: lerpNumber(item.fromAmount, item.toAmount, itemProgress),
          };
        })
        .filter((item) => item.amount > 0.01);
    }

    function animateTextNumber({
      from,
      to,
      duration = 420,
      format,
      onUpdate,
      onDone,
      frameIdGetter,
      frameIdSetter,
    }) {
      const startTime = performance.now();
      const previousFrameId = frameIdGetter();

      if (previousFrameId) {
        cancelAnimationFrame(previousFrameId);
      }

      function tick(now) {
        const rawProgress = Math.min((now - startTime) / duration, 1);
        const progress = easeOutCubic(rawProgress);
        const value = lerpNumber(from, to, progress);

        onUpdate(format(value));

        if (rawProgress < 1) {
          const nextFrameId = requestAnimationFrame(tick);
          frameIdSetter(nextFrameId);
          return;
        }

        onUpdate(format(to));
        frameIdSetter(null);
        onDone?.();
      }

      const nextFrameId = requestAnimationFrame(tick);
      frameIdSetter(nextFrameId);
    }

    function animateMoneyValue(element, from, to) {
      if (!element) return;

      animateTextNumber({
        from,
        to,
        duration: 820,
        format: (value) => formatMoney(roundToTwo(value)),
        onUpdate: (text) => {
          element.textContent = text;
        },
        frameIdGetter: () => moneyAnimationFrameId,
        frameIdSetter: (nextId) => {
          moneyAnimationFrameId = nextId;
        },
      });
    }

    function animatePercentValue(element, from, to) {
      if (!element) return;

      animateTextNumber({
        from,
        to,
        duration: 700,
        format: (value) => formatAnalyticsPercent(value),
        onUpdate: (text) => {
          element.textContent = text;
        },
        frameIdGetter: () => percentAnimationFrameId,
        frameIdSetter: (nextId) => {
          percentAnimationFrameId = nextId;
        },
      });
    }

    function getAnalyticsExpensesPeriodNote() {
      const period = getFilterPeriod();

      if (period === "month") return "за месяц";
      if (period === "today") return "за сегодня";
      if (period === "7") return "за 7 дней";
      if (period === "range") return "за выбранный период";

      return "за период";
    }

    function getAnalyticsExpenseBaseTransactions() {
      const transactions = Array.isArray(state.transactions) ? state.transactions : [];
      const normalizedMonth = normalizeAnalyticsMonthValue(getSelectedMonth());

      if (normalizedMonth !== getSelectedMonth()) {
        setSelectedMonth(normalizedMonth);
      }

      return filterTransactionsByPeriod(
        transactions,
        getFilterPeriod(),
        normalizedMonth,
        getRangeStart(),
        getRangeEnd()
      ).filter((transaction) => transaction.type === "expense");
    }

    function isAnalyticsExpenseRequiredCategory(categoryId) {
      if (categoryId === UNCATEGORIZED_ID) return false;

      return typeof isRequiredCategory === "function"
        ? isRequiredCategory(categoryId)
        : false;
    }

    function isAnalyticsExpenseKindTransaction(transaction) {
      if (analyticsExpenseKindFilter === "all") {
        return true;
      }

      const categoryId = transaction.category_id || UNCATEGORIZED_ID;
      const isRequired = isAnalyticsExpenseRequiredCategory(categoryId);

      if (analyticsExpenseKindFilter === "required") {
        return isRequired;
      }

      if (analyticsExpenseKindFilter === "flexible") {
        return !isRequired;
      }

      return true;
    }

    function getAnalyticsExpenseKindTransactions() {
      return getAnalyticsExpenseBaseTransactions().filter(isAnalyticsExpenseKindTransaction);
    }

    function syncAnalyticsExpenseKindRail() {
      document.querySelectorAll("[data-analytics-expense-kind]").forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.analyticsExpenseKind === analyticsExpenseKindFilter
        );
      });
    }

    function bindAnalyticsExpenseKindRail() {
      document.querySelectorAll("[data-analytics-expense-kind]").forEach((button) => {
        if (button.dataset.kindBound === "true") return;

        button.dataset.kindBound = "true";

        button.addEventListener("click", () => {
          const nextKind = button.dataset.analyticsExpenseKind || "all";

          if (analyticsExpenseKindFilter === nextKind) return;

          analyticsExpenseKindFilter = nextKind;
          analyticsExpenseCategoryFilter = "all";
          syncAnalyticsExpenseKindRail();
          renderAnalyticsExpensesByCategory();
        });
      });
    }

    function getAnalyticsExpenseFilteredTransactions() {
      const expenseTransactions = getAnalyticsExpenseKindTransactions();

      if (analyticsExpenseCategoryFilter === "all") {
        return expenseTransactions;
      }

      return expenseTransactions.filter((transaction) => {
        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        return categoryId === analyticsExpenseCategoryFilter;
      });
    }

    function getAnalyticsExpenseItems(expenseTransactions) {
      const byCategory = new Map();

      expenseTransactions.forEach((transaction) => {
        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const amount = Number(transaction.amount) || 0;

        const current = byCategory.get(categoryId) || {
          categoryId,
          name: getCategoryName(categoryId),
          amount: 0,
          color: getAnalyticsExpenseColor(categoryId),
        };

        current.amount += amount;
        byCategory.set(categoryId, current);
      });

      return Array.from(byCategory.values())
        .map((item) => ({
          ...item,
          amount: roundToTwo(item.amount),
        }))
        .filter((item) => item.amount > 0)
        .sort((a, b) => b.amount - a.amount);
    }

    function renderAnalyticsExpensesRing(items, total, options = {}) {
      const ringEl = getPrimaryExpenseRingEl();
      const centerValueEl = getPrimaryExpenseRingCenterValueEl();
      const centerLabelEl = getPrimaryExpenseRingCenterLabelEl();

      if (!ringEl) return;

      const shouldAnimate = options.animate === true;
      const nextTopPercent = getTopPercentFromItems(items, total);
      const nextTopItem = items[0];
      const nextCenterLabel = nextTopItem ? nextTopItem.name : "Нет расходов";

      function setRingGradient(nextItems, nextTotal) {
        const gradient = buildAnalyticsRingGradient(nextItems, nextTotal);

        ringEl.style.background = gradient;
        ringEl.style.setProperty("--analytics-ring-gradient", gradient);
      }

      function setFinalRingState(nextItems, nextTotal, nextPercent, nextLabel) {
        setRingGradient(nextItems, nextTotal);

        if (centerValueEl) {
          centerValueEl.textContent = formatAnalyticsPercent(nextPercent);
        }

        if (centerLabelEl) {
          centerLabelEl.textContent = nextLabel;
        }

        previousRingItems = nextItems.map((item) => ({ ...item }));
        previousRingTotal = nextTotal;
        previousTopPercent = nextPercent;
        ringAnimationFrameId = null;
      }

      if (!shouldAnimate || !previousRingItems) {
        setFinalRingState(items, total, nextTopPercent, nextCenterLabel);
        return;
      }

      if (ringAnimationFrameId) {
        cancelAnimationFrame(ringAnimationFrameId);
        ringAnimationFrameId = null;
      }

      const fromItems = previousRingItems.map((item) => ({ ...item }));
      const fromTotal = previousRingTotal;
      const fromTopPercent = previousTopPercent;

      const toItems = items.map((item) => ({ ...item }));
      const toTotal = total;

      function animateRingPhase({
        phaseFromItems,
        phaseToItems,
        phaseFromTotal,
        phaseToTotal,
        duration,
        onDone,
      }) {
        const profile = getRingTransitionProfile(
          phaseFromItems,
          phaseToItems,
          phaseFromTotal,
          phaseToTotal
        );

        const startTime = performance.now();

        function tick(now) {
          const rawProgress = Math.min((now - startTime) / duration, 1);

          const mixedItems = mergeRingItemsForAnimation(
            phaseFromItems,
            phaseToItems,
            rawProgress,
            profile
          );

          const mixedItemsTotal = getRingItemsTotal(mixedItems);

          const mixedTotal = getAnimatedRingTotal(
            phaseFromTotal,
            phaseToTotal,
            mixedItemsTotal,
            rawProgress,
            profile
          );

          setRingGradient(mixedItems, mixedTotal);

          if (rawProgress < 1) {
            ringAnimationFrameId = requestAnimationFrame(tick);
            return;
          }

          setRingGradient(phaseToItems, phaseToTotal);
          ringAnimationFrameId = null;
          onDone?.();
        }

        ringAnimationFrameId = requestAnimationFrame(tick);
      }

      animatePercentValue(centerValueEl, fromTopPercent, 0);

      animateRingPhase({
        phaseFromItems: fromItems,
        phaseToItems: [],
        phaseFromTotal: fromTotal,
        phaseToTotal: 0,
        duration: 430,
        onDone: () => {
          if (centerLabelEl) {
            centerLabelEl.textContent = "Нет расходов";
          }

          if (!toItems.length || !toTotal) {
            setFinalRingState([], 0, 0, "Нет расходов");
            return;
          }

          if (centerLabelEl) {
            centerLabelEl.textContent = nextCenterLabel;
          }

          animatePercentValue(centerValueEl, 0, nextTopPercent);

          animateRingPhase({
            phaseFromItems: [],
            phaseToItems: toItems,
            phaseFromTotal: 0,
            phaseToTotal: toTotal,
            duration: 650,
            onDone: () => {
              setFinalRingState(toItems, toTotal, nextTopPercent, nextCenterLabel);
            },
          });
        },
      });
    }

    function getAnalyticsMonthDateFromValue(value) {
      const normalized = normalizeAnalyticsMonthValue(value);
      const match = normalized.match(/^(\d{4})-(\d{2})$/);

      return new Date(Number(match[1]), Number(match[2]) - 1, 1);
    }

    function getAnalyticsMonthKeyFromDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      return `${year}-${month}`;
    }

    function getAnalyticsMonthShortLabel(monthKey) {
      const date = getAnalyticsMonthDateFromValue(monthKey);

      return date
        .toLocaleDateString("ru-RU", {
          month: "short",
        })
        .replace(".", "");
    }

    function getAnalyticsMonthStripItems() {
      const selectedDate = getAnalyticsMonthDateFromValue(getSelectedMonth());
      const selectedYear = selectedDate.getFullYear();
      const items = [];

      for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
        const date = new Date(selectedYear, monthIndex, 1);
        const monthKey = getAnalyticsMonthKeyFromDate(date);

        const monthTransactions = filterTransactionsByPeriod(
          state.transactions,
          "month",
          monthKey,
          "",
          ""
        ).filter((transaction) => transaction.type === "expense");

        const total = roundToTwo(
          monthTransactions.reduce((sum, transaction) => {
            return sum + (Number(transaction.amount) || 0);
          }, 0)
        );

        items.push({
          monthKey,
          label: getAnalyticsMonthShortLabel(monthKey),
          total,
        });
      }

      return items;
    }

    function renderAnalyticsExpensesMonthStrip() {
      if (!analyticsExpensesMonthStrip) return;

      const items = getAnalyticsMonthStripItems();
      const maxTotal = Math.max(...items.map((item) => item.total), 1);
      const selectedMonth = normalizeAnalyticsMonthValue(getSelectedMonth());

      analyticsExpensesMonthStrip.innerHTML = "";

      items.forEach((item) => {
        const percent = item.total > 0 ? item.total / maxTotal : 0;
        const height = Math.max(4, Math.round(44 * percent));

        const button = document.createElement("button");
        button.type = "button";
        button.className =
          `analytics-expenses-month-item${
            item.monthKey === selectedMonth ? " is-active" : ""
          }`;

        button.innerHTML = `
          <div
            class="analytics-expenses-month-item__bar"
            style="height: ${height}px"
          ></div>
          <div class="analytics-expenses-month-item__label">
            ${escapeHtml(item.label)}
          </div>
        `;

        button.addEventListener("click", () => {
          analyticsExpenseCategoryFilter = "all";
          setSelectedMonth(item.monthKey);
          setFilterPeriod("month");
          renderAnalyticsExpensesByCategory();
        });

        analyticsExpensesMonthStrip.appendChild(button);
      });
    }

    function renderAnalyticsExpensesCategories(items, total) {
      const listEl = getPrimaryExpenseListEl();

      if (!listEl) return;

      listEl.innerHTML = "";

      if (!total || total <= 0 || items.length === 0) {
        listEl.innerHTML = `
          <div class="analytics-expenses-empty">
            За выбранный период расходов нет
          </div>
        `;
        return;
      }

      items.forEach((item) => {
        const rawPercent = total > 0 ? (item.amount / total) * 100 : 0;
        const percentForBar = rawPercent > 0 && rawPercent < 1
          ? 1
          : Math.round(rawPercent);
        const percentLabel = formatAnalyticsPercent(rawPercent);

        const row = document.createElement("button");
        row.className =
          "analytics-expense-category-row analytics-expense-category-row--premium";
        row.type = "button";
        row.dataset.categoryId = item.categoryId;

        row.innerHTML = `
          <div
            class="analytics-expense-category-row__icon"
            style="--category-color: ${item.color}"
          >
            <span>${escapeHtml(item.name.slice(0, 1).toUpperCase())}</span>
          </div>

          <div class="analytics-expense-category-row__main">
            <div class="analytics-expense-category-row__top">
              <div class="analytics-expense-category-row__name">
                ${escapeHtml(item.name)}
              </div>
              <div class="analytics-expense-category-row__amount">
                ${formatMoney(item.amount)}
              </div>
            </div>

            <div class="analytics-expense-category-row__bottom">
              <div class="analytics-expense-category-row__bar">
                <div
                  class="analytics-expense-category-row__bar-fill"
                  style="width: ${Math.max(2, percentForBar)}%; background: ${item.color}; color: ${item.color};"
                ></div>
              </div>

              <div class="analytics-expense-category-row__percent">${percentLabel}</div>
            </div>
          </div>
        `;

        row.addEventListener("click", () => {
          openAnalyticsCategoryModal?.(item.categoryId);
        });

        listEl.appendChild(row);
      });
    }

    function renderAnalyticsExpensesByCategory() {
      bindAnalyticsExpenseKindRail();
      syncAnalyticsExpenseKindRail();

      const baseExpenseTransactions = getAnalyticsExpenseKindTransactions();
      const filteredExpenseTransactions = getAnalyticsExpenseFilteredTransactions();

      const totalAll = roundToTwo(
        baseExpenseTransactions.reduce((sum, transaction) => {
          return sum + (Number(transaction.amount) || 0);
        }, 0)
      );

      const totalFiltered = roundToTwo(
        filteredExpenseTransactions.reduce((sum, transaction) => {
          return sum + (Number(transaction.amount) || 0);
        }, 0)
      );

      const ringItems = getAnalyticsExpenseItems(baseExpenseTransactions);
      const listItems = getAnalyticsExpenseItems(filteredExpenseTransactions);

      const shownTotal =
        analyticsExpenseCategoryFilter === "all" ? totalAll : totalFiltered;

      const valueEl = getPrimaryExpenseValueEl();
      const periodNoteEl = getPrimaryExpensePeriodNoteEl();

      if (previousShownTotal === null) {
        if (valueEl) {
          valueEl.textContent = formatMoney(shownTotal);
        }

        if (analyticsExpensesTotalRowValue) {
          analyticsExpensesTotalRowValue.textContent = formatMoney(shownTotal);
        }

        previousShownTotal = shownTotal;
      } else {
        animateMoneyValue(valueEl, previousShownTotal, shownTotal);
        animateMoneyValue(analyticsExpensesTotalRowValue, previousShownTotal, shownTotal);

        previousShownTotal = shownTotal;
      }

      if (periodNoteEl) {
        periodNoteEl.textContent = getAnalyticsExpensesPeriodNote();
      }

      renderAnalyticsExpensesRing(ringItems, totalAll, {
        animate: previousRingItems !== null,
      });

      renderAnalyticsExpensesMonthStrip();
      renderAnalyticsExpensesCategories(listItems, shownTotal);
    }

    function resetAnalyticsExpenseCategoryFilter() {
      analyticsExpenseCategoryFilter = "all";
    }
    
    function setAnalyticsExpenseKindFilter(nextKind = "all") {
  const allowedKinds = ["all", "flexible", "required"];

  analyticsExpenseKindFilter = allowedKinds.includes(nextKind)
    ? nextKind
    : "all";

  analyticsExpenseCategoryFilter = "all";
  syncAnalyticsExpenseKindRail();
}

function getAnalyticsExpenseKindFilter() {
  return analyticsExpenseKindFilter;
}

    return {
  getAnalyticsExpensesPeriodNote,
  getAnalyticsExpenseColor,
  getAnalyticsExpenseItems,
  renderAnalyticsExpensesByCategory,
  resetAnalyticsExpenseCategoryFilter,
  setAnalyticsExpenseKindFilter,
  getAnalyticsExpenseKindFilter,
};
  }

  window.FinanceAppAnalyticsExpensesRender = {
    create: createAnalyticsExpensesRender,
  };
})();

// ===== js/30-analytics-safes-render.js =====
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

// ===== js/31-analytics-category-modal.js =====
(() => {
  function createAnalyticsCategoryModal({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,

    analyticsCategoryModal,
    analyticsCategoryModalTitle,
    analyticsCategoryModalPeriodLabel,
    analyticsCategoryBudgetBtn,
    analyticsCategoryTypeBtn,
    analyticsCategoryTransactionsList,

    getActiveAnalyticsCategoryId,
    setActiveAnalyticsCategoryId,

    getFilterPeriod,
    getSelectedMonth,
    getRangeStart,
    getRangeEnd,

    filterTransactionsByPeriod,
    sortTransactionsByLatest,

    getCategoryName,
    getBudgetLimitLabel,
    isRequiredCategory,

    getAnalyticsPeriodLabel,
    createTransactionCard,
    openBudgetModal,

    openAnimatedModal,
    closeAnimatedModal,

    loadDataFromSupabase,
    renderAll,
  }) {
    let modalBound = false;

    function bindAnalyticsCategoryModalEvents() {
      if (modalBound || !analyticsCategoryModal) return;

      modalBound = true;

      const closeBtn = document.getElementById("closeAnalyticsCategoryModalBtn");

      closeBtn?.addEventListener("click", () => {
        closeAnalyticsCategoryModal();
      });

      analyticsCategoryModal.addEventListener("click", (event) => {
        if (event.target === analyticsCategoryModal) {
          closeAnalyticsCategoryModal();
        }
      });
    }

    function getSafeCategoryName(categoryId) {
      if (categoryId === "transfers") return "Переводы";

      const name = getCategoryName(categoryId);

      return String(name || "").trim() || "Категория";
    }

    function getAnalyticsFilteredTransactions() {
      const transactions = Array.isArray(state.transactions)
        ? state.transactions
        : [];

      return filterTransactionsByPeriod(
        transactions,
        getFilterPeriod(),
        getSelectedMonth(),
        getRangeStart(),
        getRangeEnd()
      );
    }

    function getAnalyticsTransactionsByCategory(categoryId) {
      const items = getAnalyticsFilteredTransactions();

      if (categoryId === "transfers") {
        return sortTransactionsByLatest(
          items.filter((transaction) => transaction.type === "transfer")
        );
      }

      return sortTransactionsByLatest(
        items.filter((transaction) => {
          if (transaction.type !== "expense") return false;

          return (transaction.category_id || UNCATEGORIZED_ID) === categoryId;
        })
      );
    }

    function renderBrokenTransactionFallback(transaction) {
      const fallback = document.createElement("div");

      fallback.className = "list-card";
      fallback.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">Операция</h3>
          <p class="list-subtitle">Карточка операции повреждена, но приложение не упало</p>
        </div>
      `;

      if (transaction?.id) {
        fallback.dataset.transactionId = transaction.id;
      }

      return fallback;
    }

    function renderAnalyticsCategoryTransactions(categoryId) {
      if (!analyticsCategoryTransactionsList) {
        console.error("analyticsCategoryTransactionsList not found");
        return;
      }

      let transactions = [];

      try {
        transactions = getAnalyticsTransactionsByCategory(categoryId);
      } catch (error) {
        console.error("getAnalyticsTransactionsByCategory error:", error, categoryId);

        analyticsCategoryTransactionsList.innerHTML = `
          <div class="list-card">
            <div class="list-body">
              <h3 class="list-title">Ошибка загрузки операций</h3>
              <p class="list-subtitle">Не удалось собрать список операций категории</p>
            </div>
          </div>
        `;

        return;
      }

      analyticsCategoryTransactionsList.innerHTML = "";

      if (!transactions.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Операций нет</h3>
            <p class="list-subtitle">За выбранный период ничего не найдено</p>
          </div>
        `;

        analyticsCategoryTransactionsList.appendChild(empty);
        return;
      }

      transactions.forEach((transaction) => {
        try {
          analyticsCategoryTransactionsList.appendChild(
            createTransactionCard(transaction)
          );
        } catch (error) {
          console.error("analytics category transaction render error:", error, transaction);

          analyticsCategoryTransactionsList.appendChild(
            renderBrokenTransactionFallback(transaction)
          );
        }
      });
    }

    function syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory) {
      if (!analyticsCategoryBudgetBtn) return;

      if (isTransferCategory) {
        analyticsCategoryBudgetBtn.textContent = "—";
        analyticsCategoryBudgetBtn.onclick = null;
        analyticsCategoryBudgetBtn.disabled = true;
        return;
      }

      analyticsCategoryBudgetBtn.textContent = getBudgetLimitLabel(categoryId);
      analyticsCategoryBudgetBtn.disabled = false;

      analyticsCategoryBudgetBtn.onclick = () => {
        openBudgetModal(categoryId);
      };
    }

    function syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory) {
      if (!analyticsCategoryTypeBtn) return;

      if (isTransferCategory) {
        analyticsCategoryTypeBtn.textContent = "Гибкая";
        analyticsCategoryTypeBtn.disabled = true;
        analyticsCategoryTypeBtn.onclick = null;
        analyticsCategoryTypeBtn.classList.remove("analytics-category-type-btn--required");
        analyticsCategoryTypeBtn.classList.add("analytics-category-type-btn--flex");
        return;
      }

      const required = isRequiredCategory(categoryId);

      analyticsCategoryTypeBtn.textContent = required ? "Обязательная" : "Гибкая";
      analyticsCategoryTypeBtn.disabled = false;

      analyticsCategoryTypeBtn.classList.toggle(
        "analytics-category-type-btn--required",
        required
      );

      analyticsCategoryTypeBtn.classList.toggle(
        "analytics-category-type-btn--flex",
        !required
      );

      analyticsCategoryTypeBtn.onclick = async () => {
        try {
          const { error } = await supabaseClient
            .from("categories")
            .update({ is_required: !required })
            .eq("id", categoryId);

          if (error) {
            alert("Ошибка обновления типа категории");
            console.error(error);
            return;
          }

          await loadDataFromSupabase();

          openAnalyticsCategoryModal(categoryId);
          renderAll();
        } catch (error) {
          alert("Ошибка обновления типа категории");
          console.error(error);
        }
      };
    }

    function openAnalyticsCategoryModal(categoryId) {
      if (!analyticsCategoryModal) {
        console.error("analyticsCategoryModal not found in index.html");
        alert("Модалка категории не найдена в index.html");
        return;
      }

      try {
        bindAnalyticsCategoryModalEvents();

        setActiveAnalyticsCategoryId(categoryId);

        const isTransferCategory = categoryId === "transfers";
        const title = getSafeCategoryName(categoryId);
        const periodLabel = getAnalyticsPeriodLabel() || "Период";

        if (analyticsCategoryModalTitle) {
          analyticsCategoryModalTitle.textContent = title;
        }

        if (analyticsCategoryModalPeriodLabel) {
          analyticsCategoryModalPeriodLabel.textContent = periodLabel;
        }

        syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory);
        syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory);
        renderAnalyticsCategoryTransactions(categoryId);

        openAnimatedModal(analyticsCategoryModal);
      } catch (error) {
        console.error("openAnalyticsCategoryModal error:", error, categoryId);

        alert("Не получилось открыть операции категории. Ошибка в данных операции.");
      }
    }

    function closeAnalyticsCategoryModal() {
      if (!analyticsCategoryModal) return;

      closeAnimatedModal(analyticsCategoryModal);
      setActiveAnalyticsCategoryId(null);
    }

    return {
      getAnalyticsFilteredTransactions,
      getAnalyticsTransactionsByCategory,
      renderAnalyticsCategoryTransactions,
      openAnalyticsCategoryModal,
      closeAnalyticsCategoryModal,
    };
  }

  window.FinanceAppAnalyticsCategoryModal = {
    create: createAnalyticsCategoryModal,
  };
})();

// ===== js/32-analytics-safes-models.js =====
(() => {
  const UNCATEGORIZED_ID = "__uncategorized__";

  function toNumber(value) {
    if (value === null || value === undefined || value === "") return 0;

    if (typeof value === "number") return Number.isFinite(value) ? value : 0;

    const normalized = String(value)
      .replace(/\s/g, "")
      .replace(",", ".");

    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function fallbackFormatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} ₽`;
  }

  function fallbackEscapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getCurrentMonthValue() {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  function getDateFromMonthValue(monthValue) {
    const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);

    if (!match) {
      return new Date();
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1);
  }

  function getMonthValueFromDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }

  function getPreviousMonthValue(monthValue) {
    const date = getDateFromMonthValue(monthValue);

    return getMonthValueFromDate(
      new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }

  function getMonthDays(selectedMonth) {
    const date = getDateFromMonthValue(selectedMonth);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) {
      return {
        elapsedDays: daysInMonth,
        remainingDays: 0,
        daysInMonth,
      };
    }

    if (selectedMonth > currentMonth) {
      return {
        elapsedDays: 0,
        remainingDays: daysInMonth,
        daysInMonth,
      };
    }

    const today = new Date().getDate();

    return {
      elapsedDays: Math.min(daysInMonth, Math.max(1, today)),
      remainingDays: Math.max(0, daysInMonth - today),
      daysInMonth,
    };
  }

  function getTransactionDateKey(transaction) {
    const rawValue =
      transaction.date ||
      transaction.transaction_date ||
      transaction.operation_date ||
      transaction.created_date ||
      transaction.created_at ||
      transaction.createdAt ||
      "";

    if (!rawValue) return "";

    const rawText = String(rawValue);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return rawText.slice(0, 10);
    }

    const parsedDate = new Date(rawText);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;
  }

  function getMonthTransactions(state, selectedMonth) {
    return (state.transactions || []).filter((transaction) => {
      const dateKey = getTransactionDateKey(transaction);

      return dateKey.slice(0, 7) === selectedMonth;
    });
  }

  function getCategoryId(transaction) {
    return (
      transaction.category_id ||
      transaction.categoryId ||
      transaction.category ||
      UNCATEGORIZED_ID
    );
  }

  function getCategories(state) {
    return (
      state.categories ||
      state.expenseCategories ||
      state.budgetCategories ||
      []
    );
  }

  function getCategoryById(state, categoryId) {
    return getCategories(state).find((category) => {
      return String(category.id) === String(categoryId);
    }) || null;
  }

    function getBudgetLimits(state) {
    return (
      state.budgetLimits ||
      state.budget_limits ||
      state.categoryBudgetLimits ||
      []
    );
  }

  function getBudgetLimitAmountFromItem(item) {
    if (!item) return 0;

    return toNumber(
      item.amount ??
      item.limit_amount ??
      item.limitAmount ??
      item.budget_amount ??
      item.budgetAmount ??
      item.monthly_amount ??
      item.monthlyAmount ??
      item.monthly_limit ??
      item.monthlyLimit ??
      item.budget_limit ??
      item.budgetLimit ??
      item.limit ??
      item.value ??
      0
    );
  }

  function getBudgetLimitCategoryId(item) {
    if (!item) return "";

    return (
      item.category_id ||
      item.categoryId ||
      item.category ||
      item.expense_category_id ||
      item.expenseCategoryId ||
      ""
    );
  }

  function getBudgetLimitFromCategory(category) {
    if (!category) return 0;

    return toNumber(
      category.budget_limit ??
      category.budgetLimit ??
      category.monthly_limit ??
      category.monthlyLimit ??
      category.limit ??
      category.amount_limit ??
      category.amountLimit ??
      category.budget ??
      category.plan ??
      category.month_limit ??
      category.monthLimit ??
      0
    );
  }

  function getBudgetLimitForCategory(state, categoryId) {
    const fromBudgetLimits = getBudgetLimits(state).find((item) => {
      return String(getBudgetLimitCategoryId(item)) === String(categoryId);
    });

    const budgetLimitAmount = getBudgetLimitAmountFromItem(fromBudgetLimits);

    if (budgetLimitAmount > 0) {
      return budgetLimitAmount;
    }

    const category = getCategoryById(state, categoryId);

    return getBudgetLimitFromCategory(category);
  }

  function getPaymentStartMonth(payment) {
    return (
      payment.start_period ||
      payment.startPeriod ||
      payment.start_month ||
      payment.startMonth ||
      ""
    );
  }

  function getPaymentPaidPeriods(payment) {
    if (Array.isArray(payment.paid_periods)) return payment.paid_periods;
    if (Array.isArray(payment.paidPeriods)) return payment.paidPeriods;

    return [];
  }

  function isPaymentEnabled(payment) {
    return payment.enabled !== false;
  }

  function isPaymentStarted(payment, selectedMonth) {
    const startMonth = getPaymentStartMonth(payment);

    if (!startMonth) return true;

    return startMonth <= selectedMonth;
  }

  function isCalendarPaymentTransaction(transaction, paymentId, selectedMonth) {
    const transactionPaymentId =
      transaction.calendar_payment_id ||
      transaction.mandatory_payment_id ||
      transaction.source_id ||
      "";

    const transactionPeriod =
      transaction.calendar_payment_period ||
      transaction.mandatory_payment_period ||
      "";

    const transactionMonth = getTransactionDateKey(transaction).slice(0, 7);

    const source =
      transaction.source ||
      transaction.source_type ||
      transaction.sourceType ||
      "";

    const isCalendarSource =
      source === "calendar_payment" ||
      source === "mandatory_payment" ||
      Boolean(transaction.calendar_payment_id) ||
      Boolean(transaction.mandatory_payment_id);

    if (!isCalendarSource) return false;
    if (String(transactionPaymentId) !== String(paymentId)) return false;

    if (transactionPeriod) {
      return transactionPeriod === selectedMonth;
    }

    return transactionMonth === selectedMonth;
  }

  function isPaymentPaidForMonth(payment, selectedMonth, monthTransactions) {
    const paidPeriods = getPaymentPaidPeriods(payment);

    if (paidPeriods.includes(selectedMonth)) return true;

    return monthTransactions.some((transaction) => {
      return isCalendarPaymentTransaction(transaction, payment.id, selectedMonth);
    });
  }

  function getCalendarReservedAmount(state, selectedMonth, monthTransactions) {
    const payments = state.mandatoryPayments || state.calendarPayments || [];

    let reserved = 0;

    payments.forEach((payment) => {
      if (!isPaymentEnabled(payment)) return;
      if (!isPaymentStarted(payment, selectedMonth)) return;
      if (isPaymentPaidForMonth(payment, selectedMonth, monthTransactions)) return;

      const amount = toNumber(payment.amount);

      if (amount > 0) {
        reserved += amount;
      }
    });

    return roundToTwo(reserved);
  }

  function getMonthProgressPercent(selectedMonth) {
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) return 100;
    if (selectedMonth > currentMonth) return 0;

    const { elapsedDays, daysInMonth } = getMonthDays(selectedMonth);

    return Math.min(100, Math.max(1, Math.round((elapsedDays / daysInMonth) * 100)));
  }

  function getPercent(value, base) {
    if (base <= 0) return 0;

    return Math.round((value / base) * 100);
  }

  function buildFlexibleForecast({
    state,
    selectedMonth,
    currentMonthTransactions,
    previousMonthTransactions,
    isRequiredCategory,
  }) {
    const selectedIsPast = selectedMonth < getCurrentMonthValue();

    if (selectedIsPast) {
      return {
        total: 0,
        limitedRest: 0,
        historyRest: 0,
        paceRest: 0,
        currentFlexibleSpent: 0,
        currentFlexibleLimitedSpent: 0,
        currentFlexibleNoLimitSpent: 0,
        previousFlexibleNoLimitSpent: 0,
      };
    }

    const { elapsedDays, remainingDays } = getMonthDays(selectedMonth);

    const currentFlexibleByCategory = new Map();
    const previousFlexibleByCategory = new Map();

    function collectFlexibleExpense(map, transaction) {
      const type = String(transaction.type || "").toLowerCase();

      if (type !== "expense") return;

      const categoryId = getCategoryId(transaction);
      const required =
        typeof isRequiredCategory === "function"
          ? isRequiredCategory(categoryId)
          : false;

      if (required) return;

      const amount = toNumber(transaction.amount);

      if (amount <= 0) return;

      map.set(categoryId, roundToTwo((map.get(categoryId) || 0) + amount));
    }

    currentMonthTransactions.forEach((transaction) => {
      collectFlexibleExpense(currentFlexibleByCategory, transaction);
    });

    previousMonthTransactions.forEach((transaction) => {
      collectFlexibleExpense(previousFlexibleByCategory, transaction);
    });

        const categoryIds = new Set([
      ...currentFlexibleByCategory.keys(),
      ...previousFlexibleByCategory.keys(),
      ...getCategories(state).map((category) => category.id),
      ...getBudgetLimits(state).map((item) => getBudgetLimitCategoryId(item)),
    ]);

    let limitedRest = 0;
    let historyRest = 0;
    let paceBaseCurrentNoLimitSpent = 0;

    let currentFlexibleSpent = 0;
    let currentFlexibleLimitedSpent = 0;
    let currentFlexibleNoLimitSpent = 0;
    let previousFlexibleNoLimitSpent = 0;

    categoryIds.forEach((categoryId) => {
      const currentSpent = toNumber(currentFlexibleByCategory.get(categoryId));
      const previousSpent = toNumber(previousFlexibleByCategory.get(categoryId));
            const limit = getBudgetLimitForCategory(state, categoryId);

      if (currentSpent > 0) {
        currentFlexibleSpent += currentSpent;
      }

      if (limit > 0) {
        currentFlexibleLimitedSpent += currentSpent;
        limitedRest += Math.max(0, limit - currentSpent);
        return;
      }

      currentFlexibleNoLimitSpent += currentSpent;
      previousFlexibleNoLimitSpent += previousSpent;

      if (previousSpent > 0) {
        historyRest += Math.max(0, previousSpent - currentSpent);
      } else {
        paceBaseCurrentNoLimitSpent += currentSpent;
      }
    });

    const paceRest =
      elapsedDays > 0 && remainingDays > 0
        ? (paceBaseCurrentNoLimitSpent / elapsedDays) * remainingDays
        : 0;

    return {
      total: roundToTwo(limitedRest + historyRest + paceRest),
      limitedRest: roundToTwo(limitedRest),
      historyRest: roundToTwo(historyRest),
      paceRest: roundToTwo(paceRest),
      currentFlexibleSpent: roundToTwo(currentFlexibleSpent),
      currentFlexibleLimitedSpent: roundToTwo(currentFlexibleLimitedSpent),
      currentFlexibleNoLimitSpent: roundToTwo(currentFlexibleNoLimitSpent),
      previousFlexibleNoLimitSpent: roundToTwo(previousFlexibleNoLimitSpent),
    };
  }

  function getMonthStats(state, selectedMonth, isRequiredCategory) {
    const monthTransactions = getMonthTransactions(state, selectedMonth);
    const previousMonth = getPreviousMonthValue(selectedMonth);
    const previousMonthTransactions = getMonthTransactions(state, previousMonth);

    const calendarReserve = getCalendarReservedAmount(
      state,
      selectedMonth,
      monthTransactions
    );

    let income = 0;
    let requiredFactExpense = 0;
    let flexibleExpense = 0;

    monthTransactions.forEach((transaction) => {
      const amount = toNumber(transaction.amount);
      const type = String(transaction.type || "").toLowerCase();

      if (type === "income") {
        income += amount;
        return;
      }

      if (type !== "expense") return;

      const categoryId = getCategoryId(transaction);
      const required =
        typeof isRequiredCategory === "function"
          ? isRequiredCategory(categoryId)
          : false;

      if (required) {
        requiredFactExpense += amount;
      } else {
        flexibleExpense += amount;
      }
    });

    const flexibleForecast = buildFlexibleForecast({
      state,
      selectedMonth,
      currentMonthTransactions: monthTransactions,
      previousMonthTransactions,
      isRequiredCategory,
    });

    const totalFactExpense = requiredFactExpense + flexibleExpense;

    const forecastLeft =
      income -
      totalFactExpense -
      calendarReserve -
      flexibleForecast.total;

    return {
      income: roundToTwo(income),
      requiredFactExpense: roundToTwo(requiredFactExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
      totalFactExpense: roundToTwo(totalFactExpense),
      calendarReserve: roundToTwo(calendarReserve),
      flexibleForecastRest: roundToTwo(flexibleForecast.total),
      flexibleForecast,
      forecastLeft: roundToTwo(forecastLeft),
    };
  }

  function formatSignedMoney(value, formatMoney) {
    const amount = roundToTwo(value);

    if (amount > 0) return `+${formatMoney(amount)}`;
    if (amount < 0) return `−${formatMoney(Math.abs(amount))}`;

    return formatMoney(0);
  }

  function getForecastStatus(stats) {
    if (stats.income <= 0) {
      return {
        status: "warn",
        title: "Ждём доход",
        text: "После операции “Доход” прогноз станет полезнее.",
      };
    }

    if (stats.forecastLeft < 0) {
      return {
        status: "bad",
        title: "Не хватает",
        text: "Расходы и календарные платежи уже давят на месяц.",
      };
    }

    if (stats.forecastLeft <= stats.income * 0.05) {
      return {
        status: "warn",
        title: "Почти в ноль",
        text: "Месяц сходится, но запас тонкий.",
      };
    }

    return {
      status: "good",
      title: "Есть запас",
      text: "Месяц выглядит живым по текущим данным.",
    };
  }

  function getPaceStatus(stats, selectedMonth) {
    if (stats.income <= 0) {
      return {
        status: "muted",
        title: "Ждём доход",
        text: "После операции “Доход” появится темп месяца.",
      };
    }

    if (selectedMonth > getCurrentMonthValue()) {
      return {
        status: "muted",
        title: "Месяц впереди",
        text: "Темп появится, когда выбранный месяц начнётся.",
      };
    }

    const monthProgress = getMonthProgressPercent(selectedMonth);
    const occupiedPercent = getPercent(
      stats.totalFactExpense + stats.calendarReserve,
      stats.income
    );

    if (occupiedPercent > monthProgress + 12) {
      return {
        status: "bad",
        title: "Расходы впереди",
        text: `Прошло ${monthProgress}% месяца, занято ${occupiedPercent}% дохода.`,
      };
    }

    if (occupiedPercent > monthProgress + 5) {
      return {
        status: "warn",
        title: "На грани",
        text: `Прошло ${monthProgress}% месяца, занято ${occupiedPercent}% дохода.`,
      };
    }

    return {
      status: "good",
      title: "Темп нормальный",
      text: `Прошло ${monthProgress}% месяца, занято ${occupiedPercent}% дохода.`,
    };
  }

    function getForecastRingSegments(stats) {
    const flexibleForecast = stats.flexibleForecast || {};
    const irregularFlexible =
      toNumber(flexibleForecast.historyRest) + toNumber(flexibleForecast.paceRest);

    const occupied =
      stats.totalFactExpense +
      stats.calendarReserve +
      toNumber(flexibleForecast.limitedRest) +
      irregularFlexible;

    const free = Math.max(0, stats.income - occupied);
    const base = Math.max(stats.income, occupied, 1);

    return {
      occupied: roundToTwo(occupied),
      free: roundToTwo(free),
      deficit: roundToTwo(Math.max(0, occupied - stats.income)),
      base,
      items: [
        {
          key: "spent",
          label: "Уже потрачено",
          value: roundToTwo(stats.totalFactExpense),
          note: `Факт расходов месяца: обязательные ${roundToTwo(stats.requiredFactExpense)} ₽ + гибкие ${roundToTwo(stats.flexibleExpense)} ₽`,
          color: "rgba(239, 91, 79, 0.88)",
        },
        {
          key: "calendar",
          label: "Календарь",
          value: roundToTwo(stats.calendarReserve),
          note: "Неоплаченные календарные платежи",
          color: "rgba(242, 165, 26, 0.88)",
        },
        {
          key: "planned",
          label: "План гибких",
          value: roundToTwo(flexibleForecast.limitedRest || 0),
          note: "Остаток лимитов по гибким категориям",
          color: "rgba(47, 125, 246, 0.86)",
        },
        {
          key: "irregular",
          label: "Нерегулярные",
          value: roundToTwo(irregularFlexible),
          note: "Гибкие без лимита, ориентир по прошлому месяцу",
          color: "rgba(139, 92, 246, 0.82)",
        },
        {
          key: "free",
          label: "Свободно",
          value: roundToTwo(free),
          note: "Останется после прогноза",
          color: "rgba(21, 151, 107, 0.86)",
        },
      ].filter((item) => item.value > 0),
    };
  }

  function buildForecastRingGradient(items, base) {
    let cursor = 0;

    const parts = items.map((item) => {
      const size = Math.max(0, (item.value / base) * 100);
      const start = cursor;
      const end = Math.min(100, cursor + size);

      cursor = end;

      return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    });

    if (cursor < 100) {
      parts.push(`rgba(20, 24, 33, 0.075) ${cursor.toFixed(2)}% 100%`);
    }

    return `conic-gradient(${parts.join(", ")})`;
  }

  function renderForecastCard(stats, helpers) {
    const { formatMoney } = helpers;
    const forecast = getForecastStatus(stats);
    const ring = getForecastRingSegments(stats);
    const ringGradient = buildForecastRingGradient(ring.items, ring.base);
    const resultLabel = stats.forecastLeft < 0 ? "не хватает" : "останется";
    const occupiedPercent = stats.income > 0
      ? Math.round((ring.occupied / stats.income) * 100)
      : 0;

    const resultText = stats.forecastLeft < 0
      ? `Дохода не хватает на ${formatMoney(ring.deficit)}.`
      : `После всех учтённых расходов останется ${formatMoney(ring.free)}.`;

    return `
      <article class="analytics-forecast-ring-card analytics-forecast-ring-card--${forecast.status}">
        <div class="analytics-forecast-ring-card__head">
          <div>
            <h3>Прогноз месяца</h3>
            <p>${resultText}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${forecast.title}
          </div>
        </div>

        <div class="analytics-forecast-ring-layout">
          <div
            class="analytics-forecast-ring"
            style="--forecast-ring-gradient: ${ringGradient};"
            aria-hidden="true"
          >
            <div class="analytics-forecast-ring__center">
              <span>${resultLabel}</span>
              <strong>${formatSignedMoney(stats.forecastLeft, formatMoney)}</strong>
            </div>
          </div>

          <div class="analytics-forecast-ring-summary">
            <div>
              <span>Доход</span>
              <strong>${formatMoney(stats.income)}</strong>
            </div>

            <div>
              <span>Занято</span>
              <strong>${formatMoney(ring.occupied)}</strong>
            </div>

            <div>
              <span>Нагрузка</span>
              <strong>${occupiedPercent}%</strong>
            </div>
          </div>
        </div>

        <div class="analytics-forecast-ring-list">
          ${ring.items
            .map((item) => {
              return `
                <div class="analytics-forecast-ring-row analytics-forecast-ring-row--${item.key}">
                  <span class="analytics-forecast-ring-row__dot" style="--dot-color: ${item.color};"></span>

                  <div class="analytics-forecast-ring-row__body">
                    <div class="analytics-forecast-ring-row__top">
                      <span>${item.label}</span>
                      <strong>${formatMoney(item.value)}</strong>
                    </div>

                    <p>${item.note}</p>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>
    `;
  }

  function renderProgressCard(stats, selectedMonth) {
    const pace = getPaceStatus(stats, selectedMonth);
    const monthProgress = getMonthProgressPercent(selectedMonth);

    const occupiedPercent =
      stats.income > 0
        ? getPercent(stats.totalFactExpense + stats.calendarReserve, stats.income)
        : 0;

    const occupiedWidth = Math.min(100, Math.max(0, occupiedPercent));

    return `
      <section class="analytics-savings-card analytics-savings-pace-card analytics-savings-pace-card--${pace.status}">
        <div class="analytics-savings-card__head">
          <div>
            <h3>Темп месяца</h3>
            <p>${pace.text}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${pace.title}
          </div>
        </div>

        <div class="analytics-savings-pace-card__bars">
          <div class="analytics-savings-pace-line">
            <div class="analytics-savings-pace-line__top">
              <span>Прошло месяца</span>
              <strong>${monthProgress}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${monthProgress}%"></i>
            </div>
          </div>

          <div class="analytics-savings-pace-line analytics-savings-pace-line--spent">
            <div class="analytics-savings-pace-line__top">
              <span>Занято дохода</span>
              <strong>${occupiedPercent}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${occupiedWidth}%"></i>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAnalyticsSafeModels({
    state,
    selectedMonth,
    isRequiredCategory,
    formatMoney,
    escapeHtml,
  }) {
    const container = document.getElementById("analyticsSafeModelsList");

    if (!container) return;

    const helpers = {
      formatMoney: typeof formatMoney === "function" ? formatMoney : fallbackFormatMoney,
      escapeHtml: typeof escapeHtml === "function" ? escapeHtml : fallbackEscapeHtml,
    };

    const monthValue = selectedMonth || getCurrentMonthValue();
    const stats = getMonthStats(state, monthValue, isRequiredCategory);

    container.innerHTML = `
      <div class="analytics-savings-dashboard">
        ${renderForecastCard(stats, helpers)}
        ${renderProgressCard(stats, monthValue)}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();
