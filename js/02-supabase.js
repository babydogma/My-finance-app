// ===== js/01-dom.js =====
(() => {
  window.FinanceAppDom = {
    getRefs() {
      const modal = document.getElementById("transactionModal");
      const openExpenseModalBtn = document.getElementById("openExpenseModal");
      const openIncomeModalBtn = document.getElementById("openIncomeModal");
      const openTransferModalBtn = document.getElementById("openTransferModal");
      const closeModalBtn = document.getElementById("closeModalBtn");
      const saveBtn = document.getElementById("saveTransactionBtn");
      const deleteTransactionBtn = document.getElementById("deleteTransactionBtn");

      const budgetModal = document.getElementById("budgetModal");
      const budgetModalTitle = document.getElementById("budgetModalTitle");
      const budgetCategoryNameInput = document.getElementById("budgetCategoryNameInput");
      const budgetAmountInput = document.getElementById("budgetAmountInput");
      const budgetCategoryRequiredInput = document.getElementById("budgetCategoryRequiredInput");
      const deleteCategoryBtn = document.getElementById("deleteCategoryBtn");
      const closeBudgetModalBtn = document.getElementById("closeBudgetModalBtn");
      const saveBudgetBtn = document.getElementById("saveBudgetBtn");

      const accountModal = document.getElementById("accountModal");
      const accountModalTitle = document.getElementById("accountModalTitle");
      const accountNameInput = document.getElementById("accountNameInput");
      const accountRoleSelect = document.getElementById("accountRoleSelect");
      const accountPrimarySpendInput = document.getElementById("accountPrimarySpendInput");
      const accountPrimaryNote = document.getElementById("accountPrimaryNote");
      const openCreateAccountModalBtn = document.getElementById("openCreateAccountModalBtn");
      const closeAccountModalBtn = document.getElementById("closeAccountModalBtn");
      const cancelAccountModalBtn = document.getElementById("cancelAccountModalBtn");
      const saveAccountModalBtn = document.getElementById("saveAccountModalBtn");
      const deleteAccountModalBtn = document.getElementById("deleteAccountModalBtn");

      const analyticsCategoryModal = document.getElementById("analyticsCategoryModal");
      const analyticsCategoryModalTitle = document.getElementById("analyticsCategoryModalTitle");
      const analyticsCategoryModalPeriodLabel = document.getElementById("analyticsCategoryModalPeriodLabel");
      const analyticsCategoryBudgetBtn = document.getElementById("analyticsCategoryBudgetBtn");
      const analyticsCategoryTypeBtn = document.getElementById("analyticsCategoryTypeBtn");
      const analyticsCategoryTransactionsList = document.getElementById("analyticsCategoryTransactionsList");
      const closeAnalyticsCategoryModalBtn = document.getElementById("closeAnalyticsCategoryModalBtn");

      const openCategoriesManagerBtn = document.getElementById("openCategoriesManagerBtn");
      const closeCategoriesManagerBtn = document.getElementById("closeCategoriesManagerBtn");

      const navWalletBtn = document.getElementById("navWalletBtn");
      const navAnalyticsBtn = document.getElementById("navAnalyticsBtn");
      const navOperationsBtn = document.getElementById("navOperationsBtn");

      const mainView = document.getElementById("mainView");
      const categoriesManagerView = document.getElementById("categoriesManagerView");
      const analyticsView = document.getElementById("analyticsView");
      const operationsView = document.getElementById("operationsView");

      const categoriesManagerList = document.getElementById("categoriesManagerList");
      const newCategoryNameInput = document.getElementById("newCategoryNameInput");
      const addCategoryBtn = document.getElementById("addCategoryBtn");

      const analyticsPeriodButtons = document.querySelectorAll("[data-analytics-period]");
      const analyticsDonut = document.getElementById("analyticsDonut");
      const analyticsLegend = document.getElementById("analyticsLegend");
      const analyticsMonthBtn = document.getElementById("analyticsMonthBtn");
      const analyticsMonthWheelWrap = document.getElementById("analyticsMonthWheelWrap");
      const analyticsMonthNamesColumn = document.getElementById("analyticsMonthNamesColumn");
      const analyticsMonthYearsColumn = document.getElementById("analyticsMonthYearsColumn");
      const analyticsMonthResetBtn = document.getElementById("analyticsMonthResetBtn");
      const analyticsMonthApplyBtn = document.getElementById("analyticsMonthApplyBtn");
      const analyticsRangeFromInput = document.getElementById("analyticsRangeFromInput");
      const analyticsRangeToInput = document.getElementById("analyticsRangeToInput");
      const analyticsSelectedPeriodLabel = document.getElementById("analyticsSelectedPeriodLabel");

      const mandatoryPaymentsModal = document.getElementById("mandatoryPaymentsModal");
      const openMandatoryPaymentsModalBtn = document.getElementById("openMandatoryPaymentsModalBtn");
      const closeMandatoryPaymentsModalBtn = document.getElementById("closeMandatoryPaymentsModalBtn");
      const mandatoryPaymentsList = document.getElementById("mandatoryPaymentsList");
      const mandatoryPaymentsMonthStrip = document.getElementById("mandatoryPaymentsMonthStrip");
      const openMandatoryPaymentEditorBtn = document.getElementById("openMandatoryPaymentEditorBtn");

      const mandatoryPaymentEditorModal = document.getElementById("mandatoryPaymentEditorModal");
      const mandatoryPaymentEditorTitle = document.getElementById("mandatoryPaymentEditorTitle");
      const closeMandatoryPaymentEditorModalBtn = document.getElementById("closeMandatoryPaymentEditorModalBtn");

      const mandatoryPaymentTitleInput = document.getElementById("mandatoryPaymentTitleInput");
      const mandatoryPaymentAmountInput = document.getElementById("mandatoryPaymentAmountInput");
      const mandatoryPaymentDueDayInput = document.getElementById("mandatoryPaymentDueDayInput");
      const mandatoryPaymentCategorySelect = document.getElementById("mandatoryPaymentCategorySelect");
      const mandatoryPaymentLinkedSafeSelect = document.getElementById("mandatoryPaymentLinkedSafeSelect");
      const mandatoryPaymentAccountSelect = document.getElementById("mandatoryPaymentAccountSelect");
      const mandatoryPaymentBucketPickerModal = document.getElementById("mandatoryPaymentBucketPickerModal");
      const mandatoryPaymentBucketPickerList = document.getElementById("mandatoryPaymentBucketPickerList");
      const closeMandatoryPaymentBucketPickerModalBtn = document.getElementById("closeMandatoryPaymentBucketPickerModalBtn");
      const addMandatoryPaymentBtn = document.getElementById("addMandatoryPaymentBtn");
      const deleteMandatoryPaymentBtn = document.getElementById("deleteMandatoryPaymentBtn");

      const mandatoryPaymentLinkedSafeField = document.getElementById("mandatoryPaymentLinkedSafeField");
      const openMandatoryPaymentBucketPickerBtn = document.getElementById("openMandatoryPaymentBucketPickerBtn");

      const modalTitle = modal?.querySelector(".modal-title");

      const amountInput = document.getElementById("amountInput");
      const dateInput = document.getElementById("dateInput");
      const categorySelect = document.getElementById("categorySelect");
      const accountSelect = document.getElementById("accountSelect");
      const fromAccountSelect = document.getElementById("fromAccountSelect");
      const toAccountSelect = document.getElementById("toAccountSelect");
      const fromSafeBucketSelect = document.getElementById("fromSafeBucketSelect");
      const toSafeBucketSelect = document.getElementById("toSafeBucketSelect");
      const commentInput = document.getElementById("commentInput");

      const categoryField = document.getElementById("categoryField");
      const accountField = document.getElementById("accountField");
      const fromAccountField = document.getElementById("fromAccountField");
      const toAccountField = document.getElementById("toAccountField");
      const fromSafeBucketField = document.getElementById("fromSafeBucketField");
      const toSafeBucketField = document.getElementById("toSafeBucketField");

      const balanceEl = document.querySelector(".balance-amount");
      const balanceFreeMoneyValueEl = document.getElementById("balanceFreeMoneyValue");
      const accountsTotalEl = document.getElementById("accountsTotal");
      const accountsListEl = document.getElementById("accountsList");
      const transactionsListEl = document.getElementById("transactionsList");

      const safeBucketsModal = document.getElementById("safeBucketsModal");
      const safeBucketsModalTitle = document.getElementById("safeBucketsModalTitle");
      const safeBucketsModalTotalLabel = document.getElementById("safeBucketsModalTotalLabel");
      const safeBucketsUnassignedCard = document.getElementById("safeBucketsUnassignedCard");
      const safeBucketsUnassignedValue = document.getElementById("safeBucketsUnassignedValue");
      const safeBucketsList = document.getElementById("safeBucketsList");
      const closeSafeBucketsModalBtn = document.getElementById("closeSafeBucketsModalBtn");
      const newSafeBucketNameInput = document.getElementById("newSafeBucketNameInput");
      const addSafeBucketBtn = document.getElementById("addSafeBucketBtn");

      const safeBucketAmountModal = document.getElementById("safeBucketAmountModal");

      const safeBucketsRateBtn = document.getElementById("safeBucketsRateBtn");
      const safeBucketsRateValue = document.getElementById("safeBucketsRateValue");

      const safeInterestRateModal = document.getElementById("safeInterestRateModal");
      const safeInterestRateCurrentValue = document.getElementById("safeInterestRateCurrentValue");
      const safeInterestRateInput = document.getElementById("safeInterestRateInput");
      const closeSafeInterestRateModalBtn = document.getElementById("closeSafeInterestRateModalBtn");
      const cancelSafeInterestRateBtn = document.getElementById("cancelSafeInterestRateBtn");
      const saveSafeInterestRateBtn = document.getElementById("saveSafeInterestRateBtn");

      const safeBucketAmountModalTitle = document.getElementById("safeBucketAmountModalTitle");
      const safeBucketAmountCurrentValue = document.getElementById("safeBucketAmountCurrentValue");
      const safeBucketNameInput = document.getElementById("safeBucketNameInput");
      const safeBucketInterestInput = document.getElementById("safeBucketInterestInput");
      const safeBucketAmountInput = document.getElementById("safeBucketAmountInput");
      const closeSafeBucketAmountModalBtn = document.getElementById("closeSafeBucketAmountModalBtn");
      const cancelSafeBucketAmountBtn = document.getElementById("cancelSafeBucketAmountBtn");
      const saveSafeBucketAmountBtn = document.getElementById("saveSafeBucketAmountBtn");
      const deleteSafeBucketBtn = document.getElementById("deleteSafeBucketBtn");

      const faqModal = document.getElementById("faqModal");
      const faqModalTitle = document.getElementById("faqModalTitle");
      const faqModalText = document.getElementById("faqModalText");
      const faqModalFormula = document.getElementById("faqModalFormula");
      const closeFaqModalBtn = document.getElementById("closeFaqModalBtn");
      const faqButtons = document.querySelectorAll("[data-faq-key]");

      const analyticsTabOverviewBtn = document.getElementById("analyticsTabOverviewBtn");
      const analyticsTabExpensesBtn = document.getElementById("analyticsTabExpensesBtn");
      const analyticsTabSafesBtn = document.getElementById("analyticsTabSafesBtn");

      const analyticsOverviewSection = document.getElementById("analyticsOverviewSection");
      const analyticsExpensesSection = document.getElementById("analyticsExpensesSection");
      const analyticsSafesSection = document.getElementById("analyticsSafesSection");

      const analyticsExpensesRing = document.getElementById("analyticsExpensesRing");
      const analyticsExpensesRingCenterValue = document.getElementById("analyticsExpensesRingCenterValue");
      const analyticsExpensesRingCenterLabel = document.getElementById("analyticsExpensesRingCenterLabel");

      const analyticsExpensesRingPremium = document.getElementById("analyticsExpensesRingPremium");
      const analyticsExpensesRingCenterValuePremium = document.getElementById("analyticsExpensesRingCenterValuePremium");
      const analyticsExpensesRingCenterLabelPremium = document.getElementById("analyticsExpensesRingCenterLabelPremium");

      const openAnalyticsFiltersBtn = document.getElementById("openAnalyticsFiltersBtn");
      const closeAnalyticsFiltersBtn = document.getElementById("closeAnalyticsFiltersBtn");
      const analyticsFiltersModal = document.getElementById("analyticsFiltersModal");

      const analyticsCanSaveNowValue = document.getElementById("analyticsCanSaveNowValue");
      const analyticsCanSaveNowStatus = document.getElementById("analyticsCanSaveNowStatus");
      const analyticsCanSaveNowHint = document.getElementById("analyticsCanSaveNowHint");

      const analyticsTotalBalanceValue = document.getElementById("analyticsTotalBalanceValue");
      const analyticsFreeMoneyValue = document.getElementById("analyticsFreeMoneyValue");
      const analyticsProtectedMoneyValue = document.getElementById("analyticsProtectedMoneyValue");

      const analyticsPendingMandatoryValue = document.getElementById("analyticsPendingMandatoryValue");
      const analyticsMandatoryTotalValue = document.getElementById("analyticsMandatoryTotalValue");
      const analyticsMandatoryCoveredValue = document.getElementById("analyticsMandatoryCoveredValue");
      const analyticsRemainingBudgetsValue = document.getElementById("analyticsRemainingBudgetsValue");

      const analyticsExpenseValue = document.getElementById("analyticsExpenseValue");
      const analyticsExpensesPeriodNote = document.getElementById("analyticsExpensesPeriodNote");
      const analyticsExpensesCategoriesList = document.getElementById("analyticsExpensesCategoriesList");

      const analyticsExpenseValuePremium = document.getElementById("analyticsExpenseValuePremium");
      const analyticsExpensesPeriodNotePremium = document.getElementById("analyticsExpensesPeriodNotePremium");
      const analyticsExpensesCategoriesListPremium = document.getElementById("analyticsExpensesCategoriesListPremium");

      const analyticsExpensesMonthStrip = document.getElementById("analyticsExpensesMonthStrip");
      const analyticsExpensesTotalRowValue = document.getElementById("analyticsExpensesTotalRowValue");

      const analyticsInterestValue = document.getElementById("analyticsInterestValue");
      const analyticsSafeList = document.getElementById("analyticsSafeList");

      const operationsTransactionsList = document.getElementById("operationsTransactionsList");
      const operationsFiltersModal = document.getElementById("operationsFiltersModal");
      const openOperationsFiltersBtn = document.getElementById("openOperationsFiltersBtn");
      const closeOperationsFiltersBtn = document.getElementById("closeOperationsFiltersBtn");
      const operationsRangeFromInput = document.getElementById("operationsRangeFromInput");
      const operationsRangeToInput = document.getElementById("operationsRangeToInput");

      return {
        modal,
        openExpenseModalBtn,
        openIncomeModalBtn,
        openTransferModalBtn,
        closeModalBtn,
        saveBtn,
        deleteTransactionBtn,
        budgetModal,
        budgetModalTitle,
        budgetCategoryNameInput,
        budgetAmountInput,
        budgetCategoryRequiredInput,
        deleteCategoryBtn,
        closeBudgetModalBtn,
        saveBudgetBtn,
        accountModal,
        accountModalTitle,
        accountNameInput,
        accountRoleSelect,
        accountPrimarySpendInput,
        accountPrimaryNote,
        openCreateAccountModalBtn,
        closeAccountModalBtn,
        cancelAccountModalBtn,
        saveAccountModalBtn,
        deleteAccountModalBtn,
        analyticsCategoryModal,
        analyticsCategoryModalTitle,
        analyticsCategoryModalPeriodLabel,
        analyticsCategoryBudgetBtn,
        analyticsCategoryTypeBtn,
        analyticsCategoryTransactionsList,
        closeAnalyticsCategoryModalBtn,
        openCategoriesManagerBtn,
        closeCategoriesManagerBtn,
        navWalletBtn,
        navAnalyticsBtn,
        navOperationsBtn,
        mainView,
        categoriesManagerView,
        analyticsView,
        operationsView,
        categoriesManagerList,
        newCategoryNameInput,
        addCategoryBtn,
        analyticsPeriodButtons,
        analyticsDonut,
        analyticsLegend,
        analyticsMonthBtn,
        analyticsMonthWheelWrap,
        analyticsMonthNamesColumn,
        analyticsMonthYearsColumn,
        analyticsMonthResetBtn,
        analyticsMonthApplyBtn,
        analyticsRangeFromInput,
        analyticsRangeToInput,
        analyticsSelectedPeriodLabel,
        mandatoryPaymentsModal,
        openMandatoryPaymentsModalBtn,
        closeMandatoryPaymentsModalBtn,
        mandatoryPaymentsList,
        mandatoryPaymentsMonthStrip,
        openMandatoryPaymentEditorBtn,
        mandatoryPaymentEditorModal,
        mandatoryPaymentEditorTitle,
        closeMandatoryPaymentEditorModalBtn,
        mandatoryPaymentTitleInput,
        mandatoryPaymentAmountInput,
        mandatoryPaymentDueDayInput,
        mandatoryPaymentCategorySelect,
        mandatoryPaymentLinkedSafeSelect,
        mandatoryPaymentAccountSelect,
        mandatoryPaymentBucketPickerModal,
        mandatoryPaymentBucketPickerList,
        closeMandatoryPaymentBucketPickerModalBtn,
        addMandatoryPaymentBtn,
        deleteMandatoryPaymentBtn,
        mandatoryPaymentLinkedSafeField,
        openMandatoryPaymentBucketPickerBtn,
        modalTitle,
        amountInput,
        dateInput,
        categorySelect,
        accountSelect,
        fromAccountSelect,
        toAccountSelect,
        fromSafeBucketSelect,
        toSafeBucketSelect,
        commentInput,
        categoryField,
        accountField,
        fromAccountField,
        toAccountField,
        fromSafeBucketField,
        toSafeBucketField,
        balanceEl,
        balanceFreeMoneyValueEl,
        accountsTotalEl,
        accountsListEl,
        transactionsListEl,
        safeBucketsModal,
        safeBucketsModalTitle,
        safeBucketsModalTotalLabel,
        safeBucketsUnassignedCard,
        safeBucketsUnassignedValue,
        safeBucketsList,
        closeSafeBucketsModalBtn,
        newSafeBucketNameInput,
        addSafeBucketBtn,
        safeBucketAmountModal,
        safeBucketsRateBtn,
        safeBucketsRateValue,
        safeInterestRateModal,
        safeInterestRateCurrentValue,
        safeInterestRateInput,
        closeSafeInterestRateModalBtn,
        cancelSafeInterestRateBtn,
        saveSafeInterestRateBtn,
        safeBucketAmountModalTitle,
        safeBucketAmountCurrentValue,
        safeBucketNameInput,
        safeBucketInterestInput,
        safeBucketAmountInput,
        closeSafeBucketAmountModalBtn,
        cancelSafeBucketAmountBtn,
        saveSafeBucketAmountBtn,
        deleteSafeBucketBtn,
        faqModal,
        faqModalTitle,
        faqModalText,
        faqModalFormula,
        closeFaqModalBtn,
        faqButtons,
        analyticsTabOverviewBtn,
        analyticsTabExpensesBtn,
        analyticsTabSafesBtn,
        analyticsOverviewSection,
        analyticsExpensesSection,
        analyticsSafesSection,
        analyticsExpensesRing,
        analyticsExpensesRingCenterValue,
        analyticsExpensesRingCenterLabel,
        analyticsExpensesRingPremium,
        analyticsExpensesRingCenterValuePremium,
        analyticsExpensesRingCenterLabelPremium,
        openAnalyticsFiltersBtn,
        closeAnalyticsFiltersBtn,
        analyticsFiltersModal,
        analyticsCanSaveNowValue,
        analyticsCanSaveNowStatus,
        analyticsCanSaveNowHint,
        analyticsTotalBalanceValue,
        analyticsFreeMoneyValue,
        analyticsProtectedMoneyValue,
        analyticsPendingMandatoryValue,
        analyticsMandatoryTotalValue,
        analyticsMandatoryCoveredValue,
        analyticsRemainingBudgetsValue,
        analyticsExpenseValue,
        analyticsExpensesPeriodNote,
        analyticsExpensesCategoriesList,
        analyticsExpenseValuePremium,
        analyticsExpensesPeriodNotePremium,
        analyticsExpensesCategoriesListPremium,
        analyticsExpensesMonthStrip,
        analyticsExpensesTotalRowValue,
        analyticsInterestValue,
        analyticsSafeList,
        operationsTransactionsList,
        operationsFiltersModal,
        openOperationsFiltersBtn,
        closeOperationsFiltersBtn,
        operationsRangeFromInput,
        operationsRangeToInput,
      };
    },
  };
})();

// ===== js/02-money-input.js =====
(() => {
  function bindMoneyInput(input) {
    if (!input) return;

    const sanitize = () => {
      let value = String(input.value || "");

      value = value.replace(/\./g, ",");
      value = value.replace(/[^0-9,]/g, "");

      const firstCommaIndex = value.indexOf(",");

      if (firstCommaIndex !== -1) {
        value =
          value.slice(0, firstCommaIndex + 1) +
          value.slice(firstCommaIndex + 1).replace(/,/g, "");
      }

      input.value = value;
    };

    input.addEventListener("input", sanitize);

    input.addEventListener("paste", () => {
      requestAnimationFrame(sanitize);
    });

    input.addEventListener("blur", sanitize);
  }

  function parseMoneyInputValue(value) {
    const normalized = String(value || "")
      .trim()
      .replace(/\s/g, "")
      .replace(",", ".");

    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : NaN;
  }

  window.FinanceAppMoney = {
    bindMoneyInput,
    parseMoneyInputValue,
  };
})();

// ===== js/03-format-date.js =====
(() => {
  function getDateOnlyString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  function getTodayDateValue() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getCurrentMonthValue() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getMandatoryPaymentsMonthLabel(monthKey) {
    const [year, month] = String(monthKey).split("-").map(Number);
    const date = new Date(year, month - 1, 1);

    return date
      .toLocaleDateString("ru-RU", {
        month: "short",
      })
      .replace(".", "");
  }

  function getMandatoryPaymentsMonthItems() {
    const current = getCurrentMonthValue();
    const [year, month] = current.split("-").map(Number);
    const baseDate = new Date(year, month - 1, 1);

    const items = [];

    for (let index = -3; index <= 3; index += 1) {
      const date = new Date(baseDate.getFullYear(), baseDate.getMonth() + index, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      items.push({
        key,
        label: getMandatoryPaymentsMonthLabel(key),
        isCurrent: key === current,
      });
    }

    return items;
  }

  function formatDateRangeLabel(fromValue, toValue) {
    if (!fromValue || !toValue) return "";
    return `${formatDateShort(fromValue)} — ${formatDateShort(toValue)}`;
  }

  function getStartOfTodayTime() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  function getTransactionMainDateValue(item) {
    return (
      item.date ||
      item.transaction_date ||
      item.operation_date ||
      item.created_date ||
      item.created_at ||
      item.createdAt ||
      ""
    );
  }

  function getTransactionDateKey(item) {
    const rawValue = getTransactionMainDateValue(item);

    if (!rawValue) return "";

    const rawText = String(rawValue);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return rawText.slice(0, 10);
    }

    const parsedDate = new Date(rawText);

    if (!Number.isNaN(parsedDate.getTime())) {
      return getDateOnlyString(parsedDate);
    }

    return "";
  }

  function getTransactionTime(item) {
    const dateKey = getTransactionDateKey(item);

    if (!dateKey) return 0;

    const [year, month, day] = dateKey.split("-").map(Number);

    if (!year || !month || !day) return 0;

    return new Date(year, month - 1, day).getTime();
  }

  function filterTransactionsByPeriod(items, period, selectedMonth, rangeStart, rangeEnd) {
    const todayKey = getTodayDateValue();
    const currentMonth = selectedMonth || getCurrentMonthValue();
    const startOfToday = getStartOfTodayTime();
    const sevenDaysStartKey = getDateOnlyString(
      new Date(startOfToday - 6 * 24 * 60 * 60 * 1000)
    );

    return items.filter((item) => {
      const dateKey = getTransactionDateKey(item);

      if (!dateKey) return false;

      if (period === "month") {
        return dateKey.slice(0, 7) === currentMonth;
      }

      if (period === "today") {
        return dateKey === todayKey;
      }

      if (period === "7") {
        return dateKey >= sevenDaysStartKey && dateKey <= todayKey;
      }

      if (period === "range") {
        if (!rangeStart && !rangeEnd) return true;
        if (rangeStart && !rangeEnd) return dateKey >= rangeStart;
        if (!rangeStart && rangeEnd) return dateKey <= rangeEnd;

        return dateKey >= rangeStart && dateKey <= rangeEnd;
      }

      return true;
    });
  }

  function getCurrentTime() {
    const now = new Date();

    return now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} ₽`;
  }

  function formatDateShort(dateValue) {
    if (!dateValue) return "";

    const rawDate = String(dateValue).slice(0, 10);
    const [year, month, day] = rawDate.split("-");

    if (!year || !month || !day) return "";

    return `${day}.${month}.${year.slice(-2)}`;
  }

  function sortTransactionsByLatest(items) {
    return [...items].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;

      return timeB - timeA;
    });
  }

  function formatMonthLabel(monthValue) {
    if (!monthValue) return "";

    const [year, month] = monthValue.split("-").map(Number);
    if (!year || !month) return "";

    const date = new Date(year, month - 1, 1);

    return date.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  }

  function formatMonthButtonLabel(monthValue) {
    if (!monthValue) return "Месяц";

    const [year, month] = monthValue.split("-").map(Number);
    if (!year || !month) return "Месяц";

    const date = new Date(year, month - 1, 1);
    const monthLabel = date.toLocaleDateString("ru-RU", { month: "long" });

    return monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
  }

  function getRussianMonthNames() {
    return [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.FinanceAppFormatDate = {
    getDateOnlyString,
    roundToTwo,
    getTodayDateValue,
    getCurrentMonthValue,
    getMandatoryPaymentsMonthLabel,
    getMandatoryPaymentsMonthItems,
    formatDateRangeLabel,
    getStartOfTodayTime,
    filterTransactionsByPeriod,
    getCurrentTime,
    formatMoney,
    formatDateShort,
    sortTransactionsByLatest,
    formatMonthLabel,
    formatMonthButtonLabel,
    getRussianMonthNames,
    escapeHtml,
  };
})();

// ===== js/04-modal-core.js =====
(() => {
  const MODAL_ANIMATION_MS = 260;
  const modalCloseTimers = new WeakMap();

  let lockedScrollY = 0;
  let bodyLockDepth = 0;

  function isModalOpen(modalEl) {
    return Boolean(
      modalEl &&
      !modalEl.classList.contains("hidden") &&
      !modalEl.classList.contains("is-closing")
    );
  }

  function applyBodyScrollLock() {
    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

    document.documentElement.classList.add("modal-scroll-locked");
    document.body.classList.add("modal-scroll-locked");

    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }

  function clearBodyScrollLock(shouldRestoreScroll = true) {
    const scrollY = lockedScrollY;

    document.documentElement.classList.remove("modal-scroll-locked");
    document.body.classList.remove("modal-scroll-locked");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    lockedScrollY = 0;

    if (shouldRestoreScroll) {
      window.scrollTo(0, scrollY);
    }
  }

  function lockBodyScroll() {
    bodyLockDepth += 1;

    if (bodyLockDepth > 1) return;

    applyBodyScrollLock();
  }

  function unlockBodyScroll() {
    bodyLockDepth = Math.max(0, bodyLockDepth - 1);

    if (bodyLockDepth > 0) return;

    clearBodyScrollLock(true);
  }

  function forceUnlockBodyScroll() {
    bodyLockDepth = 0;
    clearBodyScrollLock(true);
  }

  function openAnimatedModal(modalEl) {
    if (!modalEl) return;

    modalEl.classList.add("modal");

    const existingTimer = modalCloseTimers.get(modalEl);
    if (existingTimer) {
      clearTimeout(existingTimer);
      modalCloseTimers.delete(modalEl);
    }

    if (!isModalOpen(modalEl)) {
      lockBodyScroll();
    }

    modalEl.classList.remove("hidden", "is-visible", "is-closing");

    void modalEl.offsetHeight;

    modalEl.classList.add("is-visible");
  }

  function closeAnimatedModal(modalEl) {
    if (!modalEl) return;

    const existingTimer = modalCloseTimers.get(modalEl);

    if (existingTimer) {
      clearTimeout(existingTimer);
      modalCloseTimers.delete(modalEl);
    }

    if (modalEl.classList.contains("hidden")) {
      return;
    }

    /*
      Важно:
      скролл разблокируем СРАЗУ при старте закрытия,
      а не после завершения CSS-анимации.
      Иначе на iOS ощущается микролаг после закрытия модалки.
    */
    unlockBodyScroll();

    modalEl.classList.remove("is-visible");
    modalEl.classList.add("is-closing");

    const timer = window.setTimeout(() => {
      modalEl.classList.add("hidden");
      modalEl.classList.remove("is-closing");
      modalCloseTimers.delete(modalEl);
    }, MODAL_ANIMATION_MS);

    modalCloseTimers.set(modalEl, timer);
  }

  window.FinanceAppModalCore = {
    MODAL_ANIMATION_MS,
    openAnimatedModal,
    closeAnimatedModal,
    forceUnlockBodyScroll,
  };
})();
