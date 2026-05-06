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

  function pickHardMoneyText(ids, fallback = "0 ₽") {
  for (const id of ids) {
    const text = getTextById(id, "");
    const amount = parseHardMoney(text);

    if (amount > 0) {
      return formatHardMoney(amount);
    }
  }

  return fallback;
}

function syncHardSummary() {
  setTextById(
    "hardSummaryFreeValue",
    pickHardMoneyText([
      "balanceFreeMoneyValue",
      "walletLightFreeValue",
      "monthlyReportFreeValue",
    ])
  );

  setTextById(
    "hardSummaryBalanceValue",
    pickHardMoneyText([
      "hardSummaryBalanceValue",
      "monthlyReportBalanceValue",
    ], getMoneyTextBySelector(".hard-source-metrics .balance-amount", "0 ₽"))
  );

  setTextById(
    "hardSummaryCalendarValue",
    pickHardMoneyText([
      "walletCalendarPressureValue",
      "analyticsPendingMandatoryValue",
    ])
  );

  setTextById(
    "hardSummaryLimitsValue",
    pickHardMoneyText([
      "walletLimitsPressureValue",
      "analyticsRemainingBudgetsValue",
    ])
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

function getHardState() {
  return window.FinanceAppState?.state || null;
}

function parseHardDateString(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

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

function getHardDate(transaction) {
  return parseHardDateString(
    transaction?.date ||
    transaction?.created_at ||
    transaction?.createdAt ||
    transaction?.created ||
    transaction?.operationDate ||
    transaction?.operation_date ||
    transaction?.transactionDate ||
    transaction?.transaction_date ||
    transaction?.paidAt ||
    transaction?.paid_at ||
    transaction?.time ||
    transaction?.timestamp
  );
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

function getHardTransactionAmount(transaction) {
  return Math.abs(getHardTransactionSignedAmount(transaction));
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

  if (type.includes("transfer") || type.includes("перевод")) {
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

function getHardTransactionsFromState() {
  const state = getHardState();

  if (!state || !Array.isArray(state.transactions)) {
    return [];
  }

  return state.transactions
    .map((transaction) => {
      const date = getHardDate(transaction);
      const type = getHardTransactionType(transaction);
      const amount = getHardTransactionAmount(transaction);

      if (!date || !type || !amount) return null;

      return {
        ...transaction,
        date,
        type,
        amount,
      };
    })
    .filter(Boolean);
}

function getHardCategoryId(transaction) {
  return String(
    transaction?.category_id ||
    transaction?.categoryId ||
    transaction?.category ||
    ""
  );
}

function getHardCategories() {
  const state = getHardState();

  if (!state || !Array.isArray(state.categories)) {
    return [];
  }

  return state.categories;
}

function getHardCategoryById(categoryId) {
  const id = String(categoryId || "");
  return getHardCategories().find((category) => {
    return String(category.id || category.category_id || category.name) === id;
  });
}

function getHardCategoryLimit(category) {
  return parseHardMoney(
    category?.limit ??
    category?.budget ??
    category?.budget_limit ??
    category?.budgetLimit ??
    category?.monthLimit ??
    category?.monthlyLimit ??
    category?.amountLimit
  );
}

function isHardRequiredCategory(category) {
  const type = String(
    category?.type ||
    category?.kind ||
    category?.category_type ||
    ""
  ).toLowerCase();

  return (
    category?.required === true ||
    category?.is_required === true ||
    category?.isRequired === true ||
    type.includes("required") ||
    type.includes("mandatory") ||
    type.includes("обяз")
  );
}

function getHardMonthTotals(baseDate) {
  const result = {
    income: 0,
    expense: 0,
    flexibleExpense: 0,
    mandatoryExpense: 0,
  };

  getHardTransactionsFromState().forEach((transaction) => {
    if (!isHardSameMonth(transaction.date, baseDate)) return;
    if (transaction.type === "transfer") return;

    if (transaction.type === "income") {
      result.income += transaction.amount;
      return;
    }

    if (transaction.type !== "expense") return;

    result.expense += transaction.amount;

    const category = getHardCategoryById(getHardCategoryId(transaction));

    if (category && isHardRequiredCategory(category)) {
      result.mandatoryExpense += transaction.amount;
    } else {
      result.flexibleExpense += transaction.amount;
    }
  });

  return result;
}

function getHardFlexibleBudgetTotal() {
  return getHardCategories().reduce((sum, category) => {
    if (isHardRequiredCategory(category)) return sum;

    const limit = getHardCategoryLimit(category);
    if (limit <= 0) return sum;

    return sum + limit;
  }, 0);
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
    element.classList.add(
      percent > 0
        ? "hard-month-stat__delta--bad"
        : "hard-month-stat__delta--good"
    );
    return;
  }

  element.classList.add(
    percent > 0
      ? "hard-month-stat__delta--good"
      : "hard-month-stat__delta--bad"
  );
}

function syncHardMonthOverview() {
  const now = new Date();
  const previous = getHardPreviousMonthDate();

  const currentTotals = getHardMonthTotals(now);
  const previousTotals = getHardMonthTotals(previous);

  setTextById("hardMonthIncomeValue", formatHardMoney(currentTotals.income));
  setTextById("hardMonthExpenseValue", formatHardMoney(currentTotals.expense));

  setHardDelta(
    "hardMonthIncomeDelta",
    currentTotals.income,
    previousTotals.income,
    "income"
  );

  setHardDelta(
    "hardMonthExpenseDelta",
    currentTotals.expense,
    previousTotals.expense,
    "expense"
  );

  const flexibleBudgetTotal = getHardFlexibleBudgetTotal();

  const remainingFlexible = Math.max(
    0,
    parseHardMoney(getTextById("analyticsRemainingBudgetsValue", "")) ||
    parseHardMoney(getTextById("hardSummaryLimitsValue", "")) ||
    parseHardMoney(getTextById("walletLimitsPressureValue", ""))
  );

  const pendingMandatory = Math.max(
    0,
    parseHardMoney(getTextById("analyticsPendingMandatoryValue", "")) ||
    parseHardMoney(getTextById("walletCalendarPressureValue", ""))
  );

  const flexibleTotal = flexibleBudgetTotal > 0
    ? flexibleBudgetTotal
    : currentTotals.flexibleExpense + remainingFlexible;

  const budgetSpent = currentTotals.expense;

  const budgetTotal = Math.max(
    budgetSpent,
    flexibleTotal + pendingMandatory + currentTotals.mandatoryExpense
  );

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
  window.setTimeout(syncHardMode, 2600);
  window.setTimeout(syncHardMode, 4200);
  window.setTimeout(syncHardMode, 6500);

  let attempts = 0;

  const intervalId = window.setInterval(() => {
    attempts += 1;
    syncHardMode();

    if (attempts >= 20) {
      window.clearInterval(intervalId);
    }
  }, 750);
}

  function start() {
    bindHardActions();

    [
  "walletTodayCanValue",
  "walletLightFreeValue",
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
  "monthlyReportIncomeFlowValue",
  "monthlyReportExpenseFlowValue",
  "monthlyReportBalanceValue",
  "monthlyReportFreeValue",
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