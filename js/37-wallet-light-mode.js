(() => {
  const MODE_KEY = "wallet_home_mode_v1";
  const PENDING_LIFETIME_MS = 120000;
  const AFTER_SAVE_ANIMATION_DELAY_MS = 520;

  const SWIPE_MIN_X = 72;
  const SWIPE_MAX_Y = 58;
  const SWIPE_MAX_TIME = 750;

  let pendingLightTransaction = null;
  let swipeStart = null;

  function getSavedMode() {
    return localStorage.getItem(MODE_KEY) || "light";
  }

  function saveMode(mode) {
    localStorage.setItem(MODE_KEY, mode);
  }

  function parseMoney(text) {
    const normalized = String(text || "")
      .replace(/\s/g, "")
      .replace(/[₽₽]/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    const value = Number(normalized);

    return Number.isFinite(value) ? value : 0;
  }

  function getFreeMoneyText() {
    const source = document.getElementById("balanceFreeMoneyValue");

    return source?.textContent?.trim() || "0 ₽";
  }

  function getFreeMoneyValue() {
    return parseMoney(getFreeMoneyText());
  }

  function setMode(mode) {
    const normalizedMode = mode === "hard" ? "hard" : "light";
    const toggleBtn = document.getElementById("walletModeToggleBtn");

    document.body.classList.toggle("wallet-mode-light", normalizedMode === "light");
    document.body.classList.toggle("wallet-mode-hard", normalizedMode === "hard");

    if (toggleBtn) {
      toggleBtn.textContent = normalizedMode === "light" ? "Полный режим" : "Лайт";
    }

    saveMode(normalizedMode);
  }

  function syncLightFreeMoney() {
    const target = document.getElementById("walletLightFreeValue");

    if (!target) return;

    target.textContent = getFreeMoneyText();
  }

  function playMoneyUpdateAnimation() {
    const core = document.getElementById("walletLightBalanceCore");

    if (!core) return;

    core.classList.remove("is-updating");

    requestAnimationFrame(() => {
      core.classList.add("is-updating");
    });

    window.setTimeout(() => {
      core.classList.remove("is-updating");
    }, 520);
  }

  function openExistingModal(buttonId) {
    const button = document.getElementById(buttonId);

    if (!button) return;

    button.click();
  }

  function startPendingLightTransaction(type) {
    window.clearTimeout(pendingLightTransaction?.timeoutId);

    pendingLightTransaction = {
      type,
      beforeValue: getFreeMoneyValue(),
      createdAt: Date.now(),
      animationPlayed: false,
      timeoutId: window.setTimeout(() => {
        pendingLightTransaction = null;
      }, PENDING_LIFETIME_MS),
    };
  }

  function completePendingLightTransactionIfMoneyChanged() {
    if (!pendingLightTransaction || pendingLightTransaction.animationPlayed) return;

    const now = Date.now();

    if (now - pendingLightTransaction.createdAt > PENDING_LIFETIME_MS) {
      window.clearTimeout(pendingLightTransaction.timeoutId);
      pendingLightTransaction = null;
      return;
    }

    const currentValue = getFreeMoneyValue();
    const difference = Math.round((currentValue - pendingLightTransaction.beforeValue) * 100) / 100;

    if (Math.abs(difference) < 0.01) return;

    pendingLightTransaction.animationPlayed = true;
    window.clearTimeout(pendingLightTransaction.timeoutId);

    window.setTimeout(() => {
      syncLightFreeMoney();
      playMoneyUpdateAnimation();
      pendingLightTransaction = null;
    }, AFTER_SAVE_ANIMATION_DELAY_MS);
  }

  function isBlockingViewOpen() {
    return Boolean(
      document.querySelector(".modal:not(.hidden)") ||
      document.querySelector("#monthlyReportView:not(.hidden)") ||
      document.querySelector("#categoriesManagerView:not(.hidden)")
    );
  }

  function isInteractiveTarget(target) {
    return Boolean(
      target?.closest?.(
        "button, a, input, select, textarea, label, .modal, .modal-sheet"
      )
    );
  }

  function bindSwipeModeEvents() {
    document.addEventListener(
      "touchstart",
      (event) => {
        if (isBlockingViewOpen()) return;
        if (isInteractiveTarget(event.target)) return;

        const touch = event.touches?.[0];

        if (!touch) return;

        swipeStart = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        };
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (event) => {
        if (!swipeStart) return;
        if (isBlockingViewOpen()) {
          swipeStart = null;
          return;
        }

        const touch = event.changedTouches?.[0];

        if (!touch) {
          swipeStart = null;
          return;
        }

        const deltaX = touch.clientX - swipeStart.x;
        const deltaY = touch.clientY - swipeStart.y;
        const elapsed = Date.now() - swipeStart.time;

        swipeStart = null;

        if (elapsed > SWIPE_MAX_TIME) return;
        if (Math.abs(deltaX) < SWIPE_MIN_X) return;
        if (Math.abs(deltaY) > SWIPE_MAX_Y) return;

        const isLightMode = document.body.classList.contains("wallet-mode-light");
        const isHardMode = document.body.classList.contains("wallet-mode-hard");

        if (isLightMode && deltaX < 0) {
          setMode("hard");
          return;
        }

        if (isHardMode && deltaX > 0) {
          setMode("light");
        }
      },
      { passive: true }
    );
  }

  function bindLightModeEvents() {
    document.addEventListener("click", (event) => {
      const expenseBtn = event.target.closest("#walletLightExpenseBtn");
      const incomeBtn = event.target.closest("#walletLightIncomeBtn");

      if (expenseBtn) {
        event.preventDefault();

        startPendingLightTransaction("expense");
        openExistingModal("openExpenseModal");
        return;
      }

      if (incomeBtn) {
        event.preventDefault();

        startPendingLightTransaction("income");
        openExistingModal("openIncomeModal");
      }
    });
  }

  function watchFreeMoney() {
    const source = document.getElementById("balanceFreeMoneyValue");

    if (!source) return;

    const observer = new MutationObserver(() => {
      if (pendingLightTransaction) {
        completePendingLightTransactionIfMoneyChanged();
        return;
      }

      syncLightFreeMoney();
    });

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function start() {
    setMode(getSavedMode());
    syncLightFreeMoney();
    watchFreeMoney();
    bindLightModeEvents();
    bindSwipeModeEvents();

    window.addEventListener("focus", syncLightFreeMoney);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      syncLightFreeMoney();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();