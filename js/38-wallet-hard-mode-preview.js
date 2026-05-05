(() => {
  let syncTimer = null;

  function getTextById(id, fallback = "0 ₽") {
    const element = document.getElementById(id);
    const text = element?.textContent?.trim();
    return text || fallback;
  }

  function getTextBySelector(selector, fallback = "0 ₽") {
    const element = document.querySelector(selector);
    const text = element?.textContent?.trim();
    return text || fallback;
  }

  function setTextById(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = value;
  }

  function cleanMoneyText(value, fallback = "0 ₽") {
  const text = String(value || "")
    .replace(/^Свободно\s*:\s*/i, "")
    .replace(/^Баланс\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return formatMoneyText(text || fallback);
}

function formatMoneyText(value) {
  const source = String(value || "").trim();

  if (!source) return "0 ₽";

  const numeric = source
    .replace(/\s/g, "")
    .replace("₽", "")
    .replace(",", ".")
    .trim();

  const amount = Number(numeric);

  if (!Number.isFinite(amount)) return source;

  const hasDecimals = Math.abs(amount % 1) > 0.0001;

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(amount) + " ₽";
}

  function getMoneyTextById(id, fallback = "0 ₽") {
    return cleanMoneyText(getTextById(id, fallback), fallback);
  }

  function getMoneyTextBySelector(selector, fallback = "0 ₽") {
    return cleanMoneyText(getTextBySelector(selector, fallback), fallback);
  }

  function extractExpectedIncomeDate(text) {
    const source = String(text || "");
    const match = source.match(/(\d{1,2}\s+[а-яё]+)/i);
    return match?.[1] || "";
  }

  function syncExpectedIncomeCard() {
    const label = document.getElementById("walletExpectedIncomeLabel");
    const value = document.getElementById("walletExpectedIncomeValue");
    const button = document.getElementById("openExpectedIncomeModalBtn");

    if (!label || !value || !button) return;

    const valueText = value.textContent.trim();
    const hasExpectedIncome =
      valueText &&
      !valueText.toLowerCase().includes("добавь") &&
      valueText !== "0 ₽";

    if (!hasExpectedIncome) {
      label.textContent = "Будущие деньги не учтены";
      button.textContent = "Жду деньги";
      return;
    }

    label.textContent = "Ждёшь деньги";

    const dateLabel = extractExpectedIncomeDate(valueText);
    if (dateLabel) {
      button.textContent = dateLabel;
    }
  }

  function syncHardSummary() {
    setTextById(
      "hardSummaryFreeValue",
      getMoneyTextById("balanceFreeMoneyValue", "0 ₽")
    );

    setTextById(
      "hardSummaryBalanceValue",
      getMoneyTextBySelector(".hard-source-metrics .balance-amount", "0 ₽")
    );

    setTextById(
      "hardSummaryCalendarValue",
      getMoneyTextById("walletCalendarPressureValue", "0 ₽")
    );

    setTextById(
      "hardSummaryLimitsValue",
      getMoneyTextById("walletLimitsPressureValue", "0 ₽")
    );
  }

  function syncHardPressure() {
    setTextById(
      "hardPressureMandatoryValue",
      getMoneyTextById("analyticsPendingMandatoryValue", "0 ₽")
    );

    setTextById(
      "hardPressureLimitsValue",
      getMoneyTextById(
        "analyticsRemainingBudgetsValue",
        getMoneyTextById("walletLimitsPressureValue", "0 ₽")
      )
    );

    setTextById(
      "hardPressureFreeValue",
      getMoneyTextById("balanceFreeMoneyValue", "0 ₽")
    );

    setTextById(
      "hardPressureControlValue",
      getTextById("walletMandatoryControlValue", "0%")
    );
  }

  function makeNoBreakRate(value) {
  const span = document.createElement("span");

  span.style.whiteSpace = "nowrap";
  span.textContent = `${value}/день`;

  return span;
}

function syncHeroHint() {
  const hint = document.getElementById("walletGameHint");
  if (!hint) return;

  const currentHint = hint.textContent.trim();

  const isGeneratedHint =
    currentHint.startsWith("До 13 мая можно") ||
    currentHint.startsWith("До ближайших денег можно");

  const isInitialHint = currentHint.toLowerCase().includes("сейчас проверяю");

  if (currentHint && !isGeneratedHint && !isInitialHint) return;

  const todayCan = getMoneyTextById("walletTodayCanValue", "0 ₽");
  const afterIncome = getMoneyTextById("walletLimitsPressureValue", "0 ₽");

  const br = document.createElement("br");

  hint.replaceChildren(
    document.createTextNode("До 13 мая можно "),
    makeNoBreakRate(todayCan),
    document.createTextNode("."),
    br,
    document.createTextNode("После ожидаемых денег до конца месяца — "),
    makeNoBreakRate(afterIncome),
    document.createTextNode(".")
  );
}

  function syncAccountsCount() {
    const note = document.getElementById("accountsTotal");
    const list = document.getElementById("accountsList");

    if (!note || !list) return;

    const count = Array.from(list.querySelectorAll(".list-card"))
      .filter((card) => !card.classList.contains("empty-state"))
      .length;

    if (count <= 0) {
      note.textContent = "Всего 0 счетов";
      return;
    }

    const lastTwo = count % 100;
    const lastOne = count % 10;

    let word = "счетов";
    if (lastTwo < 11 || lastTwo > 14) {
      if (lastOne === 1) word = "счёт";
      if (lastOne >= 2 && lastOne <= 4) word = "счёта";
    }

    note.textContent = `Всего ${count} ${word}`;
  }
  
  function parseHardMoney(value) {
  const source = String(value || "")
    .replace(/\s/g, "")
    .replace("₽", "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const number = Number(source);

  return Number.isFinite(number) ? number : 0;
}

function formatHardMoney(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "0 ₽";

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: amount % 1 ? 2 : 0,
    maximumFractionDigits: amount % 1 ? 2 : 0,
  }).format(amount) + " ₽";
}

function getHardDate(value) {
  const raw =
    value?.date ||
    value?.created_at ||
    value?.createdAt ||
    value?.time ||
    value?.timestamp;

  const date = raw ? new Date(raw) : null;

  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function isHardSameMonth(date, baseDate) {
  return (
    date &&
    date.getFullYear() === baseDate.getFullYear() &&
    date.getMonth() === baseDate.getMonth()
  );
}

function getHardPreviousMonthDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
}

function getHardTransactionType(transaction) {
  const type = String(
    transaction?.type ||
    transaction?.kind ||
    transaction?.operationType ||
    transaction?.direction ||
    ""
  ).toLowerCase();

  if (
    type.includes("transfer") ||
    type.includes("перевод")
  ) {
    return "transfer";
  }

  if (
    type.includes("income") ||
    type.includes("доход") ||
    type.includes("in")
  ) {
    return "income";
  }

  if (
    type.includes("expense") ||
    type.includes("расход") ||
    type.includes("out")
  ) {
    return "expense";
  }

  const amount = parseHardMoney(transaction?.amount ?? transaction?.value ?? transaction?.sum);

  if (amount < 0) return "expense";
  if (amount > 0) return "income";

  return "";
}

function getHardTransactionAmount(transaction) {
  return Math.abs(
    parseHardMoney(
      transaction?.amount ??
      transaction?.value ??
      transaction?.sum ??
      transaction?.total
    )
  );
}

function readHardStorageArrays() {
  const arrays = [];

  try {
    Object.keys(localStorage).forEach((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) {
          arrays.push(parsed);
          return;
        }

        if (Array.isArray(parsed?.transactions)) {
          arrays.push(parsed.transactions);
        }

        if (Array.isArray(parsed?.operations)) {
          arrays.push(parsed.operations);
        }

        if (Array.isArray(parsed?.items)) {
          arrays.push(parsed.items);
        }
      } catch (_) {}
    });
  } catch (_) {}

  return arrays;
}

function getHardTransactions() {
  const candidates = [];

  [
    window.transactions,
    window.operations,
    window.appTransactions,
    window.financeTransactions,
    window.state?.transactions,
    window.appState?.transactions,
  ].forEach((value) => {
    if (Array.isArray(value)) candidates.push(value);
  });

  readHardStorageArrays().forEach((value) => {
    if (Array.isArray(value)) candidates.push(value);
  });

  let best = [];

  candidates.forEach((list) => {
    const valid = list.filter((item) => {
      if (!item || typeof item !== "object") return false;

      const hasAmount =
        item.amount !== undefined ||
        item.value !== undefined ||
        item.sum !== undefined ||
        item.total !== undefined;

      return hasAmount && getHardDate(item);
    });

    if (valid.length > best.length) best = valid;
  });

  return best;
}

function getHardCategoryName(transaction) {
  return String(
    transaction?.category ||
    transaction?.categoryName ||
    transaction?.category_title ||
    ""
  ).trim();
}

function getHardLimitedCategories() {
  const categories = [];

  try {
    Object.keys(localStorage).forEach((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed?.categories)
            ? parsed.categories
            : [];

        list.forEach((category) => {
          if (!category || typeof category !== "object") return;

          const limit = parseHardMoney(
            category.limit ??
            category.budget ??
            category.monthLimit ??
            category.monthlyLimit ??
            category.amount
          );

          if (limit <= 0) return;

          const name = String(category.name || category.title || "").trim();
          if (!name) return;

          categories.push({ name, limit });
        });
      } catch (_) {}
    });
  } catch (_) {}

  const map = new Map();

  categories.forEach((category) => {
    if (!map.has(category.name)) {
      map.set(category.name, category);
    }
  });

  return Array.from(map.values());
}

function setHardDelta(elementId, current, previous, mode) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.classList.remove(
    "hard-month-stat__delta--good",
    "hard-month-stat__delta--bad",
    "hard-month-stat__delta--neutral"
  );

  if (previous <= 0) {
    element.textContent = "0%";
    element.classList.add("hard-month-stat__delta--neutral");
    return;
  }

  const percent = ((current - previous) / previous) * 100;
  const absPercent = Math.abs(percent);

  const sign = percent > 0 ? "↑" : percent < 0 ? "↓" : "";
  element.textContent = `${sign} ${absPercent.toFixed(1).replace(".", ",")}%`.trim();

  if (percent === 0) {
    element.classList.add("hard-month-stat__delta--neutral");
    return;
  }

  if (mode === "expense") {
    element.classList.add(percent > 0 ? "hard-month-stat__delta--bad" : "hard-month-stat__delta--good");
    return;
  }

  element.classList.add(percent > 0 ? "hard-month-stat__delta--good" : "hard-month-stat__delta--bad");
}

function syncHardMonthOverview() {
  const transactions = getHardTransactions();

  const now = new Date();
  const previous = getHardPreviousMonthDate();

  let currentIncome = 0;
  let currentExpense = 0;
  let previousIncome = 0;
  let previousExpense = 0;

  transactions.forEach((transaction) => {
    const date = getHardDate(transaction);
    const type = getHardTransactionType(transaction);
    const amount = getHardTransactionAmount(transaction);

    if (!amount || type === "transfer") return;

    if (isHardSameMonth(date, now)) {
      if (type === "income") currentIncome += amount;
      if (type === "expense") currentExpense += amount;
    }

    if (isHardSameMonth(date, previous)) {
      if (type === "income") previousIncome += amount;
      if (type === "expense") previousExpense += amount;
    }
  });

  setTextById("hardMonthIncomeValue", formatHardMoney(currentIncome));
  setTextById("hardMonthExpenseValue", formatHardMoney(currentExpense));

  setHardDelta("hardMonthIncomeDelta", currentIncome, previousIncome, "income");
  setHardDelta("hardMonthExpenseDelta", currentExpense, previousExpense, "expense");

  const limitedCategories = getHardLimitedCategories();
  const limitedNames = new Set(
    limitedCategories.map((category) => category.name.toLowerCase())
  );

  let budgetTotal = limitedCategories.reduce((sum, category) => {
    return sum + category.limit;
  }, 0);

  let budgetSpent = 0;

  transactions.forEach((transaction) => {
    const date = getHardDate(transaction);
    const type = getHardTransactionType(transaction);
    if (!isHardSameMonth(date, now) || type !== "expense") return;

    const categoryName = getHardCategoryName(transaction).toLowerCase();

    if (!limitedNames.size || limitedNames.has(categoryName)) {
      budgetSpent += getHardTransactionAmount(transaction);
    }
  });

  const remainingFromApp = parseHardMoney(
    getTextById("analyticsRemainingBudgetsValue", "") ||
    getTextById("hardSummaryLimitsValue", "")
  );

  if (budgetTotal <= 0 && remainingFromApp > 0) {
    budgetTotal = budgetSpent + remainingFromApp;
  }

  const percent = budgetTotal > 0
    ? Math.min(100, Math.round((budgetSpent / budgetTotal) * 100))
    : 0;

  setTextById("hardMonthBudgetSpentValue", formatHardMoney(budgetSpent));
  setTextById("hardMonthBudgetTotalValue", `из ${formatHardMoney(budgetTotal)}`);
  setTextById("hardMonthBudgetPercent", `${percent}%`);

  const fill = document.getElementById("hardMonthBudgetFill");
  if (fill) {
    fill.style.width = `${percent}%`;
  }
}

  function syncHardMode() {
    syncHeroHint();
    syncHardSummary();
    syncHardPressure();
    syncExpectedIncomeCard();
    syncAccountsCount();
  }

  function scheduleSync() {
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(syncHardMode, 0);
  }

  function bindHardActions() {
    document.addEventListener("click", (event) => {
      const mandatoryCard = event.target.closest('[data-hard-open="mandatory"]');
      const accountsBtn = event.target.closest("#hardScrollAccountsBtn");

      if (mandatoryCard) {
        event.preventDefault();
        document.getElementById("openMandatoryPaymentsModalBtn")?.click();
        return;
      }

      if (accountsBtn) {
        event.preventDefault();
        document.querySelector(".accounts-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  function observeById(id) {
    const source = document.getElementById(id);
    if (!source) return;

    const observer = new MutationObserver(scheduleSync);
    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function observeBySelector(selector) {
    const source = document.querySelector(selector);
    if (!source) return;

    const observer = new MutationObserver(scheduleSync);
    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function startSyncLoop() {
    syncHardMode();

    window.setTimeout(syncHardMode, 100);
    window.setTimeout(syncHardMode, 350);
    window.setTimeout(syncHardMode, 900);
    window.setTimeout(syncHardMode, 1600);
  }

  function start() {
    bindHardActions();

    [
      "walletTodayCanValue",
      "balanceFreeMoneyValue",
      "walletCalendarPressureValue",
      "walletLimitsPressureValue",
      "analyticsPendingMandatoryValue",
      "analyticsRemainingBudgetsValue",
      "walletMandatoryControlValue",
      "walletExpectedIncomeLabel",
      "walletExpectedIncomeValue",
      "accountsList",
    ].forEach(observeById);

    observeBySelector(".hard-source-metrics .balance-amount");

    startSyncLoop();

    window.addEventListener("focus", syncHardMode);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      syncHardMode();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();