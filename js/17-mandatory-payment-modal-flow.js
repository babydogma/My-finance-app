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
    mandatoryPaymentEditorModal,
    mandatoryPaymentBucketPickerModal,

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
    function isModalActuallyOpen(modal) {
      return Boolean(
        modal &&
        !modal.classList.contains("hidden") &&
        (
          modal.classList.contains("is-visible") ||
          modal.classList.contains("is-closing")
        )
      );
    }

    function setPageScrollLocked(isLocked) {
  document.documentElement.classList.remove("modal-scroll-locked");
  document.body.classList.remove("modal-scroll-locked");

  document.documentElement.style.overflow = isLocked ? "hidden" : "";
  document.body.style.overflow = isLocked ? "hidden" : "";

  document.documentElement.style.touchAction = "";
  document.body.style.touchAction = "";
}

    function shouldKeepScrollLockedAfterEditorClose() {
      return isModalActuallyOpen(mandatoryPaymentsModal);
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
      setPageScrollLocked(true);
      openAnimatedModal(mandatoryPaymentEditorModal);
    }

    function closeMandatoryPaymentEditorModal() {
      closeAnimatedModal(mandatoryPaymentBucketPickerModal, {
        keepBodyLocked: true,
      });

      const keepLocked = shouldKeepScrollLockedAfterEditorClose();

      closeAnimatedModal(mandatoryPaymentEditorModal, {
        keepBodyLocked: keepLocked,
      });

      window.setTimeout(() => {
        setPageScrollLocked(shouldKeepScrollLockedAfterEditorClose());
      }, 320);

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

      window.setTimeout(() => {
        mandatoryPaymentTitleInput?.focus();
      }, 80);
    }

    function closeMandatoryPaymentsModal() {
      closeAnimatedModal(mandatoryPaymentBucketPickerModal, {
        keepBodyLocked: true,
      });

      closeAnimatedModal(mandatoryPaymentEditorModal, {
        keepBodyLocked: true,
      });

      closeAnimatedModal(mandatoryPaymentsModal);

      window.setTimeout(() => {
  setPageScrollLocked(false);

  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
  document.documentElement.style.removeProperty("touch-action");
  document.body.style.removeProperty("touch-action");

  document.documentElement.classList.remove("modal-scroll-locked");
  document.body.classList.remove("modal-scroll-locked");
}, 340);

      resetMandatoryPaymentForm();
    }

    function openMandatoryPaymentsModal() {
      setSelectedMonth(getSelectedMonth() || getCurrentMonthValue());

      renderMonthStrip();
      renderModal();

      setPageScrollLocked(true);
      openAnimatedModal(mandatoryPaymentsModal);
    }

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