(() => {
  let syncTimer = null;

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

  function setTextById(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = value;
  }

  function cleanMoneyText(value, fallback = "0 ₽") {
  const text = String(value || "")
    .replace(/^Свободно\s*:\s*/i, "")
    .replace(/^Баланс\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return formatMoneyText(text || fallback);
}

function formatMoneyText(value) {
  const source = String(value || "").trim();

  if (!source) return "0 ₽";

  const numeric = source
    .replace(/\s/g, "")
    .replace("₽", "")
    .replace(",", ".")
    .trim();

  const amount = Number(numeric);

  if (!Number.isFinite(amount)) return source;

  const hasDecimals = Math.abs(amount % 1) > 0.0001;

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(amount) + " ₽";
}

  function getMoneyTextById(id, fallback = "0 ₽") {
    return cleanMoneyText(getTextById(id, fallback), fallback);
  }

  function getMoneyTextBySelector(selector, fallback = "0 ₽") {
    return cleanMoneyText(getTextBySelector(selector, fallback), fallback);
  }

  function extractExpectedIncomeDate(text) {
    const source = String(text || "");
    const match = source.match(/(\d{1,2}\s+[а-яё]+)/i);
    return match?.[1] || "";
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
      getMoneyTextById(
        "analyticsRemainingBudgetsValue",
        getMoneyTextById("walletLimitsPressureValue", "0 ₽")
      )
    );

    setTextById(
      "hardPressureFreeValue",
      getMoneyTextById("balanceFreeMoneyValue", "0 ₽")
    );

    setTextById(
      "hardPressureControlValue",
      getTextById("walletMandatoryControlValue", "0%")
    );
  }

  function makeNoBreakRate(value) {
  const span = document.createElement("span");

  span.style.whiteSpace = "nowrap";
  span.textContent = `${value}/день`;

  return span;
}

function syncHeroHint() {
  const hint = document.getElementById("walletGameHint");
  if (!hint) return;

  const currentHint = hint.textContent.trim();

  const isGeneratedHint =
    currentHint.startsWith("До 13 мая можно") ||
    currentHint.startsWith("До ближайших денег можно");

  const isInitialHint = currentHint.toLowerCase().includes("сейчас проверяю");

  if (currentHint && !isGeneratedHint && !isInitialHint) return;

  const todayCan = getMoneyTextById("walletTodayCanValue", "0 ₽");
  const afterIncome = getMoneyTextById("walletLimitsPressureValue", "0 ₽");

  const br = document.createElement("br");

  hint.replaceChildren(
    document.createTextNode("До 13 мая можно "),
    makeNoBreakRate(todayCan),
    document.createTextNode("."),
    br,
    document.createTextNode("После ожидаемых денег до конца месяца — "),
    makeNoBreakRate(afterIncome),
    document.createTextNode(".")
  );
}

  function syncAccountsCount() {
    const note = document.getElementById("accountsTotal");
    const list = document.getElementById("accountsList");

    if (!note || !list) return;

    const count = Array.from(list.querySelectorAll(".list-card"))
      .filter((card) => !card.classList.contains("empty-state"))
      .length;

    if (count <= 0) {
      note.textContent = "Всего 0 счетов";
      return;
    }

    const lastTwo = count % 100;
    const lastOne = count % 10;

    let word = "счетов";
    if (lastTwo < 11 || lastTwo > 14) {
      if (lastOne === 1) word = "счёт";
      if (lastOne >= 2 && lastOne <= 4) word = "счёта";
    }

    note.textContent = `Всего ${count} ${word}`;
  }

  function syncHardMode() {
    syncHeroHint();
    syncHardSummary();
    syncHardPressure();
    syncExpectedIncomeCard();
    syncAccountsCount();
  }

  function scheduleSync() {
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(syncHardMode, 0);
  }

  function bindHardActions() {
    document.addEventListener("click", (event) => {
      const mandatoryCard = event.target.closest('[data-hard-open="mandatory"]');
      const accountsBtn = event.target.closest("#hardScrollAccountsBtn");

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
      }
    });
  }

  function observeById(id) {
    const source = document.getElementById(id);
    if (!source) return;

    const observer = new MutationObserver(scheduleSync);
    observer.observe(source, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function observeBySelector(selector) {
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
    syncHardMode();

    window.setTimeout(syncHardMode, 100);
    window.setTimeout(syncHardMode, 350);
    window.setTimeout(syncHardMode, 900);
    window.setTimeout(syncHardMode, 1600);
  }

  function start() {
    bindHardActions();

    [
      "walletTodayCanValue",
      "balanceFreeMoneyValue",
      "walletCalendarPressureValue",
      "walletLimitsPressureValue",
      "analyticsPendingMandatoryValue",
      "analyticsRemainingBudgetsValue",
      "walletMandatoryControlValue",
      "walletExpectedIncomeLabel",
      "walletExpectedIncomeValue",
      "accountsList",
    ].forEach(observeById);

    observeBySelector(".hard-source-metrics .balance-amount");

    startSyncLoop();

    window.addEventListener("focus", syncHardMode);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      syncHardMode();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();