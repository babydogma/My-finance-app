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
    } else if (mode === "income") {
      modalTitle.textContent = "Добавить доход";
      saveBtn.textContent = "Сохранить доход";

      categoryField.classList.add("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");
    } else if (mode === "transfer") {
      modalTitle.textContent = "Сделать перевод";
      saveBtn.textContent = "Сохранить перевод";

      categoryField.classList.add("hidden");
      accountField.classList.add("hidden");
      fromAccountField.classList.remove("hidden");
      toAccountField.classList.remove("hidden");
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

  function formatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} ₽`;
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
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    filtered = filtered.filter((transaction) => {
      const transactionTime = transaction.created_at
        ? new Date(transaction.created_at).getTime()
        : 0;

      if (historyFilterPeriod === "all") return true;
      if (historyFilterPeriod === "today") return transactionTime >= startOfToday;
      if (historyFilterPeriod === "7") return transactionTime >= Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (historyFilterPeriod === "30") return transactionTime >= Date.now() - 30 * 24 * 60 * 60 * 1000;
      if (historyFilterPeriod === "month") return transactionTime >= startOfMonth;

      return true;
    });

    return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  function renderBalance() {
    const balance = calculateBalance();
    balanceEl.textContent = formatMoney(balance);
    accountsTotalEl.textContent = `Всего: ${formatMoney(balance)}`;
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
        <div class="list-caption">${transaction.time_label || ""}</div>
      </div>
    `;

    card.addEventListener("click", () => openEditModal(transaction.id));
    return card;
  }

  function renderTransactions() {
    transactionsListEl.innerHTML = "";

    const latestTransactions = [...state.transactions]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);

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

    analyticsCategoriesCount.textContent = `${breakdown.length} категорий`;

    if (!breakdown.length) {
      analyticsDonut.style.background = "conic-gradient(rgba(90, 93, 106, 0.42) 0deg 360deg)";
      analyticsLegend.innerHTML = `<div class="analytics-empty">Нет данных по расходам за выбранный период</div>`;
      return;
    }

    const totalExpense = breakdown.reduce((sum, item) => sum + item.amount, 0);

    let currentAngle = 0;
    const gradientParts = breakdown.map((item) => {
      const part = totalExpense > 0 ? (item.amount / totalExpense) * 360 : 0;
      const start = currentAngle;
      const end = currentAngle + part;
      currentAngle = end;
      return `${item.color} ${start}deg ${end}deg`;
    });

    analyticsDonut.style.background = `conic-gradient(${gradientParts.join(", ")})`;

    analyticsLegend.innerHTML = "";

    breakdown.forEach((item) => {
      const percent = totalExpense > 0 ? Math.round((item.amount / totalExpense) * 100) : 0;

      const row = document.createElement("div");
      row.className = "analytics-legend-item";
      row.innerHTML = `
        <div class="analytics-legend-dot" style="background:${item.color};"></div>
        <div class="analytics-legend-body">
          <p class="analytics-legend-title">${escapeHtml(item.icon)} ${escapeHtml(item.name)}</p>
          <p class="analytics-legend-subtitle">${percent}% от расходов</p>
        </div>
        <div class="analytics-legend-value">${formatMoney(item.amount)}</div>
      `;
      analyticsLegend.appendChild(row);
    });
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

      const card = document.createElement("div");
      card.className = "list-card budget-card";
      card.innerHTML = `
        <div class="list-icon ${toneClass}">${category.icon}</div>
        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(category.name)}</h3>
          </div>

          <div class="budget-meta">
            <div class="budget-line">
              <span>Можно потратить</span>
              <strong>${limit > 0 ? formatMoney(limit) : "Не задано"}</strong>
            </div>

            <div class="budget-line">
              <span>Уже потрачено</span>
              <strong>${formatMoney(spent)}</strong>
            </div>

            <div class="budget-line">
              <span>Осталось</span>
              <strong>${limit > 0 ? formatMoney(remains) : "—"}</strong>
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

    const existingCreatedAt = editingTransactionId
      ? state.transactions.find((item) => item.id === editingTransactionId)?.created_at || new Date().toISOString()
      : new Date().toISOString();

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
      { data: budgetLimits, error: budgetLimitsError }
    ] = await Promise.all([
      supabaseClient.from("accounts").select("*").order("sort_order", { ascending: true }),
      supabaseClient.from("categories").select("*").order("sort_order", { ascending: true }),
      supabaseClient.from("transactions").select("*").order("created_at", { ascending: false }),
      supabaseClient.from("budget_limits").select("*"),
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

    state.accounts = accounts || [];
    state.categories = categories || [];
    state.transactions = transactions || [];
    state.budgetLimits = budgetLimits || [];

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
      renderHistory();
    });
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
  renderAll();
  showWalletView();
});