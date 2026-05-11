(() => {
  const ROOT_ID = "walletCardsV1";
  const MAIN_CARD_ID = "walletMainAccountCard";

  function getTextById(id, fallback = "") {
    const node = document.getElementById(id);
    const text = node?.textContent?.trim();
    return text || fallback;
  }

  function setTextById(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function getMainAccountValue() {
    return getTextById("balanceFreeMoneyValue") || getTextById("walletLightFreeValue") || "0 ₽";
  }

  function getDailyValue() {
    return getTextById("walletTodayCanValue", "0 ₽");
  }

  function getHeroHint() {
    return getTextById("walletGameHint", "Данные обновятся после загрузки операций.");
  }

  function getMandatoryValue() {
    return getTextById("analyticsPendingMandatoryValue") || getTextById("walletCalendarPressureValue") || "0 ₽";
  }

  function getBudgetSpentValue() {
    return getTextById("hardMonthBudgetSpentValue", "0 ₽");
  }

  function getBudgetTotalValue() {
    return getTextById("hardMonthBudgetTotalValue", "из 0 ₽");
  }

  function getExpectedIncomeValue() {
    const value = getTextById("walletExpectedIncomeValue", "");
    if (!value || value.toLowerCase().includes("ожидание пока не добавлено")) return "не добавлено";
    return value;
  }

  function isModalVisible(modalId) {
    const modal = document.getElementById(modalId);
    return Boolean(modal && !modal.classList.contains("hidden") && !modal.classList.contains("is-closing"));
  }

  function openModalFallback(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add("modal");

    if (window.FinanceAppModalCore?.openAnimatedModal) {
      window.FinanceAppModalCore.openAnimatedModal(modal);
      return;
    }

    modal.classList.remove("hidden", "is-closing");
    requestAnimationFrame(() => modal.classList.add("is-visible"));
  }

  function clickById(id) {
    const node = document.getElementById(id);
    if (!node) return false;

    node.dispatchEvent(new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    }));

    return true;
  }

  function openWalletTarget(triggerId, modalId) {
    clickById(triggerId);

    window.setTimeout(() => {
      if (isModalVisible(modalId)) return;
      openModalFallback(modalId);
    }, 60);
  }

  function createWalletCardsRoot() {
    if (document.getElementById(ROOT_ID)) return;

    const mainView = document.getElementById("mainView");
    const oldHeroSection = document.querySelector(".balance--game");
    if (!mainView || !oldHeroSection) return;

    const section = document.createElement("section");
    section.className = "wallet-cards-v1";
    section.id = ROOT_ID;

    section.innerHTML = `
      <div class="wallet-cards-v1__head">
        <h1 class="wallet-cards-v1__title">Wallet</h1>

        <div class="wallet-cards-v1__actions">
          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsAddBtn" aria-label="Добавить операцию">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>

          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsReportBtn" aria-label="Открыть итоги">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 19V5" />
              <path d="M6 19h13" />
              <path d="M10 15v-4" />
              <path d="M14 15V8" />
              <path d="M18 15v-6" />
            </svg>
          </button>
        </div>
      </div>

            <div class="wallet-cards-v1__stack wallet-cards-v1__stack--deck">
        <article class="wallet-card-v1 wallet-card-v1--main" id="${MAIN_CARD_ID}" role="button" tabindex="0" aria-expanded="false">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>Основной счёт</strong>
              <span>Свободные деньги</span>
            </div>

            <strong class="wallet-card-v1__amount" id="walletMainAccountValue">0 ₽</strong>
          </div>

          <div class="wallet-card-v1__details">
            <div class="wallet-card-v1__details-inner">
              <div class="wallet-card-v1__details-content">
                <div class="wallet-card-v1__panel">
                  <div class="wallet-card-v1__row">
                    <span>Можно тратить</span>
                    <strong id="walletMainDailyValue">0 ₽/день</strong>
                  </div>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" id="walletMainMandatoryRowBtn" data-wallet-card-action="mandatory">
                    <span>К списанию</span>
                    <strong id="walletMainMandatoryValue">0 ₽</strong>
                  </button>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" id="walletMainBudgetRowBtn" data-wallet-card-action="budget">
                    <span>Бюджет месяца</span>
                    <strong id="walletMainBudgetValue">0 ₽ из 0 ₽</strong>
                  </button>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" id="walletMainExpectedRowBtn" data-wallet-card-action="expected">
                    <span>Ожидаемые деньги</span>
                    <strong id="walletMainExpectedValue">не добавлено</strong>
                  </button>

                  <p class="wallet-card-v1__hint" id="walletMainHint">Данные обновятся после загрузки операций.</p>
                </div>

                <div class="wallet-card-v1__quick-actions">
                  <button class="wallet-card-v1__action wallet-card-v1__action--danger" type="button" id="walletMainExpenseBtn">Расход</button>
                  <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletMainIncomeBtn">Доход</button>
                  <button class="wallet-card-v1__action" type="button" id="walletMainReportBtn">Итоги</button>
                </div>
              </div>
            </div>
          </div>
                </article>

        <article class="wallet-card-v1 wallet-card-v1--cash wallet-card-v1--locked" aria-label="Наличка">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>Наличка</strong>
              <span>Физические деньги</span>
            </div>

            <strong class="wallet-card-v1__amount">— ₽</strong>
          </div>
        </article>

        <article class="wallet-card-v1 wallet-card-v1--home wallet-card-v1--locked" aria-label="Квартира">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>Квартира</strong>
              <span>Накопления</span>
            </div>

            <strong class="wallet-card-v1__amount">— ₽</strong>
          </div>

          <div class="wallet-card-v1__mini-progress" aria-hidden="true">
            <span style="width: 0%"></span>
          </div>
        </article>

        <article class="wallet-card-v1 wallet-card-v1--tax wallet-card-v1--locked" aria-label="Налоги">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>Налоги</strong>
              <span>Отложенные платежи</span>
            </div>

            <strong class="wallet-card-v1__amount">— ₽</strong>
          </div>
        </article>
      </div>
    `;

    mainView.insertBefore(section, oldHeroSection);
    document.body.classList.add("wallet-cards-v1-enabled");
  }

  function syncWalletMainCard() {
    if (!document.getElementById(ROOT_ID)) return;

    setTextById("walletMainAccountValue", getMainAccountValue());
    setTextById("walletMainDailyValue", `${getDailyValue()}/день`);
    setTextById("walletMainMandatoryValue", getMandatoryValue());
    setTextById("walletMainBudgetValue", `${getBudgetSpentValue()} ${getBudgetTotalValue()}`);
    setTextById("walletMainExpectedValue", getExpectedIncomeValue());
    setTextById("walletMainHint", getHeroHint());
  }

  function toggleMainCard() {
    const card = document.getElementById(MAIN_CARD_ID);
    if (!card) return;

    const isOpen = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(isOpen));
  }

  function handleWalletCardAction(action) {
    if (action === "mandatory") {
      openWalletTarget("openMandatoryPaymentsModalBtn", "mandatoryPaymentsModal");
      return;
    }

    if (action === "budget") {
      openWalletTarget("openBudgetAnalyticsModalBtn", "budgetAnalyticsModal");
      return;
    }

    if (action === "expected") {
      openWalletTarget("openExpectedIncomeModalBtn", "expectedIncomeModal");
    }
  }

  function bindWalletCardEvents() {
    const card = document.getElementById(MAIN_CARD_ID);
    if (!card) return;

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      toggleMainCard();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("button")) return;
      event.preventDefault();
      toggleMainCard();
    });

    document.getElementById("walletCardsAddBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clickById("openExpenseModal");
    });

    document.getElementById("walletCardsReportBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clickById("openMonthlyReportBtn");
    });

    document.getElementById("walletMainExpenseBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clickById("openExpenseModal");
    });

    document.getElementById("walletMainIncomeBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clickById("openIncomeModal");
    });

    document.getElementById("walletMainReportBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clickById("openMonthlyReportBtn");
    });

    document.querySelectorAll("[data-wallet-card-action]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleWalletCardAction(button.dataset.walletCardAction || "");
      });
    });
  }

  function observeSource(id) {
    const node = document.getElementById(id);
    if (!node) return;

    const observer = new MutationObserver(syncWalletMainCard);
    observer.observe(node, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function startSync() {
    syncWalletMainCard();
    window.setTimeout(syncWalletMainCard, 100);
    window.setTimeout(syncWalletMainCard, 350);
    window.setTimeout(syncWalletMainCard, 900);
    window.setTimeout(syncWalletMainCard, 1600);
    window.setTimeout(syncWalletMainCard, 3000);
  }

  function start() {
    createWalletCardsRoot();
    bindWalletCardEvents();

    [
      "balanceFreeMoneyValue",
      "walletLightFreeValue",
      "walletTodayCanValue",
      "walletGameHint",
      "analyticsPendingMandatoryValue",
      "walletCalendarPressureValue",
      "hardMonthBudgetSpentValue",
      "hardMonthBudgetTotalValue",
      "walletExpectedIncomeValue",
    ].forEach(observeSource);

    startSync();

    window.addEventListener("focus", syncWalletMainCard);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      syncWalletMainCard();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();