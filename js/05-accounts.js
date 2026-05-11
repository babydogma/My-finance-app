// ===== js/13-mandatory-payment-dom.js =====
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

// ===== js/14-mandatory-payment-render.js =====
(() => {
  function createMandatoryPaymentRender({
    state,
    mandatoryPaymentsList,
    mandatoryPaymentsMonthStrip,
    getSelectedMonth,
    setSelectedMonth,
    getMandatoryPaymentsMonthItems,
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentVisibleInMonth,
    isMandatoryPaymentPaidInMonth,
    getSafeBucketName,
    getSafeBucketBalance,
    roundToTwo,
    formatMoney,
    escapeHtml,
    bindMandatoryPaymentPress,
  }) {
    function getLinkedAccountName(item) {
      const accountId = item.linked_account_id || "";

      if (!accountId || !Array.isArray(state.accounts)) {
        return "";
      }

      const account = state.accounts.find((entry) => entry.id === accountId);

      return account?.name || "";
    }

    function getPaymentBindingText(item) {
      const linkedSafeName = item.linked_safe_bucket_id
        ? getSafeBucketName(item.linked_safe_bucket_id)
        : "";

      const linkedSafeBalance = item.linked_safe_bucket_id
        ? Math.max(0, roundToTwo(getSafeBucketBalance(item.linked_safe_bucket_id)))
        : 0;

      const covered = Math.min(Number(item.amount) || 0, linkedSafeBalance);

      if (item.linked_safe_bucket_id && linkedSafeName) {
        return `накопление: ${linkedSafeName} • покрыто ${formatMoney(covered)}`;
      }

      const linkedAccountName = getLinkedAccountName(item);

      if (linkedAccountName) {
        return `счёт: ${linkedAccountName}`;
      }

      return "без привязки";
    }

    function renderMandatoryPaymentsMonthStrip() {
      if (!mandatoryPaymentsMonthStrip) return;

      const items = getMandatoryPaymentsMonthItems();

      mandatoryPaymentsMonthStrip.innerHTML = "";

      items.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `mandatory-payments-month-chip${
          item.key === getSelectedMonth() ? " is-active" : ""
        }`;

        button.innerHTML = `
          <span>${item.label}</span>
          ${item.isCurrent ? "<small>сейчас</small>" : ""}
        `;

        button.addEventListener("click", () => {
          setSelectedMonth(item.key);

          renderMandatoryPaymentsMonthStrip();
          renderMandatoryPaymentsModal();
        });

        mandatoryPaymentsMonthStrip.appendChild(button);
      });
    }

    function renderMandatoryPaymentsModal() {
      if (!mandatoryPaymentsList) return;

      mandatoryPaymentsList.innerHTML = "";

      if (!state.mandatoryPayments.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Платежей пока нет</h3>
            <p class="list-subtitle">Добавь обязательные платежи ниже</p>
          </div>
        `;
        mandatoryPaymentsList.appendChild(empty);
        return;
      }

      const currentMonthKey = getMandatoryPaymentsActiveMonthKey();

      const visiblePayments = state.mandatoryPayments.filter((item) =>
        isMandatoryPaymentVisibleInMonth(item, currentMonthKey)
      );

      if (!visiblePayments.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">Платежей в этом месяце нет</h3>
            <p class="list-subtitle">Добавь платёж с датой в выбранном месяце</p>
          </div>
        `;
        mandatoryPaymentsList.appendChild(empty);
        return;
      }

      visiblePayments
        .slice()
        .sort((a, b) => a.due_day - b.due_day)
        .forEach((item) => {
          const isPaid = isMandatoryPaymentPaidInMonth(item, currentMonthKey);
          const bindingText = getPaymentBindingText(item);

          const card = document.createElement("button");
          card.type = "button";
          card.className =
            `list-card list-card--clickable mandatory-payment-card${
              isPaid ? " mandatory-payment-card--paid" : ""
            }`;

                    card.dataset.mandatoryId = item.id;
          card.dataset.paymentId = item.id;
          card.dataset.mandatoryPaymentId = item.id;
          card.dataset.paid = String(isPaid);

          card.innerHTML = `
            <div class="mandatory-payment-card__progress"></div>

            <div class="list-body">
              <div class="list-title-row">
                <h3 class="list-title">${escapeHtml(item.title)}</h3>
              </div>
              <p class="list-subtitle">
                ${formatMoney(item.amount)} • до ${String(item.due_day).padStart(2, "0")} числа • ${escapeHtml(bindingText)}
              </p>
            </div>

            <div class="list-right mandatory-payment-card__status-wrap">
              <p class="mandatory-payment-card__status ${isPaid ? "is-paid" : "is-unpaid"}">
                ${isPaid ? "Оплачен" : "Не оплачен"}
              </p>
            </div>
          `;

          bindMandatoryPaymentPress(card, item);
          mandatoryPaymentsList.appendChild(card);
        });
    }

    return {
      renderMandatoryPaymentsMonthStrip,
      renderMandatoryPaymentsModal,
    };
  }

  window.FinanceAppMandatoryPaymentRender = {
    create: createMandatoryPaymentRender,
  };
})();

// ===== js/15-mandatory-payment-long-press.js =====
(() => {
  function createMandatoryPaymentLongPress({
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentPaidInMonth,
    toggleMandatoryPaymentPaid,
    openMandatoryPaymentEditor,
  }) {
    let mandatoryLongPressTimer = null;
    let mandatoryLongPressVisualTimer = null;
    let mandatoryPressStartX = 0;
    let mandatoryPressStartY = 0;
    let mandatoryPressMoved = false;
    let mandatoryLongPressTriggered = false;

    function stopNativeSelection() {
      if (!window.getSelection) return;

      const selection = window.getSelection();

      if (selection && selection.removeAllRanges) {
        selection.removeAllRanges();
      }
    }

    function startMandatoryPaymentLongPress(card, item, startX = 0, startY = 0) {
      if (!card || !item) return;

      const currentMonthKey = getMandatoryPaymentsActiveMonthKey();
      const isPaid = isMandatoryPaymentPaidInMonth(item, currentMonthKey);

      mandatoryLongPressTriggered = false;
      mandatoryPressMoved = false;
      mandatoryPressStartX = startX;
      mandatoryPressStartY = startY;

      card.classList.remove(
        "mandatory-payment-card--hold-pay",
        "mandatory-payment-card--hold-unpay"
      );

      window.clearTimeout(mandatoryLongPressVisualTimer);
      window.clearTimeout(mandatoryLongPressTimer);

      mandatoryLongPressVisualTimer = window.setTimeout(() => {
        if (mandatoryPressMoved) return;

        card.classList.add(
          isPaid
            ? "mandatory-payment-card--hold-unpay"
            : "mandatory-payment-card--hold-pay"
        );
      }, 200);

      mandatoryLongPressTimer = window.setTimeout(async () => {
        if (mandatoryPressMoved) return;

        mandatoryLongPressTriggered = true;
        await toggleMandatoryPaymentPaid(item.id);
      }, 1550);
    }

    function cancelMandatoryPaymentLongPress(card) {
      window.clearTimeout(mandatoryLongPressVisualTimer);
      window.clearTimeout(mandatoryLongPressTimer);

      mandatoryLongPressVisualTimer = null;
      mandatoryLongPressTimer = null;
      mandatoryPressMoved = false;

      if (card) {
        card.classList.remove(
          "mandatory-payment-card--hold-pay",
          "mandatory-payment-card--hold-unpay"
        );
      }
    }

    function bindMandatoryPaymentPress(card, item) {
      if (!card || !item) return;

      const cancelBecauseScroll = () => {
        mandatoryPressMoved = true;
        cancelMandatoryPaymentLongPress(card);
      };

      card.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });

      card.addEventListener("selectstart", (event) => {
        event.preventDefault();
      });

      card.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });

      card.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        stopNativeSelection();
        startMandatoryPaymentLongPress(card, item, event.clientX, event.clientY);
      });

      card.addEventListener("pointermove", (event) => {
        const dx = Math.abs(event.clientX - mandatoryPressStartX);
        const dy = Math.abs(event.clientY - mandatoryPressStartY);

        if (dx > 10 || dy > 10) {
          cancelBecauseScroll();
        }
      });

      card.addEventListener("pointerup", () => {
        stopNativeSelection();

        const triggered = mandatoryLongPressTriggered;
        const moved = mandatoryPressMoved;

        cancelMandatoryPaymentLongPress(card);

        if (!triggered && !moved) {
          openMandatoryPaymentEditor(item.id);
        }
      });

      card.addEventListener("pointerleave", () => {
        cancelBecauseScroll();
        stopNativeSelection();
      });

      card.addEventListener("pointercancel", () => {
        cancelBecauseScroll();
        stopNativeSelection();
      });
    }

    return {
      startMandatoryPaymentLongPress,
      cancelMandatoryPaymentLongPress,
      bindMandatoryPaymentPress,
    };
  }

  window.FinanceAppMandatoryPaymentLongPress = {
    create: createMandatoryPaymentLongPress,
  };
})();

// ===== js/16-mandatory-payment-crud.js =====
(() => {
  function createMandatoryPaymentCrud({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,
    roundToTwo,
    parseMoneyInputValue,
    getCurrentTime,
    getActiveMandatoryPaymentId,
    setActiveMandatoryPaymentId,
    getMandatoryPaymentsActiveMonthKey,
    getMandatoryPaymentPaidPeriods,
    isMandatoryPaymentPaidInMonth,
    setMandatoryPaymentPaidInMonth,
    buildMandatoryPaymentTransactionCreatedAt,
    getAccountById,
    isVaultAccountId,
    mandatoryPaymentTitleInput,
    mandatoryPaymentAmountInput,
    mandatoryPaymentDueDayInput,
    mandatoryPaymentCategorySelect,
    mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    onAfterTogglePaid,
    onAfterSave,
    onAfterDelete,
  }) {
    async function saveMandatoryPaymentsToMeta() {
      const { error } = await supabaseClient
        .from("app_meta")
        .upsert({
          key: "mandatory_payments",
          value: JSON.stringify(state.mandatoryPayments),
        });

      if (error) {
        alert(`Ошибка сохранения обязательных платежей: ${error.message || error}`);
        console.error(error);
        return false;
      }

      return true;
    }

    async function createMandatoryPaymentExpense(
      item,
      monthKey = getMandatoryPaymentsActiveMonthKey()
    ) {
      const accountId = item.linked_account_id || "";

      if (!accountId) {
        return true;
      }

      const account = getAccountById(accountId);

      if (!account) {
        return true;
      }

      if (isVaultAccountId(account.id) && !item.linked_safe_bucket_id) {
        alert("Для списания из накоплений нужно выбрать конкретное накопление");
        return false;
      }

      const transaction = {
        id: crypto.randomUUID(),
        type: "expense",
        title: item.title || "Календарный платёж",
        amount: roundToTwo(Number(item.amount) || 0),

        account_id: account.id,
        account: account.name,

        category_id: item.category_id || UNCATEGORIZED_ID,

        from_account_id: null,
        to_account_id: null,
        from_account: null,
        to_account: null,

        from_safe_bucket_id: isVaultAccountId(account.id)
          ? item.linked_safe_bucket_id || null
          : null,
        to_safe_bucket_id: null,

        created_at: buildMandatoryPaymentTransactionCreatedAt(),
        time_label: getCurrentTime(),
      };

      const { error } = await supabaseClient
        .from("transactions")
        .insert(transaction);

      if (error) {
        alert(`Ошибка списания обязательного платежа: ${error.message || error}`);
        console.error(error);
        return false;
      }

      return true;
    }

    async function toggleMandatoryPaymentPaid(paymentId) {
      const item = state.mandatoryPayments.find((entry) => entry.id === paymentId);
      if (!item) return false;

      const monthKey = getMandatoryPaymentsActiveMonthKey();
      const isPaid = isMandatoryPaymentPaidInMonth(item, monthKey);

      if (!isPaid) {
        const transactionOk = await createMandatoryPaymentExpense(item, monthKey);
        if (!transactionOk) return false;

        setMandatoryPaymentPaidInMonth(item, monthKey, true);
      } else {
        setMandatoryPaymentPaidInMonth(item, monthKey, false);
      }

      const ok = await saveMandatoryPaymentsToMeta();
      if (!ok) return false;

      await onAfterTogglePaid?.();

      return true;
    }

    async function saveMandatoryPayment() {
      const title = mandatoryPaymentTitleInput.value.trim();
      const amount = parseMoneyInputValue(mandatoryPaymentAmountInput.value);
      const dueDateValue = mandatoryPaymentDueDayInput.value;
      const categoryId = mandatoryPaymentCategorySelect?.value || "";
      const linkedAccountId = mandatoryPaymentAccountSelect?.value || "";
      const linkedSafeBucketId = mandatoryPaymentLinkedSafeSelect?.value || "";

      if (!title) {
        alert("Введи название платежа");
        return;
      }

      if (!amount || amount <= 0) {
        alert("Введи корректную сумму");
        return;
      }

      if (!dueDateValue) {
        alert("Выбери дату платежа");
        return;
      }

      if (!categoryId) {
        alert("Выбери категорию платежа");
        return;
      }

      if (isVaultAccountId(linkedAccountId) && !linkedSafeBucketId) {
        alert("Выбери накопление");
        return;
      }

      const dueDay = new Date(`${dueDateValue}T00:00:00`).getDate();
      const duePeriod = String(dueDateValue).slice(0, 7);
      const activeMandatoryPaymentId = getActiveMandatoryPaymentId();

      if (activeMandatoryPaymentId) {
        const target = state.mandatoryPayments.find(
          (entry) => entry.id === activeMandatoryPaymentId
        );

        if (!target) return;

        target.title = title;
        target.amount = roundToTwo(amount);
        target.due_day = dueDay;
        target.start_period = duePeriod;
        target.paid_periods = getMandatoryPaymentPaidPeriods(target).filter(
          (period) => period >= duePeriod
        );
        target.last_paid_period =
          target.paid_periods[target.paid_periods.length - 1] || "";
        target.linked_account_id = linkedAccountId;
        target.linked_safe_bucket_id = linkedSafeBucketId;
        target.category_id = categoryId;
      } else {
        state.mandatoryPayments.push({
          id: crypto.randomUUID(),
          title,
          amount: roundToTwo(amount),
          due_day: dueDay,
          start_period: duePeriod,
          paid_periods: [],
          linked_account_id: linkedAccountId,
          linked_safe_bucket_id: linkedSafeBucketId,
          category_id: categoryId,
          enabled: true,
          last_paid_period: "",
        });
      }

      const ok = await saveMandatoryPaymentsToMeta();
      if (!ok) return;

      await onAfterSave?.();
    }

    async function deleteMandatoryPaymentFromEditor() {
      const activeMandatoryPaymentId = getActiveMandatoryPaymentId();
      if (!activeMandatoryPaymentId) return;

      const target = state.mandatoryPayments.find(
        (entry) => entry.id === activeMandatoryPaymentId
      );

      if (!target) return;

      const ok = confirm(`Удалить обязательный платёж "${target.title}"?`);
      if (!ok) return;

      state.mandatoryPayments = state.mandatoryPayments.filter(
        (entry) => entry.id !== activeMandatoryPaymentId
      );

      setActiveMandatoryPaymentId(null);

      const saved = await saveMandatoryPaymentsToMeta();
      if (!saved) return;

      await onAfterDelete?.();
    }

    return {
      saveMandatoryPaymentsToMeta,
      createMandatoryPaymentExpense,
      toggleMandatoryPaymentPaid,
      saveMandatoryPayment,
      deleteMandatoryPaymentFromEditor,
    };
  }

  window.FinanceAppMandatoryPaymentCrud = {
    create: createMandatoryPaymentCrud,
  };
})();

// ===== js/17-mandatory-payment-modal-flow.js =====
(() => {
  function ensureMandatoryPaymentEditorDom() {
    if (!document.body) return false;

    const calendarModal = document.getElementById("mandatoryPaymentsModal");

    if (!document.getElementById("mandatoryPaymentEditorModal")) {
      const editorHtml = `
        <div class="modal hidden" id="mandatoryPaymentEditorModal" role="dialog" aria-modal="true" aria-label="Редактор календарного платежа">
          <div class="modal-sheet">
            <div class="modal-handle"></div>

            <div class="section-head">
              <h2 class="modal-title" id="mandatoryPaymentEditorTitle">Новый платёж</h2>

              <button
                class="manager-back-btn"
                type="button"
                id="closeMandatoryPaymentEditorModalBtn"
              >
                Закрыть
              </button>
            </div>

            <div class="manager-card">
              <div class="field">
                <input
                  class="input"
                  id="mandatoryPaymentTitleInput"
                  type="text"
                  placeholder="Название платежа"
                />
              </div>

              <div class="mandatory-payment-main-row">
                <div class="field mandatory-payment-main-row__field mandatory-payment-money-field">
                  <input
                    class="input mandatory-payment-money-input"
                    id="mandatoryPaymentAmountInput"
                    type="text"
                    inputmode="decimal"
                    placeholder="Сумма"
                  />
                  <span class="mandatory-payment-money-symbol">₽</span>
                </div>

                <div class="field mandatory-payment-main-row__field mandatory-payment-date-field">
                  <input
                    class="input"
                    id="mandatoryPaymentDueDayInput"
                    type="date"
                    required
                  />
                  <span class="mandatory-payment-date-placeholder">Дата платежа</span>
                </div>
              </div>

              <div class="field mandatory-payment-category-field">
                <select
                  class="select"
                  id="mandatoryPaymentCategorySelect"
                ></select>
              </div>

              <div class="field">
                <select
                  class="select"
                  id="mandatoryPaymentAccountSelect"
                ></select>
              </div>

              <div class="field hidden" id="mandatoryPaymentLinkedSafeField">
                <select
                  class="select hidden"
                  id="mandatoryPaymentLinkedSafeSelect"
                ></select>

                <button
                  class="mandatory-linked-safe-btn"
                  type="button"
                  id="openMandatoryPaymentBucketPickerBtn"
                >
                  Выбрать накопление
                </button>
              </div>

              <div class="modal-actions mandatory-editor-actions">
                <button
                  class="btn btn-primary"
                  type="button"
                  id="addMandatoryPaymentBtn"
                >
                  Добавить платёж
                </button>

                <button
                  class="btn btn-danger hidden"
                  type="button"
                  id="deleteMandatoryPaymentBtn"
                >
                  Удалить платёж
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      if (calendarModal) {
        calendarModal.insertAdjacentHTML("afterend", editorHtml);
      } else {
        document.body.insertAdjacentHTML("beforeend", editorHtml);
      }
    }

    if (!document.getElementById("mandatoryPaymentBucketPickerModal")) {
      const bucketPickerHtml = `
        <div class="modal hidden" id="mandatoryPaymentBucketPickerModal" role="dialog" aria-modal="true" aria-label="Выбор накопления">
          <div class="modal-sheet">
            <div class="modal-handle"></div>

            <div class="section-head">
              <h2 class="modal-title">Выбрать накопление</h2>

              <button
                class="manager-back-btn"
                type="button"
                id="closeMandatoryPaymentBucketPickerModalBtn"
              >
                Закрыть
              </button>
            </div>

            <div class="list" id="mandatoryPaymentBucketPickerList"></div>
          </div>
        </div>
      `;

      const editorModal = document.getElementById("mandatoryPaymentEditorModal");

      if (editorModal) {
        editorModal.insertAdjacentHTML("afterend", bucketPickerHtml);
      } else if (calendarModal) {
        calendarModal.insertAdjacentHTML("afterend", bucketPickerHtml);
      } else {
        document.body.insertAdjacentHTML("beforeend", bucketPickerHtml);
      }
    }

    return true;
  }

  if (!ensureMandatoryPaymentEditorDom()) {
    document.addEventListener("DOMContentLoaded", ensureMandatoryPaymentEditorDom, {
      once: true,
    });
  }

  function createMandatoryPaymentModalFlow({
    state,
    getActiveMandatoryPaymentId,
    setActiveMandatoryPaymentId,
    getSelectedMonth,
    setSelectedMonth,
    getCurrentMonthValue,
    getMandatoryPaymentsActiveMonthKey,
    buildDateFromDueDay,
    getSafeBucketName,

    mandatoryPaymentsModal,
    openMandatoryPaymentsModalBtn,
    closeMandatoryPaymentsModalBtn,

    mandatoryPaymentEditorModal,
    openMandatoryPaymentEditorBtn,
    closeMandatoryPaymentEditorModalBtn,

    mandatoryPaymentBucketPickerModal,
    closeMandatoryPaymentBucketPickerModalBtn,

    mandatoryPaymentEditorTitle,
    mandatoryPaymentTitleInput,
    mandatoryPaymentAmountInput,
    mandatoryPaymentDueDayInput,
    mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    openMandatoryPaymentBucketPickerBtn,
    addMandatoryPaymentBtn,
    deleteMandatoryPaymentBtn,

    fillMandatoryPaymentAccountSelect,
    fillMandatoryPaymentSafeSelect,
    syncMandatoryPaymentLinkedSafeField,

    openAnimatedModal,
    closeAnimatedModal,

    renderMonthStrip,
    renderModal,
  }) {
    ensureMandatoryPaymentEditorDom();

    function getEl(id, fallback = null) {
      return document.getElementById(id) || fallback || null;
    }

    function getCalendarModal() {
      return getEl("mandatoryPaymentsModal", mandatoryPaymentsModal);
    }

    function getCalendarOpenBtn() {
      return getEl("openMandatoryPaymentsModalBtn", openMandatoryPaymentsModalBtn);
    }

    function getCalendarCloseBtn() {
      return getEl("closeMandatoryPaymentsModalBtn", closeMandatoryPaymentsModalBtn);
    }

    function getEditorModal() {
      return getEl("mandatoryPaymentEditorModal", mandatoryPaymentEditorModal);
    }

    function getEditorOpenBtn() {
      return getEl("openMandatoryPaymentEditorBtn", openMandatoryPaymentEditorBtn);
    }

    function getEditorCloseBtn() {
      return getEl("closeMandatoryPaymentEditorModalBtn", closeMandatoryPaymentEditorModalBtn);
    }

    function getBucketPickerModal() {
      return getEl("mandatoryPaymentBucketPickerModal", mandatoryPaymentBucketPickerModal);
    }

    function getBucketPickerCloseBtn() {
      return getEl("closeMandatoryPaymentBucketPickerModalBtn", closeMandatoryPaymentBucketPickerModalBtn);
    }

    function getTitleInput() {
      return getEl("mandatoryPaymentTitleInput", mandatoryPaymentTitleInput);
    }

    function getAmountInput() {
      return getEl("mandatoryPaymentAmountInput", mandatoryPaymentAmountInput);
    }

    function getDueDayInput() {
      return getEl("mandatoryPaymentDueDayInput", mandatoryPaymentDueDayInput);
    }

    function getAccountSelect() {
      return getEl("mandatoryPaymentAccountSelect", mandatoryPaymentAccountSelect);
    }

    function getLinkedSafeSelect() {
      return getEl("mandatoryPaymentLinkedSafeSelect", mandatoryPaymentLinkedSafeSelect);
    }

    function getEditorTitle() {
      return getEl("mandatoryPaymentEditorTitle", mandatoryPaymentEditorTitle);
    }

    function getSaveBtn() {
      return getEl("addMandatoryPaymentBtn", addMandatoryPaymentBtn);
    }

    function getDeleteBtn() {
      return getEl("deleteMandatoryPaymentBtn", deleteMandatoryPaymentBtn);
    }

    function getBucketPickerBtn() {
      return getEl("openMandatoryPaymentBucketPickerBtn", openMandatoryPaymentBucketPickerBtn);
    }

    function isModalOpen(modal) {
      return Boolean(
        modal &&
        !modal.classList.contains("hidden") &&
        !modal.classList.contains("is-closing")
      );
    }

    function forceUnlockBodyScroll() {
      window.FinanceAppModalCore?.forceUnlockBodyScroll?.();

      document.documentElement.classList.remove("modal-scroll-locked");
      document.body.classList.remove("modal-scroll-locked");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    }

    function closeModalIfOpen(modal) {
      if (!isModalOpen(modal)) return;
      closeAnimatedModal(modal);
    }

    function resetMandatoryPaymentForm() {
      setActiveMandatoryPaymentId(null);

      const titleInput = getTitleInput();
      const amountInput = getAmountInput();
      const dueDayInput = getDueDayInput();
      const accountSelect = getAccountSelect();
      const linkedSafeSelect = getLinkedSafeSelect();
      const editorTitle = getEditorTitle();
      const saveBtn = getSaveBtn();
      const deleteBtn = getDeleteBtn();
      const bucketPickerBtn = getBucketPickerBtn();

      if (titleInput) titleInput.value = "";
      if (amountInput) amountInput.value = "";
      if (dueDayInput) dueDayInput.value = "";
      if (accountSelect) accountSelect.value = "";
      if (linkedSafeSelect) linkedSafeSelect.value = "";

      fillMandatoryPaymentAccountSelect?.("");
      fillMandatoryPaymentSafeSelect?.("");

      if (editorTitle) {
        editorTitle.textContent = "Новый платёж";
      }

      if (saveBtn) {
        saveBtn.textContent = "Добавить платёж";
      }

      if (bucketPickerBtn) {
        bucketPickerBtn.textContent = "Выбрать накопление";
      }

      syncMandatoryPaymentLinkedSafeField?.();
      deleteBtn?.classList.add("hidden");
    }

    function openMandatoryPaymentEditorModal() {
      ensureMandatoryPaymentEditorDom();

      const editorModal = getEditorModal();

      if (!editorModal) {
        console.error("mandatoryPaymentEditorModal not found");
        return;
      }

      editorModal.classList.add("modal");
      openAnimatedModal(editorModal);
    }

    function closeMandatoryPaymentEditorModal() {
      closeModalIfOpen(getBucketPickerModal());
      closeModalIfOpen(getEditorModal());
      resetMandatoryPaymentForm();
    }

    function openNewMandatoryPaymentEditor() {
      resetMandatoryPaymentForm();
      openMandatoryPaymentEditorModal();
    }

    function openMandatoryPaymentEditor(paymentId) {
      const item = state.mandatoryPayments.find((entry) => {
        return String(entry.id) === String(paymentId);
      });

      if (!item) {
        console.error("Mandatory payment not found for edit:", paymentId);
        return;
      }

      setActiveMandatoryPaymentId(item.id);

      const titleInput = getTitleInput();
      const amountInput = getAmountInput();
      const dueDayInput = getDueDayInput();
      const accountSelect = getAccountSelect();
      const linkedSafeSelect = getLinkedSafeSelect();
      const editorTitle = getEditorTitle();
      const saveBtn = getSaveBtn();
      const deleteBtn = getDeleteBtn();
      const bucketPickerBtn = getBucketPickerBtn();

      if (titleInput) {
        titleInput.value = item.title || "";
      }

      if (amountInput) {
        amountInput.value = String(Number(item.amount) || 0).replace(".", ",");
      }

      if (dueDayInput) {
        dueDayInput.value = buildDateFromDueDay(
          item.due_day,
          item.start_period || getMandatoryPaymentsActiveMonthKey()
        );
      }

      fillMandatoryPaymentAccountSelect?.(item.linked_account_id || "");
      fillMandatoryPaymentSafeSelect?.(item.linked_safe_bucket_id || "");

      if (accountSelect) {
        accountSelect.value = item.linked_account_id || "";
      }

      if (linkedSafeSelect) {
        linkedSafeSelect.value = item.linked_safe_bucket_id || "";
      }

      syncMandatoryPaymentLinkedSafeField?.();

      if (bucketPickerBtn) {
        bucketPickerBtn.textContent =
          getSafeBucketName(item.linked_safe_bucket_id || "") || "Выбрать накопление";
      }

      if (editorTitle) {
        editorTitle.textContent = "Редактирование платежа";
      }

      if (saveBtn) {
        saveBtn.textContent = "Сохранить платёж";
      }

      deleteBtn?.classList.remove("hidden");

      openMandatoryPaymentEditorModal();
    }

    function renderMandatoryPaymentsContent() {
      try {
        renderMonthStrip?.();
      } catch (error) {
        console.error("renderMandatoryPaymentsMonthStrip failed:", error);
      }

      try {
        renderModal?.();
      } catch (error) {
        console.error("renderMandatoryPaymentsModal failed:", error);
      }
    }

    function openMandatoryPaymentsModal() {
      const modal = getCalendarModal();

      if (!modal) {
        console.error("mandatoryPaymentsModal not found");
        forceUnlockBodyScroll();
        return;
      }

      modal.classList.add("modal");

      setSelectedMonth(getSelectedMonth() || getCurrentMonthValue());
      renderMandatoryPaymentsContent();
      bindPaymentCardEditOpen();

      openAnimatedModal(modal);
    }

    function closeMandatoryPaymentsModal() {
      closeModalIfOpen(getBucketPickerModal());
      closeModalIfOpen(getEditorModal());
      closeModalIfOpen(getCalendarModal());

      resetMandatoryPaymentForm();
    }

    function bindButton(button, key, handler) {
      if (!button) return;

      const flag = `mandatoryPaymentFlowBound${key}`;
      if (button.dataset[flag] === "true") return;

      button.dataset[flag] = "true";

      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        handler();
      }, true);
    }

    function bindMandatoryPaymentFlowButtons() {
      bindButton(getCalendarOpenBtn(), "OpenCalendar", openMandatoryPaymentsModal);
      bindButton(getCalendarCloseBtn(), "CloseCalendar", closeMandatoryPaymentsModal);
      bindButton(getEditorOpenBtn(), "OpenEditor", openNewMandatoryPaymentEditor);
      bindButton(getEditorCloseBtn(), "CloseEditor", closeMandatoryPaymentEditorModal);

      bindButton(
        getBucketPickerCloseBtn(),
        "CloseBucketPicker",
        () => closeModalIfOpen(getBucketPickerModal())
      );
    }

    function bindModalBackdropClose() {
      const modal = getCalendarModal();
      if (!modal) return;

      if (modal.dataset.mandatoryBackdropBound === "true") return;
      modal.dataset.mandatoryBackdropBound = "true";

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeMandatoryPaymentsModal();
        }
      });
    }

    function bindPaymentCardEditOpen() {
      const list = document.getElementById("mandatoryPaymentsList");
      if (!list) return;

      if (list.dataset.mandatoryEditBound === "true") return;
      list.dataset.mandatoryEditBound = "true";

      list.addEventListener("click", (event) => {
        const card = event.target.closest(
          "[data-payment-id], [data-id], [data-mandatory-id], [data-mandatory-payment-id], .mandatory-payment-card"
        );

        if (!card || !list.contains(card)) return;

        const paymentId =
          card.dataset.paymentId ||
          card.dataset.mandatoryId ||
          card.dataset.id ||
          card.dataset.mandatoryPaymentId;

        if (!paymentId) {
          console.error("Mandatory payment card has no id dataset:", card);
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        openMandatoryPaymentEditor(paymentId);
      }, true);
    }

    bindMandatoryPaymentFlowButtons();
    bindModalBackdropClose();
    bindPaymentCardEditOpen();

    return {
      resetMandatoryPaymentForm,
      openMandatoryPaymentEditorModal,
      closeMandatoryPaymentEditorModal,
      openNewMandatoryPaymentEditor,
      openMandatoryPaymentEditor,
      closeMandatoryPaymentsModal,
      openMandatoryPaymentsModal,
    };
  }

  window.FinanceAppMandatoryPaymentModalFlow = {
    create: createMandatoryPaymentModalFlow,
  };
})();

// ===== js/18-native-picker.js =====
(() => {
  function setNativePickerVisibility(input, visible) {
    if (!input) return;

    if (visible) {
      input.classList.remove("hidden");
      input.style.display = "block";
      input.style.width = "100%";
      input.style.minWidth = "0";
      input.style.maxWidth = "100%";
      input.style.height = "48px";
      input.style.padding = "0 16px";
      input.style.border = "1px solid rgba(255,255,255,0.08)";
      input.style.borderRadius = "18px";
      input.style.background = "rgba(255,255,255,0.06)";
      input.style.color = "#f3f4f8";
      input.style.opacity = "1";
      input.style.pointerEvents = "auto";
      input.style.position = "static";
      input.style.left = "auto";
    } else {
      input.classList.add("hidden");
      input.style.display = "";
      input.style.width = "";
      input.style.minWidth = "";
      input.style.maxWidth = "";
      input.style.height = "";
      input.style.padding = "";
      input.style.border = "";
      input.style.borderRadius = "";
      input.style.background = "";
      input.style.color = "";
      input.style.opacity = "";
      input.style.pointerEvents = "";
      input.style.position = "";
      input.style.left = "";
    }
  }

  function openNativePicker(input) {
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  }

  window.FinanceAppNativePicker = {
    setNativePickerVisibility,
    openNativePicker,
  };
})();
