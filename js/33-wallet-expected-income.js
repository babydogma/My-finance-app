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

  function roundMoney(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
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

  function getState() {
    return window.FinanceAppState?.state || null;
  }

  function getPaymentAmount(payment) {
    return roundMoney(
      parseMoney(
        payment?.amount ??
        payment?.sum ??
        payment?.value ??
        0
      )
    );
  }

  function getPaymentPaidPeriods(payment) {
    const periods = [];

    if (Array.isArray(payment?.paid_periods)) {
      periods.push(...payment.paid_periods);
    }

    if (Array.isArray(payment?.paidPeriods)) {
      periods.push(...payment.paidPeriods);
    }

    if (payment?.last_paid_period) {
      periods.push(payment.last_paid_period);
    }

    return periods.filter(Boolean);
  }

  function isPaymentPaidInMonth(payment, monthKey = getCurrentMonthValue()) {
    return getPaymentPaidPeriods(payment).includes(monthKey);
  }

  function isPaymentVisibleInMonth(payment, monthKey = getCurrentMonthValue()) {
    if (!payment || payment.enabled === false) return false;

    const startPeriod =
      payment.start_period ||
      payment.due_period ||
      payment.period ||
      monthKey;

    return String(startPeriod) <= String(monthKey);
  }

  function getPaymentDateInMonth(payment, monthKey = getCurrentMonthValue()) {
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

    const [rawYear, rawMonth] = String(monthKey).split("-");
    const year = Number(rawYear);
    const month = Number(rawMonth);
    const day = Number(rawText);

    if (
      !Number.isFinite(year) ||
      !Number.isFinite(month) ||
      !Number.isFinite(day)
    ) {
      return null;
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate();

    return new Date(
      year,
      month - 1,
      Math.min(lastDayOfMonth, Math.max(1, day))
    );
  }

  function getSafeBucketById(bucketId) {
    const state = getState();

    return state?.safeBuckets?.find((bucket) => bucket.id === bucketId) || null;
  }

  function getLinkedSafeBalance(bucketId) {
    if (!bucketId) return 0;

    const bridgeValue = window.FinanceAppSavingsBridge?.getSafeBucketBalance?.(bucketId);

    if (Number.isFinite(Number(bridgeValue))) {
      return Math.max(0, roundMoney(bridgeValue));
    }

    return 0;
  }

  function getUnpaidMandatoryPayments(monthKey = getCurrentMonthValue()) {
    const state = getState();

    if (!state || !Array.isArray(state.mandatoryPayments)) {
      return [];
    }

    return state.mandatoryPayments
      .filter((payment) => {
        if (!isPaymentVisibleInMonth(payment, monthKey)) return false;
        return !isPaymentPaidInMonth(payment, monthKey);
      })
      .sort((a, b) => {
        const dateA = getPaymentDateInMonth(a, monthKey);
        const dateB = getPaymentDateInMonth(b, monthKey);

        const timeA = dateA ? dateA.getTime() : Number.MAX_SAFE_INTEGER;
        const timeB = dateB ? dateB.getTime() : Number.MAX_SAFE_INTEGER;

        return timeA - timeB;
      });
  }

  function getMandatoryChargeStats({ untilDateValue = "" } = {}) {
    const monthKey = getCurrentMonthValue();
    const untilDate = getDateFromValue(untilDateValue);
    const safeBalanceLeftById = new Map();

    let total = 0;
    let coveredByLinkedSafes = 0;
    let chargeToFreeMoney = 0;
    let hasStateData = false;

    getUnpaidMandatoryPayments(monthKey).forEach((payment) => {
      const paymentDate = getPaymentDateInMonth(payment, monthKey);

      if (untilDate && paymentDate && paymentDate.getTime() > untilDate.getTime()) {
        return;
      }

      const amount = getPaymentAmount(payment);
      if (amount <= 0) return;

      hasStateData = true;
      total += amount;

      const linkedSafeId = payment.linked_safe_bucket_id || "";
      let covered = 0;

      if (linkedSafeId) {
        if (!safeBalanceLeftById.has(linkedSafeId)) {
          safeBalanceLeftById.set(linkedSafeId, getLinkedSafeBalance(linkedSafeId));
        }

        const balanceLeft = safeBalanceLeftById.get(linkedSafeId) || 0;
        covered = Math.min(amount, balanceLeft);
        safeBalanceLeftById.set(linkedSafeId, roundMoney(balanceLeft - covered));
      }

      coveredByLinkedSafes += covered;
      chargeToFreeMoney += Math.max(0, roundMoney(amount - covered));
    });

    return {
      hasStateData,
      total: roundMoney(total),
      coveredByLinkedSafes: roundMoney(coveredByLinkedSafes),
      chargeToFreeMoney: roundMoney(chargeToFreeMoney),
    };
  }

  function getTransactionDateKey(transaction) {
    const rawValue =
      transaction?.date ||
      transaction?.transaction_date ||
      transaction?.operation_date ||
      transaction?.created_date ||
      transaction?.created_at ||
      transaction?.createdAt ||
      "";

    if (!rawValue) return "";

    const rawText = String(rawValue);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return rawText.slice(0, 10);
    }

    const parsed = new Date(rawText);

    if (Number.isNaN(parsed.getTime())) return "";

    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
  }

  function isRequiredCategory(categoryId) {
    const state = getState();
    const category = state?.categories?.find((item) => item.id === categoryId);

    return Boolean(category?.is_required);
  }

  function getRemainingFlexibleBudgetsFromState() {
    const state = getState();

    if (!state || !Array.isArray(state.budgetLimits)) {
      return {
        hasBudgetLimits: false,
        remaining: 0,
      };
    }

    const monthKey = getCurrentMonthValue();
    const spentByCategory = new Map();

    (state.transactions || []).forEach((transaction) => {
      if (transaction.type !== "expense") return;

      const dateKey = getTransactionDateKey(transaction);
      if (!dateKey || dateKey.slice(0, 7) !== monthKey) return;

      const categoryId = transaction.category_id || "__uncategorized__";
      const current = spentByCategory.get(categoryId) || 0;

      spentByCategory.set(
        categoryId,
        roundMoney(current + (Number(transaction.amount) || 0))
      );
    });

    let hasBudgetLimits = false;
    let remaining = 0;

    state.budgetLimits.forEach((limit) => {
      const categoryId = limit.category_id;
      const limitAmount = Number(limit.monthly_limit) || 0;

      if (limitAmount <= 0) return;
      if (isRequiredCategory(categoryId)) return;

      hasBudgetLimits = true;

      const spent = spentByCategory.get(categoryId) || 0;
      remaining += Math.max(0, roundMoney(limitAmount - spent));
    });

    return {
      hasBudgetLimits,
      remaining: roundMoney(remaining),
    };
  }

  function getLimitsUntilDate(totalLimits, daysUntilIncome, daysLeftMonth) {
    if (daysLeftMonth <= 0) return totalLimits;

    const ratio = Math.min(1, Math.max(0, daysUntilIncome / daysLeftMonth));

    return roundMoney(totalLimits * ratio);
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

  function isDateInCurrentMonth(dateValue) {
    const date = getDateFromValue(dateValue);
    const today = getStartOfToday();

    return Boolean(
      date &&
      date.getTime() >= today.getTime() &&
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  }

  function getSpendStatus(dailyAmount, pool) {
    if (pool < 0) return "bad";
    if (dailyAmount < 300) return "bad";
    if (dailyAmount < 700) return "warn";
    return "good";
  }

  function applyHeroStatus(hero, statusName) {
    hero.classList.remove("is-good", "is-warn", "is-bad");
    hero.classList.add(`is-${statusName}`);
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
    const expectedInCurrentMonth = Boolean(
      expected && isDateInCurrentMonth(expected.date)
    );

    const freeMoney = parseMoney(
      document.getElementById("balanceFreeMoneyValue")?.textContent
    );

    const mandatoryStats = getMandatoryChargeStats();
    const mandatoryFromDom = parseMoney(
      document.getElementById("analyticsPendingMandatoryValue")?.textContent
    );
    const mandatoryToFreeMoney = mandatoryStats.hasStateData
      ? mandatoryStats.chargeToFreeMoney
      : mandatoryFromDom;

    const budgetStats = getRemainingFlexibleBudgetsFromState();
    const remainingBudgetsFromDom = parseMoney(
      document.getElementById("analyticsRemainingBudgetsValue")?.textContent
    );
    const remainingBudgets = budgetStats.hasBudgetLimits
      ? budgetStats.remaining
      : remainingBudgetsFromDom;

    const hasFlexibleBudgetLimit = budgetStats.hasBudgetLimits || remainingBudgets > 0;

    const daysLeftMonth = getDaysLeftInMonth();
    const daysUntilIncome = expectedInCurrentMonth
      ? getDaysUntilDate(expected.date)
      : daysLeftMonth;

    const expectedAmount = expectedInCurrentMonth ? roundMoney(expected.amount) : 0;
    const moneyToMonthEnd = roundMoney(freeMoney + expectedAmount);
    const cashAfterMandatory = roundMoney(moneyToMonthEnd - mandatoryToFreeMoney);

    const spendPool = hasFlexibleBudgetLimit
      ? Math.min(cashAfterMandatory, remainingBudgets)
      : cashAfterMandatory;

    const safeSpendPool = Math.max(0, roundMoney(spendPool));
    const dailyToMonthEnd = safeSpendPool / daysLeftMonth;

    const mandatoryUntilIncomeStats = expectedInCurrentMonth
      ? getMandatoryChargeStats({ untilDateValue: expected.date })
      : mandatoryStats;

    const mandatoryUntilIncome = mandatoryUntilIncomeStats.hasStateData
      ? mandatoryUntilIncomeStats.chargeToFreeMoney
      : mandatoryToFreeMoney;

    const budgetsUntilIncome = expectedInCurrentMonth && hasFlexibleBudgetLimit
      ? getLimitsUntilDate(remainingBudgets, daysUntilIncome, daysLeftMonth)
      : remainingBudgets;

    const cashUntilIncome = roundMoney(freeMoney - mandatoryUntilIncome);
    const spendPoolUntilIncome = hasFlexibleBudgetLimit
      ? Math.min(cashUntilIncome, budgetsUntilIncome)
      : cashUntilIncome;
    const dailyUntilIncome = Math.max(0, spendPoolUntilIncome / daysUntilIncome);

    const meterBase = Math.max(
      hasFlexibleBudgetLimit ? remainingBudgets : moneyToMonthEnd,
      moneyToMonthEnd,
      1
    );
    const meterValue = Math.max(
      0,
      Math.min(100, (safeSpendPool / meterBase) * 100)
    );

    setPressureLabels("К списанию", "Лимиты");
    setText("walletCalendarPressureValue", formatMoney(mandatoryToFreeMoney));
    setText("walletLimitsPressureValue", formatMoney(remainingBudgets));

    setHeroEyebrow("До конца месяца");
    setHeroTitle("Можно тратить");
    setFirstStatLabel("До конца");
    setText("walletDaysLeftValue", `${daysLeftMonth} дн.`);

    todayValue.textContent = formatMoney(dailyToMonthEnd);
    meter.style.width = `${meterValue}%`;

    updateExpectedIncomeCard(expected);

    let statusName = getSpendStatus(dailyToMonthEnd, safeSpendPool);

    if (cashAfterMandatory < 0) {
      statusName = "bad";
    }

    applyHeroStatus(hero, statusName);

    const dailyMonthLabel = formatMoney(dailyToMonthEnd);
    const expectedLabel = expectedInCurrentMonth ? formatMoney(expectedAmount) : "";

    if (cashAfterMandatory < 0) {
      status.textContent = "Обязательные не закрыты";
      hint.textContent = expectedInCurrentMonth
        ? `Даже с ожидаемыми ${expectedLabel} не хватает ${formatMoney(Math.abs(cashAfterMandatory))} на обязательные платежи.`
        : `Не хватает ${formatMoney(Math.abs(cashAfterMandatory))} на обязательные платежи до конца месяца.`;
      return;
    }

    if (hasFlexibleBudgetLimit && remainingBudgets <= 0) {
      status.textContent = "Лимиты закончились";
      hint.textContent = `По лимитным категориям на этот месяц уже нет свободного остатка.`;
      return;
    }

    if (safeSpendPool <= 0) {
      status.textContent = "Тратить нельзя";
      hint.textContent = `После обязательных платежей свободного дневного лимита до конца месяца нет.`;
      return;
    }

    if (expectedInCurrentMonth) {
      const beforeIncomeRate = formatMoney(dailyUntilIncome);

      if (cashUntilIncome < 0) {
        status.textContent = "До поступления стоп";
        hint.textContent = `До ${formatDateHuman(expected.date)} не хватает ${formatMoney(Math.abs(cashUntilIncome))}. После ожидаемых ${expectedLabel}: ${dailyMonthLabel}/день до конца месяца.`;
        return;
      }

      if (dailyToMonthEnd < 300) {
        status.textContent = "Режим выживания";
        hint.textContent = `С учётом ожидаемых ${expectedLabel}: ${dailyMonthLabel}/день до конца месяца. До ${formatDateHuman(expected.date)}: ${beforeIncomeRate}/день.`;
        return;
      }

      if (dailyToMonthEnd < 700) {
        status.textContent = "Осторожно можно";
        hint.textContent = `С учётом ожидаемых ${expectedLabel}: ${dailyMonthLabel}/день до конца месяца. До ${formatDateHuman(expected.date)}: ${beforeIncomeRate}/день.`;
        return;
      }

      status.textContent = "Месяц держится";
      hint.textContent = `С учётом ожидаемых ${expectedLabel}: ${dailyMonthLabel}/день до конца месяца. До ${formatDateHuman(expected.date)}: ${beforeIncomeRate}/день.`;
      return;
    }

    if (expected && !expectedInCurrentMonth) {
      status.textContent = "Без учёта будущих";
      hint.textContent = `Ожидаемые ${formatMoney(expected.amount)} не в текущем месяце, поэтому не входят в расчёт. До конца месяца: ${dailyMonthLabel}/день.`;
      return;
    }

    if (dailyToMonthEnd < 300) {
      status.textContent = "Режим выживания";
      hint.textContent = `До конца месяца безопасно: ${dailyMonthLabel}/день. Будущие деньги пока не учитываются.`;
      return;
    }

    if (dailyToMonthEnd < 700) {
      status.textContent = "Не разгоняйся";
      hint.textContent = `Запас тонкий. До конца месяца безопасно: ${dailyMonthLabel}/день.`;
      return;
    }

    status.textContent = "Держишься";
    hint.textContent = `Можно жить спокойнее. До конца месяца безопасно: ${dailyMonthLabel}/день.`;
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