// ===== js/19-analytics-month-wheel.js =====
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

// ===== js/20-analytics-filters.js =====
(() => {
  function createAnalyticsFilters({
    analyticsFiltersModal,
    openAnimatedModal,
    closeAnimatedModal,
    closeAnalyticsMonthWheel,

    getFilterPeriod,
    getSelectedMonth,
    getRangeStart,
    getRangeEnd,

    formatMonthLabel,
    formatDateRangeLabel,
  }) {
    function openAnalyticsFiltersModal() {
      openAnimatedModal(analyticsFiltersModal);
      document.body.style.overflow = "hidden";
    }

    function closeAnalyticsFiltersModal() {
      closeAnimatedModal(analyticsFiltersModal);
      closeAnalyticsMonthWheel();
    }

    function getAnalyticsPeriodLabel() {
      const analyticsFilterPeriod = getFilterPeriod();

      if (analyticsFilterPeriod === "month") {
        return formatMonthLabel(getSelectedMonth());
      }

      if (analyticsFilterPeriod === "today") {
        return "сегодня";
      }

      if (analyticsFilterPeriod === "7") {
        return "за 7 дней";
      }

      if (analyticsFilterPeriod === "range") {
        return formatDateRangeLabel(getRangeStart(), getRangeEnd());
      }

      return "";
    }

    return {
      openAnalyticsFiltersModal,
      closeAnalyticsFiltersModal,
      getAnalyticsPeriodLabel,
    };
  }

  window.FinanceAppAnalyticsFilters = {
    create: createAnalyticsFilters,
  };
})();

// ===== js/21-operations-view.js =====
(() => {
  function createOperationsView({
    state,
    operationsTransactionsList,

    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,

    setActiveNav,
    createTransactionCard,
  }) {
    function renderOperationsView() {
      if (!operationsTransactionsList) return;

      const items = [...state.transactions].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      operationsTransactionsList.innerHTML = "";

      if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Операций пока нет</h3>
            <p class="list-subtitle">История появится после добавления операций</p>
          </div>
        `;
        operationsTransactionsList.appendChild(empty);
        return;
      }

      items.forEach((item) => {
        operationsTransactionsList.appendChild(createTransactionCard(item));
      });
    }

    function showOperationsView() {
      document.querySelector(".app")?.classList.add("app--analytics");

      mainView.classList.add("hidden");
      categoriesManagerView.classList.add("hidden");
      analyticsView.classList.add("hidden");
      operationsView.classList.remove("hidden");

      setActiveNav("operations");
      renderOperationsView();
    }

    return {
      renderOperationsView,
      showOperationsView,
    };
  }

  window.FinanceAppOperationsView = {
    create: createOperationsView,
  };
})();

// ===== js/22-navigation-view.js =====
(() => {
  function createNavigationView({
    navWalletBtn,
    navAnalyticsBtn,
    navOperationsBtn,

    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,

    closeAnalyticsMonthWheel,
    renderAnalytics,
  }) {
    function setActiveNav(next) {
      navWalletBtn?.classList.toggle("is-active", next === "wallet");
      navAnalyticsBtn?.classList.toggle("is-active", next === "analytics");
      navOperationsBtn?.classList.toggle("is-active", next === "operations");
    }

    function showWalletView() {
      document.querySelector(".app")?.classList.remove("app--analytics");

      mainView?.classList.remove("hidden");
      categoriesManagerView?.classList.add("hidden");
      analyticsView?.classList.add("hidden");
      operationsView?.classList.add("hidden");

      closeAnalyticsMonthWheel();
      setActiveNav("wallet");
    }

    function openCategoriesManager() {
      document.querySelector(".app")?.classList.remove("app--analytics");

      mainView?.classList.add("hidden");
      categoriesManagerView?.classList.remove("hidden");
      analyticsView?.classList.add("hidden");
      operationsView?.classList.add("hidden");

      closeAnalyticsMonthWheel();
      setActiveNav("wallet");
    }

    function closeCategoriesManager() {
      showWalletView();
    }

    function showAnalyticsView() {
      document.querySelector(".app")?.classList.add("app--analytics");

      mainView?.classList.add("hidden");
      categoriesManagerView?.classList.add("hidden");
      operationsView?.classList.add("hidden");
      analyticsView?.classList.remove("hidden");

      setActiveNav("analytics");
      renderAnalytics();
    }

    return {
      setActiveNav,
      showWalletView,
      openCategoriesManager,
      closeCategoriesManager,
      showAnalyticsView,
    };
  }

  window.FinanceAppNavigationView = {
    create: createNavigationView,
  };
})();

// ===== js/23-form-selects.js =====
(() => {
  function createFormSelects({
    state,
    UNCATEGORIZED_ID,
    categorySelect,
  }) {
    function ensureUncategorizedCategory() {
      const exists = state.categories.some((item) => item.id === UNCATEGORIZED_ID);

      if (!exists) {
        state.categories.unshift({
          id: UNCATEGORIZED_ID,
          name: "Без категории",
          icon: "📦",
          locked: true,
          is_required: false,
          sort_order: 1,
        });
      }
    }

    function fillExpenseCategorySelect(selectedId = "") {
      if (!categorySelect) return;

      categorySelect.innerHTML = `<option value="">Выбери категорию</option>`;

      state.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;

        if (selectedId && selectedId === category.id) {
          option.selected = true;
        }

        categorySelect.appendChild(option);
      });
    }

    function fillAccountSelect(selectEl, placeholder, selectedValue = "", options = {}) {
      if (!selectEl) return;

      const {
        includeVault = true,
        includeProtected = true,
        excludeId = "",
      } = options;

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      state.accounts.forEach((account) => {
        if (!includeVault && account.account_kind === "vault_pool") return;
        if (!includeProtected && account.is_protected) return;
        if (excludeId && account.id === excludeId) return;

        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;

        if (selectedValue && selectedValue === account.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    return {
      ensureUncategorizedCategory,
      fillExpenseCategorySelect,
      fillAccountSelect,
    };
  }

  window.FinanceAppFormSelects = {
    create: createFormSelects,
  };
})();

// ===== js/24-transaction-card.js =====
(() => {
  function createTransactionCardModule({
    UNCATEGORIZED_ID,
    getAccountNameById,
    isVaultAccountId,
    getSafeBucketName,
    getCategoryName,
    formatMoney,
    formatDateShort,
    escapeHtml,
    openEditModal,
  }) {
    function looksLikeBrokenEncoding(value) {
      const text = String(value || "");

      return (
        /[\u0110\u00d0\u00d1\u0143\ufffd]/.test(text) ||
        text.includes("\u00e2") ||
        text.includes("\u00f0") ||
        text.includes("\u00f1")
      );
    }

    function getSafeText(value, fallback = "") {
      const text = String(value || "").trim();

      if (!text) return fallback;

      return looksLikeBrokenEncoding(text) ? fallback : text;
    }

    function getTransactionTitle(transaction) {
      const rawTitle = String(transaction?.title || "").trim();

      if (!rawTitle) {
        return "Операция";
      }

      /*
        Старые операции процентов уже могли попасть в Supabase
        с битой кодировкой. Базу тут не трогаем, но выводим нормально.
      */
      if (looksLikeBrokenEncoding(rawTitle)) {
        if (
          transaction.type === "income" &&
          isVaultAccountId(transaction.account_id)
        ) {
          return "Проценты по накоплению";
        }

        return "Операция";
      }

      return rawTitle;
    }

    function getSafeBucketLabel(bucketId) {
      return getSafeText(getSafeBucketName(bucketId), "Накопление");
    }

    function getSafeAccountLabel(accountId, legacyName = "") {
      return getSafeText(
        getAccountNameById(accountId) || legacyName,
        "Счёт"
      );
    }

    function getTransactionIconSvg(transaction) {
      if (transaction.type === "income") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 7 7 17" />
            <path d="M7 9v8h8" />
          </svg>
        `;
      }

      if (transaction.type === "transfer") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M10 7h7v7" />
          </svg>
        `;
      }

      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M9 7h8v8" />
        </svg>
      `;
    }

    function getTransactionTypeClass(transaction) {
      if (transaction.type === "income") return "transaction-card--income";
      if (transaction.type === "transfer") return "transaction-card--transfer";
      return "transaction-card--expense";
    }

    function createTransactionCard(transaction) {
      const card = document.createElement("div");

      card.className =
        `list-card list-card--clickable transaction-card ${getTransactionTypeClass(transaction)}`;
      card.dataset.transactionId = transaction.id;

      let subtitle = "";
      let signedAmount = "";
      let valueClass = "list-value";

      if (transaction.type === "transfer") {
        const fromAccountName = getSafeAccountLabel(
          transaction.from_account_id,
          transaction.from_account
        );

        const toAccountName = getSafeAccountLabel(
          transaction.to_account_id,
          transaction.to_account
        );

        const fromLabel = isVaultAccountId(transaction.from_account_id)
          ? `${fromAccountName} • ${getSafeBucketLabel(transaction.from_safe_bucket_id)}`
          : fromAccountName;

        const toLabel = isVaultAccountId(transaction.to_account_id)
          ? `${toAccountName} • ${getSafeBucketLabel(transaction.to_safe_bucket_id)}`
          : toAccountName;

        subtitle = `${fromLabel} → ${toLabel}`;
        signedAmount = formatMoney(transaction.amount);
        valueClass = "list-value list-value--transfer";
      } else if (transaction.type === "income") {
        const incomeAccountName = getSafeAccountLabel(
          transaction.account_id,
          transaction.account
        );

        const incomeBucketLabel =
          isVaultAccountId(transaction.account_id) && transaction.to_safe_bucket_id
            ? ` • ${getSafeBucketLabel(transaction.to_safe_bucket_id)}`
            : "";

        subtitle = `${incomeAccountName}${incomeBucketLabel} • доход`;
        signedAmount = `+${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--green";
      } else {
        const expenseAccountName = getSafeAccountLabel(
          transaction.account_id,
          transaction.account
        );

        const categoryName = getSafeText(
          getCategoryName(transaction.category_id || UNCATEGORIZED_ID),
          "Категория"
        );

        subtitle = `${categoryName} • ${expenseAccountName}`;
        signedAmount = `−${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--red";
      }

      const shortDate = formatDateShort(transaction.created_at);
      const timeLabel = transaction.time_label || "";
      const caption = `${shortDate}${shortDate && timeLabel ? " • " : ""}${timeLabel}`;
      const title = getTransactionTitle(transaction);

      card.innerHTML = `
        <div class="transaction-icon" aria-hidden="true">
          ${getTransactionIconSvg(transaction)}
        </div>

        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(title)}</h3>
          </div>
          <p class="list-subtitle">${escapeHtml(subtitle)}</p>
        </div>

        <div class="list-right">
          <p class="${valueClass}">${escapeHtml(signedAmount)}</p>
          <div class="list-caption">${escapeHtml(caption)}</div>
        </div>
      `;

      card.addEventListener("click", () => openEditModal(transaction.id));

      return card;
    }

    return {
      createTransactionCard,
    };
  }

  window.FinanceAppTransactionCard = {
    create: createTransactionCardModule,
  };
})();

// ===== js/25-transaction-list-animation.js =====
(() => {
  function captureTransactionRects(container, excludeTransactionId = "") {
    const rects = new Map();

    if (!container) return rects;

    const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

    cards.forEach((card) => {
      if (excludeTransactionId && card.dataset.transactionId === excludeTransactionId) {
        return;
      }

      rects.set(card.dataset.transactionId, card.getBoundingClientRect());
    });

    return rects;
  }

  function playTransactionListFLIP(container, beforeRects) {
    if (!container || !beforeRects?.size) return;

    const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

    cards.forEach((card) => {
      const id = card.dataset.transactionId;
      const prevRect = beforeRects.get(id);

      if (!prevRect) return;

      const nextRect = card.getBoundingClientRect();
      const deltaY = prevRect.top - nextRect.top;

      if (Math.abs(deltaY) < 0.5) return;

      card.classList.remove("list-card--reflow");
      card.style.transition = "none";
      card.style.transform = `translate3d(0, ${deltaY}px, 0)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add("list-card--reflow");
          card.style.transition = "";
          card.style.transform = "";

          const cleanup = () => {
            card.classList.remove("list-card--reflow");
            card.removeEventListener("transitionend", cleanup);
          };

          card.addEventListener("transitionend", cleanup, { once: true });
        });
      });
    });
  }

  function animateTransactionDelete(transactionId) {
    return new Promise((resolve) => {
      if (!transactionId) {
        resolve();
        return;
      }

      const cards = [
        ...document.querySelectorAll(`[data-transaction-id="${transactionId}"]`),
      ];

      if (!cards.length) {
        resolve();
        return;
      }

      const containers = new Map();

      cards.forEach((card) => {
        const container = card.parentElement;
        if (!container) return;

        if (!containers.has(container)) {
          containers.set(container, captureTransactionRects(container, transactionId));
        }

        card.classList.add("list-card--delete-telegram");
      });

      window.setTimeout(() => {
        cards.forEach((card) => {
          card.remove();
        });

        containers.forEach((beforeRects, container) => {
          playTransactionListFLIP(container, beforeRects);
        });

        window.setTimeout(() => {
          resolve();
        }, 480);
      }, 520);
    });
  }

  window.FinanceAppTransactionListAnimation = {
    captureTransactionRects,
    playTransactionListFLIP,
    animateTransactionDelete,
  };
})();

// ===== js/26-transactions-render.js =====
(() => {
  function createTransactionsRender({
    state,
    transactionsListEl,
    sortTransactionsByLatest,
    createTransactionCard,
    getJustCreatedTransactionId,
    setJustCreatedTransactionId,
  }) {
    function renderTransactions() {
      if (!transactionsListEl) return;

      transactionsListEl.innerHTML = "";

      const latestTransactions = sortTransactionsByLatest(state.transactions).slice(0, 5);

      if (latestTransactions.length === 0) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Операций пока нет</h3>
            <p class="list-subtitle">Добавь первую операцию через кнопки сверху</p>
          </div>
        `;

        transactionsListEl.appendChild(empty);
        return;
      }

      let freshCard = null;
      const justCreatedTransactionId = getJustCreatedTransactionId();

      latestTransactions.forEach((transaction) => {
        const card = createTransactionCard(transaction);

        if (
          !freshCard &&
          justCreatedTransactionId &&
          transaction.id === justCreatedTransactionId
        ) {
          card.classList.add("list-card--fresh-sticker");
          freshCard = card;
        }

        transactionsListEl.appendChild(card);
      });

      if (freshCard) {
        window.setTimeout(() => {
          freshCard?.classList.remove("list-card--fresh-sticker");
          setJustCreatedTransactionId(null);
        }, 2200);
      } else if (justCreatedTransactionId) {
        setJustCreatedTransactionId(null);
      }
    }

    return {
      renderTransactions,
    };
  }

  window.FinanceAppTransactionsRender = {
    create: createTransactionsRender,
  };
})();
