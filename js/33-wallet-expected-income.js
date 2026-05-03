(() => {
  const STORAGE_KEY = "wallet_expected_income_v1";
  const CHECK_STATE_KEY = "wallet_expected_income_check_v1";

  const FIRST_CHECK_HOUR = 14;
  const SECOND_CHECK_HOUR = 20;
  const NEXT_DAY_CHECK_HOUR = 9;

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

  function getCurrentMonthValue() {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  function getPaymentAmount(payment) {
    return parseMoney(
      payment?.amount ??
      payment?.sum ??
      payment?.value ??
      0
    );
  }

  function getPaymentPaidPeriods(payment) {
    if (Array.isArray(payment?.paid_periods)) return payment.paid_periods;
    if (Array.isArray(payment?.paidPeriods)) return payment.paidPeriods;

    return [];
  }

  function isPaymentPaidInCurrentMonth(payment) {
    return getPaymentPaidPeriods(payment).includes(getCurrentMonthValue());
  }

  function getPaymentDateInCurrentMonth(payment) {
    const rawDate =
      payment?.due_date ||
      payment?.dueDate ||
      payment?.date ||
      payment?.payment_date ||
      payment?.paymentDate ||
      payment?.due_day ||
      payment?.dueDay ||
      payment?.day ||
      "";

    if (!rawDate) return null;

    const rawText = String(rawDate);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return getDateFromValue(rawText.slice(0, 10));
    }

    const day = Number(rawText);

    if (!Number.isFinite(day) || day <= 0) return null;

    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      Math.min(31, Math.max(1, day))
    );
  }

  function getCalendarUntilDate(totalCalendar, targetDateValue) {
    const state = window.FinanceAppState?.state;
    const targetDate = getDateFromValue(targetDateValue);

    if (!targetDate || !state || !Array.isArray(state.mandatoryPayments)) {
      return totalCalendar;
    }

    let hasAnyDatedPayment = false;
    let amountBeforeTarget = 0;

    state.mandatoryPayments.forEach((payment) => {
      if (!payment || payment.enabled === false) return;
      if (isPaymentPaidInCurrentMonth(payment)) return;

      const paymentDate = getPaymentDateInCurrentMonth(payment);

      if (!paymentDate) return;

      hasAnyDatedPayment = true;

      if (paymentDate.getTime() <= targetDate.getTime()) {
        amountBeforeTarget += getPaymentAmount(payment);
      }
    });

    if (!hasAnyDatedPayment) {
      return totalCalendar;
    }

    return Math.min(totalCalendar, Math.max(0, amountBeforeTarget));
  }

  function getLimitsUntilDate(totalLimits, daysUntilIncome, daysLeftMonth) {
    if (daysLeftMonth <= 0) return totalLimits;

    const ratio = Math.min(1, Math.max(0, daysUntilIncome / daysLeftMonth));

    return Math.round(totalLimits * ratio * 100) / 100;
  }

  function setPressureLabels(calendarLabel, limitsLabel) {
    const calendarNode = document.querySelector(".wallet-game-hero__pressure > div:first-child span");
    const limitsNode = document.querySelector(".wallet-game-hero__pressure > div:nth-child(2) span");

    if (calendarNode) calendarNode.textContent = calendarLabel;
    if (limitsNode) limitsNode.textContent = limitsLabel;
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
  
    function getExpectedIncomeSignature(expected) {
    if (!expected) return "";

    return [
      expected.title || "",
      expected.amount || 0,
      expected.date || "",
    ].join("|");
  }

  function getCheckState() {
    try {
      const raw = localStorage.getItem(CHECK_STATE_KEY);

      if (!raw) return null;

      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function saveCheckState(state) {
    localStorage.setItem(CHECK_STATE_KEY, JSON.stringify(state));
  }

  function clearExpectedIncomeCheckState() {
    localStorage.removeItem(CHECK_STATE_KEY);
  }

  function getDateValueFromDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function getDateAtHour(dateValue, hour) {
    const date = getDateFromValue(dateValue) || getStartOfToday();

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      0,
      0,
      0
    );
  }

  function getTomorrowAtHour(hour) {
    const today = getStartOfToday();

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      hour,
      0,
      0,
      0
    );
  }

  function getExpectedIncomeCheckSlot(expected) {
    if (!expected || !expected.date) return null;

    const todayValue = getTodayDateValue();
    const currentHour = new Date().getHours();

    if (expected.date > todayValue) return null;

    if (expected.date === todayValue) {
      if (currentHour < FIRST_CHECK_HOUR) return null;
      if (currentHour < SECOND_CHECK_HOUR) return "14";

      return "20";
    }

    return "overdue";
  }

  function shouldShowExpectedIncomeCheck(expected) {
    const slot = getExpectedIncomeCheckSlot(expected);

    if (!slot) return false;

    const now = Date.now();
    const signature = getExpectedIncomeSignature(expected);
    const todayValue = getTodayDateValue();
    const checkKey = `${signature}|${todayValue}|${slot}`;
    const state = getCheckState();

    if (state?.signature === signature && state?.snoozeUntil && now < state.snoozeUntil) {
      return false;
    }

    if (state?.signature === signature && state?.lastShownKey === checkKey) {
      return false;
    }

    return true;
  }

  function markExpectedIncomeCheckShown(expected) {
    const slot = getExpectedIncomeCheckSlot(expected);

    if (!slot) return;

    const signature = getExpectedIncomeSignature(expected);
    const todayValue = getTodayDateValue();

    saveCheckState({
      signature,
      lastShownKey: `${signature}|${todayValue}|${slot}`,
      snoozeUntil: 0,
    });
  }

  function snoozeExpectedIncomeCheck(expected) {
    if (!expected) return;

    const slot = getExpectedIncomeCheckSlot(expected);
    const signature = getExpectedIncomeSignature(expected);

    let snoozeUntil = getTomorrowAtHour(NEXT_DAY_CHECK_HOUR).getTime();

    if (expected.date === getTodayDateValue() && slot === "14") {
      snoozeUntil = getDateAtHour(expected.date, SECOND_CHECK_HOUR).getTime();
    }

    saveCheckState({
      signature,
      lastShownKey: `${signature}|${getTodayDateValue()}|${slot || "manual"}`,
      snoozeUntil,
    });
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
  
    function ensureExpectedIncomeCheckModal() {
    if (document.getElementById("expectedIncomeCheckModal")) return;

    document.body.insertAdjacentHTML("beforeend", `
      <div class="modal hidden" id="expectedIncomeCheckModal" role="dialog" aria-modal="true" aria-label="Проверка ожидаемых денег">
        <div class="modal-sheet">
          <div class="modal-handle"></div>

          <div class="manager-card">
            <h2 class="modal-title">Что по деньгам?</h2>

            <p class="expected-income-check-text" id="expectedIncomeCheckText">
              Ожидаемые деньги должны были прийти.
            </p>

            <div class="modal-actions">
              <button
                class="btn btn-primary"
                type="button"
                id="expectedIncomeArrivedBtn"
              >
                Деньги пришли
              </button>

              <button
                class="btn btn-danger"
                type="button"
                id="expectedIncomeWaitMoreBtn"
              >
                Жду дальше
              </button>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  function openExpectedIncomeCheckModal() {
    const expected = getExpectedIncome();

    if (!expected || !shouldShowExpectedIncomeCheck(expected)) return;

    ensureExpectedIncomeCheckModal();

    const modal = document.getElementById("expectedIncomeCheckModal");
    const text = document.getElementById("expectedIncomeCheckText");

    if (!modal) return;

    if (text) {
      const isOverdue = expected.date < getTodayDateValue();

      text.textContent = isOverdue
        ? `${expected.title} должна была прийти ${formatDateHuman(expected.date)}. Минимум: ${formatMoney(expected.amount)}.`
        : `Сегодня ждёшь ${expected.title}. Минимум: ${formatMoney(expected.amount)}.`;
    }

    markExpectedIncomeCheckShown(expected);

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

  function closeExpectedIncomeCheckModal() {
    const modal = document.getElementById("expectedIncomeCheckModal");

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

  function scheduleExpectedIncomeCheck() {
    window.clearTimeout(window.__expectedIncomeCheckTimer);

    const expected = getExpectedIncome();

    if (!expected || !expected.date) return;

    const now = Date.now();
    const todayValue = getTodayDateValue();

    let nextCheckDate = null;

    if (expected.date > todayValue) {
      nextCheckDate = getDateAtHour(expected.date, FIRST_CHECK_HOUR);
    } else if (expected.date === todayValue) {
      const firstCheck = getDateAtHour(expected.date, FIRST_CHECK_HOUR);
      const secondCheck = getDateAtHour(expected.date, SECOND_CHECK_HOUR);

      if (now < firstCheck.getTime()) {
        nextCheckDate = firstCheck;
      } else if (now < secondCheck.getTime()) {
        nextCheckDate = secondCheck;
      }
    } else {
      nextCheckDate = getTomorrowAtHour(NEXT_DAY_CHECK_HOUR);
    }

    if (!nextCheckDate) return;

    const delay = Math.max(1000, nextCheckDate.getTime() - now);

    window.__expectedIncomeCheckTimer = window.setTimeout(() => {
      openExpectedIncomeCheckModal();
      scheduleExpectedIncomeCheck();
    }, delay);
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

    const calendarUntilIncome = expected
      ? getCalendarUntilDate(calendar, expected.date)
      : calendar;

    const limitsUntilIncome = expected
      ? getLimitsUntilDate(limits, daysUntilIncome, daysLeftMonth)
      : limits;

    const factPoolToMonthEnd = freeMoney - calendar - limits;
    const factPoolUntilIncome = freeMoney - calendarUntilIncome - limitsUntilIncome;

    const factTodayUntilIncome = Math.max(0, factPoolUntilIncome / daysUntilIncome);
    const factTodayToMonthEnd = Math.max(0, factPoolToMonthEnd / daysLeftMonth);

    const expectedAmount = expected ? expected.amount : 0;
    const monthScenarioPool = factPoolToMonthEnd + expectedAmount;
    const monthScenarioToday = Math.max(0, monthScenarioPool / daysLeftMonth);

    const visibleTodayCan = expected ? factTodayUntilIncome : factTodayToMonthEnd;
    const visiblePool = expected ? factPoolUntilIncome : factPoolToMonthEnd;
    
    const meterValue = Math.max(
      0,
      Math.min(100, (visiblePool / Math.max(freeMoney + expectedAmount, 1)) * 100)
    );

        if (expected) {
      setPressureLabels("Календарь до ЗП", "Лимиты до ЗП");
      setText("walletCalendarPressureValue", formatMoney(calendarUntilIncome));
      setText("walletLimitsPressureValue", formatMoney(limitsUntilIncome));
    } else {
      setPressureLabels("Календарь", "Лимиты");
      setText("walletCalendarPressureValue", formatMoney(calendar));
      setText("walletLimitsPressureValue", formatMoney(limits));
    }

    if (expected) {
            setHeroEyebrow("До ближайших денег");
      setHeroTitle("До ЗП можно");
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
      if (factPoolUntilIncome < 0) {
        hero.classList.add("is-bad");
        status.textContent = "До ЗП стоп";
        hint.textContent = `До ${formatDateHuman(expected.date)} не хватает ${formatMoney(Math.abs(factPoolUntilIncome))}. Если придёт минимум ${formatMoney(expected.amount)}, до конца месяца будет ${formatMoney(monthScenarioToday)}/день.`;
        return;
      }

      if (factTodayUntilIncome < 300) {
        hero.classList.add("is-bad");
        status.textContent = "Тянуть аккуратно";
        hint.textContent = `До ${formatDateHuman(expected.date)} можно ${formatMoney(factTodayUntilIncome)}/день. После ожидаемых денег сценарий до конца месяца — ${formatMoney(monthScenarioToday)}/день.`;
        return;
      }

      if (factTodayUntilIncome < 700) {
        hero.classList.add("is-warn");
        status.textContent = "Осторожно можно";
        hint.textContent = `До ${formatDateHuman(expected.date)} можно ${formatMoney(factTodayUntilIncome)}/день. Если минимум придёт, до конца месяца — ${formatMoney(monthScenarioToday)}/день.`;
        return;
      }

      hero.classList.add("is-good");
      status.textContent = "До ЗП норм";
      hint.textContent = `До ${formatDateHuman(expected.date)} можно ${formatMoney(factTodayUntilIncome)}/день. После ожидаемых денег до конца месяца — ${formatMoney(monthScenarioToday)}/день.`;
      return;
    }

    if (factPoolToMonthEnd < 0) {
      hero.classList.add("is-bad");
      status.textContent = "По факту стоп";
      hint.textContent = `Без будущих денег дыра ${formatMoney(Math.abs(factPoolToMonthEnd))}. Ждёшь ЗП — добавь ожидание ниже.`;
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
      const arrivedBtn = event.target.closest("#expectedIncomeArrivedBtn");
      const waitMoreBtn = event.target.closest("#expectedIncomeWaitMoreBtn");
      const modal = document.getElementById("expectedIncomeModal");
      
            if (arrivedBtn) {
        event.preventDefault();
        event.stopPropagation();

        clearExpectedIncome();
        clearExpectedIncomeCheckState();
        closeExpectedIncomeCheckModal();
        updateWalletGameHeroWithExpectedIncome();

        window.setTimeout(() => {
          openExpectedIncomeModal();
        }, 280);

        return;
      }

      if (waitMoreBtn) {
        event.preventDefault();
        event.stopPropagation();

        const expected = getExpectedIncome();

        snoozeExpectedIncomeCheck(expected);
        closeExpectedIncomeCheckModal();

        window.setTimeout(() => {
          openExpectedIncomeModal();
        }, 280);

        scheduleExpectedIncomeCheck();

        return;
      }

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
        scheduleExpectedIncomeCheck();
        return;
        return;
      }

      if (clearBtn) {
        event.preventDefault();
        event.stopPropagation();

                clearExpectedIncome();
        clearExpectedIncomeCheckState();
        closeExpectedIncomeModal();
        updateWalletGameHeroWithExpectedIncome();
        scheduleExpectedIncomeCheck();
      }
    }, true);
  }

  function start() {
    if (window.__walletExpectedIncomeStarted) return;
    window.__walletExpectedIncomeStarted = true;

        bindExpectedIncomeEvents();
    ensureExpectedIncomeCheckModal();
    updateWalletGameHeroWithExpectedIncome();
    openExpectedIncomeCheckModal();
    scheduleExpectedIncomeCheck();

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

        window.addEventListener("focus", () => {
      updateWalletGameHeroWithExpectedIncome();
      openExpectedIncomeCheckModal();
      scheduleExpectedIncomeCheck();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      updateWalletGameHeroWithExpectedIncome();
      openExpectedIncomeCheckModal();
      scheduleExpectedIncomeCheck();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();