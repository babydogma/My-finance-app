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
  "#D85C52", // soft coral
  "#4FA864", // calm green
  "#5B8BE8", // clean blue
  "#F2B84B", // soft amber
  "#8A6FD6", // violet
  "#3FA89F", // teal
  "#D9833F", // warm orange
  "#C76C95", // dusty pink
  "#6F7A8C", // slate gray
  "#86B75F", // soft olive
  "#5FA7C8", // muted cyan
  "#A979C9", // lavender
  "#4E9B82", // sea green
  "#D06E68", // clay red
  "#6D8FC7", // steel blue
  "#B76FA4", // muted magenta
  "#7B8FA6", // blue gray
  "#67A889", // eucalyptus
  "#C9905A", // soft caramel
  "#8B7FD1", // soft indigo
  "#5C9CA8", // deep aqua
  "#A86E7E", // dusty rose
  "#7DAA78", // muted green
  "#B79A63", // clean muted gold
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
      const categoryIds = state.categories.map((category) => category.id);
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

  return Math.round((topItem.amount / total) * 100);
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
    format: (value) => `${Math.round(value)}%`,
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
      centerValueEl.textContent = `${nextPercent}%`;
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
        const percent = total > 0 ? Math.round((item.amount / total) * 100) : 0;

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
                  style="width: ${Math.max(2, percent)}%; background: ${item.color}; color: ${item.color};"
                ></div>
              </div>

              <div class="analytics-expense-category-row__percent">${percent}%</div>
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

    return {
      getAnalyticsExpensesPeriodNote,
      getAnalyticsExpenseColor,
      getAnalyticsExpenseItems,
      renderAnalyticsExpensesByCategory,
      resetAnalyticsExpenseCategoryFilter,
    };
  }

  window.FinanceAppAnalyticsExpensesRender = {
    create: createAnalyticsExpensesRender,
  };
})();
