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
    .replace(/−|–|—/g, "-")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const number = Number(source);

  return Number.isFinite(number) ? number : 0;
}

function formatHardMoney(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "0 ₽";

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: Math.abs(amount % 1) > 0.0001 ? 2 : 0,
    maximumFractionDigits: Math.abs(amount % 1) > 0.0001 ? 2 : 0,
  }).format(amount) + " ₽";
}

function parseHardDateString(value) {
  const source = String(value || "").trim();

  if (!source) return null;

  const isoDate = new Date(source);
  if (!Number.isNaN(isoDate.getTime())) return isoDate;

  const ruMatch = source.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (ruMatch) {
    const day = Number(ruMatch[1]);
    const month = Number(ruMatch[2]) - 1;
    let year = Number(ruMatch[3]);

    if (year < 100) year += 2000;

    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function getHardDate(value) {
  const raw =
    value?.date ||
    value?.created_at ||
    value?.createdAt ||
    value?.created ||
    value?.operationDate ||
    value?.operation_date ||
    value?.transactionDate ||
    value?.transaction_date ||
    value?.paidAt ||
    value?.paid_at ||
    value?.time ||
    value?.timestamp;

  return parseHardDateString(raw);
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

function getHardTransactionAmount(transaction) {
  return Math.abs(
    parseHardMoney(
      transaction?.amount ??
      transaction?.value ??
      transaction?.sum ??
      transaction?.total ??
      transaction?.money ??
      transaction?.price
    )
  );
}

function getHardTransactionSignedAmount(transaction) {
  return parseHardMoney(
    transaction?.amount ??
    transaction?.value ??
    transaction?.sum ??
    transaction?.total ??
    transaction?.money ??
    transaction?.price
  );
}

function getHardTransactionType(transaction) {
  const type = String(
    transaction?.type ||
    transaction?.kind ||
    transaction?.operationType ||
    transaction?.operation_type ||
    transaction?.transactionType ||
    transaction?.transaction_type ||
    transaction?.direction ||
    transaction?.mode ||
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
    type === "in" ||
    type === "plus"
  ) {
    return "income";
  }

  if (
    type.includes("expense") ||
    type.includes("расход") ||
    type === "out" ||
    type === "minus"
  ) {
    return "expense";
  }

  const signedAmount = getHardTransactionSignedAmount(transaction);

  if (signedAmount < 0) return "expense";
  if (signedAmount > 0) return "income";

  return "";
}

function collectHardArraysDeep(value, output, seen = new WeakSet()) {
  if (!value || typeof value !== "object") return;

  if (seen.has(value)) return;
  seen.add(value);

  if (Array.isArray(value)) {
    output.push(value);

    value.forEach((item) => {
      collectHardArraysDeep(item, output, seen);
    });

    return;
  }

  Object.values(value).forEach((item) => {
    collectHardArraysDeep(item, output, seen);
  });
}

function readHardStorageArrays() {
  const arrays = [];

  try {
    Object.keys(localStorage).forEach((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        collectHardArraysDeep(parsed, arrays);
      } catch (_) {}
    });
  } catch (_) {}

  return arrays;
}

function getHardDomTransactions() {
  const list = document.getElementById("transactionsList");
  if (!list) return [];

  return Array.from(list.querySelectorAll(".transaction-card, .list-card"))
    .map((card) => {
      const valueText =
        card.querySelector(".list-value")?.textContent ||
        card.querySelector(".transaction-value")?.textContent ||
        "";

      const captionText =
        card.querySelector(".list-caption")?.textContent ||
        card.querySelector(".transaction-date")?.textContent ||
        "";

      const titleText =
        card.querySelector(".list-title")?.textContent ||
        card.querySelector(".transaction-title")?.textContent ||
        "";

      const subtitleText =
        card.querySelector(".list-subtitle")?.textContent ||
        card.querySelector(".transaction-subtitle")?.textContent ||
        "";

      const signedAmount = parseHardMoney(valueText);
      const date = parseHardDateString(captionText);

      if (!date || !signedAmount) return null;

      return {
        title: titleText,
        category: subtitleText.split("•")[0]?.trim() || "",
        amount: signedAmount,
        date,
        type: signedAmount < 0 ? "expense" : "income",
      };
    })
    .filter(Boolean);
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
    window.financeState?.transactions,
  ].forEach((value) => {
    if (Array.isArray(value)) candidates.push(value);
  });

  readHardStorageArrays().forEach((value) => {
    if (Array.isArray(value)) candidates.push(value);
  });

  const normalized = [];

  candidates.forEach((list) => {
    list.forEach((item) => {
      if (!item || typeof item !== "object") return;

      const hasAmount =
        item.amount !== undefined ||
        item.value !== undefined ||
        item.sum !== undefined ||
        item.total !== undefined ||
        item.money !== undefined ||
        item.price !== undefined;

      if (!hasAmount) return;

      const date = getHardDate(item);
      const type = getHardTransactionType(item);
      const amount = getHardTransactionAmount(item);

      if (!date || !type || !amount) return;

      normalized.push({
        ...item,
        date,
        type,
        amount,
      });
    });
  });

  const domTransactions = getHardDomTransactions();

  domTransactions.forEach((transaction) => {
    normalized.push(transaction);
  });

  const unique = new Map();

  normalized.forEach((transaction) => {
    const key = [
      transaction.date instanceof Date ? transaction.date.toISOString() : String(transaction.date),
      transaction.type,
      transaction.amount,
      transaction.title || transaction.name || "",
      transaction.category || "",
    ].join("|");

    if (!unique.has(key)) {
      unique.set(key, transaction);
    }
  });

  return Array.from(unique.values());
}

function getHardCategoryName(transaction) {
  return String(
    transaction?.category ||
    transaction?.categoryName ||
    transaction?.category_title ||
    transaction?.categoryTitle ||
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
        const arrays = [];

        collectHardArraysDeep(parsed, arrays);

        arrays.forEach((list) => {
          list.forEach((category) => {
            if (!category || typeof category !== "object") return;

            const limit = parseHardMoney(
              category.limit ??
              category.budget ??
              category.monthLimit ??
              category.monthlyLimit ??
              category.amountLimit ??
              category.amount
            );

            if (limit <= 0) return;

            const name = String(category.name || category.title || "").trim();
            if (!name) return;

            categories.push({ name, limit });
          });
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
    const date = transaction.date instanceof Date
      ? transaction.date
      : getHardDate(transaction);

    const type = transaction.type || getHardTransactionType(transaction);
    const amount = transaction.amount || getHardTransactionAmount(transaction);

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

  let flexibleBudgetTotal = limitedCategories.reduce((sum, category) => {
    return sum + category.limit;
  }, 0);

  const remainingLimits = parseHardMoney(
    getTextById("analyticsRemainingBudgetsValue", "") ||
    getTextById("hardSummaryLimitsValue", "")
  );

  if (flexibleBudgetTotal <= 0) {
    flexibleBudgetTotal = currentExpense + remainingLimits;
  }

  const mandatoryTotal = parseHardMoney(
    getTextById("analyticsMandatoryTotalValue", "") ||
    getTextById("analyticsPendingMandatoryValue", "")
  );

  const budgetTotal = flexibleBudgetTotal + mandatoryTotal;
  const budgetSpent = currentExpense;

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
    syncHardMonthOverview();
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
      [
  "walletTodayCanValue",
  "balanceFreeMoneyValue",
  "walletCalendarPressureValue",
  "walletLimitsPressureValue",
  "analyticsPendingMandatoryValue",
  "analyticsMandatoryTotalValue",
  "analyticsRemainingBudgetsValue",
  "walletMandatoryControlValue",
  "walletExpectedIncomeLabel",
  "walletExpectedIncomeValue",
  "accountsList",
  "transactionsList",
  "hardSummaryLimitsValue",
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