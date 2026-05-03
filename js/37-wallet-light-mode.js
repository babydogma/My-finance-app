(() => {
  const MODE_KEY = "wallet_home_mode_v1";
  const PENDING_LIFETIME_MS = 120000;
  const AFTER_SAVE_ANIMATION_DELAY_MS = 520;

  let pendingLightTransaction = null;

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

  function animatePig(type) {
    const wrap = document.querySelector(".wallet-light-piggy-wrap");

    if (!wrap) return;

    wrap.classList.remove("is-happy", "is-shake");

    requestAnimationFrame(() => {
      wrap.classList.add(type === "income" ? "is-happy" : "is-shake");
    });

    window.setTimeout(() => {
      wrap.classList.remove("is-happy", "is-shake");
    }, 760);
  }

  function dropCoins() {
    const coinsLayer = document.getElementById("walletPiggyCoins");

    if (!coinsLayer) return;

    const count = 8;

    for (let index = 0; index < count; index += 1) {
      const coin = document.createElement("span");

      const x = Math.round(-95 + Math.random() * 190);
      const delay = Math.round(index * 62 + Math.random() * 70);
      const rotate = Math.round(260 + Math.random() * 360);
      const size = Math.round(14 + Math.random() * 8);
      const scale = (0.82 + Math.random() * 0.34).toFixed(2);

      coin.className = "wallet-falling-coin";
      coin.style.setProperty("--coin-x", `${x}px`);
      coin.style.setProperty("--coin-delay", `${delay}ms`);
      coin.style.setProperty("--coin-rotate", `${rotate}deg`);
      coin.style.setProperty("--coin-size", `${size}px`);
      coin.style.setProperty("--coin-scale", scale);

      coinsLayer.appendChild(coin);

      window.setTimeout(() => {
        coin.remove();
      }, 1450 + delay);
    }

    animatePig("income");
  }

  function playSavedTransactionAnimation(type) {
    if (type === "income") {
      dropCoins();
      return;
    }

    animatePig("expense");
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

    const type = pendingLightTransaction.type;

    pendingLightTransaction.animationPlayed = true;
    window.clearTimeout(pendingLightTransaction.timeoutId);

    window.setTimeout(() => {
      syncLightFreeMoney();
      playSavedTransactionAnimation(type);
      pendingLightTransaction = null;
    }, AFTER_SAVE_ANIMATION_DELAY_MS);
  }

  function bindLightModeEvents() {
    document.addEventListener("click", (event) => {
      const toggleBtn = event.target.closest("#walletModeToggleBtn");
      const expenseBtn = event.target.closest("#walletLightExpenseBtn");
      const incomeBtn = event.target.closest("#walletLightIncomeBtn");

      if (toggleBtn) {
        event.preventDefault();

        const isLight = document.body.classList.contains("wallet-mode-light");

        setMode(isLight ? "hard" : "light");
        return;
      }

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
      syncLightFreeMoney();
      completePendingLightTransactionIfMoneyChanged();
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