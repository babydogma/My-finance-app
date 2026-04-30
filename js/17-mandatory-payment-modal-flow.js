(() => {
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
    function isModalOpen(modal) {
      return Boolean(
        modal &&
        !modal.classList.contains("hidden") &&
        !modal.classList.contains("is-closing")
      );
    }

    function closeModalIfOpen(modal) {
      if (!isModalOpen(modal)) return;
      closeAnimatedModal(modal);
    }

    function resetMandatoryPaymentForm() {
      setActiveMandatoryPaymentId(null);

      if (mandatoryPaymentTitleInput) mandatoryPaymentTitleInput.value = "";
      if (mandatoryPaymentAmountInput) mandatoryPaymentAmountInput.value = "";
      if (mandatoryPaymentDueDayInput) mandatoryPaymentDueDayInput.value = "";
      if (mandatoryPaymentAccountSelect) mandatoryPaymentAccountSelect.value = "";
      if (mandatoryPaymentLinkedSafeSelect) mandatoryPaymentLinkedSafeSelect.value = "";

      fillMandatoryPaymentAccountSelect("");
      fillMandatoryPaymentSafeSelect("");

      if (mandatoryPaymentEditorTitle) {
        mandatoryPaymentEditorTitle.textContent = "Новый платёж";
      }

      if (addMandatoryPaymentBtn) {
        addMandatoryPaymentBtn.textContent = "Добавить платёж";
      }

      if (openMandatoryPaymentBucketPickerBtn) {
        openMandatoryPaymentBucketPickerBtn.textContent = "Выбрать накопление";
      }

      syncMandatoryPaymentLinkedSafeField();
      deleteMandatoryPaymentBtn?.classList.add("hidden");
    }

    function openMandatoryPaymentEditorModal() {
      openAnimatedModal(mandatoryPaymentEditorModal);
    }

    function closeMandatoryPaymentEditorModal() {
      closeModalIfOpen(mandatoryPaymentBucketPickerModal);
      closeModalIfOpen(mandatoryPaymentEditorModal);

      resetMandatoryPaymentForm();
    }

    function openNewMandatoryPaymentEditor() {
      resetMandatoryPaymentForm();
      openMandatoryPaymentEditorModal();
    }

    function openMandatoryPaymentEditor(paymentId) {
      const item = state.mandatoryPayments.find((entry) => entry.id === paymentId);
      if (!item) return;

      setActiveMandatoryPaymentId(paymentId);

      if (mandatoryPaymentTitleInput) {
        mandatoryPaymentTitleInput.value = item.title || "";
      }

      if (mandatoryPaymentAmountInput) {
        mandatoryPaymentAmountInput.value = String(Number(item.amount) || 0).replace(".", ",");
      }

      if (mandatoryPaymentDueDayInput) {
        mandatoryPaymentDueDayInput.value = buildDateFromDueDay(
          item.due_day,
          item.start_period || getMandatoryPaymentsActiveMonthKey()
        );
      }

      fillMandatoryPaymentAccountSelect(item.linked_account_id || "");
      fillMandatoryPaymentSafeSelect(item.linked_safe_bucket_id || "");

      if (mandatoryPaymentAccountSelect) {
        mandatoryPaymentAccountSelect.value = item.linked_account_id || "";
      }

      if (mandatoryPaymentLinkedSafeSelect) {
        mandatoryPaymentLinkedSafeSelect.value = item.linked_safe_bucket_id || "";
      }

      syncMandatoryPaymentLinkedSafeField();

      if (openMandatoryPaymentBucketPickerBtn) {
        openMandatoryPaymentBucketPickerBtn.textContent =
          getSafeBucketName(item.linked_safe_bucket_id || "") || "Выбрать накопление";
      }

      if (mandatoryPaymentEditorTitle) {
        mandatoryPaymentEditorTitle.textContent = "Редактирование платежа";
      }

      if (addMandatoryPaymentBtn) {
        addMandatoryPaymentBtn.textContent = "Сохранить платёж";
      }

      deleteMandatoryPaymentBtn?.classList.remove("hidden");

      openMandatoryPaymentEditorModal();
    }

    function closeMandatoryPaymentsModal() {
      closeModalIfOpen(mandatoryPaymentBucketPickerModal);
      closeModalIfOpen(mandatoryPaymentEditorModal);
      closeModalIfOpen(mandatoryPaymentsModal);

      window.setTimeout(() => {
        if (
          !isModalOpen(mandatoryPaymentsModal) &&
          !isModalOpen(mandatoryPaymentEditorModal) &&
          !isModalOpen(mandatoryPaymentBucketPickerModal)
        ) {
          window.FinanceAppModalCore?.forceUnlockBodyScroll?.();
        }
      }, window.FinanceAppModalCore?.MODAL_ANIMATION_MS + 60 || 520);

      resetMandatoryPaymentForm();
    }

    function openMandatoryPaymentsModal() {
      setSelectedMonth(getSelectedMonth() || getCurrentMonthValue());

      renderMonthStrip();
      renderModal();

      openAnimatedModal(mandatoryPaymentsModal);
    }
    
    function bindFlowButton(button, key, handler) {
  if (!button) return;

  const flag = `mandatoryFlowBound${key}`;

  if (button.dataset[flag] === "true") return;

  button.dataset[flag] = "true";

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    handler();
  });
}

function bindMandatoryPaymentFlowButtons() {
  bindFlowButton(
    openMandatoryPaymentsModalBtn,
    "OpenCalendar",
    openMandatoryPaymentsModal
  );

  bindFlowButton(
    closeMandatoryPaymentsModalBtn,
    "CloseCalendar",
    closeMandatoryPaymentsModal
  );

  bindFlowButton(
    openMandatoryPaymentEditorBtn,
    "OpenEditor",
    openNewMandatoryPaymentEditor
  );

  bindFlowButton(
    closeMandatoryPaymentEditorModalBtn,
    "CloseEditor",
    closeMandatoryPaymentEditorModal
  );

  bindFlowButton(
    closeMandatoryPaymentBucketPickerModalBtn,
    "CloseBucketPicker",
    () => closeModalIfOpen(mandatoryPaymentBucketPickerModal)
  );
}

bindMandatoryPaymentFlowButtons();

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