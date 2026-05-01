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

      window.setTimeout(() => {
        forceUnlockBodyScroll();
      }, (window.FinanceAppModalCore?.MODAL_ANIMATION_MS || 440) + 40);
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