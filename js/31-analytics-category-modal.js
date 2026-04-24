(() => {
  function createAnalyticsCategoryModal({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,

    analyticsCategoryModal,
    analyticsCategoryModalTitle,
    analyticsCategoryModalPeriodLabel,
    analyticsCategoryBudgetBtn,
    analyticsCategoryTypeBtn,
    analyticsCategoryTransactionsList,

    getActiveAnalyticsCategoryId,
    setActiveAnalyticsCategoryId,

    getFilterPeriod,
    getSelectedMonth,
    getRangeStart,
    getRangeEnd,

    filterTransactionsByPeriod,
    sortTransactionsByLatest,

    getCategoryName,
    getBudgetLimitLabel,
    isRequiredCategory,

    getAnalyticsPeriodLabel,
    createTransactionCard,
    openBudgetModal,

    openAnimatedModal,
    closeAnimatedModal,

    loadDataFromSupabase,
    renderAll,
  }) {
    function getAnalyticsFilteredTransactions() {
      return filterTransactionsByPeriod(
        state.transactions,
        getFilterPeriod(),
        getSelectedMonth(),
        getRangeStart(),
        getRangeEnd()
      );
    }

    function getAnalyticsTransactionsByCategory(categoryId) {
      const items = getAnalyticsFilteredTransactions();

      if (categoryId === "transfers") {
        return sortTransactionsByLatest(
          items.filter((transaction) => transaction.type === "transfer")
        );
      }

      return sortTransactionsByLatest(
        items.filter((transaction) => {
          if (transaction.type !== "expense") return false;
          return (transaction.category_id || UNCATEGORIZED_ID) === categoryId;
        })
      );
    }

    function renderAnalyticsCategoryTransactions(categoryId) {
      if (!analyticsCategoryTransactionsList) return;

      const transactions = getAnalyticsTransactionsByCategory(categoryId);

      analyticsCategoryTransactionsList.innerHTML = "";

      if (!transactions.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Операций нет</h3>
            <p class="list-subtitle">За выбранный период ничего не найдено</p>
          </div>
        `;

        analyticsCategoryTransactionsList.appendChild(empty);
        return;
      }

      transactions.forEach((transaction) => {
        analyticsCategoryTransactionsList.appendChild(
          createTransactionCard(transaction)
        );
      });
    }

    function syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory) {
      if (!analyticsCategoryBudgetBtn) return;

      if (isTransferCategory) {
        analyticsCategoryBudgetBtn.textContent = "—";
        analyticsCategoryBudgetBtn.onclick = null;
        analyticsCategoryBudgetBtn.disabled = true;
        return;
      }

      analyticsCategoryBudgetBtn.textContent = getBudgetLimitLabel(categoryId);
      analyticsCategoryBudgetBtn.disabled = false;
      analyticsCategoryBudgetBtn.onclick = () => openBudgetModal(categoryId);
    }

    function syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory) {
      if (!analyticsCategoryTypeBtn) return;

      if (isTransferCategory) {
        analyticsCategoryTypeBtn.textContent = "Гибкая";
        analyticsCategoryTypeBtn.disabled = true;
        analyticsCategoryTypeBtn.onclick = null;
        analyticsCategoryTypeBtn.classList.remove("analytics-category-type-btn--required");
        analyticsCategoryTypeBtn.classList.add("analytics-category-type-btn--flex");
        return;
      }

      const required = isRequiredCategory(categoryId);

      analyticsCategoryTypeBtn.textContent = required ? "Обязательная" : "Гибкая";
      analyticsCategoryTypeBtn.disabled = false;
      analyticsCategoryTypeBtn.classList.toggle(
        "analytics-category-type-btn--required",
        required
      );
      analyticsCategoryTypeBtn.classList.toggle(
        "analytics-category-type-btn--flex",
        !required
      );

      analyticsCategoryTypeBtn.onclick = async () => {
        const { error } = await supabaseClient
          .from("categories")
          .update({ is_required: !required })
          .eq("id", categoryId);

        if (error) {
          alert("Ошибка обновления типа категории");
          console.error(error);
          return;
        }

        await loadDataFromSupabase();
        openAnalyticsCategoryModal(categoryId);
        renderAll();
      };
    }

    function openAnalyticsCategoryModal(categoryId) {
      setActiveAnalyticsCategoryId(categoryId);

      const isTransferCategory = categoryId === "transfers";
      const title = isTransferCategory ? "Переводы" : getCategoryName(categoryId);
      const periodLabel = getAnalyticsPeriodLabel() || "Период";

      if (analyticsCategoryModalTitle) {
        analyticsCategoryModalTitle.textContent = title;
      }

      if (analyticsCategoryModalPeriodLabel) {
        analyticsCategoryModalPeriodLabel.textContent = periodLabel;
      }

      syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory);
      syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory);
      renderAnalyticsCategoryTransactions(categoryId);

      openAnimatedModal(analyticsCategoryModal);
      document.body.style.overflow = "hidden";
    }

    function closeAnalyticsCategoryModal() {
      closeAnimatedModal(analyticsCategoryModal);
      setActiveAnalyticsCategoryId(null);
    }

    return {
      getAnalyticsFilteredTransactions,
      getAnalyticsTransactionsByCategory,
      renderAnalyticsCategoryTransactions,
      openAnalyticsCategoryModal,
      closeAnalyticsCategoryModal,
    };
  }

  window.FinanceAppAnalyticsCategoryModal = {
    create: createAnalyticsCategoryModal,
  };
})();
