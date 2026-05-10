(() => {
  const MODAL_ANIMATION_MS = 260;
  const modalCloseTimers = new WeakMap();

  let lockedScrollY = 0;
  let bodyLockDepth = 0;

  function isModalOpen(modalEl) {
    return Boolean(
      modalEl &&
      !modalEl.classList.contains("hidden") &&
      !modalEl.classList.contains("is-closing")
    );
  }

  function applyBodyScrollLock() {
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

  function clearBodyScrollLock(shouldRestoreScroll = true) {
    const scrollY = lockedScrollY;

    document.documentElement.classList.remove("modal-scroll-locked");
    document.body.classList.remove("modal-scroll-locked");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    lockedScrollY = 0;

    if (shouldRestoreScroll) {
      window.scrollTo(0, scrollY);
    }
  }

  function lockBodyScroll() {
    bodyLockDepth += 1;

    if (bodyLockDepth > 1) return;

    applyBodyScrollLock();
  }

  function unlockBodyScroll() {
    bodyLockDepth = Math.max(0, bodyLockDepth - 1);

    if (bodyLockDepth > 0) return;

    clearBodyScrollLock(true);
  }

  function forceUnlockBodyScroll() {
    bodyLockDepth = 0;
    clearBodyScrollLock(true);
  }

  function openAnimatedModal(modalEl) {
    if (!modalEl) return;

    modalEl.classList.add("modal");

    const existingTimer = modalCloseTimers.get(modalEl);
    if (existingTimer) {
      clearTimeout(existingTimer);
      modalCloseTimers.delete(modalEl);
    }

    if (!isModalOpen(modalEl)) {
      lockBodyScroll();
    }

    modalEl.classList.remove("hidden", "is-visible", "is-closing");

    void modalEl.offsetHeight;

    modalEl.classList.add("is-visible");
  }

  function closeAnimatedModal(modalEl) {
    if (!modalEl) return;

    const existingTimer = modalCloseTimers.get(modalEl);

    if (existingTimer) {
      clearTimeout(existingTimer);
      modalCloseTimers.delete(modalEl);
    }

    if (modalEl.classList.contains("hidden")) {
      return;
    }

    /*
      \u0412\u0430\u0436\u043d\u043e:
      \u0441\u043a\u0440\u043e\u043b\u043b \u0440\u0430\u0437\u0431\u043b\u043e\u043a\u0438\u0440\u0443\u0435\u043c \u0421\u0420\u0410\u0417\u0423 \u043f\u0440\u0438 \u0441\u0442\u0430\u0440\u0442\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u0438\u044f,
      \u0430 \u043d\u0435 \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f CSS-\u0430\u043d\u0438\u043c\u0430\u0446\u0438\u0438.
      \u0418\u043d\u0430\u0447\u0435 \u043d\u0430 iOS \u043e\u0449\u0443\u0449\u0430\u0435\u0442\u0441\u044f \u043c\u0438\u043a\u0440\u043e\u043b\u0430\u0433 \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u0438\u044f \u043c\u043e\u0434\u0430\u043b\u043a\u0438.
    */
    unlockBodyScroll();

    modalEl.classList.remove("is-visible");
    modalEl.classList.add("is-closing");

    const timer = window.setTimeout(() => {
      modalEl.classList.add("hidden");
      modalEl.classList.remove("is-closing");
      modalCloseTimers.delete(modalEl);
    }, MODAL_ANIMATION_MS);

    modalCloseTimers.set(modalEl, timer);
  }

  window.FinanceAppModalCore = {
    MODAL_ANIMATION_MS,
    openAnimatedModal,
    closeAnimatedModal,
    forceUnlockBodyScroll,
  };
})();