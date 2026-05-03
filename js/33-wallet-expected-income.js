(() => {
  const STORAGE_KEY = "wallet_expected_income_v1";

  function parseMoney(text) {
    const normalized = String(text || "")
      .replace(/\s/g, "")
      .replace(/[₽₽]/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    const value = Number(normalized);

    return Number.isFinite(value) ? value : 0;
  }

  function formatMoney(value) {
    const amount = Math.round((Number(value) || 0) * 100) / 100;

    return `${new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)} ₽`;
  }

  function getTodayDateValue() {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  function getStartOfToday() {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function getDateFromValue(dateValue) {
    if (!dateValue) return null;

    const date = new Date(`${dateValue}T12:00:00`);

    if (Number.isNaN(date.getTime())) return null;

    return date;
  }

  function formatDateHuman(dateValue) {
    const date = getDateFromValue(dateValue);

    if (!date) return "дата не указана";

    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  function getDaysLeftInMonth() {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    return Math.max(1, lastDay - now.getDate() + 1);
  }

  function getDaysUntilDate(dateValue) {
    const targetDate = getDateFromValue(dateValue);
    const today = getStartOfToday();

    if (!targetDate) return getDaysLeftInMonth();

    const target = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );

    const diff = Math.ceil((target.getTime() - today.getTime()) / 86400000);

    return Math.max(1, diff);
  }

  function getExpectedIncome() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) return null;

      const data = JSON.parse(raw);

      if (!data || !Number(data.amount)) return null;

      return {
        title: data.title || "Ожидаемый доход",
        amount: Number(data.amount) || 0,
        date: data.date || "",
      };
    } catch (error) {
      return null;
    }
  }

  function saveExpectedIncome(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function clearExpectedIncome() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getModalCore() {
    return window.FinanceAppModalCore || null;
  }

  function openExpectedIncomeModal() {
    const modal = document.getElementById("expectedIncomeModal");
    if (!modal) return;

    const expected = getExpectedIncome();

    const titleInput = document.getElementById("expectedIncomeTitleInput");
    const amountInput = document.getElementById("expectedIncomeAmountInput");
    const dateInput = document.getElementById("expectedIncomeDateInput");

    if (titleInput) titleInput.value = expected?.title || "";
    if (amountInput) amountInput.value = expected?.amount ? String(expected.amount).replace(".", ",") : "";
    if (dateInput) dateInput.value = expected?.date || getTodayDateValue();

    const modalCore = getModalCore();

    if (modalCore?.openAnimatedModal) {
      modalCore.openAnimatedModal(modal);
      return;
    }

    modal.classList.remove("hidden", "is-closing");

    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
    });
  }

  function closeExpectedIncomeModal() {
    const modal = document.getElementById("expectedIncomeModal");
    if (!modal) return;

    const modalCore = getModalCore();

    if (modalCore?.closeAnimatedModal) {
      modalCore.closeAnimatedModal(modal);
      return;
    }

    modal.classList.remove("is-visible");
    modal.classList.add("is-closing");

    window.setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("is-closing");
    }, 440);
  }

  function updateExpectedIncomeCard(expected) {
    const hero = document.getElementById("walletGameHero");
    const label = document.getElementById("walletExpectedIncomeLabel");
    const value = document.getElementById("walletExpectedIncomeValue");

    if (!hero || !label || !value) return;

    hero.classList.toggle("has-expected-income", Boolean(expected));

    if (!expected) {
      label.textContent = "Будущие деньги не учтены";
      value.textContent = "Добавь ожидание, если ждёшь ЗП";
      return;
    }

    label.textContent = `Ждёшь: ${expected.title}`;
    value.textContent = `минимум ${formatMoney(expected.amount)} · ${formatDateHuman(expected.date)}`;
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function setFirstStatLabel(value) {
    const label = document.querySelector(".wallet-game-hero__stats > div:first-child span");

    if (label) label.textContent = value;
  }

  function setHeroTitle(value) {
    const title = document.querySelector(".wallet-game-hero__title");

    if (title) title.textContent = value;
  }

  function setHeroEyebrow(value) {
    const eyebrow = document.querySelector(".wallet-game-hero__eyebrow");

    if (eyebrow) eyebrow.textContent = value;
  }

  function updateWalletGameHeroWithExpectedIncome() {
    const hero = document.getElementById("walletGameHero");
    const todayValue = document.getElementById("walletTodayCanValue");
    const status = document.getElementById("walletGameStatus");
    const hint = document.getElementById("walletGameHint");
    const meter = document.getElementById("walletGameMeterFill");

    if (!hero || !todayValue || !status || !hint || !meter) return;

    const expected = getExpectedIncome();

    const freeMoney = parseMoney(document.getElementById("balanceFreeMoneyValue")?.textContent);
    const calendar = parseMoney(document.getElementById("analyticsPendingMandatoryValue")?.textContent);
    const limits = parseMoney(document.getElementById("analyticsRemainingBudgetsValue")?.textContent);

    const daysLeftMonth = getDaysLeftInMonth();
    const daysUntilIncome = expected ? getDaysUntilDate(expected.date) : daysLeftMonth;

    const factPool = freeMoney - calendar - limits;
    const factTodayUntilIncome = Math.max(0, factPool / daysUntilIncome);
    const factTodayToMonthEnd = Math.max(0, factPool / daysLeftMonth);

    const expectedAmount = expected ? expected.amount : 0;
    const monthScenarioPool = factPool + expectedAmount;
    const monthScenarioToday = Math.max(0, monthScenarioPool / daysLeftMonth);

    const visibleTodayCan = expected ? monthScenarioToday : factTodayToMonthEnd;
    const visiblePool = expected ? monthScenarioPool : factPool;

    const meterValue = Math.max(
      0,
      Math.min(100, (visiblePool / Math.max(freeMoney + expectedAmount, 1)) * 100)
    );

    setText("walletCalendarPressureValue", formatMoney(calendar));
    setText("walletLimitsPressureValue", formatMoney(limits));

    if (expected) {
      setHeroEyebrow("Сценарий с ожиданием");
      setHeroTitle("До конца можно");
      setFirstStatLabel("До ЗП");
      setText("walletDaysLeftValue", `${daysUntilIncome} дн.`);
    } else {
      setHeroEyebrow("Кошелёк сегодня");
      setHeroTitle("Сегодня можно");
      setFirstStatLabel("До конца");
      setText("walletDaysLeftValue", `${daysLeftMonth} дн.`);
    }

    todayValue.textContent = formatMoney(visibleTodayCan);
    meter.style.width = `${meterValue}%`;

    updateExpectedIncomeCard(expected);

    hero.classList.remove("is-good", "is-warn", "is-bad");

    if (expected) {
      if (monthScenarioPool < 0) {
        hero.classList.add("is-bad");
        status.textContent = "Даже с ожиданием тесно";
        hint.textContent = `До ${formatDateHuman(expected.date)} по факту — ${formatMoney(factTodayUntilIncome)}/день. Даже с минимумом ${formatMoney(expected.amount)} до конца месяца останется дыра ${formatMoney(Math.abs(monthScenarioPool))}.`;
        return;
      }

      if (monthScenarioToday < 300) {
        hero.classList.add("is-bad");
        status.textContent = "Тянуть аккуратно";
        hint.textContent = `До ${formatDateHuman(expected.date)} по факту — ${formatMoney(factTodayUntilIncome)}/день. Если придёт минимум ${formatMoney(expected.amount)}, до конца месяца — ${formatMoney(monthScenarioToday)}/день.`;
        return;
      }

      if (monthScenarioToday < 700) {
        hero.classList.add("is-warn");
        status.textContent = "Осторожно можно";
        hint.textContent = `До ${formatDateHuman(expected.date)} по факту — ${formatMoney(factTodayUntilIncome)}/день. С ожиданием до конца месяца — ${formatMoney(monthScenarioToday)}/день.`;
        return;
      }

      hero.classList.add("is-good");
      status.textContent = "С ожиданием норм";
      hint.textContent = `До ${formatDateHuman(expected.date)} по факту — ${formatMoney(factTodayUntilIncome)}/день. Если минимум придёт, до конца месяца — ${formatMoney(monthScenarioToday)}/день.`;
      return;
    }

    if (factPool < 0) {
      hero.classList.add("is-bad");
      status.textContent = "По факту стоп";
      hint.textContent = `Без будущих денег дыра ${formatMoney(Math.abs(factPool))}. Ждёшь ЗП — добавь ожидание ниже.`;
      return;
    }

    if (factTodayToMonthEnd < 300) {
      hero.classList.add("is-bad");
      status.textContent = "Режим выживания";
      hint.textContent = `Безопасно в день: ${formatMoney(factTodayToMonthEnd)}. Будущие деньги пока не учитываются.`;
      return;
    }

    if (factTodayToMonthEnd < 700) {
      hero.classList.add("is-warn");
      status.textContent = "Не разгоняйся";
      hint.textContent = `Деньги есть, но запас тонкий. Безопасно в день: ${formatMoney(factTodayToMonthEnd)}.`;
      return;
    }

    hero.classList.add("is-good");
    status.textContent = "Держишься";
    hint.textContent = `Можно жить спокойнее. Безопасно в день: ${formatMoney(factTodayToMonthEnd)}.`;
  }

  function bindExpectedIncomeEvents() {
    document.addEventListener("click", (event) => {
      const openBtn = event.target.closest("#openExpectedIncomeModalBtn");
      const closeBtn = event.target.closest("#closeExpectedIncomeModalBtn");
      const saveBtn = event.target.closest("#saveExpectedIncomeBtn");
      const clearBtn = event.target.closest("#clearExpectedIncomeBtn");
      const modal = document.getElementById("expectedIncomeModal");

      if (openBtn) {
        event.preventDefault();
        event.stopPropagation();
        openExpectedIncomeModal();
        return;
      }

      if (closeBtn) {
        event.preventDefault();
        event.stopPropagation();
        closeExpectedIncomeModal();
        return;
      }

      if (modal && event.target === modal) {
        closeExpectedIncomeModal();
        return;
      }

      if (saveBtn) {
        event.preventDefault();
        event.stopPropagation();

        const titleInput = document.getElementById("expectedIncomeTitleInput");
        const amountInput = document.getElementById("expectedIncomeAmountInput");
        const dateInput = document.getElementById("expectedIncomeDateInput");

        const title = String(titleInput?.value || "").trim() || "Ожидаемый доход";
        const amount = parseMoney(amountInput?.value || "");
        const date = dateInput?.value || "";

        if (amount <= 0) {
          amountInput?.focus();
          return;
        }

        saveExpectedIncome({
          title,
          amount,
          date,
        });

        closeExpectedIncomeModal();
        updateWalletGameHeroWithExpectedIncome();
        return;
      }

      if (clearBtn) {
        event.preventDefault();
        event.stopPropagation();

        clearExpectedIncome();
        closeExpectedIncomeModal();
        updateWalletGameHeroWithExpectedIncome();
      }
    }, true);
  }

  function start() {
    if (window.__walletExpectedIncomeStarted) return;
    window.__walletExpectedIncomeStarted = true;

    bindExpectedIncomeEvents();
    updateWalletGameHeroWithExpectedIncome();

    const observer = new MutationObserver(updateWalletGameHeroWithExpectedIncome);

    [
      "balanceFreeMoneyValue",
      "analyticsPendingMandatoryValue",
      "analyticsRemainingBudgetsValue",
      "analyticsMandatoryTotalValue",
    ].forEach((id) => {
      const node = document.getElementById(id);

      if (node) {
        observer.observe(node, {
          childList: true,
          characterData: true,
          subtree: true,
        });
      }
    });

    window.addEventListener("focus", updateWalletGameHeroWithExpectedIncome);
    document.addEventListener("visibilitychange", updateWalletGameHeroWithExpectedIncome);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();