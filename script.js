document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("transactionModal");
  const openExpenseModalBtn = document.getElementById("openExpenseModal");
  const openIncomeModalBtn = document.getElementById("openIncomeModal");
  const openTransferModalBtn = document.getElementById("openTransferModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const saveBtn = document.getElementById("saveTransactionBtn");
  const deleteTransactionBtn = document.getElementById("deleteTransactionBtn");

  const budgetModal = document.getElementById("budgetModal");
  const budgetModalTitle = document.getElementById("budgetModalTitle");
  const budgetAmountInput = document.getElementById("budgetAmountInput");
  const closeBudgetModalBtn = document.getElementById("closeBudgetModalBtn");
  const saveBudgetBtn = document.getElementById("saveBudgetBtn");
  const deleteBudgetBtn = document.getElementById("deleteBudgetBtn");

  const openCategoriesManagerBtn = document.getElementById("openCategoriesManagerBtn");
  const closeCategoriesManagerBtn = document.getElementById("closeCategoriesManagerBtn");

  const navWalletBtn = document.getElementById("navWalletBtn");
  const navAnalyticsBtn = document.getElementById("navAnalyticsBtn");
  const navBudgetBtn = document.getElementById("navBudgetBtn");
  const navHistoryBtn = document.getElementById("navHistoryBtn");

  const mainView = document.getElementById("mainView");
  const categoriesManagerView = document.getElementById("categoriesManagerView");
  const historyView = document.getElementById("historyView");
  const analyticsView = document.getElementById("analyticsView");
  const budgetView = document.getElementById("budgetView");

  const categoriesManagerList = document.getElementById("categoriesManagerList");
  const newCategoryNameInput = document.getElementById("newCategoryNameInput");
  const newCategoryIconInput = document.getElementById("newCategoryIconInput");
  const addCategoryBtn = document.getElementById("addCategoryBtn");

  const historyTransactionsList = document.getElementById("historyTransactionsList");
const historyCountLabel = document.getElementById("historyCountLabel");
const historyPeriodButtons = document.querySelectorAll("[data-period]");
const historyTypeButtons = document.querySelectorAll("[data-type]");
const historyMonthInput = document.getElementById("historyMonthInput");
const historySelectedPeriodLabel = document.getElementById("historySelectedPeriodLabel");
const historyCustomMonthBtn = document.getElementById("historyCustomMonthBtn");

  const analyticsPeriodButtons = document.querySelectorAll("[data-analytics-period]");
  const analyticsIncomeValue = document.getElementById("analyticsIncomeValue");
  const analyticsExpenseValue = document.getElementById("analyticsExpenseValue");
  const analyticsNetValue = document.getElementById("analyticsNetValue");
  const analyticsDonut = document.getElementById("analyticsDonut");
  const analyticsLegend = document.getElementById("analyticsLegend");
  const analyticsCategoriesCount = document.getElementById("analyticsCategoriesCount");

  const budgetList = document.getElementById("budgetList");
  const budgetCountLabel = document.getElementById("budgetCountLabel");

  const modalTitle = modal?.querySelector(".modal-title");

  const amountInput = document.getElementById("amountInput");
  const dateInput = document.getElementById("dateInput");
  const categorySelect = document.getElementById("categorySelect");
  const accountSelect = document.getElementById("accountSelect");
  const fromAccountSelect = document.getElementById("fromAccountSelect");
  const toAccountSelect = document.getElementById("toAccountSelect");
  const commentInput = document.getElementById("commentInput");

  const categoryField = document.getElementById("categoryField");
  const accountField = document.getElementById("accountField");
  const fromAccountField = document.getElementById("fromAccountField");
  const toAccountField = document.getElementById("toAccountField");

  const balanceEl = document.querySelector(".balance-amount");
  const accountsTotalEl = document.getElementById("accountsTotal");
  const monthlyExpenseValueEl = document.getElementById("monthlyExpenseValue");
  const monthlyIncomeValueEl = document.getElementById("monthlyIncomeValue");
  const accountsListEl = document.getElementById("accountsList");
  const categoriesListEl = document.getElementById("categoriesList");
  const transactionsListEl = document.getElementById("transactionsList");

  const period7Btn = document.getElementById("period7Btn");
  const period30Btn = document.getElementById("period30Btn");
  const balanceResultValueEl = document.getElementById("balanceResultValue");
  const balancePeriodLabelEl = document.getElementById("balancePeriodLabel");

  let currentMode = "expense";
  let editingTransactionId = null;
  let currentPeriodDays = 7;
  let currentView = "wallet";

  let historyFilterPeriod = "today";
let historyFilterType = "all";
let historySelectedMonth = "";
let analyticsFilterPeriod = "7";

  let activeBudgetCategoryId = null;

  const UNCATEGORIZED_ID = "uncategorized";

  const ANALYTICS_COLORS = [
    "#5a7a6c",
    "#586b94",
    "#8c703a",
    "#6b5a8f",
    "#8a5a55",
    "#5a5d6a",
  ];

  const state = {
  transactions: [],
  accounts: [],
  categories: [],
  budgetLimits: [],
  appMeta: [],
};

  function getCategoryById(categoryId) {
    return state.categories.find((item) => item.id === categoryId);
  }

  function getCategoryName(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.name : "Без категории";
  }

  function getCategoryIcon(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.icon : "📦";
  }

  function getBudgetLimitByCategoryId(categoryId) {
    return state.budgetLimits.find((item) => item.category_id === categoryId);
  }
  
  function getAppMetaValue(key) {
  const item = state.appMeta.find((entry) => entry.key === key);
  return item ? item.value : "";
}

function getDateOnlyString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSafeBalance() {
  return getAccountBalance("Сейфы Яндекса");
}

function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

  function ensureUncategorizedCategory() {
    const exists = state.categories.some((item) => item.id === UNCATEGORIZED_ID);

    if (!exists) {
      state.categories.unshift({
        id: UNCATEGORIZED_ID,
        name: "Без категории",
        icon: "📦",
        locked: true,
        sort_order: 1,
      });
    }
  }

  function fillExpenseCategorySelect(selectedId = "") {
    categorySelect.innerHTML = `<option value="">Выбери категорию</option>`;

    state.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = `${category.icon} ${category.name}`;

      if (selectedId && selectedId === category.id) {
        option.selected = true;
      }

      categorySelect.appendChild(option);
    });
  }

  function setActiveNav(viewName) {
    navWalletBtn?.classList.toggle("is-active", viewName === "wallet");
    navAnalyticsBtn?.classList.toggle("is-active", viewName === "analytics");
    navBudgetBtn?.classList.toggle("is-active", viewName === "budget");
    navHistoryBtn?.classList.toggle("is-active", viewName === "history");
  }

  function showWalletView() {
    document.querySelector(".app")?.classList.remove("app--budget", "app--history", "app--analytics");
    currentView = "wallet";
    mainView.classList.remove("hidden");
    categoriesManagerView.classList.add("hidden");
    historyView.classList.add("hidden");
    analyticsView.classList.add("hidden");
    budgetView.classList.add("hidden");
    setActiveNav("wallet");
  }

  function openCategoriesManager() {
    document.querySelector(".app")?.classList.remove("app--budget", "app--history", "app--analytics");
    currentView = "categories";
    mainView.classList.add("hidden");
    categoriesManagerView.classList.remove("hidden");
    historyView.classList.add("hidden");
    analyticsView.classList.add("hidden");
    budgetView.classList.add("hidden");
    setActiveNav("wallet");
  }

  function closeCategoriesManager() {
    showWalletView();
  }

  function showHistoryView() {
    document.querySelector(".app")?.classList.remove("app--budget", "app--analytics");
    document.querySelector(".app")?.classList.add("app--history");
    currentView = "history";
    mainView.classList.add("hidden");
    categoriesManagerView.classList.add("hidden");
    historyView.classList.remove("hidden");
    analyticsView.classList.add("hidden");
    budgetView.classList.add("hidden");
    setActiveNav("history");
    renderHistory();
  }

  function showAnalyticsView() {
    document.querySelector(".app")?.classList.remove("app--budget", "app--history");
    document.querySelector(".app")?.classList.add("app--analytics");
    currentView = "analytics";
    mainView.classList.add("hidden");
    categoriesManagerView.classList.add("hidden");
    historyView.classList.add("hidden");
    analyticsView.classList.remove("hidden");
    budgetView.classList.add("hidden");
    setActiveNav("analytics");
    renderAnalytics();
  }

  function showBudgetView() {
  currentView = "budget";
  document.querySelector(".app")?.classList.remove("app--history", "app--analytics");
  document.querySelector(".app")?.classList.add("app--budget");
  mainView.classList.add("hidden");
  categoriesManagerView.classList.add("hidden");
  historyView.classList.add("hidden");
  analyticsView.classList.add("hidden");
  budgetView.classList.remove("hidden");
  setActiveNav("budget");
  renderBudget();
}

  function openBudgetModal(categoryId) {
    const category = getCategoryById(categoryId);
    if (!category) return;

    activeBudgetCategoryId = categoryId;

    const existing = getBudgetLimitByCategoryId(categoryId);

    budgetModalTitle.textContent = `${category.icon} ${category.name}`;
    budgetAmountInput.value = existing ? Number(existing.monthly_limit) : "";
    deleteBudgetBtn.classList.toggle("hidden", !existing);

    budgetModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeBudgetModal() {
    budgetModal.classList.add("hidden");
    document.body.style.overflow = "";
    activeBudgetCategoryId = null;
    budgetAmountInput.value = "";
  }

  function openModal(mode) {
    currentMode = mode;
    editingTransactionId = null;
    deleteTransactionBtn.classList.add("hidden");

    resetForm();

    if (mode === "expense") {
      modalTitle.textContent = "Добавить расход";
      saveBtn.textContent = "Сохранить расход";

      categoryField.classList.remove("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");

      fillExpenseCategorySelect();
      accountSelect.value = "Сейфы Яндекса";
    } else if (mode === "income") {
      modalTitle.textContent = "Добавить доход";
      saveBtn.textContent = "Сохранить доход";

      categoryField.classList.add("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");
      
      accountSelect.value = "Яндекс Банк";
    } else if (mode === "transfer") {
      modalTitle.textContent = "Сделать перевод";
      saveBtn.textContent = "Сохранить перевод";

      categoryField.classList.add("hidden");
      accountField.classList.add("hidden");
      fromAccountField.classList.remove("hidden");
      toAccountField.classList.remove("hidden");
      
      fromAccountSelect.value = "Яндекс Банк";
      toAccountSelect.value = "Наличные";
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function openEditModal(transactionId) {
    const transaction = state.transactions.find((item) => item.id === transactionId);
    if (!transaction) return;

    editingTransactionId = transaction.id;
    currentMode = transaction.type;
    deleteTransactionBtn.classList.remove("hidden");

    resetForm();

    if (transaction.type === "expense") {
      modalTitle.textContent = "Редактировать расход";
      saveBtn.textContent = "Сохранить";

      categoryField.classList.remove("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");

      fillExpenseCategorySelect(transaction.category_id || UNCATEGORIZED_ID);

      amountInput.value = transaction.amount;
dateInput.value = transaction.created_at
  ? new Date(transaction.created_at).toISOString().slice(0, 10)
  : getTodayDateValue();
accountSelect.value = transaction.account;
commentInput.value = transaction.title === "Новая трата" ? "" : transaction.title;
    } else if (transaction.type === "income") {
      modalTitle.textContent = "Редактировать доход";
      saveBtn.textContent = "Сохранить";

      categoryField.classList.add("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");

      amountInput.value = transaction.amount;
dateInput.value = transaction.created_at
  ? new Date(transaction.created_at).toISOString().slice(0, 10)
  : getTodayDateValue();
accountSelect.value = transaction.account;
commentInput.value = transaction.title === "Новый доход" ? "" : transaction.title;
    } else if (transaction.type === "transfer") {
      modalTitle.textContent = "Редактировать перевод";
      saveBtn.textContent = "Сохранить";

      categoryField.classList.add("hidden");
      accountField.classList.add("hidden");
      fromAccountField.classList.remove("hidden");
      toAccountField.classList.remove("hidden");

      amountInput.value = transaction.amount;
dateInput.value = transaction.created_at
  ? new Date(transaction.created_at).toISOString().slice(0, 10)
  : getTodayDateValue();
fromAccountSelect.value = transaction.from_account;
toAccountSelect.value = transaction.to_account;
commentInput.value = transaction.title === "Перевод" ? "" : transaction.title;
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    editingTransactionId = null;
  }

  function resetForm() {
  amountInput.value = "";
  dateInput.value = getTodayDateValue();
  commentInput.value = "";
  categorySelect.innerHTML = `<option value="">Выбери категорию</option>`;
  accountSelect.selectedIndex = 0;
  fromAccountSelect.selectedIndex = 0;
  toAccountSelect.selectedIndex = 0;
}

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  
  function getTodayDateValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLocalDateKey(dateValue) {
  const date = new Date(dateValue);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

  function formatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} ₽`;
  }
  
  function formatDateShort(dateValue) {
  if (!dateValue) return "";

  const rawDate = String(dateValue).slice(0, 10);
  const [year, month, day] = rawDate.split("-");

  if (!year || !month || !day) return "";

  return `${day}.${month}.${year.slice(-2)}`;
}

function sortTransactionsByLatest(items) {
  return [...items].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });
}
  
  function formatDateShort(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
}
  
  function getMonthRange(monthValue) {
  if (!monthValue) return null;

  const [year, month] = monthValue.split("-").map(Number);
  if (!year || !month) return null;

  const start = new Date(year, month - 1, 1).getTime();
  const end = new Date(year, month, 1).getTime();

  return { start, end };
}

function formatMonthLabel(monthValue) {
  if (!monthValue) return "";

  const [year, month] = monthValue.split("-").map(Number);
  if (!year || !month) return "";

  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
}

function getAnalyticsPeriodLabel() {
  if (analyticsFilterPeriod === "7") return "за 7 дней";
  if (analyticsFilterPeriod === "30") return "за 30 дней";
  return "за всё время";
}

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getIconToneClass(type, extra = "") {
    if (type === "income") return "list-icon--green";
    if (type === "transfer") return "list-icon--blue";
    if (type === "expense") {
      if (extra === "transport") return "list-icon--blue";
      if (extra === "fun") return "list-icon--purple";
      if (extra === "snack") return "list-icon--amber";
      if (extra === "food") return "list-icon--green";
      if (extra === "uncategorized") return "list-icon--neutral";
      return "list-icon--red";
    }
    return "list-icon--neutral";
  }

  function getAccountBalance(accountName) {
    let balance = 0;

    state.transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "transfer") {
        if (transaction.from_account === accountName) balance -= amount;
        if (transaction.to_account === accountName) balance += amount;
        return;
      }

      if (transaction.account !== accountName) return;

      if (transaction.type === "income") balance += amount;
      if (transaction.type === "expense") balance -= amount;
    });

    return balance;
  }

  function calculateBalance() {
    return state.accounts.reduce((sum, account) => sum + getAccountBalance(account.name), 0);
  }

  function calculateMonthlyStats() {
    let income = 0;
    let expense = 0;

    state.transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") income += amount;
      if (transaction.type === "expense") expense += amount;
    });

    return { income, expense };
  }

  function getPeriodTransactions(days) {
    const now = Date.now();
    const rangeStart = now - days * 24 * 60 * 60 * 1000;

    return state.transactions.filter((transaction) => {
      if (!transaction.created_at) return false;
      const transactionTime = new Date(transaction.created_at).getTime();
      return transactionTime >= rangeStart;
    });
  }

  function calculatePeriodResult(days) {
    const periodTransactions = getPeriodTransactions(days);

    let income = 0;
    let expense = 0;

    periodTransactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") income += amount;
      if (transaction.type === "expense") expense += amount;
    });

    return income - expense;
  }

  function calculateCategories() {
    const map = new Map();

    state.transactions.forEach((transaction) => {
      if (transaction.type !== "expense") return;

      const categoryId = transaction.category_id || UNCATEGORIZED_ID;
      const amount = Number(transaction.amount) || 0;
      const current = map.get(categoryId) || 0;
      map.set(categoryId, current + amount);
    });

    return [...map.entries()]
      .map(([categoryId, amount]) => {
        const category = getCategoryById(categoryId) || getCategoryById(UNCATEGORIZED_ID);

        return {
          id: category.id,
          name: category.name,
          icon: category.icon,
          amount,
          subtitle: "Расходы",
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }

  function getAnalyticsFilteredTransactions() {
    let filtered = [...state.transactions];

    if (analyticsFilterPeriod === "7") {
      filtered = filtered.filter((item) => {
        if (!item.created_at) return false;
        return new Date(item.created_at).getTime() >= Date.now() - 7 * 24 * 60 * 60 * 1000;
      });
    } else if (analyticsFilterPeriod === "30") {
      filtered = filtered.filter((item) => {
        if (!item.created_at) return false;
        return new Date(item.created_at).getTime() >= Date.now() - 30 * 24 * 60 * 60 * 1000;
      });
    }

    return filtered;
  }

  function getAnalyticsSummary() {
    const items = getAnalyticsFilteredTransactions();

    let income = 0;
    let expense = 0;

    items.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") income += amount;
      if (transaction.type === "expense") expense += amount;
    });

    return {
      income,
      expense,
      net: income - expense,
    };
  }

  function getAnalyticsCategoryBreakdown() {
    const items = getAnalyticsFilteredTransactions();
    const map = new Map();

    items.forEach((transaction) => {
      if (transaction.type !== "expense") return;

      const categoryId = transaction.category_id || UNCATEGORIZED_ID;
      const amount = Number(transaction.amount) || 0;
      const current = map.get(categoryId) || 0;
      map.set(categoryId, current + amount);
    });

    return [...map.entries()]
      .map(([categoryId, amount], index) => {
        const category = getCategoryById(categoryId) || getCategoryById(UNCATEGORIZED_ID);

        return {
          id: category.id,
          name: category.name,
          icon: category.icon,
          amount,
          color: ANALYTICS_COLORS[index % ANALYTICS_COLORS.length],
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }

  function getHistoryFilteredTransactions() {
  let filtered = [...state.transactions];

  if (historyFilterType !== "all") {
    filtered = filtered.filter((item) => item.type === historyFilterType);
  }

  const now = new Date();
const todayKey = getTodayDateValue();
const customMonthRange = getMonthRange(historySelectedMonth);

filtered = filtered.filter((transaction) => {
  const transactionTime = transaction.created_at
    ? new Date(transaction.created_at).getTime()
    : 0;

  const transactionDateKey = transaction.created_at
    ? String(transaction.created_at).slice(0, 10)
    : "";

  if (historyFilterPeriod === "all") return true;

  if (historyFilterPeriod === "today") {
    return transactionDateKey === todayKey;
  }

  if (historyFilterPeriod === "7") {
    return transactionTime >= Date.now() - 7 * 24 * 60 * 60 * 1000;
  }

  if (historyFilterPeriod === "30") {
    return transactionTime >= Date.now() - 30 * 24 * 60 * 60 * 1000;
  }

  if (historyFilterPeriod === "customMonth") {
    if (!customMonthRange) return true;

    return (
      transactionTime >= customMonthRange.start &&
      transactionTime < customMonthRange.end
    );
  }

  return true;
});

  return sortTransactionsByLatest(filtered);
}

  function getCurrentMonthExpenseByCategory(categoryId) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    return state.transactions.reduce((sum, transaction) => {
      if (transaction.type !== "expense") return sum;
      if ((transaction.category_id || UNCATEGORIZED_ID) !== categoryId) return sum;
      const time = transaction.created_at ? new Date(transaction.created_at).getTime() : 0;
      if (time < startOfMonth) return sum;
      return sum + (Number(transaction.amount) || 0);
    }, 0);
  }

  function getBudgetCategories() {
    return state.categories.filter((category) => category.id !== UNCATEGORIZED_ID);
  }
  
  async function applySafeInterestIfNeeded() {
  const annualRate = 0.12;
  const dailyRate = annualRate / 365;

  const today = new Date();
  const todayString = getDateOnlyString(today);

  const lastAppliedDate = getAppMetaValue("safe_interest_last_applied_date");

  if (lastAppliedDate === todayString) {
    return;
  }

  let startDate;

  if (!lastAppliedDate) {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 1);
  } else {
    startDate = new Date(`${lastAppliedDate}T00:00:00`);
  }

  const daysToApply = [];
  const cursor = new Date(startDate);

  while (true) {
    cursor.setDate(cursor.getDate() + 1);
    const cursorString = getDateOnlyString(cursor);

    if (cursorString > todayString) break;
    daysToApply.push(new Date(cursor));
  }

  if (!daysToApply.length) {
    return;
  }

  for (const day of daysToApply) {
    const safeBalance = getSafeBalance();

    if (safeBalance <= 0) {
      continue;
    }

    const interestAmount = roundToTwo(safeBalance * dailyRate);

    if (interestAmount <= 0) {
      continue;
    }

    const dayString = getDateOnlyString(day);

    const interestTransaction = {
      id: crypto.randomUUID(),
      type: "income",
      title: "Проценты по сейфу",
      account: "Сейфы Яндекса",
      category_id: null,
      from_account: null,
      to_account: null,
      amount: interestAmount,
      time_label: "00:01",
      created_at: `${dayString}T00:01:00`,
    };

    const { error: insertError } = await supabaseClient
      .from("transactions")
      .insert(interestTransaction);

    if (insertError) {
      console.error(insertError);
      alert("Ошибка начисления процентов по сейфу");
      return;
    }

    state.transactions.push(interestTransaction);
  }

  const { error: metaError } = await supabaseClient
    .from("app_meta")
    .upsert({
      key: "safe_interest_last_applied_date",
      value: todayString,
    });

  if (metaError) {
    console.error(metaError);
    alert("Ошибка сохранения даты начисления процентов");
    return;
  }
}

  function renderBalance() {
    const balance = calculateBalance();
    balanceEl.textContent = formatMoney(balance);
    accountsTotalEl.textContent = `Всего: ${formatMoney(balance)}`;
  }
  
  function sortTransactionsByLatest(items) {
  return [...items].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });
}

  function renderMonthlyStats() {
    const { income, expense } = calculateMonthlyStats();

    if (monthlyExpenseValueEl) {
      monthlyExpenseValueEl.textContent = formatMoney(expense);
    }

    if (monthlyIncomeValueEl) {
      monthlyIncomeValueEl.textContent = formatMoney(income);
    }
  }

  function renderBalanceResult() {
    if (!balanceResultValueEl || !balancePeriodLabelEl) return;

    const result = calculatePeriodResult(currentPeriodDays);

    balanceResultValueEl.classList.remove("is-positive", "is-negative");

    if (result > 0) {
      balanceResultValueEl.textContent = `+${formatMoney(result)}`;
      balanceResultValueEl.classList.add("is-positive");
    } else if (result < 0) {
      balanceResultValueEl.textContent = `−${formatMoney(Math.abs(result))}`;
      balanceResultValueEl.classList.add("is-negative");
    } else {
      balanceResultValueEl.textContent = formatMoney(0);
    }

    balancePeriodLabelEl.textContent =
      currentPeriodDays === 7 ? "за 7 дней" : "за месяц";

    period7Btn?.classList.toggle("is-active", currentPeriodDays === 7);
    period30Btn?.classList.toggle("is-active", currentPeriodDays === 30);
  }

  function renderAccounts() {
    accountsListEl.innerHTML = "";

    state.accounts.forEach((account) => {
      const currentBalance = getAccountBalance(account.name);

      const card = document.createElement("div");
      card.className = "list-card";

      const accountTone =
  account.id === "yandex"
    ? "list-icon--green"
    : account.id === "cash"
    ? "list-icon--blue"
    : account.id === "cash_reserve"
    ? "list-icon--neutral"
    : "list-icon--amber";
    
      card.innerHTML = `
        <div class="list-icon ${accountTone}">${account.icon}</div>
        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(account.name)}</h3>
          </div>
          <p class="list-subtitle">${escapeHtml(account.subtitle)}</p>
        </div>
        <div class="list-right">
          <p class="list-value">${formatMoney(currentBalance)}</p>
        </div>
      `;

      accountsListEl.appendChild(card);
    });
  }

  function createCategoryCard(category) {
    const card = document.createElement("div");
    card.className = "list-card";

    const categoryTone =
      category.id === "food"
        ? "list-icon--green"
        : category.id === "transport"
        ? "list-icon--blue"
        : category.id === "fun"
        ? "list-icon--purple"
        : category.id === "snack"
        ? "list-icon--amber"
        : "list-icon--neutral";

    card.innerHTML = `
      <div class="list-icon ${categoryTone}">${category.icon}</div>
      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(category.name)}</h3>
        </div>
        <p class="list-subtitle">${escapeHtml(category.subtitle)}</p>
      </div>
      <div class="list-right">
        <p class="list-value">${formatMoney(category.amount)}</p>
      </div>
    `;

    return card;
  }

  function renderCategories() {
    categoriesListEl.innerHTML = "";
    const categories = calculateCategories();

    if (categories.length === 0) {
      const empty = document.createElement("div");
      empty.className = "list-card";
      empty.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">Категорий пока нет</h3>
          <p class="list-subtitle">Добавь первую расходную операцию</p>
        </div>
      `;
      categoriesListEl.appendChild(empty);
      return;
    }

    categories.forEach((category) => {
      categoriesListEl.appendChild(createCategoryCard(category));
    });
  }

  function renderCategoriesManager() {
    categoriesManagerList.innerHTML = "";

    state.categories.forEach((category) => {
      const card = document.createElement("div");
      card.className = "list-card";

      const lockedAttr = category.locked ? "disabled" : "";
      const lockedSubtitle = category.locked ? "Системная категория" : "Можно редактировать";

      const managerTone =
        category.id === "food"
          ? "list-icon--green"
          : category.id === "transport"
          ? "list-icon--blue"
          : category.id === "fun"
          ? "list-icon--purple"
          : category.id === "snack"
          ? "list-icon--amber"
          : "list-icon--neutral";

      card.innerHTML = `
        <div class="list-icon ${managerTone}">${category.icon}</div>

        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(category.name)}</h3>
          </div>
          <p class="list-subtitle">${lockedSubtitle}</p>
        </div>

        <div class="category-manager-actions">
          <button class="mini-btn mini-btn-edit" type="button" data-edit-id="${category.id}" ${lockedAttr}>
            Изм.
          </button>
          <button class="mini-btn mini-btn-delete" type="button" data-delete-id="${category.id}" ${lockedAttr}>
            Удал.
          </button>
        </div>
      `;

      const editBtn = card.querySelector("[data-edit-id]");
      const deleteBtn = card.querySelector("[data-delete-id]");

      editBtn?.addEventListener("click", async () => {
        const nextName = prompt("Новое название категории", category.name);
        if (nextName === null) return;

        const cleanedName = nextName.trim();
        if (!cleanedName) {
          alert("Название не может быть пустым");
          return;
        }

        const nextIcon = prompt("Новый эмодзи категории", category.icon);
        if (nextIcon === null) return;

        const cleanedIcon = nextIcon.trim() || "📦";

        const { error } = await supabaseClient
          .from("categories")
          .update({
            name: cleanedName,
            icon: cleanedIcon,
          })
          .eq("id", category.id);

        if (error) {
          alert("Ошибка обновления категории");
          console.error(error);
          return;
        }

        await loadDataFromSupabase();
        renderAll();
      });

      deleteBtn?.addEventListener("click", async () => {
        if (category.locked) return;

        const ok = confirm(`Удалить категорию "${category.name}"? Все старые расходы перейдут в "Без категории". Лимит бюджета тоже удалится.`);
        if (!ok) return;

        const { error: txError } = await supabaseClient
          .from("transactions")
          .update({ category_id: UNCATEGORIZED_ID })
          .eq("type", "expense")
          .eq("category_id", category.id);

        if (txError) {
          alert("Ошибка переноса старых расходов");
          console.error(txError);
          return;
        }

        const { error: budgetDeleteError } = await supabaseClient
          .from("budget_limits")
          .delete()
          .eq("category_id", category.id);

        if (budgetDeleteError) {
          alert("Ошибка удаления лимита бюджета");
          console.error(budgetDeleteError);
          return;
        }

        const { error: deleteError } = await supabaseClient
          .from("categories")
          .delete()
          .eq("id", category.id);

        if (deleteError) {
          alert("Ошибка удаления категории");
          console.error(deleteError);
          return;
        }

        await loadDataFromSupabase();
        renderAll();
      });

      categoriesManagerList.appendChild(card);
    });
  }

  function createTransactionCard(transaction) {
  const card = document.createElement("div");
  card.className = "list-card list-card--clickable";

  const icon =
    transaction.type === "income"
      ? "💰"
      : transaction.type === "transfer"
      ? "↗"
      : getCategoryIcon(transaction.category_id || UNCATEGORIZED_ID);

  const toneKey =
    transaction.type === "expense" ? (transaction.category_id || UNCATEGORIZED_ID) : "";

  const iconToneClass = getIconToneClass(transaction.type, toneKey);

  let subtitle = "";
  let signedAmount = "";
  let valueClass = "list-value";

  if (transaction.type === "transfer") {
    subtitle = `${escapeHtml(transaction.from_account)} → ${escapeHtml(transaction.to_account)}`;
    signedAmount = formatMoney(transaction.amount);
  } else if (transaction.type === "income") {
    subtitle = `${escapeHtml(transaction.account)} • доход`;
    signedAmount = `+${formatMoney(transaction.amount)}`;
    valueClass = "list-value list-value--green";
  } else {
    subtitle = `${escapeHtml(getCategoryName(transaction.category_id || UNCATEGORIZED_ID))} • ${escapeHtml(transaction.account)}`;
    signedAmount = `−${formatMoney(transaction.amount)}`;
    valueClass = "list-value list-value--red";
  }

  const shortDate = formatDateShort(transaction.created_at);
  const timeLabel = transaction.time_label || "";
  const caption = `${shortDate}${shortDate && timeLabel ? " • " : ""}${timeLabel}`;

  card.innerHTML = `
    <div class="list-icon ${iconToneClass}">${icon}</div>
    <div class="list-body">
      <div class="list-title-row">
        <h3 class="list-title">${escapeHtml(transaction.title)}</h3>
      </div>
      <p class="list-subtitle">${subtitle}</p>
    </div>
    <div class="list-right">
      <p class="${valueClass}">${signedAmount}</p>
      <div class="list-caption">${caption}</div>
    </div>
  `;

  card.addEventListener("click", () => openEditModal(transaction.id));
  return card;
}

  function renderTransactions() {
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

  latestTransactions.forEach((transaction) => {
    transactionsListEl.appendChild(createTransactionCard(transaction));
  });
}

  function renderHistory() {
    if (!historyTransactionsList) return;

    historyTransactionsList.innerHTML = "";

    const filteredTransactions = getHistoryFilteredTransactions();

    historyCountLabel.textContent = `${filteredTransactions.length} операций`;
    historyPeriodButtons.forEach((btn) => {
  btn.classList.toggle("is-active", btn.dataset.period === historyFilterPeriod);
});

historyTypeButtons.forEach((btn) => {
  btn.classList.toggle("is-active", btn.dataset.type === historyFilterType);
});

    if (historyMonthInput) {
  historyMonthInput.classList.toggle("hidden", historyFilterPeriod !== "customMonth");
}

if (historySelectedPeriodLabel) {
  const hasCustomMonth = historyFilterPeriod === "customMonth" && historySelectedMonth;

  historySelectedPeriodLabel.classList.toggle("hidden", !hasCustomMonth);
  historySelectedPeriodLabel.textContent = hasCustomMonth
    ? formatMonthLabel(historySelectedMonth)
    : "";
}

    if (filteredTransactions.length === 0) {
      const empty = document.createElement("div");
      empty.className = "list-card";
      empty.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">Ничего не найдено</h3>
          <p class="list-subtitle">Попробуй другой период или тип операций</p>
        </div>
      `;
      historyTransactionsList.appendChild(empty);
      return;
    }

    filteredTransactions.forEach((transaction) => {
      historyTransactionsList.appendChild(createTransactionCard(transaction));
    });
  }

  function renderAnalytics() {
  if (!analyticsView) return;

  const summary = getAnalyticsSummary();
  const breakdown = getAnalyticsCategoryBreakdown();

  analyticsIncomeValue.textContent = formatMoney(summary.income);
  analyticsExpenseValue.textContent = formatMoney(summary.expense);

  analyticsNetValue.classList.remove("is-positive", "is-negative");

  if (summary.net > 0) {
    analyticsNetValue.textContent = `+${formatMoney(summary.net)}`;
    analyticsNetValue.classList.add("is-positive");
  } else if (summary.net < 0) {
    analyticsNetValue.textContent = `−${formatMoney(Math.abs(summary.net))}`;
    analyticsNetValue.classList.add("is-negative");
  } else {
    analyticsNetValue.textContent = formatMoney(0);
  }

  analyticsPeriodButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.analyticsPeriod === analyticsFilterPeriod);
  });

  if (!breakdown.length) {
    analyticsDonut.innerHTML = `
      <div class="analytics-overview-card analytics-overview-card--empty">
        <div class="analytics-overview-card__total">${formatMoney(0)}</div>
        <div class="analytics-overview-card__period">${getAnalyticsPeriodLabel()}</div>
      </div>
    `;

    analyticsLegend.innerHTML = `
      <div class="analytics-empty analytics-empty--clean">
        Нет данных по расходам за выбранный период
      </div>
    `;
    return;
  }

  const totalExpense = breakdown.reduce((sum, item) => sum + item.amount, 0);
  const topItem = breakdown[0];
  const topPercent = totalExpense > 0 ? Math.round((topItem.amount / totalExpense) * 100) : 0;

  analyticsDonut.innerHTML = `
    <div class="analytics-overview-card">
      <div class="analytics-overview-card__label">Расходы по категориям</div>
      <div class="analytics-overview-card__total">${formatMoney(totalExpense)}</div>
      <div class="analytics-overview-card__period">${getAnalyticsPeriodLabel()}</div>

      <div class="analytics-overview-card__leader">
        <div class="analytics-overview-card__leader-label">Главная категория</div>
        <div class="analytics-overview-card__leader-title">${escapeHtml(topItem.icon)} ${escapeHtml(topItem.name)}</div>
        <div class="analytics-overview-card__leader-meta">${topPercent}% • ${formatMoney(topItem.amount)}</div>
      </div>
    </div>
  `;

  const listMarkup = breakdown
    .map((item, index) => {
      const percent = totalExpense > 0 ? Math.round((item.amount / totalExpense) * 100) : 0;

      return `
        <div class="analytics-breakdown-row">
          <div class="analytics-breakdown-row__left">
            <div class="analytics-breakdown-row__rank">#${index + 1}</div>
            <span class="analytics-breakdown-row__dot" style="background:${item.color};"></span>
            <div class="analytics-breakdown-row__body">
              <div class="analytics-breakdown-row__title">${escapeHtml(item.icon)} ${escapeHtml(item.name)}</div>
              <div class="analytics-breakdown-row__subtitle">${percent}% от расходов</div>
            </div>
          </div>
          <div class="analytics-breakdown-row__value">${formatMoney(item.amount)}</div>
        </div>
      `;
    })
    .join("");

  analyticsLegend.innerHTML = `
    <div class="analytics-breakdown-list">
      ${listMarkup}
    </div>
  `;
}

  function renderBudget() {
  if (!budgetList) return;

  budgetList.innerHTML = "";

  const categories = getBudgetCategories();
  budgetCountLabel.textContent = `${categories.length} категорий`;

  if (!categories.length) {
    budgetList.innerHTML = `<div class="manager-card"><div class="budget-empty">Категорий пока нет</div></div>`;
    return;
  }

  categories.forEach((category) => {
    const spent = getCurrentMonthExpenseByCategory(category.id);
    const limitRecord = getBudgetLimitByCategoryId(category.id);
    const limit = limitRecord ? Number(limitRecord.monthly_limit) || 0 : 0;
    const remains = Math.max(limit - spent, 0);
    const progressPercent = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

    const toneClass =
      category.id === "food"
        ? "list-icon--green"
        : category.id === "transport"
        ? "list-icon--blue"
        : category.id === "fun"
        ? "list-icon--purple"
        : category.id === "snack"
        ? "list-icon--amber"
        : "list-icon--neutral";

    let fillClass = "budget-progress__fill";
    if (limit > 0 && progressPercent >= 100) {
      fillClass += " is-danger";
    } else if (limit > 0 && progressPercent >= 75) {
      fillClass += " is-warning";
    }

    const spentText = formatMoney(spent);
    const limitText = limit > 0 ? formatMoney(limit) : "Без лимита";
    const remainsText = limit > 0 ? formatMoney(remains) : "—";

    const card = document.createElement("div");
    card.className = "list-card budget-card";
    card.innerHTML = `
      <div class="list-icon ${toneClass}">${category.icon}</div>

      <div class="list-body">
        <div class="budget-top">
          <div class="budget-top__left">
            <h3 class="list-title">${escapeHtml(category.name)}</h3>
            <p class="budget-remains">Осталось ${remainsText}</p>
          </div>

          <div class="budget-top__right">
            <p class="budget-ratio">${spentText} <span>из ${limitText}</span></p>
          </div>
        </div>

        <div class="budget-progress">
          <div class="${fillClass}" style="width:${progressPercent}%;"></div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openBudgetModal(category.id));
    budgetList.appendChild(card);
  });
}

  function buildTransactionFromForm() {
    const amount = Number(amountInput.value.trim());
    const comment = commentInput.value.trim();

    if (!amount || amount <= 0) {
      alert("Введи сумму");
      return null;
    }

    const selectedDate = dateInput.value || getTodayDateValue();
const existingTimePart = editingTransactionId
  ? state.transactions.find((item) => item.id === editingTransactionId)?.created_at
  : null;

const preservedTime = existingTimePart
  ? new Date(existingTimePart).toTimeString().slice(0, 8)
  : new Date().toTimeString().slice(0, 8);

const existingCreatedAt = `${selectedDate}T${preservedTime}`;

    if (currentMode === "transfer") {
      const fromAccount = fromAccountSelect.value;
      const toAccount = toAccountSelect.value;

      if (fromAccount === "С какого счёта") {
        alert("Выбери счёт списания");
        return null;
      }

      if (toAccount === "На какой счёт") {
        alert("Выбери счёт зачисления");
        return null;
      }

      if (fromAccount === toAccount) {
        alert("Счета должны быть разными");
        return null;
      }

      return {
        id: editingTransactionId || crypto.randomUUID(),
        type: "transfer",
        title: comment || "Перевод",
        account: null,
        category_id: null,
        from_account: fromAccount,
        to_account: toAccount,
        amount,
        time_label: getCurrentTime(),
        created_at: existingCreatedAt,
      };
    }

    const account = accountSelect.value;

    if (account === "Выбери счёт") {
      alert("Выбери счёт");
      return null;
    }

    if (currentMode === "income") {
      return {
        id: editingTransactionId || crypto.randomUUID(),
        type: "income",
        title: comment || "Новый доход",
        account,
        category_id: null,
        from_account: null,
        to_account: null,
        amount,
        time_label: getCurrentTime(),
        created_at: existingCreatedAt,
      };
    }

    const categoryId = categorySelect.value;

    if (!categoryId) {
      alert("Выбери категорию");
      return null;
    }

    return {
      id: editingTransactionId || crypto.randomUUID(),
      type: "expense",
      title: comment || "Новая трата",
      account,
      category_id: categoryId,
      from_account: null,
      to_account: null,
      amount,
      time_label: getCurrentTime(),
      created_at: existingCreatedAt,
    };
  }

  async function saveTransaction() {
    const transaction = buildTransactionFromForm();
    if (!transaction) return;

    if (editingTransactionId) {
      const { error } = await supabaseClient
        .from("transactions")
        .update(transaction)
        .eq("id", editingTransactionId);

      if (error) {
        alert("Ошибка обновления операции");
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabaseClient
        .from("transactions")
        .insert(transaction);

      if (error) {
        alert("Ошибка сохранения операции");
        console.error(error);
        return;
      }
    }

    await loadDataFromSupabase();
    renderAll();
    closeModal();
  }

  async function deleteTransaction() {
    if (!editingTransactionId) return;

    const ok = confirm("Удалить эту операцию?");
    if (!ok) return;

    const { error } = await supabaseClient
      .from("transactions")
      .delete()
      .eq("id", editingTransactionId);

    if (error) {
      alert("Ошибка удаления операции");
      console.error(error);
      return;
    }

    await loadDataFromSupabase();
    renderAll();
    closeModal();
  }

  async function addCategory() {
    const name = newCategoryNameInput.value.trim();
    const icon = newCategoryIconInput.value.trim() || "📦";

    if (!name) {
      alert("Введите название категории");
      return;
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name,
      icon,
      locked: false,
      sort_order: state.categories.length + 1,
    };

    const { error } = await supabaseClient
      .from("categories")
      .insert(newCategory);

    if (error) {
      alert("Ошибка добавления категории");
      console.error(error);
      return;
    }

    newCategoryNameInput.value = "";
    newCategoryIconInput.value = "";

    await loadDataFromSupabase();
    renderAll();
  }

  async function saveBudgetLimit() {
    if (!activeBudgetCategoryId) return;

    const amount = Number(budgetAmountInput.value.trim());

    if (Number.isNaN(amount) || amount < 0) {
      alert("Введи корректный лимит");
      return;
    }

    const existing = getBudgetLimitByCategoryId(activeBudgetCategoryId);

    if (existing) {
      const { error } = await supabaseClient
        .from("budget_limits")
        .update({ monthly_limit: amount })
        .eq("category_id", activeBudgetCategoryId);

      if (error) {
        alert("Ошибка обновления лимита");
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabaseClient
        .from("budget_limits")
        .insert({
          category_id: activeBudgetCategoryId,
          monthly_limit: amount,
        });

      if (error) {
        alert("Ошибка сохранения лимита");
        console.error(error);
        return;
      }
    }

    await loadDataFromSupabase();
    renderAll();
    closeBudgetModal();
  }

  async function deleteBudgetLimit() {
    if (!activeBudgetCategoryId) return;

    const ok = confirm("Удалить лимит для этой категории?");
    if (!ok) return;

    const { error } = await supabaseClient
      .from("budget_limits")
      .delete()
      .eq("category_id", activeBudgetCategoryId);

    if (error) {
      alert("Ошибка удаления лимита");
      console.error(error);
      return;
    }

    await loadDataFromSupabase();
    renderAll();
    closeBudgetModal();
  }

  async function loadDataFromSupabase() {
  const [
    { data: accounts, error: accountsError },
    { data: categories, error: categoriesError },
    { data: transactions, error: transactionsError },
    { data: budgetLimits, error: budgetLimitsError },
    { data: appMeta, error: appMetaError }
  ] = await Promise.all([
    supabaseClient.from("accounts").select("*").order("sort_order", { ascending: true }),
    supabaseClient.from("categories").select("*").order("sort_order", { ascending: true }),
    supabaseClient.from("transactions").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("budget_limits").select("*"),
    supabaseClient.from("app_meta").select("*"),
  ]);

  if (accountsError) {
    console.error(accountsError);
    alert("Ошибка загрузки счетов из Supabase");
    return;
  }

  if (categoriesError) {
    console.error(categoriesError);
    alert("Ошибка загрузки категорий из Supabase");
    return;
  }

  if (transactionsError) {
    console.error(transactionsError);
    alert("Ошибка загрузки операций из Supabase");
    return;
  }

  if (budgetLimitsError) {
    console.error(budgetLimitsError);
    alert("Ошибка загрузки лимитов бюджета из Supabase");
    return;
  }

  if (appMetaError) {
    console.error(appMetaError);
    alert("Ошибка загрузки служебных данных приложения");
    return;
  }

  state.accounts = accounts || [];
  state.categories = categories || [];
  state.transactions = transactions || [];
  state.budgetLimits = budgetLimits || [];
  state.appMeta = appMeta || [];

  ensureUncategorizedCategory();
}

  function renderAll() {
    ensureUncategorizedCategory();
    renderBalance();
    renderBalanceResult();
    renderMonthlyStats();
    renderAccounts();
    renderCategories();
    renderCategoriesManager();
    renderTransactions();
    renderHistory();
    renderAnalytics();
    renderBudget();
  }

  openExpenseModalBtn?.addEventListener("click", () => openModal("expense"));
  openIncomeModalBtn?.addEventListener("click", () => openModal("income"));
  openTransferModalBtn?.addEventListener("click", () => openModal("transfer"));

  openCategoriesManagerBtn?.addEventListener("click", openCategoriesManager);
  closeCategoriesManagerBtn?.addEventListener("click", closeCategoriesManager);

  navWalletBtn?.addEventListener("click", showWalletView);
  navHistoryBtn?.addEventListener("click", showHistoryView);
  navAnalyticsBtn?.addEventListener("click", showAnalyticsView);
  navBudgetBtn?.addEventListener("click", showBudgetView);

  historyPeriodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    historyFilterPeriod = btn.dataset.period;

    if (historyFilterPeriod === "customMonth") {
      if (!historySelectedMonth) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        historySelectedMonth = `${year}-${month}`;
      }

      if (historyMonthInput) {
        historyMonthInput.value = historySelectedMonth;
        historyMonthInput.classList.remove("hidden");
        historyMonthInput.showPicker?.();
      }
    }

    renderHistory();
  });
});

historyMonthInput?.addEventListener("change", () => {
  if (!historyMonthInput.value) return;

  historySelectedMonth = historyMonthInput.value;
  historyFilterPeriod = "customMonth";
  renderHistory();
});

  historyTypeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      historyFilterType = btn.dataset.type;
      renderHistory();
    });
  });

  analyticsPeriodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      analyticsFilterPeriod = btn.dataset.analyticsPeriod;
      renderAnalytics();
    });
  });

  closeModalBtn?.addEventListener("click", closeModal);
  saveBtn?.addEventListener("click", saveTransaction);
  deleteTransactionBtn?.addEventListener("click", deleteTransaction);
  addCategoryBtn?.addEventListener("click", addCategory);

  closeBudgetModalBtn?.addEventListener("click", closeBudgetModal);
  saveBudgetBtn?.addEventListener("click", saveBudgetLimit);
  deleteBudgetBtn?.addEventListener("click", deleteBudgetLimit);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  budgetModal?.addEventListener("click", (event) => {
    if (event.target === budgetModal) closeBudgetModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
    if (event.key === "Escape" && !budgetModal.classList.contains("hidden")) {
      closeBudgetModal();
    }
  });

  period7Btn?.addEventListener("click", () => {
    currentPeriodDays = 7;
    renderBalanceResult();
  });

  period30Btn?.addEventListener("click", () => {
    currentPeriodDays = 30;
    renderBalanceResult();
  });

  await loadDataFromSupabase();
await applySafeInterestIfNeeded();
await loadDataFromSupabase();
renderAll();
showWalletView();
});