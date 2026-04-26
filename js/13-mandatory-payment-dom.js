(() => {
  function createMandatoryPaymentDom({
    state,
    mandatoryPaymentAccountSelect,
mandatoryPaymentLinkedSafeSelect,
mandatoryPaymentCategorySelect,
mandatoryPaymentLinkedSafeField,
    openMandatoryPaymentBucketPickerBtn,
    mandatoryPaymentBucketPickerModal,
    mandatoryPaymentBucketPickerList,
    isVaultAccountId,
    getSafeBucketName,
    escapeHtml,
  }) {
    function fillMandatoryPaymentAccountSelect(selectedId = "") {
      if (!mandatoryPaymentAccountSelect) return;

      mandatoryPaymentAccountSelect.innerHTML = `<option value="">Без привязки</option>`;

      state.accounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;

        if (selectedId && selectedId === account.id) {
          option.selected = true;
        }

        mandatoryPaymentAccountSelect.appendChild(option);
      });
    }

    function fillMandatoryPaymentSafeSelect(selectedId = "") {
      if (!mandatoryPaymentLinkedSafeSelect) return;

      mandatoryPaymentLinkedSafeSelect.innerHTML =
        `<option value="">Без привязки к накоплению</option>`;

      state.safeBuckets.forEach((bucket) => {
        const option = document.createElement("option");
        option.value = bucket.id;
        option.textContent = bucket.name;

        if (selectedId && selectedId === bucket.id) {
          option.selected = true;
        }

        mandatoryPaymentLinkedSafeSelect.appendChild(option);
      });
    }
    
    function fillMandatoryPaymentCategorySelect(selectedId = "") {
  if (!mandatoryPaymentCategorySelect) return;

  mandatoryPaymentCategorySelect.innerHTML =
    `<option value="">Выбери категорию платежа</option>`;

  const requiredCategories = state.categories.filter((category) => {
    return category.is_required === true;
  });

  const categories = requiredCategories.length
    ? requiredCategories
    : state.categories;

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category.id;
    option.textContent = category.name;

    if (selectedId && selectedId === category.id) {
      option.selected = true;
    }

    mandatoryPaymentCategorySelect.appendChild(option);
  });
}

    function syncMandatoryPaymentLinkedSafeField() {
      const accountId = mandatoryPaymentAccountSelect?.value || "";
      const isVault = isVaultAccountId(accountId);

      mandatoryPaymentLinkedSafeField?.classList.toggle("hidden", !isVault);

      if (!isVault) {
        if (mandatoryPaymentLinkedSafeSelect) {
          mandatoryPaymentLinkedSafeSelect.value = "";
        }

        if (openMandatoryPaymentBucketPickerBtn) {
          openMandatoryPaymentBucketPickerBtn.textContent = "Выбрать накопление";
        }

        return;
      }

      if (openMandatoryPaymentBucketPickerBtn) {
        const currentBucketName =
          getSafeBucketName(mandatoryPaymentLinkedSafeSelect?.value || "") ||
          "Выбрать накопление";

        openMandatoryPaymentBucketPickerBtn.textContent = currentBucketName;
      }
    }

    function renderMandatoryPaymentBucketPicker() {
      if (!mandatoryPaymentBucketPickerList) return;

      mandatoryPaymentBucketPickerList.innerHTML = "";

      if (!state.safeBuckets.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Накоплений пока нет</h3>
            <p class="list-subtitle">Сначала создай накопление</p>
          </div>
        `;
        mandatoryPaymentBucketPickerList.appendChild(empty);
        return;
      }

      state.safeBuckets.forEach((bucket) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "list-card list-card--clickable";

        row.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">${escapeHtml(bucket.name)}</h3>
            <p class="list-subtitle">Накопление</p>
          </div>
        `;

        row.addEventListener("click", () => {
          if (mandatoryPaymentLinkedSafeSelect) {
            mandatoryPaymentLinkedSafeSelect.value = bucket.id;
          }

          if (openMandatoryPaymentBucketPickerBtn) {
            openMandatoryPaymentBucketPickerBtn.textContent = bucket.name;
          }

          mandatoryPaymentBucketPickerModal?.classList.add("hidden");
        });

        mandatoryPaymentBucketPickerList.appendChild(row);
      });
    }

    return {
      fillMandatoryPaymentAccountSelect,
      fillMandatoryPaymentSafeSelect,
      fillMandatoryPaymentCategorySelect,
      syncMandatoryPaymentLinkedSafeField,
      renderMandatoryPaymentBucketPicker,
    };
  }

  window.FinanceAppMandatoryPaymentDom = {
    create: createMandatoryPaymentDom,
  };
})();