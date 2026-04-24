(() => {
  function createFormSelects({
    state,
    UNCATEGORIZED_ID,
    categorySelect,
  }) {
    function ensureUncategorizedCategory() {
      const exists = state.categories.some((item) => item.id === UNCATEGORIZED_ID);

      if (!exists) {
        state.categories.unshift({
          id: UNCATEGORIZED_ID,
          name: "Без категории",
          icon: "📦",
          locked: true,
          is_required: false,
          sort_order: 1,
        });
      }
    }

    function fillExpenseCategorySelect(selectedId = "") {
      if (!categorySelect) return;

      categorySelect.innerHTML = `<option value="">Выбери категорию</option>`;

      state.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;

        if (selectedId && selectedId === category.id) {
          option.selected = true;
        }

        categorySelect.appendChild(option);
      });
    }

    function fillAccountSelect(selectEl, placeholder, selectedValue = "", options = {}) {
      if (!selectEl) return;

      const {
        includeVault = true,
        includeProtected = true,
        excludeId = "",
      } = options;

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      state.accounts.forEach((account) => {
        if (!includeVault && account.account_kind === "vault_pool") return;
        if (!includeProtected && account.is_protected) return;
        if (excludeId && account.id === excludeId) return;

        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;

        if (selectedValue && selectedValue === account.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    return {
      ensureUncategorizedCategory,
      fillExpenseCategorySelect,
      fillAccountSelect,
    };
  }

  window.FinanceAppFormSelects = {
    create: createFormSelects,
  };
})();
