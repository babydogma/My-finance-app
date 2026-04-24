(() => {
  function createOperationsView({
    state,
    operationsTransactionsList,

    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,

    setActiveNav,
    createTransactionCard,
  }) {
    function renderOperationsView() {
      if (!operationsTransactionsList) return;

      const items = [...state.transactions].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      operationsTransactionsList.innerHTML = "";

      if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Операций пока нет</h3>
            <p class="list-subtitle">История появится после добавления операций</p>
          </div>
        `;
        operationsTransactionsList.appendChild(empty);
        return;
      }

      items.forEach((item) => {
        operationsTransactionsList.appendChild(createTransactionCard(item));
      });
    }

    function showOperationsView() {
      document.querySelector(".app")?.classList.add("app--analytics");

      mainView.classList.add("hidden");
      categoriesManagerView.classList.add("hidden");
      analyticsView.classList.add("hidden");
      operationsView.classList.remove("hidden");

      setActiveNav("operations");
      renderOperationsView();
    }

    return {
      renderOperationsView,
      showOperationsView,
    };
  }

  window.FinanceAppOperationsView = {
    create: createOperationsView,
  };
})();
