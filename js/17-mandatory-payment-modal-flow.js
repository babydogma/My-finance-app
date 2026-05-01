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
    let calendarModalEl = mandatoryPaymentsModal;
    let calendarCloseBtn = closeMandatoryPaymentsModalBtn;
    let calendarEditorBtn = openMandatoryPaymentEditorBtn;
    let calendarListEl = document.getElementById("mandatoryPaymentsList");
    let calendarMonthStripEl = document.getElementById("mandatoryPaymentsMonthStrip");
    let calendarCloseTimer = null;

    function isModalOpen(modal) {
      return Boolean(
        modal &&
        !modal.classList.contains("hidden") &&
        !modal.classList.contains("is-closing")
      );
    }

    function forceUnlockPageScroll() {
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

    function getCalendarModal() {
      calendarModalEl = document.getElementById("mandatoryPaymentsModal") || calendarModalEl;
      return calendarModalEl;
    }

    function getCalendarCloseButton() {
      calendarCloseBtn = document.getElementById("closeMandatoryPaymentsModalBtn") || calendarCloseBtn;
      return calendarCloseBtn;
    }

    function getCalendarEditorButton() {
      calendarEditorBtn = document.getElementById("openMandatoryPaymentEditorBtn") || calendarEditorBtn;
      return calendarEditorBtn;
    }

    function getCalendarList() {
      calendarListEl = document.getElementById("mandatoryPaymentsList") || calendarListEl;
      return calendarListEl;
    }

    function getCalendarMonthStrip() {
      calendarMonthStripEl = document.getElementById("mandatoryPaymentsMonthStrip") || calendarMonthStripEl;
      return calendarMonthStripEl;
    }

    function formatMoneyLocal(value) {
      const number = Math.round((Number(value) || 0) * 100) / 100;

      return new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: number % 1 === 0 ? 0 : 2,
      }).format(number) + " ₽";
    }

    function escapeHtmlLocal(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function createFallbackCalendarModal() {
      let modal = document.getElementById("mandatoryPaymentsModal");

      if (!modal) {
        modal = document.createElement("div");
        modal.id = "mandatoryPaymentsModal";
        document.body.appendChild(modal);
      }

      modal.classList.add("modal", "hidden");
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Календарные платежи");

      if (!modal.querySelector(".modal-sheet")) {
        modal.innerHTML = `
          <div class="modal-sheet mandatory-payments-sheet--premium">
            <div class="modal-handle"></div>

            <div class="mandatory-payments-head">
              <div class="mandatory-payments-head__text">
                <h2 class="mandatory-payments-title">Календарные платежи</h2>
                <p class="mandatory-payments-subtitle">
                  Платежи, которые нужно держать под контролем каждый месяц.
                </p>
              </div>

              <button
                class="icon-action-btn mandatory-payments-close-btn"
                type="button"
                id="closeMandatoryPaymentsModalBtn"
                aria-label="Закрыть календарные платежи"
              >
                ×
              </button>
            </div>

            <div class="mandatory-payments-month-strip" id="mandatoryPaymentsMonthStrip"></div>

            <div class="mandatory-payments-panel">
              <div class="list" id="mandatoryPaymentsList"></div>
            </div>

            <button class="mandatory-payments-add-btn" type="button" id="openMandatoryPaymentEditorBtn">
              <span>+</span>
              <strong>Добавить платёж</strong>
            </button>
          </div>
        `;
      }

      calendarModalEl = modal;
      calendarCloseBtn = document.getElementById("closeMandatoryPaymentsModalBtn");
      calendarEditorBtn = document.getElementById("openMandatoryPaymentEditorBtn");
      calendarListEl = document.getElementById("mandatoryPaymentsList");
      calendarMonthStripEl = document.getElementById("mandatoryPaymentsMonthStrip");

      return modal;
    }

    function ensureCalendarModal() {
      const modal = getCalendarModal() || createFallbackCalendarModal();

      modal.classList.add("modal");
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");

      if (!modal.querySelector(".modal-sheet")) {
        return createFallbackCalendarModal();
      }

      getCalendarCloseButton();
      getCalendarEditorButton();
      getCalendarList();
      getCalendarMonthStrip();

      return modal;
    }

    function renderFallbackMonthStrip() {
      const strip = getCalendarMonthStrip();
      if (!strip) return;

      const currentMonth = getSelectedMonth() || getCurrentMonthValue();
      const [yearRaw, monthRaw] = String(currentMonth).split("-");
      const year = Number(yearRaw) || new Date().getFullYear();
      const monthIndex = Math.max(0, Math.min(11, (Number(monthRaw) || new Date().getMonth() + 1) - 1));
      const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

      strip.innerHTML = monthNames.map((name, index) => {
        const monthKey = `${year}-${String(index + 1).padStart(2, "0")}`;
        const activeClass = index === monthIndex ? " is-active" : "";

        return `
          <button class="mandatory-payments-month-chip${activeClass}" type="button" data-month-key="${monthKey}">
            ${name}
            <small>${year}</small>
          </button>
        `;
      }).join("");

      strip.querySelectorAll("[data-month-key]").forEach((button) => {
        button.addEventListener("click", () => {
          setSelectedMonth(button.dataset.monthKey || getCurrentMonthValue());
          renderCalendarContent();
        });
      });
    }

    function renderFallbackList() {
      const list = getCalendarList();
      if (!list) return;

      const payments = Array.isArray(state?.mandatoryPayments) ? state.mandatoryPayments : [];

      if (!payments.length) {
        list.innerHTML = `
          <div class="list-card">
            <div class="list-body">
              <div class="list-title-row">
                <h3 class="list-title">Платежей пока нет</h3>
              </div>
              <p class="list-subtitle">Нажми «Добавить платёж», чтобы создать первый.</p>
            </div>
          </div>
        `;
        return;
      }

      list.innerHTML = payments.map((item) => {
        const title = escapeHtmlLocal(item.title || "Платёж");
        const amount = formatMoneyLocal(item.amount);
        const safeName = getSafeBucketName(item.linked_safe_bucket_id || "") || "Без накопления";
        const day = Number(item.due_day) || "—";

        return `
          <button class="mandatory-payment-card" type="button" data-payment-id="${escapeHtmlLocal(item.id)}" data-paid="false">
            <div class="list-body">
              <div class="list-title-row">
                <h3 class="list-title">${title}</h3>
              </div>
              <p class="list-subtitle">до ${day} числа · ${escapeHtmlLocal(safeName)}</p>
            </div>

            <div class="list-right">
              <strong>${amount}</strong>
            </div>
          </button>
        `;
      }).join("");

      list.querySelectorAll("[data-payment-id]").forEach((button) => {
        button.addEventListener("click", () => {
          openMandatoryPaymentEditor(button.dataset.paymentId);
        });
      });
    }

    function renderCalendarContent() {
      try {
        renderMonthStrip?.();
      } catch (error) {
        console.error("renderMandatoryPaymentsMonthStrip failed:", error);
        renderFallbackMonthStrip();
      }

      try {
        renderModal?.();
      } catch (error) {
        console.error("renderMandatoryPaymentsModal failed:", error);
        renderFallbackList();
      }

      if (!getCalendarMonthStrip()?.children?.length) {
        renderFallbackMonthStrip();
      }

      if (!getCalendarList()?.children?.length) {
        renderFallbackList();
      }
    }

    function showCalendarModal(modal) {
      if (!modal) return;

      if (calendarCloseTimer) {
        clearTimeout(calendarCloseTimer);
        calendarCloseTimer = null;
      }

      forceUnlockPageScroll();

      modal.classList.remove("hidden", "is-visible", "is-closing");
      void modal.offsetHeight;

      requestAnimationFrame(() => {
        modal.classList.add("is-visible");
        forceUnlockPageScroll();
      });
    }

    function hideCalendarModal(modal) {
      if (!modal || modal.classList.contains("hidden")) {
        forceUnlockPageScroll();
        return;
      }

      if (calendarCloseTimer) {
        clearTimeout(calendarCloseTimer);
        calendarCloseTimer = null;
      }

      modal.classList.remove("is-visible");
      modal.classList.add("is-closing");
      forceUnlockPageScroll();

      calendarCloseTimer = window.setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("is-closing");
        calendarCloseTimer = null;
        forceUnlockPageScroll();
      }, window.FinanceAppModalCore?.MODAL_ANIMATION_MS || 440);
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

    function closeMandatoryPaymentsModal() {
      closeModalIfOpen(mandatoryPaymentBucketPickerModal);
      closeModalIfOpen(mandatoryPaymentEditorModal);
      hideCalendarModal(ensureCalendarModal());
      resetMandatoryPaymentForm();
    }

    function openMandatoryPaymentsModal() {
      const modal = ensureCalendarModal();

      setSelectedMonth(getSelectedMonth() || getCurrentMonthValue());
      renderCalendarContent();
      showCalendarModal(modal);
    }

    function bindButton(button, bindKey, handler, capture = false) {
      if (!button) return;

      const flag = `mandatoryFlowBound${bindKey}${capture ? "Capture" : ""}`;
      if (button.dataset[flag] === "true") return;

      button.dataset[flag] = "true";

      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        handler(event);
      }, capture);
    }

    function bindStaticButtons() {
      bindButton(openMandatoryPaymentsModalBtn, "OpenCalendar", openMandatoryPaymentsModal, true);
      bindButton(getCalendarCloseButton(), "CloseCalendar", closeMandatoryPaymentsModal, true);
      bindButton(getCalendarEditorButton(), "OpenEditor", openNewMandatoryPaymentEditor, true);
      bindButton(closeMandatoryPaymentEditorModalBtn, "CloseEditor", closeMandatoryPaymentEditorModal, true);

      bindButton(
        closeMandatoryPaymentBucketPickerModalBtn,
        "CloseBucketPicker",
        () => closeModalIfOpen(mandatoryPaymentBucketPickerModal),
        true
      );
    }

    function bindDelegatedCalendarControls() {
      if (document.documentElement.dataset.mandatoryCalendarDelegatedBound === "true") return;
      document.documentElement.dataset.mandatoryCalendarDelegatedBound = "true";

      document.addEventListener("click", (event) => {
        const openBtn = event.target.closest?.("#openMandatoryPaymentsModalBtn");

        if (openBtn) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();

          openMandatoryPaymentsModal();
          return;
        }

        const closeBtn = event.target.closest?.("#closeMandatoryPaymentsModalBtn");

        if (closeBtn) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();

          closeMandatoryPaymentsModal();
          return;
        }

        const editorBtn = event.target.closest?.("#openMandatoryPaymentEditorBtn");

        if (editorBtn) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();

          openNewMandatoryPaymentEditor();
        }
      }, true);

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isModalOpen(getCalendarModal())) {
          closeMandatoryPaymentsModal();
        }
      });
    }

    ensureCalendarModal();
    bindStaticButtons();
    bindDelegatedCalendarControls();
    forceUnlockPageScroll();

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

  /*
    Emergency opener для календарных платежей.
    Нужен потому что static mandatoryPaymentsModal в index.html может отсутствовать,
    а старый modal flow иногда создаёт/показывает её только после открытия другой модалки.
  */
  function ensureEmergencyMandatoryPaymentsModal() {
    let modal = document.getElementById("mandatoryPaymentsModal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "mandatoryPaymentsModal";
      document.body.appendChild(modal);
    }

    modal.className = "modal hidden";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Календарные платежи");

    if (!modal.querySelector(".modal-sheet")) {
      modal.innerHTML = `
        <div class="modal-sheet mandatory-payments-sheet--premium">
          <div class="modal-handle"></div>

          <div class="mandatory-payments-head">
            <div class="mandatory-payments-head__text">
              <h2 class="mandatory-payments-title">Календарные платежи</h2>
              <p class="mandatory-payments-subtitle">
                Платежи, которые нужно держать под контролем каждый месяц.
              </p>
            </div>

            <button
              class="icon-action-btn mandatory-payments-close-btn"
              type="button"
              id="closeMandatoryPaymentsModalBtn"
              aria-label="Закрыть календарные платежи"
            >
              ×
            </button>
          </div>

          <div class="mandatory-payments-month-strip" id="mandatoryPaymentsMonthStrip"></div>

          <div class="mandatory-payments-panel">
            <div class="list" id="mandatoryPaymentsList"></div>
          </div>

          <button class="mandatory-payments-add-btn" type="button" id="openMandatoryPaymentEditorBtn">
            <span>+</span>
            <strong>Добавить платёж</strong>
          </button>
        </div>
      `;
    }

    return modal;
  }

  function emergencyFormatMoney(value) {
    const number = Math.round((Number(value) || 0) * 100) / 100;

    return new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: number % 1 === 0 ? 0 : 2,
    }).format(number) + " ₽";
  }

  function emergencyEscapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function emergencyRenderMandatoryPaymentsModal() {
    const state = window.FinanceAppState?.state;
    const list = document.getElementById("mandatoryPaymentsList");
    const strip = document.getElementById("mandatoryPaymentsMonthStrip");

    if (strip) {
      const now = new Date();
      const year = now.getFullYear();
      const activeMonth = now.getMonth();
      const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

      strip.innerHTML = monthNames.map((name, index) => {
        const activeClass = index === activeMonth ? " is-active" : "";

        return `
          <button class="mandatory-payments-month-chip${activeClass}" type="button">
            ${name}
            <small>${year}</small>
          </button>
        `;
      }).join("");
    }

    if (!list) return;

    const payments = Array.isArray(state?.mandatoryPayments)
      ? state.mandatoryPayments
      : [];

    if (!payments.length) {
      list.innerHTML = `
        <div class="list-card">
          <div class="list-body">
            <div class="list-title-row">
              <h3 class="list-title">Платежей пока нет</h3>
            </div>
            <p class="list-subtitle">Нажми «Добавить платёж», чтобы создать первый.</p>
          </div>
        </div>
      `;
      return;
    }

    list.innerHTML = payments.map((item) => {
      const title = emergencyEscapeHtml(item.title || "Платёж");
      const amount = emergencyFormatMoney(item.amount);
      const day = Number(item.due_day) || "—";

      return `
        <button class="mandatory-payment-card" type="button" data-payment-id="${emergencyEscapeHtml(item.id)}" data-paid="false">
          <span class="mandatory-payment-card__progress" aria-hidden="true"></span>

          <div class="list-body">
            <div class="list-title-row">
              <h3 class="list-title">${title}</h3>
            </div>
            <p class="list-subtitle">до ${day} числа</p>
          </div>

          <div class="list-right">
            <strong>${amount}</strong>
          </div>
        </button>
      `;
    }).join("");
  }

  function emergencyUnlockScroll() {
    document.documentElement.classList.remove("modal-scroll-locked");
    document.body.classList.remove("modal-scroll-locked");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
  }

  function emergencyOpenMandatoryPaymentsModal() {
    const modal = ensureEmergencyMandatoryPaymentsModal();

    emergencyRenderMandatoryPaymentsModal();
    emergencyUnlockScroll();

    modal.classList.remove("hidden", "is-closing");
    modal.classList.add("is-visible");

    modal.style.display = "flex";
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
    modal.style.background = "rgba(20, 24, 33, 0.22)";
    modal.style.backdropFilter = "blur(18px)";
    modal.style.webkitBackdropFilter = "blur(18px)";

    const sheet = modal.querySelector(".modal-sheet");

    if (sheet) {
      sheet.style.opacity = "1";
      sheet.style.transform = "translate3d(0, 0, 0) scale(1)";
    }

    emergencyUnlockScroll();
  }

  function emergencyCloseMandatoryPaymentsModal() {
    const modal = document.getElementById("mandatoryPaymentsModal");
    if (!modal) return;

    modal.classList.remove("is-visible", "is-closing");
    modal.classList.add("hidden");

    modal.style.display = "";
    modal.style.opacity = "";
    modal.style.pointerEvents = "";
    modal.style.background = "";
    modal.style.backdropFilter = "";
    modal.style.webkitBackdropFilter = "";

    const sheet = modal.querySelector(".modal-sheet");

    if (sheet) {
      sheet.style.opacity = "";
      sheet.style.transform = "";
    }

    emergencyUnlockScroll();
  }

  document.addEventListener("click", (event) => {
    const openTarget = event.target.closest?.(
      "#openMandatoryPaymentsModalBtn, .required-payment-card--danger"
    );

    if (openTarget) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      emergencyOpenMandatoryPaymentsModal();
      return;
    }

    const closeTarget = event.target.closest?.("#closeMandatoryPaymentsModalBtn");

    if (closeTarget) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      emergencyCloseMandatoryPaymentsModal();
      return;
    }

    const modal = document.getElementById("mandatoryPaymentsModal");

    if (modal && event.target === modal) {
      emergencyCloseMandatoryPaymentsModal();
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      emergencyCloseMandatoryPaymentsModal();
    }
  });
})();