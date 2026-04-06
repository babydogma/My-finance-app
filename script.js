document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("transactionModal");
  const openExpenseModalBtn = document.getElementById("openExpenseModal");
  const openIncomeModalBtn = document.getElementById("openIncomeModal");
  const openTransferModalBtn = document.getElementById("openTransferModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  const modalTitle = modal?.querySelector(".modal-title");
  const saveBtn = modal?.querySelector(".btn-primary");

  const amountInput = modal?.querySelector('input[type="number"]');
  const categorySelect = modal?.querySelectorAll(".select")[0];
  const accountSelect = modal?.querySelectorAll(".select")[1];
  const commentInput = modal?.querySelector('input[type="text"]');

  const balanceEl = document.querySelector(".balance-amount");
  const accountsTotalEl = document.getElementById("accountsTotal");
  const monthlyExpenseValueEl = document.getElementById("monthlyExpenseValue");
  const monthlyIncomeValueEl = document.getElementById("monthlyIncomeValue");
  const accountsListEl = document.getElementById("accountsList");
  const categoriesListEl = document.getElementById("categoriesList");
  const transactionsListEl = document.getElementById("transactionsList");

  let currentMode = "expense";

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
    "Перекус": { icon: "☕", color: "#ff8a65", subtitle: "Быстрые траты" },
  };

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

  function openModal(mode) {
    currentMode = mode;

    if (mode === "expense") {
      modalTitle.textContent = "Добавить расход";
      saveBtn.textContent = "Сохранить расход";
    } else if (mode === "income") {
      modalTitle.textContent = "Добавить доход";
      saveBtn.textContent = "Сохранить доход";
    } else if (mode === "transfer") {
      modalTitle.textContent = "Сделать перевод";
      saveBtn.textContent = "Сохранить перевод";
    }

    resetForm();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function resetForm() {
    if (amountInput) amountInput.value = "";
    if (categorySelect) categorySelect.selectedIndex = 0;
    if (accountSelect) accountSelect.selectedIndex = 0;
    if (commentInput) commentInput.value = "";
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
      if (transaction.account !== accountName) return;

      if (transaction.type === "income") {
        balance += transaction.amount;
      } else if (transaction.type === "expense") {
        balance -= transaction.amount;
      }
    });

    return balance;
  }

  function calculateBalance() {
    return state.accounts.reduce((sum, account) => {
      return sum + getAccountBalance(account.name);
    }, 0);
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
    if (!balanceEl) return;

    const balance = calculateBalance();
    balanceEl.textContent = formatMoney(balance);

    if (accountsTotalEl) {
      accountsTotalEl.textContent = `Всего: ${formatMoney(balance)}`;
    }
  }

  function renderMonthlyStats() {
    const { income, expense } = calculateMonthlyStats();

    if (monthlyIncomeValueEl) {
      monthlyIncomeValueEl.textContent = formatMoney(income);
    }

    if (monthlyExpenseValueEl) {
      monthlyExpenseValueEl.textContent = formatMoney(expense);
    }
  }

  function renderAccounts() {
    if (!accountsListEl) return;

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

        <div class="list-arrow">›</div>
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
    if (!categoriesListEl) return;

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
    card.className = "list-card";

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

    const signedAmount =
      transaction.type === "income"
        ? `+${formatMoney(transaction.amount)}`
        : transaction.type === "transfer"
        ? `${formatMoney(transaction.amount)}`
        : `−${formatMoney(transaction.amount)}`;

    const valueClass =
      transaction.type === "income"
        ? "list-value list-value--green"
        : transaction.type === "expense"
        ? "list-value list-value--red"
        : "list-value";

    card.innerHTML = `
      <div class="list-icon" style="background:${iconBg};">${icon}</div>

      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(transaction.title)}</h3>
        </div>
        <p class="list-subtitle">${escapeHtml(transaction.category)} • ${escapeHtml(transaction.account)}</p>
      </div>

      <div class="list-right">
        <p class="${valueClass}">${signedAmount}</p>
        <div class="list-caption">${transaction.time}</div>
      </div>
    `;

    return card;
  }

  function renderTransactions() {
    if (!transactionsListEl) return;

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

  function saveTransaction() {
    const amount = Number(amountInput.value.trim());
    const category = categorySelect.value;
    const account = accountSelect.value;
    const comment = commentInput.value.trim();

    if (!amount || amount <= 0) {
      alert("Введи сумму");
      return;
    }

    if (category === "Выбери категорию") {
      alert("Выбери категорию");
      return;
    }

    if (account === "Выбери счёт") {
      alert("Выбери счёт");
      return;
    }

    const title =
      comment ||
      (currentMode === "income"
        ? "Новый доход"
        : currentMode === "transfer"
        ? "Перевод"
        : "Новая трата");

    const transaction = {
      id: crypto.randomUUID(),
      type: currentMode,
      title,
      category,
      account,
      amount,
      time: getCurrentTime(),
    };

    state.transactions.push(transaction);

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

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  loadFromStorage();
  renderAll();
});
