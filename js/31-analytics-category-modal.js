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
    const DYNAMIC_MODAL_ID = "analyticsCategoryModal";

    let dynamicModalBound = false;

    function getSafeElementById(id) {
      return document.getElementById(id);
    }

    function ensureAnalyticsCategoryModal() {
      let modal = analyticsCategoryModal || getSafeElementById(DYNAMIC_MODAL_ID);

      if (modal) {
        bindAnalyticsCategoryModalClose(modal);
        return modal;
      }

      modal = document.createElement("div");
      modal.className = "modal hidden";
      modal.id = DYNAMIC_MODAL_ID;

      modal.innerHTML = `
        <div class="modal-sheet analytics-category-sheet">
          <div class="modal-handle"></div>

          <div class="section-head filters-sheet__head">
            <div>
              <h3 class="modal-title filters-sheet__title" id="analyticsCategoryModalTitle">
                Категория
              </h3>
              <p class="list-subtitle" id="analyticsCategoryModalPeriodLabel">
                Период
              </p>
            </div>

            <button
              class="manager-back-btn"
              type="button"
              id="closeAnalyticsCategoryModalBtn"
            >
              Закрыть
            </button>
          </div>

          <div class="history-filters history-filters--modal">
            <div class="history-filter-group history-filter-group--secondary">
              <button
                class="history-filter-btn"
                type="button"
                id="analyticsCategoryBudgetBtn"
              >
                —
              </button>

              <button
                class="history-filter-btn"
                type="button"
                id="analyticsCategoryTypeBtn"
              >
                —
              </button>
            </div>
          </div>

          <div class="list" id="analyticsCategoryTransactionsList"></div>
        </div>
      `;

      document.body.appendChild(modal);
      bindAnalyticsCategoryModalClose(modal);

      return modal;
    }

    function getModalRefs() {
      const modal = ensureAnalyticsCategoryModal();

      return {
        modal,
        title:
          analyticsCategoryModalTitle ||
          modal.querySelector("#analyticsCategoryModalTitle"),
        period:
          analyticsCategoryModalPeriodLabel ||
          modal.querySelector("#analyticsCategoryModalPeriodLabel"),
        budget:
          analyticsCategoryBudgetBtn ||
          modal.querySelector("#analyticsCategoryBudgetBtn"),
        type:
          analyticsCategoryTypeBtn ||
          modal.querySelector("#analyticsCategoryTypeBtn"),
        list:
          analyticsCategoryTransactionsList ||
          modal.querySelector("#analyticsCategoryTransactionsList"),
        close:
          modal.querySelector("#closeAnalyticsCategoryModalBtn"),
      };
    }

    function bindAnalyticsCategoryModalClose(modal) {
      if (!modal || dynamicModalBound) return;

      dynamicModalBound = true;

      const closeBtn = modal.querySelector("#closeAnalyticsCategoryModalBtn");

      closeBtn?.addEventListener("click", () => {
        closeAnalyticsCategoryModal();
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeAnalyticsCategoryModal();
        }
      });
    }

    function showModal(modal) {
      if (!modal) return;

      /*
        Не используем document.body.style.overflow.
        Не трогаем ручной scroll-lock, потому что он уже несколько раз ломал приложение.
      */
      modal.classList.remove("hidden", "is-closing");

      requestAnimationFrame(() => {
        modal.classList.add("is-visible");
      });
    }

    function hideModal(modal) {
      if (!modal) return;

      modal.classList.remove("is-visible");
      modal.classList.add("is-closing");

      window.setTimeout(() => {
        modal.classList.remove("is-closing");
        modal.classList.add("hidden");
      }, 260);
    }

    function getSafeCategoryName(categoryId) {
      if (categoryId === "transfers") return "Переводы";

      const name = getCategoryName(categoryId);

      return String(name || "").trim() || "Категория";
    }

    function getAnalyticsFilteredTransactions() {
      const transactions = Array.isArray(state.transactions)
        ? state.transactions
        : [];

      return filterTransactionsByPeriod(
        transactions,
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
          items.filter((transaction) => {
            return transaction.type === "transfer";
          })
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
          <p class="list-subtitle">Карточка операции повреждена, но приложение не упало</p>
        </div>
      `;

      if (transaction?.id) {
        fallback.dataset.transactionId = transaction.id;
      }

      return fallback;
    }

    function renderAnalyticsCategoryTransactions(categoryId) {
      const refs = getModalRefs();
      const list = refs.list;

      if (!list) {
        console.error("analyticsCategoryTransactionsList not found");
        return;
      }

      let transactions = [];

      try {
        transactions = getAnalyticsTransactionsByCategory(categoryId);
      } catch (error) {
        console.error("getAnalyticsTransactionsByCategory error:", error, categoryId);

        list.innerHTML = `
          <div class="list-card">
            <div class="list-body">
              <h3 class="list-title">Ошибка загрузки операций</h3>
              <p class="list-subtitle">Не удалось собрать список операций категории</p>
            </div>
          </div>
        `;

        return;
      }

      list.innerHTML = "";

      if (!transactions.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Операций нет</h3>
            <p class="list-subtitle">За выбранный период ничего не найдено</p>
          </div>
        `;

        list.appendChild(empty);
        return;
      }

      transactions.forEach((transaction) => {
        try {
          list.appendChild(createTransactionCard(transaction));
        } catch (error) {
          console.error("analytics category transaction render error:", error, transaction);
          list.appendChild(renderBrokenTransactionFallback(transaction));
        }
      });
    }

    function syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory) {
      const refs = getModalRefs();
      const budgetBtn = refs.budget;

      if (!budgetBtn) return;

      if (isTransferCategory) {
        budgetBtn.textContent = "—";
        budgetBtn.onclick = null;
        budgetBtn.disabled = true;
        return;
      }

      budgetBtn.textContent = getBudgetLimitLabel(categoryId);
      budgetBtn.disabled = false;
      budgetBtn.onclick = () => openBudgetModal(categoryId);
    }

    function syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory) {
      const refs = getModalRefs();
      const typeBtn = refs.type;

      if (!typeBtn) return;

      if (isTransferCategory) {
        typeBtn.textContent = "Гибкая";
        typeBtn.disabled = true;
        typeBtn.onclick = null;
        typeBtn.classList.remove("analytics-category-type-btn--required");
        typeBtn.classList.add("analytics-category-type-btn--flex");
        return;
      }

      const required = isRequiredCategory(categoryId);

      typeBtn.textContent = required ? "Обязательная" : "Гибкая";
      typeBtn.disabled = false;
      typeBtn.classList.toggle("analytics-category-type-btn--required", required);
      typeBtn.classList.toggle("analytics-category-type-btn--flex", !required);

      typeBtn.onclick = async () => {
        try {
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
        } catch (error) {
          alert("Ошибка обновления типа категории");
          console.error(error);
        }
      };
    }

    function openAnalyticsCategoryModal(categoryId) {
      try {
        const refs = getModalRefs();

        if (!refs.modal) {
          console.error("analyticsCategoryModal not found and was not created");
          return;
        }

        setActiveAnalyticsCategoryId(categoryId);

        const isTransferCategory = categoryId === "transfers";
        const title = getSafeCategoryName(categoryId);
        const periodLabel = getAnalyticsPeriodLabel() || "Период";

        if (refs.title) {
          refs.title.textContent = title;
        }

        if (refs.period) {
          refs.period.textContent = periodLabel;
        }

        syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory);
        syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory);
        renderAnalyticsCategoryTransactions(categoryId);

        showModal(refs.modal);
      } catch (error) {
        console.error("openAnalyticsCategoryModal hard error:", error, categoryId);

        alert(
          "Не получилось открыть операции категории. Приложение не умерло, но данные категории надо проверить."
        );
      }
    }

    function closeAnalyticsCategoryModal() {
      const modal =
        analyticsCategoryModal ||
        getSafeElementById(DYNAMIC_MODAL_ID);

      if (!modal) return;

      hideModal(modal);
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