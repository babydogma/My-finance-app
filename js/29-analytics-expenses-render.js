(() => {
  function createAnalyticsExpensesRender({
    state,
    UNCATEGORIZED_ID,
    roundToTwo,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    getCategoryName,
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
    let previousRingItems = null;
let previousRingTotal = 0;
let previousShownTotal = null;
let previousTopPercent = 0;

let ringAnimationFrameId = null;
let moneyAnimationFrameId = null;
let percentAnimationFrameId = null;

    const ANALYTICS_EXPENSE_COLORS = [
  "#4DA3FF", // bright blue
  "#FF4D5E", // coral red
  "#8DFF4A", // acid green
  "#FFD45A", // warm yellow
  "#B26BFF", // violet
  "#35E6D3", // turquoise
  "#FF8A3D", // orange
  "#F45BBD", // pink
  "#E9F2FF", // ice white
  "#5C7CFF", // electric indigo
  "#B8FF3D", // lime
  "#FF6B9A", // rose
  "#42C8FF", // sky cyan
  "#FFB13D", // amber
  "#D66BFF", // purple neon
  "#52F28A", // mint green
  "#FF3D9A", // neon magenta
  "#7DE3FF", // light aqua
  "#FFE66D", // soft gold
  "#A78BFA", // lavender
  "#34D399", // emerald
  "#FB7185", // salmon
  "#93C5FD", // pale blue
  "#FDE68A", // pale yellow
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

function buildAnalyticsRingGradient(items, total) {
  const emptyColor = "rgba(255,255,255,0.09)";

  if (!total || total <= 0 || !items.length) {
    return `conic-gradient(${emptyColor} 0deg 360deg)`;
  }

  let cursor = 0;

  const gradientParts = items
    .filter((item) => item.amount > 0.01)
    .map((item) => {
      const percent = Math.max(0, Math.min(100, (item.amount / total) * 100));
      const start = cursor;
      const end = Math.min(100, cursor + percent);

      cursor = end;

      return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
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

    function getAnalyticsExpenseFilteredTransactions() {
      const expenseTransactions = getAnalyticsExpenseBaseTransactions();

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

  if (!shouldAnimate || !previousRingItems) {
    const gradient = buildAnalyticsRingGradient(items, total);

    ringEl.style.background = gradient;
    ringEl.style.setProperty("--analytics-ring-gradient", gradient);

    if (centerValueEl) {
      centerValueEl.textContent = `${nextTopPercent}%`;
    }
    if (centerLabelEl) {
  centerLabelEl.textContent = nextCenterLabel;
}

    previousRingItems = items.map((item) => ({ ...item }));
    previousRingTotal = total;
    previousTopPercent = nextTopPercent;

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

  const profile = getRingTransitionProfile(fromItems, toItems, fromTotal, toTotal);
const duration = profile.duration;
const startTime = performance.now();

  animatePercentValue(centerValueEl, fromTopPercent, nextTopPercent);

  function tick(now) {
    const rawProgress = Math.min((now - startTime) / duration, 1);
    const mixedItems = mergeRingItemsForAnimation(fromItems, toItems, rawProgress, profile);
const mixedItemsTotal = getRingItemsTotal(mixedItems);
const mixedTotal = getAnimatedRingTotal(
  fromTotal,
  toTotal,
  mixedItemsTotal,
  rawProgress,
  profile
);

const gradient = buildAnalyticsRingGradient(mixedItems, mixedTotal);

    ringEl.style.background = gradient;
    ringEl.style.setProperty("--analytics-ring-gradient", gradient);

    if (rawProgress < 1) {
      ringAnimationFrameId = requestAnimationFrame(tick);
      return;
    }

    const finalGradient = buildAnalyticsRingGradient(toItems, toTotal);

    ringEl.style.background = finalGradient;
    ringEl.style.setProperty("--analytics-ring-gradient", finalGradient);

    if (centerValueEl) {
      centerValueEl.textContent = `${nextTopPercent}%`;
    }
    
    if (centerLabelEl) {
  centerLabelEl.textContent = nextCenterLabel;
}
    previousRingItems = toItems;
    previousRingTotal = toTotal;
    previousTopPercent = nextTopPercent;
    ringAnimationFrameId = null;
  }

  ringAnimationFrameId = requestAnimationFrame(tick);
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
      const items = [];

      for (let offset = -12; offset <= 6; offset += 1) {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + offset,
          1
        );

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
      const baseExpenseTransactions = getAnalyticsExpenseBaseTransactions();
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
