(() => {
  const MODAL_ANIMATION_MS = 440;
  const modalCloseTimers = new WeakMap();

  let lockedScrollY = 0;
  let bodyLockDepth = 0;

  function lockBodyScroll() {
    bodyLockDepth += 1;

    if (bodyLockDepth > 1) return;

    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

    document.documentElement.classList.add("modal-scroll-locked");
    document.body.classList.add("modal-scroll-locked");

    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }

  function unlockBodyScroll() {
    bodyLockDepth = Math.max(0, bodyLockDepth - 1);

    if (bodyLockDepth > 0) return;

    document.documentElement.classList.remove("modal-scroll-locked");
    document.body.classList.remove("modal-scroll-locked");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    window.scrollTo(0, lockedScrollY);
    lockedScrollY = 0;
  }

  function openAnimatedModal(modalEl) {
    if (!modalEl) return;

    const existingTimer = modalCloseTimers.get(modalEl);

    if (existingTimer) {
      clearTimeout(existingTimer);
      modalCloseTimers.delete(modalEl);
    }

    lockBodyScroll();

    modalEl.classList.remove("hidden", "is-visible", "is-closing");

    /*
      Важно: принудительный reflow.
      Без этого Safari иногда склеивает hidden -> visible
      и анимация ощущается как мгновенное появление.
    */
    void modalEl.offsetHeight;

    modalEl.classList.add("is-visible");
  }

  function closeAnimatedModal(modalEl, options = {}) {
    if (!modalEl) return;

    const { keepBodyLocked = false } = options;

    if (modalEl.classList.contains("hidden")) {
      if (!keepBodyLocked) {
        unlockBodyScroll();
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
        unlockBodyScroll();
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