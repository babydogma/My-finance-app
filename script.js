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

  let currentMode = "expense";

  const state = {
  transactions: [],
};
  
  function saveToStorage() {
  localStorage.setItem("finance_transactions", JSON.stringify(state.transactions));
}

function loadFromStorage() {
  const data = localStorage.getItem("finance_transactions");
  if (data) {
    state.transactions = JSON.parse(data);
  }
}

function calculateBalance() {
  return state.transactions.reduce((sum, transaction) => {
    if (transaction.type === "income") return sum + transaction.amount;
    if (transaction.type === "expense") return sum - transaction.amount;
    return sum;
  }, 0);
}

function renderBalance() {
  const balanceEl = document.querySelector(".balance-amount");
  const totalEl = document.querySelector(".section-note");

  if (!balanceEl) return;

  const balance = calculateBalance();
  const formatted = formatMoney(balance);

  balanceEl.textContent = formatted;

  if (totalEl && totalEl.textContent.includes("Всего:")) {
    totalEl.textContent = `Всего: ${formatted}`;
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
    const sectionTitles = [...document.querySelectorAll(".section-title")];
    const transactionsTitle = sectionTitles.find(
      (el) => el.textContent.trim() === "Последние операции"
    );

    if (!transactionsTitle) return;

    const transactionsSection = transactionsTitle.closest(".section");
    if (!transactionsSection) return;

    const list = transactionsSection.querySelector(".list");
    if (!list) return;

    list.innerHTML = "";

    state.transactions
      .slice()
      .reverse()
      .forEach((transaction) => {
        list.appendChild(createTransactionCard(transaction));
      });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
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

    state.transactions.push({
      id: crypto.randomUUID(),
      type: currentMode,
      title,
      category,
      account,
      amount,
      time: getCurrentTime(),
    });
    saveToStorage();

    renderTransactions();
    renderBalance();
    closeModal();
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
renderTransactions();
renderBalance();
});
