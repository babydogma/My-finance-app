document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("transactionModal");
  const openExpenseModalBtn = document.getElementById("openExpenseModal");
  const openIncomeModalBtn = document.getElementById("openIncomeModal");
  const openTransferModalBtn = document.getElementById("openTransferModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const saveBtn = document.getElementById("saveTransactionBtn");
  const deleteTransactionBtn = document.getElementById("deleteTransactionBtn");

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

  let currentMode = "expense";
  let editingTransactionId = null;

  const defaultAccounts = [
    {
      id: "yandex",
      name: "Яндекс Банк",
      subtitle: "Основной счёт",
      icon: "💳",
      color: "#35d07f",
    },
    {
      id: "cash",
      name: "Наличные",
      subtitle: "Кошелёк",
      icon: "💵",
      color: "#4f8cff",
    },
    {
      id: "safe",
      name: "Сейф",
      subtitle: "Отложенные деньги",
      icon: "🏦",
      color: "#e0b13f",
    },
  ];

  const defaultCategoryMeta = {
    "Еда": { icon: "🍔", color: "#35d07f", subtitle: "Продукты и кафе" },
    "Транспорт": { icon: "🚇", color: "#4f8cff", subtitle: "Метро и поездки" },
    "Развлечения": { icon: "🎮", color: "#a56bff", subtitle: "Игры и подписки" },
    "Зарплата": { icon: "💰", color: "#35d07f", subtitle: "Доход" },
    "Доход": { icon: "💰", color: "#35d07f", subtitle: "Поступления" },
    "Перекус": { icon: "☕", color: "#ff8a65", subtitle: "Быстрые траты" },
    "Перевод": { icon: "↗", color: "#4f8cff", subtitle: "Между счетами" },
  };

  const expenseCategories = ["Еда", "Транспорт", "Развлечения", "Перекус"];
  const incomeCategories = ["Зарплата", "Доход"];

  const state = {
    transactions: [],
    accounts: [...defaultAccounts],
  };

  function saveToStorage() {
    localStorage.setItem("finance_transactions", JSON.stringify(state.transactions));
  }

  function loadFromStorage() {
    const transactionsData = localStorage.getItem("finance_transactions");
    if (transactionsData) {
      state.transactions = JSON.parse(transactionsData);
    }
  }

  function setCategoryOptions(items) {
    categorySelect.innerHTML = `<option>Выбери категорию</option>`;
    items.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item;
      categorySelect.appendChild(option);
    });
  }

  function openModal(mode) {
    currentMode = mode;
    editingTransactionId = null;
    deleteTransactionBtn.classList.add("hidden");

    if (mode === "expense") {
      modalTitle.textContent = "Добавить расход";
      saveBtn.textContent = "Сохранить расход";

      categoryField.classList.remove("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");

      setCategoryOptions(expenseCategories);
    } else if (mode === "income") {
      modalTitle.textContent = "Добавить доход";
      saveBtn.textContent = "Сохранить доход";

      categoryField.classList.remove("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");

      setCategoryOptions(incomeCategories);
    } else if (mode === "transfer") {
      modalTitle.textContent = "Сделать перевод";
      saveBtn.textContent = "Сохранить перевод";

      categoryField.classList.add("hidden");
      accountField.classList.add("hidden");
      fromAccountField.classList.remove("hidden");
      toAccountField.classList.remove("hidden");
    }

    resetForm();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function openEditModal(transactionId) {
    const transaction = state.transactions.find((item) => item.id === transactionId);
    if (!transaction) return;

    editingTransactionId = transaction.id;
    currentMode = transaction.type;

    deleteTransactionBtn.classList.remove("hidden");

    if (transaction.type === "expense") {
      modalTitle.textContent = "Редактировать расход";
      saveBtn.textContent = "Сохранить";
      categoryField.classList.remove("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");
      setCategoryOptions(expenseCategories);

      amountInput.value = transaction.amount;
      categorySelect.value = transaction.category;
      accountSelect.value = transaction.account;
      commentInput.value = transaction.title === "Новая трата" ? "" : transaction.title;
    } else if (transaction.type === "income") {
      modalTitle.textContent = "Редактировать доход";
      saveBtn.textContent = "Сохранить";
      categoryField.classList.remove("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");
      setCategoryOptions(incomeCategories);

      amountInput.value = transaction.amount;
      categorySelect.value = transaction.category;
      accountSelect.value = transaction.account;
      commentInput.value =
        transaction.title === "Новый доход" ? "" : transaction.title;
    } else if (transaction.type === "transfer") {
      modalTitle.textContent = "Редактировать перевод";
      saveBtn.textContent = "Сохранить";
      categoryField.classList.add("hidden");
      accountField.classList.add("hidden");
      fromAccountField.classList.remove("hidden");
      toAccountField.classList.remove("hidden");

      amountInput.value = transaction.amount;
      fromAccountSelect.value = transaction.fromAccount;
      toAccountSelect.value = transaction.toAccount;
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
    categorySelect.selectedIndex = 0;
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
    return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getAccountBalance(accountName) {
    let balance = 0;

    state.transactions.forEach((transaction) => {
      if (transaction.type === "transfer") {
        if (transaction.fromAccount === accountName) balance -= transaction.amount;
        if (transaction.toAccount === accountName) balance += transaction.amount;
        return;
      }

      if (transaction.account !== accountName) return;

      if (transaction.type === "income") balance += transaction.amount;
      if (transaction.type === "expense") balance -= transaction.amount;
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
      if (transaction.type === "income") income += transaction.amount;
      if (transaction.type === "expense") expense += transaction.amount;
    });

    return { income, expense };
  }

  function calculateCategories() {
    const map = new Map();

    state.transactions.forEach((transaction) => {
      if (transaction.type !== "expense") return;
      const current = map.get(transaction.category) || 0;
      map.set(transaction.category, current + transaction.amount);
    });

    return [...map.entries()]
      .map(([name, amount]) => ({
        name,
        amount,
        ...(defaultCategoryMeta[name] || {
          icon: "📦",
          color: "#4f8cff",
          subtitle: "Без описания",
        }),
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  function renderBalance() {
    const balance = calculateBalance();
    balanceEl.textContent = formatMoney(balance);
    accountsTotalEl.textContent = `Всего: ${formatMoney(balance)}`;
  }

  function renderMonthlyStats() {
    const { income, expense } = calculateMonthlyStats();
    monthlyIncomeValueEl.textContent = formatMoney(expense);
    monthlyExpenseValueEl.textContent = formatMoney(income);
  }

  function renderAccounts() {
    accountsListEl.innerHTML = "";

    state.accounts.forEach((account) => {
      const currentBalance = getAccountBalance(account.name);

      const card = document.createElement("div");
      card.className = "list-card";

      card.innerHTML = `
        <div class="list-icon" style="background:${account.color};">${account.icon}</div>
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

    card.innerHTML = `
      <div class="list-icon" style="background:${category.color};">${category.icon}</div>
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

  function createTransactionCard(transaction) {
    const card = document.createElement("div");
    card.className = "list-card list-card--clickable";

    const iconBg =
      transaction.type === "income"
        ? "#35d07f"
        : transaction.type === "transfer"
        ? "#4f8cff"
        : "#ff8a65";

    const icon =
      transaction.type === "income"
        ? "💰"
        : transaction.type === "transfer"
        ? "↗"
        : "🛒";

    let subtitle = "";
    let signedAmount = "";
    let valueClass = "list-value";

    if (transaction.type === "transfer") {
      subtitle = `${escapeHtml(transaction.fromAccount)} → ${escapeHtml(transaction.toAccount)}`;
      signedAmount = formatMoney(transaction.amount);
    } else {
      subtitle = `${escapeHtml(transaction.category)} • ${escapeHtml(transaction.account)}`;
      signedAmount =
        transaction.type === "income"
          ? `+${formatMoney(transaction.amount)}`
          : `−${formatMoney(transaction.amount)}`;

      valueClass =
        transaction.type === "income"
          ? "list-value list-value--green"
          : "list-value list-value--red";
    }

    card.innerHTML = `
      <div class="list-icon" style="background:${iconBg};">${icon}</div>
      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(transaction.title)}</h3>
        </div>
        <p class="list-subtitle">${subtitle}</p>
      </div>
      <div class="list-right">
        <p class="${valueClass}">${signedAmount}</p>
        <div class="list-caption">${transaction.time}</div>
      </div>
    `;

    card.addEventListener("click", () => openEditModal(transaction.id));
    return card;
  }

  function renderTransactions() {
    transactionsListEl.innerHTML = "";

    if (state.transactions.length === 0) {
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

    state.transactions
      .slice()
      .reverse()
      .forEach((transaction) => {
        transactionsListEl.appendChild(createTransactionCard(transaction));
      });
  }

  function buildTransactionFromForm() {
    const amount = Number(amountInput.value.trim());
    const comment = commentInput.value.trim();

    if (!amount || amount <= 0) {
      alert("Введи сумму");
      return null;
    }

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
        category: "Перевод",
        fromAccount,
        toAccount,
        amount,
        time: getCurrentTime(),
      };
    }

    const category = categorySelect.value;
    const account = accountSelect.value;

    if (category === "Выбери категорию") {
      alert("Выбери категорию");
      return null;
    }

    if (account === "Выбери счёт") {
      alert("Выбери счёт");
      return null;
    }

    return {
      id: editingTransactionId || crypto.randomUUID(),
      type: currentMode,
      title: comment || (currentMode === "income" ? "Новый доход" : "Новая трата"),
      category,
      account,
      amount,
      time: getCurrentTime(),
    };
  }

  function saveTransaction() {
    const transaction = buildTransactionFromForm();
    if (!transaction) return;

    if (editingTransactionId) {
      state.transactions = state.transactions.map((item) =>
        item.id === editingTransactionId ? transaction : item
      );
    } else {
      state.transactions.push(transaction);
    }

    saveToStorage();
    renderAll();
    closeModal();
  }

  function deleteTransaction() {
    if (!editingTransactionId) return;

    const ok = confirm("Удалить эту операцию?");
    if (!ok) return;

    state.transactions = state.transactions.filter(
      (item) => item.id !== editingTransactionId
    );

    saveToStorage();
    renderAll();
    closeModal();
  }

  function renderAll() {
    renderBalance();
    renderMonthlyStats();
    renderAccounts();
    renderCategories();
    renderTransactions();
  }

  openExpenseModalBtn?.addEventListener("click", () => openModal("expense"));
  openIncomeModalBtn?.addEventListener("click", () => openModal("income"));
  openTransferModalBtn?.addEventListener("click", () => openModal("transfer"));
  closeModalBtn?.addEventListener("click", closeModal);
  saveBtn?.addEventListener("click", saveTransaction);
  deleteTransactionBtn?.addEventListener("click", deleteTransaction);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  loadFromStorage();
  renderAll();
});