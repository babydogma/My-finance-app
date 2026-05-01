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
    function getCalendarModal() {
      return document.getElementById("mandatoryPaymentsModal") || mandatoryPaymentsModal;
    }

    function getCalendarOpenBtn() {
      return document.getElementById("openMandatoryPaymentsModalBtn") || openMandatoryPaymentsModalBtn;
    }

    function getCalendarCloseBtn() {
      return document.getElementById("closeMandatoryPaymentsModalBtn") || closeMandatoryPaymentsModalBtn;
    }

    function getEditorOpenBtn() {
      return document.getElementById("openMandatoryPaymentEditorBtn") || openMandatoryPaymentEditorBtn;
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

      if (mandatoryPaymentTitleInput) mandatoryPaymentTitleInput.value = "";
      if (mandatoryPaymentAmountInput) mandatoryPaymentAmountInput.value = "";
      if (mandatoryPaymentDueDayInput) mandatoryPaymentDueDayInput.value = "";
      if (mandatoryPaymentAccountSelect) mandatoryPaymentAccountSelect.value = "";
      if (mandatoryPaymentLinkedSafeSelect) mandatoryPaymentLinkedSafeSelect.value = "";

      fillMandatoryPaymentAccountSelect?.("");
      fillMandatoryPaymentSafeSelect?.("");

      if (mandatoryPaymentEditorTitle) {
        mandatoryPaymentEditorTitle.textContent = "Новый платёж";
      }

      if (addMandatoryPaymentBtn) {
        addMandatoryPaymentBtn.textContent = "Добавить платёж";
      }

      if (openMandatoryPaymentBucketPickerBtn) {
        openMandatoryPaymentBucketPickerBtn.textContent = "Выбрать накопление";
      }

      syncMandatoryPaymentLinkedSafeField?.();
      deleteMandatoryPaymentBtn?.classList.add("hidden");
    }

    function openMandatoryPaymentEditorModal() {
      if (!mandatoryPaymentEditorModal) return;
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

      fillMandatoryPaymentAccountSelect?.(item.linked_account_id || "");
      fillMandatoryPaymentSafeSelect?.(item.linked_safe_bucket_id || "");

      if (mandatoryPaymentAccountSelect) {
        mandatoryPaymentAccountSelect.value = item.linked_account_id || "";
      }

      if (mandatoryPaymentLinkedSafeSelect) {
        mandatoryPaymentLinkedSafeSelect.value = item.linked_safe_bucket_id || "";
      }

      syncMandatoryPaymentLinkedSafeField?.();

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

      openAnimatedModal(modal);
    }

    function closeMandatoryPaymentsModal() {
      closeModalIfOpen(mandatoryPaymentBucketPickerModal);
      closeModalIfOpen(mandatoryPaymentEditorModal);
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
      });
    }

    function bindMandatoryPaymentFlowButtons() {
      bindButton(getCalendarOpenBtn(), "OpenCalendar", openMandatoryPaymentsModal);
      bindButton(getCalendarCloseBtn(), "CloseCalendar", closeMandatoryPaymentsModal);
      bindButton(getEditorOpenBtn(), "OpenEditor", openNewMandatoryPaymentEditor);
      bindButton(closeMandatoryPaymentEditorModalBtn, "CloseEditor", closeMandatoryPaymentEditorModal);

      bindButton(
        closeMandatoryPaymentBucketPickerModalBtn,
        "CloseBucketPicker",
        () => closeModalIfOpen(mandatoryPaymentBucketPickerModal)
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

    bindMandatoryPaymentFlowButtons();
    bindModalBackdropClose();

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