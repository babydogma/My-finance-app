(() => {
  const PRIVACY_STORAGE_KEY = "finance_app_privacy_mode_v1";

  const MONEY_VALUE_SELECTORS = [
    ".balance-amount",
    "#balanceFreeMoneyValue",
    "#accountsTotal",

    "#accountsList .list-value",

    ".required-payment-card__value",
    "#analyticsPendingMandatoryValue",
    "#analyticsMandatoryTotalValue",
    "#analyticsMandatoryCoveredValue",
    "#analyticsRemainingBudgetsValue",
    "#walletMandatoryControlValue",

    "#transactionsList .list-value",
    "#operationsTransactionsList .list-value",
    "#analyticsCategoryTransactionsList .list-value",

    ".analytics-expenses-total-value",
    ".analytics-expenses-ring__center-value",
    ".analytics-expense-category-row__amount",
    ".analytics-expense-category-row__percent",

    ".analytics-overview-balance-card__value",
    ".analytics-overview-mini-card__value",
    ".analytics-overview-mandatory-card__main-value",
    ".analytics-overview-mandatory-card__row strong",

    ".analytics-safes-interest-card__value",
    ".analytics-savings-income-pill strong",
    ".analytics-savings-model-row__top strong",
    ".analytics-savings-pace-line__top strong",
    ".analytics-savings-scenario-card__result strong",
    ".analytics-savings-scenario-card__rows strong",

    "#safeBucketsModal .list-value",
    ".safe-buckets-total",
    ".safe-buckets-wallet-row .list-value"
  ];

  let privacyEnabled = false;
  let accountsObserver = null;
  let carouselScrollTimer = null;

  function getPrivacyEnabledFromStorage() {
    try {
      return window.localStorage.getItem(PRIVACY_STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function savePrivacyEnabledToStorage(nextValue) {
    try {
      window.localStorage.setItem(PRIVACY_STORAGE_KEY, nextValue ? "1" : "0");
    } catch (error) {
      // Не критично.
    }
  }

  function maskText(originalText) {
    const text = String(originalText || "");

    if (!text.trim()) return text;

    return text
      .replace(/([+\-−]?\s*)\d[\d\s.,]*\s*₽/g, (match, sign) => {
        const normalizedSign = String(sign || "").trim();

        if (normalizedSign === "-" || normalizedSign === "−") {
          return "−••••• ₽";
        }

        if (normalizedSign === "+") {
          return "+••••• ₽";
        }

        return "••••• ₽";
      })
      .replace(/\d[\d\s.,]*\s*%/g, "••%");
  }

  function getMaskableElements() {
    return MONEY_VALUE_SELECTORS
      .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
      .filter((element, index, array) => {
        return element && array.indexOf(element) === index;
      });
  }

  function rememberOriginalText(element) {
    if (!element.dataset.privateOriginal) {
      element.dataset.privateOriginal = element.textContent || "";
    }
  }

  function maskElement(element) {
    rememberOriginalText(element);
    element.textContent = maskText(element.dataset.privateOriginal || "");
  }

  function restoreElement(element) {
    if (!element.dataset.privateOriginal) return;

    element.textContent = element.dataset.privateOriginal;
    delete element.dataset.privateOriginal;
  }

  function applyPrivacyMask() {
    document.body.classList.toggle("is-privacy-mode", privacyEnabled);

    const toggleBtn = document.querySelector(".balance-visibility-btn");

    if (toggleBtn) {
      toggleBtn.classList.toggle("is-private", privacyEnabled);
      toggleBtn.setAttribute(
        "aria-label",
        privacyEnabled ? "Показать суммы" : "Скрыть суммы"
      );
      toggleBtn.setAttribute(
        "title",
        privacyEnabled ? "Показать суммы" : "Скрыть суммы"
      );
    }

    getMaskableElements().forEach((element) => {
      if (privacyEnabled) {
        maskElement(element);
      } else {
        restoreElement(element);
      }
    });
  }

  function bindPrivacyToggle() {
    const toggleBtn = document.querySelector(".balance-visibility-btn");

    if (!toggleBtn || toggleBtn.dataset.privacyBound === "true") return;

    toggleBtn.dataset.privacyBound = "true";

    toggleBtn.addEventListener("click", (event) => {
      event.preventDefault();

      privacyEnabled = !privacyEnabled;
      savePrivacyEnabledToStorage(privacyEnabled);
      applyPrivacyMask();
    });
  }

  function getAccountsList() {
    return document.getElementById("accountsList");
  }

  function getAccountsDotsWrap() {
    return document.querySelector(".accounts-carousel-dots");
  }

  function getAccountCards() {
    const accountsList = getAccountsList();

    if (!accountsList) return [];

    return Array.from(accountsList.querySelectorAll(".list-card"));
  }

  function renderAccountDots() {
    const dotsWrap = getAccountsDotsWrap();
    const cards = getAccountCards();

    if (!dotsWrap) return;

    dotsWrap.innerHTML = "";

    if (cards.length <= 1) {
      dotsWrap.classList.add("hidden");
      return;
    }

    dotsWrap.classList.remove("hidden");

    cards.forEach((_, index) => {
      const dot = document.createElement("span");

      if (index === 0) {
        dot.classList.add("is-active");
      }

      dot.addEventListener("click", () => {
        const accountsList = getAccountsList();
        const targetCard = getAccountCards()[index];

        if (!accountsList || !targetCard) return;

        accountsList.scrollTo({
          left: targetCard.offsetLeft,
          behavior: "smooth",
        });
      });

      dotsWrap.appendChild(dot);
    });

    updateAccountDots();
  }

  function updateAccountDots() {
    const accountsList = getAccountsList();
    const dotsWrap = getAccountsDotsWrap();
    const cards = getAccountCards();

    if (!accountsList || !dotsWrap || !cards.length) return;

    const listCenter = accountsList.scrollLeft + accountsList.clientWidth / 2;

    let activeIndex = 0;
    let activeDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - listCenter);

      if (distance < activeDistance) {
        activeDistance = distance;
        activeIndex = index;
      }
    });

    Array.from(dotsWrap.children).forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  }

  function bindAccountsCarousel() {
    const accountsList = getAccountsList();

    if (!accountsList || accountsList.dataset.carouselBound === "true") return;

    accountsList.dataset.carouselBound = "true";

    accountsList.addEventListener(
      "scroll",
      () => {
        window.clearTimeout(carouselScrollTimer);

        carouselScrollTimer = window.setTimeout(() => {
          updateAccountDots();
        }, 40);
      },
      {
        passive: true,
      }
    );
  }

  function startAccountsObserver() {
    const accountsList = getAccountsList();

    if (!accountsList || accountsObserver) return;

    accountsObserver = new MutationObserver(() => {
      window.requestAnimationFrame(() => {
        bindAccountsCarousel();
        renderAccountDots();

        if (privacyEnabled) {
          applyPrivacyMask();
        }
      });
    });

    accountsObserver.observe(accountsList, {
      childList: true,
    });
  }

  function init() {
    privacyEnabled = getPrivacyEnabledFromStorage();

    bindPrivacyToggle();

    bindAccountsCarousel();
    renderAccountDots();
    startAccountsObserver();

    applyPrivacyMask();

    window.setTimeout(() => {
      bindAccountsCarousel();
      renderAccountDots();

      if (privacyEnabled) {
        applyPrivacyMask();
      }
    }, 500);
  }

  document.addEventListener("DOMContentLoaded", init);
})();