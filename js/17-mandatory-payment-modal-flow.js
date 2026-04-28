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
    let savedPageScrollY = 0;
    let isPageScrollLocked = false;

    function lockPageScroll() {
      if (isPageScrollLocked) return;

      savedPageScrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      isPageScrollLocked = true;

      document.documentElement.classList.add("modal-scroll-locked");
      document.body.classList.add("modal-scroll-locked");

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedPageScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      document.documentElement.style.removeProperty("touch-action");
      document.body.style.removeProperty("touch-action");
    }

    function unlockPageScroll() {
      if (!isPageScrollLocked) {
        forceUnlockPageScroll();
        return;
      }

      const scrollY = savedPageScrollY;

      isPageScrollLocked = false;
      savedPageScrollY = 0;

      forceUnlockPageScroll();

      window.scrollTo(0, scrollY);
    }

    function forceUnlockPageScroll() {
      document.documentElement.classList.remove("modal-scroll-locked");
      document.body.classList.remove("modal-scroll-locked");

      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("left");
      document.body.style.removeProperty("right");
      document.body.style.removeProperty("width");
      document.documentElement.style.removeProperty("touch-action");
      document.body.style.removeProperty("touch-action");
    }

    function hardHideModal(modal) {
      if (!modal) return;

      modal.classList.add("hidden");
      modal.classList.remove("is-visible");
      modal.classList.remove("is-closing");
    }

    function isModalOpen(modal) {
      return Boolean(
        modal &&
        !modal.classList.contains("hidden") &&
        !modal.classList.contains("is-closing")
      );
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
      lockPageScroll();
      openAnimatedModal(mandatoryPaymentEditorModal);
    }

    function closeMandatoryPaymentEditorModal() {
      closeAnimatedModal(mandatoryPaymentBucketPickerModal, {
        keepBodyLocked: true,
      });

      closeAnimatedModal(mandatoryPaymentEditorModal, {
        keepBodyLocked: true,
      });

      window.setTimeout(() => {
        hardHideModal(mandatoryPaymentBucketPickerModal);
        hardHideModal(mandatoryPaymentEditorModal);

        if (isModalOpen(mandatoryPaymentsModal)) {
          lockPageScroll();
        } else {
          unlockPageScroll();
        }
      }, 340);

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
      closeAnimatedModal(mandatoryPaymentBucketPickerModal, {
        keepBodyLocked: true,
      });

      closeAnimatedModal(mandatoryPaymentEditorModal, {
        keepBodyLocked: true,
      });

      closeAnimatedModal(mandatoryPaymentsModal, {
        keepBodyLocked: false,
      });

      window.setTimeout(() => {
        hardHideModal(mandatoryPaymentBucketPickerModal);
        hardHideModal(mandatoryPaymentEditorModal);
        hardHideModal(mandatoryPaymentsModal);

        unlockPageScroll();
      }, 360);

      resetMandatoryPaymentForm();
    }

    function openMandatoryPaymentsModal() {
      setSelectedMonth(getSelectedMonth() || getCurrentMonthValue());

      renderMonthStrip();
      renderModal();

      lockPageScroll();
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