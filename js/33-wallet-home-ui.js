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

  function getTransactionDateKey(item) {
    const rawValue =
      item.date ||
      item.transaction_date ||
      item.operation_date ||
      item.created_date ||
      item.created_at ||
      item.createdAt ||
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

    if (deltaPercent > 0) {
      return `↑ ${formatted}%`;
    }

    if (deltaPercent < 0) {
      return `↓ ${formatted}%`;
    }

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
      incomeDeltaEl.textContent = formatDeltaValue(incomeDelta);
      applyDeltaVisual(incomeDeltaEl, incomeDelta, "income");
    }

    if (expenseDeltaEl) {
      expenseDeltaEl.textContent = formatDeltaValue(expenseDelta);
      applyDeltaVisual(expenseDeltaEl, expenseDelta, "expense");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncFreeMoneyValue();
    syncHardMonthDeltasToDate();

    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (valueEl) {
      const observer = new MutationObserver(() => {
        syncFreeMoneyValue();
      });

      observer.observe(valueEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    const hardMonthObservedNodes = [
      document.getElementById("hardMonthIncomeValue"),
      document.getElementById("hardMonthExpenseValue"),
      document.getElementById("hardMonthIncomeDelta"),
      document.getElementById("hardMonthExpenseDelta"),
    ].filter(Boolean);

    const hardMonthObserver = new MutationObserver(() => {
      syncHardMonthDeltasToDate();
    });

    hardMonthObservedNodes.forEach((node) => {
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