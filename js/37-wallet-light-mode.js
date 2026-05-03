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

  function pulseBalance(type) {
    const core = document.getElementById("walletLightBalanceCore");

    if (!core) return;

    core.classList.remove("is-income", "is-expense");

    requestAnimationFrame(() => {
      core.classList.add(type === "income" ? "is-income" : "is-expense");
    });

    window.setTimeout(() => {
      core.classList.remove("is-income", "is-expense");
    }, 820);
  }

  function createParticle(className, options) {
    const layer = document.getElementById("walletLightParticles");

    if (!layer) return;

    const particle = document.createElement("span");

    particle.className = className;

    Object.entries(options).forEach(([key, value]) => {
      particle.style.setProperty(key, value);
    });

    layer.appendChild(particle);

    window.setTimeout(() => {
      particle.remove();
    }, 1600);
  }

  function dropMoneyIntoBalance() {
    const count = 8;

    for (let index = 0; index < count; index += 1) {
      const startX = Math.round(-120 + Math.random() * 240);
      const startY = Math.round(-210 - Math.random() * 70);
      const endX = Math.round(-34 + Math.random() * 68);
      const endY = Math.round(-30 + Math.random() * 32);
      const delay = Math.round(index * 58 + Math.random() * 70);
      const rotate = Math.round(260 + Math.random() * 420);
      const size = Math.round(15 + Math.random() * 9);
      const scale = (0.82 + Math.random() * 0.34).toFixed(2);

      createParticle("wallet-light-particle wallet-light-particle--coin", {
        "--particle-start-x": `${startX}px`,
        "--particle-start-y": `${startY}px`,
        "--particle-end-x": `${endX}px`,
        "--particle-end-y": `${endY}px`,
        "--particle-delay": `${delay}ms`,
        "--particle-rotate": `${rotate}deg`,
        "--particle-size": `${size}px`,
        "--particle-scale": scale,
      });
    }

    pulseBalance("income");
  }

  function spillMoneyFromBalance() {
    const count = 5;

    for (let index = 0; index < count; index += 1) {
      const startX = Math.round(-42 + Math.random() * 84);
      const startY = Math.round(-14 + Math.random() * 26);
      const endX = Math.round(-120 + Math.random() * 240);
      const endY = Math.round(105 + Math.random() * 68);
      const delay = Math.round(index * 48 + Math.random() * 60);
      const rotate = Math.round(160 + Math.random() * 320);
      const size = Math.round(10 + Math.random() * 8);
      const scale = (0.72 + Math.random() * 0.28).toFixed(2);

      createParticle("wallet-light-particle wallet-light-particle--loss", {
        "--particle-start-x": `${startX}px`,
        "--particle-start-y": `${startY}px`,
        "--particle-end-x": `${endX}px`,
        "--particle-end-y": `${endY}px`,
        "--particle-delay": `${delay}ms`,
        "--particle-rotate": `${rotate}deg`,
        "--particle-size": `${size}px`,
        "--particle-scale": scale,
      });
    }

    pulseBalance("expense");
  }

  function playSavedTransactionAnimation(type) {
    if (type === "income") {
      dropMoneyIntoBalance();
      return;
    }

    spillMoneyFromBalance();
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