(() => {
  function normalizeFreeMoneyText(rawText) {
    return String(rawText || "")
      .replace(/^Свободно\s*:\s*/i, "")
      .trim();
  }

  function syncFreeMoneyValue() {
    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (!valueEl) return;

    const normalizedValue = normalizeFreeMoneyText(valueEl.textContent);

    if (normalizedValue && normalizedValue !== valueEl.textContent.trim()) {
      valueEl.textContent = normalizedValue;
    }
  }

  function roundToTwo(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function getDateOnlyString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

    if (!Number.isNaN(parsedDate.getTime())) {
      return getDateOnlyString(parsedDate);
    }

    return "";
  }

  function getCurrentMonthKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getPreviousMonthKey() {
    const now = new Date();
    const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const year = previousMonthDate.getFullYear();
    const month = String(previousMonthDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getComparableDayForMonth(monthKey) {
    const now = new Date();
    const currentDay = now.getDate();
    const [year, month] = String(monthKey).split("-").map(Number);

    if (!year || !month) return currentDay;

    const lastDayOfTargetMonth = new Date(year, month, 0).getDate();

    return Math.min(currentDay, lastDayOfTargetMonth);
  }

  function getMonthToDateTotal(type, monthKey) {
    const state = window.FinanceAppState?.state;

    if (!state || !Array.isArray(state.transactions)) return 0;

    const dayLimit = getComparableDayForMonth(monthKey);

    return roundToTwo(
      state.transactions.reduce((sum, transaction) => {
        if (transaction.type !== type) return sum;

        const dateKey = getTransactionDateKey(transaction);

        if (!dateKey) return sum;
        if (dateKey.slice(0, 7) !== monthKey) return sum;

        const day = Number(dateKey.slice(8, 10)) || 0;

        if (day < 1 || day > dayLimit) return sum;

        return sum + (Number(transaction.amount) || 0);
      }, 0)
    );
  }

  function getDeltaPercent(currentValue, previousValue) {
    const current = Number(currentValue) || 0;
    const previous = Number(previousValue) || 0;

    if (previous === 0 && current === 0) return 0;
    if (previous === 0 && current > 0) return 100;

    return ((current - previous) / previous) * 100;
  }

  function formatDeltaValue(deltaPercent) {
    const value = Math.abs(deltaPercent);

    const formatted = value.toLocaleString("ru-RU", {
      minimumFractionDigits: value % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 1,
    });

    if (deltaPercent > 0) return `↑ ${formatted}%`;
    if (deltaPercent < 0) return `↓ ${formatted}%`;

    return "0%";
  }

  function applyDeltaVisual(el, deltaPercent, type) {
    if (!el) return;

    el.classList.remove(
      "hard-month-stat__delta--neutral",
      "hard-month-stat__delta--good",
      "hard-month-stat__delta--bad"
    );

    if (deltaPercent === 0) {
      el.classList.add("hard-month-stat__delta--neutral");
      el.style.color = "";
      return;
    }

    const isGood =
      type === "income"
        ? deltaPercent > 0
        : deltaPercent < 0;

    el.classList.add(
      isGood
        ? "hard-month-stat__delta--good"
        : "hard-month-stat__delta--bad"
    );

    el.style.color = isGood
      ? "var(--hard-green, #15996c)"
      : "var(--hard-red, #f24949)";
  }

  function setTextIfChanged(el, nextText) {
    if (!el) return;

    if (el.textContent.trim() !== nextText) {
      el.textContent = nextText;
    }
  }

  function syncHardMonthDeltasToDate() {
    const incomeDeltaEl = document.getElementById("hardMonthIncomeDelta");
    const expenseDeltaEl = document.getElementById("hardMonthExpenseDelta");

    if (!incomeDeltaEl && !expenseDeltaEl) return;

    const currentMonth = getCurrentMonthKey();
    const previousMonth = getPreviousMonthKey();

    const currentIncome = getMonthToDateTotal("income", currentMonth);
    const previousIncome = getMonthToDateTotal("income", previousMonth);

    const currentExpense = getMonthToDateTotal("expense", currentMonth);
    const previousExpense = getMonthToDateTotal("expense", previousMonth);

    const incomeDelta = getDeltaPercent(currentIncome, previousIncome);
    const expenseDelta = getDeltaPercent(currentExpense, previousExpense);

    if (incomeDeltaEl) {
      setTextIfChanged(incomeDeltaEl, formatDeltaValue(incomeDelta));
      applyDeltaVisual(incomeDeltaEl, incomeDelta, "income");
    }

    if (expenseDeltaEl) {
      setTextIfChanged(expenseDeltaEl, formatDeltaValue(expenseDelta));
      applyDeltaVisual(expenseDeltaEl, expenseDelta, "expense");
    }
  }
  
  function openHardModal(modal) {
  if (!modal) return;

  modal.classList.remove("hidden", "is-closing");

  requestAnimationFrame(() => {
    modal.classList.add("is-visible");
  });
}

function closeHardModal(modal) {
  if (!modal) return;

  modal.classList.remove("is-visible");
  modal.classList.add("is-closing");

  window.setTimeout(() => {
    modal.classList.remove("is-closing");
    modal.classList.add("hidden");
  }, 260);
}

function getRenderedAccountCards() {
  return Array.from(
    document.querySelectorAll("#accountsList .list-card")
  );
}

function getAccountCardText(card, selector, fallback = "") {
  return card.querySelector(selector)?.textContent?.trim() || fallback;
}

function renderMoneyAccountsModalList() {
  const list = document.getElementById("moneyAccountsList");

  if (!list) return;

  const cards = getRenderedAccountCards();

  if (!cards.length) {
    list.innerHTML = `
      <div class="money-accounts-empty">
        Счета ещё не загрузились
      </div>
    `;
    return;
  }

  list.innerHTML = "";

  cards.forEach((card, index) => {
    const title = getAccountCardText(card, ".list-title", "Счёт");
    const subtitle = getAccountCardText(card, ".list-subtitle", "");
    const value = getAccountCardText(card, ".list-value", "0 ₽");

    const row = document.createElement("button");
    row.type = "button";
    row.className = "money-accounts-row";
    row.innerHTML = `
      <span class="money-accounts-row__name">
        <strong>${title}</strong>
        ${subtitle ? `<span>${subtitle}</span>` : ""}
      </span>

      <strong class="money-accounts-row__value">${value}</strong>
    `;

    row.addEventListener("click", () => {
      const modal = document.getElementById("moneyAccountsModal");

      closeHardModal(modal);

      window.setTimeout(() => {
        const freshCards = getRenderedAccountCards();
        const targetCard = freshCards[index];

        if (targetCard) {
          targetCard.click();
        }
      }, 180);
    });

    list.appendChild(row);
  });
}

function initMoneyAccountsModal() {
  const hero = document.getElementById("walletGameHero");
  const modal = document.getElementById("moneyAccountsModal");
  const closeBtn = document.getElementById("closeMoneyAccountsModalBtn");
  const addBtn = document.getElementById("moneyAccountsAddBtn");
  const accountsList = document.getElementById("accountsList");
  const summaryAccountsBtn = document.getElementById("hardScrollAccountsBtn");

  if (!hero || !modal) return;

  hero.setAttribute("role", "button");
  hero.setAttribute("tabindex", "0");
  hero.setAttribute("aria-label", "Открыть все деньги");

  function openMoneyModal() {
    renderMoneyAccountsModalList();
    openHardModal(modal);
  }

  hero.addEventListener("click", (event) => {
    if (event.target.closest("#openMonthlyReportBtn")) return;

    openMoneyModal();
  });

  hero.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    openMoneyModal();
  });

  summaryAccountsBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    openMoneyModal();
  });

  closeBtn?.addEventListener("click", () => {
    closeHardModal(modal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeHardModal(modal);
    }
  });

  addBtn?.addEventListener("click", () => {
    closeHardModal(modal);

    window.setTimeout(() => {
      document.getElementById("openCreateAccountModalBtn")?.click();
    }, 180);
  });

  if (accountsList) {
    const observer = new MutationObserver(() => {
      if (!modal.classList.contains("hidden")) {
        renderMoneyAccountsModalList();
      }
    });

    observer.observe(accountsList, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}

  document.addEventListener("DOMContentLoaded", () => {
    syncFreeMoneyValue();
    syncHardMonthDeltasToDate();
    initMoneyAccountsModal();

    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (valueEl) {
      const freeMoneyObserver = new MutationObserver(() => {
        syncFreeMoneyValue();
      });

      freeMoneyObserver.observe(valueEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    /*
      ВАЖНО:
      Наблюдаем только за исходными суммами дохода/расхода.
      НЕ наблюдаем за hardMonthIncomeDelta / hardMonthExpenseDelta,
      потому что мы сами меняем их текст.
    */
    const sourceNodes = [
      document.getElementById("hardMonthIncomeValue"),
      document.getElementById("hardMonthExpenseValue"),
    ].filter(Boolean);

    const hardMonthObserver = new MutationObserver(() => {
      syncHardMonthDeltasToDate();
    });

    sourceNodes.forEach((node) => {
      hardMonthObserver.observe(node, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });

    window.setTimeout(syncHardMonthDeltasToDate, 300);
    window.setTimeout(syncHardMonthDeltasToDate, 900);
  });
})();