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

  function formatDateHuman(dateValue) {
    if (!dateValue) return "дата не указана";

    const date = new Date(`${dateValue}T12:00:00`);

    if (Number.isNaN(date.getTime())) return "дата не указана";

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
    const daysLeft = getDaysLeftInMonth();

    const factPool = freeMoney - calendar - limits;
    const factTodayCan = Math.max(0, factPool / daysLeft);

    const expectedAmount = expected ? expected.amount : 0;
    const scenarioPool = factPool + expectedAmount;
    const scenarioTodayCan = Math.max(0, scenarioPool / daysLeft);

    const visibleTodayCan = expected ? scenarioTodayCan : factTodayCan;
    const visiblePool = expected ? scenarioPool : factPool;

    const meterValue = Math.max(
      0,
      Math.min(100, (visiblePool / Math.max(freeMoney + expectedAmount, 1)) * 100)
    );

    setText("walletDaysLeftValue", `${daysLeft} дн.`);
    setText("walletCalendarPressureValue", formatMoney(calendar));
    setText("walletLimitsPressureValue", formatMoney(limits));

    todayValue.textContent = formatMoney(visibleTodayCan);
    meter.style.width = `${meterValue}%`;

    updateExpectedIncomeCard(expected);

    hero.classList.remove("is-good", "is-warn", "is-bad");

    if (expected) {
      if (scenarioPool < 0) {
        hero.classList.add("is-bad");
        status.textContent = "Даже с ожиданием тесно";
        hint.textContent = `По факту сейчас ${formatMoney(factTodayCan)}/день. Даже если придёт минимум ${formatMoney(expected.amount)}, дыра останется ${formatMoney(Math.abs(scenarioPool))}.`;
        return;
      }

      if (scenarioTodayCan < 300) {
        hero.classList.add("is-bad");
        status.textContent = "Живём на ожидании";
        hint.textContent = `По факту сейчас ${formatMoney(factTodayCan)}/день. С ожидаемыми деньгами — ${formatMoney(scenarioTodayCan)}/день.`;
        return;
      }

      if (scenarioTodayCan < 700) {
        hero.classList.add("is-warn");
        status.textContent = "Осторожно можно";
        hint.textContent = `Без будущих денег было бы ${formatMoney(factTodayCan)}/день. С ожиданием — ${formatMoney(scenarioTodayCan)}/день.`;
        return;
      }

      hero.classList.add("is-good");
      status.textContent = "С ожиданием норм";
      hint.textContent = `Если придёт минимум ${formatMoney(expected.amount)}, безопасно примерно ${formatMoney(scenarioTodayCan)}/день.`;
      return;
    }

    if (factPool < 0) {
      hero.classList.add("is-bad");
      status.textContent = "По факту стоп";
      hint.textContent = `Без будущих денег дыра ${formatMoney(Math.abs(factPool))}. Ждёшь ЗП — добавь ожидание ниже.`;
      return;
    }

    if (factTodayCan < 300) {
      hero.classList.add("is-bad");
      status.textContent = "Режим выживания";
      hint.textContent = `Безопасно в день: ${formatMoney(factTodayCan)}. Будущие деньги пока не учитываются.`;
      return;
    }

    if (factTodayCan < 700) {
      hero.classList.add("is-warn");
      status.textContent = "Не разгоняйся";
      hint.textContent = `Деньги есть, но запас тонкий. Безопасно в день: ${formatMoney(factTodayCan)}.`;
      return;
    }

    hero.classList.add("is-good");
    status.textContent = "Держишься";
    hint.textContent = `Можно жить спокойнее. Безопасно в день: ${formatMoney(factTodayCan)}.`;
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