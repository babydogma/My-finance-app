(() => {
  const MODAL_ANIMATION_MS = 420;
  const modalCloseTimers = new WeakMap();

  function openAnimatedModal(modalEl) {
    if (!modalEl) return;

    const existingTimer = modalCloseTimers.get(modalEl);

    if (existingTimer) {
      clearTimeout(existingTimer);
      modalCloseTimers.delete(modalEl);
    }

    modalEl.classList.remove("hidden", "is-closing");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modalEl.classList.add("is-visible");
      });
    });
  }

  function closeAnimatedModal(modalEl, options = {}) {
    if (!modalEl) return;

    const { keepBodyLocked = false } = options;

    if (modalEl.classList.contains("hidden")) {
      if (!keepBodyLocked) {
        document.body.style.overflow = "";
      }

      return;
    }

    modalEl.classList.remove("is-visible");
    modalEl.classList.add("is-closing");

    const timer = window.setTimeout(() => {
      modalEl.classList.add("hidden");
      modalEl.classList.remove("is-closing");
      modalCloseTimers.delete(modalEl);

      if (!keepBodyLocked) {
        document.body.style.overflow = "";
      }
    }, MODAL_ANIMATION_MS);

    modalCloseTimers.set(modalEl, timer);
  }

  window.FinanceAppModalCore = {
    MODAL_ANIMATION_MS,
    openAnimatedModal,
    closeAnimatedModal,
  };
})();