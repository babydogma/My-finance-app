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
    function getSafeCategoryName(categoryId) {
      if (categoryId === "transfers") return "Переводы";

      const name = getCategoryName(categoryId);

      return String(name || "").trim() || "Категория";
    }

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

    function renderBrokenTransactionFallback(transaction) {
      const fallback = document.createElement("div");

      fallback.className = "list-card";
      fallback.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">Операция</h3>
          <p class="list-subtitle">Не удалось отрисовать карточку операции</p>
        </div>
      `;

      if (transaction?.id) {
        fallback.dataset.transactionId = transaction.id;
      }

      return fallback;
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
        try {
          analyticsCategoryTransactionsList.appendChild(
            createTransactionCard(transaction)
          );
        } catch (error) {
          console.error("analytics category transaction render error:", error, transaction);
          analyticsCategoryTransactionsList.appendChild(
            renderBrokenTransactionFallback(transaction)
          );
        }
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
      if (!analyticsCategoryModal) {
        console.error("analyticsCategoryModal not found");
        return;
      }

      try {
        setActiveAnalyticsCategoryId(categoryId);

        const isTransferCategory = categoryId === "transfers";
        const title = getSafeCategoryName(categoryId);
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
      } catch (error) {
        console.error("openAnalyticsCategoryModal error:", error, categoryId);
        alert("Не получилось открыть операции категории. Ошибка в данных операции.");
      }
    }

    function closeAnalyticsCategoryModal() {
      if (!analyticsCategoryModal) return;

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