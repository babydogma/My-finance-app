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
      ÐÐ°Ð¶Ð½Ð¾:
      ÑÐºÑÐ¾Ð»Ð» ÑÐ°Ð·Ð±Ð»Ð¾ÐºÐ¸ÑÑÐµÐ¼ Ð¡Ð ÐÐÐ£ Ð¿ÑÐ¸ ÑÑÐ°ÑÑÐµ Ð·Ð°ÐºÑÑÑÐ¸Ñ,
      Ð° Ð½Ðµ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð²ÐµÑÑÐµÐ½Ð¸Ñ CSS-Ð°Ð½Ð¸Ð¼Ð°ÑÐ¸Ð¸.
      ÐÐ½Ð°ÑÐµ Ð½Ð° iOS Ð¾ÑÑÑÐ°ÐµÑÑÑ Ð¼Ð¸ÐºÑÐ¾Ð»Ð°Ð³ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°ÐºÑÑÑÐ¸Ñ Ð¼Ð¾Ð´Ð°Ð»ÐºÐ¸.
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