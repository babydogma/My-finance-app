(() => {
  let syncTimer = null;
  let normalized = false;

  function forceHardModeClass() {
    if (!document.body) return;

    document.body.classList.add("wallet-mode-hard");
    document.body.classList.remove("wallet-mode-light");
  }

  forceHardModeClass();

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function getTextById(id, fallback = "0 ₽") {
    const element = document.getElementById(id);
    const text = element?.textContent?.trim();

    return text || fallback;
  }

  function getTextBySelector(selector, fallback = "0 ₽") {
    const element = document.querySelector(selector);
    const text = element?.textContent?.trim();

    return text || fallback;
  }

  function cleanMoneyText(value, fallback = "0 ₽") {
    const text = String(value || "")
      .replace(/^Свободно\s*:\s*/i, "")
      .replace(/^Баланс\s*:\s*/i, "")
      .replace(/\s+/g, " ")
      .trim();

    return text || fallback;
  }

  function getMoneyTextById(id, fallback = "0 ₽") {
    return cleanMoneyText(getTextById(id, fallback), fallback);
  }

  function getMoneyTextBySelector(selector, fallback = "0 ₽") {
    return cleanMoneyText(getTextBySelector(selector, fallback), fallback);
  }

  function setTextById(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = value;
  }

  function setText(element, value) {
    if (!element) return;

    element.textContent = value;
  }

  function parsePercent(value) {
    const number = Number(
      String(value || "")
        .replace("%", "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")
    );

    if (!Number.isFinite(number)) return 0;

    return Math.max(0, Math.min(100, number));
  }

  function extractExpectedIncomeDate(text) {
    const source = String(text || "");
    const match = source.match(/(\d{1,2}\s+[а-яё]+)/i);

    return match?.[1] || "";
  }

  function declineAccounts(count) {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) return "счетов";
    if (lastOne === 1) return "счёт";
    if (lastOne >= 2 && lastOne <= 4) return "счёта";

    return "счетов";
  }

  function setIconMarkup(element, svg) {
    if (!element) return;

    element.innerHTML = svg;
  }

  function normalizeHero() {
    setText(qs(".wallet-game-hero__eyebrow"), "До ближайших денег");
    setText(qs(".wallet-game-hero__title"), "До ЗП можно");

    const hint = document.getElementById("walletGameHint");
    const currentHint = hint?.textContent?.trim() || "";

    if (
      hint &&
      (!currentHint || currentHint.toLowerCase().includes("сейчас проверяю"))
    ) {
      const todayCan = getMoneyTextById("walletTodayCanValue", "0 ₽");
      const afterIncome = getMoneyTextById("walletLimitsPressureValue", "0 ₽");

      hint.textContent = `До ближайших денег можно ${todayCan}/день. После ожидаемых денег до конца месяца — ${afterIncome}/день.`;
    }
  }

  function normalizeActions() {
    const icons = {
      openExpenseModal: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M9 7h8v8" />
        </svg>
      `,
      openIncomeModal: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 7 7 17" />
          <path d="M7 9v8h8" />
        </svg>
      `,
      openTransferModal: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M10 7h7v7" />
        </svg>
      `,
      openCategoriesManagerBtn: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 8h10" />
          <path d="M14 5l3 3-3 3" />
          <path d="M17 16H7" />
          <path d="M10 13l-3 3 3 3" />
        </svg>
      `,
    };

    Object.entries(icons).forEach(([buttonId, svg]) => {
      const icon = document.getElementById(buttonId)?.querySelector(".action-icon");
      setIconMarkup(icon, svg);
    });
  }

  function normalizeSummary() {
    setText(qs(".hard-summary-section .hard-section-title"), "Коротко");
  }

  function normalizePlan() {
    setText(qs(".hard-plan-section .hard-section-title"), "План");
  }

  function normalizeAccounts() {
    setText(qs(".accounts-section .section-title"), "Счета");

    const note = document.getElementById("accountsTotal");
    if (note) {
      note.classList.add("accounts-total-note--count");
    }
  }

  function normalizePressureCards() {
    const section = qs(".hard-pressure-section");
    if (!section) return;

    setText(qs(".hard-pressure-section .hard-section-title"), "Что важно сейчас");

    const head = qs(".hard-pressure-section .hard-section-head");
    if (head && !document.getElementById("hardScrollPlanBtn")) {
      const button = document.createElement("button");
      button.type = "button";
      button.id = "hardScrollPlanBtn";
      button.className = "hard-section-link";
      button.innerHTML = "Смотреть план <span>›</span>";
      head.appendChild(button);
    }

    const mandatoryCard = qs(".hard-pressure-card--danger");
    const limitsCard = qs(".hard-pressure-card--blue");
    const coveredCard = qs(".hard-pressure-card--green");
    const controlCard = qs(".hard-pressure-card--control");

    if (mandatoryCard) {
      mandatoryCard.classList.add("hard-pressure-card--calendar");
      setText(qs(".hard-pressure-card__label", mandatoryCard), "Календарные платежи");
      setText(qs("small", mandatoryCard), "К вычету из свободных средств");
      setIconMarkup(qs(".hard-pressure-card__icon", mandatoryCard), `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4v3" />
          <path d="M17 4v3" />
          <rect x="4" y="6" width="16" height="14" rx="4" />
        </svg>
      `);
    }

    if (coveredCard) {
      coveredCard.classList.add("hard-pressure-card--covered");
      setText(qs(".hard-pressure-card__label", coveredCard), "Покрыто накоплениями");
      setText(qs("small", coveredCard), "Защита от непредвиденных расходов");
      setIconMarkup(qs(".hard-pressure-card__icon", coveredCard), `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 19 6v5c0 4.2-2.7 7.9-7 10-4.3-2.1-7-5.8-7-10V6l7-3Z" />
        </svg>
      `);
    }

    if (limitsCard) {
      limitsCard.classList.add("hard-pressure-card--limits");
      setText(qs(".hard-pressure-card__label", limitsCard), "Остаток лимитов");
      setText(qs("small", limitsCard), "Использовано из доступных лимитов");
      setIconMarkup(qs(".hard-pressure-card__icon", limitsCard), `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 19V5" />
          <path d="M9 19v-8" />
          <path d="M13 19V8" />
          <path d="M17 19v-5" />
        </svg>
      `);
    }

    if (controlCard) {
      setText(qs(".hard-pressure-card__label", controlCard), "Под контролем");
      setText(qs("small", controlCard), "От обязательных платежей под контролем");
      setIconMarkup(qs(".hard-pressure-card__icon", controlCard), `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 1 1-9 9" />
          <path d="M12 3a9 9 0 0 1 9 9" />
        </svg>
      `);
    }
  }

  function normalizeOperations() {
    setText(qs(".transactions-preview-card__title"), "Операции");

    const note = qs(".transactions-preview-card__note");
    if (note && !document.getElementById("hardAllOperationsBtn")) {
      note.innerHTML = `
        <button class="hard-inline-link" type="button" id="hardAllOperationsBtn">
          Все операции <span>›</span>
        </button>
      `;
    }
  }

  function ensureAnalyticsSection() {
    if (document.getElementById("hardWalletAnalytics")) return;

    const transactionsSection = qs(".transactions-preview-section");
    const mainView = document.getElementById("mainView");

    if (!transactionsSection || !mainView) return;

    const section = document.createElement("section");
    section.className = "section hard-wallet-analytics-section";
    section.id = "hardWalletAnalytics";
    section.innerHTML = `
      <div class="hard-section-head hard-analytics-head">
        <h2 class="hard-section-title">Аналитика</h2>
        <button class="hard-section-link" type="button" id="hardOpenAnalyticsBtn">
          Подробная аналитика <span>›</span>
        </button>
      </div>

      <div class="hard-analytics-grid">
        <article class="hard-analytics-card hard-analytics-card--expense">
          <span class="hard-analytics-card__label">Расходы мая</span>
          <strong id="hardAnalyticsExpenseValue">0 ₽</strong>
          <small id="hardAnalyticsExpenseDelta">к текущему месяцу</small>
          <span class="hard-analytics-sparkline" aria-hidden="true"></span>
        </article>

        <article class="hard-analytics-card hard-analytics-card--tempo">
          <span class="hard-analytics-card__label">Темп месяца</span>
          <strong id="hardAnalyticsTempoValue">0%</strong>
          <small>к плану до ЗП</small>
          <span class="hard-analytics-progress" aria-hidden="true">
            <span id="hardAnalyticsProgressBar"></span>
          </span>
        </article>

        <article class="hard-analytics-card hard-analytics-card--savings">
          <span class="hard-analytics-card__label">Накопления и %</span>
          <strong id="hardAnalyticsInterestValue">0 ₽</strong>
          <small>начислено за май</small>
          <span class="hard-analytics-bars" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </span>
        </article>
      </div>

      <article class="hard-focus-card">
        <div class="hard-focus-card__head">
          <span class="hard-focus-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3 14.4 9.6 21 12 14.4 14.4 12 21 9.6 14.4 3 12 9.6 9.6 12 3Z" />
            </svg>
          </span>
          <div>
            <h3>Фокус месяца</h3>
            <p>1 рекомендация для роста вашей финансовой дисциплины</p>
          </div>
        </div>

        <button class="hard-focus-recommendation" type="button" id="hardFocusRecommendationBtn">
          <span class="hard-focus-recommendation__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7 4h8l2 2v14H7z" />
              <path d="M15 4v4h4" />
              <path d="M9 13h6" />
              <path d="M9 16h4" />
            </svg>
          </span>
          <span class="hard-focus-recommendation__body">
            <strong id="hardFocusTitle">Держите темп до ЗП</strong>
            <small id="hardFocusText">Сравниваю план, свободные деньги и лимиты.</small>
          </span>
          <span class="hard-focus-recommendation__chevron">›</span>
        </button>

        <div class="hard-focus-tags" aria-hidden="true">
          <span>Контроль расходов</span>
          <span>Лимиты</span>
          <span>Накопления</span>
        </div>
      </article>
    `;

    transactionsSection.after(section);
  }

  function normalizeStaticLayout() {
    forceHardModeClass();
    normalizeHero();
    normalizeActions();
    normalizeSummary();
    normalizePlan();
    normalizeAccounts();
    normalizePressureCards();
    normalizeOperations();
    ensureAnalyticsSection();

    normalized = true;
  }

  function syncExpectedIncomeCard() {
    const label = document.getElementById("walletExpectedIncomeLabel");
    const value = document.getElementById("walletExpectedIncomeValue");
    const button = document.getElementById("openExpectedIncomeModalBtn");

    if (!label || !value || !button) return;

    const valueText = value.textContent.trim();
    const hasExpectedIncome =
      valueText &&
      !valueText.toLowerCase().includes("добавь") &&
      valueText !== "0 ₽";

    if (!hasExpectedIncome) {
      label.textContent = "Будущие деньги не учтены";
      button.textContent = "Жду деньги";
      return;
    }

    label.textContent = "Ждёшь деньги";

    const dateLabel = extractExpectedIncomeDate(valueText);

    if (dateLabel) {
      button.textContent = dateLabel;
    }
  }

  function syncAccountsCount() {
    const note = document.getElementById("accountsTotal");
    const cards = qsa("#accountsList .list-card").filter((card) => {
      return !card.classList.contains("empty-state") && card.textContent.trim();
    });

    if (!note) return;

    const count = cards.length;
    note.textContent = count > 0 ? `Всего ${count} ${declineAccounts(count)}` : "Всего 0 счетов";
  }

  function syncHardSummary() {
    setTextById(
      "hardSummaryFreeValue",
      getMoneyTextById("balanceFreeMoneyValue", "0 ₽")
    );

    setTextById(
      "hardSummaryBalanceValue",
      getMoneyTextBySelector(".hard-source-metrics .balance-amount", "0 ₽")
    );

    setTextById(
      "hardSummaryCalendarValue",
      getMoneyTextById("walletCalendarPressureValue", "0 ₽")
    );

    setTextById(
      "hardSummaryLimitsValue",
      getMoneyTextById("walletLimitsPressureValue", "0 ₽")
    );
  }

  function syncHardPressure() {
    setTextById(
      "hardPressureMandatoryValue",
      getMoneyTextById("analyticsPendingMandatoryValue", "0 ₽")
    );

    setTextById(
      "hardPressureLimitsValue",
      getMoneyTextById("analyticsRemainingBudgetsValue", getMoneyTextById("walletLimitsPressureValue", "0 ₽"))
    );

    setTextById(
      "hardPressureFreeValue",
      getMoneyTextById("analyticsMandatoryCoveredValue", getMoneyTextById("balanceFreeMoneyValue", "0 ₽"))
    );

    setTextById(
      "hardPressureControlValue",
      getTextById("walletMandatoryControlValue", "0%")
    );
  }

  function syncAnalyticsSection() {
    const expenses = getMoneyTextById(
      "analyticsExpenseValuePremium",
      getMoneyTextById("analyticsExpenseValue", getMoneyTextById("analyticsPendingMandatoryValue", "0 ₽"))
    );
    const control = getTextById("walletMandatoryControlValue", "0%");
    const interest = getMoneyTextById(
      "analyticsInterestValue",
      getMoneyTextById("monthlyReportSavingsInterestValue", "0 ₽")
    );
    const dailyLimit = getMoneyTextById("walletTodayCanValue", "0 ₽");

    setTextById("hardAnalyticsExpenseValue", expenses);
    setTextById("hardAnalyticsTempoValue", control);
    setTextById("hardAnalyticsInterestValue", interest);

    const progress = document.getElementById("hardAnalyticsProgressBar");
    if (progress) {
      progress.style.width = `${parsePercent(control)}%`;
    }

    const focusTitle = document.getElementById("hardFocusTitle");
    const focusText = document.getElementById("hardFocusText");
    const percent = parsePercent(control);

    if (focusTitle && focusText) {
      if (percent >= 80) {
        focusTitle.textContent = "План держится нормально";
        focusText.textContent = `Темп под контролем. Не разгоняйте ежедневные траты выше ${dailyLimit}.`;
      } else if (percent >= 45) {
        focusTitle.textContent = "Держите темп до ЗП";
        focusText.textContent = `Вы на ${control} к плану — чтобы уложиться в лимиты, держите день около ${dailyLimit}.`;
      } else {
        focusTitle.textContent = "Прижмите лишние расходы";
        focusText.textContent = `Запас слабый. До ближайших денег безопаснее держать день не выше ${dailyLimit}.`;
      }
    }
  }

  function syncHeroHint() {
    const hint = document.getElementById("walletGameHint");
    if (!hint) return;

    const currentHint = hint.textContent.trim();

    const isOwnHint = currentHint.startsWith("До ближайших денег можно");
    const isGenericHint = currentHint.toLowerCase().includes("сейчас проверяю");

    if (currentHint && !isOwnHint && !isGenericHint) return;

    const todayCan = getMoneyTextById("walletTodayCanValue", "0 ₽");
    const afterIncome = getMoneyTextById("walletLimitsPressureValue", "0 ₽");

    hint.textContent = `До ближайших денег можно ${todayCan}/день. После ожидаемых денег до конца месяца — ${afterIncome}/день.`;
  }

  function syncHardModePreview() {
    if (!normalized) {
      normalizeStaticLayout();
    }

    syncHeroHint();
    syncHardSummary();
    syncHardPressure();
    syncExpectedIncomeCard();
    syncAccountsCount();
    syncAnalyticsSection();
  }

  function scheduleSync() {
    window.clearTimeout(syncTimer);

    syncTimer = window.setTimeout(syncHardModePreview, 0);
  }

  function bindHardActions() {
    document.addEventListener("click", (event) => {
      const mandatoryCard = event.target.closest('[data-hard-open="mandatory"]');
      const accountsBtn = event.target.closest("#hardScrollAccountsBtn");
      const planBtn = event.target.closest("#hardScrollPlanBtn");
      const operationsBtn = event.target.closest("#hardAllOperationsBtn");
      const analyticsBtn = event.target.closest("#hardOpenAnalyticsBtn");
      const focusBtn = event.target.closest("#hardFocusRecommendationBtn");

      if (mandatoryCard) {
        event.preventDefault();
        document.getElementById("openMandatoryPaymentsModalBtn")?.click();
        return;
      }

      if (accountsBtn) {
        event.preventDefault();

        document.querySelector(".accounts-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      if (planBtn || focusBtn) {
        event.preventDefault();

        document.querySelector(".hard-plan-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      if (operationsBtn) {
        event.preventDefault();
        document.getElementById("navOperationsBtn")?.click();
        return;
      }

      if (analyticsBtn) {
        event.preventDefault();
        document.getElementById("navAnalyticsBtn")?.click();
      }
    });
  }

  function observeSourceById(id) {
    const source = document.getElementById(id);

    if (!source) return;

    const observer = new MutationObserver(scheduleSync);

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function observeSourceBySelector(selector) {
    const source = document.querySelector(selector);

    if (!source) return;

    const observer = new MutationObserver(scheduleSync);

    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function startSyncLoop() {
    syncHardModePreview();

    window.setTimeout(syncHardModePreview, 100);
    window.setTimeout(syncHardModePreview, 350);
    window.setTimeout(syncHardModePreview, 900);
    window.setTimeout(syncHardModePreview, 1600);
    window.setTimeout(syncHardModePreview, 2800);
  }

  function start() {
    forceHardModeClass();
    bindHardActions();
    normalizeStaticLayout();

    [
      "walletTodayCanValue",
      "balanceFreeMoneyValue",
      "walletCalendarPressureValue",
      "walletLimitsPressureValue",
      "analyticsPendingMandatoryValue",
      "analyticsMandatoryCoveredValue",
      "analyticsRemainingBudgetsValue",
      "walletMandatoryControlValue",
      "walletExpectedIncomeLabel",
      "walletExpectedIncomeValue",
      "analyticsExpenseValue",
      "analyticsExpenseValuePremium",
      "analyticsInterestValue",
      "monthlyReportSavingsInterestValue",
      "accountsList",
      "transactionsList",
    ].forEach(observeSourceById);

    observeSourceBySelector(".hard-source-metrics .balance-amount");

    startSyncLoop();

    window.addEventListener("focus", syncHardModePreview);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      syncHardModePreview();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
