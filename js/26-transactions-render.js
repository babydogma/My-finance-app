(() => {
  function createTransactionsRender({
    state,
    transactionsListEl,
    sortTransactionsByLatest,
    createTransactionCard,
    getJustCreatedTransactionId,
    setJustCreatedTransactionId,
  }) {
    function renderTransactions() {
      if (!transactionsListEl) return;

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

      let freshCard = null;
      const justCreatedTransactionId = getJustCreatedTransactionId();

      latestTransactions.forEach((transaction) => {
        const card = createTransactionCard(transaction);

        if (
          !freshCard &&
          justCreatedTransactionId &&
          transaction.id === justCreatedTransactionId
        ) {
          card.classList.add("list-card--fresh-sticker");
          freshCard = card;
        }

        transactionsListEl.appendChild(card);
      });

      if (freshCard) {
        window.setTimeout(() => {
          freshCard?.classList.remove("list-card--fresh-sticker");
          setJustCreatedTransactionId(null);
        }, 2200);
      } else if (justCreatedTransactionId) {
        setJustCreatedTransactionId(null);
      }
    }

    return {
      renderTransactions,
    };
  }

  window.FinanceAppTransactionsRender = {
    create: createTransactionsRender,
  };
})();
