;/* ===== supabase.js ===== */
const SUPABASE_URL = "https://npjrrstyotancvjdflvl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mntROxzfSwKTEK1VUsLGSw_3PxzAJw-";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);



;/* ===== js/01-dom.js ===== */
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


;/* ===== js/02-money-input.js ===== */
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


;/* ===== js/03-format-date.js ===== */
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
    return `${formatDateShort(fromValue)} â ${formatDateShort(toValue)}`;
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
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} â½`;
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
    if (!monthValue) return "ÐÐµÑÑÑ";

    const [year, month] = monthValue.split("-").map(Number);
    if (!year || !month) return "ÐÐµÑÑÑ";

    const date = new Date(year, month - 1, 1);
    const monthLabel = date.toLocaleDateString("ru-RU", { month: "long" });

    return monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
  }

  function getRussianMonthNames() {
    return [
      "Ð¯Ð½Ð²Ð°ÑÑ",
      "Ð¤ÐµÐ²ÑÐ°Ð»Ñ",
      "ÐÐ°ÑÑ",
      "ÐÐ¿ÑÐµÐ»Ñ",
      "ÐÐ°Ð¹",
      "ÐÑÐ½Ñ",
      "ÐÑÐ»Ñ",
      "ÐÐ²Ð³ÑÑÑ",
      "Ð¡ÐµÐ½ÑÑÐ±ÑÑ",
      "ÐÐºÑÑÐ±ÑÑ",
      "ÐÐ¾ÑÐ±ÑÑ",
      "ÐÐµÐºÐ°Ð±ÑÑ",
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


;/* ===== js/04-modal-core.js ===== */
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
      ÐÐ°Ð¶Ð½Ð¾:
      ÑÐºÑÐ¾Ð»Ð» ÑÐ°Ð·Ð±Ð»Ð¾ÐºÐ¸ÑÑÐµÐ¼ Ð¡Ð ÐÐÐ£ Ð¿ÑÐ¸ ÑÑÐ°ÑÑÐµ Ð·Ð°ÐºÑÑÑÐ¸Ñ,
      Ð° Ð½Ðµ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð²ÐµÑÑÐµÐ½Ð¸Ñ CSS-Ð°Ð½Ð¸Ð¼Ð°ÑÐ¸Ð¸.
      ÐÐ½Ð°ÑÐµ Ð½Ð° iOS Ð¾ÑÑÑÐ°ÐµÑÑÑ Ð¼Ð¸ÐºÑÐ¾Ð»Ð°Ð³ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°ÐºÑÑÑÐ¸Ñ Ð¼Ð¾Ð´Ð°Ð»ÐºÐ¸.
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


;/* ===== js/05-app-state.js ===== */
(() => {
  const UNCATEGORIZED_ID = "uncategorized";

  const state = {
    transactions: [],
    accounts: [],
    categories: [],
    budgetLimits: [],
    safeBuckets: [],
    appMeta: [],
    mandatoryPayments: [],
  };

  window.FinanceAppState = {
    UNCATEGORIZED_ID,
    state,
  };
})();


;/* ===== js/06-catalog-helpers.js ===== */
(() => {
  function createCatalogHelpers({ state }) {
    function getCategoryById(categoryId) {
      return state.categories.find((item) => item.id === categoryId);
    }

    function getCategoryName(categoryId) {
      const category = getCategoryById(categoryId);
      return category ? category.name : "ÐÐµÐ· ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸";
    }

    function getCategoryIcon(categoryId) {
      return "";
    }

    function isRequiredCategory(categoryId) {
      const category = getCategoryById(categoryId);
      return Boolean(category?.is_required);
    }

    function getCategoryTypeLabel(categoryId) {
      return isRequiredCategory(categoryId) ? "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð°Ñ" : "ÐÐ¸Ð±ÐºÐ°Ñ";
    }

    function getSafeBucketById(bucketId) {
      return state.safeBuckets.find((item) => item.id === bucketId);
    }

    function getAccountsByKind(kind) {
      return state.accounts.filter((account) => account.account_kind === kind);
    }

    function getAccountById(accountId) {
      return state.accounts.find((account) => account.id === accountId) || null;
    }

    function getAccountNameById(accountId) {
      return getAccountById(accountId)?.name || "";
    }

    function getAccountIconById(accountId) {
      return "";
    }

    function getVaultAccount() {
      return state.accounts.find((account) => account.account_kind === "vault_pool") || null;
    }

    function getVaultAccountId() {
      return getVaultAccount()?.id || "";
    }

    function getVaultAccountName() {
      return getVaultAccount()?.name || "";
    }

    function isVaultAccountId(accountId) {
      return Boolean(accountId && accountId === getVaultAccountId());
    }

    function getPrimarySpendAccount() {
      return (
        state.accounts.find(
          (account) =>
            account.is_primary_spend === true &&
            account.account_kind !== "vault_pool"
        ) || null
      );
    }

    function getPrimarySpendAccountId() {
      return getPrimarySpendAccount()?.id || "";
    }

    function getPrimarySpendAccountName() {
      return getPrimarySpendAccount()?.name || "";
    }

    function getCashAccount() {
      return state.accounts.find((account) => account.account_kind === "cash") || null;
    }

    function getCashAccountId() {
      return getCashAccount()?.id || "";
    }

    function getSafeAccountName() {
      return getVaultAccountName();
    }

    function getSafeAccountId() {
      return getVaultAccountId();
    }

    function getProtectedAccounts() {
      return state.accounts.filter((account) => account.is_protected === true);
    }

    function getFreeMoneyAccounts() {
      return state.accounts.filter((account) => account.include_in_free_money === true);
    }

    function isFreeSafeBucket(bucket) {
      if (!bucket) return false;

      const name = String(bucket.name || "").trim().toLowerCase();
      const kind = String(bucket.bucket_kind || "").trim().toLowerCase();

      return (
        bucket.include_in_free_money === true ||
        kind === "free" ||
        kind === "system_free" ||
        name === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ" ||
        name === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾"
      );
    }

    function isRealSafeBucket(bucket) {
      return Boolean(bucket) && !isFreeSafeBucket(bucket);
    }

    function getRealSafeBuckets() {
      return state.safeBuckets.filter(isRealSafeBucket);
    }

    function getSafeBucketsByKind(kinds) {
      const list = Array.isArray(kinds) ? kinds : [kinds];

      return getRealSafeBuckets().filter((bucket) => {
        return list.includes(bucket.bucket_kind);
      });
    }

    function getFreeSafeBucket() {
      return state.safeBuckets.find((bucket) => bucket.include_in_free_money === true) || null;
    }

    function getProtectedSafeBuckets() {
      return getRealSafeBuckets().filter((bucket) => {
        if (typeof bucket.include_in_protected === "boolean") {
          return bucket.include_in_protected;
        }

        if (typeof bucket.is_protected === "boolean") {
          return bucket.is_protected;
        }

        const kind = String(bucket.kind || bucket.bucket_kind || "")
          .trim()
          .toLowerCase();

        return ["tax", "housing", "reserve"].includes(kind);
      });
    }

    function getSpendableAccounts() {
      return state.accounts.filter((account) => account.account_kind !== "vault_pool");
    }

    function getTransferAccounts() {
      return state.accounts.filter((account) => {
        return account.account_kind !== "system";
      });
    }

    function getSafeBucketName(bucketId) {
      const bucket = getSafeBucketById(bucketId);
      return bucket ? bucket.name : "";
    }

    function getSafeBucketIcon(bucketId) {
      return "";
    }

    return {
      getCategoryById,
      getCategoryName,
      getCategoryIcon,
      isRequiredCategory,
      getCategoryTypeLabel,

      getSafeBucketById,
      getAccountsByKind,
      getAccountById,
      getAccountNameById,
      getAccountIconById,

      getVaultAccount,
      getVaultAccountId,
      getVaultAccountName,
      isVaultAccountId,

      getPrimarySpendAccount,
      getPrimarySpendAccountId,
      getPrimarySpendAccountName,

      getCashAccount,
      getCashAccountId,

      getSafeAccountName,
      getSafeAccountId,

      getProtectedAccounts,
      getFreeMoneyAccounts,

      getSafeBucketsByKind,
      getFreeSafeBucket,
      getProtectedSafeBuckets,
      getRealSafeBuckets,
      isFreeSafeBucket,
      isRealSafeBucket,

      getSpendableAccounts,
      getTransferAccounts,

      getSafeBucketName,
      getSafeBucketIcon,
    };
  }

  window.FinanceAppCatalogHelpers = {
    create: createCatalogHelpers,
  };
})();


;/* ===== js/07-app-meta.js ===== */
(() => {
  function createAppMetaHelpers({ state, roundToTwo }) {
    function getAppMetaValue(key) {
      const item = state.appMeta.find((entry) => entry.key === key);
      return item ? item.value : "";
    }

    function getSafeInterestAnnualRate() {
      const raw = Number(getAppMetaValue("safe_interest_annual_rate"));

      if (Number.isFinite(raw) && raw >= 0) {
        return raw;
      }

      return 0.12;
    }

    function getSafeBucketInterestRatesMap() {
      const raw = getAppMetaValue("safe_bucket_interest_rates");
      if (!raw) return {};

      try {
        const parsed = JSON.parse(raw);

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          return {};
        }

        return parsed;
      } catch (error) {
        console.error("ÐÑÐ¸Ð±ÐºÐ° safe_bucket_interest_rates", error);
        return {};
      }
    }

    function getSafeBucketInterestAnnualRate(bucketId) {
      const map = getSafeBucketInterestRatesMap();
      const raw = Number(map[bucketId]);

      if (Number.isFinite(raw) && raw >= 0) {
        return raw;
      }

      return getSafeInterestAnnualRate();
    }

    function formatPercentLabel(rateDecimal) {
      const percent = (Number(rateDecimal) || 0) * 100;

      return `${new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: 2,
      }).format(percent)}%`;
    }

    function setAppMetaLocalValue(key, value) {
      const existing = state.appMeta.find((entry) => entry.key === key);

      if (existing) {
        existing.value = value;
        return;
      }

      state.appMeta.push({
        key,
        value,
      });
    }

    function getRoundedPercentFromDecimal(rateDecimal) {
      return roundToTwo((Number(rateDecimal) || 0) * 100);
    }

    return {
      getAppMetaValue,
      getSafeInterestAnnualRate,
      getSafeBucketInterestRatesMap,
      getSafeBucketInterestAnnualRate,
      formatPercentLabel,
      setAppMetaLocalValue,
      getRoundedPercentFromDecimal,
    };
  }

  window.FinanceAppMetaHelpers = {
    create: createAppMetaHelpers,
  };
})();


;/* ===== js/08-account-helpers.js ===== */
(() => {
  const ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY = "account_balance_adjustments_v1";

  function roundLocal(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function getMetaRecord(state, key) {
    if (!state || !Array.isArray(state.appMeta)) return null;

    return state.appMeta.find((item) => {
      return (
        item?.key === key ||
        item?.name === key ||
        item?.meta_key === key ||
        item?.metaKey === key
      );
    }) || null;
  }

  function getMetaValue(state, key) {
    const record = getMetaRecord(state, key);

    if (!record) return "";

    return (
      record.value ??
      record.meta_value ??
      record.metaValue ??
      record.data ??
      ""
    );
  }

  function parseAdjustments(rawValue) {
    if (!rawValue) return {};

    if (typeof rawValue === "object" && !Array.isArray(rawValue)) {
      return rawValue;
    }

    try {
      const parsed = JSON.parse(String(rawValue));

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      return {};
    }

    return {};
  }

  function getLocalStorageAdjustments() {
    try {
      return parseAdjustments(
        window.localStorage.getItem(ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY)
      );
    } catch (error) {
      return {};
    }
  }

  function getAccountBalanceAdjustments(state) {
    const fromState = parseAdjustments(
      getMetaValue(state, ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY)
    );

    if (Object.keys(fromState).length > 0) {
      return fromState;
    }

    return getLocalStorageAdjustments();
  }

  function getAccountManualAdjustment(state, accountId) {
    const adjustments = getAccountBalanceAdjustments(state);
    const value = Number(adjustments?.[accountId]);

    return Number.isFinite(value) ? roundLocal(value) : 0;
  }

  function setAccountManualAdjustmentLocal(state, accountId, adjustment) {
    if (!state) return {};

    if (!Array.isArray(state.appMeta)) {
      state.appMeta = [];
    }

    const nextAdjustments = {
      ...getAccountBalanceAdjustments(state),
    };

    const roundedAdjustment = roundLocal(adjustment);

    if (Math.abs(roundedAdjustment) < 0.005) {
      delete nextAdjustments[accountId];
    } else {
      nextAdjustments[accountId] = roundedAdjustment;
    }

    const serialized = JSON.stringify(nextAdjustments);
    let record = getMetaRecord(state, ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY);

    if (!record) {
      record = {
        key: ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
        value: serialized,
      };

      state.appMeta.push(record);
    }

    record.key = ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY;
    record.value = serialized;
    record.meta_key = ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY;
    record.meta_value = serialized;
    record.metaKey = ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY;
    record.metaValue = serialized;

    try {
      window.localStorage.setItem(
        ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
        serialized
      );
    } catch (error) {
      // localStorage Ð¼Ð¾Ð¶ÐµÑ Ð±ÑÑÑ Ð½ÐµÐ´Ð¾ÑÑÑÐ¿ÐµÐ½ Ð² Ð¿ÑÐ¸Ð²Ð°ÑÐ½Ð¾Ð¼ ÑÐµÐ¶Ð¸Ð¼Ðµ â ÑÑÐ¾ Ð½Ðµ ÐºÑÐ¸ÑÐ¸ÑÐ½Ð¾.
    }

    return nextAdjustments;
  }

  function createAccountHelpers({ state, roundToTwo, getAccountById }) {
    function getRawAccountBalance(accountNameOrId) {
      const account =
        getAccountById(accountNameOrId) ||
        state.accounts.find((item) => item.name === accountNameOrId) ||
        null;

      if (!account) return 0;

      const accountId = account.id;
      const accountName = account.name;

      return roundToTwo(
        state.transactions.reduce((sum, transaction) => {
          const amount = roundToTwo(Number(transaction.amount) || 0);

          if (transaction.type === "income") {
            const matchesById =
              transaction.account_id && transaction.account_id === accountId;

            const matchesLegacy =
              !transaction.account_id && transaction.account === accountName;

            if (matchesById || matchesLegacy) {
              return sum + amount;
            }
          }

          if (transaction.type === "expense") {
            const matchesById =
              transaction.account_id && transaction.account_id === accountId;

            const matchesLegacy =
              !transaction.account_id && transaction.account === accountName;

            if (matchesById || matchesLegacy) {
              return sum - amount;
            }
          }

          if (transaction.type === "transfer") {
            const fromMatchesById =
              transaction.from_account_id && transaction.from_account_id === accountId;

            const fromMatchesLegacy =
              !transaction.from_account_id && transaction.from_account === accountName;

            const toMatchesById =
              transaction.to_account_id && transaction.to_account_id === accountId;

            const toMatchesLegacy =
              !transaction.to_account_id && transaction.to_account === accountName;

            if (fromMatchesById || fromMatchesLegacy) {
              sum -= amount;
            }

            if (toMatchesById || toMatchesLegacy) {
              sum += amount;
            }
          }

          return sum;
        }, 0)
      );
    }

    function getAccountBalance(accountNameOrId) {
      const account =
        getAccountById(accountNameOrId) ||
        state.accounts.find((item) => item.name === accountNameOrId) ||
        null;

      if (!account) return 0;

      const rawBalance = getRawAccountBalance(account.id);
      const manualAdjustment = getAccountManualAdjustment(state, account.id);

      return roundToTwo(rawBalance + manualAdjustment);
    }

    function getAccountRoleLabel(account) {
      if (account.account_kind === "vault_pool") return "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ";
      if (account.account_kind === "reserve") return "Ð ÐµÐ·ÐµÑÐ²";
      if (account.account_kind === "cash") return "ÐÐ°Ð»Ð¸ÑÐ½ÑÐµ";
      return account.is_primary_spend ? "ÐÑÐ½Ð¾Ð²Ð½Ð¾Ð¹ ÑÑÑÑ" : "ÐÐ±ÑÑÐ½ÑÐ¹ ÑÑÑÑ";
    }

    function getAccountRoleIconName(account) {
      if (account.account_kind === "vault_pool") return "vault";
      if (account.account_kind === "reserve") return "shield";
      if (account.account_kind === "cash") return "cash";
      return "card";
    }

    function getAccountRoleIconSvg(account) {
      const iconName = getAccountRoleIconName(account);

      if (iconName === "vault") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.5 12 5l8 5.5" />
            <path d="M6 10.5V19h12v-8.5" />
            <path d="M9.5 19v-5h5v5" />
          </svg>
        `;
      }

      if (iconName === "shield") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4 18 6.5v5.2c0 3.7-2.2 6.3-6 8.3-3.8-2-6-4.6-6-8.3V6.5L12 4Z" />
          </svg>
        `;
      }

      if (iconName === "cash") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 7.5h17v9h-17z" />
            <path d="M7 12h10" />
            <circle cx="12" cy="12" r="2.2" />
          </svg>
        `;
      }

      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
          <path d="M3.5 10h17" />
        </svg>
      `;
    }

    function canAccountBePrimary(role) {
      return role === "spend" || role === "cash";
    }

    function getAccountRoleFlags(role) {
      if (role === "vault_pool") {
        return {
          include_in_free_money: false,
          is_protected: false,
        };
      }

      if (role === "reserve") {
        return {
          include_in_free_money: false,
          is_protected: true,
        };
      }

      if (role === "cash") {
        return {
          include_in_free_money: true,
          is_protected: false,
        };
      }

      return {
        include_in_free_money: true,
        is_protected: false,
      };
    }

    function calculateBalance() {
      return state.accounts.reduce((sum, account) => {
        return sum + getAccountBalance(account.id);
      }, 0);
    }

    return {
      getAccountBalance,
      getRawAccountBalance,
      getAccountRoleLabel,
      getAccountRoleIconName,
      getAccountRoleIconSvg,
      canAccountBePrimary,
      getAccountRoleFlags,
      calculateBalance,
    };
  }

  window.FinanceAppAccountHelpers = {
    create: createAccountHelpers,
  };

  window.FinanceAppAccountBalanceAdjustments = {
    META_KEY: ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
    getAccountBalanceAdjustments,
    getAccountManualAdjustment,
    setAccountManualAdjustmentLocal,
    parseAdjustments,
  };
})();


;/* ===== js/09-safe-bucket-calculations.js ===== */
(() => {
  function createSafeBucketCalculations({
    state,
    roundToTwo,
    getFreeSafeBucket,
    getRealSafeBuckets,
    isRealSafeBucket,
    getSafeAccountId,
    getSafeAccountName,
    getAccountBalance,
    getSafeBucketsByKind,
    getProtectedAccounts,
    getFreeMoneyAccounts,
  }) {
    function normalizeSavingsValue(value) {
      return String(value || "").trim().toLowerCase();
    }

    function getLegacyBucketKind(bucket) {
      return normalizeSavingsValue(
        bucket?.kind ||
        bucket?.bucket_kind ||
        ""
      );
    }

    function getSavingsType(bucket) {
      const type = normalizeSavingsValue(bucket?.savings_type);

      if (type) return type;

      const legacyKind = getLegacyBucketKind(bucket);

      if (legacyKind === "tax" || legacyKind === "housing") {
        return "required";
      }

      if (legacyKind === "reserve") {
        return "reserve";
      }

      return "default";
    }

    function isBucketProtected(bucket) {
      if (typeof bucket?.include_in_protected === "boolean") {
        return bucket.include_in_protected;
      }

      if (typeof bucket?.is_protected === "boolean") {
        return bucket.is_protected;
      }

      const legacyKind = getLegacyBucketKind(bucket);

      return ["tax", "housing", "reserve"].includes(legacyKind);
    }

    function isStrictProtectedBucket(bucket) {
      if (!isBucketProtected(bucket)) return false;

      const type = getSavingsType(bucket);
      const legacyKind = getLegacyBucketKind(bucket);

      return (
        type === "required" ||
        legacyKind === "tax" ||
        legacyKind === "housing"
      );
    }

    function isSoftProtectedBucket(bucket) {
      if (!isBucketProtected(bucket)) return false;
      if (isStrictProtectedBucket(bucket)) return false;

      const type = getSavingsType(bucket);
      const legacyKind = getLegacyBucketKind(bucket);

      return (
        type === "reserve" ||
        type === "asset" ||
        legacyKind === "reserve"
      );
    }

    function getRealBucketsSafe() {
      if (typeof getRealSafeBuckets === "function") {
        return getRealSafeBuckets();
      }

      return state.safeBuckets.filter((bucket) => {
        if (typeof isRealSafeBucket === "function") {
          return isRealSafeBucket(bucket);
        }

        return bucket.include_in_free_money !== true;
      });
    }

    function isSafeAccountReference(accountId, accountName) {
      const safeAccountId = getSafeAccountId();

      if (accountId) {
        return accountId === safeAccountId;
      }

      const legacySafeAccountName = String(getSafeAccountName() || "").trim();

      if (!legacySafeAccountName) return false;

      return String(accountName || "").trim() === legacySafeAccountName;
    }

    function getIncomeBucketId(transaction) {
      return (
        transaction.to_safe_bucket_id ||
        transaction.safe_bucket_id ||
        ""
      );
    }

    function getExpenseBucketId(transaction) {
      return (
        transaction.from_safe_bucket_id ||
        transaction.safe_bucket_id ||
        ""
      );
    }

    function getSafeBucketBalance(bucketId) {
      let balance = 0;

      state.transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (!amount) return;

        if (transaction.type === "transfer") {
          const goesToSafe = isSafeAccountReference(
            transaction.to_account_id,
            transaction.to_account
          );

          const goesFromSafe = isSafeAccountReference(
            transaction.from_account_id,
            transaction.from_account
          );

          if (goesToSafe && transaction.to_safe_bucket_id === bucketId) {
            balance += amount;
          }

          if (goesFromSafe && transaction.from_safe_bucket_id === bucketId) {
            balance -= amount;
          }

          return;
        }

        if (transaction.type === "income") {
          const incomeToSafe = isSafeAccountReference(
            transaction.account_id,
            transaction.account
          );

          const incomeBucketId = getIncomeBucketId(transaction);

          if (incomeToSafe && incomeBucketId === bucketId) {
            balance += amount;
          }

          return;
        }

        if (transaction.type === "expense") {
          const expenseFromSafe = isSafeAccountReference(
            transaction.account_id,
            transaction.account
          );

          const expenseBucketId = getExpenseBucketId(transaction);

          if (expenseFromSafe && expenseBucketId === bucketId) {
            balance -= amount;
          }
        }
      });

      return roundToTwo(balance);
    }

    function getAllSafeBucketsBalance() {
      return roundToTwo(
        getRealBucketsSafe().reduce((sum, bucket) => {
          return sum + getSafeBucketBalance(bucket.id);
        }, 0)
      );
    }

    function getUnassignedSafeBalance() {
      const totalSafeBalance = getAccountBalance(getSafeAccountId());
      const distributedBalance = getAllSafeBucketsBalance();

      return roundToTwo(totalSafeBalance - distributedBalance);
    }

    function normalizeMoneyBucketName(value) {
      return String(value || "").trim().toLowerCase();
    }

    function getSafeBucketsByNames(names) {
      const normalizedNames = names.map(normalizeMoneyBucketName);

      return getRealBucketsSafe().filter((bucket) => {
        return normalizedNames.includes(normalizeMoneyBucketName(bucket.name));
      });
    }

    function getFreeSafeBalance() {
      return 0;
    }

    function getStrictSafeBalance() {
      return roundToTwo(
        getRealBucketsSafe()
          .filter(isStrictProtectedBucket)
          .reduce((sum, bucket) => {
            return sum + getSafeBucketBalance(bucket.id);
          }, 0)
      );
    }

    function getSoftReserveSafeBalance() {
      return roundToTwo(
        getRealBucketsSafe()
          .filter(isSoftProtectedBucket)
          .reduce((sum, bucket) => {
            return sum + getSafeBucketBalance(bucket.id);
          }, 0)
      );
    }

    function getCashReserveBalance() {
      return roundToTwo(
        getProtectedAccounts()
          .filter((account) => account.account_kind === "reserve")
          .reduce((sum, account) => {
            return sum + getAccountBalance(account.id);
          }, 0)
      );
    }

    function getSecondLineReserveBalance() {
      return roundToTwo(getSoftReserveSafeBalance() + getCashReserveBalance());
    }

    function getAvailableNowBalance() {
      return 0;
    }

    function getProtectedMoneyTotal() {
      return roundToTwo(getStrictSafeBalance() + getSecondLineReserveBalance());
    }

    function getFreeMoneyTotal() {
      const accountsPart = getFreeMoneyAccounts().reduce((sum, account) => {
        return sum + getAccountBalance(account.id);
      }, 0);

      return roundToTwo(Math.max(0, accountsPart));
    }

    return {
      getSafeBucketBalance,
      getAllSafeBucketsBalance,
      getUnassignedSafeBalance,
      normalizeMoneyBucketName,
      getSafeBucketsByNames,
      getFreeSafeBalance,
      getStrictSafeBalance,
      getSoftReserveSafeBalance,
      getCashReserveBalance,
      getSecondLineReserveBalance,
      getAvailableNowBalance,
      getProtectedMoneyTotal,
      getFreeMoneyTotal,
    };
  }

  window.FinanceAppSafeBucketCalculations = {
    create: createSafeBucketCalculations,
  };
})();


;/* ===== js/10-budget-analytics-calculations.js ===== */
(() => {
  function createBudgetAnalyticsCalculations({
    state,
    roundToTwo,
    UNCATEGORIZED_ID,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    isRequiredCategory,
    formatMoney,
    getCategoryName,
  }) {
    function getBudgetLimitByCategoryId(categoryId) {
      return state.budgetLimits.find((item) => item.category_id === categoryId);
    }

    function getBudgetLimitLabel(categoryId) {
      const record = getBudgetLimitByCategoryId(categoryId);
      const amount = record ? Number(record.monthly_limit) || 0 : 0;

      return amount > 0 ? formatMoney(amount) : "â";
    }

    function getAnalyticsSpentLimitLabel(spent, categoryId) {
      return `${formatMoney(spent)} / ${getBudgetLimitLabel(categoryId)}`;
    }

    function isBudgetExceeded(spent, categoryId) {
      const record = getBudgetLimitByCategoryId(categoryId);
      const limit = record ? Number(record.monthly_limit) || 0 : 0;

      return limit > 0 && spent > limit;
    }

    function getFlexibleBudgetStats(filteredTransactions) {
      const byCategory = new Map();

      filteredTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        if (isRequiredCategory(categoryId)) return;

        const current = byCategory.get(categoryId) || 0;
        byCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      let exceededCount = 0;
      let nearLimitCount = 0;
      let limitedCount = 0;

      byCategory.forEach((spent, categoryId) => {
        const limitRecord = getBudgetLimitByCategoryId(categoryId);
        const limit = limitRecord ? Number(limitRecord.monthly_limit) || 0 : 0;

        if (limit <= 0) return;

        limitedCount += 1;

        if (spent > limit) {
          exceededCount += 1;
          return;
        }

        if (spent >= limit * 0.85) {
          nearLimitCount += 1;
        }
      });

      return {
        exceededCount,
        nearLimitCount,
        limitedCount,
      };
    }

    function getCurrentMonthTransactions() {
      return filterTransactionsByPeriod(
        state.transactions,
        "month",
        getCurrentMonthValue(),
        "",
        ""
      );
    }

    function getRemainingFlexibleBudgetsCurrentMonth() {
      const monthTransactions = getCurrentMonthTransactions();
      const spentByCategory = new Map();

      monthTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const current = spentByCategory.get(categoryId) || 0;
        spentByCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      let total = 0;

      state.budgetLimits.forEach((limit) => {
        const categoryId = limit.category_id;
        const limitAmount = Number(limit.monthly_limit) || 0;

        if (limitAmount <= 0) return;
        if (isRequiredCategory(categoryId)) return;

        const spent = spentByCategory.get(categoryId) || 0;
        const remaining = Math.max(0, roundToTwo(limitAmount - spent));

        total += remaining;
      });

      return roundToTwo(total);
    }

    function getRemainingFlexibleBudgetsBreakdownCurrentMonth() {
      const monthTransactions = getCurrentMonthTransactions();
      const spentByCategory = new Map();

      monthTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;

        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const current = spentByCategory.get(categoryId) || 0;
        spentByCategory.set(categoryId, current + (Number(transaction.amount) || 0));
      });

      const rows = [];

      state.budgetLimits.forEach((limit) => {
        const categoryId = limit.category_id;
        const limitAmount = Number(limit.monthly_limit) || 0;

        if (limitAmount <= 0) return;
        if (isRequiredCategory(categoryId)) return;

        const spent = roundToTwo(spentByCategory.get(categoryId) || 0);
        const remaining = Math.max(0, roundToTwo(limitAmount - spent));

        rows.push({
          categoryId,
          name: getCategoryName(categoryId),
          limit: roundToTwo(limitAmount),
          spent,
          remaining,
        });
      });

      return rows
        .filter((item) => item.remaining > 0)
        .sort((a, b) => b.remaining - a.remaining);
    }

    function getInsightsWorkingMinimum(requiredExpense, flexibleExpense) {
      return roundToTwo(
        Math.max(
          requiredExpense * 0.5,
          flexibleExpense * 0.35,
          5000
        )
      );
    }

    function getInsightsCanSaveNow(
      availableNowBalance,
      workingMinimum,
      exceededCount,
      nearLimitCount
    ) {
      let canSave = Math.max(0, roundToTwo(availableNowBalance - workingMinimum));

      if (exceededCount > 0) {
        return 0;
      }

      if (nearLimitCount > 0) {
        canSave = roundToTwo(canSave * 0.5);
      }

      return Math.max(0, canSave);
    }

    return {
      getBudgetLimitByCategoryId,
      getBudgetLimitLabel,
      getAnalyticsSpentLimitLabel,
      isBudgetExceeded,
      getFlexibleBudgetStats,
      getCurrentMonthTransactions,
      getRemainingFlexibleBudgetsCurrentMonth,
      getRemainingFlexibleBudgetsBreakdownCurrentMonth,
      getInsightsWorkingMinimum,
      getInsightsCanSaveNow,
    };
  }

  window.FinanceAppBudgetAnalyticsCalculations = {
    create: createBudgetAnalyticsCalculations,
  };
})();


;/* ===== js/11-safe-bucket-dom-helpers.js ===== */
(() => {
  function createSafeBucketDomHelpers({
    state,
    isVaultAccountId,
    getRealSafeBuckets,
    getFreeSafeBucket,
    getTransferAccounts,
    accountSelect,
    fromAccountSelect,
    toAccountSelect,
    fromSafeBucketField,
    toSafeBucketField,
    fromSafeBucketSelect,
    toSafeBucketSelect,
    getCurrentMode,
  }) {
    function getRealBucketsForSelect() {
      if (typeof getRealSafeBuckets === "function") {
        return getRealSafeBuckets();
      }

      return state.safeBuckets.filter((bucket) => {
        return bucket.include_in_free_money !== true;
      });
    }

    function getFreeBucketForTransfer() {
      if (typeof getFreeSafeBucket === "function") {
        return getFreeSafeBucket();
      }

      return (
        state.safeBuckets.find((bucket) => {
          const name = String(bucket.name || "").trim().toLowerCase();
          const kind = String(bucket.bucket_kind || "").trim().toLowerCase();

          return (
            bucket.include_in_free_money === true ||
            kind === "free" ||
            kind === "system_free" ||
            name === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ" ||
            name === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾"
          );
        }) || null
      );
    }

    function getBucketsForSelect({ includeFree = false } = {}) {
      const realBuckets = getRealBucketsForSelect();
      const freeBucket = includeFree ? getFreeBucketForTransfer() : null;

      if (!freeBucket) {
        return realBuckets;
      }

      const hasFreeInRealList = realBuckets.some((bucket) => {
        return bucket.id === freeBucket.id;
      });

      if (hasFreeInRealList) {
        return realBuckets;
      }

      return [
        {
          ...freeBucket,
          name: "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ",
        },
        ...realBuckets,
      ];
    }

    function getAccountsForTransfer() {
      if (typeof getTransferAccounts === "function") {
        return getTransferAccounts();
      }

      return state.accounts.filter((account) => {
        return account.account_kind !== "system";
      });
    }

    function fillTransferAccountSelect(selectEl, placeholder, selectedId = "") {
      if (!selectEl) return;

      const previousValue = selectedId || selectEl.value || "";

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      getAccountsForTransfer().forEach((account) => {
        const option = document.createElement("option");

        option.value = account.id;
        option.textContent = account.name || "Ð¡ÑÑÑ";

        if (previousValue && previousValue === account.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    function syncTransferAccountSelects() {
      fillTransferAccountSelect(
        fromAccountSelect,
        "Ð¡ ÐºÐ°ÐºÐ¾Ð³Ð¾ ÑÑÑÑÐ°",
        fromAccountSelect?.value || ""
      );

      fillTransferAccountSelect(
        toAccountSelect,
        "ÐÐ° ÐºÐ°ÐºÐ¾Ð¹ ÑÑÑÑ",
        toAccountSelect?.value || ""
      );
    }

    function fillSafeBucketSelect(
      selectEl,
      placeholder,
      selectedId = "",
      options = {}
    ) {
      if (!selectEl) return;

      const previousValue = selectedId || selectEl.value || "";

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      getBucketsForSelect(options).forEach((bucket) => {
        const option = document.createElement("option");

        option.value = bucket.id;
        option.textContent = bucket.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";

        if (previousValue && previousValue === bucket.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    function hideSafeBucketFields() {
      fromSafeBucketField?.classList.add("hidden");
      toSafeBucketField?.classList.add("hidden");
    }

    function updateTransferSafeFields() {
      const mode =
        typeof getCurrentMode === "function"
          ? getCurrentMode()
          : "transfer";

      hideSafeBucketFields();

      if (mode === "expense") {
        const expenseFromSafes = isVaultAccountId(accountSelect?.value);

        if (!expenseFromSafes) {
          if (fromSafeBucketSelect) fromSafeBucketSelect.value = "";
          if (toSafeBucketSelect) toSafeBucketSelect.value = "";
          return;
        }

        fillSafeBucketSelect(
          fromSafeBucketSelect,
          "ÐÐ· ÐºÐ°ÐºÐ¾Ð³Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
          fromSafeBucketSelect?.value || "",
          {
            includeFree: false,
          }
        );

        fromSafeBucketField?.classList.remove("hidden");

        if (toSafeBucketSelect) {
          toSafeBucketSelect.value = "";
        }

        return;
      }

      if (mode !== "transfer") {
        if (fromSafeBucketSelect) fromSafeBucketSelect.value = "";
        if (toSafeBucketSelect) toSafeBucketSelect.value = "";
        return;
      }

      syncTransferAccountSelects();

      const fromIsSafes = isVaultAccountId(fromAccountSelect?.value);
      const toIsSafes = isVaultAccountId(toAccountSelect?.value);

      if (!fromIsSafes && fromSafeBucketSelect) {
        fromSafeBucketSelect.value = "";
      }

      if (!toIsSafes && toSafeBucketSelect) {
        toSafeBucketSelect.value = "";
      }

      if (fromIsSafes) {
        fillSafeBucketSelect(
          fromSafeBucketSelect,
          "ÐÐ· ÐºÐ°ÐºÐ¾Ð³Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
          fromSafeBucketSelect?.value || "",
          {
            includeFree: true,
          }
        );

        fromSafeBucketField?.classList.remove("hidden");
      }

      if (toIsSafes) {
        fillSafeBucketSelect(
          toSafeBucketSelect,
          "Ð ÐºÐ°ÐºÐ¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ",
          toSafeBucketSelect?.value || "",
          {
            includeFree: true,
          }
        );

        toSafeBucketField?.classList.remove("hidden");
      }
    }

    return {
      fillSafeBucketSelect,
      updateTransferSafeFields,
    };
  }

  window.FinanceAppSafeBucketDomHelpers = {
    create: createSafeBucketDomHelpers,
  };
})();

(() => {
  const PATCHED_MARK = "safeBucketsCleanupControlsPatched";
  const FREE_BUCKET_MARK = "safeBucketsFreeDeletePatched";

  function getState() {
    return window.FinanceAppState?.state || null;
  }

  function getSupabaseClient() {
    if (typeof supabaseClient === "undefined") {
      return null;
    }

    return supabaseClient;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function getTodayDateValue() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 10);
  }

  function isFreeSafeBucket(bucket) {
    if (!bucket) return false;

    const name = String(bucket.name || "").trim().toLowerCase();
    const kind = String(bucket.bucket_kind || "").trim().toLowerCase();

    return (
      bucket.include_in_free_money === true ||
      kind === "free" ||
      kind === "system_free" ||
      name === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ" ||
      name === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾"
    );
  }

  function getVaultAccount(state) {
    return (
      state?.accounts?.find((account) => account.account_kind === "vault_pool") ||
      null
    );
  }

  function getFreeSafeBucket(state) {
    return state?.safeBuckets?.find(isFreeSafeBucket) || null;
  }

  function getRealSafeBuckets(state) {
    return (state?.safeBuckets || []).filter((bucket) => !isFreeSafeBucket(bucket));
  }

  function getAccountBalance(state, account) {
    if (!state || !account) return 0;

    const accountId = account.id;
    const accountName = account.name;

    const balance = (state.transactions || []).reduce((sum, transaction) => {
      const amount = roundToTwo(transaction.amount || 0);

      if (transaction.type === "income") {
        const matchesById =
          transaction.account_id && transaction.account_id === accountId;

        const matchesLegacy =
          !transaction.account_id && transaction.account === accountName;

        if (matchesById || matchesLegacy) {
          return sum + amount;
        }
      }

      if (transaction.type === "expense") {
        const matchesById =
          transaction.account_id && transaction.account_id === accountId;

        const matchesLegacy =
          !transaction.account_id && transaction.account === accountName;

        if (matchesById || matchesLegacy) {
          return sum - amount;
        }
      }

      if (transaction.type === "transfer") {
        const fromMatchesById =
          transaction.from_account_id && transaction.from_account_id === accountId;

        const fromMatchesLegacy =
          !transaction.from_account_id && transaction.from_account === accountName;

        const toMatchesById =
          transaction.to_account_id && transaction.to_account_id === accountId;

        const toMatchesLegacy =
          !transaction.to_account_id && transaction.to_account === accountName;

        if (fromMatchesById || fromMatchesLegacy) {
          sum -= amount;
        }

        if (toMatchesById || toMatchesLegacy) {
          sum += amount;
        }
      }

      return sum;
    }, 0);

    return roundToTwo(balance);
  }

  function getSafeBucketBalance(state, bucketId) {
    const vaultAccount = getVaultAccount(state);

    if (!vaultAccount || !bucketId) return 0;

    const safeAccountId = vaultAccount.id;
    const safeAccountName = vaultAccount.name;

    const balance = (state.transactions || []).reduce((sum, transaction) => {
      const amount = roundToTwo(transaction.amount || 0);

      if (transaction.type === "transfer") {
        const goesToSafe =
          (transaction.to_account_id && transaction.to_account_id === safeAccountId) ||
          (!transaction.to_account_id && transaction.to_account === safeAccountName);

        const goesFromSafe =
          (transaction.from_account_id && transaction.from_account_id === safeAccountId) ||
          (!transaction.from_account_id && transaction.from_account === safeAccountName);

        if (goesToSafe && transaction.to_safe_bucket_id === bucketId) {
          sum += amount;
        }

        if (goesFromSafe && transaction.from_safe_bucket_id === bucketId) {
          sum -= amount;
        }
      }

      if (transaction.type === "income") {
        const incomeToSafe =
          (transaction.account_id && transaction.account_id === safeAccountId) ||
          (!transaction.account_id && transaction.account === safeAccountName);

        if (incomeToSafe && transaction.to_safe_bucket_id === bucketId) {
          sum += amount;
        }
      }

      if (transaction.type === "expense") {
        const expenseFromSafe =
          (transaction.account_id && transaction.account_id === safeAccountId) ||
          (!transaction.account_id && transaction.account === safeAccountName);

        const expenseBucketId =
          transaction.from_safe_bucket_id ||
          transaction.safe_bucket_id ||
          "";

        if (expenseFromSafe && expenseBucketId === bucketId) {
          sum -= amount;
        }
      }

      return sum;
    }, 0);

    return roundToTwo(balance);
  }

  function getUnassignedSafeBalance(state) {
    const vaultAccount = getVaultAccount(state);

    if (!vaultAccount) return 0;

    const totalSafeBalance = getAccountBalance(state, vaultAccount);
    const distributedBalance = getRealSafeBuckets(state).reduce((sum, bucket) => {
      return sum + getSafeBucketBalance(state, bucket.id);
    }, 0);

    return roundToTwo(totalSafeBalance - distributedBalance);
  }

  async function insertCorrectionTransaction(client, payload) {
    const optionalColumns = [
      "category_id",
      "comment",
      "from_safe_bucket_id",
      "to_safe_bucket_id",
      "safe_bucket_id",
      "account",
    ];

    let nextPayload = { ...payload };

    for (let attempt = 0; attempt <= optionalColumns.length; attempt += 1) {
      const { error } = await client.from("transactions").insert([nextPayload]);

      if (!error) return;

      const message = String(error.message || "");
      const missingColumn = optionalColumns.find((column) => {
        return message.includes(`'${column}'`) || message.includes(column);
      });

      if (!missingColumn) {
        throw error;
      }

      delete nextPayload[missingColumn];
    }
  }

    function patchUnassignedRow(modal) {
  const row = modal.querySelector("#safeBucketsUnassignedCard");

  if (!row) return;

  const valueEl =
    document.getElementById("safeBucketsUnassignedValue") ||
    row.querySelector(".list-value");

  if (valueEl) {
    const savedHiddenValue = localStorage.getItem("financeAppHiddenUnassignedSafeValue");
    const currentValue = String(valueEl.textContent || "").trim();

    if (savedHiddenValue && currentValue === savedHiddenValue) {
      valueEl.textContent = "";
      valueEl.classList.add("safe-buckets-value-hidden-by-reset");
    }

    if (savedHiddenValue && currentValue && currentValue !== savedHiddenValue) {
      localStorage.removeItem("financeAppHiddenUnassignedSafeValue");
      valueEl.classList.remove("safe-buckets-value-hidden-by-reset");
    }
  }

  if (row.dataset[PATCHED_MARK] === "true") return;

  row.dataset[PATCHED_MARK] = "true";

  const button = getOrCreateRowActionButton(
    row,
    "safe-buckets-row-reset-btn",
    "ÐÐ±Ð½ÑÐ»Ð¸ÑÑ"
  );

  button.setAttribute("aria-label", "Ð¡ÐºÑÑÑÑ ÑÑÐ¼Ð¼Ñ Ð½Ðµ ÑÐ°ÑÐ¿ÑÐµÐ´ÐµÐ»ÐµÐ½Ð¾");
  button.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  // ÑÐ¾Ð»ÑÐºÐ¾ ÑÐºÑÑÐ²Ð°ÐµÐ¼ ÑÐµÐºÑÑÑÑ ÑÑÐ¼Ð¼Ñ, Ð½Ð¸ÑÐµÐ³Ð¾ Ð½Ðµ Ð¿Ð¸ÑÐµÐ¼ Ð² Supabase
  const valueEl =
    document.getElementById("safeBucketsUnassignedValue") ||
    row.querySelector(".list-value");
  if (valueEl) {
    const current = String(valueEl.textContent || "").trim();
    if (current) {
      localStorage.setItem("financeAppHiddenUnassignedSafeValue", current);
      valueEl.textContent = "";
      valueEl.classList.add("safe-buckets-value-hidden-by-reset");
    }
  }
});
}
  
    async function clearFreeBucketReferences(client, bucketId) {
      const columns = ["from_safe_bucket_id", "to_safe_bucket_id", "safe_bucket_id"];
  
      for (const column of columns) {
        const { error } = await client
          .from("transactions")
          .update({ [column]: null })
          .eq(column, bucketId);
  
        if (error && !String(error.message || "").toLowerCase().includes("column")) {
          throw error;
        }
      }
    }
  
    async function deleteFreeSafeBucket(event) {
      event.preventDefault();
      event.stopPropagation();
  
      const state = getState();
      const client = getSupabaseClient();
      const freeBucket = getFreeSafeBucket(state);
  
      if (!state || !client || !freeBucket) {
        alert("Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ñ Ð¸Ð»Ð¸ Ð´Ð°Ð½Ð½ÑÐµ ÐµÑÑ Ð½Ðµ Ð·Ð°Ð³ÑÑÐ¶ÐµÐ½Ñ.");
        return;
      }
  
      const confirmed = confirm(
        "Ð£Ð´Ð°Ð»Ð¸ÑÑ ÑÐ°Ð·Ð´ÐµÐ» Â«Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµÂ»? ÐÐ³Ð¾ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸ ÑÑÐ°Ð½ÑÑ Ð½ÐµÑÐ°ÑÐ¿ÑÐµÐ´ÐµÐ»ÑÐ½Ð½ÑÐ¼Ð¸."
      );
  
      if (!confirmed) return;
  
      try {
        await clearFreeBucketReferences(client, freeBucket.id);
  
        const { error } = await client
          .from("safe_buckets")
          .delete()
          .eq("id", freeBucket.id);
  
      if (error) {
        throw error;
      }

      window.location.reload();
    } catch (error) {
      alert(`ÐÐµ Ð¿Ð¾Ð»ÑÑÐ¸Ð»Ð¾ÑÑ ÑÐ´Ð°Ð»Ð¸ÑÑ Â«Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµÂ»: ${error.message || "Ð¾ÑÐ¸Ð±ÐºÐ° Supabase"}`);
    }
  }

  function getOrCreateRowActionButton(row, className, label) {
    let button = row.querySelector(`.${className}`);

    if (button) return button;

    button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;

    const rightSide = row.querySelector(".list-right") || row;
    rightSide.appendChild(button);

    return button;
  }

  function patchUnassignedRow(modal) {
    const row = modal.querySelector("#safeBucketsUnassignedCard");

    if (!row || row.dataset[PATCHED_MARK] === "true") return;

    row.dataset[PATCHED_MARK] = "true";

    const button = getOrCreateRowActionButton(
      row,
      "safe-buckets-row-reset-btn",
      "ÐÐ±Ð½ÑÐ»Ð¸ÑÑ"
    );

    button.setAttribute("aria-label", "ÐÐ±Ð½ÑÐ»Ð¸ÑÑ Ð½Ðµ ÑÐ°ÑÐ¿ÑÐµÐ´ÐµÐ»ÐµÐ½Ð¾");
    button.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  // ÑÐ¾Ð»ÑÐºÐ¾ ÑÐºÑÑÐ²Ð°ÐµÐ¼ ÑÐµÐºÑÑÑÑ ÑÑÐ¼Ð¼Ñ, Ð½Ð¸ÑÐµÐ³Ð¾ Ð½Ðµ Ð¿Ð¸ÑÐµÐ¼ Ð² Supabase
  const valueEl =
    document.getElementById("safeBucketsUnassignedValue") ||
    row.querySelector(".list-value");
  if (valueEl) {
    const current = String(valueEl.textContent || "").trim();
    if (current) {
      localStorage.setItem("financeAppHiddenUnassignedSafeValue", current);
      valueEl.textContent = "";
      valueEl.classList.add("safe-buckets-value-hidden-by-reset");
    }
  }
});
  }

  function patchFreeBucketRow(modal) {
    const state = getState();
    const freeBucket = getFreeSafeBucket(state);
    const freeBucketName = String(freeBucket?.name || "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ")
      .trim()
      .toLowerCase();

    const rows = Array.from(modal.querySelectorAll(".safe-buckets-wallet-row"));

    rows.forEach((row) => {
      if (row.dataset[FREE_BUCKET_MARK] === "true") return;

      const title = String(row.querySelector(".list-title")?.textContent || "")
        .trim()
        .toLowerCase();

      const isFreeRow =
        title === freeBucketName ||
        title === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ" ||
        title === "ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾";

      if (!isFreeRow) return;

      row.dataset[FREE_BUCKET_MARK] = "true";

      const button = getOrCreateRowActionButton(
        row,
        "safe-buckets-row-delete-btn",
        "Ð£Ð´Ð°Ð»Ð¸ÑÑ"
      );

      button.setAttribute("aria-label", "Ð£Ð´Ð°Ð»Ð¸ÑÑ Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ");
      button.addEventListener("click", deleteFreeSafeBucket);
    });
  }

  function patchSafeBucketsModal() {
    const modal = document.getElementById("safeBucketsModal");

    if (!modal) return;

    patchUnassignedRow(modal);
    patchFreeBucketRow(modal);
  }

  document.addEventListener("DOMContentLoaded", () => {
    let frameId = 0;

    const schedulePatch = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        frameId = 0;
        patchSafeBucketsModal();
      });
    };

    schedulePatch();

    const modal = document.getElementById("safeBucketsModal");

    if (!modal) return;

    const observer = new MutationObserver(schedulePatch);

    observer.observe(modal, {
      childList: true,
      subtree: true,
    });
  });
})();


;/* ===== js/12-mandatory-payment-helpers.js ===== */
(() => {
  function createMandatoryPaymentHelpers({
    state,
    getAppMetaValue,
    roundToTwo,
    getCurrentMonthValue,
    getSelectedMonth,
    getSafeBucketBalance,
    getSafeBucketById,
  }) {
    function parseMandatoryPaymentsFromMeta() {
      const raw = getAppMetaValue("mandatory_payments");
      if (!raw) return [];

      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return parsed.map((item) => {
          const legacyLastPaidPeriod = item.last_paid_period || "";

          const paidPeriods = Array.isArray(item.paid_periods)
            ? item.paid_periods.filter(Boolean)
            : [];

          if (legacyLastPaidPeriod && !paidPeriods.includes(legacyLastPaidPeriod)) {
            paidPeriods.push(legacyLastPaidPeriod);
          }

          const startPeriod =
            item.start_period ||
            item.due_period ||
            item.period ||
            getCurrentMonthValue();

          return {
            id: item.id || crypto.randomUUID(),
            title: String(item.title || "").trim(),
            amount: roundToTwo(Number(item.amount) || 0),
            due_day: Math.min(31, Math.max(1, Number(item.due_day) || 1)),
            start_period: startPeriod,
            paid_periods: paidPeriods,
            linked_account_id: item.linked_account_id || "",
            linked_safe_bucket_id: item.linked_safe_bucket_id || "",
            enabled: item.enabled !== false,

            // legacy, ÑÑÐ¾Ð±Ñ ÑÑÐ°ÑÑÐµ Ð´Ð°Ð½Ð½ÑÐµ Ð½Ðµ ÑÐ°Ð·Ð²Ð°Ð»Ð¸Ð»Ð¸ÑÑ
            last_paid_period: legacyLastPaidPeriod,
          };
        });
      } catch (error) {
        console.error("ÐÑÐ¸Ð±ÐºÐ° mandatory_payments", error);
        return [];
      }
    }

    function getCurrentMonthKey() {
      return getCurrentMonthValue();
    }

    function getMandatoryPaymentsActiveMonthKey() {
      return getSelectedMonth() || getCurrentMonthValue();
    }

    function isMandatoryPaymentVisibleInMonth(item, monthKey) {
      if (item.enabled === false) return false;

      const startPeriod = item.start_period || getCurrentMonthValue();

      return startPeriod <= monthKey;
    }

    function getMandatoryPaymentPaidPeriods(item) {
      if (Array.isArray(item.paid_periods)) {
        return item.paid_periods.filter(Boolean);
      }

      return item.last_paid_period ? [item.last_paid_period] : [];
    }

    function isMandatoryPaymentPaidInMonth(item, monthKey) {
      return getMandatoryPaymentPaidPeriods(item).includes(monthKey);
    }

    function setMandatoryPaymentPaidInMonth(item, monthKey, isPaid) {
      const periods = new Set(getMandatoryPaymentPaidPeriods(item));

      if (isPaid) {
        periods.add(monthKey);
      } else {
        periods.delete(monthKey);
      }

      item.paid_periods = [...periods].sort();
      item.last_paid_period = item.paid_periods[item.paid_periods.length - 1] || "";
    }

    function buildMandatoryPaymentDate(monthKey, dueDay) {
      const [rawYear, rawMonth] = String(monthKey || getCurrentMonthValue()).split("-");

      const parsedYear = Number(rawYear);
      const parsedMonth = Number(rawMonth);

      const now = new Date();
      const year = Number.isFinite(parsedYear) && parsedYear > 0
        ? parsedYear
        : now.getFullYear();

      const month = Number.isFinite(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12
        ? parsedMonth
        : now.getMonth() + 1;

      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const safeDay = String(
        Math.min(lastDayOfMonth, Math.max(1, Number(dueDay) || 1))
      ).padStart(2, "0");

      return `${year}-${String(month).padStart(2, "0")}-${safeDay}`;
    }

    function buildMandatoryPaymentTransactionCreatedAt() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    function buildDateFromDueDay(dueDay, monthKey = getMandatoryPaymentsActiveMonthKey()) {
      return buildMandatoryPaymentDate(monthKey, dueDay);
    }

    function getMandatoryPaymentsStats(monthKey = getCurrentMonthKey()) {
      const unpaidItems = state.mandatoryPayments.filter((item) => {
        if (!isMandatoryPaymentVisibleInMonth(item, monthKey)) return false;
        return !isMandatoryPaymentPaidInMonth(item, monthKey);
      });

      const total = unpaidItems.reduce((sum, item) => {
        return sum + (Number(item.amount) || 0);
      }, 0);

      return {
        items: unpaidItems,
        count: unpaidItems.length,
        total: roundToTwo(total),
      };
    }

    function isProtectedSafeBucket(bucketId) {
      const bucket = getSafeBucketById(bucketId);

      if (!bucket) return false;

      if (typeof bucket.include_in_protected === "boolean") {
        return bucket.include_in_protected;
      }

      if (typeof bucket.is_protected === "boolean") {
        return bucket.is_protected;
      }

      const legacyKind = String(bucket.kind || bucket.bucket_kind || "")
        .trim()
        .toLowerCase();

      return ["tax", "housing", "reserve"].includes(legacyKind);
    }

    function getMandatoryPaymentsCoverageStats(monthKey = getCurrentMonthKey()) {
      const unpaidItems = state.mandatoryPayments
        .filter((item) => {
          if (!isMandatoryPaymentVisibleInMonth(item, monthKey)) return false;
          return !isMandatoryPaymentPaidInMonth(item, monthKey);
        })
        .sort((a, b) => {
          return buildMandatoryPaymentDate(monthKey, a.due_day)
            .localeCompare(buildMandatoryPaymentDate(monthKey, b.due_day));
        });

      const safeBalanceLeftById = new Map();

      function getLinkedSafeBalanceLeft(bucketId) {
        if (!bucketId) return 0;

        if (!safeBalanceLeftById.has(bucketId)) {
          safeBalanceLeftById.set(
            bucketId,
            Math.max(0, roundToTwo(getSafeBucketBalance(bucketId)))
          );
        }

        return safeBalanceLeftById.get(bucketId) || 0;
      }

      function consumeLinkedSafe(bucketId, amount) {
        if (!bucketId || amount <= 0) return 0;

        const balanceLeft = getLinkedSafeBalanceLeft(bucketId);
        const covered = Math.min(amount, balanceLeft);

        safeBalanceLeftById.set(bucketId, roundToTwo(balanceLeft - covered));

        return roundToTwo(covered);
      }

      let total = 0;
      let coveredByLinkedSafes = 0;
      let coveredByProtectedSafes = 0;
      let uncoveredAfterLinkedSafes = 0;
      let chargeToFreeMoney = 0;

      unpaidItems.forEach((item) => {
        const amount = roundToTwo(Number(item.amount) || 0);
        if (amount <= 0) return;

        total += amount;

        const linkedSafeId = item.linked_safe_bucket_id || "";
        const coveredByThisSafe = consumeLinkedSafe(linkedSafeId, amount);
        const uncoveredAfterLinked = Math.max(0, roundToTwo(amount - coveredByThisSafe));

        coveredByLinkedSafes += coveredByThisSafe;
        uncoveredAfterLinkedSafes += uncoveredAfterLinked;
        chargeToFreeMoney += uncoveredAfterLinked;

        if (linkedSafeId && isProtectedSafeBucket(linkedSafeId)) {
          coveredByProtectedSafes += coveredByThisSafe;
        }
      });

      return {
        items: unpaidItems,
        count: unpaidItems.length,
        total: roundToTwo(total),
        coveredByLinkedSafes: roundToTwo(coveredByLinkedSafes),
        coveredByProtectedSafes: roundToTwo(coveredByProtectedSafes),
        uncoveredAfterLinkedSafes: roundToTwo(uncoveredAfterLinkedSafes),
        chargeToFreeMoney: roundToTwo(chargeToFreeMoney),
      };
    }

    return {
      parseMandatoryPaymentsFromMeta,
      getCurrentMonthKey,
      getMandatoryPaymentsActiveMonthKey,
      isMandatoryPaymentVisibleInMonth,
      getMandatoryPaymentPaidPeriods,
      isMandatoryPaymentPaidInMonth,
      setMandatoryPaymentPaidInMonth,
      buildMandatoryPaymentDate,
      buildMandatoryPaymentTransactionCreatedAt,
      buildDateFromDueDay,
      getMandatoryPaymentsStats,
      isProtectedSafeBucket,
      getMandatoryPaymentsCoverageStats,
    };
  }

  window.FinanceAppMandatoryPaymentHelpers = {
    create: createMandatoryPaymentHelpers,
  };
})();


;/* ===== js/13-mandatory-payment-dom.js ===== */
(() => {
  function createMandatoryPaymentDom({
    state,
    mandatoryPaymentAccountSelect,
mandatoryPaymentLinkedSafeSelect,
mandatoryPaymentCategorySelect,
mandatoryPaymentLinkedSafeField,
    openMandatoryPaymentBucketPickerBtn,
    mandatoryPaymentBucketPickerModal,
    mandatoryPaymentBucketPickerList,
    isVaultAccountId,
    getSafeBucketName,
    escapeHtml,
  }) {
    function fillMandatoryPaymentAccountSelect(selectedId = "") {
      if (!mandatoryPaymentAccountSelect) return;

      mandatoryPaymentAccountSelect.innerHTML = `<option value="">ÐÐµÐ· Ð¿ÑÐ¸Ð²ÑÐ·ÐºÐ¸</option>`;

      state.accounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;

        if (selectedId && selectedId === account.id) {
          option.selected = true;
        }

        mandatoryPaymentAccountSelect.appendChild(option);
      });
    }

    function fillMandatoryPaymentSafeSelect(selectedId = "") {
      if (!mandatoryPaymentLinkedSafeSelect) return;

      mandatoryPaymentLinkedSafeSelect.innerHTML =
        `<option value="">ÐÐµÐ· Ð¿ÑÐ¸Ð²ÑÐ·ÐºÐ¸ Ðº Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ</option>`;

      state.safeBuckets.forEach((bucket) => {
        const option = document.createElement("option");
        option.value = bucket.id;
        option.textContent = bucket.name;

        if (selectedId && selectedId === bucket.id) {
          option.selected = true;
        }

        mandatoryPaymentLinkedSafeSelect.appendChild(option);
      });
    }
    
    function fillMandatoryPaymentCategorySelect(selectedId = "") {
  if (!mandatoryPaymentCategorySelect) return;

  mandatoryPaymentCategorySelect.innerHTML =
    `<option value="">ÐÑÐ±ÐµÑÐ¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ Ð¿Ð»Ð°ÑÐµÐ¶Ð°</option>`;

  const requiredCategories = state.categories.filter((category) => {
    return category.is_required === true;
  });

  const categories = requiredCategories.length
    ? requiredCategories
    : state.categories;

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category.id;
    option.textContent = category.name;

    if (selectedId && selectedId === category.id) {
      option.selected = true;
    }

    mandatoryPaymentCategorySelect.appendChild(option);
  });
}

    function syncMandatoryPaymentLinkedSafeField() {
      const accountId = mandatoryPaymentAccountSelect?.value || "";
      const isVault = isVaultAccountId(accountId);

      mandatoryPaymentLinkedSafeField?.classList.toggle("hidden", !isVault);

      if (!isVault) {
        if (mandatoryPaymentLinkedSafeSelect) {
          mandatoryPaymentLinkedSafeSelect.value = "";
        }

        if (openMandatoryPaymentBucketPickerBtn) {
          openMandatoryPaymentBucketPickerBtn.textContent = "ÐÑÐ±ÑÐ°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";
        }

        return;
      }

      if (openMandatoryPaymentBucketPickerBtn) {
        const currentBucketName =
          getSafeBucketName(mandatoryPaymentLinkedSafeSelect?.value || "") ||
          "ÐÑÐ±ÑÐ°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";

        openMandatoryPaymentBucketPickerBtn.textContent = currentBucketName;
      }
    }

    function renderMandatoryPaymentBucketPicker() {
      if (!mandatoryPaymentBucketPickerList) return;

      mandatoryPaymentBucketPickerList.innerHTML = "";

      if (!state.safeBuckets.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹ Ð¿Ð¾ÐºÐ° Ð½ÐµÑ</h3>
            <p class="list-subtitle">Ð¡Ð½Ð°ÑÐ°Ð»Ð° ÑÐ¾Ð·Ð´Ð°Ð¹ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ</p>
          </div>
        `;
        mandatoryPaymentBucketPickerList.appendChild(empty);
        return;
      }

      state.safeBuckets.forEach((bucket) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "list-card list-card--clickable";

        row.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">${escapeHtml(bucket.name)}</h3>
            <p class="list-subtitle">ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ</p>
          </div>
        `;

        row.addEventListener("click", () => {
          if (mandatoryPaymentLinkedSafeSelect) {
            mandatoryPaymentLinkedSafeSelect.value = bucket.id;
          }

          if (openMandatoryPaymentBucketPickerBtn) {
            openMandatoryPaymentBucketPickerBtn.textContent = bucket.name;
          }

          mandatoryPaymentBucketPickerModal?.classList.add("hidden");
        });

        mandatoryPaymentBucketPickerList.appendChild(row);
      });
    }

    return {
      fillMandatoryPaymentAccountSelect,
      fillMandatoryPaymentSafeSelect,
      fillMandatoryPaymentCategorySelect,
      syncMandatoryPaymentLinkedSafeField,
      renderMandatoryPaymentBucketPicker,
    };
  }

  window.FinanceAppMandatoryPaymentDom = {
    create: createMandatoryPaymentDom,
  };
})();


;/* ===== js/14-mandatory-payment-render.js ===== */
(() => {
  function createMandatoryPaymentRender({
    state,
    mandatoryPaymentsList,
    mandatoryPaymentsMonthStrip,
    getSelectedMonth,
    setSelectedMonth,
    getMandatoryPaymentsMonthItems,
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentVisibleInMonth,
    isMandatoryPaymentPaidInMonth,
    getSafeBucketName,
    getSafeBucketBalance,
    roundToTwo,
    formatMoney,
    escapeHtml,
    bindMandatoryPaymentPress,
  }) {
    function getLinkedAccountName(item) {
      const accountId = item.linked_account_id || "";

      if (!accountId || !Array.isArray(state.accounts)) {
        return "";
      }

      const account = state.accounts.find((entry) => entry.id === accountId);

      return account?.name || "";
    }

    function getPaymentBindingText(item) {
      const linkedSafeName = item.linked_safe_bucket_id
        ? getSafeBucketName(item.linked_safe_bucket_id)
        : "";

      const linkedSafeBalance = item.linked_safe_bucket_id
        ? Math.max(0, roundToTwo(getSafeBucketBalance(item.linked_safe_bucket_id)))
        : 0;

      const covered = Math.min(Number(item.amount) || 0, linkedSafeBalance);

      if (item.linked_safe_bucket_id && linkedSafeName) {
        return `Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ: ${linkedSafeName} â¢ Ð¿Ð¾ÐºÑÑÑÐ¾ ${formatMoney(covered)}`;
      }

      const linkedAccountName = getLinkedAccountName(item);

      if (linkedAccountName) {
        return `ÑÑÑÑ: ${linkedAccountName}`;
      }

      return "Ð±ÐµÐ· Ð¿ÑÐ¸Ð²ÑÐ·ÐºÐ¸";
    }

    function renderMandatoryPaymentsMonthStrip() {
      if (!mandatoryPaymentsMonthStrip) return;

      const items = getMandatoryPaymentsMonthItems();

      mandatoryPaymentsMonthStrip.innerHTML = "";

      items.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `mandatory-payments-month-chip${
          item.key === getSelectedMonth() ? " is-active" : ""
        }`;

        button.innerHTML = `
          <span>${item.label}</span>
          ${item.isCurrent ? "<small>ÑÐµÐ¹ÑÐ°Ñ</small>" : ""}
        `;

        button.addEventListener("click", () => {
          setSelectedMonth(item.key);

          renderMandatoryPaymentsMonthStrip();
          renderMandatoryPaymentsModal();
        });

        mandatoryPaymentsMonthStrip.appendChild(button);
      });
    }

    function renderMandatoryPaymentsModal() {
      if (!mandatoryPaymentsList) return;

      mandatoryPaymentsList.innerHTML = "";

      if (!state.mandatoryPayments.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">ÐÐ»Ð°ÑÐµÐ¶ÐµÐ¹ Ð¿Ð¾ÐºÐ° Ð½ÐµÑ</h3>
            <p class="list-subtitle">ÐÐ¾Ð±Ð°Ð²Ñ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸ Ð½Ð¸Ð¶Ðµ</p>
          </div>
        `;
        mandatoryPaymentsList.appendChild(empty);
        return;
      }

      const currentMonthKey = getMandatoryPaymentsActiveMonthKey();

      const visiblePayments = state.mandatoryPayments.filter((item) =>
        isMandatoryPaymentVisibleInMonth(item, currentMonthKey)
      );

      if (!visiblePayments.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">ÐÐ»Ð°ÑÐµÐ¶ÐµÐ¹ Ð² ÑÑÐ¾Ð¼ Ð¼ÐµÑÑÑÐµ Ð½ÐµÑ</h3>
            <p class="list-subtitle">ÐÐ¾Ð±Ð°Ð²Ñ Ð¿Ð»Ð°ÑÑÐ¶ Ñ Ð´Ð°ÑÐ¾Ð¹ Ð² Ð²ÑÐ±ÑÐ°Ð½Ð½Ð¾Ð¼ Ð¼ÐµÑÑÑÐµ</p>
          </div>
        `;
        mandatoryPaymentsList.appendChild(empty);
        return;
      }

      visiblePayments
        .slice()
        .sort((a, b) => a.due_day - b.due_day)
        .forEach((item) => {
          const isPaid = isMandatoryPaymentPaidInMonth(item, currentMonthKey);
          const bindingText = getPaymentBindingText(item);

          const card = document.createElement("button");
          card.type = "button";
          card.className =
            `list-card list-card--clickable mandatory-payment-card${
              isPaid ? " mandatory-payment-card--paid" : ""
            }`;

                    card.dataset.mandatoryId = item.id;
          card.dataset.paymentId = item.id;
          card.dataset.mandatoryPaymentId = item.id;
          card.dataset.paid = String(isPaid);

          card.innerHTML = `
            <div class="mandatory-payment-card__progress"></div>

            <div class="list-body">
              <div class="list-title-row">
                <h3 class="list-title">${escapeHtml(item.title)}</h3>
              </div>
              <p class="list-subtitle">
                ${formatMoney(item.amount)} â¢ Ð´Ð¾ ${String(item.due_day).padStart(2, "0")} ÑÐ¸ÑÐ»Ð° â¢ ${escapeHtml(bindingText)}
              </p>
            </div>

            <div class="list-right mandatory-payment-card__status-wrap">
              <p class="mandatory-payment-card__status ${isPaid ? "is-paid" : "is-unpaid"}">
                ${isPaid ? "ÐÐ¿Ð»Ð°ÑÐµÐ½" : "ÐÐµ Ð¾Ð¿Ð»Ð°ÑÐµÐ½"}
              </p>
            </div>
          `;

          bindMandatoryPaymentPress(card, item);
          mandatoryPaymentsList.appendChild(card);
        });
    }

    return {
      renderMandatoryPaymentsMonthStrip,
      renderMandatoryPaymentsModal,
    };
  }

  window.FinanceAppMandatoryPaymentRender = {
    create: createMandatoryPaymentRender,
  };
})();


;/* ===== js/15-mandatory-payment-long-press.js ===== */
(() => {
  function createMandatoryPaymentLongPress({
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentPaidInMonth,
    toggleMandatoryPaymentPaid,
    openMandatoryPaymentEditor,
  }) {
    let mandatoryLongPressTimer = null;
    let mandatoryLongPressVisualTimer = null;
    let mandatoryPressStartX = 0;
    let mandatoryPressStartY = 0;
    let mandatoryPressMoved = false;
    let mandatoryLongPressTriggered = false;

    function stopNativeSelection() {
      if (!window.getSelection) return;

      const selection = window.getSelection();

      if (selection && selection.removeAllRanges) {
        selection.removeAllRanges();
      }
    }

    function startMandatoryPaymentLongPress(card, item, startX = 0, startY = 0) {
      if (!card || !item) return;

      const currentMonthKey = getMandatoryPaymentsActiveMonthKey();
      const isPaid = isMandatoryPaymentPaidInMonth(item, currentMonthKey);

      mandatoryLongPressTriggered = false;
      mandatoryPressMoved = false;
      mandatoryPressStartX = startX;
      mandatoryPressStartY = startY;

      card.classList.remove(
        "mandatory-payment-card--hold-pay",
        "mandatory-payment-card--hold-unpay"
      );

      window.clearTimeout(mandatoryLongPressVisualTimer);
      window.clearTimeout(mandatoryLongPressTimer);

      mandatoryLongPressVisualTimer = window.setTimeout(() => {
        if (mandatoryPressMoved) return;

        card.classList.add(
          isPaid
            ? "mandatory-payment-card--hold-unpay"
            : "mandatory-payment-card--hold-pay"
        );
      }, 200);

      mandatoryLongPressTimer = window.setTimeout(async () => {
        if (mandatoryPressMoved) return;

        mandatoryLongPressTriggered = true;
        await toggleMandatoryPaymentPaid(item.id);
      }, 1550);
    }

    function cancelMandatoryPaymentLongPress(card) {
      window.clearTimeout(mandatoryLongPressVisualTimer);
      window.clearTimeout(mandatoryLongPressTimer);

      mandatoryLongPressVisualTimer = null;
      mandatoryLongPressTimer = null;
      mandatoryPressMoved = false;

      if (card) {
        card.classList.remove(
          "mandatory-payment-card--hold-pay",
          "mandatory-payment-card--hold-unpay"
        );
      }
    }

    function bindMandatoryPaymentPress(card, item) {
      if (!card || !item) return;

      const cancelBecauseScroll = () => {
        mandatoryPressMoved = true;
        cancelMandatoryPaymentLongPress(card);
      };

      card.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });

      card.addEventListener("selectstart", (event) => {
        event.preventDefault();
      });

      card.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });

      card.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        stopNativeSelection();
        startMandatoryPaymentLongPress(card, item, event.clientX, event.clientY);
      });

      card.addEventListener("pointermove", (event) => {
        const dx = Math.abs(event.clientX - mandatoryPressStartX);
        const dy = Math.abs(event.clientY - mandatoryPressStartY);

        if (dx > 10 || dy > 10) {
          cancelBecauseScroll();
        }
      });

      card.addEventListener("pointerup", () => {
        stopNativeSelection();

        const triggered = mandatoryLongPressTriggered;
        const moved = mandatoryPressMoved;

        cancelMandatoryPaymentLongPress(card);

        if (!triggered && !moved) {
          openMandatoryPaymentEditor(item.id);
        }
      });

      card.addEventListener("pointerleave", () => {
        cancelBecauseScroll();
        stopNativeSelection();
      });

      card.addEventListener("pointercancel", () => {
        cancelBecauseScroll();
        stopNativeSelection();
      });
    }

    return {
      startMandatoryPaymentLongPress,
      cancelMandatoryPaymentLongPress,
      bindMandatoryPaymentPress,
    };
  }

  window.FinanceAppMandatoryPaymentLongPress = {
    create: createMandatoryPaymentLongPress,
  };
})();


;/* ===== js/16-mandatory-payment-crud.js ===== */
(() => {
  function createMandatoryPaymentCrud({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,
    roundToTwo,
    parseMoneyInputValue,
    getCurrentTime,
    getActiveMandatoryPaymentId,
    setActiveMandatoryPaymentId,
    getMandatoryPaymentsActiveMonthKey,
    getMandatoryPaymentPaidPeriods,
    isMandatoryPaymentPaidInMonth,
    setMandatoryPaymentPaidInMonth,
    buildMandatoryPaymentTransactionCreatedAt,
    getAccountById,
    isVaultAccountId,
    mandatoryPaymentTitleInput,
    mandatoryPaymentAmountInput,
    mandatoryPaymentDueDayInput,
    mandatoryPaymentCategorySelect,
    mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    onAfterTogglePaid,
    onAfterSave,
    onAfterDelete,
  }) {
    async function saveMandatoryPaymentsToMeta() {
      const { error } = await supabaseClient
        .from("app_meta")
        .upsert({
          key: "mandatory_payments",
          value: JSON.stringify(state.mandatoryPayments),
        });

      if (error) {
        alert(`ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶ÐµÐ¹: ${error.message || error}`);
        console.error(error);
        return false;
      }

      return true;
    }

    async function createMandatoryPaymentExpense(
      item,
      monthKey = getMandatoryPaymentsActiveMonthKey()
    ) {
      const accountId = item.linked_account_id || "";

      if (!accountId) {
        return true;
      }

      const account = getAccountById(accountId);

      if (!account) {
        return true;
      }

      if (isVaultAccountId(account.id) && !item.linked_safe_bucket_id) {
        alert("ÐÐ»Ñ ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ñ Ð¸Ð· Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹ Ð½ÑÐ¶Ð½Ð¾ Ð²ÑÐ±ÑÐ°ÑÑ ÐºÐ¾Ð½ÐºÑÐµÑÐ½Ð¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ");
        return false;
      }

      const transaction = {
        id: crypto.randomUUID(),
        type: "expense",
        title: item.title || "ÐÐ°Ð»ÐµÐ½Ð´Ð°ÑÐ½ÑÐ¹ Ð¿Ð»Ð°ÑÑÐ¶",
        amount: roundToTwo(Number(item.amount) || 0),

        account_id: account.id,
        account: account.name,

        category_id: item.category_id || UNCATEGORIZED_ID,

        from_account_id: null,
        to_account_id: null,
        from_account: null,
        to_account: null,

        from_safe_bucket_id: isVaultAccountId(account.id)
          ? item.linked_safe_bucket_id || null
          : null,
        to_safe_bucket_id: null,

        created_at: buildMandatoryPaymentTransactionCreatedAt(),
        time_label: getCurrentTime(),
      };

      const { error } = await supabaseClient
        .from("transactions")
        .insert(transaction);

      if (error) {
        alert(`ÐÑÐ¸Ð±ÐºÐ° ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ñ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð¾Ð³Ð¾ Ð¿Ð»Ð°ÑÐµÐ¶Ð°: ${error.message || error}`);
        console.error(error);
        return false;
      }

      return true;
    }

    async function toggleMandatoryPaymentPaid(paymentId) {
      const item = state.mandatoryPayments.find((entry) => entry.id === paymentId);
      if (!item) return false;

      const monthKey = getMandatoryPaymentsActiveMonthKey();
      const isPaid = isMandatoryPaymentPaidInMonth(item, monthKey);

      if (!isPaid) {
        const transactionOk = await createMandatoryPaymentExpense(item, monthKey);
        if (!transactionOk) return false;

        setMandatoryPaymentPaidInMonth(item, monthKey, true);
      } else {
        setMandatoryPaymentPaidInMonth(item, monthKey, false);
      }

      const ok = await saveMandatoryPaymentsToMeta();
      if (!ok) return false;

      await onAfterTogglePaid?.();

      return true;
    }

    async function saveMandatoryPayment() {
      const title = mandatoryPaymentTitleInput.value.trim();
      const amount = parseMoneyInputValue(mandatoryPaymentAmountInput.value);
      const dueDateValue = mandatoryPaymentDueDayInput.value;
      const categoryId = mandatoryPaymentCategorySelect?.value || "";
      const linkedAccountId = mandatoryPaymentAccountSelect?.value || "";
      const linkedSafeBucketId = mandatoryPaymentLinkedSafeSelect?.value || "";

      if (!title) {
        alert("ÐÐ²ÐµÐ´Ð¸ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¿Ð»Ð°ÑÐµÐ¶Ð°");
        return;
      }

      if (!amount || amount <= 0) {
        alert("ÐÐ²ÐµÐ´Ð¸ ÐºÐ¾ÑÑÐµÐºÑÐ½ÑÑ ÑÑÐ¼Ð¼Ñ");
        return;
      }

      if (!dueDateValue) {
        alert("ÐÑÐ±ÐµÑÐ¸ Ð´Ð°ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶Ð°");
        return;
      }

      if (!categoryId) {
        alert("ÐÑÐ±ÐµÑÐ¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ Ð¿Ð»Ð°ÑÐµÐ¶Ð°");
        return;
      }

      if (isVaultAccountId(linkedAccountId) && !linkedSafeBucketId) {
        alert("ÐÑÐ±ÐµÑÐ¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ");
        return;
      }

      const dueDay = new Date(`${dueDateValue}T00:00:00`).getDate();
      const duePeriod = String(dueDateValue).slice(0, 7);
      const activeMandatoryPaymentId = getActiveMandatoryPaymentId();

      if (activeMandatoryPaymentId) {
        const target = state.mandatoryPayments.find(
          (entry) => entry.id === activeMandatoryPaymentId
        );

        if (!target) return;

        target.title = title;
        target.amount = roundToTwo(amount);
        target.due_day = dueDay;
        target.start_period = duePeriod;
        target.paid_periods = getMandatoryPaymentPaidPeriods(target).filter(
          (period) => period >= duePeriod
        );
        target.last_paid_period =
          target.paid_periods[target.paid_periods.length - 1] || "";
        target.linked_account_id = linkedAccountId;
        target.linked_safe_bucket_id = linkedSafeBucketId;
        target.category_id = categoryId;
      } else {
        state.mandatoryPayments.push({
          id: crypto.randomUUID(),
          title,
          amount: roundToTwo(amount),
          due_day: dueDay,
          start_period: duePeriod,
          paid_periods: [],
          linked_account_id: linkedAccountId,
          linked_safe_bucket_id: linkedSafeBucketId,
          category_id: categoryId,
          enabled: true,
          last_paid_period: "",
        });
      }

      const ok = await saveMandatoryPaymentsToMeta();
      if (!ok) return;

      await onAfterSave?.();
    }

    async function deleteMandatoryPaymentFromEditor() {
      const activeMandatoryPaymentId = getActiveMandatoryPaymentId();
      if (!activeMandatoryPaymentId) return;

      const target = state.mandatoryPayments.find(
        (entry) => entry.id === activeMandatoryPaymentId
      );

      if (!target) return;

      const ok = confirm(`Ð£Ð´Ð°Ð»Ð¸ÑÑ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐ¹ Ð¿Ð»Ð°ÑÑÐ¶ "${target.title}"?`);
      if (!ok) return;

      state.mandatoryPayments = state.mandatoryPayments.filter(
        (entry) => entry.id !== activeMandatoryPaymentId
      );

      setActiveMandatoryPaymentId(null);

      const saved = await saveMandatoryPaymentsToMeta();
      if (!saved) return;

      await onAfterDelete?.();
    }

    return {
      saveMandatoryPaymentsToMeta,
      createMandatoryPaymentExpense,
      toggleMandatoryPaymentPaid,
      saveMandatoryPayment,
      deleteMandatoryPaymentFromEditor,
    };
  }

  window.FinanceAppMandatoryPaymentCrud = {
    create: createMandatoryPaymentCrud,
  };
})();


;/* ===== js/17-mandatory-payment-modal-flow.js ===== */
(() => {
  function ensureMandatoryPaymentEditorDom() {
    if (!document.body) return false;

    const calendarModal = document.getElementById("mandatoryPaymentsModal");

    if (!document.getElementById("mandatoryPaymentEditorModal")) {
      const editorHtml = `
        <div class="modal hidden" id="mandatoryPaymentEditorModal" role="dialog" aria-modal="true" aria-label="Ð ÐµÐ´Ð°ÐºÑÐ¾Ñ ÐºÐ°Ð»ÐµÐ½Ð´Ð°ÑÐ½Ð¾Ð³Ð¾ Ð¿Ð»Ð°ÑÐµÐ¶Ð°">
          <div class="modal-sheet">
            <div class="modal-handle"></div>

            <div class="section-head">
              <h2 class="modal-title" id="mandatoryPaymentEditorTitle">ÐÐ¾Ð²ÑÐ¹ Ð¿Ð»Ð°ÑÑÐ¶</h2>

              <button
                class="manager-back-btn"
                type="button"
                id="closeMandatoryPaymentEditorModalBtn"
              >
                ÐÐ°ÐºÑÑÑÑ
              </button>
            </div>

            <div class="manager-card">
              <div class="field">
                <input
                  class="input"
                  id="mandatoryPaymentTitleInput"
                  type="text"
                  placeholder="ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¿Ð»Ð°ÑÐµÐ¶Ð°"
                />
              </div>

              <div class="mandatory-payment-main-row">
                <div class="field mandatory-payment-main-row__field mandatory-payment-money-field">
                  <input
                    class="input mandatory-payment-money-input"
                    id="mandatoryPaymentAmountInput"
                    type="text"
                    inputmode="decimal"
                    placeholder="Ð¡ÑÐ¼Ð¼Ð°"
                  />
                  <span class="mandatory-payment-money-symbol">â½</span>
                </div>

                <div class="field mandatory-payment-main-row__field mandatory-payment-date-field">
                  <input
                    class="input"
                    id="mandatoryPaymentDueDayInput"
                    type="date"
                    required
                  />
                  <span class="mandatory-payment-date-placeholder">ÐÐ°ÑÐ° Ð¿Ð»Ð°ÑÐµÐ¶Ð°</span>
                </div>
              </div>

              <div class="field mandatory-payment-category-field">
                <select
                  class="select"
                  id="mandatoryPaymentCategorySelect"
                ></select>
              </div>

              <div class="field">
                <select
                  class="select"
                  id="mandatoryPaymentAccountSelect"
                ></select>
              </div>

              <div class="field hidden" id="mandatoryPaymentLinkedSafeField">
                <select
                  class="select hidden"
                  id="mandatoryPaymentLinkedSafeSelect"
                ></select>

                <button
                  class="mandatory-linked-safe-btn"
                  type="button"
                  id="openMandatoryPaymentBucketPickerBtn"
                >
                  ÐÑÐ±ÑÐ°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ
                </button>
              </div>

              <div class="modal-actions mandatory-editor-actions">
                <button
                  class="btn btn-primary"
                  type="button"
                  id="addMandatoryPaymentBtn"
                >
                  ÐÐ¾Ð±Ð°Ð²Ð¸ÑÑ Ð¿Ð»Ð°ÑÑÐ¶
                </button>

                <button
                  class="btn btn-danger hidden"
                  type="button"
                  id="deleteMandatoryPaymentBtn"
                >
                  Ð£Ð´Ð°Ð»Ð¸ÑÑ Ð¿Ð»Ð°ÑÑÐ¶
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      if (calendarModal) {
        calendarModal.insertAdjacentHTML("afterend", editorHtml);
      } else {
        document.body.insertAdjacentHTML("beforeend", editorHtml);
      }
    }

    if (!document.getElementById("mandatoryPaymentBucketPickerModal")) {
      const bucketPickerHtml = `
        <div class="modal hidden" id="mandatoryPaymentBucketPickerModal" role="dialog" aria-modal="true" aria-label="ÐÑÐ±Ð¾Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ">
          <div class="modal-sheet">
            <div class="modal-handle"></div>

            <div class="section-head">
              <h2 class="modal-title">ÐÑÐ±ÑÐ°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ</h2>

              <button
                class="manager-back-btn"
                type="button"
                id="closeMandatoryPaymentBucketPickerModalBtn"
              >
                ÐÐ°ÐºÑÑÑÑ
              </button>
            </div>

            <div class="list" id="mandatoryPaymentBucketPickerList"></div>
          </div>
        </div>
      `;

      const editorModal = document.getElementById("mandatoryPaymentEditorModal");

      if (editorModal) {
        editorModal.insertAdjacentHTML("afterend", bucketPickerHtml);
      } else if (calendarModal) {
        calendarModal.insertAdjacentHTML("afterend", bucketPickerHtml);
      } else {
        document.body.insertAdjacentHTML("beforeend", bucketPickerHtml);
      }
    }

    return true;
  }

  if (!ensureMandatoryPaymentEditorDom()) {
    document.addEventListener("DOMContentLoaded", ensureMandatoryPaymentEditorDom, {
      once: true,
    });
  }

  function createMandatoryPaymentModalFlow({
    state,
    getActiveMandatoryPaymentId,
    setActiveMandatoryPaymentId,
    getSelectedMonth,
    setSelectedMonth,
    getCurrentMonthValue,
    getMandatoryPaymentsActiveMonthKey,
    buildDateFromDueDay,
    getSafeBucketName,

    mandatoryPaymentsModal,
    openMandatoryPaymentsModalBtn,
    closeMandatoryPaymentsModalBtn,

    mandatoryPaymentEditorModal,
    openMandatoryPaymentEditorBtn,
    closeMandatoryPaymentEditorModalBtn,

    mandatoryPaymentBucketPickerModal,
    closeMandatoryPaymentBucketPickerModalBtn,

    mandatoryPaymentEditorTitle,
    mandatoryPaymentTitleInput,
    mandatoryPaymentAmountInput,
    mandatoryPaymentDueDayInput,
    mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    openMandatoryPaymentBucketPickerBtn,
    addMandatoryPaymentBtn,
    deleteMandatoryPaymentBtn,

    fillMandatoryPaymentAccountSelect,
    fillMandatoryPaymentSafeSelect,
    syncMandatoryPaymentLinkedSafeField,

    openAnimatedModal,
    closeAnimatedModal,

    renderMonthStrip,
    renderModal,
  }) {
    ensureMandatoryPaymentEditorDom();

    function getEl(id, fallback = null) {
      return document.getElementById(id) || fallback || null;
    }

    function getCalendarModal() {
      return getEl("mandatoryPaymentsModal", mandatoryPaymentsModal);
    }

    function getCalendarOpenBtn() {
      return getEl("openMandatoryPaymentsModalBtn", openMandatoryPaymentsModalBtn);
    }

    function getCalendarCloseBtn() {
      return getEl("closeMandatoryPaymentsModalBtn", closeMandatoryPaymentsModalBtn);
    }

    function getEditorModal() {
      return getEl("mandatoryPaymentEditorModal", mandatoryPaymentEditorModal);
    }

    function getEditorOpenBtn() {
      return getEl("openMandatoryPaymentEditorBtn", openMandatoryPaymentEditorBtn);
    }

    function getEditorCloseBtn() {
      return getEl("closeMandatoryPaymentEditorModalBtn", closeMandatoryPaymentEditorModalBtn);
    }

    function getBucketPickerModal() {
      return getEl("mandatoryPaymentBucketPickerModal", mandatoryPaymentBucketPickerModal);
    }

    function getBucketPickerCloseBtn() {
      return getEl("closeMandatoryPaymentBucketPickerModalBtn", closeMandatoryPaymentBucketPickerModalBtn);
    }

    function getTitleInput() {
      return getEl("mandatoryPaymentTitleInput", mandatoryPaymentTitleInput);
    }

    function getAmountInput() {
      return getEl("mandatoryPaymentAmountInput", mandatoryPaymentAmountInput);
    }

    function getDueDayInput() {
      return getEl("mandatoryPaymentDueDayInput", mandatoryPaymentDueDayInput);
    }

    function getAccountSelect() {
      return getEl("mandatoryPaymentAccountSelect", mandatoryPaymentAccountSelect);
    }

    function getLinkedSafeSelect() {
      return getEl("mandatoryPaymentLinkedSafeSelect", mandatoryPaymentLinkedSafeSelect);
    }

    function getEditorTitle() {
      return getEl("mandatoryPaymentEditorTitle", mandatoryPaymentEditorTitle);
    }

    function getSaveBtn() {
      return getEl("addMandatoryPaymentBtn", addMandatoryPaymentBtn);
    }

    function getDeleteBtn() {
      return getEl("deleteMandatoryPaymentBtn", deleteMandatoryPaymentBtn);
    }

    function getBucketPickerBtn() {
      return getEl("openMandatoryPaymentBucketPickerBtn", openMandatoryPaymentBucketPickerBtn);
    }

    function isModalOpen(modal) {
      return Boolean(
        modal &&
        !modal.classList.contains("hidden") &&
        !modal.classList.contains("is-closing")
      );
    }

    function forceUnlockBodyScroll() {
      window.FinanceAppModalCore?.forceUnlockBodyScroll?.();

      document.documentElement.classList.remove("modal-scroll-locked");
      document.body.classList.remove("modal-scroll-locked");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    }

    function closeModalIfOpen(modal) {
      if (!isModalOpen(modal)) return;
      closeAnimatedModal(modal);
    }

    function resetMandatoryPaymentForm() {
      setActiveMandatoryPaymentId(null);

      const titleInput = getTitleInput();
      const amountInput = getAmountInput();
      const dueDayInput = getDueDayInput();
      const accountSelect = getAccountSelect();
      const linkedSafeSelect = getLinkedSafeSelect();
      const editorTitle = getEditorTitle();
      const saveBtn = getSaveBtn();
      const deleteBtn = getDeleteBtn();
      const bucketPickerBtn = getBucketPickerBtn();

      if (titleInput) titleInput.value = "";
      if (amountInput) amountInput.value = "";
      if (dueDayInput) dueDayInput.value = "";
      if (accountSelect) accountSelect.value = "";
      if (linkedSafeSelect) linkedSafeSelect.value = "";

      fillMandatoryPaymentAccountSelect?.("");
      fillMandatoryPaymentSafeSelect?.("");

      if (editorTitle) {
        editorTitle.textContent = "ÐÐ¾Ð²ÑÐ¹ Ð¿Ð»Ð°ÑÑÐ¶";
      }

      if (saveBtn) {
        saveBtn.textContent = "ÐÐ¾Ð±Ð°Ð²Ð¸ÑÑ Ð¿Ð»Ð°ÑÑÐ¶";
      }

      if (bucketPickerBtn) {
        bucketPickerBtn.textContent = "ÐÑÐ±ÑÐ°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";
      }

      syncMandatoryPaymentLinkedSafeField?.();
      deleteBtn?.classList.add("hidden");
    }

    function openMandatoryPaymentEditorModal() {
      ensureMandatoryPaymentEditorDom();

      const editorModal = getEditorModal();

      if (!editorModal) {
        console.error("mandatoryPaymentEditorModal not found");
        return;
      }

      editorModal.classList.add("modal");
      openAnimatedModal(editorModal);
    }

    function closeMandatoryPaymentEditorModal() {
      closeModalIfOpen(getBucketPickerModal());
      closeModalIfOpen(getEditorModal());
      resetMandatoryPaymentForm();
    }

    function openNewMandatoryPaymentEditor() {
      resetMandatoryPaymentForm();
      openMandatoryPaymentEditorModal();
    }

    function openMandatoryPaymentEditor(paymentId) {
      const item = state.mandatoryPayments.find((entry) => {
        return String(entry.id) === String(paymentId);
      });

      if (!item) {
        console.error("Mandatory payment not found for edit:", paymentId);
        return;
      }

      setActiveMandatoryPaymentId(item.id);

      const titleInput = getTitleInput();
      const amountInput = getAmountInput();
      const dueDayInput = getDueDayInput();
      const accountSelect = getAccountSelect();
      const linkedSafeSelect = getLinkedSafeSelect();
      const editorTitle = getEditorTitle();
      const saveBtn = getSaveBtn();
      const deleteBtn = getDeleteBtn();
      const bucketPickerBtn = getBucketPickerBtn();

      if (titleInput) {
        titleInput.value = item.title || "";
      }

      if (amountInput) {
        amountInput.value = String(Number(item.amount) || 0).replace(".", ",");
      }

      if (dueDayInput) {
        dueDayInput.value = buildDateFromDueDay(
          item.due_day,
          item.start_period || getMandatoryPaymentsActiveMonthKey()
        );
      }

      fillMandatoryPaymentAccountSelect?.(item.linked_account_id || "");
      fillMandatoryPaymentSafeSelect?.(item.linked_safe_bucket_id || "");

      if (accountSelect) {
        accountSelect.value = item.linked_account_id || "";
      }

      if (linkedSafeSelect) {
        linkedSafeSelect.value = item.linked_safe_bucket_id || "";
      }

      syncMandatoryPaymentLinkedSafeField?.();

      if (bucketPickerBtn) {
        bucketPickerBtn.textContent =
          getSafeBucketName(item.linked_safe_bucket_id || "") || "ÐÑÐ±ÑÐ°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";
      }

      if (editorTitle) {
        editorTitle.textContent = "Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°Ð½Ð¸Ðµ Ð¿Ð»Ð°ÑÐµÐ¶Ð°";
      }

      if (saveBtn) {
        saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ Ð¿Ð»Ð°ÑÑÐ¶";
      }

      deleteBtn?.classList.remove("hidden");

      openMandatoryPaymentEditorModal();
    }

    function renderMandatoryPaymentsContent() {
      try {
        renderMonthStrip?.();
      } catch (error) {
        console.error("renderMandatoryPaymentsMonthStrip failed:", error);
      }

      try {
        renderModal?.();
      } catch (error) {
        console.error("renderMandatoryPaymentsModal failed:", error);
      }
    }

    function openMandatoryPaymentsModal() {
      const modal = getCalendarModal();

      if (!modal) {
        console.error("mandatoryPaymentsModal not found");
        forceUnlockBodyScroll();
        return;
      }

      modal.classList.add("modal");

      setSelectedMonth(getSelectedMonth() || getCurrentMonthValue());
      renderMandatoryPaymentsContent();
      bindPaymentCardEditOpen();

      openAnimatedModal(modal);
    }

    function closeMandatoryPaymentsModal() {
      closeModalIfOpen(getBucketPickerModal());
      closeModalIfOpen(getEditorModal());
      closeModalIfOpen(getCalendarModal());

      resetMandatoryPaymentForm();
    }

    function bindButton(button, key, handler) {
      if (!button) return;

      const flag = `mandatoryPaymentFlowBound${key}`;
      if (button.dataset[flag] === "true") return;

      button.dataset[flag] = "true";

      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        handler();
      }, true);
    }

    function bindMandatoryPaymentFlowButtons() {
      bindButton(getCalendarOpenBtn(), "OpenCalendar", openMandatoryPaymentsModal);
      bindButton(getCalendarCloseBtn(), "CloseCalendar", closeMandatoryPaymentsModal);
      bindButton(getEditorOpenBtn(), "OpenEditor", openNewMandatoryPaymentEditor);
      bindButton(getEditorCloseBtn(), "CloseEditor", closeMandatoryPaymentEditorModal);

      bindButton(
        getBucketPickerCloseBtn(),
        "CloseBucketPicker",
        () => closeModalIfOpen(getBucketPickerModal())
      );
    }

    function bindModalBackdropClose() {
      const modal = getCalendarModal();
      if (!modal) return;

      if (modal.dataset.mandatoryBackdropBound === "true") return;
      modal.dataset.mandatoryBackdropBound = "true";

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeMandatoryPaymentsModal();
        }
      });
    }

    function bindPaymentCardEditOpen() {
      const list = document.getElementById("mandatoryPaymentsList");
      if (!list) return;

      if (list.dataset.mandatoryEditBound === "true") return;
      list.dataset.mandatoryEditBound = "true";

      list.addEventListener("click", (event) => {
        const card = event.target.closest(
          "[data-payment-id], [data-id], [data-mandatory-id], [data-mandatory-payment-id], .mandatory-payment-card"
        );

        if (!card || !list.contains(card)) return;

        const paymentId =
          card.dataset.paymentId ||
          card.dataset.mandatoryId ||
          card.dataset.id ||
          card.dataset.mandatoryPaymentId;

        if (!paymentId) {
          console.error("Mandatory payment card has no id dataset:", card);
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        openMandatoryPaymentEditor(paymentId);
      }, true);
    }

    bindMandatoryPaymentFlowButtons();
    bindModalBackdropClose();
    bindPaymentCardEditOpen();

    return {
      resetMandatoryPaymentForm,
      openMandatoryPaymentEditorModal,
      closeMandatoryPaymentEditorModal,
      openNewMandatoryPaymentEditor,
      openMandatoryPaymentEditor,
      closeMandatoryPaymentsModal,
      openMandatoryPaymentsModal,
    };
  }

  window.FinanceAppMandatoryPaymentModalFlow = {
    create: createMandatoryPaymentModalFlow,
  };
})();


;/* ===== js/18-native-picker.js ===== */
(() => {
  function setNativePickerVisibility(input, visible) {
    if (!input) return;

    if (visible) {
      input.classList.remove("hidden");
      input.style.display = "block";
      input.style.width = "100%";
      input.style.minWidth = "0";
      input.style.maxWidth = "100%";
      input.style.height = "48px";
      input.style.padding = "0 16px";
      input.style.border = "1px solid rgba(255,255,255,0.08)";
      input.style.borderRadius = "18px";
      input.style.background = "rgba(255,255,255,0.06)";
      input.style.color = "#f3f4f8";
      input.style.opacity = "1";
      input.style.pointerEvents = "auto";
      input.style.position = "static";
      input.style.left = "auto";
    } else {
      input.classList.add("hidden");
      input.style.display = "";
      input.style.width = "";
      input.style.minWidth = "";
      input.style.maxWidth = "";
      input.style.height = "";
      input.style.padding = "";
      input.style.border = "";
      input.style.borderRadius = "";
      input.style.background = "";
      input.style.color = "";
      input.style.opacity = "";
      input.style.pointerEvents = "";
      input.style.position = "";
      input.style.left = "";
    }
  }

  function openNativePicker(input) {
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  }

  window.FinanceAppNativePicker = {
    setNativePickerVisibility,
    openNativePicker,
  };
})();



;/* ===== js/19-analytics-month-wheel.js ===== */
(() => {
  function createAnalyticsMonthWheel({
    analyticsMonthWheelWrap,
    analyticsMonthNamesColumn,
    analyticsMonthYearsColumn,
    getCurrentMonthValue,
    getRussianMonthNames,
    getSelectedMonth,
    setSelectedMonth,
    setFilterPeriod,
    renderAnalytics,
  }) {
    let analyticsDraftMonth = "";
    let analyticsDraftYear = "";
    let isAnalyticsMonthWheelOpen = false;

    let analyticsMonthScrollTimer = null;
    let analyticsYearScrollTimer = null;

    const boundWheelColumns = new WeakSet();

    function setAnalyticsDraftMonthFromValue(monthValue) {
      const safeValue = monthValue || getCurrentMonthValue();
      const [year, month] = safeValue.split("-");

      analyticsDraftYear = year;
      analyticsDraftMonth = month;
    }

    function getAnalyticsDraftMonthValue() {
      return `${analyticsDraftYear}-${analyticsDraftMonth}`;
    }

    function getAnalyticsWheelYears() {
      const currentYear = new Date().getFullYear();
      const years = [];

      for (let year = currentYear - 3; year <= currentYear + 4; year += 1) {
        years.push(String(year));
      }

      return years;
    }

    function buildWheelColumnItems(items, activeValue, dataAttr) {
      const spacer = `<div class="month-wheel__item month-wheel__item--spacer"></div>`;

      const content = items
        .map((item) => {
          const value = typeof item === "string" ? item : item.value;
          const label = typeof item === "string" ? item : item.label;
          const activeClass = value === activeValue ? " is-active" : "";

          return `
            <button
              class="month-wheel__item${activeClass}"
              type="button"
              ${dataAttr}="${value}"
            >
              ${label}
            </button>
          `;
        })
        .join("");

      return `${spacer}${spacer}${content}${spacer}${spacer}`;
    }

    function syncWheelColumnPosition(container, activeSelector) {
      if (!container) return;

      const activeEl = container.querySelector(activeSelector);
      if (!activeEl) return;

      const top =
        activeEl.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

      container.scrollTo({ top, behavior: "auto" });
    }

    function getCenteredWheelValue(container, attrName) {
      if (!container) return null;

      const items = [...container.querySelectorAll(`.month-wheel__item[${attrName}]`)];
      if (!items.length) return null;

      const containerCenter = container.scrollTop + container.clientHeight / 2;

      let closest = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const itemCenter = item.offsetTop + item.offsetHeight / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closest = item;
        }
      });

      return closest?.getAttribute(attrName) || null;
    }

    function setWheelActiveState(container, attrName, activeValue) {
      if (!container) return;

      container.querySelectorAll(`.month-wheel__item[${attrName}]`).forEach((item) => {
        item.classList.toggle("is-active", item.getAttribute(attrName) === activeValue);
      });
    }

    function snapWheelToValue(container, attrName, value, behavior = "smooth") {
      if (!container || !value) return;

      const activeEl = container.querySelector(`.month-wheel__item[${attrName}="${value}"]`);
      if (!activeEl) return;

      const top =
        activeEl.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

      container.scrollTo({ top, behavior });
    }

    function bindWheelScroll(container, attrName, onChange) {
      if (!container) return;

      if (boundWheelColumns.has(container)) return;
      boundWheelColumns.add(container);

      container.addEventListener(
        "scroll",
        () => {
          const isMonthColumn = attrName === "data-wheel-month";

          if (isMonthColumn) {
            window.clearTimeout(analyticsMonthScrollTimer);
          } else {
            window.clearTimeout(analyticsYearScrollTimer);
          }

          const centeredValue = getCenteredWheelValue(container, attrName);

          if (centeredValue) {
            onChange(centeredValue);
            setWheelActiveState(container, attrName, centeredValue);
          }

          const timer = window.setTimeout(() => {
            const finalValue = getCenteredWheelValue(container, attrName);
            if (!finalValue) return;

            onChange(finalValue);
            setWheelActiveState(container, attrName, finalValue);
            snapWheelToValue(container, attrName, finalValue, "smooth");
          }, 90);

          if (isMonthColumn) {
            analyticsMonthScrollTimer = timer;
          } else {
            analyticsYearScrollTimer = timer;
          }
        },
        { passive: true }
      );
    }

    function updateAnalyticsWheelDraftFromScroll() {
      const nextMonth = getCenteredWheelValue(
        analyticsMonthNamesColumn,
        "data-wheel-month"
      );

      const nextYear = getCenteredWheelValue(
        analyticsMonthYearsColumn,
        "data-wheel-year"
      );

      if (nextMonth) analyticsDraftMonth = nextMonth;
      if (nextYear) analyticsDraftYear = nextYear;

      renderAnalyticsMonthWheel();
    }

    function renderAnalyticsMonthWheel() {
      if (!analyticsMonthNamesColumn || !analyticsMonthYearsColumn) return;

      const monthNames = getRussianMonthNames().map((label, index) => ({
        value: String(index + 1).padStart(2, "0"),
        label,
      }));

      const years = getAnalyticsWheelYears().map((year) => ({
        value: year,
        label: year,
      }));

      analyticsMonthNamesColumn.innerHTML = buildWheelColumnItems(
        monthNames,
        analyticsDraftMonth,
        "data-wheel-month"
      );

      analyticsMonthYearsColumn.innerHTML = buildWheelColumnItems(
        years,
        analyticsDraftYear,
        "data-wheel-year"
      );

      analyticsMonthNamesColumn.querySelectorAll("[data-wheel-month]").forEach((btn) => {
        btn.addEventListener("click", () => {
          analyticsDraftMonth = btn.dataset.wheelMonth;

          setWheelActiveState(
            analyticsMonthNamesColumn,
            "data-wheel-month",
            analyticsDraftMonth
          );

          snapWheelToValue(
            analyticsMonthNamesColumn,
            "data-wheel-month",
            analyticsDraftMonth,
            "smooth"
          );
        });
      });

      analyticsMonthYearsColumn.querySelectorAll("[data-wheel-year]").forEach((btn) => {
        btn.addEventListener("click", () => {
          analyticsDraftYear = btn.dataset.wheelYear;

          setWheelActiveState(
            analyticsMonthYearsColumn,
            "data-wheel-year",
            analyticsDraftYear
          );

          snapWheelToValue(
            analyticsMonthYearsColumn,
            "data-wheel-year",
            analyticsDraftYear,
            "smooth"
          );
        });
      });

      bindWheelScroll(analyticsMonthNamesColumn, "data-wheel-month", (value) => {
        analyticsDraftMonth = value;
      });

      bindWheelScroll(analyticsMonthYearsColumn, "data-wheel-year", (value) => {
        analyticsDraftYear = value;
      });

      requestAnimationFrame(() => {
        setWheelActiveState(
          analyticsMonthNamesColumn,
          "data-wheel-month",
          analyticsDraftMonth
        );

        setWheelActiveState(
          analyticsMonthYearsColumn,
          "data-wheel-year",
          analyticsDraftYear
        );

        snapWheelToValue(
          analyticsMonthNamesColumn,
          "data-wheel-month",
          analyticsDraftMonth,
          "auto"
        );

        snapWheelToValue(
          analyticsMonthYearsColumn,
          "data-wheel-year",
          analyticsDraftYear,
          "auto"
        );
      });
    }

    function openAnalyticsMonthWheel() {
      setAnalyticsDraftMonthFromValue(getSelectedMonth());

      isAnalyticsMonthWheelOpen = true;
      analyticsMonthWheelWrap?.classList.remove("hidden");

      if (
        !analyticsMonthNamesColumn?.children.length ||
        !analyticsMonthYearsColumn?.children.length
      ) {
        renderAnalyticsMonthWheel();
        return;
      }

      setWheelActiveState(
        analyticsMonthNamesColumn,
        "data-wheel-month",
        analyticsDraftMonth
      );

      setWheelActiveState(
        analyticsMonthYearsColumn,
        "data-wheel-year",
        analyticsDraftYear
      );

      requestAnimationFrame(() => {
        snapWheelToValue(
          analyticsMonthNamesColumn,
          "data-wheel-month",
          analyticsDraftMonth,
          "auto"
        );

        snapWheelToValue(
          analyticsMonthYearsColumn,
          "data-wheel-year",
          analyticsDraftYear,
          "auto"
        );
      });
    }

    function closeAnalyticsMonthWheel() {
      isAnalyticsMonthWheelOpen = false;
      analyticsMonthWheelWrap?.classList.add("hidden");
    }

    function applyAnalyticsMonthWheel() {
      if (!analyticsDraftYear || !analyticsDraftMonth) {
        setAnalyticsDraftMonthFromValue(getSelectedMonth() || getCurrentMonthValue());
      }

      setSelectedMonth(getAnalyticsDraftMonthValue());
      setFilterPeriod("month");

      closeAnalyticsMonthWheel();
      renderAnalytics();
    }

    function resetAnalyticsMonthWheel() {
      setAnalyticsDraftMonthFromValue(getCurrentMonthValue());
      renderAnalyticsMonthWheel();
    }

    function getAnalyticsMonthWheelOpen() {
      return isAnalyticsMonthWheelOpen;
    }

    return {
      setAnalyticsDraftMonthFromValue,
      getAnalyticsDraftMonthValue,
      getAnalyticsWheelYears,
      buildWheelColumnItems,
      syncWheelColumnPosition,
      getCenteredWheelValue,
      setWheelActiveState,
      snapWheelToValue,
      bindWheelScroll,
      updateAnalyticsWheelDraftFromScroll,
      renderAnalyticsMonthWheel,
      openAnalyticsMonthWheel,
      closeAnalyticsMonthWheel,
      applyAnalyticsMonthWheel,
      resetAnalyticsMonthWheel,
      getAnalyticsMonthWheelOpen,
    };
  }

  window.FinanceAppAnalyticsMonthWheel = {
    create: createAnalyticsMonthWheel,
  };
})();



;/* ===== js/20-analytics-filters.js ===== */
(() => {
  function createAnalyticsFilters({
    analyticsFiltersModal,
    openAnimatedModal,
    closeAnimatedModal,
    closeAnalyticsMonthWheel,

    getFilterPeriod,
    getSelectedMonth,
    getRangeStart,
    getRangeEnd,

    formatMonthLabel,
    formatDateRangeLabel,
  }) {
    function openAnalyticsFiltersModal() {
      openAnimatedModal(analyticsFiltersModal);
      document.body.style.overflow = "hidden";
    }

    function closeAnalyticsFiltersModal() {
      closeAnimatedModal(analyticsFiltersModal);
      closeAnalyticsMonthWheel();
    }

    function getAnalyticsPeriodLabel() {
      const analyticsFilterPeriod = getFilterPeriod();

      if (analyticsFilterPeriod === "month") {
        return formatMonthLabel(getSelectedMonth());
      }

      if (analyticsFilterPeriod === "today") {
        return "ÑÐµÐ³Ð¾Ð´Ð½Ñ";
      }

      if (analyticsFilterPeriod === "7") {
        return "Ð·Ð° 7 Ð´Ð½ÐµÐ¹";
      }

      if (analyticsFilterPeriod === "range") {
        return formatDateRangeLabel(getRangeStart(), getRangeEnd());
      }

      return "";
    }

    return {
      openAnalyticsFiltersModal,
      closeAnalyticsFiltersModal,
      getAnalyticsPeriodLabel,
    };
  }

  window.FinanceAppAnalyticsFilters = {
    create: createAnalyticsFilters,
  };
})();



;/* ===== js/21-operations-view.js ===== */
(() => {
  function createOperationsView({
    state,
    operationsTransactionsList,

    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,

    setActiveNav,
    createTransactionCard,
  }) {
    function renderOperationsView() {
      if (!operationsTransactionsList) return;

      const items = [...state.transactions].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      operationsTransactionsList.innerHTML = "";

      if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">ÐÐ¿ÐµÑÐ°ÑÐ¸Ð¹ Ð¿Ð¾ÐºÐ° Ð½ÐµÑ</h3>
            <p class="list-subtitle">ÐÑÑÐ¾ÑÐ¸Ñ Ð¿Ð¾ÑÐ²Ð¸ÑÑÑ Ð¿Ð¾ÑÐ»Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹</p>
          </div>
        `;
        operationsTransactionsList.appendChild(empty);
        return;
      }

      items.forEach((item) => {
        operationsTransactionsList.appendChild(createTransactionCard(item));
      });
    }

    function showOperationsView() {
      document.querySelector(".app")?.classList.add("app--analytics");

      mainView.classList.add("hidden");
      categoriesManagerView.classList.add("hidden");
      analyticsView.classList.add("hidden");
      operationsView.classList.remove("hidden");

      setActiveNav("operations");
      renderOperationsView();
    }

    return {
      renderOperationsView,
      showOperationsView,
    };
  }

  window.FinanceAppOperationsView = {
    create: createOperationsView,
  };
})();



;/* ===== js/22-navigation-view.js ===== */
(() => {
  function createNavigationView({
    navWalletBtn,
    navAnalyticsBtn,
    navOperationsBtn,

    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,

    closeAnalyticsMonthWheel,
    renderAnalytics,
  }) {
    function setActiveNav(next) {
      navWalletBtn?.classList.toggle("is-active", next === "wallet");
      navAnalyticsBtn?.classList.toggle("is-active", next === "analytics");
      navOperationsBtn?.classList.toggle("is-active", next === "operations");
    }

    function showWalletView() {
      document.querySelector(".app")?.classList.remove("app--analytics");

      mainView?.classList.remove("hidden");
      categoriesManagerView?.classList.add("hidden");
      analyticsView?.classList.add("hidden");
      operationsView?.classList.add("hidden");

      closeAnalyticsMonthWheel();
      setActiveNav("wallet");
    }

    function openCategoriesManager() {
      document.querySelector(".app")?.classList.remove("app--analytics");

      mainView?.classList.add("hidden");
      categoriesManagerView?.classList.remove("hidden");
      analyticsView?.classList.add("hidden");
      operationsView?.classList.add("hidden");

      closeAnalyticsMonthWheel();
      setActiveNav("wallet");
    }

    function closeCategoriesManager() {
      showWalletView();
    }

    function showAnalyticsView() {
      document.querySelector(".app")?.classList.add("app--analytics");

      mainView?.classList.add("hidden");
      categoriesManagerView?.classList.add("hidden");
      operationsView?.classList.add("hidden");
      analyticsView?.classList.remove("hidden");

      setActiveNav("analytics");
      renderAnalytics();
    }

    return {
      setActiveNav,
      showWalletView,
      openCategoriesManager,
      closeCategoriesManager,
      showAnalyticsView,
    };
  }

  window.FinanceAppNavigationView = {
    create: createNavigationView,
  };
})();



;/* ===== js/23-form-selects.js ===== */
(() => {
  function createFormSelects({
    state,
    UNCATEGORIZED_ID,
    categorySelect,
  }) {
    function ensureUncategorizedCategory() {
      const exists = state.categories.some((item) => item.id === UNCATEGORIZED_ID);

      if (!exists) {
        state.categories.unshift({
          id: UNCATEGORIZED_ID,
          name: "ÐÐµÐ· ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸",
          icon: "ð¦",
          locked: true,
          is_required: false,
          sort_order: 1,
        });
      }
    }

    function fillExpenseCategorySelect(selectedId = "") {
      if (!categorySelect) return;

      categorySelect.innerHTML = `<option value="">ÐÑÐ±ÐµÑÐ¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ</option>`;

      state.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;

        if (selectedId && selectedId === category.id) {
          option.selected = true;
        }

        categorySelect.appendChild(option);
      });
    }

    function fillAccountSelect(selectEl, placeholder, selectedValue = "", options = {}) {
      if (!selectEl) return;

      const {
        includeVault = true,
        includeProtected = true,
        excludeId = "",
      } = options;

      selectEl.innerHTML = `<option value="">${placeholder}</option>`;

      state.accounts.forEach((account) => {
        if (!includeVault && account.account_kind === "vault_pool") return;
        if (!includeProtected && account.is_protected) return;
        if (excludeId && account.id === excludeId) return;

        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;

        if (selectedValue && selectedValue === account.id) {
          option.selected = true;
        }

        selectEl.appendChild(option);
      });
    }

    return {
      ensureUncategorizedCategory,
      fillExpenseCategorySelect,
      fillAccountSelect,
    };
  }

  window.FinanceAppFormSelects = {
    create: createFormSelects,
  };
})();



;/* ===== js/24-transaction-card.js ===== */
(() => {
  function createTransactionCardModule({
    UNCATEGORIZED_ID,
    getAccountNameById,
    isVaultAccountId,
    getSafeBucketName,
    getCategoryName,
    formatMoney,
    formatDateShort,
    escapeHtml,
    openEditModal,
  }) {
    function looksLikeBrokenEncoding(value) {
      const text = String(value || "");

      return (
        /[\u0110\u00d0\u00d1\u0143\ufffd]/.test(text) ||
        text.includes("\u00e2") ||
        text.includes("\u00f0") ||
        text.includes("\u00f1")
      );
    }

    function getSafeText(value, fallback = "") {
      const text = String(value || "").trim();

      if (!text) return fallback;

      return looksLikeBrokenEncoding(text) ? fallback : text;
    }

    function getTransactionTitle(transaction) {
      const rawTitle = String(transaction?.title || "").trim();

      if (!rawTitle) {
        return "ÐÐ¿ÐµÑÐ°ÑÐ¸Ñ";
      }

      /*
        Ð¡ÑÐ°ÑÑÐµ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸ Ð¿ÑÐ¾ÑÐµÐ½ÑÐ¾Ð² ÑÐ¶Ðµ Ð¼Ð¾Ð³Ð»Ð¸ Ð¿Ð¾Ð¿Ð°ÑÑÑ Ð² Supabase
        Ñ Ð±Ð¸ÑÐ¾Ð¹ ÐºÐ¾Ð´Ð¸ÑÐ¾Ð²ÐºÐ¾Ð¹. ÐÐ°Ð·Ñ ÑÑÑ Ð½Ðµ ÑÑÐ¾Ð³Ð°ÐµÐ¼, Ð½Ð¾ Ð²ÑÐ²Ð¾Ð´Ð¸Ð¼ Ð½Ð¾ÑÐ¼Ð°Ð»ÑÐ½Ð¾.
      */
      if (looksLikeBrokenEncoding(rawTitle)) {
        if (
          transaction.type === "income" &&
          isVaultAccountId(transaction.account_id)
        ) {
          return "ÐÑÐ¾ÑÐµÐ½ÑÑ Ð¿Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ";
        }

        return "ÐÐ¿ÐµÑÐ°ÑÐ¸Ñ";
      }

      return rawTitle;
    }

    function getSafeBucketLabel(bucketId) {
      return getSafeText(getSafeBucketName(bucketId), "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ");
    }

    function getSafeAccountLabel(accountId, legacyName = "") {
      return getSafeText(
        getAccountNameById(accountId) || legacyName,
        "Ð¡ÑÑÑ"
      );
    }

    function getTransactionIconSvg(transaction) {
      if (transaction.type === "income") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 7 7 17" />
            <path d="M7 9v8h8" />
          </svg>
        `;
      }

      if (transaction.type === "transfer") {
        return `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M10 7h7v7" />
          </svg>
        `;
      }

      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M9 7h8v8" />
        </svg>
      `;
    }

    function getTransactionTypeClass(transaction) {
      if (transaction.type === "income") return "transaction-card--income";
      if (transaction.type === "transfer") return "transaction-card--transfer";
      return "transaction-card--expense";
    }

    function createTransactionCard(transaction) {
      const card = document.createElement("div");

      card.className =
        `list-card list-card--clickable transaction-card ${getTransactionTypeClass(transaction)}`;
      card.dataset.transactionId = transaction.id;

      let subtitle = "";
      let signedAmount = "";
      let valueClass = "list-value";

      if (transaction.type === "transfer") {
        const fromAccountName = getSafeAccountLabel(
          transaction.from_account_id,
          transaction.from_account
        );

        const toAccountName = getSafeAccountLabel(
          transaction.to_account_id,
          transaction.to_account
        );

        const fromLabel = isVaultAccountId(transaction.from_account_id)
          ? `${fromAccountName} â¢ ${getSafeBucketLabel(transaction.from_safe_bucket_id)}`
          : fromAccountName;

        const toLabel = isVaultAccountId(transaction.to_account_id)
          ? `${toAccountName} â¢ ${getSafeBucketLabel(transaction.to_safe_bucket_id)}`
          : toAccountName;

        subtitle = `${fromLabel} â ${toLabel}`;
        signedAmount = formatMoney(transaction.amount);
        valueClass = "list-value list-value--transfer";
      } else if (transaction.type === "income") {
        const incomeAccountName = getSafeAccountLabel(
          transaction.account_id,
          transaction.account
        );

        const incomeBucketLabel =
          isVaultAccountId(transaction.account_id) && transaction.to_safe_bucket_id
            ? ` â¢ ${getSafeBucketLabel(transaction.to_safe_bucket_id)}`
            : "";

        subtitle = `${incomeAccountName}${incomeBucketLabel} â¢ Ð´Ð¾ÑÐ¾Ð´`;
        signedAmount = `+${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--green";
      } else {
        const expenseAccountName = getSafeAccountLabel(
          transaction.account_id,
          transaction.account
        );

        const categoryName = getSafeText(
          getCategoryName(transaction.category_id || UNCATEGORIZED_ID),
          "ÐÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ"
        );

        subtitle = `${categoryName} â¢ ${expenseAccountName}`;
        signedAmount = `â${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--red";
      }

      const shortDate = formatDateShort(transaction.created_at);
      const timeLabel = transaction.time_label || "";
      const caption = `${shortDate}${shortDate && timeLabel ? " â¢ " : ""}${timeLabel}`;
      const title = getTransactionTitle(transaction);

      card.innerHTML = `
        <div class="transaction-icon" aria-hidden="true">
          ${getTransactionIconSvg(transaction)}
        </div>

        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(title)}</h3>
          </div>
          <p class="list-subtitle">${escapeHtml(subtitle)}</p>
        </div>

        <div class="list-right">
          <p class="${valueClass}">${escapeHtml(signedAmount)}</p>
          <div class="list-caption">${escapeHtml(caption)}</div>
        </div>
      `;

      card.addEventListener("click", () => openEditModal(transaction.id));

      return card;
    }

    return {
      createTransactionCard,
    };
  }

  window.FinanceAppTransactionCard = {
    create: createTransactionCardModule,
  };
})();


;/* ===== js/25-transaction-list-animation.js ===== */
(() => {
  function captureTransactionRects(container, excludeTransactionId = "") {
    const rects = new Map();

    if (!container) return rects;

    const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

    cards.forEach((card) => {
      if (excludeTransactionId && card.dataset.transactionId === excludeTransactionId) {
        return;
      }

      rects.set(card.dataset.transactionId, card.getBoundingClientRect());
    });

    return rects;
  }

  function playTransactionListFLIP(container, beforeRects) {
    if (!container || !beforeRects?.size) return;

    const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

    cards.forEach((card) => {
      const id = card.dataset.transactionId;
      const prevRect = beforeRects.get(id);

      if (!prevRect) return;

      const nextRect = card.getBoundingClientRect();
      const deltaY = prevRect.top - nextRect.top;

      if (Math.abs(deltaY) < 0.5) return;

      card.classList.remove("list-card--reflow");
      card.style.transition = "none";
      card.style.transform = `translate3d(0, ${deltaY}px, 0)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add("list-card--reflow");
          card.style.transition = "";
          card.style.transform = "";

          const cleanup = () => {
            card.classList.remove("list-card--reflow");
            card.removeEventListener("transitionend", cleanup);
          };

          card.addEventListener("transitionend", cleanup, { once: true });
        });
      });
    });
  }

  function animateTransactionDelete(transactionId) {
    return new Promise((resolve) => {
      if (!transactionId) {
        resolve();
        return;
      }

      const cards = [
        ...document.querySelectorAll(`[data-transaction-id="${transactionId}"]`),
      ];

      if (!cards.length) {
        resolve();
        return;
      }

      const containers = new Map();

      cards.forEach((card) => {
        const container = card.parentElement;
        if (!container) return;

        if (!containers.has(container)) {
          containers.set(container, captureTransactionRects(container, transactionId));
        }

        card.classList.add("list-card--delete-telegram");
      });

      window.setTimeout(() => {
        cards.forEach((card) => {
          card.remove();
        });

        containers.forEach((beforeRects, container) => {
          playTransactionListFLIP(container, beforeRects);
        });

        window.setTimeout(() => {
          resolve();
        }, 480);
      }, 520);
    });
  }

  window.FinanceAppTransactionListAnimation = {
    captureTransactionRects,
    playTransactionListFLIP,
    animateTransactionDelete,
  };
})();



;/* ===== js/26-transactions-render.js ===== */
(() => {
  function createTransactionsRender({
    state,
    transactionsListEl,
    sortTransactionsByLatest,
    createTransactionCard,
    getJustCreatedTransactionId,
    setJustCreatedTransactionId,
  }) {
    function renderTransactions() {
      if (!transactionsListEl) return;

      transactionsListEl.innerHTML = "";

      const latestTransactions = sortTransactionsByLatest(state.transactions).slice(0, 5);

      if (latestTransactions.length === 0) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">ÐÐ¿ÐµÑÐ°ÑÐ¸Ð¹ Ð¿Ð¾ÐºÐ° Ð½ÐµÑ</h3>
            <p class="list-subtitle">ÐÐ¾Ð±Ð°Ð²Ñ Ð¿ÐµÑÐ²ÑÑ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ñ ÑÐµÑÐµÐ· ÐºÐ½Ð¾Ð¿ÐºÐ¸ ÑÐ²ÐµÑÑÑ</p>
          </div>
        `;

        transactionsListEl.appendChild(empty);
        return;
      }

      let freshCard = null;
      const justCreatedTransactionId = getJustCreatedTransactionId();

      latestTransactions.forEach((transaction) => {
        const card = createTransactionCard(transaction);

        if (
          !freshCard &&
          justCreatedTransactionId &&
          transaction.id === justCreatedTransactionId
        ) {
          card.classList.add("list-card--fresh-sticker");
          freshCard = card;
        }

        transactionsListEl.appendChild(card);
      });

      if (freshCard) {
        window.setTimeout(() => {
          freshCard?.classList.remove("list-card--fresh-sticker");
          setJustCreatedTransactionId(null);
        }, 2200);
      } else if (justCreatedTransactionId) {
        setJustCreatedTransactionId(null);
      }
    }

    return {
      renderTransactions,
    };
  }

  window.FinanceAppTransactionsRender = {
    create: createTransactionsRender,
  };
})();



;/* ===== js/27-analytics-tabs-render.js ===== */
(() => {
  function createAnalyticsTabsRender({
    analyticsOverviewSection,
    analyticsExpensesSection,
    analyticsSafesSection,

    analyticsTabOverviewBtn,
    analyticsTabExpensesBtn,
    analyticsTabSafesBtn,

    getAnalyticsTab,
    setAnalyticsTabValue,

    renderAnalyticsOverview,
    renderAnalyticsExpensesByCategory,
    renderAnalyticsSafes,
  }) {
    function normalizeAnalyticsTab(tab) {
      return tab === "safes" ? "safes" : "expenses";
    }

    function renderAnalytics() {
      const rawTab = getAnalyticsTab();
      const analyticsTab = normalizeAnalyticsTab(rawTab);

      if (rawTab !== analyticsTab) {
        setAnalyticsTabValue(analyticsTab);
      }

      const isExpenses = analyticsTab === "expenses";
      const isSafes = analyticsTab === "safes";

      analyticsOverviewSection?.classList.add("hidden");
      analyticsExpensesSection?.classList.toggle("hidden", !isExpenses);
      analyticsSafesSection?.classList.toggle("hidden", !isSafes);

      analyticsTabOverviewBtn?.classList.add("hidden");
      analyticsTabExpensesBtn?.classList.toggle("is-active", isExpenses);
      analyticsTabSafesBtn?.classList.toggle("is-active", isSafes);

      /*
        ÐÐ±Ð·Ð¾Ñ ÐºÐ°Ðº ÑÐºÑÐ°Ð½ ÑÐ´Ð°Ð»ÑÐ½, Ð½Ð¾ ÐµÐ³Ð¾ ÑÐ°ÑÑÑÑÑ Ð½ÑÐ¶Ð½Ñ:
        - "ÐÐ¾Ð¶Ð½Ð¾ Ð¾ÑÐ»Ð¾Ð¶Ð¸ÑÑ" ÑÐµÐ¿ÐµÑÑ Ð¶Ð¸Ð²ÑÑ Ð² ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸ÑÑ
        - Ð·Ð½Ð°ÑÐµÐ½Ð¸Ñ Ð´Ð¾Ð»Ð¶Ð½Ñ Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÑÑÑÑ Ð¿ÑÐ¸ ÐºÐ°Ð¶Ð´Ð¾Ð¼ ÑÐµÐ½Ð´ÐµÑÐµ Ð°Ð½Ð°Ð»Ð¸ÑÐ¸ÐºÐ¸
      */
      renderAnalyticsOverview();

      if (isExpenses) renderAnalyticsExpensesByCategory();
      if (isSafes) renderAnalyticsSafes();
    }

    function setAnalyticsTab(nextTab) {
      setAnalyticsTabValue(normalizeAnalyticsTab(nextTab));
      renderAnalytics();
    }

    return {
      renderAnalytics,
      setAnalyticsTab,
    };
  }

  window.FinanceAppAnalyticsTabsRender = {
    create: createAnalyticsTabsRender,
  };
})();


;/* ===== js/28-analytics-overview-render.js ===== */
(() => {
  function createAnalyticsOverviewRender({
    state,
    roundToTwo,
    calculateBalance,
    getFreeMoneyTotal,
    getProtectedMoneyTotal,
    getMandatoryPaymentsCoverageStats,
    getRemainingFlexibleBudgetsCurrentMonth,
    formatMoney,

    analyticsTotalBalanceValue,
    analyticsFreeMoneyValue,
    analyticsProtectedMoneyValue,
    analyticsPendingMandatoryValue,
    analyticsMandatoryTotalValue,
    analyticsMandatoryCoveredValue,
    analyticsRemainingBudgetsValue,
    analyticsCanSaveNowValue,
    analyticsCanSaveNowStatus,
    analyticsCanSaveNowHint,
  }) {
    function getAnalyticsOverviewSummary() {
      const totalBalance = roundToTwo(calculateBalance());
      const freeMoney = roundToTwo(getFreeMoneyTotal());
      const protectedMoney = roundToTwo(getProtectedMoneyTotal());

      const mandatoryStats = getMandatoryPaymentsCoverageStats();
      const pendingMandatoryTotal = mandatoryStats.total;
      const pendingMandatoryCoveredByLinkedSafes = mandatoryStats.coveredByLinkedSafes;
      const pendingMandatoryToDeduct = mandatoryStats.chargeToFreeMoney;

      const remainingBudgets = roundToTwo(getRemainingFlexibleBudgetsCurrentMonth());

      const safeInterest = roundToTwo(
        state.transactions
          .filter((item) => item.type === "income" && item.title === "ÐÑÐ¾ÑÐµÐ½ÑÑ Ð¿Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ")
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
      );

      const canSaveNow = Math.max(
        0,
        roundToTwo(freeMoney - pendingMandatoryToDeduct - remainingBudgets)
      );

      return {
        totalBalance,
        freeMoney,
        protectedMoney,
        pendingMandatoryTotal,
        pendingMandatoryCoveredByLinkedSafes,
        pendingMandatoryToDeduct,
        remainingBudgets,
        canSaveNow,
        safeInterest,
      };
    }

    function renderAnalyticsOverview() {
      const summary = getAnalyticsOverviewSummary();

      if (analyticsTotalBalanceValue) {
        analyticsTotalBalanceValue.textContent = formatMoney(summary.totalBalance);
      }

      if (analyticsFreeMoneyValue) {
        analyticsFreeMoneyValue.textContent = formatMoney(summary.freeMoney);
      }

      if (analyticsProtectedMoneyValue) {
        analyticsProtectedMoneyValue.textContent = formatMoney(summary.protectedMoney);
      }

      if (analyticsPendingMandatoryValue) {
        analyticsPendingMandatoryValue.textContent = formatMoney(summary.pendingMandatoryToDeduct);
      }

      if (analyticsMandatoryTotalValue) {
        analyticsMandatoryTotalValue.textContent = formatMoney(summary.pendingMandatoryTotal);
      }

      if (analyticsMandatoryCoveredValue) {
        analyticsMandatoryCoveredValue.textContent = formatMoney(
          summary.pendingMandatoryCoveredByLinkedSafes
        );
      }

      if (analyticsRemainingBudgetsValue) {
        analyticsRemainingBudgetsValue.textContent = formatMoney(summary.remainingBudgets);
      }

      analyticsCanSaveNowValue?.classList.remove("is-positive", "is-negative");
      analyticsCanSaveNowValue?.classList.add(
        summary.canSaveNow > 0 ? "is-positive" : "is-negative"
      );

      if (analyticsCanSaveNowValue) {
        analyticsCanSaveNowValue.textContent = formatMoney(
          summary.canSaveNow > 0 ? summary.canSaveNow : 0
        );
      }

      if (summary.canSaveNow > 0) {
        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "ÐÐ¾Ð¶Ð½Ð¾";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `ÐÐ¾ÑÐ»Ðµ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶ÐµÐ¹ Ð¸ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² Ð¾ÑÑÐ°ÑÑÑÑ ${formatMoney(summary.canSaveNow)}.`;
        }
      } else {
        const deficit = Math.abs(
          Math.min(
            0,
            roundToTwo(
              summary.freeMoney -
                summary.pendingMandatoryToDeduct -
                summary.remainingBudgets
            )
          )
        );

        if (analyticsCanSaveNowStatus) {
          analyticsCanSaveNowStatus.textContent = "Ð¡ÐµÐ¹ÑÐ°Ñ ÑÐ°Ð½Ð¾";
        }

        if (analyticsCanSaveNowHint) {
          analyticsCanSaveNowHint.textContent =
            `ÐÐµ ÑÐ²Ð°ÑÐ°ÐµÑ ${formatMoney(deficit)} Ð¿Ð¾ÑÐ»Ðµ ÑÑÑÑÐ° Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¸ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð².`;
        }
      }
    }

    return {
      getAnalyticsOverviewSummary,
      renderAnalyticsOverview,
    };
  }

  window.FinanceAppAnalyticsOverviewRender = {
    create: createAnalyticsOverviewRender,
  };
})();


;/* ===== js/29-analytics-expenses-render.js ===== */
(() => {
  function createAnalyticsExpensesRender({
    state,
    UNCATEGORIZED_ID,
    roundToTwo,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    getCategoryName,
    isRequiredCategory,
    formatMoney,
    escapeHtml,

    getFilterPeriod,
    setFilterPeriod,
    getSelectedMonth,
    setSelectedMonth,
    getRangeStart,
    getRangeEnd,

    analyticsExpenseValue,
    analyticsExpensesPeriodNote,
    analyticsExpensesCategoriesList,
    analyticsExpensesRing,
    analyticsExpensesRingCenterValue,
    analyticsExpensesRingCenterLabel,

    analyticsExpenseValuePremium,
    analyticsExpensesPeriodNotePremium,
    analyticsExpensesCategoriesListPremium,
    analyticsExpensesRingPremium,
    analyticsExpensesRingCenterValuePremium,
    analyticsExpensesRingCenterLabelPremium,

    analyticsExpensesMonthStrip,
    analyticsExpensesTotalRowValue,

    openAnalyticsCategoryModal,
  }) {
    let analyticsExpenseCategoryFilter = "all";
    let analyticsExpenseKindFilter = "all";

    let previousRingItems = null;
    let previousRingTotal = 0;
    let previousShownTotal = null;
    let previousTopPercent = 0;

    let ringAnimationFrameId = null;
    let moneyAnimationFrameId = null;
    let percentAnimationFrameId = null;

    const ANALYTICS_EXPENSE_COLORS = [
      "#D85C52",
      "#4FA864",
      "#5B8BE8",
      "#F2B84B",
      "#8A6FD6",
      "#3FA89F",
      "#D9833F",
      "#C76C95",
      "#6F7A8C",
      "#86B75F",
      "#5FA7C8",
      "#A979C9",
      "#4E9B82",
      "#D06E68",
      "#6D8FC7",
      "#B76FA4",
      "#7B8FA6",
      "#67A889",
      "#C9905A",
      "#8B7FD1",
      "#5C9CA8",
      "#A86E7E",
      "#7DAA78",
      "#B79A63",
    ];

    function getPrimaryExpenseValueEl() {
      return analyticsExpenseValuePremium || analyticsExpenseValue;
    }

    function getPrimaryExpensePeriodNoteEl() {
      return analyticsExpensesPeriodNotePremium || analyticsExpensesPeriodNote;
    }

    function getPrimaryExpenseListEl() {
      return analyticsExpensesCategoriesListPremium || analyticsExpensesCategoriesList;
    }

    function getPrimaryExpenseRingEl() {
      return analyticsExpensesRingPremium || analyticsExpensesRing;
    }

    function getPrimaryExpenseRingCenterValueEl() {
      return analyticsExpensesRingCenterValuePremium || analyticsExpensesRingCenterValue;
    }

    function getPrimaryExpenseRingCenterLabelEl() {
      return analyticsExpensesRingCenterLabelPremium || analyticsExpensesRingCenterLabel;
    }

    function normalizeAnalyticsMonthValue(value) {
      const match = String(value || "").match(/^(\d{4})-(\d{1,2})$/);

      if (!match) {
        return getCurrentMonthValue();
      }

      const year = match[1];
      const month = String(Number(match[2])).padStart(2, "0");

      return `${year}-${month}`;
    }

    function getAnalyticsColorHash(value) {
      const text = String(value || "");
      let hash = 0;

      for (let index = 0; index < text.length; index += 1) {
        hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
      }

      return hash;
    }

    function getAnalyticsExpenseColor(categoryId) {
      const categoryIds = (state.categories || []).map((category) => category.id);
      const allCategoryIds = Array.from(new Set([...categoryIds, UNCATEGORIZED_ID]));
      const index = allCategoryIds.indexOf(categoryId);

      if (index >= 0) {
        return ANALYTICS_EXPENSE_COLORS[index % ANALYTICS_EXPENSE_COLORS.length];
      }

      return ANALYTICS_EXPENSE_COLORS[
        getAnalyticsColorHash(categoryId) % ANALYTICS_EXPENSE_COLORS.length
      ];
    }

    function easeOutCubic(progress) {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    function lerpNumber(from, to, progress) {
      return from + (to - from) * progress;
    }

    function clampNumber(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function getDelayedProgress(progress, delay = 0.32) {
      return clampNumber((progress - delay) / (1 - delay), 0, 1);
    }

    function getEasedDelayedProgress(progress, delay = 0) {
      return easeOutCubic(getDelayedProgress(progress, delay));
    }

    function formatAnalyticsPercent(value) {
      const percent = Number(value) || 0;

      if (percent > 0 && percent < 1) {
        return "<1%";
      }

      return `${Math.round(percent)}%`;
    }

    function getRingTransitionProfile(fromItems, toItems, fromTotal, toTotal) {
      const fromCount = fromItems.length;
      const toCount = toItems.length;

      const safeFromTotal = Math.max(Number(fromTotal) || 0, 0);
      const safeToTotal = Math.max(Number(toTotal) || 0, 0);

      if (fromCount === 0 && toCount > 0) {
        return {
          type: "empty-in",
          duration: 1040,
          totalMode: "target",
          sharedDelay: 0,
          enterDelay: 0.08,
          exitDelay: 0,
          totalDelay: 0,
        };
      }

      if (fromCount > 0 && toCount === 0) {
        return {
          type: "empty-out",
          duration: 1040,
          totalMode: "source",
          sharedDelay: 0,
          enterDelay: 0,
          exitDelay: 0.08,
          totalDelay: 0,
        };
      }

      const heavyShrink =
        fromCount >= toCount + 4 ||
        safeFromTotal > safeToTotal * 2.15;

      if (heavyShrink) {
        return {
          type: "heavy-shrink",
          duration: 1240,
          totalMode: "delayed-shrink",
          sharedDelay: 0.08,
          enterDelay: 0.18,
          exitDelay: 0.16,
          totalDelay: 0.34,
        };
      }

      const heavyGrow =
        toCount >= fromCount + 4 ||
        safeToTotal > safeFromTotal * 2.15;

      if (heavyGrow) {
        return {
          type: "heavy-grow",
          duration: 1120,
          totalMode: "target",
          sharedDelay: 0.05,
          enterDelay: 0.16,
          exitDelay: 0.06,
          totalDelay: 0,
        };
      }

      return {
        type: "morph",
        duration: 980,
        totalMode: "mixed",
        sharedDelay: 0,
        enterDelay: 0.08,
        exitDelay: 0.08,
        totalDelay: 0,
      };
    }

    function getAnimatedRingTotal(fromTotal, toTotal, mixedItemsTotal, rawProgress, profile) {
      const safeFromTotal = Math.max(Number(fromTotal) || 0, 0);
      const safeToTotal = Math.max(Number(toTotal) || 0, 0);

      if (profile.totalMode === "target") {
        return Math.max(safeToTotal, 1);
      }

      if (profile.totalMode === "source") {
        return Math.max(safeFromTotal, 1);
      }

      if (profile.totalMode === "delayed-shrink") {
        const delayedProgress = getEasedDelayedProgress(rawProgress, profile.totalDelay);
        return Math.max(lerpNumber(safeFromTotal, safeToTotal, delayedProgress), 1);
      }

      return Math.max(mixedItemsTotal, 1);
    }

    function getTopPercentFromItems(items, total) {
      if (!total || total <= 0 || !items.length) return 0;

      const topItem = items[0];

      if (!topItem) return 0;

      return (topItem.amount / total) * 100;
    }

    function getRingItemsTotal(items) {
      return items.reduce((sum, item) => {
        return sum + (Number(item.amount) || 0);
      }, 0);
    }

    function getAnalyticsRingSeamSize(percent) {
      if (percent >= 8) return 0.34;
      if (percent >= 3) return 0.22;
      if (percent >= 1.25) return 0.13;
      if (percent >= 0.55) return 0.075;
      return 0.045;
    }

    function buildAnalyticsRingGradient(items, total) {
      const emptyColor = "rgba(255,255,255,0.09)";
      const seamColor = "rgba(8,10,14,0.62)";

      if (!total || total <= 0 || !items.length) {
        return `conic-gradient(${emptyColor} 0deg 360deg)`;
      }

      let cursor = 0;
      const visibleItems = items.filter((item) => item.amount > 0.01);

      const gradientParts = visibleItems.flatMap((item) => {
        const percent = Math.max(0, Math.min(100, (item.amount / total) * 100));
        const baseSeamSize = getAnalyticsRingSeamSize(percent);
        const seamSize = Math.min(baseSeamSize, percent * 0.22);

        const start = cursor;
        const rawEnd = Math.min(100, cursor + percent);
        const seamStart = Math.max(start, rawEnd - seamSize);

        cursor = rawEnd;

        if (seamSize <= 0.012 || seamStart <= start) {
          return [`${item.color} ${start.toFixed(2)}% ${rawEnd.toFixed(2)}%`];
        }

        return [
          `${item.color} ${start.toFixed(2)}% ${seamStart.toFixed(2)}%`,
          `${seamColor} ${seamStart.toFixed(2)}% ${rawEnd.toFixed(2)}%`,
        ];
      });

      if (!gradientParts.length) {
        return `conic-gradient(${emptyColor} 0deg 360deg)`;
      }

      if (cursor < 99.7) {
        gradientParts.push(`${emptyColor} ${cursor.toFixed(2)}% 100%`);
      }

      return `conic-gradient(${gradientParts.join(", ")})`;
    }

    function mergeRingItemsForAnimation(fromItems, toItems, rawProgress, profile) {
      const byCategory = new Map();
      const orderedCategoryIds = [];

      fromItems.forEach((item) => {
        if (!byCategory.has(item.categoryId)) {
          orderedCategoryIds.push(item.categoryId);
        }

        byCategory.set(item.categoryId, {
          categoryId: item.categoryId,
          name: item.name,
          color: item.color,
          fromAmount: item.amount,
          toAmount: 0,
        });
      });

      toItems.forEach((item) => {
        if (!byCategory.has(item.categoryId)) {
          orderedCategoryIds.push(item.categoryId);
        }

        const current = byCategory.get(item.categoryId) || {
          categoryId: item.categoryId,
          name: item.name,
          color: item.color,
          fromAmount: 0,
          toAmount: 0,
        };

        current.name = item.name;
        current.color = item.color;
        current.toAmount = item.amount;

        byCategory.set(item.categoryId, current);
      });

      return orderedCategoryIds
        .map((categoryId) => {
          const item = byCategory.get(categoryId);

          const isLeaving = item.fromAmount > 0 && item.toAmount <= 0;
          const isEntering = item.fromAmount <= 0 && item.toAmount > 0;

          let itemProgress;

          if (isLeaving) {
            itemProgress = getEasedDelayedProgress(rawProgress, profile.exitDelay);
          } else if (isEntering) {
            itemProgress = getEasedDelayedProgress(rawProgress, profile.enterDelay);
          } else {
            itemProgress = getEasedDelayedProgress(rawProgress, profile.sharedDelay);
          }

          return {
            categoryId: item.categoryId,
            name: item.name,
            color: item.color,
            amount: lerpNumber(item.fromAmount, item.toAmount, itemProgress),
          };
        })
        .filter((item) => item.amount > 0.01);
    }

    function animateTextNumber({
      from,
      to,
      duration = 420,
      format,
      onUpdate,
      onDone,
      frameIdGetter,
      frameIdSetter,
    }) {
      const startTime = performance.now();
      const previousFrameId = frameIdGetter();

      if (previousFrameId) {
        cancelAnimationFrame(previousFrameId);
      }

      function tick(now) {
        const rawProgress = Math.min((now - startTime) / duration, 1);
        const progress = easeOutCubic(rawProgress);
        const value = lerpNumber(from, to, progress);

        onUpdate(format(value));

        if (rawProgress < 1) {
          const nextFrameId = requestAnimationFrame(tick);
          frameIdSetter(nextFrameId);
          return;
        }

        onUpdate(format(to));
        frameIdSetter(null);
        onDone?.();
      }

      const nextFrameId = requestAnimationFrame(tick);
      frameIdSetter(nextFrameId);
    }

    function animateMoneyValue(element, from, to) {
      if (!element) return;

      animateTextNumber({
        from,
        to,
        duration: 820,
        format: (value) => formatMoney(roundToTwo(value)),
        onUpdate: (text) => {
          element.textContent = text;
        },
        frameIdGetter: () => moneyAnimationFrameId,
        frameIdSetter: (nextId) => {
          moneyAnimationFrameId = nextId;
        },
      });
    }

    function animatePercentValue(element, from, to) {
      if (!element) return;

      animateTextNumber({
        from,
        to,
        duration: 700,
        format: (value) => formatAnalyticsPercent(value),
        onUpdate: (text) => {
          element.textContent = text;
        },
        frameIdGetter: () => percentAnimationFrameId,
        frameIdSetter: (nextId) => {
          percentAnimationFrameId = nextId;
        },
      });
    }

    function getAnalyticsExpensesPeriodNote() {
      const period = getFilterPeriod();

      if (period === "month") return "Ð·Ð° Ð¼ÐµÑÑÑ";
      if (period === "today") return "Ð·Ð° ÑÐµÐ³Ð¾Ð´Ð½Ñ";
      if (period === "7") return "Ð·Ð° 7 Ð´Ð½ÐµÐ¹";
      if (period === "range") return "Ð·Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´";

      return "Ð·Ð° Ð¿ÐµÑÐ¸Ð¾Ð´";
    }

    function getAnalyticsExpenseBaseTransactions() {
      const transactions = Array.isArray(state.transactions) ? state.transactions : [];
      const normalizedMonth = normalizeAnalyticsMonthValue(getSelectedMonth());

      if (normalizedMonth !== getSelectedMonth()) {
        setSelectedMonth(normalizedMonth);
      }

      return filterTransactionsByPeriod(
        transactions,
        getFilterPeriod(),
        normalizedMonth,
        getRangeStart(),
        getRangeEnd()
      ).filter((transaction) => transaction.type === "expense");
    }

    function isAnalyticsExpenseRequiredCategory(categoryId) {
      if (categoryId === UNCATEGORIZED_ID) return false;

      return typeof isRequiredCategory === "function"
        ? isRequiredCategory(categoryId)
        : false;
    }

    function isAnalyticsExpenseKindTransaction(transaction) {
      if (analyticsExpenseKindFilter === "all") {
        return true;
      }

      const categoryId = transaction.category_id || UNCATEGORIZED_ID;
      const isRequired = isAnalyticsExpenseRequiredCategory(categoryId);

      if (analyticsExpenseKindFilter === "required") {
        return isRequired;
      }

      if (analyticsExpenseKindFilter === "flexible") {
        return !isRequired;
      }

      return true;
    }

    function getAnalyticsExpenseKindTransactions() {
      return getAnalyticsExpenseBaseTransactions().filter(isAnalyticsExpenseKindTransaction);
    }

    function syncAnalyticsExpenseKindRail() {
      document.querySelectorAll("[data-analytics-expense-kind]").forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.analyticsExpenseKind === analyticsExpenseKindFilter
        );
      });
    }

    function bindAnalyticsExpenseKindRail() {
      document.querySelectorAll("[data-analytics-expense-kind]").forEach((button) => {
        if (button.dataset.kindBound === "true") return;

        button.dataset.kindBound = "true";

        button.addEventListener("click", () => {
          const nextKind = button.dataset.analyticsExpenseKind || "all";

          if (analyticsExpenseKindFilter === nextKind) return;

          analyticsExpenseKindFilter = nextKind;
          analyticsExpenseCategoryFilter = "all";
          syncAnalyticsExpenseKindRail();
          renderAnalyticsExpensesByCategory();
        });
      });
    }

    function getAnalyticsExpenseFilteredTransactions() {
      const expenseTransactions = getAnalyticsExpenseKindTransactions();

      if (analyticsExpenseCategoryFilter === "all") {
        return expenseTransactions;
      }

      return expenseTransactions.filter((transaction) => {
        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        return categoryId === analyticsExpenseCategoryFilter;
      });
    }

    function getAnalyticsExpenseItems(expenseTransactions) {
      const byCategory = new Map();

      expenseTransactions.forEach((transaction) => {
        const categoryId = transaction.category_id || UNCATEGORIZED_ID;
        const amount = Number(transaction.amount) || 0;

        const current = byCategory.get(categoryId) || {
          categoryId,
          name: getCategoryName(categoryId),
          amount: 0,
          color: getAnalyticsExpenseColor(categoryId),
        };

        current.amount += amount;
        byCategory.set(categoryId, current);
      });

      return Array.from(byCategory.values())
        .map((item) => ({
          ...item,
          amount: roundToTwo(item.amount),
        }))
        .filter((item) => item.amount > 0)
        .sort((a, b) => b.amount - a.amount);
    }

    function renderAnalyticsExpensesRing(items, total, options = {}) {
      const ringEl = getPrimaryExpenseRingEl();
      const centerValueEl = getPrimaryExpenseRingCenterValueEl();
      const centerLabelEl = getPrimaryExpenseRingCenterLabelEl();

      if (!ringEl) return;

      const shouldAnimate = options.animate === true;
      const nextTopPercent = getTopPercentFromItems(items, total);
      const nextTopItem = items[0];
      const nextCenterLabel = nextTopItem ? nextTopItem.name : "ÐÐµÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð²";

      function setRingGradient(nextItems, nextTotal) {
        const gradient = buildAnalyticsRingGradient(nextItems, nextTotal);

        ringEl.style.background = gradient;
        ringEl.style.setProperty("--analytics-ring-gradient", gradient);
      }

      function setFinalRingState(nextItems, nextTotal, nextPercent, nextLabel) {
        setRingGradient(nextItems, nextTotal);

        if (centerValueEl) {
          centerValueEl.textContent = formatAnalyticsPercent(nextPercent);
        }

        if (centerLabelEl) {
          centerLabelEl.textContent = nextLabel;
        }

        previousRingItems = nextItems.map((item) => ({ ...item }));
        previousRingTotal = nextTotal;
        previousTopPercent = nextPercent;
        ringAnimationFrameId = null;
      }

      if (!shouldAnimate || !previousRingItems) {
        setFinalRingState(items, total, nextTopPercent, nextCenterLabel);
        return;
      }

      if (ringAnimationFrameId) {
        cancelAnimationFrame(ringAnimationFrameId);
        ringAnimationFrameId = null;
      }

      const fromItems = previousRingItems.map((item) => ({ ...item }));
      const fromTotal = previousRingTotal;
      const fromTopPercent = previousTopPercent;

      const toItems = items.map((item) => ({ ...item }));
      const toTotal = total;

      function animateRingPhase({
        phaseFromItems,
        phaseToItems,
        phaseFromTotal,
        phaseToTotal,
        duration,
        onDone,
      }) {
        const profile = getRingTransitionProfile(
          phaseFromItems,
          phaseToItems,
          phaseFromTotal,
          phaseToTotal
        );

        const startTime = performance.now();

        function tick(now) {
          const rawProgress = Math.min((now - startTime) / duration, 1);

          const mixedItems = mergeRingItemsForAnimation(
            phaseFromItems,
            phaseToItems,
            rawProgress,
            profile
          );

          const mixedItemsTotal = getRingItemsTotal(mixedItems);

          const mixedTotal = getAnimatedRingTotal(
            phaseFromTotal,
            phaseToTotal,
            mixedItemsTotal,
            rawProgress,
            profile
          );

          setRingGradient(mixedItems, mixedTotal);

          if (rawProgress < 1) {
            ringAnimationFrameId = requestAnimationFrame(tick);
            return;
          }

          setRingGradient(phaseToItems, phaseToTotal);
          ringAnimationFrameId = null;
          onDone?.();
        }

        ringAnimationFrameId = requestAnimationFrame(tick);
      }

      animatePercentValue(centerValueEl, fromTopPercent, 0);

      animateRingPhase({
        phaseFromItems: fromItems,
        phaseToItems: [],
        phaseFromTotal: fromTotal,
        phaseToTotal: 0,
        duration: 430,
        onDone: () => {
          if (centerLabelEl) {
            centerLabelEl.textContent = "ÐÐµÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð²";
          }

          if (!toItems.length || !toTotal) {
            setFinalRingState([], 0, 0, "ÐÐµÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð²");
            return;
          }

          if (centerLabelEl) {
            centerLabelEl.textContent = nextCenterLabel;
          }

          animatePercentValue(centerValueEl, 0, nextTopPercent);

          animateRingPhase({
            phaseFromItems: [],
            phaseToItems: toItems,
            phaseFromTotal: 0,
            phaseToTotal: toTotal,
            duration: 650,
            onDone: () => {
              setFinalRingState(toItems, toTotal, nextTopPercent, nextCenterLabel);
            },
          });
        },
      });
    }

    function getAnalyticsMonthDateFromValue(value) {
      const normalized = normalizeAnalyticsMonthValue(value);
      const match = normalized.match(/^(\d{4})-(\d{2})$/);

      return new Date(Number(match[1]), Number(match[2]) - 1, 1);
    }

    function getAnalyticsMonthKeyFromDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      return `${year}-${month}`;
    }

    function getAnalyticsMonthShortLabel(monthKey) {
      const date = getAnalyticsMonthDateFromValue(monthKey);

      return date
        .toLocaleDateString("ru-RU", {
          month: "short",
        })
        .replace(".", "");
    }

    function getAnalyticsMonthStripItems() {
      const selectedDate = getAnalyticsMonthDateFromValue(getSelectedMonth());
      const selectedYear = selectedDate.getFullYear();
      const items = [];

      for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
        const date = new Date(selectedYear, monthIndex, 1);
        const monthKey = getAnalyticsMonthKeyFromDate(date);

        const monthTransactions = filterTransactionsByPeriod(
          state.transactions,
          "month",
          monthKey,
          "",
          ""
        ).filter((transaction) => transaction.type === "expense");

        const total = roundToTwo(
          monthTransactions.reduce((sum, transaction) => {
            return sum + (Number(transaction.amount) || 0);
          }, 0)
        );

        items.push({
          monthKey,
          label: getAnalyticsMonthShortLabel(monthKey),
          total,
        });
      }

      return items;
    }

    function renderAnalyticsExpensesMonthStrip() {
      if (!analyticsExpensesMonthStrip) return;

      const items = getAnalyticsMonthStripItems();
      const maxTotal = Math.max(...items.map((item) => item.total), 1);
      const selectedMonth = normalizeAnalyticsMonthValue(getSelectedMonth());

      analyticsExpensesMonthStrip.innerHTML = "";

      items.forEach((item) => {
        const percent = item.total > 0 ? item.total / maxTotal : 0;
        const height = Math.max(4, Math.round(44 * percent));

        const button = document.createElement("button");
        button.type = "button";
        button.className =
          `analytics-expenses-month-item${
            item.monthKey === selectedMonth ? " is-active" : ""
          }`;

        button.innerHTML = `
          <div
            class="analytics-expenses-month-item__bar"
            style="height: ${height}px"
          ></div>
          <div class="analytics-expenses-month-item__label">
            ${escapeHtml(item.label)}
          </div>
        `;

        button.addEventListener("click", () => {
          analyticsExpenseCategoryFilter = "all";
          setSelectedMonth(item.monthKey);
          setFilterPeriod("month");
          renderAnalyticsExpensesByCategory();
        });

        analyticsExpensesMonthStrip.appendChild(button);
      });
    }

    function renderAnalyticsExpensesCategories(items, total) {
      const listEl = getPrimaryExpenseListEl();

      if (!listEl) return;

      listEl.innerHTML = "";

      if (!total || total <= 0 || items.length === 0) {
        listEl.innerHTML = `
          <div class="analytics-expenses-empty">
            ÐÐ° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð½ÐµÑ
          </div>
        `;
        return;
      }

      items.forEach((item) => {
        const rawPercent = total > 0 ? (item.amount / total) * 100 : 0;
        const percentForBar = rawPercent > 0 && rawPercent < 1
          ? 1
          : Math.round(rawPercent);
        const percentLabel = formatAnalyticsPercent(rawPercent);

        const row = document.createElement("button");
        row.className =
          "analytics-expense-category-row analytics-expense-category-row--premium";
        row.type = "button";
        row.dataset.categoryId = item.categoryId;

        row.innerHTML = `
          <div
            class="analytics-expense-category-row__icon"
            style="--category-color: ${item.color}"
          >
            <span>${escapeHtml(item.name.slice(0, 1).toUpperCase())}</span>
          </div>

          <div class="analytics-expense-category-row__main">
            <div class="analytics-expense-category-row__top">
              <div class="analytics-expense-category-row__name">
                ${escapeHtml(item.name)}
              </div>
              <div class="analytics-expense-category-row__amount">
                ${formatMoney(item.amount)}
              </div>
            </div>

            <div class="analytics-expense-category-row__bottom">
              <div class="analytics-expense-category-row__bar">
                <div
                  class="analytics-expense-category-row__bar-fill"
                  style="width: ${Math.max(2, percentForBar)}%; background: ${item.color}; color: ${item.color};"
                ></div>
              </div>

              <div class="analytics-expense-category-row__percent">${percentLabel}</div>
            </div>
          </div>
        `;

        row.addEventListener("click", () => {
          openAnalyticsCategoryModal?.(item.categoryId);
        });

        listEl.appendChild(row);
      });
    }

    function renderAnalyticsExpensesByCategory() {
      bindAnalyticsExpenseKindRail();
      syncAnalyticsExpenseKindRail();

      const baseExpenseTransactions = getAnalyticsExpenseKindTransactions();
      const filteredExpenseTransactions = getAnalyticsExpenseFilteredTransactions();

      const totalAll = roundToTwo(
        baseExpenseTransactions.reduce((sum, transaction) => {
          return sum + (Number(transaction.amount) || 0);
        }, 0)
      );

      const totalFiltered = roundToTwo(
        filteredExpenseTransactions.reduce((sum, transaction) => {
          return sum + (Number(transaction.amount) || 0);
        }, 0)
      );

      const ringItems = getAnalyticsExpenseItems(baseExpenseTransactions);
      const listItems = getAnalyticsExpenseItems(filteredExpenseTransactions);

      const shownTotal =
        analyticsExpenseCategoryFilter === "all" ? totalAll : totalFiltered;

      const valueEl = getPrimaryExpenseValueEl();
      const periodNoteEl = getPrimaryExpensePeriodNoteEl();

      if (previousShownTotal === null) {
        if (valueEl) {
          valueEl.textContent = formatMoney(shownTotal);
        }

        if (analyticsExpensesTotalRowValue) {
          analyticsExpensesTotalRowValue.textContent = formatMoney(shownTotal);
        }

        previousShownTotal = shownTotal;
      } else {
        animateMoneyValue(valueEl, previousShownTotal, shownTotal);
        animateMoneyValue(analyticsExpensesTotalRowValue, previousShownTotal, shownTotal);

        previousShownTotal = shownTotal;
      }

      if (periodNoteEl) {
        periodNoteEl.textContent = getAnalyticsExpensesPeriodNote();
      }

      renderAnalyticsExpensesRing(ringItems, totalAll, {
        animate: previousRingItems !== null,
      });

      renderAnalyticsExpensesMonthStrip();
      renderAnalyticsExpensesCategories(listItems, shownTotal);
    }

    function resetAnalyticsExpenseCategoryFilter() {
      analyticsExpenseCategoryFilter = "all";
    }
    
    function setAnalyticsExpenseKindFilter(nextKind = "all") {
  const allowedKinds = ["all", "flexible", "required"];

  analyticsExpenseKindFilter = allowedKinds.includes(nextKind)
    ? nextKind
    : "all";

  analyticsExpenseCategoryFilter = "all";
  syncAnalyticsExpenseKindRail();
}

function getAnalyticsExpenseKindFilter() {
  return analyticsExpenseKindFilter;
}

    return {
  getAnalyticsExpensesPeriodNote,
  getAnalyticsExpenseColor,
  getAnalyticsExpenseItems,
  renderAnalyticsExpensesByCategory,
  resetAnalyticsExpenseCategoryFilter,
  setAnalyticsExpenseKindFilter,
  getAnalyticsExpenseKindFilter,
};
  }

  window.FinanceAppAnalyticsExpensesRender = {
    create: createAnalyticsExpensesRender,
  };
})();


;/* ===== js/30-analytics-safes-render.js ===== */
(() => {
  function getCurrentMonthValueFallback() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getDateFromMonthValue(monthValue) {
    const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);

    if (!match) {
      return new Date();
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1);
  }

  function getMonthValueFromDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getMonthShortLabel(monthValue) {
    const date = getDateFromMonthValue(monthValue);

    return date
      .toLocaleDateString("ru-RU", {
        month: "short",
      })
      .replace(".", "");
  }

  function getYearMonths(selectedMonth) {
    const selectedDate = getDateFromMonthValue(selectedMonth);
    const year = selectedDate.getFullYear();
    const months = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      const date = new Date(year, monthIndex, 1);

      months.push({
        value: getMonthValueFromDate(date),
        label: getMonthShortLabel(getMonthValueFromDate(date)),
      });
    }

    return months;
  }

  function createAnalyticsSafesRender({
    state,
    getAnalyticsOverviewSummary,
    getSafeBucketBalance,
    isRequiredCategory,
    formatMoney,
    escapeHtml,

    analyticsInterestValue,
    analyticsSafeList,

    getSelectedMonth,
    setSelectedMonth,
  }) {
    const analyticsSafesMonthStrip = document.getElementById("analyticsSafesMonthStrip");

    function getActiveMonth() {
      if (typeof getSelectedMonth === "function") {
        return getSelectedMonth() || getCurrentMonthValueFallback();
      }

      return getCurrentMonthValueFallback();
    }

    function renderAnalyticsSafesMonthStrip() {
      if (!analyticsSafesMonthStrip) return;

      const activeMonth = getActiveMonth();
      const months = getYearMonths(activeMonth);

      analyticsSafesMonthStrip.innerHTML = "";

      months.forEach((month) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className =
          `analytics-safes-month-btn${month.value === activeMonth ? " is-active" : ""}`;
        button.dataset.monthValue = month.value;
        button.textContent = month.label;

        button.addEventListener("click", () => {
          if (typeof setSelectedMonth === "function") {
            setSelectedMonth(month.value);
          }

          renderAnalyticsSafes();
        });

        analyticsSafesMonthStrip.appendChild(button);
      });

      requestAnimationFrame(() => {
        analyticsSafesMonthStrip
          .querySelector(".analytics-safes-month-btn.is-active")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
      });
    }

    function renderAnalyticsSafes() {
      const summary = getAnalyticsOverviewSummary();
      const selectedMonth = getActiveMonth();

      renderAnalyticsSafesMonthStrip();

      if (analyticsInterestValue) {
        analyticsInterestValue.textContent = formatMoney(summary.safeInterest);
      }

      if (window.FinanceAppAnalyticsSafeModels?.renderAnalyticsSafeModels) {
        window.FinanceAppAnalyticsSafeModels.renderAnalyticsSafeModels({
          state,
          selectedMonth,
          isRequiredCategory,
          formatMoney,
          escapeHtml,
        });
      }

      /*
        Ð Ð°Ð½Ð°Ð»Ð¸ÑÐ¸ÐºÐµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº ÑÐµÐ¹ÑÐ¾Ð² Ð±Ð¾Ð»ÑÑÐµ Ð½Ðµ ÑÐµÐ½Ð´ÐµÑÐ¸Ð¼.
        ÐÐ½ Ð´ÑÐ±Ð»Ð¸ÑÑÐµÑ ÑÐ°Ð·Ð´ÐµÐ» "ÐÐ¾ÑÐµÐ»ÑÐº" Ð¸ Ð·Ð°ÑÐ¾ÑÑÐµÑ ÑÐºÑÐ°Ð½.
      */
      if (analyticsSafeList) {
        analyticsSafeList.innerHTML = "";
        analyticsSafeList.classList.add("hidden");
      }
    }

    return {
      renderAnalyticsSafes,
    };
  }

  window.FinanceAppAnalyticsSafesRender = {
    create: createAnalyticsSafesRender,
  };
})();


;/* ===== js/31-analytics-category-modal.js ===== */
(() => {
  function createAnalyticsCategoryModal({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,

    analyticsCategoryModal,
    analyticsCategoryModalTitle,
    analyticsCategoryModalPeriodLabel,
    analyticsCategoryBudgetBtn,
    analyticsCategoryTypeBtn,
    analyticsCategoryTransactionsList,

    getActiveAnalyticsCategoryId,
    setActiveAnalyticsCategoryId,

    getFilterPeriod,
    getSelectedMonth,
    getRangeStart,
    getRangeEnd,

    filterTransactionsByPeriod,
    sortTransactionsByLatest,

    getCategoryName,
    getBudgetLimitLabel,
    isRequiredCategory,

    getAnalyticsPeriodLabel,
    createTransactionCard,
    openBudgetModal,

    openAnimatedModal,
    closeAnimatedModal,

    loadDataFromSupabase,
    renderAll,
  }) {
    let modalBound = false;

    function bindAnalyticsCategoryModalEvents() {
      if (modalBound || !analyticsCategoryModal) return;

      modalBound = true;

      const closeBtn = document.getElementById("closeAnalyticsCategoryModalBtn");

      closeBtn?.addEventListener("click", () => {
        closeAnalyticsCategoryModal();
      });

      analyticsCategoryModal.addEventListener("click", (event) => {
        if (event.target === analyticsCategoryModal) {
          closeAnalyticsCategoryModal();
        }
      });
    }

    function getSafeCategoryName(categoryId) {
      if (categoryId === "transfers") return "ÐÐµÑÐµÐ²Ð¾Ð´Ñ";

      const name = getCategoryName(categoryId);

      return String(name || "").trim() || "ÐÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ";
    }

    function getAnalyticsFilteredTransactions() {
      const transactions = Array.isArray(state.transactions)
        ? state.transactions
        : [];

      return filterTransactionsByPeriod(
        transactions,
        getFilterPeriod(),
        getSelectedMonth(),
        getRangeStart(),
        getRangeEnd()
      );
    }

    function getAnalyticsTransactionsByCategory(categoryId) {
      const items = getAnalyticsFilteredTransactions();

      if (categoryId === "transfers") {
        return sortTransactionsByLatest(
          items.filter((transaction) => transaction.type === "transfer")
        );
      }

      return sortTransactionsByLatest(
        items.filter((transaction) => {
          if (transaction.type !== "expense") return false;

          return (transaction.category_id || UNCATEGORIZED_ID) === categoryId;
        })
      );
    }

    function renderBrokenTransactionFallback(transaction) {
      const fallback = document.createElement("div");

      fallback.className = "list-card";
      fallback.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">ÐÐ¿ÐµÑÐ°ÑÐ¸Ñ</h3>
          <p class="list-subtitle">ÐÐ°ÑÑÐ¾ÑÐºÐ° Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸ Ð¿Ð¾Ð²ÑÐµÐ¶Ð´ÐµÐ½Ð°, Ð½Ð¾ Ð¿ÑÐ¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ Ð½Ðµ ÑÐ¿Ð°Ð»Ð¾</p>
        </div>
      `;

      if (transaction?.id) {
        fallback.dataset.transactionId = transaction.id;
      }

      return fallback;
    }

    function renderAnalyticsCategoryTransactions(categoryId) {
      if (!analyticsCategoryTransactionsList) {
        console.error("analyticsCategoryTransactionsList not found");
        return;
      }

      let transactions = [];

      try {
        transactions = getAnalyticsTransactionsByCategory(categoryId);
      } catch (error) {
        console.error("getAnalyticsTransactionsByCategory error:", error, categoryId);

        analyticsCategoryTransactionsList.innerHTML = `
          <div class="list-card">
            <div class="list-body">
              <h3 class="list-title">ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹</h3>
              <p class="list-subtitle">ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ ÑÐ¾Ð±ÑÐ°ÑÑ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸</p>
            </div>
          </div>
        `;

        return;
      }

      analyticsCategoryTransactionsList.innerHTML = "";

      if (!transactions.length) {
        const empty = document.createElement("div");
        empty.className = "list-card";
        empty.innerHTML = `
          <div class="list-body">
            <h3 class="list-title">ÐÐ¿ÐµÑÐ°ÑÐ¸Ð¹ Ð½ÐµÑ</h3>
            <p class="list-subtitle">ÐÐ° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´ Ð½Ð¸ÑÐµÐ³Ð¾ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾</p>
          </div>
        `;

        analyticsCategoryTransactionsList.appendChild(empty);
        return;
      }

      transactions.forEach((transaction) => {
        try {
          analyticsCategoryTransactionsList.appendChild(
            createTransactionCard(transaction)
          );
        } catch (error) {
          console.error("analytics category transaction render error:", error, transaction);

          analyticsCategoryTransactionsList.appendChild(
            renderBrokenTransactionFallback(transaction)
          );
        }
      });
    }

    function syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory) {
      if (!analyticsCategoryBudgetBtn) return;

      if (isTransferCategory) {
        analyticsCategoryBudgetBtn.textContent = "â";
        analyticsCategoryBudgetBtn.onclick = null;
        analyticsCategoryBudgetBtn.disabled = true;
        return;
      }

      analyticsCategoryBudgetBtn.textContent = getBudgetLimitLabel(categoryId);
      analyticsCategoryBudgetBtn.disabled = false;

      analyticsCategoryBudgetBtn.onclick = () => {
        openBudgetModal(categoryId);
      };
    }

    function syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory) {
      if (!analyticsCategoryTypeBtn) return;

      if (isTransferCategory) {
        analyticsCategoryTypeBtn.textContent = "ÐÐ¸Ð±ÐºÐ°Ñ";
        analyticsCategoryTypeBtn.disabled = true;
        analyticsCategoryTypeBtn.onclick = null;
        analyticsCategoryTypeBtn.classList.remove("analytics-category-type-btn--required");
        analyticsCategoryTypeBtn.classList.add("analytics-category-type-btn--flex");
        return;
      }

      const required = isRequiredCategory(categoryId);

      analyticsCategoryTypeBtn.textContent = required ? "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð°Ñ" : "ÐÐ¸Ð±ÐºÐ°Ñ";
      analyticsCategoryTypeBtn.disabled = false;

      analyticsCategoryTypeBtn.classList.toggle(
        "analytics-category-type-btn--required",
        required
      );

      analyticsCategoryTypeBtn.classList.toggle(
        "analytics-category-type-btn--flex",
        !required
      );

      analyticsCategoryTypeBtn.onclick = async () => {
        try {
          const { error } = await supabaseClient
            .from("categories")
            .update({ is_required: !required })
            .eq("id", categoryId);

          if (error) {
            alert("ÐÑÐ¸Ð±ÐºÐ° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐ¸Ð¿Ð° ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
            console.error(error);
            return;
          }

          await loadDataFromSupabase();

          openAnalyticsCategoryModal(categoryId);
          renderAll();
        } catch (error) {
          alert("ÐÑÐ¸Ð±ÐºÐ° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐ¸Ð¿Ð° ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
          console.error(error);
        }
      };
    }

    function openAnalyticsCategoryModal(categoryId) {
      if (!analyticsCategoryModal) {
        console.error("analyticsCategoryModal not found in index.html");
        alert("ÐÐ¾Ð´Ð°Ð»ÐºÐ° ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð° Ð² index.html");
        return;
      }

      try {
        bindAnalyticsCategoryModalEvents();

        setActiveAnalyticsCategoryId(categoryId);

        const isTransferCategory = categoryId === "transfers";
        const title = getSafeCategoryName(categoryId);
        const periodLabel = getAnalyticsPeriodLabel() || "ÐÐµÑÐ¸Ð¾Ð´";

        if (analyticsCategoryModalTitle) {
          analyticsCategoryModalTitle.textContent = title;
        }

        if (analyticsCategoryModalPeriodLabel) {
          analyticsCategoryModalPeriodLabel.textContent = periodLabel;
        }

        syncAnalyticsCategoryBudgetButton(categoryId, isTransferCategory);
        syncAnalyticsCategoryTypeButton(categoryId, isTransferCategory);
        renderAnalyticsCategoryTransactions(categoryId);

        openAnimatedModal(analyticsCategoryModal);
      } catch (error) {
        console.error("openAnalyticsCategoryModal error:", error, categoryId);

        alert("ÐÐµ Ð¿Ð¾Ð»ÑÑÐ¸Ð»Ð¾ÑÑ Ð¾ÑÐºÑÑÑÑ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸. ÐÑÐ¸Ð±ÐºÐ° Ð² Ð´Ð°Ð½Ð½ÑÑ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸.");
      }
    }

    function closeAnalyticsCategoryModal() {
      if (!analyticsCategoryModal) return;

      closeAnimatedModal(analyticsCategoryModal);
      setActiveAnalyticsCategoryId(null);
    }

    return {
      getAnalyticsFilteredTransactions,
      getAnalyticsTransactionsByCategory,
      renderAnalyticsCategoryTransactions,
      openAnalyticsCategoryModal,
      closeAnalyticsCategoryModal,
    };
  }

  window.FinanceAppAnalyticsCategoryModal = {
    create: createAnalyticsCategoryModal,
  };
})();


;/* ===== js/32-analytics-safes-models.js ===== */
(() => {
  const UNCATEGORIZED_ID = "__uncategorized__";

  function toNumber(value) {
    if (value === null || value === undefined || value === "") return 0;

    if (typeof value === "number") return Number.isFinite(value) ? value : 0;

    const normalized = String(value)
      .replace(/\s/g, "")
      .replace(",", ".");

    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function fallbackFormatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} â½`;
  }

  function fallbackEscapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getCurrentMonthValue() {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  function getDateFromMonthValue(monthValue) {
    const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);

    if (!match) {
      return new Date();
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1);
  }

  function getMonthValueFromDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }

  function getPreviousMonthValue(monthValue) {
    const date = getDateFromMonthValue(monthValue);

    return getMonthValueFromDate(
      new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }

  function getMonthDays(selectedMonth) {
    const date = getDateFromMonthValue(selectedMonth);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) {
      return {
        elapsedDays: daysInMonth,
        remainingDays: 0,
        daysInMonth,
      };
    }

    if (selectedMonth > currentMonth) {
      return {
        elapsedDays: 0,
        remainingDays: daysInMonth,
        daysInMonth,
      };
    }

    const today = new Date().getDate();

    return {
      elapsedDays: Math.min(daysInMonth, Math.max(1, today)),
      remainingDays: Math.max(0, daysInMonth - today),
      daysInMonth,
    };
  }

  function getTransactionDateKey(transaction) {
    const rawValue =
      transaction.date ||
      transaction.transaction_date ||
      transaction.operation_date ||
      transaction.created_date ||
      transaction.created_at ||
      transaction.createdAt ||
      "";

    if (!rawValue) return "";

    const rawText = String(rawValue);

    if (/^\d{4}-\d{2}-\d{2}/.test(rawText)) {
      return rawText.slice(0, 10);
    }

    const parsedDate = new Date(rawText);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;
  }

  function getMonthTransactions(state, selectedMonth) {
    return (state.transactions || []).filter((transaction) => {
      const dateKey = getTransactionDateKey(transaction);

      return dateKey.slice(0, 7) === selectedMonth;
    });
  }

  function getCategoryId(transaction) {
    return (
      transaction.category_id ||
      transaction.categoryId ||
      transaction.category ||
      UNCATEGORIZED_ID
    );
  }

  function getCategories(state) {
    return (
      state.categories ||
      state.expenseCategories ||
      state.budgetCategories ||
      []
    );
  }

  function getCategoryById(state, categoryId) {
    return getCategories(state).find((category) => {
      return String(category.id) === String(categoryId);
    }) || null;
  }

    function getBudgetLimits(state) {
    return (
      state.budgetLimits ||
      state.budget_limits ||
      state.categoryBudgetLimits ||
      []
    );
  }

  function getBudgetLimitAmountFromItem(item) {
    if (!item) return 0;

    return toNumber(
      item.amount ??
      item.limit_amount ??
      item.limitAmount ??
      item.budget_amount ??
      item.budgetAmount ??
      item.monthly_amount ??
      item.monthlyAmount ??
      item.monthly_limit ??
      item.monthlyLimit ??
      item.budget_limit ??
      item.budgetLimit ??
      item.limit ??
      item.value ??
      0
    );
  }

  function getBudgetLimitCategoryId(item) {
    if (!item) return "";

    return (
      item.category_id ||
      item.categoryId ||
      item.category ||
      item.expense_category_id ||
      item.expenseCategoryId ||
      ""
    );
  }

  function getBudgetLimitFromCategory(category) {
    if (!category) return 0;

    return toNumber(
      category.budget_limit ??
      category.budgetLimit ??
      category.monthly_limit ??
      category.monthlyLimit ??
      category.limit ??
      category.amount_limit ??
      category.amountLimit ??
      category.budget ??
      category.plan ??
      category.month_limit ??
      category.monthLimit ??
      0
    );
  }

  function getBudgetLimitForCategory(state, categoryId) {
    const fromBudgetLimits = getBudgetLimits(state).find((item) => {
      return String(getBudgetLimitCategoryId(item)) === String(categoryId);
    });

    const budgetLimitAmount = getBudgetLimitAmountFromItem(fromBudgetLimits);

    if (budgetLimitAmount > 0) {
      return budgetLimitAmount;
    }

    const category = getCategoryById(state, categoryId);

    return getBudgetLimitFromCategory(category);
  }

  function getPaymentStartMonth(payment) {
    return (
      payment.start_period ||
      payment.startPeriod ||
      payment.start_month ||
      payment.startMonth ||
      ""
    );
  }

  function getPaymentPaidPeriods(payment) {
    if (Array.isArray(payment.paid_periods)) return payment.paid_periods;
    if (Array.isArray(payment.paidPeriods)) return payment.paidPeriods;

    return [];
  }

  function isPaymentEnabled(payment) {
    return payment.enabled !== false;
  }

  function isPaymentStarted(payment, selectedMonth) {
    const startMonth = getPaymentStartMonth(payment);

    if (!startMonth) return true;

    return startMonth <= selectedMonth;
  }

  function isCalendarPaymentTransaction(transaction, paymentId, selectedMonth) {
    const transactionPaymentId =
      transaction.calendar_payment_id ||
      transaction.mandatory_payment_id ||
      transaction.source_id ||
      "";

    const transactionPeriod =
      transaction.calendar_payment_period ||
      transaction.mandatory_payment_period ||
      "";

    const transactionMonth = getTransactionDateKey(transaction).slice(0, 7);

    const source =
      transaction.source ||
      transaction.source_type ||
      transaction.sourceType ||
      "";

    const isCalendarSource =
      source === "calendar_payment" ||
      source === "mandatory_payment" ||
      Boolean(transaction.calendar_payment_id) ||
      Boolean(transaction.mandatory_payment_id);

    if (!isCalendarSource) return false;
    if (String(transactionPaymentId) !== String(paymentId)) return false;

    if (transactionPeriod) {
      return transactionPeriod === selectedMonth;
    }

    return transactionMonth === selectedMonth;
  }

  function isPaymentPaidForMonth(payment, selectedMonth, monthTransactions) {
    const paidPeriods = getPaymentPaidPeriods(payment);

    if (paidPeriods.includes(selectedMonth)) return true;

    return monthTransactions.some((transaction) => {
      return isCalendarPaymentTransaction(transaction, payment.id, selectedMonth);
    });
  }

  function getCalendarReservedAmount(state, selectedMonth, monthTransactions) {
    const payments = state.mandatoryPayments || state.calendarPayments || [];

    let reserved = 0;

    payments.forEach((payment) => {
      if (!isPaymentEnabled(payment)) return;
      if (!isPaymentStarted(payment, selectedMonth)) return;
      if (isPaymentPaidForMonth(payment, selectedMonth, monthTransactions)) return;

      const amount = toNumber(payment.amount);

      if (amount > 0) {
        reserved += amount;
      }
    });

    return roundToTwo(reserved);
  }

  function getMonthProgressPercent(selectedMonth) {
    const currentMonth = getCurrentMonthValue();

    if (selectedMonth < currentMonth) return 100;
    if (selectedMonth > currentMonth) return 0;

    const { elapsedDays, daysInMonth } = getMonthDays(selectedMonth);

    return Math.min(100, Math.max(1, Math.round((elapsedDays / daysInMonth) * 100)));
  }

  function getPercent(value, base) {
    if (base <= 0) return 0;

    return Math.round((value / base) * 100);
  }

  function buildFlexibleForecast({
    state,
    selectedMonth,
    currentMonthTransactions,
    previousMonthTransactions,
    isRequiredCategory,
  }) {
    const selectedIsPast = selectedMonth < getCurrentMonthValue();

    if (selectedIsPast) {
      return {
        total: 0,
        limitedRest: 0,
        historyRest: 0,
        paceRest: 0,
        currentFlexibleSpent: 0,
        currentFlexibleLimitedSpent: 0,
        currentFlexibleNoLimitSpent: 0,
        previousFlexibleNoLimitSpent: 0,
      };
    }

    const { elapsedDays, remainingDays } = getMonthDays(selectedMonth);

    const currentFlexibleByCategory = new Map();
    const previousFlexibleByCategory = new Map();

    function collectFlexibleExpense(map, transaction) {
      const type = String(transaction.type || "").toLowerCase();

      if (type !== "expense") return;

      const categoryId = getCategoryId(transaction);
      const required =
        typeof isRequiredCategory === "function"
          ? isRequiredCategory(categoryId)
          : false;

      if (required) return;

      const amount = toNumber(transaction.amount);

      if (amount <= 0) return;

      map.set(categoryId, roundToTwo((map.get(categoryId) || 0) + amount));
    }

    currentMonthTransactions.forEach((transaction) => {
      collectFlexibleExpense(currentFlexibleByCategory, transaction);
    });

    previousMonthTransactions.forEach((transaction) => {
      collectFlexibleExpense(previousFlexibleByCategory, transaction);
    });

        const categoryIds = new Set([
      ...currentFlexibleByCategory.keys(),
      ...previousFlexibleByCategory.keys(),
      ...getCategories(state).map((category) => category.id),
      ...getBudgetLimits(state).map((item) => getBudgetLimitCategoryId(item)),
    ]);

    let limitedRest = 0;
    let historyRest = 0;
    let paceBaseCurrentNoLimitSpent = 0;

    let currentFlexibleSpent = 0;
    let currentFlexibleLimitedSpent = 0;
    let currentFlexibleNoLimitSpent = 0;
    let previousFlexibleNoLimitSpent = 0;

    categoryIds.forEach((categoryId) => {
      const currentSpent = toNumber(currentFlexibleByCategory.get(categoryId));
      const previousSpent = toNumber(previousFlexibleByCategory.get(categoryId));
            const limit = getBudgetLimitForCategory(state, categoryId);

      if (currentSpent > 0) {
        currentFlexibleSpent += currentSpent;
      }

      if (limit > 0) {
        currentFlexibleLimitedSpent += currentSpent;
        limitedRest += Math.max(0, limit - currentSpent);
        return;
      }

      currentFlexibleNoLimitSpent += currentSpent;
      previousFlexibleNoLimitSpent += previousSpent;

      if (previousSpent > 0) {
        historyRest += Math.max(0, previousSpent - currentSpent);
      } else {
        paceBaseCurrentNoLimitSpent += currentSpent;
      }
    });

    const paceRest =
      elapsedDays > 0 && remainingDays > 0
        ? (paceBaseCurrentNoLimitSpent / elapsedDays) * remainingDays
        : 0;

    return {
      total: roundToTwo(limitedRest + historyRest + paceRest),
      limitedRest: roundToTwo(limitedRest),
      historyRest: roundToTwo(historyRest),
      paceRest: roundToTwo(paceRest),
      currentFlexibleSpent: roundToTwo(currentFlexibleSpent),
      currentFlexibleLimitedSpent: roundToTwo(currentFlexibleLimitedSpent),
      currentFlexibleNoLimitSpent: roundToTwo(currentFlexibleNoLimitSpent),
      previousFlexibleNoLimitSpent: roundToTwo(previousFlexibleNoLimitSpent),
    };
  }

  function getMonthStats(state, selectedMonth, isRequiredCategory) {
    const monthTransactions = getMonthTransactions(state, selectedMonth);
    const previousMonth = getPreviousMonthValue(selectedMonth);
    const previousMonthTransactions = getMonthTransactions(state, previousMonth);

    const calendarReserve = getCalendarReservedAmount(
      state,
      selectedMonth,
      monthTransactions
    );

    let income = 0;
    let requiredFactExpense = 0;
    let flexibleExpense = 0;

    monthTransactions.forEach((transaction) => {
      const amount = toNumber(transaction.amount);
      const type = String(transaction.type || "").toLowerCase();

      if (type === "income") {
        income += amount;
        return;
      }

      if (type !== "expense") return;

      const categoryId = getCategoryId(transaction);
      const required =
        typeof isRequiredCategory === "function"
          ? isRequiredCategory(categoryId)
          : false;

      if (required) {
        requiredFactExpense += amount;
      } else {
        flexibleExpense += amount;
      }
    });

    const flexibleForecast = buildFlexibleForecast({
      state,
      selectedMonth,
      currentMonthTransactions: monthTransactions,
      previousMonthTransactions,
      isRequiredCategory,
    });

    const totalFactExpense = requiredFactExpense + flexibleExpense;

    const forecastLeft =
      income -
      totalFactExpense -
      calendarReserve -
      flexibleForecast.total;

    return {
      income: roundToTwo(income),
      requiredFactExpense: roundToTwo(requiredFactExpense),
      flexibleExpense: roundToTwo(flexibleExpense),
      totalFactExpense: roundToTwo(totalFactExpense),
      calendarReserve: roundToTwo(calendarReserve),
      flexibleForecastRest: roundToTwo(flexibleForecast.total),
      flexibleForecast,
      forecastLeft: roundToTwo(forecastLeft),
    };
  }

  function formatSignedMoney(value, formatMoney) {
    const amount = roundToTwo(value);

    if (amount > 0) return `+${formatMoney(amount)}`;
    if (amount < 0) return `â${formatMoney(Math.abs(amount))}`;

    return formatMoney(0);
  }

  function getForecastStatus(stats) {
    if (stats.income <= 0) {
      return {
        status: "warn",
        title: "ÐÐ´ÑÐ¼ Ð´Ð¾ÑÐ¾Ð´",
        text: "ÐÐ¾ÑÐ»Ðµ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸ âÐÐ¾ÑÐ¾Ð´â Ð¿ÑÐ¾Ð³Ð½Ð¾Ð· ÑÑÐ°Ð½ÐµÑ Ð¿Ð¾Ð»ÐµÐ·Ð½ÐµÐµ.",
      };
    }

    if (stats.forecastLeft < 0) {
      return {
        status: "bad",
        title: "ÐÐµ ÑÐ²Ð°ÑÐ°ÐµÑ",
        text: "Ð Ð°ÑÑÐ¾Ð´Ñ Ð¸ ÐºÐ°Ð»ÐµÐ½Ð´Ð°ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸ ÑÐ¶Ðµ Ð´Ð°Ð²ÑÑ Ð½Ð° Ð¼ÐµÑÑÑ.",
      };
    }

    if (stats.forecastLeft <= stats.income * 0.05) {
      return {
        status: "warn",
        title: "ÐÐ¾ÑÑÐ¸ Ð² Ð½Ð¾Ð»Ñ",
        text: "ÐÐµÑÑÑ ÑÑÐ¾Ð´Ð¸ÑÑÑ, Ð½Ð¾ Ð·Ð°Ð¿Ð°Ñ ÑÐ¾Ð½ÐºÐ¸Ð¹.",
      };
    }

    return {
      status: "good",
      title: "ÐÑÑÑ Ð·Ð°Ð¿Ð°Ñ",
      text: "ÐÐµÑÑÑ Ð²ÑÐ³Ð»ÑÐ´Ð¸Ñ Ð¶Ð¸Ð²ÑÐ¼ Ð¿Ð¾ ÑÐµÐºÑÑÐ¸Ð¼ Ð´Ð°Ð½Ð½ÑÐ¼.",
    };
  }

  function getPaceStatus(stats, selectedMonth) {
    if (stats.income <= 0) {
      return {
        status: "muted",
        title: "ÐÐ´ÑÐ¼ Ð´Ð¾ÑÐ¾Ð´",
        text: "ÐÐ¾ÑÐ»Ðµ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸ âÐÐ¾ÑÐ¾Ð´â Ð¿Ð¾ÑÐ²Ð¸ÑÑÑ ÑÐµÐ¼Ð¿ Ð¼ÐµÑÑÑÐ°.",
      };
    }

    if (selectedMonth > getCurrentMonthValue()) {
      return {
        status: "muted",
        title: "ÐÐµÑÑÑ Ð²Ð¿ÐµÑÐµÐ´Ð¸",
        text: "Ð¢ÐµÐ¼Ð¿ Ð¿Ð¾ÑÐ²Ð¸ÑÑÑ, ÐºÐ¾Ð³Ð´Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¼ÐµÑÑÑ Ð½Ð°ÑÐ½ÑÑÑÑ.",
      };
    }

    const monthProgress = getMonthProgressPercent(selectedMonth);
    const occupiedPercent = getPercent(
      stats.totalFactExpense + stats.calendarReserve,
      stats.income
    );

    if (occupiedPercent > monthProgress + 12) {
      return {
        status: "bad",
        title: "Ð Ð°ÑÑÐ¾Ð´Ñ Ð²Ð¿ÐµÑÐµÐ´Ð¸",
        text: `ÐÑÐ¾ÑÐ»Ð¾ ${monthProgress}% Ð¼ÐµÑÑÑÐ°, Ð·Ð°Ð½ÑÑÐ¾ ${occupiedPercent}% Ð´Ð¾ÑÐ¾Ð´Ð°.`,
      };
    }

    if (occupiedPercent > monthProgress + 5) {
      return {
        status: "warn",
        title: "ÐÐ° Ð³ÑÐ°Ð½Ð¸",
        text: `ÐÑÐ¾ÑÐ»Ð¾ ${monthProgress}% Ð¼ÐµÑÑÑÐ°, Ð·Ð°Ð½ÑÑÐ¾ ${occupiedPercent}% Ð´Ð¾ÑÐ¾Ð´Ð°.`,
      };
    }

    return {
      status: "good",
      title: "Ð¢ÐµÐ¼Ð¿ Ð½Ð¾ÑÐ¼Ð°Ð»ÑÐ½ÑÐ¹",
      text: `ÐÑÐ¾ÑÐ»Ð¾ ${monthProgress}% Ð¼ÐµÑÑÑÐ°, Ð·Ð°Ð½ÑÑÐ¾ ${occupiedPercent}% Ð´Ð¾ÑÐ¾Ð´Ð°.`,
    };
  }

    function getForecastRingSegments(stats) {
    const flexibleForecast = stats.flexibleForecast || {};
    const irregularFlexible =
      toNumber(flexibleForecast.historyRest) + toNumber(flexibleForecast.paceRest);

    const occupied =
      stats.totalFactExpense +
      stats.calendarReserve +
      toNumber(flexibleForecast.limitedRest) +
      irregularFlexible;

    const free = Math.max(0, stats.income - occupied);
    const base = Math.max(stats.income, occupied, 1);

    return {
      occupied: roundToTwo(occupied),
      free: roundToTwo(free),
      deficit: roundToTwo(Math.max(0, occupied - stats.income)),
      base,
      items: [
        {
          key: "spent",
          label: "Ð£Ð¶Ðµ Ð¿Ð¾ÑÑÐ°ÑÐµÐ½Ð¾",
          value: roundToTwo(stats.totalFactExpense),
          note: `Ð¤Ð°ÐºÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð¼ÐµÑÑÑÐ°: Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ ${roundToTwo(stats.requiredFactExpense)} â½ + Ð³Ð¸Ð±ÐºÐ¸Ðµ ${roundToTwo(stats.flexibleExpense)} â½`,
          color: "rgba(239, 91, 79, 0.88)",
        },
        {
          key: "calendar",
          label: "ÐÐ°Ð»ÐµÐ½Ð´Ð°ÑÑ",
          value: roundToTwo(stats.calendarReserve),
          note: "ÐÐµÐ¾Ð¿Ð»Ð°ÑÐµÐ½Ð½ÑÐµ ÐºÐ°Ð»ÐµÐ½Ð´Ð°ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸",
          color: "rgba(242, 165, 26, 0.88)",
        },
        {
          key: "planned",
          label: "ÐÐ»Ð°Ð½ Ð³Ð¸Ð±ÐºÐ¸Ñ",
          value: roundToTwo(flexibleForecast.limitedRest || 0),
          note: "ÐÑÑÐ°ÑÐ¾Ðº Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² Ð¿Ð¾ Ð³Ð¸Ð±ÐºÐ¸Ð¼ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼",
          color: "rgba(47, 125, 246, 0.86)",
        },
        {
          key: "irregular",
          label: "ÐÐµÑÐµÐ³ÑÐ»ÑÑÐ½ÑÐµ",
          value: roundToTwo(irregularFlexible),
          note: "ÐÐ¸Ð±ÐºÐ¸Ðµ Ð±ÐµÐ· Ð»Ð¸Ð¼Ð¸ÑÐ°, Ð¾ÑÐ¸ÐµÐ½ÑÐ¸Ñ Ð¿Ð¾ Ð¿ÑÐ¾ÑÐ»Ð¾Ð¼Ñ Ð¼ÐµÑÑÑÑ",
          color: "rgba(139, 92, 246, 0.82)",
        },
        {
          key: "free",
          label: "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½Ð¾",
          value: roundToTwo(free),
          note: "ÐÑÑÐ°Ð½ÐµÑÑÑ Ð¿Ð¾ÑÐ»Ðµ Ð¿ÑÐ¾Ð³Ð½Ð¾Ð·Ð°",
          color: "rgba(21, 151, 107, 0.86)",
        },
      ].filter((item) => item.value > 0),
    };
  }

  function buildForecastRingGradient(items, base) {
    let cursor = 0;

    const parts = items.map((item) => {
      const size = Math.max(0, (item.value / base) * 100);
      const start = cursor;
      const end = Math.min(100, cursor + size);

      cursor = end;

      return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    });

    if (cursor < 100) {
      parts.push(`rgba(20, 24, 33, 0.075) ${cursor.toFixed(2)}% 100%`);
    }

    return `conic-gradient(${parts.join(", ")})`;
  }

  function renderForecastCard(stats, helpers) {
    const { formatMoney } = helpers;
    const forecast = getForecastStatus(stats);
    const ring = getForecastRingSegments(stats);
    const ringGradient = buildForecastRingGradient(ring.items, ring.base);
    const resultLabel = stats.forecastLeft < 0 ? "Ð½Ðµ ÑÐ²Ð°ÑÐ°ÐµÑ" : "Ð¾ÑÑÐ°Ð½ÐµÑÑÑ";
    const occupiedPercent = stats.income > 0
      ? Math.round((ring.occupied / stats.income) * 100)
      : 0;

    const resultText = stats.forecastLeft < 0
      ? `ÐÐ¾ÑÐ¾Ð´Ð° Ð½Ðµ ÑÐ²Ð°ÑÐ°ÐµÑ Ð½Ð° ${formatMoney(ring.deficit)}.`
      : `ÐÐ¾ÑÐ»Ðµ Ð²ÑÐµÑ ÑÑÑÑÐ½Ð½ÑÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð¾ÑÑÐ°Ð½ÐµÑÑÑ ${formatMoney(ring.free)}.`;

    return `
      <article class="analytics-forecast-ring-card analytics-forecast-ring-card--${forecast.status}">
        <div class="analytics-forecast-ring-card__head">
          <div>
            <h3>ÐÑÐ¾Ð³Ð½Ð¾Ð· Ð¼ÐµÑÑÑÐ°</h3>
            <p>${resultText}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${forecast.title}
          </div>
        </div>

        <div class="analytics-forecast-ring-layout">
          <div
            class="analytics-forecast-ring"
            style="--forecast-ring-gradient: ${ringGradient};"
            aria-hidden="true"
          >
            <div class="analytics-forecast-ring__center">
              <span>${resultLabel}</span>
              <strong>${formatSignedMoney(stats.forecastLeft, formatMoney)}</strong>
            </div>
          </div>

          <div class="analytics-forecast-ring-summary">
            <div>
              <span>ÐÐ¾ÑÐ¾Ð´</span>
              <strong>${formatMoney(stats.income)}</strong>
            </div>

            <div>
              <span>ÐÐ°Ð½ÑÑÐ¾</span>
              <strong>${formatMoney(ring.occupied)}</strong>
            </div>

            <div>
              <span>ÐÐ°Ð³ÑÑÐ·ÐºÐ°</span>
              <strong>${occupiedPercent}%</strong>
            </div>
          </div>
        </div>

        <div class="analytics-forecast-ring-list">
          ${ring.items
            .map((item) => {
              return `
                <div class="analytics-forecast-ring-row analytics-forecast-ring-row--${item.key}">
                  <span class="analytics-forecast-ring-row__dot" style="--dot-color: ${item.color};"></span>

                  <div class="analytics-forecast-ring-row__body">
                    <div class="analytics-forecast-ring-row__top">
                      <span>${item.label}</span>
                      <strong>${formatMoney(item.value)}</strong>
                    </div>

                    <p>${item.note}</p>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>
    `;
  }

  function renderProgressCard(stats, selectedMonth) {
    const pace = getPaceStatus(stats, selectedMonth);
    const monthProgress = getMonthProgressPercent(selectedMonth);

    const occupiedPercent =
      stats.income > 0
        ? getPercent(stats.totalFactExpense + stats.calendarReserve, stats.income)
        : 0;

    const occupiedWidth = Math.min(100, Math.max(0, occupiedPercent));

    return `
      <section class="analytics-savings-card analytics-savings-pace-card analytics-savings-pace-card--${pace.status}">
        <div class="analytics-savings-card__head">
          <div>
            <h3>Ð¢ÐµÐ¼Ð¿ Ð¼ÐµÑÑÑÐ°</h3>
            <p>${pace.text}</p>
          </div>

          <div class="analytics-savings-status-pill">
            ${pace.title}
          </div>
        </div>

        <div class="analytics-savings-pace-card__bars">
          <div class="analytics-savings-pace-line">
            <div class="analytics-savings-pace-line__top">
              <span>ÐÑÐ¾ÑÐ»Ð¾ Ð¼ÐµÑÑÑÐ°</span>
              <strong>${monthProgress}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${monthProgress}%"></i>
            </div>
          </div>

          <div class="analytics-savings-pace-line analytics-savings-pace-line--spent">
            <div class="analytics-savings-pace-line__top">
              <span>ÐÐ°Ð½ÑÑÐ¾ Ð´Ð¾ÑÐ¾Ð´Ð°</span>
              <strong>${occupiedPercent}%</strong>
            </div>
            <div class="analytics-savings-pace-line__bar">
              <i style="width:${occupiedWidth}%"></i>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAnalyticsSafeModels({
    state,
    selectedMonth,
    isRequiredCategory,
    formatMoney,
    escapeHtml,
  }) {
    const container = document.getElementById("analyticsSafeModelsList");

    if (!container) return;

    const helpers = {
      formatMoney: typeof formatMoney === "function" ? formatMoney : fallbackFormatMoney,
      escapeHtml: typeof escapeHtml === "function" ? escapeHtml : fallbackEscapeHtml,
    };

    const monthValue = selectedMonth || getCurrentMonthValue();
    const stats = getMonthStats(state, monthValue, isRequiredCategory);

    container.innerHTML = `
      <div class="analytics-savings-dashboard">
        ${renderForecastCard(stats, helpers)}
        ${renderProgressCard(stats, monthValue)}
      </div>
    `;
  }

  window.FinanceAppAnalyticsSafeModels = {
    renderAnalyticsSafeModels,
  };
})();


;/* ===== js/33-wallet-home-ui.js ===== */
(() => {
  function normalizeFreeMoneyText(rawText) {
    return String(rawText || "")
      .replace(/^Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½Ð¾\s*:\s*/i, "")
      .trim();
  }

  function syncFreeMoneyValue() {
    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (!valueEl) return;

    const normalizedValue = normalizeFreeMoneyText(valueEl.textContent);

    if (normalizedValue && normalizedValue !== valueEl.textContent.trim()) {
      valueEl.textContent = normalizedValue;
    }
  }

  function roundToTwo(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function getDateOnlyString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getTransactionDateKey(transaction) {
    const rawValue =
      transaction.date ||
      transaction.transaction_date ||
      transaction.operation_date ||
      transaction.created_date ||
      transaction.created_at ||
      transaction.createdAt ||
      "";

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

  function getCurrentMonthKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getPreviousMonthKey() {
    const now = new Date();
    const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const year = previousMonthDate.getFullYear();
    const month = String(previousMonthDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getComparableDayForMonth(monthKey) {
    const now = new Date();
    const currentDay = now.getDate();
    const [year, month] = String(monthKey).split("-").map(Number);

    if (!year || !month) return currentDay;

    const lastDayOfTargetMonth = new Date(year, month, 0).getDate();

    return Math.min(currentDay, lastDayOfTargetMonth);
  }

  function getMonthToDateTotal(type, monthKey) {
    const state = window.FinanceAppState?.state;

    if (!state || !Array.isArray(state.transactions)) return 0;

    const dayLimit = getComparableDayForMonth(monthKey);

    return roundToTwo(
      state.transactions.reduce((sum, transaction) => {
        if (transaction.type !== type) return sum;

        const dateKey = getTransactionDateKey(transaction);

        if (!dateKey) return sum;
        if (dateKey.slice(0, 7) !== monthKey) return sum;

        const day = Number(dateKey.slice(8, 10)) || 0;

        if (day < 1 || day > dayLimit) return sum;

        return sum + (Number(transaction.amount) || 0);
      }, 0)
    );
  }

  function getDeltaPercent(currentValue, previousValue) {
    const current = Number(currentValue) || 0;
    const previous = Number(previousValue) || 0;

    if (previous === 0 && current === 0) return 0;
    if (previous === 0 && current > 0) return 100;

    return ((current - previous) / previous) * 100;
  }

  function formatDeltaValue(deltaPercent) {
    const value = Math.abs(deltaPercent);

    const formatted = value.toLocaleString("ru-RU", {
      minimumFractionDigits: value % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 1,
    });

    if (deltaPercent > 0) return `â ${formatted}%`;
    if (deltaPercent < 0) return `â ${formatted}%`;

    return "0%";
  }

  function applyDeltaVisual(el, deltaPercent, type) {
    if (!el) return;

    el.classList.remove(
      "hard-month-stat__delta--neutral",
      "hard-month-stat__delta--good",
      "hard-month-stat__delta--bad"
    );

    if (deltaPercent === 0) {
      el.classList.add("hard-month-stat__delta--neutral");
      el.style.color = "";
      return;
    }

    const isGood =
      type === "income"
        ? deltaPercent > 0
        : deltaPercent < 0;

    el.classList.add(
      isGood
        ? "hard-month-stat__delta--good"
        : "hard-month-stat__delta--bad"
    );

    el.style.color = isGood
      ? "var(--hard-green, #15996c)"
      : "var(--hard-red, #f24949)";
  }

  function setTextIfChanged(el, nextText) {
    if (!el) return;

    if (el.textContent.trim() !== nextText) {
      el.textContent = nextText;
    }
  }

  function syncHardMonthDeltasToDate() {
    const incomeDeltaEl = document.getElementById("hardMonthIncomeDelta");
    const expenseDeltaEl = document.getElementById("hardMonthExpenseDelta");

    if (!incomeDeltaEl && !expenseDeltaEl) return;

    const currentMonth = getCurrentMonthKey();
    const previousMonth = getPreviousMonthKey();

    const currentIncome = getMonthToDateTotal("income", currentMonth);
    const previousIncome = getMonthToDateTotal("income", previousMonth);

    const currentExpense = getMonthToDateTotal("expense", currentMonth);
    const previousExpense = getMonthToDateTotal("expense", previousMonth);

    const incomeDelta = getDeltaPercent(currentIncome, previousIncome);
    const expenseDelta = getDeltaPercent(currentExpense, previousExpense);

    if (incomeDeltaEl) {
      setTextIfChanged(incomeDeltaEl, formatDeltaValue(incomeDelta));
      applyDeltaVisual(incomeDeltaEl, incomeDelta, "income");
    }

    if (expenseDeltaEl) {
      setTextIfChanged(expenseDeltaEl, formatDeltaValue(expenseDelta));
      applyDeltaVisual(expenseDeltaEl, expenseDelta, "expense");
    }
  }
  


function openHardModal(modal) {
  if (!modal) return;

  modal.classList.remove("hidden", "is-closing");

  requestAnimationFrame(() => {
    modal.classList.add("is-visible");
  });
}

function closeHardModal(modal) {
  if (!modal) return;

  modal.classList.remove("is-visible");
  modal.classList.add("is-closing");

  window.setTimeout(() => {
    modal.classList.remove("is-closing");
    modal.classList.add("hidden");
  }, 260);
}

function getRenderedAccountCards() {
  return Array.from(
    document.querySelectorAll("#accountsList .list-card")
  );
}

function getAccountCardText(card, selector, fallback = "") {
  return card.querySelector(selector)?.textContent?.trim() || fallback;
}

function parseMoneyFromText(rawText) {
  return Number(
    String(rawText || "")
      .replace(/\s/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "")
  ) || 0;
}

function formatMoneyCompact(value) {
  const number = roundToTwo(value);

  return `${number.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} â½`;
}

function createMoneyAccountIcon(card, index = 0) {
  const iconWrap = document.createElement("span");
  iconWrap.className = "money-accounts-row__icon";
  iconWrap.dataset.accountIndex = String(index);

  const sourceSvg = card.querySelector(".list-icon--account svg");

  if (sourceSvg) {
    const svg = sourceSvg.cloneNode(true);
    svg.removeAttribute("class");
    iconWrap.appendChild(svg);
    return iconWrap;
  }

  iconWrap.textContent = "â½";
  return iconWrap;
}

function renderMoneyAccountsModalList() {
  const list = document.getElementById("moneyAccountsList");
  const totalEl = document.getElementById("moneyAccountsTotalValue");
  const countEl = document.getElementById("moneyAccountsCountValue");

  if (!list) return;

  const cards = getRenderedAccountCards();

  const total = cards.reduce((sum, card) => {
    const value = getAccountCardText(card, ".list-value", "0 â½");
    return sum + parseMoneyFromText(value);
  }, 0);

  if (totalEl) {
    totalEl.textContent = formatMoneyCompact(total);
  }

  if (countEl) {
    countEl.textContent = String(cards.length);
  }

  if (!cards.length) {
    list.innerHTML = `
      <div class="money-accounts-empty">
        Ð¡ÑÐµÑÐ° ÐµÑÑ Ð½Ðµ Ð·Ð°Ð³ÑÑÐ·Ð¸Ð»Ð¸ÑÑ
      </div>
    `;
    return;
  }

  list.innerHTML = "";

  cards.forEach((card, index) => {
    const title = getAccountCardText(card, ".list-title", "Ð¡ÑÑÑ");
    const subtitle = getAccountCardText(card, ".list-subtitle", "");
    const value = getAccountCardText(card, ".list-value", "0 â½");

    const row = document.createElement("button");
    row.type = "button";
    row.className = "money-accounts-row";
    row.dataset.accountIndex = String(index);

    const icon = createMoneyAccountIcon(card, index);

    const nameWrap = document.createElement("span");
    nameWrap.className = "money-accounts-row__name";

    const titleEl = document.createElement("strong");
    titleEl.textContent = title;

    nameWrap.appendChild(titleEl);

    if (subtitle) {
      const subtitleEl = document.createElement("span");
      subtitleEl.textContent = subtitle;
      nameWrap.appendChild(subtitleEl);
    }

    const valueEl = document.createElement("strong");
    valueEl.className = "money-accounts-row__value";
    valueEl.textContent = value;

    const chevron = document.createElement("span");
    chevron.className = "money-accounts-row__chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "âº";

    row.appendChild(icon);
    row.appendChild(nameWrap);
    row.appendChild(valueEl);
    row.appendChild(chevron);

    row.addEventListener("click", () => {
      const modal = document.getElementById("moneyAccountsModal");

      closeHardModal(modal);

      window.setTimeout(() => {
        const freshCards = getRenderedAccountCards();
        const targetCard = freshCards[index];

        if (targetCard) {
          targetCard.click();
        }
      }, 180);
    });

    list.appendChild(row);
  });
}

function initMoneyAccountsModal() {
  const hero = document.getElementById("walletGameHero");
  const modal = document.getElementById("moneyAccountsModal");
  const closeBtn = document.getElementById("closeMoneyAccountsModalBtn");
  const addBtn = document.getElementById("moneyAccountsAddBtn");
  const accountsList = document.getElementById("accountsList");

  if (!hero || !modal) return;

  hero.setAttribute("role", "button");
  hero.setAttribute("tabindex", "0");
  hero.setAttribute("aria-label", "ÐÑÐºÑÑÑÑ Ð²ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸");

  function openMoneyModal() {
    renderMoneyAccountsModalList();
    openHardModal(modal);
  }

  hero.addEventListener("click", (event) => {
    if (event.target.closest("#openMonthlyReportBtn")) return;

    openMoneyModal();
  });

  hero.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    openMoneyModal();
  });

  closeBtn?.addEventListener("click", () => {
    closeHardModal(modal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeHardModal(modal);
    }
  });

  addBtn?.addEventListener("click", () => {
    closeHardModal(modal);

    window.setTimeout(() => {
      document.getElementById("openCreateAccountModalBtn")?.click();
    }, 180);
  });

  if (accountsList) {
    const observer = new MutationObserver(() => {
      if (!modal.classList.contains("hidden")) {
        renderMoneyAccountsModalList();
      }
    });

    observer.observe(accountsList, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}

function splitExpectedIncomeDetails(rawText) {
  const text = String(rawText || "").trim();

  if (!text || text === "ÐÐ¶Ð¸Ð´Ð°Ð½Ð¸Ðµ Ð¿Ð¾ÐºÐ° Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾") {
    return {
      value: "0 â½",
      note: "ÐÐ¶Ð¸Ð´Ð°Ð½Ð¸Ðµ Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾",
    };
  }

  const parts = text
    .split(/\s*[Â·â¢]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  let value = parts[0] || text;
  let note = parts.slice(1).join(" Â· ");

  value = value
    .replace(/^Ð¼Ð¸Ð½Ð¸Ð¼ÑÐ¼\s+/i, "")
    .replace(/^Ð¾Ð¶Ð¸Ð´Ð°ÐµÑÑÑ\s+Ð¼Ð¸Ð½Ð¸Ð¼ÑÐ¼\s+/i, "")
    .replace(/^Ð¶Ð´Ñ\s+/i, "")
    .trim();

  if (!note) {
    const dateMatch = text.match(/\b\d{1,2}\s+[Ð°-ÑÑ]+\.?\b/i);

    if (dateMatch) {
      note = dateMatch[0].replace(".", "");
    }
  }

  return {
    value: value || "0 â½",
    note: note || "ÐÐ»Ð¸Ð¶Ð°Ð¹ÑÐ¸Ð¹ Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÐ¹ Ð´Ð¾ÑÐ¾Ð´",
  };
}

function syncUpcomingDetailsModal() {
  const incomeLabelSource = document.getElementById("walletExpectedIncomeLabel");
  const incomeValueSource = document.getElementById("walletExpectedIncomeValue");
  const mandatoryValueSource = document.getElementById("analyticsPendingMandatoryValue");
  const mandatoryTotalSource = document.getElementById("analyticsMandatoryTotalValue");
  const mandatoryCoveredSource = document.getElementById("analyticsMandatoryCoveredValue");
  const remainingLimitsSource = document.getElementById("analyticsRemainingBudgetsValue");
  const mandatoryControlSource = document.getElementById("walletMandatoryControlValue");

  const incomeLabelTarget = document.getElementById("upcomingDetailsIncomeLabel");
  const incomeValueTarget = document.getElementById("upcomingDetailsIncomeValue");
  const mandatoryValueTarget = document.getElementById("upcomingDetailsMandatoryValue");
  const mandatoryTotalTarget = document.getElementById("upcomingDetailsMandatoryTotalValue");
  const mandatoryCoveredTarget = document.getElementById("upcomingDetailsMandatoryCoveredValue");
  const remainingLimitsTarget = document.getElementById("upcomingDetailsRemainingLimitsValue");
  const mandatoryControlTarget = document.getElementById("upcomingDetailsMandatoryControlValue");

  if (incomeValueSource) {
  const expectedDetails = splitExpectedIncomeDetails(incomeValueSource.textContent);

  if (incomeValueTarget) {
    incomeValueTarget.textContent = expectedDetails.value;
  }

  if (incomeLabelTarget) {
    incomeLabelTarget.textContent = expectedDetails.note;
  }
}

  if (mandatoryValueTarget && mandatoryValueSource) {
    mandatoryValueTarget.textContent = mandatoryValueSource.textContent.trim() || "0 â½";
  }

  if (mandatoryTotalTarget && mandatoryTotalSource) {
    mandatoryTotalTarget.textContent = mandatoryTotalSource.textContent.trim() || "0 â½";
  }

  if (mandatoryCoveredTarget && mandatoryCoveredSource) {
    mandatoryCoveredTarget.textContent = mandatoryCoveredSource.textContent.trim() || "0 â½";
  }

  if (remainingLimitsTarget && remainingLimitsSource) {
    remainingLimitsTarget.textContent = remainingLimitsSource.textContent.trim() || "0 â½";
  }

  if (mandatoryControlTarget && mandatoryControlSource) {
    mandatoryControlTarget.textContent = mandatoryControlSource.textContent.trim() || "0%";
  }
}

function initUpcomingDetailsModal() {
  const upcomingCard = document.querySelector(".hard-upcoming-card");
  const modal = document.getElementById("upcomingDetailsModal");
  const closeBtn = document.getElementById("closeUpcomingDetailsModalBtn");
  const incomeBtn = document.getElementById("upcomingDetailsIncomeBtn");
  const mandatoryBtn = document.getElementById("upcomingDetailsMandatoryBtn");

  if (!upcomingCard || !modal) return;

  function openUpcomingModal() {
    syncUpcomingDetailsModal();
    openHardModal(modal);
  }

  upcomingCard.setAttribute("role", "button");
  upcomingCard.setAttribute("tabindex", "0");
  upcomingCard.setAttribute("aria-label", "ÐÑÐºÑÑÑÑ Ð±Ð»Ð¸Ð¶Ð°Ð¹ÑÐµÐµ");

  upcomingCard.addEventListener("click", () => {
  openUpcomingModal();
});

  upcomingCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    openUpcomingModal();
  });

  closeBtn?.addEventListener("click", () => {
    closeHardModal(modal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeHardModal(modal);
    }
  });

  incomeBtn?.addEventListener("click", () => {
    closeHardModal(modal);

    window.setTimeout(() => {
      document.getElementById("openExpectedIncomeModalBtn")?.click();
    }, 180);
  });

  mandatoryBtn?.addEventListener("click", () => {
    closeHardModal(modal);

    window.setTimeout(() => {
      document.getElementById("openMandatoryPaymentsModalBtn")?.click();
    }, 180);
  });

  const observedNodes = [
    document.getElementById("walletExpectedIncomeLabel"),
    document.getElementById("walletExpectedIncomeValue"),
    document.getElementById("analyticsPendingMandatoryValue"),
    document.getElementById("analyticsMandatoryTotalValue"),
    document.getElementById("analyticsMandatoryCoveredValue"),
    document.getElementById("analyticsRemainingBudgetsValue"),
    document.getElementById("walletMandatoryControlValue"),
  ].filter(Boolean);

  const observer = new MutationObserver(() => {
    if (!modal.classList.contains("hidden")) {
      syncUpcomingDetailsModal();
    }
  });

  observedNodes.forEach((node) => {
    observer.observe(node, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  });
}

  document.addEventListener("DOMContentLoaded", () => {
    syncFreeMoneyValue();
    syncHardMonthDeltasToDate();
    initMoneyAccountsModal();
    initUpcomingDetailsModal();

    const valueEl = document.getElementById("balanceFreeMoneyValue");

    if (valueEl) {
      const freeMoneyObserver = new MutationObserver(() => {
        syncFreeMoneyValue();
      });

      freeMoneyObserver.observe(valueEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    /*
      ÐÐÐÐÐ:
      ÐÐ°Ð±Ð»ÑÐ´Ð°ÐµÐ¼ ÑÐ¾Ð»ÑÐºÐ¾ Ð·Ð° Ð¸ÑÑÐ¾Ð´Ð½ÑÐ¼Ð¸ ÑÑÐ¼Ð¼Ð°Ð¼Ð¸ Ð´Ð¾ÑÐ¾Ð´Ð°/ÑÐ°ÑÑÐ¾Ð´Ð°.
      ÐÐ Ð½Ð°Ð±Ð»ÑÐ´Ð°ÐµÐ¼ Ð·Ð° hardMonthIncomeDelta / hardMonthExpenseDelta,
      Ð¿Ð¾ÑÐ¾Ð¼Ñ ÑÑÐ¾ Ð¼Ñ ÑÐ°Ð¼Ð¸ Ð¼ÐµÐ½ÑÐµÐ¼ Ð¸Ñ ÑÐµÐºÑÑ.
    */
    const sourceNodes = [
      document.getElementById("hardMonthIncomeValue"),
      document.getElementById("hardMonthExpenseValue"),
    ].filter(Boolean);

    const hardMonthObserver = new MutationObserver(() => {
      syncHardMonthDeltasToDate();
    });

    sourceNodes.forEach((node) => {
      hardMonthObserver.observe(node, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });

    window.setTimeout(syncHardMonthDeltasToDate, 300);
    window.setTimeout(syncHardMonthDeltasToDate, 900);
  });
})();


;/* ===== js/34-wallet-calendar-summary.js ===== */
(() => {
  function parseMoneyText(text) {
    return Number(
      String(text || "")
        .replace(/\s/g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")
    ) || 0;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function syncMandatoryControlPercent() {
    const totalEl = document.getElementById("analyticsMandatoryTotalValue");
    const pendingEl = document.getElementById("analyticsPendingMandatoryValue");
    const controlEl = document.getElementById("walletMandatoryControlValue");
    const controlCard = controlEl?.closest(".required-payment-card--control");

    if (!totalEl || !pendingEl || !controlEl) return;

    const total = parseMoneyText(totalEl.textContent);
    const pending = parseMoneyText(pendingEl.textContent);

    const covered = total > 0
      ? clamp(((total - pending) / total) * 100, 0, 100)
      : 0;

    const rounded = Math.round(covered);

    controlEl.textContent = `${rounded}%`;

    if (controlCard) {
      controlCard.style.setProperty("--mandatory-control-progress", `${rounded}%`);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncMandatoryControlPercent();

    const observedNodes = [
      document.getElementById("analyticsMandatoryTotalValue"),
      document.getElementById("analyticsPendingMandatoryValue"),
      document.getElementById("analyticsMandatoryCoveredValue"),
    ].filter(Boolean);

    const observer = new MutationObserver(syncMandatoryControlPercent);

    observedNodes.forEach((node) => {
      observer.observe(node, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  });
})();


;/* ===== js/35-account-balance-adjustments-ui.js ===== */
(() => {
  const META_KEY = "account_balance_adjustments_v1";

  const SELECTORS = {
    accountsList: "#accountsList",
    accountCard: ".list-card",
  };

  let activeAccountId = null;
  let isAccountSavePassThrough = false;

  function $(id) {
    return document.getElementById(id);
  }

  function getState() {
    return window.FinanceAppState?.state || null;
  }

  function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;

    try {
      if (typeof supabaseClient !== "undefined") {
        return supabaseClient;
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function parseMoneyInput(rawValue) {
    return Number(
      String(rawValue || "")
        .replace(/\s/g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")
    ) || 0;
  }

  function formatMoneyInputValue(value) {
    const rounded = roundToTwo(value);

    return String(rounded).replace(".", ",");
  }

  function getAccountById(accountId) {
    const state = getState();

    if (!state || !Array.isArray(state.accounts)) return null;

    return state.accounts.find((account) => account.id === accountId) || null;
  }

  function getRawAccountBalance(accountId) {
    const state = getState();
    const account = getAccountById(accountId);

    if (!state || !account) return 0;

    const accountName = account.name;

    return roundToTwo(
      state.transactions.reduce((sum, transaction) => {
        const amount = roundToTwo(Number(transaction.amount) || 0);

        if (transaction.type === "income") {
          const matchesById =
            transaction.account_id && transaction.account_id === accountId;

          const matchesLegacy =
            !transaction.account_id && transaction.account === accountName;

          if (matchesById || matchesLegacy) {
            return sum + amount;
          }
        }

        if (transaction.type === "expense") {
          const matchesById =
            transaction.account_id && transaction.account_id === accountId;

          const matchesLegacy =
            !transaction.account_id && transaction.account === accountName;

          if (matchesById || matchesLegacy) {
            return sum - amount;
          }
        }

        if (transaction.type === "transfer") {
          const fromMatchesById =
            transaction.from_account_id && transaction.from_account_id === accountId;

          const fromMatchesLegacy =
            !transaction.from_account_id && transaction.from_account === accountName;

          const toMatchesById =
            transaction.to_account_id && transaction.to_account_id === accountId;

          const toMatchesLegacy =
            !transaction.to_account_id && transaction.to_account === accountName;

          if (fromMatchesById || fromMatchesLegacy) {
            sum -= amount;
          }

          if (toMatchesById || toMatchesLegacy) {
            sum += amount;
          }
        }

        return sum;
      }, 0)
    );
  }

  function getManualAdjustment(accountId) {
    const state = getState();

    return window.FinanceAppAccountBalanceAdjustments
      ?.getAccountManualAdjustment(state, accountId) || 0;
  }

  function getCorrectedAccountBalance(accountId) {
    return roundToTwo(getRawAccountBalance(accountId) + getManualAdjustment(accountId));
  }

  function setLocalAdjustment(accountId, adjustment) {
    const state = getState();

    window.FinanceAppAccountBalanceAdjustments
      ?.setAccountManualAdjustmentLocal(state, accountId, adjustment);
  }

  async function saveAdjustmentsToSupabase() {
    const state = getState();
    const client = getSupabaseClient();

    if (!client) {
      throw new Error("Supabase client Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½");
    }

    const adjustments =
      window.FinanceAppAccountBalanceAdjustments
        ?.getAccountBalanceAdjustments(state) || {};

    const serialized = JSON.stringify(adjustments);

    const { error } = await client
      .from("app_meta")
      .upsert(
        {
          key: META_KEY,
          value: serialized,
        },
        {
          onConflict: "key",
        }
      );

    if (error) {
      throw error;
    }

    try {
      window.localStorage.setItem(META_KEY, serialized);
    } catch (error) {
      // ÐÐµ ÐºÑÐ¸ÑÐ¸ÑÐ½Ð¾.
    }
  }

  function ensureAccountBalanceField() {
    const accountModal = $("accountModal");
    const accountNameInput = $("accountNameInput");

    if (!accountModal || !accountNameInput) return null;

    let field = $("accountModalBalanceField");

    if (field) return field;

    field = document.createElement("div");
    field.className = "account-modal-balance-field hidden";
    field.id = "accountModalBalanceField";

    field.innerHTML = `
      <div class="account-modal-balance-field__label">
        ÐÐ°Ð»Ð°Ð½Ñ
      </div>

      <div class="account-modal-balance-field__control">
        <input
          class="input account-modal-balance-field__input"
          id="accountModalBalanceInput"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          placeholder="0"
        />

        <span class="account-modal-balance-field__symbol">â½</span>
      </div>
    `;

    const nameField =
      accountNameInput.closest(".field") ||
      accountNameInput.parentElement;

    if (nameField) {
      nameField.insertAdjacentElement("afterend", field);
    }

    return field;
  }

  function syncAccountBalanceField() {
    const field = ensureAccountBalanceField();
    const input = $("accountModalBalanceInput");
    const account = getAccountById(activeAccountId);

    if (!field || !input) return;

    if (!account) {
      field.classList.add("hidden");
      input.value = "";
      return;
    }

    field.classList.remove("hidden");
    input.value = formatMoneyInputValue(getCorrectedAccountBalance(account.id));
  }

  function bindAccountCards() {
    const state = getState();
    const accountsList = document.querySelector(SELECTORS.accountsList);

    if (!state || !accountsList || !Array.isArray(state.accounts)) return;

    const cards = Array.from(accountsList.querySelectorAll(SELECTORS.accountCard));

    cards.forEach((card, index) => {
      const account = state.accounts[index];

      if (!account || !account.id) return;

      card.dataset.accountId = account.id;

      if (card.dataset.accountBalanceInlineBound === "true") return;

      card.dataset.accountBalanceInlineBound = "true";

      card.addEventListener(
        "click",
        () => {
          activeAccountId = card.dataset.accountId || account.id;
        },
        true
      );
    });
  }

  function watchAccountsList() {
    const accountsList = document.querySelector(SELECTORS.accountsList);

    if (!accountsList) return;

    bindAccountCards();

    const observer = new MutationObserver(() => {
      bindAccountCards();
    });

    observer.observe(accountsList, {
      childList: true,
      subtree: true,
    });
  }

  function watchAccountModal() {
    const accountModal = $("accountModal");

    if (!accountModal) return;

    const observer = new MutationObserver(() => {
      if (!accountModal.classList.contains("hidden")) {
        window.requestAnimationFrame(syncAccountBalanceField);
      } else {
        activeAccountId = null;
      }
    });

    observer.observe(accountModal, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  async function saveInlineAccountBalanceBeforeAccountSave(event) {
    if (isAccountSavePassThrough) return;

    const accountModal = $("accountModal");
    const input = $("accountModalBalanceInput");
    const saveBtn = $("saveAccountModalBtn");

    if (!accountModal || !input || !saveBtn) return;
    if (accountModal.classList.contains("hidden")) return;

    const account = getAccountById(activeAccountId);

    if (!account) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const desiredBalance = parseMoneyInput(input.value);
    const rawBalance = getRawAccountBalance(account.id);
    const replacementAdjustment = roundToTwo(desiredBalance - rawBalance);

    try {
      setLocalAdjustment(account.id, replacementAdjustment);
      await saveAdjustmentsToSupabase();

      isAccountSavePassThrough = true;
      saveBtn.click();
      isAccountSavePassThrough = false;
    } catch (error) {
      isAccountSavePassThrough = false;
      alert(`ÐÐµ Ð¿Ð¾Ð»ÑÑÐ¸Ð»Ð¾ÑÑ ÑÐ¾ÑÑÐ°Ð½Ð¸ÑÑ Ð±Ð°Ð»Ð°Ð½Ñ ÑÑÑÑÐ°: ${error.message || error}`);
    }
  }

  function bindAccountSaveButton() {
    const saveBtn = $("saveAccountModalBtn");

    if (!saveBtn || saveBtn.dataset.accountBalanceInlineBound === "true") return;

    saveBtn.dataset.accountBalanceInlineBound = "true";

    saveBtn.addEventListener(
      "click",
      saveInlineAccountBalanceBeforeAccountSave,
      true
    );
  }

  function boot() {
    ensureAccountBalanceField();
    watchAccountsList();
    watchAccountModal();
    bindAccountSaveButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();


;/* ===== script.js ===== */
document.addEventListener("DOMContentLoaded", async () => {
  /* =========================================================
     01. DOM REFERENCES
     ========================================================= */
  const {
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
  } = window.FinanceAppDom.getRefs();
  const analyticsRangeDock = document.getElementById("analyticsRangeDock");
const analyticsRangeDockTitle = document.getElementById("analyticsRangeDockTitle");
const analyticsRangeDockStartLabel = document.getElementById("analyticsRangeDockStartLabel");
const analyticsRangeDockEndLabel = document.getElementById("analyticsRangeDockEndLabel");
const analyticsRangeStartBtn = document.getElementById("analyticsRangeStartBtn");
const analyticsRangeEndBtn = document.getElementById("analyticsRangeEndBtn");
const analyticsRangeCalendar = document.getElementById("analyticsRangeCalendar");
const analyticsRangeCalendarTitle = document.getElementById("analyticsRangeCalendarTitle");
const analyticsRangeCalendarGrid = document.getElementById("analyticsRangeCalendarGrid");
const analyticsRangeCalendarPrevBtn = document.getElementById("analyticsRangeCalendarPrevBtn");
const analyticsRangeCalendarNextBtn = document.getElementById("analyticsRangeCalendarNextBtn");
const analyticsRangeDockCloseBtn = document.getElementById("analyticsRangeDockCloseBtn");
const analyticsRangeDockResetBtn = document.getElementById("analyticsRangeDockResetBtn");
const analyticsRangeDockApplyBtn = document.getElementById("analyticsRangeDockApplyBtn");
const analyticsRangeMonthsStrip = document.getElementById("analyticsRangeMonthsStrip");
const analyticsRangeSelectedLabel = document.getElementById("analyticsRangeSelectedLabel");
const analyticsRangeDaysStrip = document.getElementById("analyticsRangeDaysStrip");
const analyticsRailRangeBtn = document.getElementById("analyticsRailRangeBtn");

const openMonthlyReportBtn = document.getElementById("openMonthlyReportBtn");
const closeMonthlyReportBtn = document.getElementById("closeMonthlyReportBtn");
const printMonthlyReportBtn = document.getElementById("printMonthlyReportBtn");
const copyMonthlyReportBtn = document.getElementById("copyMonthlyReportBtn");
const monthlyReportView = document.getElementById("monthlyReportView");

const monthlyReportHero = document.querySelector(".monthly-report-hero");
const monthlyReportMonthSwitch = document.getElementById("monthlyReportMonthSwitch");

const monthlyReportMonthLabel = document.getElementById("monthlyReportMonthLabel");
const monthlyReportResultValue = document.getElementById("monthlyReportResultValue");
const monthlyReportResultText = document.getElementById("monthlyReportResultText");

const monthlyReportIncomeValue = document.getElementById("monthlyReportIncomeValue");
const monthlyReportExpenseValue = document.getElementById("monthlyReportExpenseValue");
const monthlyReportDifferenceValue = document.getElementById("monthlyReportDifferenceValue");

const monthlyReportIncomeFlowValue = document.getElementById("monthlyReportIncomeFlowValue");
const monthlyReportExpenseFlowValue = document.getElementById("monthlyReportExpenseFlowValue");
const monthlyReportIncomeBar = document.getElementById("monthlyReportIncomeBar");
const monthlyReportExpenseBar = document.getElementById("monthlyReportExpenseBar");

const monthlyReportInsightTitle = document.getElementById("monthlyReportInsightTitle");
const monthlyReportInsightText = document.getElementById("monthlyReportInsightText");

const monthlyReportTopCategoryName = document.getElementById("monthlyReportTopCategoryName");
const monthlyReportTopCategoryValue = document.getElementById("monthlyReportTopCategoryValue");
const monthlyReportWeeksList = document.getElementById("monthlyReportWeeksList");

const monthlyReportRepeatName = document.getElementById("monthlyReportRepeatName");
const monthlyReportRepeatValue = document.getElementById("monthlyReportRepeatValue");

const monthlyReportBalanceValue = document.getElementById("monthlyReportBalanceValue");
const monthlyReportFreeValue = document.getElementById("monthlyReportFreeValue");

const monthlyReportSavingsNetValue = document.getElementById("monthlyReportSavingsNetValue");
const monthlyReportSavingsDepositValue = document.getElementById("monthlyReportSavingsDepositValue");
const monthlyReportSavingsInterestValue = document.getElementById("monthlyReportSavingsInterestValue");
const monthlyReportSavingsWithdrawalsValue = document.getElementById("monthlyReportSavingsWithdrawalsValue");

const monthlyReportFocusTitle = document.getElementById("monthlyReportFocusTitle");
const monthlyReportFocusText = document.getElementById("monthlyReportFocusText");

const monthlyReportAchievementsList = document.getElementById("monthlyReportAchievementsList");

  const {
    bindMoneyInput,
    parseMoneyInputValue,
  } = window.FinanceAppMoney;

  const {
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
  } = window.FinanceAppFormatDate;

  const {
    MODAL_ANIMATION_MS,
    openAnimatedModal,
    closeAnimatedModal,
  } = window.FinanceAppModalCore;

  const {
    setNativePickerVisibility,
    openNativePicker,
  } = window.FinanceAppNativePicker;

  const {
    UNCATEGORIZED_ID,
    state,
  } = window.FinanceAppState;


const FAQ_CONTENT = {
  free_money: {
    title: "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸",
    text: "ÐÐµÐ½ÑÐ³Ð¸, ÐºÐ¾ÑÐ¾ÑÑÐ¼Ð¸ Ð¼Ð¾Ð¶Ð½Ð¾ Ð¿Ð¾Ð»ÑÐ·Ð¾Ð²Ð°ÑÑÑÑ Ð±ÐµÐ· ÑÐ¸ÑÐºÐ° Ð·Ð°Ð´ÐµÑÑ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸, Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð¸ Ð·Ð°ÑÐ¸ÑÑÐ½Ð½ÑÐµ ÑÑÐ¼Ð¼Ñ.",
    formula: "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½Ð¾ = Ð´Ð¾ÑÑÑÐ¿Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸ â Ð·Ð°ÑÐ¸ÑÑÐ½Ð½ÑÐµ ÑÑÐ¼Ð¼Ñ",
  },

  protected_money: {
    title: "ÐÐ°ÑÐ¸ÑÑÐ½Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸",
    text: "ÐÐµÐ½ÑÐ³Ð¸, ÐºÐ¾ÑÐ¾ÑÑÐµ Ð»ÑÑÑÐµ Ð½Ðµ ÑÑÐ°ÑÐ¸ÑÑ ÑÐ»ÑÑÐ°Ð¹Ð½Ð¾: ÑÐµÐ·ÐµÑÐ²Ñ, Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ, Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸ Ð¸ Ð´ÑÑÐ³Ð¸Ðµ Ð¾ÑÐ»Ð¾Ð¶ÐµÐ½Ð½ÑÐµ ÑÑÐ¼Ð¼Ñ.",
    formula: "ÐÐ°ÑÐ¸ÑÑÐ½Ð½ÑÐµ = ÑÐµÐ·ÐµÑÐ²Ñ + Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ + Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÑÑÐ²Ð°",
  },

  remaining_limits: {
    title: "ÐÑÑÐ°ÑÐ¾Ðº Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð²",
    text: "Ð¡ÐºÐ¾Ð»ÑÐºÐ¾ ÐµÑÑ Ð¼Ð¾Ð¶Ð½Ð¾ Ð¿Ð¾ÑÑÐ°ÑÐ¸ÑÑ Ð¿Ð¾ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼ Ñ Ð»Ð¸Ð¼Ð¸ÑÐ°Ð¼Ð¸ Ð² ÑÐµÐºÑÑÐµÐ¼ Ð¼ÐµÑÑÑÐµ.",
    formula: "ÐÑÑÐ°ÑÐ¾Ðº Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² = Ð»Ð¸Ð¼Ð¸ÑÑ â ÑÐ¶Ðµ Ð¿Ð¾ÑÑÐ°ÑÐµÐ½Ð¾",
  },

  can_save_now: {
    title: "ÐÐ¾Ð¶Ð½Ð¾ Ð¾ÑÐ»Ð¾Ð¶Ð¸ÑÑ",
    text: "Ð¡ÑÐ¼Ð¼Ð°, ÐºÐ¾ÑÐ¾ÑÑÑ Ð¼Ð¾Ð¶Ð½Ð¾ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ Ð¾ÑÐ¿ÑÐ°Ð²Ð¸ÑÑ Ð² Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð¿ÑÑÐ¼Ð¾ ÑÐµÐ¹ÑÐ°Ñ, Ð½Ðµ Ð»Ð¾Ð¼Ð°Ñ ÑÐµÐºÑÑÐ¸Ð¹ Ð¼ÐµÑÑÑ.",
    formula: "ÐÐ¾Ð¶Ð½Ð¾ Ð¾ÑÐ»Ð¾Ð¶Ð¸ÑÑ = ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾ â ÑÐ°Ð±Ð¾ÑÐ¸Ð¹ Ð·Ð°Ð¿Ð°Ñ",
  },
};

function openFaqModal(key) {
  const faq = FAQ_CONTENT[key];

  if (!faqModal || !faq) return;

  faqModalTitle.textContent = faq.title;
  faqModalText.textContent = faq.text;

  if (faq.formula) {
    faqModalFormula.textContent = faq.formula;
    faqModalFormula.classList.remove("hidden");
  } else {
    faqModalFormula.textContent = "";
    faqModalFormula.classList.add("hidden");
  }

  faqModal.classList.remove("hidden", "is-closing");

  requestAnimationFrame(() => {
    faqModal.classList.add("is-visible");
  });
}

function closeFaqModal() {
  if (!faqModal) return;

  faqModal.classList.remove("is-visible");
  faqModal.classList.add("is-closing");

  setTimeout(() => {
    faqModal.classList.remove("is-closing");
    faqModal.classList.add("hidden");
  }, MODAL_ANIMATION_MS);
}

faqButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    openFaqModal(button.dataset.faqKey);
  });
});

closeFaqModalBtn?.addEventListener("click", closeFaqModal);

faqModal?.addEventListener("click", (event) => {
  if (event.target === faqModal) {
    closeFaqModal();
  }
});


bindMoneyInput(amountInput);
bindMoneyInput(budgetAmountInput);
bindMoneyInput(mandatoryPaymentAmountInput);
bindMoneyInput(safeBucketAmountInput);


  /* =========================================================
     02. UI STATE
     ========================================================= */
  let currentMode = "expense";
  let editingTransactionId = null;
  let mandatoryPaymentsSelectedMonth = getCurrentMonthValue();

  let analyticsFilterPeriod = "month";
  let analyticsSelectedMonth = getCurrentMonthValue();
  let analyticsRangeStart = "";
  let analyticsRangeEnd = "";
  let analyticsRangeDraftStart = "";
  let analyticsRangeDraftEnd = "";
  let analyticsRangeEditingSide = "start";
  let analyticsRangeCalendarMonth = analyticsSelectedMonth;
  
  let analyticsTab = "expenses";
  


let activeBudgetCategoryId = null;
let activeAnalyticsCategoryId = null;
let activeSafeBucketAmountId = null;
let activeAccountId = null;
let activeMandatoryPaymentId = null;
let justCreatedTransactionId = null;

  const {
    getCategoryById,
    getCategoryName,
    getCategoryIcon,
    isRequiredCategory,
    getCategoryTypeLabel,
    getSafeBucketById,
    getAccountsByKind,
    getAccountById,
    getAccountNameById,
    getAccountIconById,
    getVaultAccount,
    getVaultAccountId,
    getVaultAccountName,
    isVaultAccountId,
    getPrimarySpendAccount,
    getPrimarySpendAccountId,
    getPrimarySpendAccountName,
    getCashAccount,
    getCashAccountId,
    getSafeAccountName,
    getSafeAccountId,
    getProtectedAccounts,
    getFreeMoneyAccounts,
    getSafeBucketsByKind,
getFreeSafeBucket,
getProtectedSafeBuckets,
getRealSafeBuckets,
isFreeSafeBucket,
isRealSafeBucket,
getSpendableAccounts,
getTransferAccounts,
getSafeBucketName,
getSafeBucketIcon,
  } = window.FinanceAppCatalogHelpers.create({ state });

  const {
    getAppMetaValue,
    getSafeInterestAnnualRate,
    getSafeBucketInterestRatesMap,
    getSafeBucketInterestAnnualRate,
    formatPercentLabel,
    setAppMetaLocalValue,
    getRoundedPercentFromDecimal,
  } = window.FinanceAppMetaHelpers.create({
    state,
    roundToTwo,
  });

  const {
  getAccountBalance,
  getRawAccountBalance,
  getAccountRoleLabel,
  getAccountRoleIconName,
  getAccountRoleIconSvg,
  canAccountBePrimary,
  getAccountRoleFlags,
  calculateBalance,
} = window.FinanceAppAccountHelpers.create({
    state,
    roundToTwo,
    getAccountById,
  });

  const {
    getSafeBucketBalance,
    getAllSafeBucketsBalance,
    getUnassignedSafeBalance,
    normalizeMoneyBucketName,
    getSafeBucketsByNames,
    getFreeSafeBalance,
    getStrictSafeBalance,
    getSoftReserveSafeBalance,
    getCashReserveBalance,
    getSecondLineReserveBalance,
    getAvailableNowBalance,
    getProtectedMoneyTotal,
    getFreeMoneyTotal: getFreeMoneyTotalFromSafeModule,
  } = window.FinanceAppSafeBucketCalculations.create({
  state,
  roundToTwo,
  getFreeSafeBucket,
  getRealSafeBuckets,
  isRealSafeBucket,
  getSafeAccountId,
  getSafeAccountName,
  getAccountBalance,
  getSafeBucketsByKind,
  getProtectedAccounts,
  getFreeMoneyAccounts,
});

  function getFreeMoneyTotal() {
    const accountsPart = getFreeMoneyAccounts().reduce((sum, account) => {
      return sum + getAccountBalance(account.id);
    }, 0);

    return roundToTwo(Math.max(0, accountsPart));
  }
  
  window.FinanceAppSavingsBridge = {
  getState: () => state,
  getSupabaseClient: () => supabaseClient,

  getActiveBucketId: () => activeSafeBucketAmountId,

  getVaultAccount: () => getVaultAccount(),
  getVaultAccountId: () => getVaultAccountId(),
  getVaultAccountName: () => getVaultAccountName(),

  getSafeBucketById: (bucketId) => getSafeBucketById(bucketId),
  getSafeBucketBalance: (bucketId) => getSafeBucketBalance(bucketId),
  getAllSafeBucketsBalance: () => getAllSafeBucketsBalance(),

  getRawAccountBalance: (accountId) => getRawAccountBalance(accountId),

  setAppMetaLocalValue: (key, value) => setAppMetaLocalValue(key, value),

  loadDataFromSupabase: () => loadDataFromSupabase(),
  renderAll: () => renderAll(),

  roundToTwo,
  formatMoney,
};

  const {
    getBudgetLimitByCategoryId,
    getBudgetLimitLabel,
    getAnalyticsSpentLimitLabel,
    isBudgetExceeded,
    getFlexibleBudgetStats,
    getCurrentMonthTransactions,
    getRemainingFlexibleBudgetsCurrentMonth,
    getRemainingFlexibleBudgetsBreakdownCurrentMonth,
    getInsightsWorkingMinimum,
    getInsightsCanSaveNow,
  } = window.FinanceAppBudgetAnalyticsCalculations.create({
    state,
    roundToTwo,
    UNCATEGORIZED_ID,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    isRequiredCategory,
    formatMoney,
    getCategoryName,
  });

  const {
  fillSafeBucketSelect,
  updateTransferSafeFields,
} = window.FinanceAppSafeBucketDomHelpers.create({
  state,
  isVaultAccountId,
  getRealSafeBuckets,
  getFreeSafeBucket,
  getTransferAccounts,
  accountSelect,
  fromAccountSelect,
  toAccountSelect,
  fromSafeBucketField,
  toSafeBucketField,
  fromSafeBucketSelect,
  toSafeBucketSelect,
  getCurrentMode: () => currentMode,
});

accountSelect?.addEventListener("change", () => {
  updateTransferSafeFields();
});

fromAccountSelect?.addEventListener("change", () => {
  updateTransferSafeFields();
});

toAccountSelect?.addEventListener("change", () => {
  updateTransferSafeFields();
});

  const {
    parseMandatoryPaymentsFromMeta,
    getCurrentMonthKey,
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentVisibleInMonth,
    getMandatoryPaymentPaidPeriods,
    isMandatoryPaymentPaidInMonth,
    setMandatoryPaymentPaidInMonth,
    buildMandatoryPaymentDate,
    buildMandatoryPaymentTransactionCreatedAt,
    buildDateFromDueDay,
    getMandatoryPaymentsStats,
    isProtectedSafeBucket,
    getMandatoryPaymentsCoverageStats,
  } = window.FinanceAppMandatoryPaymentHelpers.create({
    state,
    getAppMetaValue,
    roundToTwo,
    getCurrentMonthValue,
    getSelectedMonth: () => mandatoryPaymentsSelectedMonth,
    getSafeBucketBalance,
    getSafeBucketById,
  });

  const {
  fillMandatoryPaymentAccountSelect,
  fillMandatoryPaymentSafeSelect,
  fillMandatoryPaymentCategorySelect,
  syncMandatoryPaymentLinkedSafeField,
  renderMandatoryPaymentBucketPicker,
} = window.FinanceAppMandatoryPaymentDom.create({
    state,
    mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    mandatoryPaymentCategorySelect,
    mandatoryPaymentLinkedSafeField,
    openMandatoryPaymentBucketPickerBtn,
    mandatoryPaymentBucketPickerModal,
    mandatoryPaymentBucketPickerList,
    isVaultAccountId,
    getSafeBucketName,
    escapeHtml,
  });
  
  function syncMandatoryPaymentCategorySelectFromActivePayment() {
  if (!fillMandatoryPaymentCategorySelect) return;

  const activePayment = state.mandatoryPayments.find((item) => {
    return item.id === activeMandatoryPaymentId;
  });

  fillMandatoryPaymentCategorySelect(activePayment?.category_id || "");
}

const mandatoryPaymentCategoryObserver = new MutationObserver(() => {
  if (!mandatoryPaymentEditorModal) return;

  if (!mandatoryPaymentEditorModal.classList.contains("hidden")) {
    syncMandatoryPaymentCategorySelectFromActivePayment();
  }
});

if (mandatoryPaymentEditorModal) {
  mandatoryPaymentCategoryObserver.observe(mandatoryPaymentEditorModal, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

  const {
    resetMandatoryPaymentForm,
    openMandatoryPaymentEditorModal,
    closeMandatoryPaymentEditorModal,
    openNewMandatoryPaymentEditor,
    openMandatoryPaymentEditor,
    closeMandatoryPaymentsModal,
    openMandatoryPaymentsModal,
  } = window.FinanceAppMandatoryPaymentModalFlow.create({
    state,
    getActiveMandatoryPaymentId: () => activeMandatoryPaymentId,
    setActiveMandatoryPaymentId: (nextId) => {
      activeMandatoryPaymentId = nextId;
    },
    getSelectedMonth: () => mandatoryPaymentsSelectedMonth,
    setSelectedMonth: (monthKey) => {
      mandatoryPaymentsSelectedMonth = monthKey;
    },
    getCurrentMonthValue,
    getMandatoryPaymentsActiveMonthKey,
    buildDateFromDueDay,
    getSafeBucketName,
    mandatoryPaymentsModal,
openMandatoryPaymentsModalBtn,
closeMandatoryPaymentsModalBtn,

mandatoryPaymentEditorModal,
openMandatoryPaymentEditorBtn,
closeMandatoryPaymentEditorModalBtn,

mandatoryPaymentBucketPickerModal,
closeMandatoryPaymentBucketPickerModalBtn,
    mandatoryPaymentEditorTitle,
    mandatoryPaymentTitleInput,
    mandatoryPaymentAmountInput,
    mandatoryPaymentDueDayInput,
    mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    openMandatoryPaymentBucketPickerBtn,
    addMandatoryPaymentBtn,
    deleteMandatoryPaymentBtn,
    fillMandatoryPaymentAccountSelect,
    fillMandatoryPaymentSafeSelect,
    syncMandatoryPaymentLinkedSafeField,
    openAnimatedModal,
    closeAnimatedModal,
    renderMonthStrip: () => renderMandatoryPaymentsMonthStrip(),
    renderModal: () => renderMandatoryPaymentsModal(),
  });

  const {
    saveMandatoryPaymentsToMeta,
    createMandatoryPaymentExpense,
    toggleMandatoryPaymentPaid,
    saveMandatoryPayment,
    deleteMandatoryPaymentFromEditor,
  } = window.FinanceAppMandatoryPaymentCrud.create({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,
    roundToTwo,
    parseMoneyInputValue,
    getCurrentTime,
    getActiveMandatoryPaymentId: () => activeMandatoryPaymentId,
    setActiveMandatoryPaymentId: (nextId) => {
      activeMandatoryPaymentId = nextId;
    },
    getMandatoryPaymentsActiveMonthKey,
    getMandatoryPaymentPaidPeriods,
    isMandatoryPaymentPaidInMonth,
    setMandatoryPaymentPaidInMonth,
    buildMandatoryPaymentTransactionCreatedAt,
    getAccountById,
    isVaultAccountId,
    mandatoryPaymentTitleInput,
    mandatoryPaymentAmountInput,
    mandatoryPaymentDueDayInput,
mandatoryPaymentCategorySelect,
mandatoryPaymentAccountSelect,
    mandatoryPaymentLinkedSafeSelect,
    onAfterTogglePaid: async () => {
      await loadDataFromSupabase();
      renderMandatoryPaymentsModal();
      renderAll();
    },
    onAfterSave: async () => {
      renderMandatoryPaymentsModal();
      renderAll();
      closeMandatoryPaymentEditorModal();
    },
    onAfterDelete: async () => {
      renderMandatoryPaymentsModal();
      renderAll();
      closeMandatoryPaymentEditorModal();
    },
  });

  const {
    startMandatoryPaymentLongPress,
    cancelMandatoryPaymentLongPress,
    bindMandatoryPaymentPress,
  } = window.FinanceAppMandatoryPaymentLongPress.create({
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentPaidInMonth,
    toggleMandatoryPaymentPaid,
    openMandatoryPaymentEditor,
  });

  const {
    renderMandatoryPaymentsMonthStrip,
    renderMandatoryPaymentsModal,
  } = window.FinanceAppMandatoryPaymentRender.create({
    state,
    mandatoryPaymentsList,
    mandatoryPaymentsMonthStrip,
    getSelectedMonth: () => mandatoryPaymentsSelectedMonth,
    setSelectedMonth: (monthKey) => {
      mandatoryPaymentsSelectedMonth = monthKey;
    },
    getMandatoryPaymentsMonthItems,
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentVisibleInMonth,
    isMandatoryPaymentPaidInMonth,
    getSafeBucketName,
    getSafeBucketBalance,
    roundToTwo,
    formatMoney,
    escapeHtml,
    bindMandatoryPaymentPress,
  });

addMandatoryPaymentBtn?.addEventListener("click", saveMandatoryPayment);

deleteMandatoryPaymentBtn?.addEventListener("click", deleteMandatoryPaymentFromEditor);

mandatoryPaymentAccountSelect?.addEventListener("change", () => {
  syncMandatoryPaymentLinkedSafeField();
});

openMandatoryPaymentBucketPickerBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  renderMandatoryPaymentBucketPicker();
  openAnimatedModal(mandatoryPaymentBucketPickerModal);
});

closeMandatoryPaymentBucketPickerModalBtn?.addEventListener("click", () => {
  closeAnimatedModal(mandatoryPaymentBucketPickerModal);
});

  const {
    setAnalyticsDraftMonthFromValue,
    getAnalyticsDraftMonthValue,
    getAnalyticsWheelYears,
    buildWheelColumnItems,
    syncWheelColumnPosition,
    getCenteredWheelValue,
    setWheelActiveState,
    snapWheelToValue,
    bindWheelScroll,
    updateAnalyticsWheelDraftFromScroll,
    renderAnalyticsMonthWheel,
    openAnalyticsMonthWheel,
    closeAnalyticsMonthWheel,
    applyAnalyticsMonthWheel,
    resetAnalyticsMonthWheel,
    getAnalyticsMonthWheelOpen,
  } = window.FinanceAppAnalyticsMonthWheel.create({
    analyticsMonthWheelWrap,
    analyticsMonthNamesColumn,
    analyticsMonthYearsColumn,
    getCurrentMonthValue,
    getRussianMonthNames,
    getSelectedMonth: () => analyticsSelectedMonth,
    setSelectedMonth: (monthKey) => {
      analyticsSelectedMonth = monthKey;
    },
    setFilterPeriod: (period) => {
      analyticsFilterPeriod = period;
    },
    renderAnalytics: () => renderAnalytics(),
  });

  const {
    openAnalyticsFiltersModal,
    closeAnalyticsFiltersModal,
    getAnalyticsPeriodLabel,
  } = window.FinanceAppAnalyticsFilters.create({
    analyticsFiltersModal,
    openAnimatedModal,
    closeAnimatedModal,
    closeAnalyticsMonthWheel,
    getFilterPeriod: () => analyticsFilterPeriod,
    getSelectedMonth: () => analyticsSelectedMonth,
    getRangeStart: () => analyticsRangeStart,
    getRangeEnd: () => analyticsRangeEnd,
    formatMonthLabel,
    formatDateRangeLabel,
  });

  const {
    createTransactionCard,
  } = window.FinanceAppTransactionCard.create({
    UNCATEGORIZED_ID,
    getAccountNameById,
    isVaultAccountId,
    getSafeBucketName,
    getCategoryName,
    formatMoney,
    formatDateShort,
    escapeHtml,
    openEditModal,
  });

  const {
    captureTransactionRects,
    playTransactionListFLIP,
    animateTransactionDelete,
  } = window.FinanceAppTransactionListAnimation;

  const {
    renderTransactions,
  } = window.FinanceAppTransactionsRender.create({
    state,
    transactionsListEl,
    sortTransactionsByLatest,
    createTransactionCard,
    getJustCreatedTransactionId: () => justCreatedTransactionId,
    setJustCreatedTransactionId: (nextId) => {
      justCreatedTransactionId = nextId;
    },
  });

  const {
    getAnalyticsOverviewSummary,
    renderAnalyticsOverview,
  } = window.FinanceAppAnalyticsOverviewRender.create({
    state,
    roundToTwo,
    calculateBalance,
    getFreeMoneyTotal,
    getProtectedMoneyTotal,
    getMandatoryPaymentsCoverageStats,
    getRemainingFlexibleBudgetsCurrentMonth,
    formatMoney,
    analyticsTotalBalanceValue,
    analyticsFreeMoneyValue,
    analyticsProtectedMoneyValue,
    analyticsPendingMandatoryValue,
    analyticsMandatoryTotalValue,
    analyticsMandatoryCoveredValue,
    analyticsRemainingBudgetsValue,
    analyticsCanSaveNowValue,
    analyticsCanSaveNowStatus,
    analyticsCanSaveNowHint,
  });

  const {
    getAnalyticsFilteredTransactions,
    getAnalyticsTransactionsByCategory,
    renderAnalyticsCategoryTransactions,
    openAnalyticsCategoryModal,
    closeAnalyticsCategoryModal,
  } = window.FinanceAppAnalyticsCategoryModal.create({
    state,
    supabaseClient,
    UNCATEGORIZED_ID,
    analyticsCategoryModal,
    analyticsCategoryModalTitle,
    analyticsCategoryModalPeriodLabel,
    analyticsCategoryBudgetBtn,
    analyticsCategoryTypeBtn,
    analyticsCategoryTransactionsList,
    getActiveAnalyticsCategoryId: () => activeAnalyticsCategoryId,
    setActiveAnalyticsCategoryId: (nextId) => {
      activeAnalyticsCategoryId = nextId;
    },
    getFilterPeriod: () => analyticsFilterPeriod,
    getSelectedMonth: () => analyticsSelectedMonth,
    getRangeStart: () => analyticsRangeStart,
    getRangeEnd: () => analyticsRangeEnd,
    filterTransactionsByPeriod,
    sortTransactionsByLatest,
    getCategoryName,
    getBudgetLimitLabel,
    isRequiredCategory,
    getAnalyticsPeriodLabel,
    createTransactionCard,
    openBudgetModal,
    openAnimatedModal,
    closeAnimatedModal,
    loadDataFromSupabase,
    renderAll,
  });

  const {
    getAnalyticsExpensesPeriodNote,
    getAnalyticsExpenseColor,
    getAnalyticsExpenseItems,
    renderAnalyticsExpensesByCategory,
    resetAnalyticsExpenseCategoryFilter,
  } = window.FinanceAppAnalyticsExpensesRender.create({
    state,
    UNCATEGORIZED_ID,
    roundToTwo,
    filterTransactionsByPeriod,
    getCurrentMonthValue,
    getCategoryName,
    isRequiredCategory,
    formatMoney,
    escapeHtml,
    getFilterPeriod: () => analyticsFilterPeriod,
    setFilterPeriod: (period) => {
      analyticsFilterPeriod = period;
    },
    getSelectedMonth: () => analyticsSelectedMonth,
    setSelectedMonth: (monthKey) => {
      analyticsSelectedMonth = monthKey;
    },
    getRangeStart: () => analyticsRangeStart,
    getRangeEnd: () => analyticsRangeEnd,
    analyticsExpenseValue,
    analyticsExpensesPeriodNote,
    analyticsExpensesCategoriesList,
    analyticsExpensesRing,
    analyticsExpensesRingCenterValue,
    analyticsExpensesRingCenterLabel,
    analyticsExpenseValuePremium,
    analyticsExpensesPeriodNotePremium,
    analyticsExpensesCategoriesListPremium,
    analyticsExpensesRingPremium,
    analyticsExpensesRingCenterValuePremium,
    analyticsExpensesRingCenterLabelPremium,
    analyticsExpensesMonthStrip,
    analyticsExpensesTotalRowValue,
    openAnalyticsCategoryModal,
  });
  
const budgetAnalyticsModal = document.getElementById("budgetAnalyticsModal");
const openBudgetAnalyticsModalBtn = document.getElementById("openBudgetAnalyticsModalBtn");
const closeBudgetAnalyticsModalBtn = document.getElementById("closeBudgetAnalyticsModalBtn");

const budgetAnalyticsExpenseValue = document.getElementById("budgetAnalyticsExpenseValue");
const budgetAnalyticsPeriodNote = document.getElementById("budgetAnalyticsPeriodNote");
const budgetAnalyticsRing = document.getElementById("budgetAnalyticsRing");
const budgetAnalyticsRingCenterValue = document.getElementById("budgetAnalyticsRingCenterValue");
const budgetAnalyticsRingCenterLabel = document.getElementById("budgetAnalyticsRingCenterLabel");
const budgetAnalyticsMonthStrip = document.getElementById("budgetAnalyticsMonthStrip");
const budgetAnalyticsCategoriesList = document.getElementById("budgetAnalyticsCategoriesList");

const budgetAnalyticsRangeDock = document.getElementById("budgetAnalyticsRangeDock");
const budgetAnalyticsRangeFromInput = document.getElementById("budgetAnalyticsRangeFromInput");
const budgetAnalyticsRangeToInput = document.getElementById("budgetAnalyticsRangeToInput");
const budgetAnalyticsRangeApplyBtn = document.getElementById("budgetAnalyticsRangeApplyBtn");

let budgetAnalyticsKindFilter = "flexible";
let budgetAnalyticsFilterPeriod = "month";
let budgetAnalyticsSelectedMonth = getCurrentMonthValue();
let budgetAnalyticsRangeStart = "";
let budgetAnalyticsRangeEnd = "";

const budgetAnalyticsExpensesRenderer = window.FinanceAppAnalyticsExpensesRender.create({
  state,
  UNCATEGORIZED_ID,
  roundToTwo,
  filterTransactionsByPeriod,
  getCurrentMonthValue,
  getCategoryName,
  isRequiredCategory,
  formatMoney,
  escapeHtml,

  getFilterPeriod: () => budgetAnalyticsFilterPeriod,
  setFilterPeriod: (period) => {
    budgetAnalyticsFilterPeriod = period;

    window.setTimeout(() => {
      syncBudgetAnalyticsControls();
      updateBudgetAnalyticsPeriodNote();
    }, 0);
  },

  getSelectedMonth: () => budgetAnalyticsSelectedMonth,
  setSelectedMonth: (month) => {
    budgetAnalyticsSelectedMonth = month || getCurrentMonthValue();

    window.setTimeout(() => {
      syncBudgetAnalyticsControls();
      updateBudgetAnalyticsPeriodNote();
    }, 0);
  },

  getRangeStart: () => budgetAnalyticsRangeStart,
  getRangeEnd: () => budgetAnalyticsRangeEnd,

  analyticsExpenseValue: budgetAnalyticsExpenseValue,
analyticsExpensesPeriodNote: budgetAnalyticsPeriodNote,
analyticsExpensesCategoriesList: budgetAnalyticsCategoriesList,
analyticsExpensesRing: budgetAnalyticsRing,
analyticsExpensesRingCenterValue: budgetAnalyticsRingCenterValue,
analyticsExpensesRingCenterLabel: budgetAnalyticsRingCenterLabel,

analyticsExpenseValuePremium: budgetAnalyticsExpenseValue,
analyticsExpensesPeriodNotePremium: budgetAnalyticsPeriodNote,
analyticsExpensesCategoriesListPremium: budgetAnalyticsCategoriesList,
analyticsExpensesRingPremium: budgetAnalyticsRing,
analyticsExpensesRingCenterValuePremium: budgetAnalyticsRingCenterValue,
analyticsExpensesRingCenterLabelPremium: budgetAnalyticsRingCenterLabel,

  analyticsExpensesMonthStrip: budgetAnalyticsMonthStrip,
  analyticsExpensesTotalRowValue: null,

  openAnalyticsCategoryModal: (categoryId) => {
  openAnalyticsCategoryModal?.(categoryId);
},
});

function getBudgetAnalyticsPeriodNote() {
  if (budgetAnalyticsFilterPeriod === "today") {
    return `${getBudgetAnalyticsKindLabel()} Ð·Ð° ÑÐµÐ³Ð¾Ð´Ð½Ñ`;
  }

  if (budgetAnalyticsFilterPeriod === "7") {
    return `${getBudgetAnalyticsKindLabel()} Ð·Ð° 7 Ð´Ð½ÐµÐ¹`;
  }

  if (budgetAnalyticsFilterPeriod === "range") {
    if (budgetAnalyticsRangeStart && budgetAnalyticsRangeEnd) {
      return `${getBudgetAnalyticsKindLabel()} Ð·Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´`;
    }

    return `${getBudgetAnalyticsKindLabel()} Ð·Ð° Ð¿ÐµÑÐ¸Ð¾Ð´`;
  }

  return `${getBudgetAnalyticsKindLabel()} Ð·Ð° ${formatMonthLabel(budgetAnalyticsSelectedMonth)}`;
}

function getBudgetAnalyticsKindLabel() {
  if (budgetAnalyticsKindFilter === "all") return "Ð²ÑÐµ ÑÐ°ÑÑÐ¾Ð´Ñ";
  if (budgetAnalyticsKindFilter === "required") return "Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ ÑÐ°ÑÑÐ¾Ð´Ñ";

  return "Ð³Ð¸Ð±ÐºÐ¸Ðµ ÑÐ°ÑÑÐ¾Ð´Ñ";
}

function syncBudgetAnalyticsControls() {
  document.querySelectorAll("[data-budget-analytics-kind]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.budgetAnalyticsKind === budgetAnalyticsKindFilter
    );
  });

  document.querySelectorAll("[data-budget-analytics-period]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.budgetAnalyticsPeriod === budgetAnalyticsFilterPeriod
    );
  });

  budgetAnalyticsRangeDock?.classList.toggle(
    "hidden",
    budgetAnalyticsFilterPeriod !== "range"
  );

  budgetAnalyticsMonthStrip?.classList.toggle(
    "is-hidden-for-range",
    budgetAnalyticsFilterPeriod !== "month"
  );
}

function updateBudgetAnalyticsPeriodNote() {
  if (!budgetAnalyticsPeriodNote) return;

  budgetAnalyticsPeriodNote.textContent = getBudgetAnalyticsPeriodNote();
}

function renderBudgetAnalyticsModal() {
  budgetAnalyticsExpensesRenderer.setAnalyticsExpenseKindFilter?.(budgetAnalyticsKindFilter);
  budgetAnalyticsExpensesRenderer.renderAnalyticsExpensesByCategory();

  syncBudgetAnalyticsControls();
  updateBudgetAnalyticsPeriodNote();
}

function openBudgetAnalyticsModal() {
  if (!budgetAnalyticsModal) return;

  budgetAnalyticsKindFilter = "flexible";
  budgetAnalyticsFilterPeriod = "month";
  budgetAnalyticsSelectedMonth = getCurrentMonthValue();

  const today = new Date();
  const todayValue = today.toISOString().slice(0, 10);

  if (!budgetAnalyticsRangeFromInput?.value) {
    budgetAnalyticsRangeFromInput.value = todayValue;
  }

  if (!budgetAnalyticsRangeToInput?.value) {
    budgetAnalyticsRangeToInput.value = todayValue;
  }

  budgetAnalyticsRangeStart = budgetAnalyticsRangeFromInput?.value || "";
  budgetAnalyticsRangeEnd = budgetAnalyticsRangeToInput?.value || "";

  resetAnalyticsExpenseCategoryFilter?.();

  renderBudgetAnalyticsModal();
  openAnimatedModal(budgetAnalyticsModal);
}

function closeBudgetAnalyticsModal() {
  closeAnimatedModal(budgetAnalyticsModal);
}

document.querySelectorAll("[data-budget-analytics-kind]").forEach((button) => {
  button.addEventListener("click", () => {
    budgetAnalyticsKindFilter = button.dataset.budgetAnalyticsKind || "flexible";
    renderBudgetAnalyticsModal();
  });
});

document.querySelectorAll("[data-budget-analytics-period]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextPeriod = button.dataset.budgetAnalyticsPeriod || "month";

    budgetAnalyticsFilterPeriod = nextPeriod;

    if (nextPeriod === "range") {
      budgetAnalyticsRangeStart = budgetAnalyticsRangeFromInput?.value || "";
      budgetAnalyticsRangeEnd = budgetAnalyticsRangeToInput?.value || "";
    }

    renderBudgetAnalyticsModal();
  });
});

budgetAnalyticsRangeApplyBtn?.addEventListener("click", () => {
  budgetAnalyticsFilterPeriod = "range";
  budgetAnalyticsRangeStart = budgetAnalyticsRangeFromInput?.value || "";
  budgetAnalyticsRangeEnd = budgetAnalyticsRangeToInput?.value || "";

  renderBudgetAnalyticsModal();
});

openBudgetAnalyticsModalBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  openBudgetAnalyticsModal();
});

openBudgetAnalyticsModalBtn?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  event.preventDefault();
  openBudgetAnalyticsModal();
});

closeBudgetAnalyticsModalBtn?.addEventListener("click", closeBudgetAnalyticsModal);

budgetAnalyticsModal?.addEventListener("click", (event) => {
  if (event.target === budgetAnalyticsModal) {
    closeBudgetAnalyticsModal();
  }
});

  const {
  renderAnalyticsSafes,
} = window.FinanceAppAnalyticsSafesRender.create({
  state,
  getAnalyticsOverviewSummary,
  getSafeBucketBalance,
  isRequiredCategory,
  formatMoney,
  escapeHtml,
  analyticsInterestValue,
  analyticsSafeList,

  getSelectedMonth: () => analyticsSelectedMonth,
  setSelectedMonth: (monthKey) => {
    analyticsSelectedMonth = monthKey;
    analyticsFilterPeriod = "month";
  },
});

  const {
    renderAnalytics,
    setAnalyticsTab,
  } = window.FinanceAppAnalyticsTabsRender.create({
    analyticsOverviewSection,
    analyticsExpensesSection,
    analyticsSafesSection,
    analyticsTabOverviewBtn,
    analyticsTabExpensesBtn,
    analyticsTabSafesBtn,
    getAnalyticsTab: () => analyticsTab,
    setAnalyticsTabValue: (nextTab) => {
      analyticsTab = nextTab;
    },
    renderAnalyticsOverview,
    renderAnalyticsExpensesByCategory,
    renderAnalyticsSafes,
  });
  
  /* =========================================================
   Analytics Range Ribbon
   ========================================================= */

const ANALYTICS_RANGE_RIBBON_ANIMATION_MS = 360;
let analyticsRangePickStep = "start";

function getDateFromValue(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return new Date();
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function getValueFromDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthValueFromDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getDateFromMonthValue(monthValue) {
  const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);

  if (!match) {
    return new Date();
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, 1);
}

function getRangeShortDateLabel(value) {
  const date = getDateFromValue(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}`;
}

function getRangeMonthShortLabel(monthValue) {
  const date = getDateFromMonthValue(monthValue);

  return date
    .toLocaleDateString("ru-RU", {
      month: "short",
    })
    .replace(".", "");
}

function isDateValueBetween(value, startValue, endValue) {
  const time = getDateFromValue(value).getTime();
  const startTime = getDateFromValue(startValue).getTime();
  const endTime = getDateFromValue(endValue).getTime();

  return time >= startTime && time <= endTime;
}

function normalizeAnalyticsRangeDraft() {
  const today = getTodayDateValue();

  analyticsRangeDraftStart = analyticsRangeStart || today;
  analyticsRangeDraftEnd = analyticsRangeEnd || analyticsRangeDraftStart;

  if (
    getDateFromValue(analyticsRangeDraftStart).getTime() >
    getDateFromValue(analyticsRangeDraftEnd).getTime()
  ) {
    const temp = analyticsRangeDraftStart;
    analyticsRangeDraftStart = analyticsRangeDraftEnd;
    analyticsRangeDraftEnd = temp;
  }

  if (!analyticsRangeCalendarMonth) {
    analyticsRangeCalendarMonth = getMonthValueFromDate(
      getDateFromValue(analyticsRangeDraftStart)
    );
  }
}

function syncAnalyticsRangeSelectedLabel() {
  if (!analyticsRangeSelectedLabel) return;

  if (!analyticsRangeDraftStart || !analyticsRangeDraftEnd) {
    analyticsRangeSelectedLabel.textContent = "ÐÑÐ±ÐµÑÐ¸ Ð¿ÐµÑÐ¸Ð¾Ð´";
    return;
  }

  analyticsRangeSelectedLabel.textContent =
    `${getRangeShortDateLabel(analyticsRangeDraftStart)} â ${getRangeShortDateLabel(analyticsRangeDraftEnd)}`;
}

function getAnalyticsRangeYearMonths() {
  const selectedDate = getDateFromMonthValue(
    analyticsRangeCalendarMonth || analyticsSelectedMonth || getCurrentMonthValue()
  );

  const year = selectedDate.getFullYear();
  const months = [];

  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const date = new Date(year, monthIndex, 1);

    months.push({
      value: getMonthValueFromDate(date),
      label: getRangeMonthShortLabel(getMonthValueFromDate(date)),
    });
  }

  return months;
}

function renderAnalyticsRangeMonthsStrip() {
  if (!analyticsRangeMonthsStrip) return;

  const months = getAnalyticsRangeYearMonths();
  const activeMonth = analyticsRangeCalendarMonth || getCurrentMonthValue();

  analyticsRangeMonthsStrip.innerHTML = "";

  months.forEach((month) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className =
      `analytics-range-ribbon-month${month.value === activeMonth ? " is-active" : ""}`;
    button.dataset.monthValue = month.value;
    button.textContent = month.label;

    button.addEventListener("click", () => {
      analyticsRangeCalendarMonth = month.value;
      renderAnalyticsRangeRibbon();
    });

    analyticsRangeMonthsStrip.appendChild(button);
  });

  requestAnimationFrame(() => {
    analyticsRangeMonthsStrip
      .querySelector(".analytics-range-ribbon-month.is-active")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  });
}

function getAnalyticsRangeMonthDates() {
  const monthDate = getDateFromMonthValue(
    analyticsRangeCalendarMonth || analyticsSelectedMonth || getCurrentMonthValue()
  );

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    dates.push(new Date(year, month, day));
  }

  return dates;
}

function commitAnalyticsRangeDraft() {
  analyticsRangeStart = analyticsRangeDraftStart;
  analyticsRangeEnd = analyticsRangeDraftEnd;
  analyticsFilterPeriod = "range";

  renderAnalytics();
}

function renderAnalyticsRangeDaysStrip() {
  if (!analyticsRangeDaysStrip) return;

  analyticsRangeDaysStrip.innerHTML = "";

  const todayValue = getTodayDateValue();
  const dates = getAnalyticsRangeMonthDates();

  dates.forEach((date) => {
    const value = getValueFromDate(date);
    const button = document.createElement("button");

    const isStart = value === analyticsRangeDraftStart;
    const isEnd = value === analyticsRangeDraftEnd;
    const isBetween = isDateValueBetween(
      value,
      analyticsRangeDraftStart,
      analyticsRangeDraftEnd
    );

    button.type = "button";
    button.className = [
      "analytics-range-ribbon-day",
      isStart ? "is-start" : "",
      isEnd ? "is-end" : "",
      isBetween && !isStart && !isEnd ? "is-between" : "",
      value === todayValue ? "is-today" : "",
    ].filter(Boolean).join(" ");

    button.dataset.dateValue = value;
    button.textContent = String(date.getDate());

    button.addEventListener("click", () => {
      if (analyticsRangePickStep === "start") {
        analyticsRangeDraftStart = value;
        analyticsRangeDraftEnd = value;
        analyticsRangePickStep = "end";
      } else {
        analyticsRangeDraftEnd = value;

        if (
          getDateFromValue(analyticsRangeDraftEnd).getTime() <
          getDateFromValue(analyticsRangeDraftStart).getTime()
        ) {
          const temp = analyticsRangeDraftStart;
          analyticsRangeDraftStart = analyticsRangeDraftEnd;
          analyticsRangeDraftEnd = temp;
        }

        analyticsRangePickStep = "start";
      }

      commitAnalyticsRangeDraft();
      renderAnalyticsRangeRibbon();
    });

    analyticsRangeDaysStrip.appendChild(button);
  });

  requestAnimationFrame(() => {
    const activeDay =
      analyticsRangeDaysStrip.querySelector(".analytics-range-ribbon-day.is-end") ||
      analyticsRangeDaysStrip.querySelector(".analytics-range-ribbon-day.is-start") ||
      analyticsRangeDaysStrip.querySelector(".analytics-range-ribbon-day.is-today");

    activeDay?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  });
}

function renderAnalyticsRangeRibbon() {
  if (!analyticsRangeDock) return;

  normalizeAnalyticsRangeDraft();
  syncAnalyticsRangeSelectedLabel();
  renderAnalyticsRangeMonthsStrip();
  renderAnalyticsRangeDaysStrip();
}

function setAnalyticsRangeRailActive(isActive) {
  document.querySelectorAll(".analytics-period-rail__btn").forEach((button) => {
    button.classList.remove("is-active");
  });

  analyticsRailRangeBtn?.classList.toggle("is-active", isActive);
}

function openAnalyticsRangeRibbon() {
  if (!analyticsRangeDock || !analyticsExpensesMonthStrip) return;

  closeAnalyticsMonthWheel?.();

  analyticsFilterPeriod = "range";
  normalizeAnalyticsRangeDraft();

  analyticsRangeCalendarMonth = getMonthValueFromDate(
    getDateFromValue(analyticsRangeDraftStart)
  );

  analyticsRangeStart = analyticsRangeDraftStart;
  analyticsRangeEnd = analyticsRangeDraftEnd;
  analyticsRangePickStep = "start";

  setAnalyticsRangeRailActive(true);
  renderAnalyticsRangeRibbon();

  analyticsRangeDock.classList.remove("hidden", "is-exiting", "is-entering");
  analyticsRangeDock.style.display = "none";

  analyticsExpensesMonthStrip.classList.remove(
    "is-range-returning",
    "is-hidden-for-range"
  );

  analyticsExpensesMonthStrip.classList.add("is-range-leaving");

  setTimeout(() => {
    analyticsExpensesMonthStrip.classList.add("is-hidden-for-range");
    analyticsExpensesMonthStrip.classList.remove("is-range-leaving");

    analyticsRangeDock.style.display = "";
    analyticsRangeDock.classList.add("is-entering");
  }, ANALYTICS_RANGE_RIBBON_ANIMATION_MS);

  renderAnalytics();
}

function resetAnalyticsRangeRibbon() {
  analyticsRangeStart = "";
  analyticsRangeEnd = "";
  analyticsRangeDraftStart = "";
  analyticsRangeDraftEnd = "";
  analyticsRangePickStep = "start";
  analyticsFilterPeriod = "month";

  setAnalyticsRangeRailActive(false);

  if (!analyticsRangeDock || !analyticsExpensesMonthStrip) {
    renderAnalytics();
    return;
  }

  analyticsRangeDock.classList.remove("is-entering");
  analyticsRangeDock.classList.add("is-exiting");

  setTimeout(() => {
    analyticsRangeDock.classList.add("hidden");
    analyticsRangeDock.classList.remove("is-exiting");

    analyticsExpensesMonthStrip.classList.remove("is-hidden-for-range");
    analyticsExpensesMonthStrip.classList.add("is-range-returning");

    setTimeout(() => {
      analyticsExpensesMonthStrip.classList.remove("is-range-returning");
    }, ANALYTICS_RANGE_RIBBON_ANIMATION_MS + 80);

    renderAnalytics();
  }, ANALYTICS_RANGE_RIBBON_ANIMATION_MS);
}

analyticsRailRangeBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  openAnalyticsRangeRibbon();
}, true);

analyticsRangeDockResetBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  resetAnalyticsRangeRibbon();
}, true);

analyticsRangeDockCloseBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  resetAnalyticsRangeRibbon();
}, true);

analyticsRangeDockApplyBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  commitAnalyticsRangeDraft();
  renderAnalyticsRangeRibbon();
}, true);

analyticsPeriodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.analyticsPeriod !== "range") {
      analyticsRangeDock?.classList.add("hidden");
      analyticsRangeDock?.classList.remove("is-entering", "is-exiting");
      analyticsExpensesMonthStrip?.classList.remove(
        "is-hidden-for-range",
        "is-range-leaving",
        "is-range-returning"
      );
      setAnalyticsRangeRailActive(false);
    }
  }, true);
});

  const {
    setActiveNav,
    showWalletView,
    openCategoriesManager,
    closeCategoriesManager,
    showAnalyticsView,
  } = window.FinanceAppNavigationView.create({
    navWalletBtn,
    navAnalyticsBtn,
    navOperationsBtn,
    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,
    closeAnalyticsMonthWheel,
    renderAnalytics,
  });

  const {
    renderOperationsView,
    showOperationsView,
  } = window.FinanceAppOperationsView.create({
    state,
    operationsTransactionsList,
    mainView,
    categoriesManagerView,
    analyticsView,
    operationsView,
    setActiveNav,
    createTransactionCard,
  });

  const {
    ensureUncategorizedCategory,
    fillExpenseCategorySelect,
    fillAccountSelect,
  } = window.FinanceAppFormSelects.create({
    state,
    UNCATEGORIZED_ID,
    categorySelect,
  });


  /* =========================================================
     04. HELPERS: CATEGORIES / ACCOUNTS / BUCKETS
     ========================================================= */  
async function setSafeBucketTargetAmount(bucketId, nextAmount) {
  const target = roundToTwo(Number(nextAmount) || 0);

  if (target < 0) {
    alert("Ð¡ÑÐ¼Ð¼Ð° Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ Ð±ÑÑÑ Ð¼ÐµÐ½ÑÑÐµ Ð½ÑÐ»Ñ");
    return false;
  }

  const current = roundToTwo(getSafeBucketBalance(bucketId));
  const diff = roundToTwo(target - current);

  if (Math.abs(diff) < 0.009) {
    return true;
  }

  const adjustmentTransaction = {
    id: crypto.randomUUID(),
    type: "transfer",
    title: "ÐÐ¾ÑÑÐµÐºÑÐ¸ÑÐ¾Ð²ÐºÐ° Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
    account_id: null,
    account: null,
    category_id: null,
    from_account_id: getSafeAccountId(),
    to_account_id: getSafeAccountId(),
    from_account: getSafeAccountName(),
    to_account: getSafeAccountName(),
    from_safe_bucket_id: diff < 0 ? bucketId : null,
    to_safe_bucket_id: diff > 0 ? bucketId : null,
    amount: Math.abs(diff),
    time_label: getCurrentTime(),
    created_at: new Date().toISOString(),
  };

  const { error } = await supabaseClient
    .from("transactions")
    .insert(adjustmentTransaction);

  if (error) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÐºÐ¾ÑÑÐµÐºÑÐ¸ÑÐ¾Ð²ÐºÐ¸ ÑÑÐ¼Ð¼Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    console.error(error);
    return false;
  }

  return true;
}

  /* =========================================================
     05. HELPERS: BUDGETS / META / MANDATORY PAYMENTS
     ========================================================= */  
  /* =========================================================
     06. HELPERS: DATE / FORMAT / FILTERS
     ========================================================= */
  function getSafeBalance() {
  return getAccountBalance(getSafeAccountId());
}
    
  
  const FAQ_META = {
  required_expense: {
    title: "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ ÑÐ°ÑÑÐ¾Ð´Ñ",
    text:
      "Ð­ÑÐ¾ Ð²ÑÐµ ÑÐ°ÑÑÐ¾Ð´Ñ Ð·Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´ Ð¿Ð¾ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼, ÐºÐ¾ÑÐ¾ÑÑÐµ Ð¿Ð¾Ð¼ÐµÑÐµÐ½Ñ ÐºÐ°Ðº Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ.",
  },

  flexible_expense: {
    title: "ÐÐ¸Ð±ÐºÐ¸Ðµ ÑÐ°ÑÑÐ¾Ð´Ñ",
    text:
      "Ð­ÑÐ¾ Ð²ÑÐµ ÑÐ°ÑÑÐ¾Ð´Ñ Ð·Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´ Ð¿Ð¾ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼, ÐºÐ¾ÑÐ¾ÑÑÐµ Ð½Ðµ Ð¿Ð¾Ð¼ÐµÑÐµÐ½Ñ ÐºÐ°Ðº Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ.",
  },

saved_to_safes: {
  title: "ÐÑÐ»Ð¾Ð¶ÐµÐ½Ð¾ Ð² Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
  text:
    "Ð­ÑÐ¾ ÑÐºÐ¾Ð»ÑÐºÐ¾ Ð´ÐµÐ½ÐµÐ³ ÑÑ Ð¿ÐµÑÐµÐ²ÑÐ» Ð² Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð¸Ð· Ð¾Ð±ÑÑÐ½ÑÑ ÑÑÐµÑÐ¾Ð² Ð·Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´. ÐÐ½ÑÑÑÐµÐ½Ð½Ð¸Ðµ Ð¿ÐµÑÐµÐºÐ»Ð°Ð´ÑÐ²Ð°Ð½Ð¸Ñ Ð¼ÐµÐ¶Ð´Ñ ÑÐ°Ð¼Ð¸Ð¼Ð¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸ÑÐ¼Ð¸ ÑÑÐ´Ð° Ð½Ðµ Ð²ÑÐ¾Ð´ÑÑ.",
},

  remaining_limits: {
    title: "ÐÑÑÐ°ÑÐ¾Ðº Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð²",
    text:
      "Ð­ÑÐ¾ ÑÐºÐ¾Ð»ÑÐºÐ¾ ÐµÑÑ Ð¼Ð¾Ð¶Ð½Ð¾ Ð¿Ð¾ÑÑÐ°ÑÐ¸ÑÑ Ð¿Ð¾ Ð³Ð¸Ð±ÐºÐ¸Ð¼ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼ Ð² ÑÐµÐºÑÑÐµÐ¼ Ð¼ÐµÑÑÑÐµ, ÐµÑÐ»Ð¸ ÑÐ¾ÑÐµÑÑ Ð¾ÑÑÐ°ÑÑÑÑ Ð² ÑÐ°Ð¼ÐºÐ°Ñ ÑÐ²Ð¾Ð¸Ñ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð².",
  },

  total_balance: {
    title: "ÐÐ±ÑÐ¸Ð¹ Ð±Ð°Ð»Ð°Ð½Ñ",
    text:
      "Ð­ÑÐ¾ ÑÑÐ¼Ð¼Ð° Ð´ÐµÐ½ÐµÐ³ Ð¿Ð¾ Ð²ÑÐµÐ¼ ÑÑÐµÑÐ°Ð¼ Ð¿ÑÐ¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ Ð½Ð° ÑÐµÐºÑÑÐ¸Ð¹ Ð¼Ð¾Ð¼ÐµÐ½Ñ.",
  },

  protected_money: {
    title: "ÐÐµÐ¿ÑÐ¸ÐºÐ¾ÑÐ°Ð¹Ð¼ÑÐµ",
    text:
      "Ð­ÑÐ¾ Ð´ÐµÐ½ÑÐ³Ð¸, ÐºÐ¾ÑÐ¾ÑÑÐµ Ð¿ÑÐ¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ ÑÑÐ¸ÑÐ°ÐµÑ Ð½Ðµ Ð´Ð»Ñ Ð¾Ð±ÑÑÐ½ÑÑ ÑÑÐ°Ñ.",
  },

  free_money: {
  title: "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸",
  text:
  "Ð­ÑÐ¾ Ð´ÐµÐ½ÑÐ³Ð¸ Ð¸Ð· ÑÑÐµÑÐ¾Ð² Ð¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹, ÐºÐ¾ÑÐ¾ÑÑÐµ Ð¿Ð¾Ð¼ÐµÑÐµÐ½Ñ ÐºÐ°Ðº Ð´Ð¾ÑÑÑÐ¿Ð½ÑÐµ Ð´Ð»Ñ Ð¾Ð±ÑÑÐ½ÑÑ ÑÑÐ°Ñ.",
},

  can_save_now: {
    title: "ÐÐ¾Ð¶Ð½Ð¾ Ð¾ÑÐ»Ð¾Ð¶Ð¸ÑÑ ÑÐµÐ¹ÑÐ°Ñ",
    text:
      "Ð­ÑÐ¾ ÑÑÐ¼Ð¼Ð°, ÐºÐ¾ÑÐ¾ÑÑÑ Ð¼Ð¾Ð¶Ð½Ð¾ ÑÐ±ÑÐ°ÑÑ Ð² Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð±ÐµÐ· ÐºÐ¾Ð½ÑÐ»Ð¸ÐºÑÐ° Ñ Ð½ÐµÐ¿Ð¾ÐºÑÑÑÑÐ¼Ð¸ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐ¼Ð¸ Ð¿Ð»Ð°ÑÐµÐ¶Ð°Ð¼Ð¸ Ð¸ Ð¾ÑÑÐ°ÑÐºÐ¾Ð¼ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð².",
  },

  summary_recommendation: {
    title: "ÐÑÐ²Ð¾Ð´",
    text:
      "Ð­ÑÐ¾ Ð¸ÑÐ¾Ð³Ð¾Ð²ÑÐ¹ ÑÐµÐ·ÑÐ»ÑÑÐ°Ñ Ð½Ð° Ð¾ÑÐ½Ð¾Ð²Ðµ ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÑ Ð´ÐµÐ½ÐµÐ³, Ð½ÐµÐ¿Ð¾ÐºÑÑÑÑÑ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶ÐµÐ¹ Ð¸ Ð¾ÑÑÐ°ÑÐºÐ° Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð².",
  },
};

function buildFaqFormulaText(faqKey) {
  const summary = getAnalyticsOverviewSummary();

  if (faqKey === "total_balance") {
    return `ÐÐ±ÑÐ¸Ð¹ Ð±Ð°Ð»Ð°Ð½Ñ = ${formatMoney(summary.totalBalance)}`;
  }

  if (faqKey === "free_money") {
    return `Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸ = ${formatMoney(summary.freeMoney)}`;
  }

  if (faqKey === "protected_money") {
    return `ÐÐ°ÑÐ¸ÑÑÐ½Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸ = ${formatMoney(summary.protectedMoney)}`;
  }

  if (faqKey === "remaining_limits") {
    return `ÐÑÑÐ°ÑÐ¾Ðº Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² = ${formatMoney(summary.remainingBudgets)}`;
  }

  if (faqKey === "can_save_now") {
    return `ÐÐ¾Ð¶Ð½Ð¾ Ð¾ÑÐ»Ð¾Ð¶Ð¸ÑÑ = Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸ (${formatMoney(summary.freeMoney)}) â Ð Ð²ÑÑÐµÑÑ Ð¸Ð· ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÑ (${formatMoney(summary.pendingMandatoryToDeduct)}) â ÐÑÑÐ°ÑÐ¾Ðº Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² (${formatMoney(summary.remainingBudgets)})`;
  }

  if (faqKey === "saved_to_safes") {
    return "Ð¡ÑÐ¸ÑÐ°ÑÑÑÑ ÑÐ¾Ð»ÑÐºÐ¾ Ð¿ÐµÑÐµÐ²Ð¾Ð´Ñ Ð² Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð¸Ð· Ð¾Ð±ÑÑÐ½ÑÑ ÑÑÐµÑÐ¾Ð² Ð·Ð° Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÐµÑÐ¸Ð¾Ð´.";
  }

  if (faqKey === "required_expense") {
    return "Ð¡ÑÐ¼Ð¼Ð° ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð¿Ð¾ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼, Ð¿Ð¾Ð¼ÐµÑÐµÐ½Ð½ÑÐ¼ ÐºÐ°Ðº Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ.";
  }

  if (faqKey === "flexible_expense") {
    return "Ð¡ÑÐ¼Ð¼Ð° ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð¿Ð¾ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼, Ð½Ðµ Ð¿Ð¾Ð¼ÐµÑÐµÐ½Ð½ÑÐ¼ ÐºÐ°Ðº Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ.";
  }

  return "Ð¤Ð¾ÑÐ¼ÑÐ»Ð° Ð½ÐµÐ´Ð¾ÑÑÑÐ¿Ð½Ð° Ð´Ð»Ñ ÑÑÐ¾Ð³Ð¾ Ð¿Ð¾ÐºÐ°Ð·Ð°ÑÐµÐ»Ñ.";
}
function openFaqModal(faqKey) {
  const meta = FAQ_META[faqKey];
  if (!meta || !faqModal) return;

  faqModalTitle.textContent = meta.title;
  faqModalText.textContent = meta.text;
  faqModalFormula.textContent = buildFaqFormulaText(faqKey);

  openAnimatedModal(faqModal);
document.body.style.overflow = "hidden";
}

function closeFaqModal() {
  if (!faqModal) return;

  closeAnimatedModal(faqModal);
}

function animateCurrencyValue(el, value, options = {}) {
  if (!el) return;

  const endValue = roundToTwo(Number(value) || 0);
  const duration = options.duration || 1450;
  const decimals = options.decimals ?? 2;

  const prevRaw = Number(el.dataset.animatedValue || 0);
  const startValue = Number.isFinite(prevRaw) ? prevRaw : 0;

  if (Math.abs(endValue - startValue) < 0.009) {
    el.textContent = formatMoney(endValue);
    el.dataset.animatedValue = String(endValue);
    return;
  }

  const startTime = performance.now();

  const easeOutSoftStop = (t) => {
  const inv = 1 - t;
  return 1 - inv * inv * inv * inv;
};

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutSoftStop(progress);
    const current = startValue + (endValue - startValue) * eased;
    const rounded = Number(current.toFixed(decimals));

    el.textContent = formatMoney(rounded);

    if (progress < 1) {
  requestAnimationFrame(frame);
} else {
  el.dataset.animatedValue = String(endValue);
}
  }

  requestAnimationFrame(frame);
}

function animateLabeledCurrencyValue(el, prefix, value, options = {}) {
  if (!el) return;

  const endValue = roundToTwo(Number(value) || 0);
  const duration = options.duration || 1250;
  const decimals = options.decimals ?? 2;

  const prevRaw = Number(el.dataset.animatedValue || 0);
  const startValue = Number.isFinite(prevRaw) ? prevRaw : 0;

  if (Math.abs(endValue - startValue) < 0.009) {
    el.textContent = `${prefix}${formatMoney(endValue)}`;
    el.dataset.animatedValue = String(endValue);
    return;
  }

  const startTime = performance.now();

  const easeOutSoftStop = (t) => {
  const inv = 1 - t;
  return 1 - inv * inv * inv * inv;
};

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutSoftStop(progress);
    const current = startValue + (endValue - startValue) * eased;
    const rounded = Number(current.toFixed(decimals));

    el.textContent = `${prefix}${formatMoney(rounded)}`;

    if (progress < 1) {
  requestAnimationFrame(frame);
} else {
  el.dataset.animatedValue = String(endValue);
}
  }

  requestAnimationFrame(frame);
}
  /* =========================================================
     07. MODALS: BUDGET / ACCOUNTS / ÐÐÐÐÐÐÐÐÐÐ¯
     ========================================================= */
function openBudgetModal(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return;

  activeBudgetCategoryId = categoryId;

  const existing = getBudgetLimitByCategoryId(categoryId);

  budgetModalTitle.textContent = category.name || "ÐÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ";
  budgetCategoryNameInput.value = category.name || "";
  budgetCategoryRequiredInput.checked = Boolean(category.is_required);
  budgetAmountInput.value = existing ? String(Number(existing.monthly_limit) || 0).replace(".", ",") : "";

  if (deleteCategoryBtn) {
    deleteCategoryBtn.classList.toggle("hidden", Boolean(category.locked));
  }

  openAnimatedModal(budgetModal);
  document.body.style.overflow = "hidden";
}

function closeBudgetModal() {
  closeAnimatedModal(budgetModal);
  activeBudgetCategoryId = null;
  budgetCategoryNameInput.value = "";
  budgetCategoryRequiredInput.checked = false;
  budgetAmountInput.value = "";

  if (deleteCategoryBtn) {
    deleteCategoryBtn.classList.add("hidden");
  }
}

function syncAccountPrimaryControls() {
  const role = accountRoleSelect?.value || "spend";
  const canBePrimary = canAccountBePrimary(role);

  if (accountPrimarySpendInput) {
    accountPrimarySpendInput.disabled = !canBePrimary;

    if (!canBePrimary) {
      accountPrimarySpendInput.checked = false;
    }
  }

  if (accountPrimaryNote) {
    if (role === "vault_pool") {
      accountPrimaryNote.textContent =
        "ÐÐ°ÐºÐ¾Ð¿Ð¸ÑÐµÐ»ÑÐ½ÑÐ¹ ÑÑÑÑ Ð½ÐµÐ»ÑÐ·Ñ Ð´ÐµÐ»Ð°ÑÑ Ð¾ÑÐ½Ð¾Ð²Ð½ÑÐ¼. ÐÐ½ Ð¸ÑÐ¿Ð¾Ð»ÑÐ·ÑÐµÑÑÑ ÐºÐ°Ðº ÐºÐ¾Ð½ÑÐµÐ¹Ð½ÐµÑ Ð´Ð»Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹.";
    } else if (role === "reserve") {
      accountPrimaryNote.textContent =
        "Ð ÐµÐ·ÐµÑÐ²Ð½ÑÐ¹ ÑÑÑÑ Ð½ÐµÐ»ÑÐ·Ñ Ð´ÐµÐ»Ð°ÑÑ Ð¾ÑÐ½Ð¾Ð²Ð½ÑÐ¼ Ð´Ð»Ñ ÐµÐ¶ÐµÐ´Ð½ÐµÐ²Ð½ÑÑ ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ð¹.";
    } else {
      accountPrimaryNote.textContent =
        "Ð­ÑÐ¾Ñ ÑÑÑÑ Ð±ÑÐ´ÐµÑ Ð¿Ð¾Ð´ÑÑÐ°Ð²Ð»ÑÑÑÑÑ Ð¿Ð¾ ÑÐ¼Ð¾Ð»ÑÐ°Ð½Ð¸Ñ Ð² ÑÐ°ÑÑÐ¾Ð´Ð°Ñ Ð¸ Ð´Ð¾ÑÐ¾Ð´Ð°Ñ.";
    }
  }
}

function openCreateAccountModal() {
  if (!accountModal) return;

  activeAccountId = null;

  accountModalTitle.textContent = "ÐÐ¾Ð²ÑÐ¹ ÑÑÑÑ";
  accountNameInput.value = "";
  accountRoleSelect.value = "spend";
  accountPrimarySpendInput.checked = false;

  deleteAccountModalBtn?.classList.add("hidden");
  syncAccountPrimaryControls();

  openAnimatedModal(accountModal);
document.body.style.overflow = "hidden";
}

function openAccountModal(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account || !accountModal) return;

  activeAccountId = accountId;

  accountModalTitle.textContent = account.name;
  accountNameInput.value = account.name || "";
  accountRoleSelect.value = account.account_kind || "spend";
  accountPrimarySpendInput.checked = Boolean(account.is_primary_spend);

  deleteAccountModalBtn?.classList.remove("hidden");
  syncAccountPrimaryControls();

  openAnimatedModal(accountModal);
document.body.style.overflow = "hidden";
}

function closeAccountModal() {
  if (!accountModal) return;

  closeAnimatedModal(accountModal);
activeAccountId = null;

  accountNameInput.value = "";
  accountRoleSelect.value = "spend";
  accountPrimarySpendInput.checked = false;
  deleteAccountModalBtn?.classList.add("hidden");
}

async function saveAccountModal() {
  const nextName = accountNameInput.value.trim();
  const nextRole = accountRoleSelect.value;

  if (!nextName) {
    alert("ÐÐ²ÐµÐ´Ð¸ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ ÑÑÑÑÐ°");
    return;
  }

  const duplicateName = state.accounts.find((account) => {
    if (activeAccountId && account.id === activeAccountId) return false;
    return String(account.name || "").trim().toLowerCase() === nextName.toLowerCase();
  });

  if (duplicateName) {
    alert("Ð¡ÑÑÑ Ñ ÑÐ°ÐºÐ¸Ð¼ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸ÐµÐ¼ ÑÐ¶Ðµ ÑÑÑÐµÑÑÐ²ÑÐµÑ");
    return;
  }

  const flags = getAccountRoleFlags(nextRole);
  const isPrimary = canAccountBePrimary(nextRole) && accountPrimarySpendInput.checked;

  const currentVaultAccount = getVaultAccount();
  if (nextRole === "vault_pool") {
    const anotherVaultExists =
      currentVaultAccount && currentVaultAccount.id !== activeAccountId;

    if (anotherVaultExists) {
      alert("ÐÐ°ÐºÐ¾Ð¿Ð¸ÑÐµÐ»ÑÐ½ÑÐ¹ ÑÑÑÑ ÑÐ¶Ðµ ÑÑÑÐµÑÑÐ²ÑÐµÑ. Ð Ð¿ÑÐ¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ð¸ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð±ÑÑÑ ÑÐ¾Ð»ÑÐºÐ¾ Ð¾Ð´Ð¸Ð½ ÑÐ°ÐºÐ¾Ð¹ ÑÑÑÑ.");
      return;
    }
  }

  if (isPrimary) {
    const { error: resetPrimaryError } = await supabaseClient
      .from("accounts")
      .update({ is_primary_spend: false })
      .neq("id", activeAccountId || "");

    if (resetPrimaryError) {
      alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ±ÑÐ¾ÑÐ° Ð¾ÑÐ½Ð¾Ð²Ð½Ð¾Ð³Ð¾ ÑÑÑÑÐ°");
      console.error(resetPrimaryError);
      return;
    }
  }

  if (activeAccountId) {
    const { error } = await supabaseClient
      .from("accounts")
      .update({
        name: nextName,
        account_kind: nextRole,
        include_in_free_money: flags.include_in_free_money,
        is_protected: flags.is_protected,
        is_primary_spend: isPrimary,
        subtitle: "",
      })
      .eq("id", activeAccountId);

    if (error) {
      alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ ÑÑÑÑÐ°");
      console.error(error);
      return;
    }
  } else {
    const nextSortOrder =
      (state.accounts.reduce((max, account) => Math.max(max, Number(account.sort_order) || 0), 0) || 0) + 1;

    const { error } = await supabaseClient
      .from("accounts")
      .insert({
        id: crypto.randomUUID(),
        name: nextName,
        account_kind: nextRole,
        include_in_free_money: flags.include_in_free_money,
        is_protected: flags.is_protected,
        is_primary_spend: isPrimary,
        subtitle: "",
        sort_order: nextSortOrder,
      });

    if (error) {
      alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ñ ÑÑÑÑÐ°");
      console.error(error);
      return;
    }
  }

  await loadDataFromSupabase();
  renderAll();
  closeAccountModal();
}

async function deleteAccountModalAction() {
  if (!activeAccountId) return;

  const account = state.accounts.find((item) => item.id === activeAccountId);
  if (!account) return;

  if (account.account_kind === "vault_pool") {
    alert("Ð¡ÐµÐ¹ÑÑ Ð¯Ð½Ð´ÐµÐºÑÐ° Ð½ÐµÐ»ÑÐ·Ñ ÑÐ´Ð°Ð»Ð¸ÑÑ ÐºÐ°Ðº Ð¾Ð±ÑÑÐ½ÑÐ¹ ÑÑÑÑ");
    return;
  }

  const ok = confirm(`Ð£Ð´Ð°Ð»Ð¸ÑÑ ÑÑÑÑ "${account.name}"? ÐÐ¿ÐµÑÐ°ÑÐ¸Ð¸ Ð¾ÑÑÐ°Ð½ÑÑÑÑ Ð² Ð¸ÑÑÐ¾ÑÐ¸Ð¸.`);
  if (!ok) return;

  const { error: accountDetachError } = await supabaseClient
    .from("transactions")
    .update({
      account_id: null,
      account: account.name,
    })
    .eq("account_id", account.id);

  if (accountDetachError) {
    alert(`ÐÑÐ¸Ð±ÐºÐ° Ð¾ÑÐ²ÑÐ·ÐºÐ¸ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹ ÑÑÑÑÐ°: ${accountDetachError.message || "unknown error"}`);
    console.error(accountDetachError);
    return;
  }

  const { error: fromDetachError } = await supabaseClient
    .from("transactions")
    .update({
      from_account_id: null,
      from_account: account.name,
    })
    .eq("from_account_id", account.id);

  if (fromDetachError) {
    alert(`ÐÑÐ¸Ð±ÐºÐ° Ð¾ÑÐ²ÑÐ·ÐºÐ¸ Ð¿ÐµÑÐµÐ²Ð¾Ð´Ð¾Ð² ÑÐ¾ ÑÑÑÑÐ°: ${fromDetachError.message || "unknown error"}`);
    console.error(fromDetachError);
    return;
  }

  const { error: toDetachError } = await supabaseClient
    .from("transactions")
    .update({
      to_account_id: null,
      to_account: account.name,
    })
    .eq("to_account_id", account.id);

  if (toDetachError) {
    alert(`ÐÑÐ¸Ð±ÐºÐ° Ð¾ÑÐ²ÑÐ·ÐºÐ¸ Ð¿ÐµÑÐµÐ²Ð¾Ð´Ð¾Ð² Ð½Ð° ÑÑÑÑ: ${toDetachError.message || "unknown error"}`);
    console.error(toDetachError);
    return;
  }

  const { error: deleteError } = await supabaseClient
    .from("accounts")
    .delete()
    .eq("id", activeAccountId);

  if (deleteError) {
    alert(`ÐÑÐ¸Ð±ÐºÐ° ÑÐ´Ð°Ð»ÐµÐ½Ð¸Ñ ÑÑÑÑÐ°: ${deleteError.message || "unknown error"}`);
    console.error(deleteError);
    return;
  }

  activeAccountId = null;

  await loadDataFromSupabase();
  renderAll();
  closeAccountModal();
}
  
function openSafeBucketsModal() {
  if (!safeBucketsModal) return;

  try {
    if (safeBucketsModalTitle) {
      safeBucketsModalTitle.textContent = getSafeAccountName() || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ";
    }

    renderSafeBucketsModal();
    openAnimatedModal(safeBucketsModal);
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("safeBucketsModal open error:", error);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð¾ÑÐºÑÑÑÐ¸Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹. Ð¡Ð¼Ð¾ÑÑÐ¸ console.");
  }
}

function closeSafeBucketsModal() {
  if (!safeBucketsModal) return;

  closeAnimatedModal(safeBucketsModal);
newSafeBucketNameInput.value = "";
}

function openSafeBucketAmountModal(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  if (!bucket || !safeBucketAmountModal) return;

  activeSafeBucketAmountId = bucketId;
  
  const activeSafeBucket = state.safeBuckets.find((item) => {
  return item.id === activeSafeBucketAmountId;
});

if (activeSafeBucket) {
  safeBucketAmountModalTitle.textContent = activeSafeBucket.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";
  safeBucketNameInput.value = activeSafeBucket.name || "";
  deleteSafeBucketBtn?.classList.remove("hidden");
}

  const balance = getSafeBucketBalance(bucketId);
  const annualRate = getSafeBucketInterestAnnualRate(bucketId);

  safeBucketAmountModalTitle.textContent = bucket.name;
  safeBucketAmountCurrentValue.textContent = `Ð¡ÐµÐ¹ÑÐ°Ñ: ${formatMoney(balance)}`;
  safeBucketNameInput.value = bucket.name || "";
  safeBucketInterestInput.value = String(roundToTwo(annualRate * 100)).replace(".", ",");
  safeBucketAmountInput.value = String(balance).replace(".", ",");

  if (deleteSafeBucketBtn) {
    deleteSafeBucketBtn.classList.toggle("hidden", Boolean(bucket.is_locked));
  }

  openAnimatedModal(safeBucketAmountModal);

  window.setTimeout(() => {
    safeBucketNameInput.focus();
    safeBucketNameInput.select();
  }, 120);
}

function closeSafeBucketAmountModal() {
  if (!safeBucketAmountModal) return;

  closeAnimatedModal(safeBucketAmountModal);
  activeSafeBucketAmountId = null;
  safeBucketNameInput.value = "";
  safeBucketInterestInput.value = "";
  safeBucketAmountInput.value = "";

  if (deleteSafeBucketBtn) {
    deleteSafeBucketBtn.classList.add("hidden");
  }
}

function renderSafeBucketsModal() {
  if (!safeBucketsList) return;

  const totalSafeBalance = roundToTwo(
    getRealSafeBuckets().reduce((sum, bucket) => {
      return sum + getSafeBucketBalance(bucket.id);
    }, 0)
  );

  safeBucketsUnassignedCard?.remove();

  if (safeBucketsModalTotalLabel) {
    safeBucketsModalTotalLabel.textContent = `ÐÐ±ÑÐ¸Ð¹ Ð±Ð°Ð»Ð°Ð½Ñ: ${formatMoney(totalSafeBalance)}`;
  }
  safeBucketsList.innerHTML = "";

  if (!state.safeBuckets.length) {
    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹ Ð¿Ð¾ÐºÐ° Ð½ÐµÑ</h3>
      </div>
    `;
    safeBucketsList.appendChild(empty);
    return;
  }

  state.safeBuckets
    .slice()
    .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
    .forEach((bucket) => {
      const balance = getSafeBucketBalance(bucket.id);

      const card = document.createElement("button");
      card.type = "button";
      card.className = "list-card list-card--clickable safe-buckets-wallet-row safe-buckets-wallet-row--editable";
      card.dataset.safeBucketOpenId = bucket.id;

      card.innerHTML = `
        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(bucket.name)}</h3>
          </div>
        </div>

        <div class="list-right">
          <p class="list-value">${formatMoney(balance)}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        openSafeBucketAmountModal(bucket.id);
      });

      safeBucketsList.appendChild(card);
    });
}

async function addSafeBucket() {
  const name = newSafeBucketNameInput?.value.trim();

  if (!name) {
    alert("ÐÐ²ÐµÐ´Ð¸ÑÐµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    return;
  }

  const duplicate = state.safeBuckets.find(
    (bucket) => String(bucket.name || "").trim().toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    alert("Ð¢Ð°ÐºÐ¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ ÑÐ¶Ðµ ÐµÑÑÑ");
    return;
  }

  const nextSortOrder =
    (state.safeBuckets.reduce((max, bucket) => Math.max(max, Number(bucket.sort_order) || 0), 0) || 0) + 1;

  const newSafeBucket = {
    name,
    is_locked: false,
    sort_order: nextSortOrder,
  };

  const { error } = await supabaseClient
    .from("safe_buckets")
    .insert(newSafeBucket);

    if (error) {
    alert(`ÐÑÐ¸Ð±ÐºÐ° Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ: ${error.message || "unknown error"}`);
    console.error(error);
    return;
  }

  if (newSafeBucketNameInput) {
    newSafeBucketNameInput.value = "";
  }

  await loadDataFromSupabase();
  renderAll();
  renderSafeBucketsModal();
}

async function saveSafeBucketAmount() {
  if (!activeSafeBucketAmountId) return;

  const nextName = safeBucketNameInput.value.trim();
  const interestRaw = safeBucketInterestInput.value.replace(/\s/g, "").replace(",", ".");
const nextInterestPercent = Number(interestRaw);
const nextAmount = parseMoneyInputValue(safeBucketAmountInput.value);

  if (!nextName) {
    alert("ÐÐ²ÐµÐ´Ð¸ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    return;
  }

  if (Number.isNaN(nextInterestPercent) || nextInterestPercent < 0) {
    alert("ÐÐ²ÐµÐ´Ð¸ ÐºÐ¾ÑÑÐµÐºÑÐ½ÑÐ¹ Ð³Ð¾Ð´Ð¾Ð²Ð¾Ð¹ Ð¿ÑÐ¾ÑÐµÐ½Ñ");
    return;
  }

  if (Number.isNaN(nextAmount) || nextAmount < 0) {
    alert("ÐÐ²ÐµÐ´Ð¸ ÐºÐ¾ÑÑÐµÐºÑÐ½ÑÑ ÑÑÐ¼Ð¼Ñ");
    return;
  }

  const duplicate = state.safeBuckets.find((bucket) => {
    if (bucket.id === activeSafeBucketAmountId) return false;
    return String(bucket.name || "").trim().toLowerCase() === nextName.toLowerCase();
  });

  if (duplicate) {
    alert("ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ Ñ ÑÐ°ÐºÐ¸Ð¼ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸ÐµÐ¼ ÑÐ¶Ðµ ÑÑÑÐµÑÑÐ²ÑÐµÑ");
    return;
  }

  const { error: updateBucketError } = await supabaseClient
    .from("safe_buckets")
    .update({
      name: nextName,
    })
    .eq("id", activeSafeBucketAmountId);

  if (updateBucketError) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    console.error(updateBucketError);
    return;
  }

  const interestMap = getSafeBucketInterestRatesMap();
  interestMap[activeSafeBucketAmountId] = roundToTwo(nextInterestPercent / 100);

  const { error: interestError } = await supabaseClient
    .from("app_meta")
    .upsert({
      key: "safe_bucket_interest_rates",
      value: JSON.stringify(interestMap),
    });

  if (interestError) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ Ð¿ÑÐ¾ÑÐµÐ½ÑÐ° Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    console.error(interestError);
    return;
  }

  const ok = await setSafeBucketTargetAmount(activeSafeBucketAmountId, nextAmount);
  if (!ok) return;

  await loadDataFromSupabase();
  renderAll();
  renderSafeBucketsModal();
  closeSafeBucketAmountModal();
}

async function deleteSafeBucketFromModal() {
  if (!activeSafeBucketAmountId) return;

  const bucket = getSafeBucketById(activeSafeBucketAmountId);
  if (!bucket || bucket.is_locked) return;

  const balanceBeforeDelete = getSafeBucketBalance(bucket.id);
  if (Math.abs(balanceBeforeDelete) > 0.009) {
    alert("ÐÐµÐ»ÑÐ·Ñ ÑÐ´Ð°Ð»Ð¸ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ, Ð¿Ð¾ÐºÐ° Ð² Ð½ÑÐ¼ ÐµÑÑÑ Ð´ÐµÐ½ÑÐ³Ð¸");
    return;
  }

  const ok = confirm(`Ð£Ð´Ð°Ð»Ð¸ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ "${bucket.name}"?`);
  if (!ok) return;

  const { error } = await supabaseClient
    .from("safe_buckets")
    .delete()
    .eq("id", bucket.id);

  if (error) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ´Ð°Ð»ÐµÐ½Ð¸Ñ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    console.error(error);
    return;
  }

  await loadDataFromSupabase();
  renderAll();
  renderSafeBucketsModal();
  closeSafeBucketAmountModal();
}

  function resetForm() {
  amountInput.value = "";
  dateInput.value = getTodayDateValue();
  commentInput.value = "";
  categorySelect.innerHTML = `<option value="">ÐÑÐ±ÐµÑÐ¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ</option>`;
  accountSelect.selectedIndex = 0;
  fromAccountSelect.selectedIndex = 0;
  toAccountSelect.selectedIndex = 0;

  if (fromSafeBucketSelect) {
    fromSafeBucketSelect.innerHTML = `<option value="">ÐÐ· ÐºÐ°ÐºÐ¾Ð³Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ</option>`;
    fromSafeBucketSelect.value = "";
  }

  if (toSafeBucketSelect) {
    toSafeBucketSelect.innerHTML = `<option value="">Ð ÐºÐ°ÐºÐ¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ</option>`;
    toSafeBucketSelect.value = "";
  }

  fromSafeBucketField?.classList.add("hidden");
  toSafeBucketField?.classList.add("hidden");
}

  function openModal(mode) {
  currentMode = mode;
  editingTransactionId = null;
  deleteTransactionBtn.classList.add("hidden");

  resetForm();

  if (mode === "expense") {
    modalTitle.textContent = "ÐÐ¾Ð±Ð°Ð²Ð¸ÑÑ ÑÐ°ÑÑÐ¾Ð´";
    saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ ÑÐ°ÑÑÐ¾Ð´";

    categoryField.classList.remove("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillExpenseCategorySelect();
    fillAccountSelect(accountSelect, "ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ");

    const defaultExpenseAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    accountSelect.value = defaultExpenseAccountId;
  } else if (mode === "income") {
    modalTitle.textContent = "ÐÐ¾Ð±Ð°Ð²Ð¸ÑÑ Ð´Ð¾ÑÐ¾Ð´";
    saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ Ð´Ð¾ÑÐ¾Ð´";

    categoryField.classList.add("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillAccountSelect(accountSelect, "ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ");

    const defaultIncomeAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    accountSelect.value = defaultIncomeAccountId;
  } else if (mode === "transfer") {
    modalTitle.textContent = "Ð¡Ð´ÐµÐ»Ð°ÑÑ Ð¿ÐµÑÐµÐ²Ð¾Ð´";
    saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ Ð¿ÐµÑÐµÐ²Ð¾Ð´";

    categoryField.classList.add("hidden");
    accountField.classList.add("hidden");
    fromAccountField.classList.remove("hidden");
    toAccountField.classList.remove("hidden");

    fillAccountSelect(fromAccountSelect, "Ð¡ ÐºÐ°ÐºÐ¾Ð³Ð¾ ÑÑÑÑÐ°");
    fillAccountSelect(toAccountSelect, "ÐÐ° ÐºÐ°ÐºÐ¾Ð¹ ÑÑÑÑ");

    const defaultFromAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    const cashFallbackId =
      getCashAccountId() ||
      getSpendableAccounts().find((account) => account.id !== defaultFromAccountId)?.id ||
      "";

    fromAccountSelect.value = defaultFromAccountId;
    fillAccountSelect(toAccountSelect, "ÐÐ° ÐºÐ°ÐºÐ¾Ð¹ ÑÑÑÑ", cashFallbackId, {
      excludeId: defaultFromAccountId,
    });
    toAccountSelect.value = cashFallbackId;

    fromSafeBucketField.classList.add("hidden");
    toSafeBucketField.classList.add("hidden");

    fillSafeBucketSelect(fromSafeBucketSelect, "ÐÐ· ÐºÐ°ÐºÐ¾Ð³Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    fillSafeBucketSelect(toSafeBucketSelect, "Ð ÐºÐ°ÐºÐ¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ");
    updateTransferSafeFields();
  }

  openAnimatedModal(modal);
  document.body.style.overflow = "hidden";
}

function openEditModal(transactionId) {
  const transaction = state.transactions.find((item) => item.id === transactionId);
  if (!transaction) return;

  editingTransactionId = transaction.id;
  currentMode = transaction.type;
  deleteTransactionBtn.classList.remove("hidden");

  resetForm();

  if (transaction.type === "expense") {
    modalTitle.textContent = "Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°ÑÑ ÑÐ°ÑÑÐ¾Ð´";
    saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ";

    categoryField.classList.remove("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillExpenseCategorySelect(transaction.category_id || UNCATEGORIZED_ID);

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();
    fillAccountSelect(accountSelect, "ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ", transaction.account_id);
    accountSelect.value = transaction.account_id || "";
    commentInput.value = transaction.title === "ÐÐ¾Ð²Ð°Ñ ÑÑÐ°ÑÐ°" ? "" : transaction.title;
  } else if (transaction.type === "income") {
    modalTitle.textContent = "Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°ÑÑ Ð´Ð¾ÑÐ¾Ð´";
    saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ";

    categoryField.classList.add("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();
    fillAccountSelect(accountSelect, "ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ", transaction.account_id);
    accountSelect.value = transaction.account_id || "";
    commentInput.value = transaction.title === "ÐÐ¾Ð²ÑÐ¹ Ð´Ð¾ÑÐ¾Ð´" ? "" : transaction.title;
  } else if (transaction.type === "transfer") {
    modalTitle.textContent = "Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°ÑÑ Ð¿ÐµÑÐµÐ²Ð¾Ð´";
    saveBtn.textContent = "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ";

    categoryField.classList.add("hidden");
    accountField.classList.add("hidden");
    fromAccountField.classList.remove("hidden");
    toAccountField.classList.remove("hidden");

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();

    fillAccountSelect(fromAccountSelect, "Ð¡ ÐºÐ°ÐºÐ¾Ð³Ð¾ ÑÑÑÑÐ°", transaction.from_account_id);
    fillAccountSelect(toAccountSelect, "ÐÐ° ÐºÐ°ÐºÐ¾Ð¹ ÑÑÑÑ", transaction.to_account_id, {
      excludeId: transaction.from_account_id,
    });

    fromAccountSelect.value = transaction.from_account_id || "";
    toAccountSelect.value = transaction.to_account_id || "";
    commentInput.value = transaction.title === "ÐÐµÑÐµÐ²Ð¾Ð´" ? "" : transaction.title;

    fillSafeBucketSelect(
      fromSafeBucketSelect,
      "ÐÐ· ÐºÐ°ÐºÐ¾Ð³Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
      transaction.from_safe_bucket_id || ""
    );
    fillSafeBucketSelect(
      toSafeBucketSelect,
      "Ð ÐºÐ°ÐºÐ¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ",
      transaction.to_safe_bucket_id || ""
    );
    updateTransferSafeFields();

    if (transaction.from_safe_bucket_id) {
      fromSafeBucketSelect.value = transaction.from_safe_bucket_id;
    }

    if (transaction.to_safe_bucket_id) {
      toSafeBucketSelect.value = transaction.to_safe_bucket_id;
    }
  }

  openAnimatedModal(modal);
  document.body.style.overflow = "hidden";
}

function closeModal() {
  closeAnimatedModal(modal);
  editingTransactionId = null;
}
  
  async function applySafeInterestIfNeeded() {
  const today = new Date();
  const todayString = getDateOnlyString(today);

  const lastAppliedDate = getAppMetaValue("safe_interest_last_applied_date");

  if (lastAppliedDate === todayString) {
    return;
  }

  let startDate;

  if (!lastAppliedDate) {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 1);
  } else {
    startDate = new Date(`${lastAppliedDate}T00:00:00`);
  }

  const daysToApply = [];
  const cursor = new Date(startDate);

  while (true) {
    cursor.setDate(cursor.getDate() + 1);
    const cursorString = getDateOnlyString(cursor);

    if (cursorString > todayString) break;
    daysToApply.push(new Date(cursor));
  }

  if (!daysToApply.length) {
    return;
  }

  for (const day of daysToApply) {
    const dayString = getDateOnlyString(day);

    for (const bucket of state.safeBuckets) {
      const bucketBalance = getSafeBucketBalance(bucket.id);
      const annualRate = getSafeBucketInterestAnnualRate(bucket.id);

      if (bucketBalance <= 0) continue;
      if (annualRate <= 0) continue;

      const dailyRate = annualRate / 365;
      const interestAmount = roundToTwo(bucketBalance * dailyRate);

      if (interestAmount <= 0) continue;

      const interestTransaction = {
        id: crypto.randomUUID(),
        type: "income",
        title: "ÐÑÐ¾ÑÐµÐ½ÑÑ Ð¿Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
        account_id: getSafeAccountId(),
        account: getSafeAccountName(),
        category_id: null,
        from_account_id: null,
        to_account_id: null,
        from_account: null,
        to_account: null,
        from_safe_bucket_id: null,
        to_safe_bucket_id: bucket.id,
        amount: interestAmount,
        time_label: "00:01",
        created_at: `${dayString}T00:01:00`,
      };

      const { error: insertError } = await supabaseClient
        .from("transactions")
        .insert(interestTransaction);

      if (insertError) {
        console.error(insertError);
        alert("ÐÑÐ¸Ð±ÐºÐ° Ð½Ð°ÑÐ¸ÑÐ»ÐµÐ½Ð¸Ñ Ð¿ÑÐ¾ÑÐµÐ½ÑÐ¾Ð² Ð¿Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸ÑÐ¼");
        return;
      }

      state.transactions.push(interestTransaction);
    }
  }

  const { error: metaError } = await supabaseClient
    .from("app_meta")
    .upsert({
      key: "safe_interest_last_applied_date",
      value: todayString,
    });

  if (metaError) {
    console.error(metaError);
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ Ð´Ð°ÑÑ Ð½Ð°ÑÐ¸ÑÐ»ÐµÐ½Ð¸Ñ Ð¿ÑÐ¾ÑÐµÐ½ÑÐ¾Ð²");
  }
}

  /* =========================================================
     08. RENDER: MAIN / ANALYTICS / INSIGHTS
     ========================================================= */
  function renderBalance() {
  const balance = calculateBalance();
  const freeMoney = getFreeMoneyTotal();
  const balanceSection = document.querySelector(".balance");
  const balanceLabelEl = document.querySelector(".balance-label");

  animateCurrencyValue(balanceEl, balance, { duration: 1850, decimals: 2 });
animateLabeledCurrencyValue(balanceFreeMoneyValueEl, "Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½Ð¾: ", freeMoney, {
  duration: 1450,
  decimals: 2,
});

  if (accountsTotalEl) {
    accountsTotalEl.textContent = "";
  }

  balanceSection?.classList.remove("balance--enter");
  balanceLabelEl?.classList.remove("balance-label--enter");
  balanceEl?.classList.remove("balance-amount--enter");
  balanceFreeMoneyValueEl?.classList.remove("balance-subline--enter");

  requestAnimationFrame(() => {
    balanceSection?.classList.add("balance--enter");
    balanceLabelEl?.classList.add("balance-label--enter");
    balanceEl?.classList.add("balance-amount--enter");
    balanceFreeMoneyValueEl?.classList.add("balance-subline--enter");
  });
}

  function renderAccounts() {
  accountsListEl.innerHTML = "";

  state.accounts.forEach((account) => {
    const currentBalance = getAccountBalance(account.id);

    const card = document.createElement("div");
    card.className = "list-card list-card--clickable";

    card.innerHTML = `
      <div class="list-icon list-icon--account">
        ${getAccountRoleIconSvg(account)}
      </div>

      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(account.name)}</h3>
        </div>
        <p class="list-subtitle">${escapeHtml(getAccountRoleLabel(account))}</p>
      </div>

      <div class="list-right">
        <p class="list-value">${formatMoney(currentBalance)}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      if (account.id === getSafeAccountId()) {
        openSafeBucketsModal();
      } else {
        openAccountModal(account.id);
      }
    });

    accountsListEl.appendChild(card);
  });
}

  function renderCategoriesManager() {
  categoriesManagerList.innerHTML = "";

  state.categories.forEach((category) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "list-card list-card--clickable category-row";

    const typeLabel = category.is_required ? "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð°Ñ" : "ÐÐ¸Ð±ÐºÐ°Ñ";
const lockedLabel = category.locked ? "Ð¡Ð¸ÑÑÐµÐ¼Ð½Ð°Ñ" : "Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÑÐµÐ¼Ð°Ñ";

card.innerHTML = `
  <div class="list-body">
    <div class="list-title-row">
      <h3 class="list-title">${escapeHtml(category.name)}</h3>
    </div>
    <p class="list-subtitle">${lockedLabel}</p>
  </div>

  <div class="category-row__meta">
    <span class="category-row__pill ${category.is_required ? "category-row__pill--required" : ""}">
      ${typeLabel}
    </span>
    <span class="category-row__chevron">âº</span>
  </div>
`;

    card.addEventListener("click", () => {
      openBudgetModal(category.id);
    });

    categoriesManagerList.appendChild(card);
  });
}

  /* =========================================================
     09. TRANSACTIONS CRUD
     ========================================================= */
  function buildTransactionFromForm() {
  const amount = parseMoneyInputValue(amountInput.value);
  const comment = commentInput.value.trim();

  if (!amount || amount <= 0) {
    alert("ÐÐ²ÐµÐ´Ð¸ ÑÑÐ¼Ð¼Ñ");
    return null;
  }

  const selectedDate = dateInput.value || getTodayDateValue();
  const existingTransaction = editingTransactionId
    ? state.transactions.find((item) => item.id === editingTransactionId)
    : null;

  const preservedTime = existingTransaction?.created_at
    ? String(existingTransaction.created_at).slice(11, 19) || new Date().toTimeString().slice(0, 8)
    : new Date().toTimeString().slice(0, 8);

  const createdAt = `${selectedDate}T${preservedTime}`;

  if (currentMode === "transfer") {
    const fromAccountId = fromAccountSelect.value;
    const toAccountId = toAccountSelect.value;

    const fromAccount = getAccountNameById(fromAccountId);
    const toAccount = getAccountNameById(toAccountId);

    const fromSafeBucketId =
      isVaultAccountId(fromAccountId) ? fromSafeBucketSelect.value : null;
    const toSafeBucketId =
      isVaultAccountId(toAccountId) ? toSafeBucketSelect.value : null;

    if (!fromAccountId) {
      alert("ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ñ");
      return null;
    }

    if (!toAccountId) {
      alert("ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ Ð·Ð°ÑÐ¸ÑÐ»ÐµÐ½Ð¸Ñ");
      return null;
    }

    if (fromAccountId === toAccountId) {
      const sameBuckets =
        !isVaultAccountId(fromAccountId) ||
        (fromSafeBucketId && toSafeBucketId && fromSafeBucketId === toSafeBucketId);

      if (sameBuckets) {
        alert("Ð¡ÑÐµÑÐ° Ð´Ð¾Ð»Ð¶Ð½Ñ Ð±ÑÑÑ ÑÐ°Ð·Ð½ÑÐ¼Ð¸");
        return null;
      }
    }

    if (isVaultAccountId(fromAccountId) && !fromSafeBucketId) {
      alert("ÐÑÐ±ÐµÑÐ¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ñ");
      return null;
    }

    if (isVaultAccountId(toAccountId) && !toSafeBucketId) {
      alert("ÐÑÐ±ÐµÑÐ¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ Ð·Ð°ÑÐ¸ÑÐ»ÐµÐ½Ð¸Ñ");
      return null;
    }
    
    // Ð¿ÑÐ¾Ð²ÐµÑÑÐµÐ¼ Ð¾ÑÑÐ°ÑÐ¾Ðº Ð´Ð»Ñ Ð¿ÐµÑÐµÐ²Ð¾Ð´Ð°
let fromBalance = getAccountBalance(fromAccountId);
if (isVaultAccountId(fromAccountId) && fromSafeBucketId) {
  // ÐµÑÐ»Ð¸ Ð¿ÐµÑÐµÐ²Ð¾Ð´Ð¸Ð¼ Ð¸Ð· Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ, Ð±ÐµÑÐµÐ¼ Ð±Ð°Ð»Ð°Ð½Ñ Ð²ÑÐ±ÑÐ°Ð½Ð½Ð¾Ð³Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ
  fromBalance = getSafeBucketBalance(fromSafeBucketId);
}
if (amount > fromBalance) {
  alert("ÐÐµÐ´Ð¾ÑÑÐ°ÑÐ¾ÑÐ½Ð¾ ÑÑÐµÐ´ÑÑÐ² Ð½Ð° ÑÑÑÑÐµ Ð´Ð»Ñ Ð¿ÐµÑÐµÐ²Ð¾Ð´Ð°");
  return null;
}

    return {
      id: editingTransactionId || crypto.randomUUID(),
      type: "transfer",
      title: comment || "ÐÐµÑÐµÐ²Ð¾Ð´",
      amount,
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      from_account: fromAccount,
      to_account: toAccount,
      from_safe_bucket_id: fromSafeBucketId,
      to_safe_bucket_id: toSafeBucketId,
      created_at: createdAt,
      time_label: getCurrentTime(),
      category_id: null,
      account_id: null,
      account: null,
    };
  }

  const accountId = accountSelect.value;
  const account = getAccountNameById(accountId);

  if (!accountId) {
    alert("ÐÑÐ±ÐµÑÐ¸ ÑÑÑÑ");
    return null;
  }

  if (currentMode === "income") {
  // Ð´Ð¾ÑÐ¾Ð´ â Ð¿ÑÐ¾Ð²ÐµÑÐºÐ° Ð¾ÑÑÐ°ÑÐºÐ° Ð½Ðµ Ð½ÑÐ¶Ð½Ð°, Ð¿ÑÐ¾ÑÑÐ¾ Ð²Ð¾Ð·Ð²ÑÐ°ÑÐ°ÐµÐ¼ Ð¾Ð±ÑÐµÐºÑ
  return {
    id: editingTransactionId || crypto.randomUUID(),
    type: "income",
    title: comment || "ÐÐ¾Ð²ÑÐ¹ Ð´Ð¾ÑÐ¾Ð´",
    amount,
    account_id: accountId,
    account,
    category_id: null,
    from_account_id: null,
    to_account_id: null,
    from_account: null,
    to_account: null,
    from_safe_bucket_id: null,
    to_safe_bucket_id: isVaultAccountId(accountId)
      ? getFreeSafeBucket()?.id || null
      : null,
    created_at: createdAt,
    time_label: getCurrentTime(),
  };
}

  const categoryId = categorySelect.value;

  if (!categoryId) {
    alert("ÐÑÐ±ÐµÑÐ¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ");
    return null;
  }

  const freeSafeBucket = isVaultAccountId(accountId) ? getFreeSafeBucket() : null;

  if (isVaultAccountId(accountId) && !freeSafeBucket) {
    alert("ÐÐµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ, Ð¿Ð¾Ð¼ÐµÑÐµÐ½Ð½Ð¾Ðµ ÐºÐ°Ðº ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸.");
    return null;
  }
  
let accBalance = getAccountBalance(accountId);
if (isVaultAccountId(accountId)) {
  const freeBucket = getFreeSafeBucket();
  accBalance = freeBucket ? getSafeBucketBalance(freeBucket.id) : accBalance;
}
if (amount > accBalance) {
  alert("ÐÐµÐ´Ð¾ÑÑÐ°ÑÐ¾ÑÐ½Ð¾ ÑÑÐµÐ´ÑÑÐ² Ð½Ð° ÑÑÑÑÐµ");
  return null;
}

  return {
    id: editingTransactionId || crypto.randomUUID(),
    type: "expense",
    title: comment || "ÐÐ¾Ð²Ð°Ñ ÑÑÐ°ÑÐ°",
    amount,
    account_id: accountId,
    account,
    category_id: categoryId,
    from_account_id: null,
    to_account_id: null,
    from_account: null,
    to_account: null,
    from_safe_bucket_id: isVaultAccountId(accountId) ? freeSafeBucket.id : null,
    to_safe_bucket_id: null,
    created_at: createdAt,
    time_label: getCurrentTime(),
  };
}

  async function saveTransaction() {
  const transaction = buildTransactionFromForm();
  if (!transaction) return;

  if (editingTransactionId) {
    const { error } = await supabaseClient
      .from("transactions")
      .update(transaction)
      .eq("id", editingTransactionId);

    if (error) {
      alert("ÐÑÐ¸Ð±ÐºÐ° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸");
      console.error(error);
      return;
    }

    justCreatedTransactionId = null;
  } else {
    const { error } = await supabaseClient
      .from("transactions")
      .insert(transaction);

    if (error) {
      alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸");
      console.error(error);
      return;
    }

    justCreatedTransactionId = transaction.id;
  }

  closeModal();
  await loadDataFromSupabase();
  renderAll();
}

  async function deleteTransaction() {
  if (!editingTransactionId) return;

  const transactionId = editingTransactionId;
  const ok = confirm("Ð£Ð´Ð°Ð»Ð¸ÑÑ ÑÑÑ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ñ?");
  if (!ok) return;

  closeModal();

  await animateTransactionDelete(transactionId);

  const { error } = await supabaseClient
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ´Ð°Ð»ÐµÐ½Ð¸Ñ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¸");
    console.error(error);
    await loadDataFromSupabase();
    renderAll();
    return;
  }

  state.transactions = state.transactions.filter((item) => item.id !== transactionId);
  editingTransactionId = null;

  renderBalance();
  renderAccounts();
  renderTransactions();
  renderAnalytics();

  if (operationsView && !operationsView.classList.contains("hidden")) {
    renderOperationsView();
  }

  if (
    activeAnalyticsCategoryId &&
    analyticsCategoryModal &&
    !analyticsCategoryModal.classList.contains("hidden")
  ) {
    openAnalyticsCategoryModal(activeAnalyticsCategoryId);
  }
}

  /* =========================================================
     10. CATEGORIES / BUDGETS CRUD
     ========================================================= */
async function addCategory() {
  const name = newCategoryNameInput.value.trim();

  if (!name) {
    alert("ÐÐ²ÐµÐ´Ð¸ÑÐµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
    return;
  }

  const newCategory = {
    id: crypto.randomUUID(),
    name,
    locked: false,
    is_required: false,
    sort_order: state.categories.length + 1,
  };

  const { error } = await supabaseClient
    .from("categories")
    .insert(newCategory);

  if (error) {
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
    console.error(error);
    return;
  }

  newCategoryNameInput.value = "";

  await loadDataFromSupabase();
  renderAll();
}

async function saveBudgetLimit() {
  if (!activeBudgetCategoryId) return;

  const nextName = budgetCategoryNameInput.value.trim();
  const isRequired = Boolean(budgetCategoryRequiredInput.checked);
  const amountRaw = budgetAmountInput.value.trim();
const amount = amountRaw === "" ? 0 : parseMoneyInputValue(amountRaw);

  if (!nextName) {
    alert("ÐÐ²ÐµÐ´Ð¸ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
    return;
  }

  if (Number.isNaN(amount) || amount < 0) {
    alert("ÐÐ²ÐµÐ´Ð¸ ÐºÐ¾ÑÑÐµÐºÑÐ½ÑÐ¹ Ð»Ð¸Ð¼Ð¸Ñ");
    return;
  }

  const { error: categoryError } = await supabaseClient
    .from("categories")
    .update({
      name: nextName,
      is_required: isRequired,
    })
    .eq("id", activeBudgetCategoryId);

  if (categoryError) {
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
    console.error(categoryError);
    return;
  }

  const existing = getBudgetLimitByCategoryId(activeBudgetCategoryId);

  if (existing) {
    const { error } = await supabaseClient
      .from("budget_limits")
      .update({ monthly_limit: amount })
      .eq("category_id", activeBudgetCategoryId);

    if (error) {
      alert("ÐÑÐ¸Ð±ÐºÐ° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð»Ð¸Ð¼Ð¸ÑÐ°");
      console.error(error);
      return;
    }
  } else {
    const { error } = await supabaseClient
      .from("budget_limits")
      .insert({
        category_id: activeBudgetCategoryId,
        monthly_limit: amount,
      });

    if (error) {
      alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ¾ÑÑÐ°Ð½ÐµÐ½Ð¸Ñ Ð»Ð¸Ð¼Ð¸ÑÐ°");
      console.error(error);
      return;
    }
  }

  await loadDataFromSupabase();
  renderAll();
  closeBudgetModal();
}

async function deleteCategory() {
  if (!activeBudgetCategoryId) return;

  const category = getCategoryById(activeBudgetCategoryId);
  if (!category || category.locked) return;

  const ok = confirm(
    `Ð£Ð´Ð°Ð»Ð¸ÑÑ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ "${category.name}"? ÐÑÐµ ÑÑÐ°ÑÑÐµ ÑÐ°ÑÑÐ¾Ð´Ñ Ð¿ÐµÑÐµÐ¹Ð´ÑÑ Ð² "ÐÐµÐ· ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸".`
  );
  if (!ok) return;

  const { error: txError } = await supabaseClient
    .from("transactions")
    .update({ category_id: UNCATEGORIZED_ID })
    .eq("type", "expense")
    .eq("category_id", category.id);

  if (txError) {
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð¿ÐµÑÐµÐ½Ð¾ÑÐ° ÑÑÐ°ÑÑÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð²");
    console.error(txError);
    return;
  }

  const { error: budgetDeleteError } = await supabaseClient
    .from("budget_limits")
    .delete()
    .eq("category_id", category.id);

  if (budgetDeleteError) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ´Ð°Ð»ÐµÐ½Ð¸Ñ Ð»Ð¸Ð¼Ð¸ÑÐ° ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
    console.error(budgetDeleteError);
    return;
  }

  const { error: deleteError } = await supabaseClient
    .from("categories")
    .delete()
    .eq("id", category.id);

  if (deleteError) {
    alert("ÐÑÐ¸Ð±ÐºÐ° ÑÐ´Ð°Ð»ÐµÐ½Ð¸Ñ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸");
    console.error(deleteError);
    return;
  }

  await loadDataFromSupabase();
  renderAll();
  closeBudgetModal();
}

  /* =========================================================
     11. SUPABASE LOAD + BOOTSTRAP
     ========================================================= */
  async function loadDataFromSupabase() {
  const [
    { data: accounts, error: accountsError },
    { data: categories, error: categoriesError },
    { data: transactions, error: transactionsError },
    { data: budgetLimits, error: budgetLimitsError },
    { data: safeBuckets, error: safeBucketsError },
    { data: appMeta, error: appMetaError },
  ] = await Promise.all([
    supabaseClient.from("accounts").select("*").order("sort_order", { ascending: true }),
    supabaseClient.from("categories").select("*").order("sort_order", { ascending: true }),
    supabaseClient.from("transactions").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("budget_limits").select("*"),
    supabaseClient.from("safe_buckets").select("*").order("sort_order", { ascending: true }),
    supabaseClient.from("app_meta").select("*"),
  ]);

  if (accountsError) {
    console.error(accountsError);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ ÑÑÐµÑÐ¾Ð² Ð¸Ð· Supabase");
    return;
  }

  if (categoriesError) {
    console.error(categoriesError);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¹ Ð¸Ð· Supabase");
    return;
  }

  if (transactionsError) {
    console.error(transactionsError);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹ Ð¸Ð· Supabase");
    return;
  }

  if (budgetLimitsError) {
    console.error(budgetLimitsError);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð»Ð¸Ð¼Ð¸ÑÐ¾Ð² Ð±ÑÐ´Ð¶ÐµÑÐ° Ð¸Ð· Supabase");
    return;
  }

  if (safeBucketsError) {
    console.error(safeBucketsError);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹ Ð¸Ð· Supabase");
    return;
  }

  if (appMetaError) {
    console.error(appMetaError);
    alert("ÐÑÐ¸Ð±ÐºÐ° Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ ÑÐ»ÑÐ¶ÐµÐ±Ð½ÑÑ Ð´Ð°Ð½Ð½ÑÑ Ð¿ÑÐ¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ");
    return;
  }

    state.accounts = accounts || [];
  state.categories = categories || [];
  state.transactions = transactions || [];
  state.budgetLimits = budgetLimits || [];
    state.safeBuckets = (safeBuckets || []).map((bucket, index) => ({
    ...bucket,
    id: bucket.id || `safe-bucket-${index + 1}`,
    name: bucket.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ",
    icon: bucket.icon || "",
    bucket_kind: bucket.bucket_kind || "custom",
    include_in_free_money: Boolean(bucket.include_in_free_money),
    is_protected: Boolean(bucket.is_protected),
    is_locked: Boolean(bucket.is_locked),
    sort_order: Number(bucket.sort_order) || index + 1,
  }));
  state.appMeta = appMeta || [];
  state.mandatoryPayments = parseMandatoryPaymentsFromMeta();

  ensureUncategorizedCategory();
}

function renderAll() {
  ensureUncategorizedCategory();
  renderBalance();
  renderAccounts();
  renderCategoriesManager();
  renderTransactions();
  renderAnalytics();
}

let monthlyReportSelectedMonthValue = "";

function getMonthlyReportMonthValue() {
  return monthlyReportSelectedMonthValue || getCurrentMonthValue();
}

function getMonthlyReportMonthTransactions(monthValue) {
  return filterTransactionsByPeriod(
    state.transactions,
    "month",
    monthValue,
    "",
    ""
  );
}

function getMonthlyReportMonthLabel(monthValue) {
  const [yearRaw, monthRaw] = String(monthValue || "").split("-");
  const year = Number(yearRaw) || new Date().getFullYear();
  const monthIndex = Math.max(0, Math.min(11, (Number(monthRaw) || new Date().getMonth() + 1) - 1));

  const monthNames = [
    "ÑÐ½Ð²Ð°ÑÑ",
    "ÑÐµÐ²ÑÐ°Ð»Ñ",
    "Ð¼Ð°ÑÑÐ°",
    "Ð°Ð¿ÑÐµÐ»Ñ",
    "Ð¼Ð°Ñ",
    "Ð¸ÑÐ½Ñ",
    "Ð¸ÑÐ»Ñ",
    "Ð°Ð²Ð³ÑÑÑÐ°",
    "ÑÐµÐ½ÑÑÐ±ÑÑ",
    "Ð¾ÐºÑÑÐ±ÑÑ",
    "Ð½Ð¾ÑÐ±ÑÑ",
    "Ð´ÐµÐºÐ°Ð±ÑÑ",
  ];

  return `ÐÑÐ¾Ð³Ð¸ ${monthNames[monthIndex]} ${year}`;
}

function getMonthlyReportMonthButtonLabel(monthIndex) {
  return [
    "ÑÐ½Ð²",
    "ÑÐµÐ²",
    "Ð¼Ð°ÑÑ",
    "Ð°Ð¿Ñ",
    "Ð¼Ð°Ð¹",
    "Ð¸ÑÐ½Ñ",
    "Ð¸ÑÐ»Ñ",
    "Ð°Ð²Ð³",
    "ÑÐµÐ½",
    "Ð¾ÐºÑ",
    "Ð½Ð¾Ñ",
    "Ð´ÐµÐº",
  ][monthIndex];
}

function getMonthlyReportMonthValueByIndex(year, monthIndex) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
}

function renderMonthlyReportMonthSwitch(activeMonthValue) {
  if (!monthlyReportMonthSwitch) return;

  const activeYear =
    Number(String(activeMonthValue || "").slice(0, 4)) ||
    new Date().getFullYear();

  monthlyReportMonthSwitch.innerHTML = "";

  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const monthValue = getMonthlyReportMonthValueByIndex(activeYear, monthIndex);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "monthly-report-month-btn";
    button.textContent = getMonthlyReportMonthButtonLabel(monthIndex);
    button.dataset.monthlyReportMonth = monthValue;

    button.classList.toggle("is-active", monthValue === activeMonthValue);

    button.addEventListener("click", () => {
      monthlyReportSelectedMonthValue = monthValue;
      renderMonthlyReport();
    });

    monthlyReportMonthSwitch.appendChild(button);
  }

  const activeButton = monthlyReportMonthSwitch.querySelector(".is-active");

  activeButton?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}

function renderMonthlyReportHeroState(difference) {
  if (!monthlyReportHero) return;

  monthlyReportHero.classList.remove(
    "monthly-report-hero--profit",
    "monthly-report-hero--loss",
    "monthly-report-hero--neutral"
  );

  if (difference > 0) {
    monthlyReportHero.classList.add("monthly-report-hero--profit");
    return;
  }

  if (difference < 0) {
    monthlyReportHero.classList.add("monthly-report-hero--loss");
    return;
  }

  monthlyReportHero.classList.add("monthly-report-hero--neutral");
}

function renderMonthlyReportFlow(totals) {
  const income = Math.max(0, Number(totals.income) || 0);
  const expense = Math.max(0, Number(totals.expense) || 0);
  const max = Math.max(income, expense, 1);

  const incomeWidth = Math.max(4, Math.round((income / max) * 100));
  const expenseWidth = Math.max(4, Math.round((expense / max) * 100));

  if (monthlyReportIncomeFlowValue) {
    monthlyReportIncomeFlowValue.textContent = formatMoney(income);
  }

  if (monthlyReportExpenseFlowValue) {
    monthlyReportExpenseFlowValue.textContent = formatMoney(expense);
  }

  if (monthlyReportIncomeBar) {
    monthlyReportIncomeBar.style.width = `${incomeWidth}%`;
  }

  if (monthlyReportExpenseBar) {
    monthlyReportExpenseBar.style.width = `${expenseWidth}%`;
  }
}

function formatMonthlyReportCompactMoney(value) {
  const amount = roundToTwo(Number(value) || 0);

  return `${amount.toLocaleString("ru-RU", {
    maximumFractionDigits: 0,
  })} â½`;
}

function isSafeBucketAdjustment(transaction) {
  return String(transaction.title || "").trim() === "ÐÐ¾ÑÑÐµÐºÑÐ¸ÑÐ¾Ð²ÐºÐ° Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ";
}

function isSafeInterestTransaction(transaction) {
  return (
    transaction.type === "income" &&
    isVaultAccountId(transaction.account_id) &&
    transaction.to_safe_bucket_id &&
    String(transaction.title || "").trim() === "ÐÑÐ¾ÑÐµÐ½ÑÑ Ð¿Ð¾ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ"
  );
}

function isFlexibleExpense(transaction) {
  if (transaction.type !== "expense") return false;

  const categoryId = transaction.category_id || UNCATEGORIZED_ID;

  return !isRequiredCategory(categoryId);
}

function getMonthlyReportIncomeExpense(transactions) {
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (isSafeBucketAdjustment(transaction)) return;

    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "income" && !isSafeInterestTransaction(transaction)) {
      income += amount;
    }

    if (transaction.type === "expense") {
      expense += amount;
    }
  });

  return {
    income: roundToTwo(income),
    expense: roundToTwo(expense),
    difference: roundToTwo(income - expense),
  };
}

function getMonthlyReportTopFlexibleCategory(transactions) {
  const byCategory = new Map();

  transactions.forEach((transaction) => {
    if (!isFlexibleExpense(transaction)) return;

    const categoryId = transaction.category_id || UNCATEGORIZED_ID;
    const current = byCategory.get(categoryId) || 0;

    byCategory.set(categoryId, current + (Number(transaction.amount) || 0));
  });

  const top = [...byCategory.entries()]
    .map(([categoryId, amount]) => ({
      categoryId,
      name: getCategoryName(categoryId),
      amount: roundToTwo(amount),
    }))
    .sort((a, b) => b.amount - a.amount)[0];

  return top || {
    categoryId: "",
    name: "ÐÐ¸Ð±ÐºÐ¸Ñ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð½ÐµÑ",
    amount: 0,
  };
}

function getMonthlyReportWeekIndex(createdAt) {
  const day = Number(String(createdAt || "").slice(8, 10)) || 1;

  if (day <= 7) return 0;
  if (day <= 14) return 1;
  if (day <= 21) return 2;
  if (day <= 28) return 3;

  return 4;
}

function getMonthlyReportWeeks(transactions, monthValue) {
  const [, monthRaw] = String(monthValue || "").split("-");
  const month = Number(monthRaw) || new Date().getMonth() + 1;
  const year = Number(String(monthValue || "").slice(0, 4)) || new Date().getFullYear();
  const lastDay = new Date(year, month, 0).getDate();

  const weekLabels = [
    "1â7",
    "8â14",
    "15â21",
    "22â28",
    `29â${lastDay}`,
  ];

  const weekMaps = [new Map(), new Map(), new Map(), new Map(), new Map()];

  transactions.forEach((transaction) => {
    if (!isFlexibleExpense(transaction)) return;

    const weekIndex = getMonthlyReportWeekIndex(transaction.created_at);
    const categoryId = transaction.category_id || UNCATEGORIZED_ID;
    const current = weekMaps[weekIndex].get(categoryId) || 0;

    weekMaps[weekIndex].set(categoryId, current + (Number(transaction.amount) || 0));
  });

  return weekMaps.map((map, index) => {
    const top = [...map.entries()]
      .map(([categoryId, amount]) => ({
        categoryId,
        name: getCategoryName(categoryId),
        amount: roundToTwo(amount),
      }))
      .sort((a, b) => b.amount - a.amount)[0];

    return {
      label: weekLabels[index],
      name: top?.name || "ÐÐµÑ Ð³Ð¸Ð±ÐºÐ¸Ñ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð²",
      amount: top?.amount || 0,
    };
  });
}

function normalizeMonthlyReportComment(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getMonthlyReportRepeat(transactions) {
  const byComment = new Map();

  transactions.forEach((transaction) => {
    if (!isFlexibleExpense(transaction)) return;

    const rawTitle = String(transaction.title || "").trim();

    if (!rawTitle || rawTitle === "ÐÐ¾Ð²Ð°Ñ ÑÑÐ°ÑÐ°") return;

    const key = normalizeMonthlyReportComment(rawTitle);

    if (!key) return;

    const current = byComment.get(key) || {
      label: rawTitle,
      count: 0,
      amount: 0,
    };

    current.count += 1;
    current.amount += Number(transaction.amount) || 0;

    byComment.set(key, current);
  });

  const top = [...byComment.values()]
    .filter((item) => item.count > 1)
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;

      return b.amount - a.amount;
    })[0];

  if (!top) {
    return {
      label: "ÐÐ¾Ð²ÑÐ¾ÑÐ¾Ð² Ð½ÐµÑ",
      count: 0,
      amount: 0,
    };
  }

  return {
    label: top.label,
    count: top.count,
    amount: roundToTwo(top.amount),
  };
}

function getMonthlyReportSavings(transactions) {
  let deposits = 0;
  let withdrawals = 0;
  let interest = 0;

  transactions.forEach((transaction) => {
    if (isSafeBucketAdjustment(transaction)) return;

    const amount = Number(transaction.amount) || 0;

    if (isSafeInterestTransaction(transaction)) {
      interest += amount;
      return;
    }

    if (transaction.type !== "transfer") return;

    const fromSafe = isVaultAccountId(transaction.from_account_id);
    const toSafe = isVaultAccountId(transaction.to_account_id);

    const hasFromBucket = Boolean(transaction.from_safe_bucket_id);
    const hasToBucket = Boolean(transaction.to_safe_bucket_id);

    const isInternalSafeMove = fromSafe && toSafe && (hasFromBucket || hasToBucket);

    if (isInternalSafeMove) return;

    if (!fromSafe && toSafe && hasToBucket) {
      deposits += amount;
    }

    if (fromSafe && !toSafe && hasFromBucket) {
      withdrawals += amount;
    }
  });

  return {
    deposits: roundToTwo(deposits),
    withdrawals: roundToTwo(withdrawals),
    interest: roundToTwo(interest),
    net: roundToTwo(deposits + interest - withdrawals),
  };
}

function getMonthlyReportInsight({ totals, topCategory, repeat, savings }) {
  if (totals.difference > 0) {
    return {
      title: "ÐÐµÑÑÑ Ð·Ð°ÐºÑÑÑ ÑÐ²ÐµÑÐµÐ½Ð½Ð¾",
      text: `ÐÐ¾ÑÐ¾Ð´Ñ Ð¾ÐºÐ°Ð·Ð°Ð»Ð¸ÑÑ Ð²ÑÑÐµ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð² Ð½Ð° ${formatMoney(totals.difference)}. ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð³Ð¸Ð±ÐºÐ°Ñ ÑÑÐ°ÑÐ° Ð¼ÐµÑÑÑÐ° â ${topCategory.name} Ð½Ð° ${formatMoney(topCategory.amount)}. Ð Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾ ${formatMoney(savings.growth)}.`,
    };
  }

  if (totals.difference < 0) {
    return {
      title: "ÐÐµÑÑÑ ÑÑÑÐ» Ð² Ð¼Ð¸Ð½ÑÑ",
      text: `Ð Ð°ÑÑÐ¾Ð´Ñ Ð¿ÑÐµÐ²ÑÑÐ¸Ð»Ð¸ Ð´Ð¾ÑÐ¾Ð´Ñ Ð½Ð° ${formatMoney(Math.abs(totals.difference))}. ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð³Ð¸Ð±ÐºÐ°Ñ ÑÑÐ°ÑÐ° â ${topCategory.name} Ð½Ð° ${formatMoney(topCategory.amount)}. Ð ÑÐ»ÐµÐ´ÑÑÑÐµÐ¼ Ð¼ÐµÑÑÑÐµ ÑÑÐ¾Ð¸Ñ Ð¶ÑÑÑÑÐµ ÐºÐ¾Ð½ÑÑÐ¾Ð»Ð¸ÑÐ¾Ð²Ð°ÑÑ Ð¿Ð¾Ð²ÑÐ¾ÑÑÑÑÐ¸ÐµÑÑ ÑÑÐ°ÑÑ.`,
    };
  }

  return {
    title: "ÐÐµÑÑÑ Ð·Ð°ÐºÑÑÑ Ð² Ð½Ð¾Ð»Ñ",
    text: `ÐÐ¾ÑÐ¾Ð´Ñ Ð¸ ÑÐ°ÑÑÐ¾Ð´Ñ Ð¿Ð¾ÑÑÐ¸ ÑÑÐ°Ð²Ð½ÑÐ»Ð¸ÑÑ. ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð³Ð¸Ð±ÐºÐ°Ñ ÑÑÐ°ÑÐ° â ${topCategory.name} Ð½Ð° ${formatMoney(topCategory.amount)}. ÐÐ°Ð¿Ð°ÑÐ° Ð¿Ð¾ÑÑÐ¸ Ð½ÐµÑ, Ð¿Ð¾ÑÑÐ¾Ð¼Ñ Ð»ÑÑÑÐµ Ð·Ð°ÑÐ°Ð½ÐµÐµ Ð´ÐµÑÐ¶Ð°ÑÑ Ð¿Ð¾Ð´ ÐºÐ¾Ð½ÑÑÐ¾Ð»ÐµÐ¼ ÐºÑÑÐ¿Ð½ÑÐµ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ð¸.`,
  };
}

function getMonthlyReportFocus({ totals, topCategory, repeat, savings }) {
  if (repeat.count >= 3) {
    return {
      title: `Ð¡Ð»ÐµÐ´Ð¸ÑÑ Ð·Ð° â${repeat.label}â`,
      text: `Ð­ÑÐ° ÑÑÐ°ÑÐ° Ð¿Ð¾Ð²ÑÐ¾ÑÐ¸Ð»Ð°ÑÑ ${repeat.count} ÑÐ°Ð·Ð° Ð¸ ÑÑÐ¼Ð¼Ð°ÑÐ½Ð¾ Ð·Ð°Ð±ÑÐ°Ð»Ð° ${formatMoney(repeat.amount)}. Ð­ÑÐ¾ Ð½Ðµ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð¾ Ð¿Ð»Ð¾ÑÐ¾, Ð½Ð¾ ÑÐµÐ¿ÐµÑÑ Ð²Ð¸Ð´Ð½Ð¾, Ð³Ð´Ðµ Ð¿ÑÐ¸Ð²ÑÑÐºÐ° Ð¿ÑÐµÐ²ÑÐ°ÑÐ°ÐµÑÑÑ Ð² Ð·Ð°Ð¼ÐµÑÐ½ÑÑ ÑÑÐ°ÑÑÑ ÑÐ°ÑÑÐ¾Ð´Ð¾Ð².`,
    };
  }

  if (topCategory.amount > 0) {
    return {
      title: `ÐÐ¾Ð½ÑÑÐ¾Ð»Ð¸ÑÐ¾Ð²Ð°ÑÑ â${topCategory.name}â`,
      text: `Ð­ÑÐ¾ Ð³Ð»Ð°Ð²Ð½Ð°Ñ Ð³Ð¸Ð±ÐºÐ°Ñ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸Ñ Ð¼ÐµÑÑÑÐ°: ${formatMoney(topCategory.amount)}. ÐÑÐ»Ð¸ Ð² ÑÐ»ÐµÐ´ÑÑÑÐµÐ¼ Ð¼ÐµÑÑÑÐµ Ð½ÑÐ¶ÐµÐ½ Ð·Ð°Ð¿Ð°Ñ, Ð½Ð°ÑÐ¸Ð½Ð°ÑÑ ÑÐµÐ·Ð°ÑÑ Ð»Ð¾Ð³Ð¸ÑÐ½ÐµÐµ Ð¸Ð¼ÐµÐ½Ð½Ð¾ Ð¾ÑÑÑÐ´Ð°.`,
    };
  }

  if (savings.growth <= 0) {
    return {
      title: "ÐÐµÑÐ½ÑÑÑ Ð¿Ð¾Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ð¹",
      text: "ÐÐ° Ð¼ÐµÑÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð¿Ð¾ÑÑÐ¸ Ð½Ðµ Ð²ÑÑÐ¾ÑÐ»Ð¸. ÐÐ°Ð¶Ðµ Ð½ÐµÐ±Ð¾Ð»ÑÑÐ¾Ðµ ÑÐµÐ³ÑÐ»ÑÑÐ½Ð¾Ðµ Ð¿Ð¾Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ðµ Ð»ÑÑÑÐµ, ÑÐµÐ¼ Ð¶Ð´Ð°ÑÑ Ð¸Ð´ÐµÐ°Ð»ÑÐ½Ð¾Ð³Ð¾ Ð¼Ð¾Ð¼ÐµÐ½ÑÐ°.",
    };
  }

  if (totals.difference > 0) {
    return {
      title: "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ ÑÐµÐ¼Ð¿",
      text: "ÐÐµÑÑÑ Ð¿ÑÐ¾ÑÑÐ» Ð½Ð¾ÑÐ¼Ð°Ð»ÑÐ½Ð¾. ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð·Ð°Ð´Ð°ÑÐ° â Ð½Ðµ ÑÐ°Ð·Ð´ÑÐ²Ð°ÑÑ Ð³Ð¸Ð±ÐºÐ¸Ðµ ÑÑÐ°ÑÑ Ð¿Ð¾ÑÐ»Ðµ ÑÐ¾ÑÐ¾ÑÐµÐ³Ð¾ ÑÐµÐ·ÑÐ»ÑÑÐ°ÑÐ°.",
    };
  }

  return {
    title: "ÐÐµÑÐ¶Ð°ÑÑ Ð±Ð°Ð·Ñ",
    text: "ÐÑÐ¸ÑÐ¸ÑÐ½ÑÑ Ð¿Ð¾Ð²ÑÐ¾ÑÐ¾Ð² Ð½Ðµ Ð²Ð¸Ð´Ð½Ð¾. Ð¡Ð»ÐµÐ´ÑÑÑÐ¸Ð¹ Ð¼ÐµÑÑÑ Ð»ÑÑÑÐµ Ð½Ð°ÑÐ°ÑÑ Ñ ÐºÐ¾Ð½ÑÑÐ¾Ð»Ñ ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÑ Ð´ÐµÐ½ÐµÐ³ Ð¸ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶ÐµÐ¹.",
  };
}

function getMonthlyReportAchievements({ totals, topCategory, repeat, savings }) {
  const achievements = [];

  if (totals.difference > 0) {
    achievements.push({
      type: "success",
      title: "ÐÐµÑÑÑ Ð² Ð¿Ð»ÑÑ",
      text: `Ð Ð°Ð·Ð½Ð¸ÑÐ° ÑÐ¾ÑÑÐ°Ð²Ð¸Ð»Ð° ${formatMoney(totals.difference)}`,
      icon: "up",
    });
  } else if (totals.difference < 0) {
    achievements.push({
      type: "danger",
      title: "ÐÐµÑÑÑ Ð² Ð¼Ð¸Ð½ÑÑ",
      text: `Ð Ð°ÑÑÐ¾Ð´Ñ Ð²ÑÑÐµ Ð´Ð¾ÑÐ¾Ð´Ð¾Ð² Ð½Ð° ${formatMoney(Math.abs(totals.difference))}`,
      icon: "down",
    });
  }

  if (savings.net > 0) {
    achievements.push({
      type: "success",
      title: "Ð¡ÐµÐ¹Ñ Ð¿Ð¾Ð¿Ð¾Ð»Ð½ÐµÐ½",
      text: `ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ Ð²ÑÑÐ¾ÑÐ»Ð¸ Ð½Ð° ${formatMoney(savings.net)}`,
      icon: "shield",
    });
  }

  if (repeat.count >= 3) {
    achievements.push({
      type: "warning",
      title: "ÐÐ¾Ð²ÑÐ¾Ñ Ð¼ÐµÑÑÑÐ°",
      text: `${repeat.label}: ${repeat.count} ÑÐ°Ð·Ð°`,
      icon: "repeat",
    });
  }

  if (topCategory.amount > 0) {
    achievements.push({
      type: "warning",
      title: "ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð³Ð¸Ð±ÐºÐ°Ñ ÑÑÐ°ÑÐ°",
      text: `${topCategory.name}: ${formatMoney(topCategory.amount)}`,
      icon: "target",
    });
  }

  if (!achievements.length) {
    achievements.push({
      type: "success",
      title: "Ð¡Ð¿Ð¾ÐºÐ¾Ð¹Ð½ÑÐ¹ Ð¼ÐµÑÑÑ",
      text: "ÐÑÐ¸ÑÐ¸ÑÐ½ÑÑ ÑÐ¸Ð½Ð°Ð½ÑÐ¾Ð²ÑÑ Ð¼ÐµÑÐ¾Ðº Ð½ÐµÑ",
      icon: "check",
    });
  }

  return achievements.slice(0, 4);
}

function getMonthlyReportAchievementIcon(icon) {
  const icons = {
    up: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 17V7" />
        <path d="M8.5 10.5 12 7l3.5 3.5" />
      </svg>
    `,
    down: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7v10" />
        <path d="M8.5 13.5 12 17l3.5-3.5" />
      </svg>
    `,
    shield: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4 18 6.5v5.2c0 3.7-2.2 6.3-6 8.3-3.8-2-6-4.6-6-8.3V6.5L12 4Z" />
        <path d="M12 9v5" />
        <path d="M9.5 11.5H14.5" />
      </svg>
    `,
    repeat: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 7a7 7 0 0 0-11.6 2.8" />
        <path d="M5 5v4.8h4.8" />
        <path d="M7 17a7 7 0 0 0 11.6-2.8" />
        <path d="M19 19v-4.8h-4.8" />
      </svg>
    `,
    target: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 12.5 10 16l8-9" />
      </svg>
    `,
  };

  return icons[icon] || icons.check;
}

function renderMonthlyReportWeeks(weeks) {
  if (!monthlyReportWeeksList) return;

  monthlyReportWeeksList.innerHTML = "";

  weeks.forEach((week) => {
    const row = document.createElement("div");
    row.className = "monthly-report-week-row";

    row.innerHTML = `
      <div class="monthly-report-week-dot">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14" />
          <path d="M7 10h10" />
          <path d="M7 15h10" />
        </svg>
      </div>

      <div>
        <h4>${escapeHtml(week.name)}</h4>
        <p>${escapeHtml(week.label)} ÑÐ¸ÑÐ»Ð¾</p>
      </div>

      <strong>${formatMoney(week.amount)}</strong>
    `;

    monthlyReportWeeksList.appendChild(row);
  });
}

function buildMonthlyReportTextSummary() {
  const monthValue = getMonthlyReportMonthValue();
  const transactions = getMonthlyReportMonthTransactions(monthValue);

  const totals = getMonthlyReportIncomeExpense(transactions);
  const topCategory = getMonthlyReportTopFlexibleCategory(transactions);
  const repeat = getMonthlyReportRepeat(transactions);
  const savings = getMonthlyReportSavings(transactions);
  const insight = getMonthlyReportInsight({
    totals,
    topCategory,
    repeat,
    savings,
  });

  return [
    getMonthlyReportMonthLabel(monthValue),
    "",
    `ÐÑÐ¾Ð³: ${formatMoney(totals.difference)} â ${
      totals.difference > 0
        ? "Ð¼ÐµÑÑÑ Ð² Ð¿Ð»ÑÑ"
        : totals.difference < 0
          ? "Ð¼ÐµÑÑÑ Ð² Ð¼Ð¸Ð½ÑÑ"
          : "Ð¼ÐµÑÑÑ Ð² Ð½Ð¾Ð»Ñ"
    }`,
    `ÐÐ¾ÑÐ¾Ð´Ñ: ${formatMoney(totals.income)}`,
    `Ð Ð°ÑÑÐ¾Ð´Ñ: ${formatMoney(totals.expense)}`,
    "",
    `ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð³Ð¸Ð±ÐºÐ°Ñ ÑÑÐ°ÑÐ°: ${topCategory.name} â ${formatMoney(topCategory.amount)}`,
    repeat.count > 1
      ? `ÐÐ¾Ð²ÑÐ¾Ñ Ð¼ÐµÑÑÑÐ°: ${repeat.label} â ${repeat.count} ÑÐ°Ð·Ð° / ${formatMoney(repeat.amount)}`
      : "ÐÐ¾Ð²ÑÐ¾Ñ Ð¼ÐµÑÑÑÐ°: Ð¿Ð¾Ð²ÑÐ¾ÑÐ¾Ð² Ð½ÐµÑ",
    "",
    `ÐÐ°Ð»Ð°Ð½Ñ: ${formatMoney(calculateBalance())}`,
    `Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½Ð¾: ${formatMoney(getFreeMoneyTotal())}`,
    "",
    `ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ: +${formatMoney(savings.growth)}`,
    `ÐÐ¾Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¾: ${formatMoney(savings.deposits)}`,
    `ÐÑÐ¾ÑÐµÐ½ÑÑ: ${formatMoney(savings.interest)}`,
    `Ð¡Ð¿Ð¸ÑÐ°Ð½Ð¾: ${formatMoney(savings.withdrawals)}`,
    "",
    `ÐÑÐ²Ð¾Ð´: ${insight.text}`,
  ].join("\n");
}

async function copyMonthlyReportSummary() {
  const text = buildMonthlyReportTextSummary();

  try {
    await navigator.clipboard.writeText(text);

    if (copyMonthlyReportBtn) {
      const previousText = copyMonthlyReportBtn.textContent;
      copyMonthlyReportBtn.textContent = "Ð¡ÐºÐ¾Ð¿Ð¸ÑÐ¾Ð²Ð°Ð½Ð¾";

      window.setTimeout(() => {
        copyMonthlyReportBtn.textContent = previousText || "Ð¡ÐºÐ¾Ð¿Ð¸ÑÐ¾Ð²Ð°ÑÑ";
      }, 1300);
    }
  } catch (error) {
    console.error("copyMonthlyReportSummary error:", error);
    alert("ÐÐµ Ð¿Ð¾Ð»ÑÑÐ¸Ð»Ð¾ÑÑ ÑÐºÐ¾Ð¿Ð¸ÑÐ¾Ð²Ð°ÑÑ Ð¸ÑÐ¾Ð³. Safari Ð¸Ð½Ð¾Ð³Ð´Ð° Ð±Ð»Ð¾ÐºÐ¸ÑÑÐµÑ Ð±ÑÑÐµÑ Ð¾Ð±Ð¼ÐµÐ½Ð°.");
  }
}

function renderMonthlyReportAchievements(achievements) {
  if (!monthlyReportAchievementsList) return;

  monthlyReportAchievementsList.innerHTML = "";

  achievements.forEach((achievement) => {
    const card = document.createElement("div");
    card.className = `monthly-report-achievement monthly-report-achievement--${achievement.type}`;

    card.innerHTML = `
      <div class="monthly-report-achievement__icon">
        ${getMonthlyReportAchievementIcon(achievement.icon)}
      </div>

      <div>
        <h4>${escapeHtml(achievement.title)}</h4>
        <p>${escapeHtml(achievement.text)}</p>
      </div>
    `;

    monthlyReportAchievementsList.appendChild(card);
  });
}

function renderMonthlyReport() {
  const monthValue = getMonthlyReportMonthValue();
  const transactions = getMonthlyReportMonthTransactions(monthValue);

  const totals = getMonthlyReportIncomeExpense(transactions);
  const topCategory = getMonthlyReportTopFlexibleCategory(transactions);
  const weeks = getMonthlyReportWeeks(transactions, monthValue);
  const repeat = getMonthlyReportRepeat(transactions);
  const savings = getMonthlyReportSavings(transactions);
  const insight = getMonthlyReportInsight({
  totals,
  topCategory,
  repeat,
  savings,
});

const focus = getMonthlyReportFocus({
  totals,
  topCategory,
  repeat,
  savings,
});

const achievements = getMonthlyReportAchievements({
  totals,
  topCategory,
  repeat,
  savings,
});

renderMonthlyReportMonthSwitch(monthValue);
renderMonthlyReportHeroState(totals.difference);
renderMonthlyReportFlow(totals);

if (monthlyReportMonthLabel) {
    monthlyReportMonthLabel.textContent = getMonthlyReportMonthLabel(monthValue);
  }

  if (monthlyReportResultValue) {
    monthlyReportResultValue.textContent = formatMoney(totals.difference);
  }

  if (monthlyReportResultText) {
    monthlyReportResultText.textContent =
      totals.difference > 0
        ? "ÐÐµÑÑÑ Ð·Ð°ÐºÑÑÑ Ð² Ð¿Ð»ÑÑ"
        : totals.difference < 0
          ? "ÐÐµÑÑÑ Ð·Ð°ÐºÑÑÑ Ð² Ð¼Ð¸Ð½ÑÑ"
          : "ÐÐµÑÑÑ Ð·Ð°ÐºÑÑÑ Ð² Ð½Ð¾Ð»Ñ";
  }

  if (monthlyReportIncomeValue) {
    monthlyReportIncomeValue.textContent = formatMoney(totals.income);
  }

  if (monthlyReportExpenseValue) {
    monthlyReportExpenseValue.textContent = formatMoney(totals.expense);
  }

  if (monthlyReportDifferenceValue) {
    monthlyReportDifferenceValue.textContent = formatMoney(totals.difference);
  }
  
  if (monthlyReportInsightTitle) {
  monthlyReportInsightTitle.textContent = insight.title;
}

if (monthlyReportInsightText) {
  monthlyReportInsightText.textContent = insight.text;
}

  if (monthlyReportTopCategoryName) {
    monthlyReportTopCategoryName.textContent = topCategory.name;
  }

  if (monthlyReportTopCategoryValue) {
    monthlyReportTopCategoryValue.textContent = formatMoney(topCategory.amount);
  }

  if (monthlyReportRepeatName) {
    monthlyReportRepeatName.textContent = repeat.label;
  }

  if (monthlyReportRepeatValue) {
    monthlyReportRepeatValue.textContent =
      repeat.count > 1
        ? `${repeat.count} ÑÐ°Ð·Ð° Â· ${formatMoney(repeat.amount)}`
        : "ÐÐ¾Ð²ÑÐ¾ÑÐ¾Ð² Ð½ÐµÑ";
  }

  if (monthlyReportBalanceValue) {
    monthlyReportBalanceValue.textContent = formatMoney(calculateBalance());
  }

  if (monthlyReportFreeValue) {
    monthlyReportFreeValue.textContent = formatMoney(getFreeMoneyTotal());
  }

  if (monthlyReportSavingsNetValue) {
    monthlyReportSavingsNetValue.textContent = formatMoney(savings.net);
  }

  if (monthlyReportSavingsDepositValue) {
    monthlyReportSavingsDepositValue.textContent = formatMoney(savings.deposits);
  }

  if (monthlyReportSavingsInterestValue) {
    monthlyReportSavingsInterestValue.textContent = formatMoney(savings.interest);
  }
  
  if (monthlyReportSavingsWithdrawalsValue) {
  monthlyReportSavingsWithdrawalsValue.textContent = formatMoney(savings.withdrawals);
}

if (monthlyReportFocusTitle) {
  monthlyReportFocusTitle.textContent = focus.title;
}

if (monthlyReportFocusText) {
  monthlyReportFocusText.textContent = focus.text;
}

renderMonthlyReportWeeks(weeks);
renderMonthlyReportAchievements(achievements);

  renderMonthlyReportWeeks(weeks);
  renderMonthlyReportAchievements(achievements);
}

function openMonthlyReportView() {
  if (!monthlyReportView) return;

  monthlyReportSelectedMonthValue = getCurrentMonthValue();

  renderMonthlyReport();

  mainView?.classList.add("hidden");
  categoriesManagerView?.classList.add("hidden");
  analyticsView?.classList.add("hidden");
  operationsView?.classList.add("hidden");

  monthlyReportView.classList.remove("hidden");

  navWalletBtn?.classList.remove("is-active");
  navAnalyticsBtn?.classList.remove("is-active");
  navOperationsBtn?.classList.remove("is-active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function closeMonthlyReportView() {
  if (!monthlyReportView) return;

  monthlyReportView.classList.add("hidden");
  showWalletView();
}

  /* =========================================================
     12. EVENTS / LISTENERS
     ========================================================= */
  openExpenseModalBtn?.addEventListener("click", () => openModal("expense"));
  openIncomeModalBtn?.addEventListener("click", () => openModal("income"));
  openTransferModalBtn?.addEventListener("click", () => openModal("transfer"));
  fromAccountSelect?.addEventListener("change", updateTransferSafeFields);
toAccountSelect?.addEventListener("change", updateTransferSafeFields);

  openCategoriesManagerBtn?.addEventListener("click", openCategoriesManager);

navWalletBtn?.addEventListener("click", showWalletView);
navAnalyticsBtn?.addEventListener("click", showAnalyticsView);
navOperationsBtn?.addEventListener("click", showOperationsView);

analyticsTabExpensesBtn?.addEventListener("click", () => setAnalyticsTab("expenses"));
analyticsTabSafesBtn?.addEventListener("click", () => setAnalyticsTab("safes"));

accountRoleSelect?.addEventListener("change", syncAccountPrimaryControls);

openMonthlyReportBtn?.addEventListener("click", openMonthlyReportView);
closeMonthlyReportBtn?.addEventListener("click", closeMonthlyReportView);

printMonthlyReportBtn?.addEventListener("click", () => {
  window.print();
});

copyMonthlyReportBtn?.addEventListener("click", copyMonthlyReportSummary);

openCreateAccountModalBtn?.addEventListener("click", openCreateAccountModal);
closeAccountModalBtn?.addEventListener("click", closeAccountModal);
cancelAccountModalBtn?.addEventListener("click", closeAccountModal);
saveAccountModalBtn?.addEventListener("click", saveAccountModal);
deleteAccountModalBtn?.addEventListener("click", deleteAccountModalAction);

mandatoryPaymentAccountSelect?.addEventListener("change", () => {
  syncMandatoryPaymentLinkedSafeField();
});

openMandatoryPaymentBucketPickerBtn?.addEventListener("click", () => {
  const accountId = mandatoryPaymentAccountSelect?.value || "";
  if (!isVaultAccountId(accountId)) return;

  renderMandatoryPaymentBucketPicker();
  openAnimatedModal(mandatoryPaymentBucketPickerModal);
});

closeMandatoryPaymentBucketPickerModalBtn?.addEventListener("click", () => {
  closeAnimatedModal(mandatoryPaymentBucketPickerModal, { keepBodyLocked: true });
});

mandatoryPaymentBucketPickerModal?.addEventListener("click", (event) => {
  if (event.target === mandatoryPaymentBucketPickerModal) {
    closeAnimatedModal(mandatoryPaymentBucketPickerModal, { keepBodyLocked: true });
  }
});

deleteCategoryBtn?.addEventListener("click", deleteCategory);

accountModal?.addEventListener("click", (event) => {
  if (event.target === accountModal) {
    closeAccountModal();
  }
});

analyticsFiltersModal?.addEventListener("click", (event) => {
  if (event.target === analyticsFiltersModal) {
    closeAnalyticsFiltersModal();
  }
});

// Ð¾Ð±ÑÐ°Ð±Ð¾ÑÑÐ¸ÐºÐ¸ Ð´Ð»Ñ ÑÐ¸Ð»ÑÑÑÐ¾Ð² Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹
openOperationsFiltersBtn?.addEventListener("click", () => {
  if (operationsFiltersModal) {
    openAnimatedModal(operationsFiltersModal);
  }
});
closeOperationsFiltersBtn?.addEventListener("click", () => {
  if (operationsFiltersModal) {
    closeAnimatedModal(operationsFiltersModal);
  }
});
operationsFiltersModal?.addEventListener("click", (event) => {
  if (event.target === operationsFiltersModal) {
    closeAnimatedModal(operationsFiltersModal);
  }
});

document.addEventListener("click", (event) => {
  const faqBtn = event.target.closest("[data-faq-key]");
  if (!faqBtn) return;

  event.preventDefault();
  event.stopPropagation();

  openFaqModal(faqBtn.dataset.faqKey);
});

closeFaqModalBtn?.addEventListener("click", closeFaqModal);

faqModal?.addEventListener("click", (event) => {
  if (event.target === faqModal) {
    closeFaqModal();
  }
});

  function syncAnalyticsPeriodButtons() {
  analyticsPeriodButtons.forEach((item) => {
    item.classList.toggle(
      "is-active",
      item.dataset.analyticsPeriod === analyticsFilterPeriod
    );
  });

  document
    .getElementById("analyticsRailRangeBtn")
    ?.classList.toggle("is-active", analyticsFilterPeriod === "range");
}

function getAnalyticsSelectedMonthParts() {
  const fallback = getCurrentMonthValue();
  const value = analyticsSelectedMonth || fallback;
  const [yearRaw, monthRaw] = value.split("-");

  return {
    year: Number(yearRaw) || new Date().getFullYear(),
    month: Number(monthRaw) || new Date().getMonth() + 1,
  };
}

function getAnalyticsRangeDateKey(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isDateInSelectedAnalyticsMonth(dateKey) {
  if (!dateKey) return false;

  const { year, month } = getAnalyticsSelectedMonthParts();
  return dateKey.startsWith(`${year}-${String(month).padStart(2, "0")}`);
}

function formatAnalyticsRangeDockDate(dateKey) {
  if (!dateKey) return "â";

  const [, monthRaw, dayRaw] = dateKey.split("-");
  const monthIndex = Number(monthRaw) - 1;
  const day = Number(dayRaw);

  const monthLabels = [
    "ÑÐ½Ð²", "ÑÐµÐ²", "Ð¼Ð°Ñ", "Ð°Ð¿Ñ", "Ð¼Ð°Ð¹", "Ð¸ÑÐ½",
    "Ð¸ÑÐ»", "Ð°Ð²Ð³", "ÑÐµÐ½", "Ð¾ÐºÑ", "Ð½Ð¾Ñ", "Ð´ÐµÐº",
  ];

  return `${day} ${monthLabels[monthIndex] || ""}`;
}

function getDefaultAnalyticsRangeDate() {
  const today = getTodayDateValue();

  if (isDateInSelectedAnalyticsMonth(today)) {
    return today;
  }

  const { year, month } = getAnalyticsSelectedMonthParts();
  return getAnalyticsRangeDateKey(year, month, 1);
}

function closeAnalyticsRangeDock() {
  analyticsRangeDock?.classList.add("hidden");
  analyticsRangeCalendar?.classList.add("hidden");

  analyticsRangeStartBtn?.classList.remove("is-active");
  analyticsRangeEndBtn?.classList.remove("is-active");

  document
    .getElementById("analyticsRailRangeBtn")
    ?.classList.toggle("is-active", analyticsFilterPeriod === "range");
}

function openAnalyticsRangeDock() {
  const defaultDate = getDefaultAnalyticsRangeDate();

  analyticsRangeDraftStart = analyticsRangeStart || defaultDate;
  analyticsRangeDraftEnd = analyticsRangeEnd || analyticsRangeDraftStart;
  analyticsRangeEditingSide = "start";

  analyticsRangeCalendarMonth = String(analyticsRangeDraftStart).slice(0, 7) || analyticsSelectedMonth;

  closeAnalyticsMonthWheel();

  analyticsRangeDock?.classList.remove("hidden");
  analyticsRangeCalendar?.classList.add("hidden");

  document
    .getElementById("analyticsRailRangeBtn")
    ?.classList.add("is-active");

  renderAnalyticsRangeDock();

  requestAnimationFrame(() => {
    analyticsRangeDock?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

function resetAnalyticsRangeDock() {
  const defaultDate = getDefaultAnalyticsRangeDate();

  analyticsRangeDraftStart = defaultDate;
  analyticsRangeDraftEnd = defaultDate;
  analyticsRangeEditingSide = "start";
  analyticsRangeCalendarMonth = String(defaultDate).slice(0, 7);

  renderAnalyticsRangeDock();
  analyticsRangeCalendar?.classList.add("hidden");
}

function renderAnalyticsRangeDock() {
  if (analyticsRangeDockTitle) {
    const titleMonth =
      String(analyticsRangeDraftStart || analyticsRangeDraftEnd || analyticsSelectedMonth).slice(0, 7);

    analyticsRangeDockTitle.textContent = formatMonthLabel(titleMonth);
  }

  if (analyticsRangeDockStartLabel) {
    analyticsRangeDockStartLabel.textContent =
      formatAnalyticsRangeDockDate(analyticsRangeDraftStart);
  }

  if (analyticsRangeDockEndLabel) {
    analyticsRangeDockEndLabel.textContent =
      formatAnalyticsRangeDockDate(analyticsRangeDraftEnd);
  }

  analyticsRangeStartBtn?.classList.toggle(
    "is-active",
    analyticsRangeEditingSide === "start"
  );

  analyticsRangeEndBtn?.classList.toggle(
    "is-active",
    analyticsRangeEditingSide === "end"
  );

  renderAnalyticsRangeCalendar();
}

function openAnalyticsRangeCalendar(side) {
  analyticsRangeEditingSide = side === "end" ? "end" : "start";

  const activeDate =
    analyticsRangeEditingSide === "start"
      ? analyticsRangeDraftStart
      : analyticsRangeDraftEnd;

  analyticsRangeCalendarMonth =
    String(activeDate || analyticsRangeDraftStart || analyticsSelectedMonth).slice(0, 7);

  analyticsRangeCalendar?.classList.remove("hidden");
  renderAnalyticsRangeDock();
}

function shiftAnalyticsRangeCalendarMonth(delta) {
  const [yearRaw, monthRaw] = String(analyticsRangeCalendarMonth || analyticsSelectedMonth).split("-");
  const cursor = new Date(Number(yearRaw), Number(monthRaw) - 1 + delta, 1);

  analyticsRangeCalendarMonth = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
  renderAnalyticsRangeCalendar();
}

function renderAnalyticsRangeCalendar() {
  if (!analyticsRangeCalendarGrid) return;

  const monthKey = analyticsRangeCalendarMonth || analyticsSelectedMonth;
  const [yearRaw, monthRaw] = monthKey.split("-");
  const year = Number(yearRaw) || new Date().getFullYear();
  const month = Number(monthRaw) || new Date().getMonth() + 1;

  if (analyticsRangeCalendarTitle) {
    analyticsRangeCalendarTitle.textContent = formatMonthLabel(monthKey);
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const mondayOffset = firstDay === 0 ? 6 : firstDay - 1;
  const today = getTodayDateValue();

  const start = analyticsRangeDraftStart;
  const end = analyticsRangeDraftEnd || analyticsRangeDraftStart;

  const emptyCells = Array.from({ length: mondayOffset }, () => {
    return `<div class="analytics-range-calendar__empty"></div>`;
  });

  const dayCells = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const dateKey = getAnalyticsRangeDateKey(year, month, day);

    const isStart = dateKey === start;
    const isEnd = dateKey === end;
    const isBetween = start && end && dateKey > start && dateKey < end;
    const isToday = dateKey === today;

    return `
      <button
        class="analytics-range-calendar__day${isStart ? " is-start" : ""}${isEnd ? " is-end" : ""}${isBetween ? " is-between" : ""}${isToday ? " is-today" : ""}"
        type="button"
        data-range-date="${dateKey}"
      >
        ${day}
      </button>
    `;
  });

  analyticsRangeCalendarGrid.innerHTML = [...emptyCells, ...dayCells].join("");

  analyticsRangeCalendarGrid.querySelectorAll("[data-range-date]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextDate = button.dataset.rangeDate;

      if (analyticsRangeEditingSide === "start") {
        analyticsRangeDraftStart = nextDate;

        if (!analyticsRangeDraftEnd || analyticsRangeDraftEnd < analyticsRangeDraftStart) {
          analyticsRangeDraftEnd = analyticsRangeDraftStart;
        }

        analyticsRangeEditingSide = "end";
      } else {
        analyticsRangeDraftEnd = nextDate;

        if (analyticsRangeDraftEnd < analyticsRangeDraftStart) {
          const previousStart = analyticsRangeDraftStart;
          analyticsRangeDraftStart = analyticsRangeDraftEnd;
          analyticsRangeDraftEnd = previousStart;
        }
      }

      renderAnalyticsRangeDock();
    });
  });
}

function applyAnalyticsRangeDock() {
  if (!analyticsRangeDraftStart) {
    resetAnalyticsRangeDock();
  }

  analyticsRangeStart = analyticsRangeDraftStart;
  analyticsRangeEnd = analyticsRangeDraftEnd || analyticsRangeDraftStart;
  analyticsFilterPeriod = "range";

  if (analyticsRangeFromInput) {
    analyticsRangeFromInput.value = analyticsRangeStart;
  }

  if (analyticsRangeToInput) {
    analyticsRangeToInput.value = analyticsRangeEnd;
  }

  setNativePickerVisibility(analyticsRangeFromInput, false);
  setNativePickerVisibility(analyticsRangeToInput, false);

  closeAnalyticsRangeDock();
  syncAnalyticsPeriodButtons();
  resetAnalyticsExpenseCategoryFilter();
  renderAnalytics();
}

analyticsPeriodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const nextPeriod = btn.dataset.analyticsPeriod;

    if (nextPeriod === "range") {
      openAnalyticsRangeDock();
      return;
    }

    analyticsFilterPeriod = nextPeriod;
    resetAnalyticsExpenseCategoryFilter();

    if (analyticsFilterPeriod !== "month") {
      closeAnalyticsMonthWheel();
    }

    closeAnalyticsRangeDock();

    setNativePickerVisibility(analyticsRangeFromInput, false);
    setNativePickerVisibility(analyticsRangeToInput, false);

    syncAnalyticsPeriodButtons();
    renderAnalytics();
  });
});

document.getElementById("analyticsRailRangeBtn")?.addEventListener("click", () => {
  openAnalyticsRangeDock();
});

analyticsRangeStartBtn?.addEventListener("click", () => {
  openAnalyticsRangeCalendar("start");
});

analyticsRangeEndBtn?.addEventListener("click", () => {
  openAnalyticsRangeCalendar("end");
});

analyticsRangeCalendarPrevBtn?.addEventListener("click", () => {
  shiftAnalyticsRangeCalendarMonth(-1);
});

analyticsRangeCalendarNextBtn?.addEventListener("click", () => {
  shiftAnalyticsRangeCalendarMonth(1);
});

analyticsRangeDockCloseBtn?.addEventListener("click", closeAnalyticsRangeDock);
analyticsRangeDockResetBtn?.addEventListener("click", resetAnalyticsRangeDock);
analyticsRangeDockApplyBtn?.addEventListener("click", applyAnalyticsRangeDock);

analyticsExpensesMonthStrip?.addEventListener("click", () => {
  closeAnalyticsRangeDock();
});

  analyticsMonthBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    analyticsFilterPeriod = "month";

    if (getAnalyticsMonthWheelOpen()) {
      closeAnalyticsMonthWheel();
    } else {
      openAnalyticsMonthWheel();
    }

    renderAnalytics();
  });

  analyticsMonthResetBtn?.addEventListener("click", () => {
    resetAnalyticsMonthWheel();
  });

  analyticsMonthApplyBtn?.addEventListener("click", () => {
  applyAnalyticsMonthWheel();
  closeAnalyticsMonthWheel();
});

  analyticsRangeFromInput?.addEventListener("change", () => {
    if (!analyticsRangeFromInput.value) return;
    analyticsRangeStart = analyticsRangeFromInput.value;

    if (!analyticsRangeEnd || analyticsRangeEnd < analyticsRangeStart) {
      analyticsRangeEnd = analyticsRangeStart;
      if (analyticsRangeToInput) analyticsRangeToInput.value = analyticsRangeEnd;
    }

    analyticsFilterPeriod = "range";
    closeAnalyticsMonthWheel();
    renderAnalytics();
  });

  analyticsRangeToInput?.addEventListener("change", () => {
    if (!analyticsRangeToInput.value) return;
    analyticsRangeEnd = analyticsRangeToInput.value;

    if (!analyticsRangeStart || analyticsRangeStart > analyticsRangeEnd) {
      analyticsRangeStart = analyticsRangeEnd;
      if (analyticsRangeFromInput) analyticsRangeFromInput.value = analyticsRangeStart;
    }

    analyticsFilterPeriod = "range";
    closeAnalyticsMonthWheel();
    closeAnalyticsFiltersModal();
    renderAnalytics();
  });

  closeModalBtn?.addEventListener("click", closeModal);
  saveBtn?.addEventListener("click", saveTransaction);
  deleteTransactionBtn?.addEventListener("click", deleteTransaction);
  addCategoryBtn?.addEventListener("click", addCategory);

  closeBudgetModalBtn?.addEventListener("click", closeBudgetModal);
  saveBudgetBtn?.addEventListener("click", saveBudgetLimit);
  closeSafeBucketsModalBtn?.addEventListener("click", closeSafeBucketsModal);
  openMandatoryPaymentsModalBtn?.addEventListener("click", openMandatoryPaymentsModal);
closeMandatoryPaymentsModalBtn?.addEventListener("click", closeMandatoryPaymentsModal);
openMandatoryPaymentEditorBtn?.addEventListener("click", openNewMandatoryPaymentEditor);

addMandatoryPaymentBtn?.addEventListener("click", saveMandatoryPayment);
deleteMandatoryPaymentBtn?.addEventListener("click", deleteMandatoryPaymentFromEditor);
closeMandatoryPaymentEditorModalBtn?.addEventListener("click", closeMandatoryPaymentEditorModal);
addSafeBucketBtn?.addEventListener("click", addSafeBucket);
closeSafeBucketAmountModalBtn?.addEventListener("click", closeSafeBucketAmountModal);
cancelSafeBucketAmountBtn?.addEventListener("click", closeSafeBucketAmountModal);
saveSafeBucketAmountBtn?.addEventListener("click", saveSafeBucketAmount);
  deleteSafeBucketBtn?.addEventListener("click", deleteSafeBucketFromModal);
safeInterestRateModal?.addEventListener("click", (event) => {
  if (event.target === safeInterestRateModal) closeSafeInterestRateModal();
});

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  budgetModal?.addEventListener("click", (event) => {
    if (event.target === budgetModal) closeBudgetModal();
  });
  mandatoryPaymentsModal?.addEventListener("click", (event) => {
  if (event.target === mandatoryPaymentsModal) closeMandatoryPaymentsModal();
});

mandatoryPaymentEditorModal?.addEventListener("click", (event) => {
  if (event.target === mandatoryPaymentEditorModal) closeMandatoryPaymentEditorModal();
});
  
  safeBucketsModal?.addEventListener("click", (event) => {
  if (event.target === safeBucketsModal) closeSafeBucketsModal();
});

  safeBucketAmountModal?.addEventListener("click", (event) => {
  if (event.target === safeBucketAmountModal) closeSafeBucketAmountModal();
});

  closeAnalyticsCategoryModalBtn?.addEventListener("click", closeAnalyticsCategoryModal);

  analyticsCategoryModal?.addEventListener("click", (event) => {
    if (event.target === analyticsCategoryModal) closeAnalyticsCategoryModal();
  });

  document.addEventListener("click", (event) => {
  if (getAnalyticsMonthWheelOpen() && analyticsMonthWheelWrap) {
    const clickedInsidePopover = analyticsMonthWheelWrap.contains(event.target);
    const clickedMonthBtn = analyticsMonthBtn?.contains(event.target);

    if (!clickedInsidePopover && !clickedMonthBtn) {
      closeAnalyticsMonthWheel();
    }
  }
});

  document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (modal && !modal.classList.contains("hidden")) {
    closeModal();
    return;
  }

  if (budgetModal && !budgetModal.classList.contains("hidden")) {
    closeBudgetModal();
    return;
  }
  
  if (accountModal && !accountModal.classList.contains("hidden")) {
  closeAccountModal();
  return;
}

  if (safeBucketsModal && !safeBucketsModal.classList.contains("hidden")) {
    closeSafeBucketsModal();
    return;
  }

  if (safeBucketAmountModal && !safeBucketAmountModal.classList.contains("hidden")) {
    closeSafeBucketAmountModal();
    return;
  }

  if (safeInterestRateModal && !safeInterestRateModal.classList.contains("hidden")) {
    closeSafeInterestRateModal();
    return;
  }

  if (analyticsCategoryModal && !analyticsCategoryModal.classList.contains("hidden")) {
    closeAnalyticsCategoryModal();
    return;
  }

  if (mandatoryPaymentsModal && !mandatoryPaymentsModal.classList.contains("hidden")) {
    closeMandatoryPaymentsModal();
    return;
  }
  
  if (mandatoryPaymentEditorModal && !mandatoryPaymentEditorModal.classList.contains("hidden")) {
  closeMandatoryPaymentEditorModal();
  return;
}

  if (faqModal && !faqModal.classList.contains("hidden")) {
    closeFaqModal();
    return;
  }
  
  if (analyticsFiltersModal && !analyticsFiltersModal.classList.contains("hidden")) {
  closeAnalyticsFiltersModal();
  return;
}

  if (getAnalyticsMonthWheelOpen()) {
    closeAnalyticsMonthWheel();
    return;
  }
});

  await loadDataFromSupabase();
  await applySafeInterestIfNeeded();
  await loadDataFromSupabase();
  renderAll();
  showWalletView();
  

  
});



;/* ===== js/33-wallet-expected-income.js ===== */
(() => {
  const STORAGE_KEY = "wallet_expected_income_v1";
  const CHECK_STATE_KEY = "wallet_expected_income_check_v1";

  const FIRST_CHECK_HOUR = 14;
  const SECOND_CHECK_HOUR = 20;
  const NEXT_DAY_CHECK_HOUR = 9;

  function parseMoney(text) {
    const normalized = String(text || "")
      .replace(/\s/g, "")
      .replace(/[â½â½]/g, "")
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
    }).format(amount)} â½`;
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

    if (!date) return "Ð´Ð°ÑÐ° Ð½Ðµ ÑÐºÐ°Ð·Ð°Ð½Ð°";

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
        title: data.title || "ÐÐ¶Ð¸Ð´Ð°ÐµÐ¼ÑÐ¹ Ð´Ð¾ÑÐ¾Ð´",
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
      <div class="modal hidden" id="expectedIncomeCheckModal" role="dialog" aria-modal="true" aria-label="ÐÑÐ¾Ð²ÐµÑÐºÐ° Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÑ Ð´ÐµÐ½ÐµÐ³">
        <div class="modal-sheet">
          <div class="modal-handle"></div>

          <div class="manager-card">
            <h2 class="modal-title">Ð§ÑÐ¾ Ð¿Ð¾ Ð´ÐµÐ½ÑÐ³Ð°Ð¼?</h2>

            <p class="expected-income-check-text" id="expectedIncomeCheckText">
              ÐÐ¶Ð¸Ð´Ð°ÐµÐ¼ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸ Ð´Ð¾Ð»Ð¶Ð½Ñ Ð±ÑÐ»Ð¸ Ð¿ÑÐ¸Ð¹ÑÐ¸.
            </p>

            <div class="modal-actions">
              <button
                class="btn btn-primary"
                type="button"
                id="expectedIncomeArrivedBtn"
              >
                ÐÐµÐ½ÑÐ³Ð¸ Ð¿ÑÐ¸ÑÐ»Ð¸
              </button>

              <button
                class="btn btn-danger"
                type="button"
                id="expectedIncomeWaitMoreBtn"
              >
                ÐÐ´Ñ Ð´Ð°Ð»ÑÑÐµ
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
        ? `${expected.title} Ð´Ð¾Ð»Ð¶Ð½Ð° Ð±ÑÐ»Ð° Ð¿ÑÐ¸Ð¹ÑÐ¸ ${formatDateHuman(expected.date)}. ÐÐ¸Ð½Ð¸Ð¼ÑÐ¼: ${formatMoney(expected.amount)}.`
        : `Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ Ð¶Ð´ÑÑÑ ${expected.title}. ÐÐ¸Ð½Ð¸Ð¼ÑÐ¼: ${formatMoney(expected.amount)}.`;
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
      label.textContent = "ÐÑÐ´ÑÑÐ¸Ðµ Ð´ÐµÐ½ÑÐ³Ð¸ Ð½Ðµ ÑÑÑÐµÐ½Ñ";
      value.textContent = "ÐÐ¾Ð±Ð°Ð²Ñ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ðµ, ÐµÑÐ»Ð¸ Ð¶Ð´ÑÑÑ ÐÐ";
      return;
    }

    label.textContent = `ÐÐ´ÑÑÑ: ${expected.title}`;
    value.textContent = `Ð¼Ð¸Ð½Ð¸Ð¼ÑÐ¼ ${formatMoney(expected.amount)} Â· ${formatDateHuman(expected.date)}`;
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

    setPressureLabels("Ð ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ñ", "ÐÐ¸Ð¼Ð¸ÑÑ");
    setText("walletCalendarPressureValue", formatMoney(mandatoryToFreeMoney));
    setText("walletLimitsPressureValue", formatMoney(remainingBudgets));

    setHeroEyebrow("ÐÐ¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°");
    setHeroTitle("ÐÐ¾Ð¶Ð½Ð¾ ÑÑÐ°ÑÐ¸ÑÑ");
    setFirstStatLabel("ÐÐ¾ ÐºÐ¾Ð½ÑÐ°");
    setText("walletDaysLeftValue", `${daysLeftMonth} Ð´Ð½.`);

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
      status.textContent = "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ Ð½Ðµ Ð·Ð°ÐºÑÑÑÑ";
      hint.textContent = expectedInCurrentMonth
        ? `ÐÐ°Ð¶Ðµ Ñ Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÐ¼Ð¸ ${expectedLabel} Ð½Ðµ ÑÐ²Ð°ÑÐ°ÐµÑ ${formatMoney(Math.abs(cashAfterMandatory))} Ð½Ð° Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸.`
        : `ÐÐµ ÑÐ²Ð°ÑÐ°ÐµÑ ${formatMoney(Math.abs(cashAfterMandatory))} Ð½Ð° Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÐµ Ð¿Ð»Ð°ÑÐµÐ¶Ð¸ Ð´Ð¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°.`;
      return;
    }

    if (hasFlexibleBudgetLimit && remainingBudgets <= 0) {
      status.textContent = "ÐÐ¸Ð¼Ð¸ÑÑ Ð·Ð°ÐºÐ¾Ð½ÑÐ¸Ð»Ð¸ÑÑ";
      hint.textContent = `ÐÐ¾ Ð»Ð¸Ð¼Ð¸ÑÐ½ÑÐ¼ ÐºÐ°ÑÐµÐ³Ð¾ÑÐ¸ÑÐ¼ Ð½Ð° ÑÑÐ¾Ñ Ð¼ÐµÑÑÑ ÑÐ¶Ðµ Ð½ÐµÑ ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾Ð³Ð¾ Ð¾ÑÑÐ°ÑÐºÐ°.`;
      return;
    }

    if (safeSpendPool <= 0) {
      status.textContent = "Ð¢ÑÐ°ÑÐ¸ÑÑ Ð½ÐµÐ»ÑÐ·Ñ";
      hint.textContent = `ÐÐ¾ÑÐ»Ðµ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½ÑÑ Ð¿Ð»Ð°ÑÐµÐ¶ÐµÐ¹ ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾Ð³Ð¾ Ð´Ð½ÐµÐ²Ð½Ð¾Ð³Ð¾ Ð»Ð¸Ð¼Ð¸ÑÐ° Ð´Ð¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ° Ð½ÐµÑ.`;
      return;
    }

    if (expectedInCurrentMonth) {
      const beforeIncomeRate = formatMoney(dailyUntilIncome);

      if (cashUntilIncome < 0) {
        status.textContent = "ÐÐ¾ Ð¿Ð¾ÑÑÑÐ¿Ð»ÐµÐ½Ð¸Ñ ÑÑÐ¾Ð¿";
        hint.textContent = `ÐÐ¾ ${formatDateHuman(expected.date)} Ð½Ðµ ÑÐ²Ð°ÑÐ°ÐµÑ ${formatMoney(Math.abs(cashUntilIncome))}. ÐÐ¾ÑÐ»Ðµ Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÑ ${expectedLabel}: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ Ð´Ð¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°.`;
        return;
      }

      if (dailyToMonthEnd < 300) {
        status.textContent = "Ð ÐµÐ¶Ð¸Ð¼ Ð²ÑÐ¶Ð¸Ð²Ð°Ð½Ð¸Ñ";
        hint.textContent = `Ð¡ ÑÑÑÑÐ¾Ð¼ Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÑ ${expectedLabel}: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ Ð´Ð¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°. ÐÐ¾ ${formatDateHuman(expected.date)}: ${beforeIncomeRate}/Ð´ÐµÐ½Ñ.`;
        return;
      }

      if (dailyToMonthEnd < 700) {
        status.textContent = "ÐÑÑÐ¾ÑÐ¾Ð¶Ð½Ð¾ Ð¼Ð¾Ð¶Ð½Ð¾";
        hint.textContent = `Ð¡ ÑÑÑÑÐ¾Ð¼ Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÑ ${expectedLabel}: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ Ð´Ð¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°. ÐÐ¾ ${formatDateHuman(expected.date)}: ${beforeIncomeRate}/Ð´ÐµÐ½Ñ.`;
        return;
      }

      status.textContent = "ÐÐµÑÑÑ Ð´ÐµÑÐ¶Ð¸ÑÑÑ";
      hint.textContent = `Ð¡ ÑÑÑÑÐ¾Ð¼ Ð¾Ð¶Ð¸Ð´Ð°ÐµÐ¼ÑÑ ${expectedLabel}: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ Ð´Ð¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°. ÐÐ¾ ${formatDateHuman(expected.date)}: ${beforeIncomeRate}/Ð´ÐµÐ½Ñ.`;
      return;
    }

    if (expected && !expectedInCurrentMonth) {
      status.textContent = "ÐÐµÐ· ÑÑÑÑÐ° Ð±ÑÐ´ÑÑÐ¸Ñ";
      hint.textContent = `ÐÐ¶Ð¸Ð´Ð°ÐµÐ¼ÑÐµ ${formatMoney(expected.amount)} Ð½Ðµ Ð² ÑÐµÐºÑÑÐµÐ¼ Ð¼ÐµÑÑÑÐµ, Ð¿Ð¾ÑÑÐ¾Ð¼Ñ Ð½Ðµ Ð²ÑÐ¾Ð´ÑÑ Ð² ÑÐ°ÑÑÑÑ. ÐÐ¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ°: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ.`;
      return;
    }

    if (dailyToMonthEnd < 300) {
      status.textContent = "Ð ÐµÐ¶Ð¸Ð¼ Ð²ÑÐ¶Ð¸Ð²Ð°Ð½Ð¸Ñ";
      hint.textContent = `ÐÐ¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ° Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ. ÐÑÐ´ÑÑÐ¸Ðµ Ð´ÐµÐ½ÑÐ³Ð¸ Ð¿Ð¾ÐºÐ° Ð½Ðµ ÑÑÐ¸ÑÑÐ²Ð°ÑÑÑÑ.`;
      return;
    }

    if (dailyToMonthEnd < 700) {
      status.textContent = "ÐÐµ ÑÐ°Ð·Ð³Ð¾Ð½ÑÐ¹ÑÑ";
      hint.textContent = `ÐÐ°Ð¿Ð°Ñ ÑÐ¾Ð½ÐºÐ¸Ð¹. ÐÐ¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ° Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ.`;
      return;
    }

    status.textContent = "ÐÐµÑÐ¶Ð¸ÑÑÑÑ";
    hint.textContent = `ÐÐ¾Ð¶Ð½Ð¾ Ð¶Ð¸ÑÑ ÑÐ¿Ð¾ÐºÐ¾Ð¹Ð½ÐµÐµ. ÐÐ¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ° Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾: ${dailyMonthLabel}/Ð´ÐµÐ½Ñ.`;
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

        const title = String(titleInput?.value || "").trim() || "ÐÐ¶Ð¸Ð´Ð°ÐµÐ¼ÑÐ¹ Ð´Ð¾ÑÐ¾Ð´";
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


;/* ===== js/36-savings-settings-columns.js ===== */
(() => {
  const ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY = "account_balance_adjustments_v1";

  const SAVINGS_TYPES = {
    default: {
      label: "ÐÐ±ÑÑÐ½Ð¾Ðµ",
      hint: "ÐÐ±ÑÑÐ½Ð¾Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ: ÑÐµÐ»Ñ, ÐºÐ¾Ð¿Ð¸Ð»ÐºÐ° Ð¸Ð»Ð¸ Ð¾ÑÐ´ÐµÐ»ÑÐ½ÑÐ¹ Ð´ÐµÐ½ÐµÐ¶Ð½ÑÐ¹ ÐºÐ°ÑÐ¼Ð°Ð½.",
    },
    reserve: {
      label: "Ð ÐµÐ·ÐµÑÐ²",
      hint: "Ð ÐµÐ·ÐµÑÐ²: Ð´ÐµÐ½ÑÐ³Ð¸ Ð·Ð°ÑÐ¸ÑÐµÐ½Ñ Ð¸ Ð½Ðµ Ð´Ð¾Ð»Ð¶Ð½Ñ ÑÑÐ¸ÑÐ°ÑÑÑÑ ÑÐ²Ð¾Ð±Ð¾Ð´Ð½ÑÐ¼Ð¸.",
    },
    required: {
      label: "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð¾Ðµ",
      hint: "ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð¾Ðµ: Ð´ÐµÐ½ÑÐ³Ð¸ Ð¿Ð¾Ð´ Ð½Ð°Ð»Ð¾Ð³Ð¸, ÐºÐ²Ð°ÑÑÐ¸ÑÑ, Ð¿Ð»Ð°ÑÐµÐ¶Ð¸ Ð¸Ð»Ð¸ ÑÐ¸ÐºÑÐ¸ÑÐ¾Ð²Ð°Ð½Ð½ÑÑ ÑÐµÐ»Ñ.",
    },
    asset: {
      label: "ÐÐºÑÐ¸Ð²",
      hint: "ÐÐºÑÐ¸Ð²: Ð·Ð¾Ð»Ð¾ÑÐ¾, Ð²Ð°Ð»ÑÑÐ°, ÐºÑÐ¸Ð¿ÑÐ° Ð¸Ð»Ð¸ Ð´ÑÑÐ³Ð¾Ðµ Ð¸Ð¼ÑÑÐµÑÑÐ²Ð¾. ÐÑÐ¾ÑÐµÐ½ÑÑ Ð¼Ð¾Ð¶Ð½Ð¾ Ð²ÑÐºÐ»ÑÑÐ¸ÑÑ.",
    },
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getBridge() {
    return window.FinanceAppSavingsBridge || null;
  }

  function getState() {
    return getBridge()?.getState?.() || window.FinanceAppState?.state || null;
  }

  function getSupabaseClient() {
    return getBridge()?.getSupabaseClient?.() || null;
  }

  function roundToTwo(value) {
    const bridgeRound = getBridge()?.roundToTwo;

    if (typeof bridgeRound === "function") {
      return bridgeRound(value);
    }

    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function getActiveBucketId() {
    const bridgeId = getBridge()?.getActiveBucketId?.();

    if (bridgeId) return bridgeId;

    const modal = $("safeBucketAmountModal");

    return modal?.dataset?.bucketId || modal?.dataset?.safeBucketId || "";
  }

  function getBucketById(bucketId) {
    const fromBridge = getBridge()?.getSafeBucketById?.(bucketId);

    if (fromBridge) return fromBridge;

    const state = getState();

    return state?.safeBuckets?.find((bucket) => bucket.id === bucketId) || null;
  }

  function getVaultAccount() {
    const fromBridge = getBridge()?.getVaultAccount?.();

    if (fromBridge) return fromBridge;

    const state = getState();

    return state?.accounts?.find((account) => account.account_kind === "vault_pool") || null;
  }

  function roundRate(value) {
    const number = Number(value) || 0;

    return Math.max(0, Math.round(number * 1000000) / 1000000);
  }

  function parsePercentInput(value) {
    return (
      Number(
        String(value || "0")
          .replace(",", ".")
          .replace("%", "")
          .trim()
      ) || 0
    );
  }

  function legacyTypeFromBucket(bucket) {
    const kind = String(bucket?.kind || bucket?.bucket_kind || "").trim();

    if (kind === "tax" || kind === "housing") return "required";
    if (kind === "reserve") return "reserve";

    return "default";
  }

  function getBucketSettings(bucket) {
    const legacyRate = Number(bucket?.annual_rate) || 0;
    const type = bucket?.savings_type || legacyTypeFromBucket(bucket);

    return {
      savings_type: type,
      interest_enabled: Boolean(bucket?.interest_enabled),
      annual_rate: Boolean(bucket?.interest_enabled) ? legacyRate : 0,
      include_in_protected:
        typeof bucket?.include_in_protected === "boolean"
          ? bucket.include_in_protected
          : type !== "default",
      include_in_free_money:
        typeof bucket?.include_in_free_money === "boolean"
          ? bucket.include_in_free_money
          : false,
    };
  }

  function ensureFieldLabel(input, labelText) {
    if (!input) return;

    const field = input.closest(".field") || input.parentElement;

    if (!field) return;

    let label = field.querySelector(".savings-editor-field-label");

    if (!label) {
      label = document.createElement("div");
      label.className = "savings-editor-field-label";
      field.insertBefore(label, input);
    }

    label.textContent = labelText;
  }

  function ensureSettingsPanel() {
    const modal = $("safeBucketAmountModal");
    const interestInput = $("safeBucketInterestInput");

    if (!modal || !interestInput) return;

    ensureFieldLabel($("safeBucketNameInput"), "ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ");
    ensureFieldLabel($("safeBucketAmountInput"), "Ð¢ÐµÐºÑÑÐ°Ñ ÑÑÐ¼Ð¼Ð°");
    ensureFieldLabel(interestInput, "ÐÐ¾Ð´Ð¾Ð²Ð¾Ð¹ Ð¿ÑÐ¾ÑÐµÐ½Ñ");

    if ($("savingsColumnsSettingsPanel")) return;

    const panel = document.createElement("div");
    panel.className = "savings-editor-settings-panel";
    panel.id = "savingsColumnsSettingsPanel";

    panel.innerHTML = `
      <div class="savings-editor-field-label">Ð¢Ð¸Ð¿ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ</div>

      <select class="input savings-editor-type-select" id="savingsTypeSelect">
        <option value="default">ÐÐ±ÑÑÐ½Ð¾Ðµ</option>
        <option value="reserve">Ð ÐµÐ·ÐµÑÐ²</option>
        <option value="required">ÐÐ±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð¾Ðµ</option>
        <option value="asset">ÐÐºÑÐ¸Ð²</option>
      </select>

      <label class="savings-editor-toggle-row" for="savingsInterestEnabledInput">
        <span>
          <strong>ÐÐ°ÑÐ¸ÑÐ»ÑÑÑ Ð¿ÑÐ¾ÑÐµÐ½ÑÑ</strong>
          <small>ÐÑÐºÐ»ÑÑÐ¸, ÐµÑÐ»Ð¸ ÑÑÐ¾ Ð·Ð¾Ð»Ð¾ÑÐ¾, Ð½Ð°Ð»Ð¸ÑÐºÐ°, Ð²Ð°Ð»ÑÑÐ°, ÐºÑÐ¸Ð¿ÑÐ° Ð¸Ð»Ð¸ Ð´ÑÑÐ³Ð¾Ð¹ Ð°ÐºÑÐ¸Ð² Ð±ÐµÐ· Ð±Ð°Ð½ÐºÐ¾Ð²ÑÐºÐ¾Ð¹ ÑÑÐ°Ð²ÐºÐ¸.</small>
        </span>

        <input id="savingsInterestEnabledInput" type="checkbox" />

        <i aria-hidden="true"></i>
      </label>

      <div class="savings-editor-settings-hint" id="savingsSettingsHint">
        ÐÐ°ÑÑÑÐ¾Ð¹ÐºÐ¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ ÑÐ¾ÑÑÐ°Ð½ÑÑÑÑÑ Ð² Supabase.
      </div>
    `;

    const interestField =
      interestInput.closest(".field") ||
      interestInput.parentElement;

    if (interestField) {
      interestField.insertAdjacentElement("afterend", panel);
    }

    $("savingsTypeSelect")?.addEventListener("change", syncHint);

    $("savingsInterestEnabledInput")?.addEventListener("change", () => {
      const checkbox = $("savingsInterestEnabledInput");

      if (!checkbox?.checked && interestInput) {
        interestInput.value = "0";
      }

      syncInterestFieldState();
      syncHint();
    });
  }

  function syncInterestFieldState() {
    const checkbox = $("savingsInterestEnabledInput");
    const interestInput = $("safeBucketInterestInput");

    if (!checkbox || !interestInput) return;

    const field =
      interestInput.closest(".field") ||
      interestInput.parentElement;

    interestInput.disabled = !checkbox.checked;

    field?.classList.toggle(
      "savings-editor-interest-disabled",
      !checkbox.checked
    );
  }

  function syncHint() {
    const typeSelect = $("savingsTypeSelect");
    const checkbox = $("savingsInterestEnabledInput");
    const hint = $("savingsSettingsHint");

    if (!typeSelect || !hint) return;

    const type = typeSelect.value || "default";
    const baseHint = SAVINGS_TYPES[type]?.hint || SAVINGS_TYPES.default.hint;

    hint.textContent = checkbox?.checked
      ? `${baseHint} ÐÑÐ¾ÑÐµÐ½ÑÑ Ð²ÐºÐ»ÑÑÐµÐ½Ñ.`
      : `${baseHint} ÐÑÐ¾ÑÐµÐ½ÑÑ Ð²ÑÐºÐ»ÑÑÐµÐ½Ñ.`;
  }

  function syncEditorFromBucket() {
    ensureSettingsPanel();

    const bucketId = getActiveBucketId();
    const bucket = getBucketById(bucketId);

    if (!bucket) return;

    const modal = $("safeBucketAmountModal");

    if (modal) {
      modal.dataset.bucketId = bucketId;
    }

    const settings = getBucketSettings(bucket);
    const typeSelect = $("savingsTypeSelect");
    const checkbox = $("savingsInterestEnabledInput");
    const interestInput = $("safeBucketInterestInput");
    const title = $("safeBucketAmountModalTitle");

    if (typeSelect) {
      typeSelect.value = settings.savings_type || "default";
    }

    if (checkbox) {
      checkbox.checked = Boolean(settings.interest_enabled);
    }

    if (interestInput) {
      const percent = settings.interest_enabled
        ? Math.round((Number(settings.annual_rate) || 0) * 10000) / 100
        : 0;

      interestInput.value = String(percent).replace(".", ",");
    }

    if (title) {
      title.textContent = bucket.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";
    }

    syncInterestFieldState();
    syncHint();
  }

  function getSettingsFromEditor() {
    const type = $("savingsTypeSelect")?.value || "default";
    const interestEnabled = Boolean($("savingsInterestEnabledInput")?.checked);
    const percent = parsePercentInput($("safeBucketInterestInput")?.value);
    const annualRate = interestEnabled ? roundRate(percent / 100) : 0;

    return {
      savings_type: type,
      interest_enabled: interestEnabled,
      annual_rate: annualRate,
      include_in_protected: type !== "default",
      include_in_free_money: false,
    };
  }

  function patchLocalBucket(bucketId, patch) {
    const state = getState();

    if (!state?.safeBuckets) return;

    const index = state.safeBuckets.findIndex((bucket) => bucket.id === bucketId);

    if (index === -1) return;

    state.safeBuckets[index] = {
      ...state.safeBuckets[index],
      ...patch,
    };
  }

  async function saveLegacyInterestRate(bucketId, annualRate) {
    const supabaseClient = getSupabaseClient();

    if (!supabaseClient || !bucketId) return;

    const state = getState();
    let ratesMap = {};

    const metaRecord = state?.appMeta?.find((item) => item.key === "safe_bucket_interest_rates");

    if (metaRecord?.value) {
      try {
        ratesMap = JSON.parse(metaRecord.value) || {};
      } catch (error) {
        ratesMap = {};
      }
    }

    if (annualRate > 0) {
      ratesMap[bucketId] = annualRate;
    } else {
      delete ratesMap[bucketId];
    }

    const setAppMetaLocalValue = getBridge()?.setAppMetaLocalValue;

    if (typeof setAppMetaLocalValue === "function") {
      setAppMetaLocalValue("safe_bucket_interest_rates", ratesMap);
    }

    await supabaseClient
      .from("app_meta")
      .upsert(
        {
          key: "safe_bucket_interest_rates",
          value: JSON.stringify(ratesMap),
        },
        {
          onConflict: "key",
        }
      );
  }

  async function saveSavingsColumnsFromEditor() {
    const bucketId = getActiveBucketId();
    const supabaseClient = getSupabaseClient();

    if (!bucketId || !supabaseClient) return;

    const patch = getSettingsFromEditor();

    patchLocalBucket(bucketId, patch);

    const { error } = await supabaseClient
      .from("safe_buckets")
      .update(patch)
      .eq("id", bucketId);

    if (error) {
      console.error("saveSavingsColumnsFromEditor error:", error);
      alert(`ÐÐµ Ð¿Ð¾Ð»ÑÑÐ¸Ð»Ð¾ÑÑ ÑÐ¾ÑÑÐ°Ð½Ð¸ÑÑ Ð½Ð°ÑÑÑÐ¾Ð¹ÐºÐ¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ: ${error.message || "unknown error"}`);
      return;
    }

    await saveLegacyInterestRate(bucketId, patch.annual_rate);
  }

  function calculateRawAccountBalance(account) {
    const state = getState();

    if (!state || !account) return 0;

    const accountId = account.id;
    const accountName = account.name;

    return roundToTwo(
      state.transactions.reduce((sum, transaction) => {
        const amount = roundToTwo(Number(transaction.amount) || 0);

        if (transaction.type === "income") {
          const byId = transaction.account_id && transaction.account_id === accountId;
          const legacy = !transaction.account_id && transaction.account === accountName;

          if (byId || legacy) return sum + amount;
        }

        if (transaction.type === "expense") {
          const byId = transaction.account_id && transaction.account_id === accountId;
          const legacy = !transaction.account_id && transaction.account === accountName;

          if (byId || legacy) return sum - amount;
        }

        if (transaction.type === "transfer") {
          const fromById = transaction.from_account_id && transaction.from_account_id === accountId;
          const toById = transaction.to_account_id && transaction.to_account_id === accountId;

          const fromLegacy = !transaction.from_account_id && transaction.from_account === accountName;
          const toLegacy = !transaction.to_account_id && transaction.to_account === accountName;

          if (fromById || fromLegacy) sum -= amount;
          if (toById || toLegacy) sum += amount;
        }

        return sum;
      }, 0)
    );
  }

  function getBucketsTotalBalance() {
    const state = getState();
    const getSafeBucketBalance = getBridge()?.getSafeBucketBalance;

    if (!state?.safeBuckets) return 0;

    return roundToTwo(
      state.safeBuckets.reduce((sum, bucket) => {
        const amount =
          typeof getSafeBucketBalance === "function"
            ? getSafeBucketBalance(bucket.id)
            : Number(bucket.amount || bucket.balance || 0);

        return sum + (Number(amount) || 0);
      }, 0)
    );
  }

  async function syncVaultAccountBalanceToBuckets() {
    const supabaseClient = getSupabaseClient();
    const state = getState();
    const vaultAccount = getVaultAccount();

    if (!supabaseClient || !state || !vaultAccount) return;

    const bucketTotal = getBucketsTotalBalance();

    const rawBalanceFromBridge =
      typeof getBridge()?.getRawAccountBalance === "function"
        ? getBridge().getRawAccountBalance(vaultAccount.id)
        : calculateRawAccountBalance(vaultAccount);

    const manualAdjustment = roundToTwo(bucketTotal - rawBalanceFromBridge);

    const accountAdjustmentsApi = window.FinanceAppAccountBalanceAdjustments;

    if (!accountAdjustmentsApi?.setAccountManualAdjustmentLocal) return;

    const nextAdjustments = accountAdjustmentsApi.setAccountManualAdjustmentLocal(
      state,
      vaultAccount.id,
      manualAdjustment
    );

    const { error } = await supabaseClient
      .from("app_meta")
      .upsert(
        {
          key: ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
          value: JSON.stringify(nextAdjustments),
        },
        {
          onConflict: "key",
        }
      );

    if (error) {
      console.error("syncVaultAccountBalanceToBuckets error:", error);
      return;
    }

    getBridge()?.renderAll?.();
  }

  async function renameSavingsAccountTitle(nextTitle) {
    const supabaseClient = getSupabaseClient();
    const state = getState();
    const vaultAccount = getVaultAccount();

    const title = String(nextTitle || "").trim();

    if (!title || !supabaseClient || !state || !vaultAccount) return;

    const { error } = await supabaseClient
      .from("accounts")
      .update({
        name: title,
      })
      .eq("id", vaultAccount.id);

    if (error) {
      console.error("renameSavingsAccountTitle error:", error);
      alert(`ÐÐµ Ð¿Ð¾Ð»ÑÑÐ¸Ð»Ð¾ÑÑ Ð¿ÐµÑÐµÐ¸Ð¼ÐµÐ½Ð¾Ð²Ð°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð¸ÑÐµÐ»ÑÐ½ÑÐ¹ ÑÑÑÑ: ${error.message || "unknown error"}`);
      return;
    }

    const account = state.accounts.find((item) => item.id === vaultAccount.id);

    if (account) {
      account.name = title;
    }

    const modalTitle = $("safeBucketsModalTitle");

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    await getBridge()?.loadDataFromSupabase?.();
    getBridge()?.renderAll?.();
  }

  function syncSavingsSectionTitle() {
    const modalTitle = $("safeBucketsModalTitle");
    const vaultAccount = getVaultAccount();

    if (!modalTitle || !vaultAccount) return;

    modalTitle.textContent = vaultAccount.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ";
  }

  function ensureSavingsTitleEditButton() {
    const modalTitle = $("safeBucketsModalTitle");

    if (!modalTitle) return;

    const titleWrap = modalTitle.parentElement;

    if (!titleWrap) return;

    let button = $("editSavingsSectionTitleBtn");

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.id = "editSavingsSectionTitleBtn";
      button.className = "savings-section-title-edit-btn";
      button.textContent = "ÐÐµÑÐµÐ¸Ð¼ÐµÐ½Ð¾Ð²Ð°ÑÑ";

      titleWrap.appendChild(button);
    }

    button.onclick = async () => {
      const currentTitle = getVaultAccount()?.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ";

      const nextTitle = window.prompt(
        "ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð½Ð°ÐºÐ¾Ð¿Ð¸ÑÐµÐ»ÑÐ½Ð¾Ð³Ð¾ ÑÑÑÑÐ°",
        currentTitle
      );

      if (nextTitle === null) return;

      await renameSavingsAccountTitle(nextTitle);
    };
  }

  function schedulePostSaveSync() {
    window.setTimeout(async () => {
      try {
        await getBridge()?.loadDataFromSupabase?.();
        await syncVaultAccountBalanceToBuckets();
        await getBridge()?.loadDataFromSupabase?.();
        getBridge()?.renderAll?.();
        syncEditorFromBucket();
      } catch (error) {
        console.error("schedulePostSaveSync error:", error);
      }
    }, 700);
  }

  function bindSavingsColumnsEditor() {
    const modal = $("safeBucketAmountModal");
    const saveBtn = $("saveSafeBucketAmountBtn");

    if (!modal || !saveBtn) return;

    const observer = new MutationObserver(() => {
      if (!modal.classList.contains("hidden")) {
        window.requestAnimationFrame(syncEditorFromBucket);
      }
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ["class"],
    });

    saveBtn.addEventListener("click", () => {
      saveSavingsColumnsFromEditor();
      schedulePostSaveSync();
    });
  }

  function bindSavingsModalTitle() {
    const modal = $("safeBucketsModal");

    if (!modal) return;

    const observer = new MutationObserver(() => {
      if (!modal.classList.contains("hidden")) {
        syncSavingsSectionTitle();
        ensureSavingsTitleEditButton();
      }
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ["class"],
    });

    syncSavingsSectionTitle();
    ensureSavingsTitleEditButton();
  }

  function boot() {
    ensureSettingsPanel();
    bindSavingsColumnsEditor();
    bindSavingsModalTitle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();



;/* ===== js/37-wallet-light-mode.js ===== */
(() => {
  const MODE_KEY = "wallet_home_mode_v1";
  const PENDING_LIFETIME_MS = 120000;
  const AFTER_SAVE_ANIMATION_DELAY_MS = 520;

  const SWIPE_MIN_X = 72;
  const SWIPE_MAX_Y = 58;
  const SWIPE_MAX_TIME = 750;

  let pendingLightTransaction = null;
  let swipeStart = null;
  let isModeSwitching = false;

  function getSavedMode() {
    return localStorage.getItem(MODE_KEY) || "light";
  }

  function saveMode(mode) {
    localStorage.setItem(MODE_KEY, mode);
  }

  function parseMoney(text) {
    const normalized = String(text || "")
      .replace(/\s/g, "")
      .replace(/[â½â½]/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    const value = Number(normalized);

    return Number.isFinite(value) ? value : 0;
  }

  function getFreeMoneyText() {
    const source = document.getElementById("balanceFreeMoneyValue");

    return source?.textContent?.trim() || "0 â½";
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
      toggleBtn.textContent = normalizedMode === "light" ? "ÐÐ¾Ð»Ð½ÑÐ¹ ÑÐµÐ¶Ð¸Ð¼" : "ÐÐ°Ð¹Ñ";
    }

    if (normalizedMode === "light") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    saveMode(normalizedMode);
  }

  function switchModeAnimated(nextMode) {
    const normalizedNextMode = nextMode === "hard" ? "hard" : "light";
    const isLightMode = document.body.classList.contains("wallet-mode-light");
    const currentMode = isLightMode ? "light" : "hard";

    if (isModeSwitching || currentMode === normalizedNextMode) return;

    isModeSwitching = true;

    const goingToHard = normalizedNextMode === "hard";

    document.body.classList.remove(
      "wallet-mode-enter-left",
      "wallet-mode-enter-right",
      "wallet-mode-leave-left",
      "wallet-mode-leave-right"
    );

    document.body.classList.add(
      "wallet-mode-switching",
      goingToHard ? "wallet-mode-leave-left" : "wallet-mode-leave-right"
    );

    window.setTimeout(() => {
      setMode(normalizedNextMode);

      document.body.classList.remove(
        "wallet-mode-leave-left",
        "wallet-mode-leave-right"
      );

      document.body.classList.add(
        goingToHard ? "wallet-mode-enter-right" : "wallet-mode-enter-left"
      );

      window.setTimeout(() => {
        document.body.classList.remove(
          "wallet-mode-switching",
          "wallet-mode-enter-left",
          "wallet-mode-enter-right"
        );

        isModeSwitching = false;
      }, 280);
    }, 180);
  }

  function syncLightFreeMoney() {
    const target = document.getElementById("walletLightFreeValue");

    if (!target) return;

    target.textContent = getFreeMoneyText();
  }

  function playMoneyUpdateAnimation() {
    const core = document.getElementById("walletLightBalanceCore");

    if (!core) return;

    core.classList.remove("is-updating");

    requestAnimationFrame(() => {
      core.classList.add("is-updating");
    });

    window.setTimeout(() => {
      core.classList.remove("is-updating");
    }, 520);
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

    pendingLightTransaction.animationPlayed = true;
    window.clearTimeout(pendingLightTransaction.timeoutId);

    window.setTimeout(() => {
      syncLightFreeMoney();
      playMoneyUpdateAnimation();
      pendingLightTransaction = null;
    }, AFTER_SAVE_ANIMATION_DELAY_MS);
  }

  function isBlockingViewOpen() {
    return Boolean(
      document.querySelector(".modal:not(.hidden)") ||
      document.querySelector("#monthlyReportView:not(.hidden)") ||
      document.querySelector("#categoriesManagerView:not(.hidden)")
    );
  }

  function isInteractiveTarget(target) {
    return Boolean(
      target?.closest?.(
        "button, a, input, select, textarea, label, .modal, .modal-sheet"
      )
    );
  }

  function bindSwipeModeEvents() {
    document.addEventListener(
      "touchstart",
      (event) => {
        if (isModeSwitching) return;
        if (isBlockingViewOpen()) return;
        if (isInteractiveTarget(event.target)) return;
        
        const touch = event.touches?.[0];

        if (!touch) return;

        swipeStart = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        };
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (event) => {
        if (!swipeStart) return;
        if (isModeSwitching) {
          swipeStart = null;
          return;
        }

        if (isBlockingViewOpen()) {
          swipeStart = null;
          return;
        }

        const touch = event.changedTouches?.[0];

        if (!touch) {
          swipeStart = null;
          return;
        }

        const deltaX = touch.clientX - swipeStart.x;
        const deltaY = touch.clientY - swipeStart.y;
        const elapsed = Date.now() - swipeStart.time;

        swipeStart = null;

        if (elapsed > SWIPE_MAX_TIME) return;
        if (Math.abs(deltaX) < SWIPE_MIN_X) return;
        if (Math.abs(deltaY) > SWIPE_MAX_Y) return;

        const isLightMode = document.body.classList.contains("wallet-mode-light");
        const isHardMode = document.body.classList.contains("wallet-mode-hard");

        if (isLightMode && deltaX < 0) {
          switchModeAnimated("hard");
          return;
        }

        if (isHardMode && deltaX > 0) {
          switchModeAnimated("light");
        }
      },
      { passive: true }
    );
  }

  function bindLightModeEvents() {
    document.addEventListener("click", (event) => {
      const expenseBtn = event.target.closest("#walletLightExpenseBtn");
      const incomeBtn = event.target.closest("#walletLightIncomeBtn");

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
      if (pendingLightTransaction) {
        completePendingLightTransactionIfMoneyChanged();
        return;
      }

      syncLightFreeMoney();
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
    bindSwipeModeEvents();

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


;/* ===== js/38-wallet-hard-mode-preview.js ===== */
(() => {
  let syncTimer = null;

  function getTextById(id, fallback = "0 â½") {
    const element = document.getElementById(id);
    const text = element?.textContent?.trim();
    return text || fallback;
  }

  function getTextBySelector(selector, fallback = "0 â½") {
    const element = document.querySelector(selector);
    const text = element?.textContent?.trim();
    return text || fallback;
  }

  function setTextById(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = value;
  }

  function cleanMoneyText(value, fallback = "0 â½") {
  const text = String(value || "")
    .replace(/^Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½Ð¾\s*:\s*/i, "")
    .replace(/^ÐÐ°Ð»Ð°Ð½Ñ\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return formatMoneyText(text || fallback);
}

function formatMoneyText(value) {
  const source = String(value || "").trim();

  if (!source) return "0 â½";

  const numeric = source
    .replace(/\s/g, "")
    .replace("â½", "")
    .replace(",", ".")
    .trim();

  const amount = Number(numeric);

  if (!Number.isFinite(amount)) return source;

  const hasDecimals = Math.abs(amount % 1) > 0.0001;

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(amount) + " â½";
}

  function getMoneyTextById(id, fallback = "0 â½") {
    return cleanMoneyText(getTextById(id, fallback), fallback);
  }

  function getMoneyTextBySelector(selector, fallback = "0 â½") {
    return cleanMoneyText(getTextBySelector(selector, fallback), fallback);
  }

  function extractExpectedIncomeDate(text) {
    const source = String(text || "");
    const match = source.match(/(\d{1,2}\s+[Ð°-ÑÑ]+)/i);
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
      !valueText.toLowerCase().includes("Ð´Ð¾Ð±Ð°Ð²Ñ") &&
      valueText !== "0 â½";

    if (!hasExpectedIncome) {
      label.textContent = "ÐÑÐ´ÑÑÐ¸Ðµ Ð´ÐµÐ½ÑÐ³Ð¸ Ð½Ðµ ÑÑÑÐµÐ½Ñ";
      button.textContent = "ÐÐ´Ñ Ð´ÐµÐ½ÑÐ³Ð¸";
      return;
    }

    label.textContent = "ÐÐ´ÑÑÑ Ð´ÐµÐ½ÑÐ³Ð¸";

    const dateLabel = extractExpectedIncomeDate(valueText);
    if (dateLabel) {
      button.textContent = dateLabel;
    }
  }

  function pickHardMoneyText(ids, fallback = "0 â½") {
  for (const id of ids) {
    const text = getTextById(id, "");
    const amount = parseHardMoney(text);

    if (amount > 0) {
      return formatHardMoney(amount);
    }
  }

  return fallback;
}

function syncHardSummary() {
  setTextById(
    "hardSummaryFreeValue",
    pickHardMoneyText([
      "balanceFreeMoneyValue",
      "walletLightFreeValue",
      "monthlyReportFreeValue",
    ])
  );

  setTextById(
    "hardSummaryBalanceValue",
    pickHardMoneyText([
      "hardSummaryBalanceValue",
      "monthlyReportBalanceValue",
    ], getMoneyTextBySelector(".hard-source-metrics .balance-amount", "0 â½"))
  );

  setTextById(
    "hardSummaryCalendarValue",
    pickHardMoneyText([
      "walletCalendarPressureValue",
      "analyticsPendingMandatoryValue",
    ])
  );

  setTextById(
    "hardSummaryLimitsValue",
    pickHardMoneyText([
      "walletLimitsPressureValue",
      "analyticsRemainingBudgetsValue",
    ])
  );
}

  function syncHardPressure() {
    setTextById(
      "hardPressureMandatoryValue",
      getMoneyTextById("analyticsPendingMandatoryValue", "0 â½")
    );

    setTextById(
      "hardPressureLimitsValue",
      getMoneyTextById(
        "analyticsRemainingBudgetsValue",
        getMoneyTextById("walletLimitsPressureValue", "0 â½")
      )
    );

    setTextById(
      "hardPressureFreeValue",
      getMoneyTextById("balanceFreeMoneyValue", "0 â½")
    );

    setTextById(
      "hardPressureControlValue",
      getTextById("walletMandatoryControlValue", "0%")
    );
  }

  function makeNoBreakRate(value) {
    const span = document.createElement("span");

    span.style.whiteSpace = "nowrap";
    span.textContent = `${value}/Ð´ÐµÐ½Ñ`;

    return span;
  }

  function syncHeroHint() {
    const hint = document.getElementById("walletGameHint");
    if (!hint) return;

    const currentHint = hint.textContent.trim();
    const isInitialHint = currentHint.toLowerCase().includes("ÑÐµÐ¹ÑÐ°Ñ Ð¿ÑÐ¾Ð²ÐµÑÑÑ");

    if (currentHint && !isInitialHint) return;

    const todayCan = getMoneyTextById("walletTodayCanValue", "0 â½");
    hint.replaceChildren(
      document.createTextNode("ÐÐ¾ ÐºÐ¾Ð½ÑÐ° Ð¼ÐµÑÑÑÐ° Ð¼Ð¾Ð¶Ð½Ð¾ "),
      makeNoBreakRate(todayCan),
      document.createTextNode(". ÐÐ°Ð½Ð½ÑÐµ Ð¾Ð±Ð½Ð¾Ð²ÑÑÑÑ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹.")
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
      note.textContent = "ÐÑÐµÐ³Ð¾ 0 ÑÑÐµÑÐ¾Ð²";
      return;
    }

    const lastTwo = count % 100;
    const lastOne = count % 10;

    let word = "ÑÑÐµÑÐ¾Ð²";
    if (lastTwo < 11 || lastTwo > 14) {
      if (lastOne === 1) word = "ÑÑÑÑ";
      if (lastOne >= 2 && lastOne <= 4) word = "ÑÑÑÑÐ°";
    }

    note.textContent = `ÐÑÐµÐ³Ð¾ ${count} ${word}`;
  }
  
function parseHardMoney(value) {
  const source = String(value || "")
    .replace(/\s/g, "")
    .replace("â½", "")
    .replace(/â|â|â/g, "-")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const number = Number(source);

  return Number.isFinite(number) ? number : 0;
}

function formatHardMoney(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "0 â½";

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: Math.abs(amount % 1) > 0.0001 ? 2 : 0,
    maximumFractionDigits: Math.abs(amount % 1) > 0.0001 ? 2 : 0,
  }).format(amount) + " â½";
}

function getHardState() {
  return window.FinanceAppState?.state || null;
}

function parseHardDateString(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  const source = String(value || "").trim();
  if (!source) return null;

  const isoDate = new Date(source);
  if (!Number.isNaN(isoDate.getTime())) return isoDate;

  const ruMatch = source.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (ruMatch) {
    const day = Number(ruMatch[1]);
    const month = Number(ruMatch[2]) - 1;
    let year = Number(ruMatch[3]);

    if (year < 100) year += 2000;

    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function getHardDate(transaction) {
  return parseHardDateString(
    transaction?.date ||
    transaction?.created_at ||
    transaction?.createdAt ||
    transaction?.created ||
    transaction?.operationDate ||
    transaction?.operation_date ||
    transaction?.transactionDate ||
    transaction?.transaction_date ||
    transaction?.paidAt ||
    transaction?.paid_at ||
    transaction?.time ||
    transaction?.timestamp
  );
}

function isHardSameMonth(date, baseDate) {
  return (
    date &&
    date.getFullYear() === baseDate.getFullYear() &&
    date.getMonth() === baseDate.getMonth()
  );
}

function getHardPreviousMonthDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
}

function getHardTransactionSignedAmount(transaction) {
  return parseHardMoney(
    transaction?.amount ??
    transaction?.value ??
    transaction?.sum ??
    transaction?.total ??
    transaction?.money ??
    transaction?.price
  );
}

function getHardTransactionAmount(transaction) {
  return Math.abs(getHardTransactionSignedAmount(transaction));
}

function getHardTransactionType(transaction) {
  const type = String(
    transaction?.type ||
    transaction?.kind ||
    transaction?.operationType ||
    transaction?.operation_type ||
    transaction?.transactionType ||
    transaction?.transaction_type ||
    transaction?.direction ||
    transaction?.mode ||
    ""
  ).toLowerCase();

  if (type.includes("transfer") || type.includes("Ð¿ÐµÑÐµÐ²Ð¾Ð´")) {
    return "transfer";
  }

  if (
    type.includes("income") ||
    type.includes("Ð´Ð¾ÑÐ¾Ð´") ||
    type === "in" ||
    type === "plus"
  ) {
    return "income";
  }

  if (
    type.includes("expense") ||
    type.includes("ÑÐ°ÑÑÐ¾Ð´") ||
    type === "out" ||
    type === "minus"
  ) {
    return "expense";
  }

  const signedAmount = getHardTransactionSignedAmount(transaction);

  if (signedAmount < 0) return "expense";
  if (signedAmount > 0) return "income";

  return "";
}

function getHardTransactionsFromState() {
  const state = getHardState();

  if (!state || !Array.isArray(state.transactions)) {
    return [];
  }

  return state.transactions
    .map((transaction) => {
      const date = getHardDate(transaction);
      const type = getHardTransactionType(transaction);
      const amount = getHardTransactionAmount(transaction);

      if (!date || !type || !amount) return null;

      return {
        ...transaction,
        date,
        type,
        amount,
      };
    })
    .filter(Boolean);
}

function getHardCategoryId(transaction) {
  return String(
    transaction?.category_id ||
    transaction?.categoryId ||
    transaction?.category ||
    ""
  );
}

function getHardCategories() {
  const state = getHardState();

  if (!state || !Array.isArray(state.categories)) {
    return [];
  }

  return state.categories;
}

function getHardCategoryById(categoryId) {
  const id = String(categoryId || "");
  return getHardCategories().find((category) => {
    return String(category.id || category.category_id || category.name) === id;
  });
}

function getHardCategoryLimit(category) {
  return parseHardMoney(
    category?.limit ??
    category?.budget ??
    category?.budget_limit ??
    category?.budgetLimit ??
    category?.monthLimit ??
    category?.monthlyLimit ??
    category?.amountLimit
  );
}

function isHardRequiredCategory(category) {
  const type = String(
    category?.type ||
    category?.kind ||
    category?.category_type ||
    ""
  ).toLowerCase();

  return (
    category?.required === true ||
    category?.is_required === true ||
    category?.isRequired === true ||
    type.includes("required") ||
    type.includes("mandatory") ||
    type.includes("Ð¾Ð±ÑÐ·")
  );
}

function getHardMonthTotals(baseDate) {
  const result = {
    income: 0,
    expense: 0,
    flexibleExpense: 0,
    mandatoryExpense: 0,
  };

  getHardTransactionsFromState().forEach((transaction) => {
    if (!isHardSameMonth(transaction.date, baseDate)) return;
    if (transaction.type === "transfer") return;

    if (transaction.type === "income") {
      result.income += transaction.amount;
      return;
    }

    if (transaction.type !== "expense") return;

    result.expense += transaction.amount;

    const category = getHardCategoryById(getHardCategoryId(transaction));

    if (category && isHardRequiredCategory(category)) {
      result.mandatoryExpense += transaction.amount;
    } else {
      result.flexibleExpense += transaction.amount;
    }
  });

  return result;
}

function getHardFlexibleBudgetTotal() {
  return getHardCategories().reduce((sum, category) => {
    if (isHardRequiredCategory(category)) return sum;

    const limit = getHardCategoryLimit(category);
    if (limit <= 0) return sum;

    return sum + limit;
  }, 0);
}

function setHardDelta(elementId, current, previous, mode) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.classList.remove(
    "hard-month-stat__delta--good",
    "hard-month-stat__delta--bad",
    "hard-month-stat__delta--neutral"
  );

  if (previous <= 0) {
    element.textContent = "0%";
    element.classList.add("hard-month-stat__delta--neutral");
    return;
  }

  const percent = ((current - previous) / previous) * 100;
  const absPercent = Math.abs(percent);
  const sign = percent > 0 ? "â" : percent < 0 ? "â" : "";

  element.textContent = `${sign} ${absPercent.toFixed(1).replace(".", ",")}%`.trim();

  if (percent === 0) {
    element.classList.add("hard-month-stat__delta--neutral");
    return;
  }

  if (mode === "expense") {
    element.classList.add(
      percent > 0
        ? "hard-month-stat__delta--bad"
        : "hard-month-stat__delta--good"
    );
    return;
  }

  element.classList.add(
    percent > 0
      ? "hard-month-stat__delta--good"
      : "hard-month-stat__delta--bad"
  );
}

function syncHardMonthOverview() {
  const now = new Date();
  const previous = getHardPreviousMonthDate();

  const currentTotals = getHardMonthTotals(now);
  const previousTotals = getHardMonthTotals(previous);

  setTextById("hardMonthIncomeValue", formatHardMoney(currentTotals.income));
  setTextById("hardMonthExpenseValue", formatHardMoney(currentTotals.expense));

  setHardDelta(
    "hardMonthIncomeDelta",
    currentTotals.income,
    previousTotals.income,
    "income"
  );

  setHardDelta(
    "hardMonthExpenseDelta",
    currentTotals.expense,
    previousTotals.expense,
    "expense"
  );

  const flexibleBudgetTotal = getHardFlexibleBudgetTotal();

  const remainingFlexible = Math.max(
    0,
    parseHardMoney(getTextById("analyticsRemainingBudgetsValue", "")) ||
    parseHardMoney(getTextById("hardSummaryLimitsValue", "")) ||
    parseHardMoney(getTextById("walletLimitsPressureValue", ""))
  );

  const budgetSpent = currentTotals.flexibleExpense;

  const budgetTotal = flexibleBudgetTotal > 0
    ? flexibleBudgetTotal
    : Math.max(budgetSpent, budgetSpent + remainingFlexible);

  const percent = budgetTotal > 0
    ? Math.min(100, Math.round((budgetSpent / budgetTotal) * 100))
    : 0;

  setTextById("hardMonthBudgetSpentValue", formatHardMoney(budgetSpent));
  setTextById("hardMonthBudgetTotalValue", `Ð¸Ð· ${formatHardMoney(budgetTotal)}`);
  setTextById("hardMonthBudgetPercent", `${percent}%`);

  const fill = document.getElementById("hardMonthBudgetFill");
  if (fill) {
    fill.style.width = `${percent}%`;
  }
}

  function syncHardMode() {
    syncHeroHint();
    syncHardSummary();
    syncHardPressure();
    syncExpectedIncomeCard();
    syncAccountsCount();
    syncHardMonthOverview();
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
  window.setTimeout(syncHardMode, 2600);
  window.setTimeout(syncHardMode, 4200);
  window.setTimeout(syncHardMode, 6500);

  let attempts = 0;

  const intervalId = window.setInterval(() => {
    attempts += 1;
    syncHardMode();

    if (attempts >= 20) {
      window.clearInterval(intervalId);
    }
  }, 750);
}

  function start() {
    bindHardActions();

    [
  "walletTodayCanValue",
  "walletLightFreeValue",
  "balanceFreeMoneyValue",
  "walletCalendarPressureValue",
  "walletLimitsPressureValue",
  "analyticsPendingMandatoryValue",
  "analyticsMandatoryTotalValue",
  "analyticsRemainingBudgetsValue",
  "walletMandatoryControlValue",
  "walletExpectedIncomeLabel",
  "walletExpectedIncomeValue",
  "accountsList",
  "transactionsList",
  "hardSummaryLimitsValue",
  "monthlyReportIncomeFlowValue",
  "monthlyReportExpenseFlowValue",
  "monthlyReportBalanceValue",
  "monthlyReportFreeValue",
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


;/* ===== js/39-wallet-cards-main-account.js ===== */
// js/39-wallet-cards-main-account.js
// Wallet Cards v1
// ÐÐ»Ð°Ð²Ð½Ð°Ñ Ð»Ð¾Ð³Ð¸ÐºÐ°: Ð½Ð° Ð³Ð»Ð°Ð²Ð½ÑÐ¹ ÑÐºÑÐ°Ð½ Ð°Ð²ÑÐ¾Ð¼Ð°ÑÐ¸ÑÐµÑÐºÐ¸ Ð²ÑÐ²Ð¾Ð´ÑÑÑÑ ÐÐ¡Ð ÑÐµÐºÑÑÐ¸Ðµ accounts Ð¸ safe_buckets.
// + ÑÐ¾Ð·Ð´Ð°ÑÑ Ð½Ð¾Ð²ÑÑ ÑÐ¸Ð½Ð°Ð½ÑÐ¾Ð²ÑÑ ÑÑÑÐ½Ð¾ÑÑÑ, Ð¿Ð¾ÑÐ»Ðµ ÑÐµÐ³Ð¾ Ð¾Ð½Ð° ÑÐ¾Ð¶Ðµ Ð°Ð²ÑÐ¾Ð¼Ð°ÑÐ¸ÑÐµÑÐºÐ¸ Ð¿Ð¾ÑÐ²Ð»ÑÐµÑÑÑ ÐºÐ°Ðº ÐºÐ°ÑÑÐ°.
// app_meta.wallet_cards ÑÑÐ°Ð½Ð¸Ñ ÑÐ¾Ð»ÑÐºÐ¾ UI-Ð½Ð°ÑÑÑÐ¾Ð¹ÐºÐ¸: ÑÐ²ÐµÑ, Ð¿Ð¾ÑÑÐ´Ð¾Ðº, ÑÐºÑÑÑÐ¸Ðµ, fallback ÑÑÐ¼Ð¼Ñ.

(() => {
  const ROOT_ID = "walletCardsV1";
  const DECK_ID = "walletCardsDeck";
  const MAIN_CARD_ID = "walletMainAccountCard";
  const DRAFT_CARD_ID = "walletDraftCard";
  const META_KEY = "wallet_cards";

  const TYPES = [
    {
      value: "account",
      label: "Ð¡ÑÑÑ",
      subtitle: "Ð¡ÑÑÑ",
      entityType: "account",
      accountKind: "default",
      defaultColor: "graphite",
    },
    {
      value: "cash",
      label: "ÐÐ°Ð»Ð¸ÑÐ½ÑÐµ",
      subtitle: "ÐÐ°Ð»Ð¸ÑÐ½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸",
      entityType: "account",
      accountKind: "cash",
      defaultColor: "sand",
    },
    {
      value: "saving",
      label: "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
      subtitle: "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ",
      entityType: "safe_bucket",
      bucketKind: "saving",
      defaultColor: "sky",
    },
  ];

  const COLORS = [
    { value: "graphite", label: "ÐÑÐ°ÑÐ¸Ñ" },
    { value: "sand", label: "ÐÐµÑÐ¾Ðº" },
    { value: "sky", label: "ÐÐµÐ±Ð¾" },
    { value: "sage", label: "Ð¨Ð°Ð»ÑÐµÐ¹" },
    { value: "pearl", label: "ÐÐµÐ¼ÑÑÐ³" },
  ];

  let uiMetaCache = null;
  let isSavingDraft = false;
  let activeCustomCardKey = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function byId(id) {
    return document.getElementById(id);
  }

  function textById(id, fallback = "") {
    return byId(id)?.textContent?.trim() || fallback;
  }

  function setText(id, value) {
    const node = byId(id);
    if (node) node.textContent = value;
  }

  function html(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cssEscape(value) {
    if (window.CSS?.escape) {
      return window.CSS.escape(String(value));
    }

    return String(value).replace(/["\\]/g, "\\$&");
  }

  function makeUiId(prefix) {
    if (window.crypto?.randomUUID) {
      return `${prefix}_${window.crypto.randomUUID()}`;
    }

    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function makeDbId() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = Math.random() * 16 | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
    });
  }

  function bridge() {
    return window.FinanceAppSavingsBridge || null;
  }

  function state() {
    return bridge()?.getState?.() || window.FinanceAppState?.state || null;
  }

  function supabase() {
    return bridge()?.getSupabaseClient?.() || window.supabaseClient || null;
  }

  function roundMoney(value) {
    const amount = Number(value) || 0;

    if (typeof bridge()?.roundToTwo === "function") {
      return bridge().roundToTwo(amount);
    }

    return Math.round(amount * 100) / 100;
  }

  function parseMoney(value) {
    const normalized = String(value || "")
      .replace(/\s+/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    return roundMoney(Number(normalized) || 0);
  }

  function formatMoney(value) {
    const amount = roundMoney(value);

    if (typeof bridge()?.formatMoney === "function") {
      return bridge().formatMoney(amount);
    }

    return `${new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: amount % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(amount)} â½`;
  }

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function typeOf(value) {
    return TYPES.find((item) => item.value === value) || TYPES[0];
  }

  function colorOf(value) {
    return COLORS.find((item) => item.value === value) || COLORS[0];
  }

  function entityKey(entityType, entityId) {
    return `${entityType}:${entityId}`;
  }

  function deck() {
    return byId(DECK_ID);
  }

  function clickById(id) {
    const node = byId(id);
    if (!node) return false;

    node.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    return true;
  }

  function openModalFallback(modalId) {
    const modal = byId(modalId);
    if (!modal) return;

    modal.classList.add("modal");

    if (window.FinanceAppModalCore?.openAnimatedModal) {
      window.FinanceAppModalCore.openAnimatedModal(modal);
      return;
    }

    modal.classList.remove("hidden", "is-closing");

    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
    });
  }

  function isModalVisible(modalId) {
    const modal = byId(modalId);

    return Boolean(
      modal &&
      !modal.classList.contains("hidden") &&
      !modal.classList.contains("is-closing")
    );
  }

  function openTarget(triggerId, modalId) {
    clickById(triggerId);

    window.setTimeout(() => {
      if (!isModalVisible(modalId)) {
        openModalFallback(modalId);
      }
    }, 60);
  }

  function mainAction(action) {
    if (action === "mandatory") {
      openTarget("openMandatoryPaymentsModalBtn", "mandatoryPaymentsModal");
      return;
    }

    if (action === "budget") {
      openTarget("openBudgetAnalyticsModalBtn", "budgetAnalyticsModal");
      return;
    }

    if (action === "expected") {
      openTarget("openExpectedIncomeModalBtn", "expectedIncomeModal");
    }
  }

  function emptyMeta() {
    return {
      hidden: [],
      colors: {},
      order: [],
      amounts: {},
    };
  }

  function readMetaFromState(key) {
    const meta = state()?.appMeta || state()?.app_meta || state()?.meta || null;

    if (!meta) return "";

    if (Array.isArray(meta)) {
      const row = meta.find((item) => {
        return item?.id === key || item?.key === key || item?.name === key || item?.meta_key === key;
      });

      return row?.value ?? row?.meta_value ?? row?.json_value ?? row?.data ?? "";
    }

    if (typeof meta === "object") {
      const value = meta[key];

      if (typeof value === "string") return value;

      if (value && typeof value === "object") {
        return value.value ?? value.meta_value ?? value.json_value ?? value.data ?? "";
      }

      return value ?? "";
    }

    return "";
  }

  function parseRawMeta(raw) {
    if (!raw) return emptyMeta();

    if (typeof raw === "object" && !Array.isArray(raw)) {
      return normalizeMeta(raw);
    }

    try {
      return normalizeMeta(JSON.parse(String(raw)));
    } catch {
      return emptyMeta();
    }
  }

  function normalizeMeta(raw) {
    const meta = emptyMeta();

    if (!raw || typeof raw !== "object") {
      return meta;
    }

    if (Array.isArray(raw.hidden)) {
      meta.hidden = raw.hidden.map(String);
    }

    if (raw.colors && typeof raw.colors === "object") {
      Object.entries(raw.colors).forEach(([key, value]) => {
        meta.colors[String(key)] = colorOf(value).value;
      });
    }

    if (Array.isArray(raw.order)) {
      meta.order = raw.order.map(String);
    }

    if (raw.amounts && typeof raw.amounts === "object") {
      Object.entries(raw.amounts).forEach(([key, value]) => {
        meta.amounts[String(key)] = roundMoney(value);
      });
    }

    // ÐÐ¸Ð³ÑÐ°ÑÐ¸Ñ ÑÑÐ°ÑÐ¾Ð³Ð¾ ÑÐ¾ÑÐ¼Ð°ÑÐ° { cards: [...] }, ÐºÐ¾ÑÐ¾ÑÑÐ¹ Ð±ÑÐ» Ð² Ð¿ÑÐµÐ´ÑÐ´ÑÑÐµÐ¹ Ð²ÐµÑÑÐ¸Ð¸.
    if (Array.isArray(raw.cards)) {
      raw.cards.forEach((card) => {
        if (!card?.entityId) return;

        const key = entityKey(
          card.entityType === "safe_bucket" ? "safe_bucket" : "account",
          card.entityId
        );

        if (card.color || card.theme) {
          meta.colors[key] = colorOf(card.color || card.theme).value;
        }

        if (Number(card.initialAmount)) {
          meta.amounts[key] = roundMoney(card.initialAmount);
        }

        if (!meta.order.includes(key)) {
          meta.order.push(key);
        }
      });
    }

    return meta;
  }

  function metaValueFromRow(row) {
    return row?.value ?? row?.meta_value ?? row?.json_value ?? row?.data ?? "";
  }

  function getUiMeta() {
    if (uiMetaCache) return uiMetaCache;

    uiMetaCache = parseRawMeta(readMetaFromState(META_KEY));

    return uiMetaCache;
  }

  async function loadUiMetaFromSupabase() {
    const client = supabase();

    if (!client?.from) {
      uiMetaCache = parseRawMeta(readMetaFromState(META_KEY));
      renderCards();
      return;
    }

    const attempts = [
      () => client.from("app_meta").select("*").eq("id", META_KEY).maybeSingle(),
      () => client.from("app_meta").select("*").eq("key", META_KEY).maybeSingle(),
      () => client.from("app_meta").select("*").eq("name", META_KEY).maybeSingle(),
      () => client.from("app_meta").select("*").eq("meta_key", META_KEY).maybeSingle(),
    ];

    for (const attempt of attempts) {
      const { data, error } = await attempt();

      if (!error) {
        uiMetaCache = parseRawMeta(metaValueFromRow(data));
        renderCards();
        return;
      }
    }

    uiMetaCache = parseRawMeta(readMetaFromState(META_KEY));
    renderCards();
  }

  async function saveUiMeta(meta) {
    const normalized = normalizeMeta(meta);
    const value = JSON.stringify(normalized);

    uiMetaCache = normalized;
    bridge()?.setAppMetaLocalValue?.(META_KEY, value);

    const client = supabase();

    if (!client?.from) return;

    const attempts = [
      () => client.from("app_meta").upsert({ id: META_KEY, key: META_KEY, value }, { onConflict: "id" }),
      () => client.from("app_meta").upsert({ id: META_KEY, key: META_KEY, value }, { onConflict: "key" }),
      () => client.from("app_meta").upsert({ key: META_KEY, value }, { onConflict: "key" }),
    ];

    let lastError = null;

    for (const attempt of attempts) {
      const { error } = await attempt();

      if (!error) return;

      lastError = error;
    }

    throw lastError || new Error("ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ ÑÐ¾ÑÑÐ°Ð½Ð¸ÑÑ Ð½Ð°ÑÑÑÐ¾Ð¹ÐºÐ¸ ÐºÐ°ÑÑÐ¾ÑÐµÐº.");
  }

  async function tryDb(attempts, message) {
    let lastError = null;

    for (const attempt of attempts) {
      const { data, error } = await attempt();

      if (!error) {
        if (Array.isArray(data)) return data[0] || null;
        return data || null;
      }

      lastError = error;
    }

    throw lastError || new Error(message);
  }

  async function createAccount(draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ÐµÑÑ Ð½Ðµ Ð³Ð¾ÑÐ¾Ð². ÐÐ±Ð½Ð¾Ð²Ð¸ ÑÑÑÐ°Ð½Ð¸ÑÑ Ð¸ Ð¿Ð¾Ð¿ÑÐ¾Ð±ÑÐ¹ ÑÐ½Ð¾Ð²Ð°.");
    }

    const id = makeDbId();
    const type = typeOf(draft.type);
    const now = new Date().toISOString();

    return tryDb(
      [
        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            role: type.accountKind,
            account_role: type.accountKind,
            account_kind: type.accountKind,
            kind: type.accountKind,
            primary_spend: false,
            is_primary_spend: false,
            balance: draft.amount,
            initial_balance: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            role: type.accountKind,
            account_kind: type.accountKind,
            balance: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            role: type.accountKind,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            created_at: now,
          })
          .select("*")
          .single(),
      ],
      "ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ ÑÐ¾Ð·Ð´Ð°ÑÑ ÑÑÑÑ."
    );
  }

  async function createBucket(draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ÐµÑÑ Ð½Ðµ Ð³Ð¾ÑÐ¾Ð². ÐÐ±Ð½Ð¾Ð²Ð¸ ÑÑÑÐ°Ð½Ð¸ÑÑ Ð¸ Ð¿Ð¾Ð¿ÑÐ¾Ð±ÑÐ¹ ÑÐ½Ð¾Ð²Ð°.");
    }

    const id = makeDbId();
    const now = new Date().toISOString();

    return tryDb(
      [
        () => client
          .from("safe_buckets")
          .insert({
            id,
            name: draft.title,
            kind: "saving",
            bucket_kind: "saving",
            amount: draft.amount,
            balance: draft.amount,
            current_amount: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("safe_buckets")
          .insert({
            id,
            name: draft.title,
            kind: "saving",
            amount: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("safe_buckets")
          .insert({
            id,
            name: draft.title,
            created_at: now,
          })
          .select("*")
          .single(),
      ],
      "ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ ÑÐ¾Ð·Ð´Ð°ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ."
    );
  }

  async function createEntity(draft) {
    if (draft.type === "saving") {
      const bucket = await createBucket(draft);

      return {
        entityType: "safe_bucket",
        row: bucket,
      };
    }

    const account = await createAccount(draft);

    return {
      entityType: "account",
      row: account,
    };
  }

  function insertEntityIntoLocalState(entityType, row) {
    const appState = state();
    if (!appState || !row?.id) return;

    if (entityType === "safe_bucket") {
      if (!Array.isArray(appState.safeBuckets)) {
        appState.safeBuckets = [];
      }

      if (!appState.safeBuckets.some((item) => String(item.id) === String(row.id))) {
        appState.safeBuckets.push(row);
      }

      return;
    }

    if (!Array.isArray(appState.accounts)) {
      appState.accounts = [];
    }

    if (!appState.accounts.some((item) => String(item.id) === String(row.id))) {
      appState.accounts.push(row);
    }
  }

  function updateEntityInLocalState(entityType, entityId, patch) {
    const appState = state();
    if (!appState || !entityId) return;

    const collectionName = entityType === "safe_bucket" ? "safeBuckets" : "accounts";
    const collection = Array.isArray(appState[collectionName]) ? appState[collectionName] : [];

    const row = collection.find((item) => String(item.id) === String(entityId));
    if (!row) return;

    Object.assign(row, patch);
  }

  async function updateAccountEntity(card, draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ÐµÑÑ Ð½Ðµ Ð³Ð¾ÑÐ¾Ð². ÐÐ±Ð½Ð¾Ð²Ð¸ ÑÑÑÐ°Ð½Ð¸ÑÑ Ð¸ Ð¿Ð¾Ð¿ÑÐ¾Ð±ÑÐ¹ ÑÐ½Ð¾Ð²Ð°.");
    }

    const accountKind = draft.type === "cash" ? "cash" : "default";

    const patchAttempts = [
      {
        name: draft.title,
        role: accountKind,
        account_role: accountKind,
        account_kind: accountKind,
        kind: accountKind,
        balance: draft.amount,
        initial_balance: draft.amount,
      },
      {
        name: draft.title,
        role: accountKind,
        account_kind: accountKind,
        balance: draft.amount,
      },
      {
        name: draft.title,
        role: accountKind,
      },
      {
        name: draft.title,
      },
    ];

    const attempts = patchAttempts.map((patch) => {
      return () => client
        .from("accounts")
        .update(patch)
        .eq("id", card.entityId)
        .select("*")
        .single();
    });

    const row = await tryDb(attempts, "ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ Ð¾Ð±Ð½Ð¾Ð²Ð¸ÑÑ ÑÑÑÑ.");

    updateEntityInLocalState("account", card.entityId, {
      name: draft.title,
      role: accountKind,
      account_role: accountKind,
      account_kind: accountKind,
      kind: accountKind,
      balance: draft.amount,
      initial_balance: draft.amount,
      ...(row || {}),
    });

    return row;
  }

  async function updateBucketEntity(card, draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ÐµÑÑ Ð½Ðµ Ð³Ð¾ÑÐ¾Ð². ÐÐ±Ð½Ð¾Ð²Ð¸ ÑÑÑÐ°Ð½Ð¸ÑÑ Ð¸ Ð¿Ð¾Ð¿ÑÐ¾Ð±ÑÐ¹ ÑÐ½Ð¾Ð²Ð°.");
    }

    const patchAttempts = [
      {
        name: draft.title,
        amount: draft.amount,
        balance: draft.amount,
        current_amount: draft.amount,
        kind: "saving",
        bucket_kind: "saving",
      },
      {
        name: draft.title,
        amount: draft.amount,
        kind: "saving",
      },
      {
        name: draft.title,
      },
    ];

    const attempts = patchAttempts.map((patch) => {
      return () => client
        .from("safe_buckets")
        .update(patch)
        .eq("id", card.entityId)
        .select("*")
        .single();
    });

    const row = await tryDb(attempts, "ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ Ð¾Ð±Ð½Ð¾Ð²Ð¸ÑÑ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ.");

    updateEntityInLocalState("safe_bucket", card.entityId, {
      name: draft.title,
      amount: draft.amount,
      balance: draft.amount,
      current_amount: draft.amount,
      kind: "saving",
      bucket_kind: "saving",
      ...(row || {}),
    });

    return row;
  }

  async function updateEntity(card, draft) {
    if (!card) {
      throw new Error("ÐÐ°ÑÑÐ° Ð´Ð»Ñ ÑÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°Ð½Ð¸Ñ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð°.");
    }

    const oldTypeConfig = typeOf(card.type);
    const newTypeConfig = typeOf(draft.type);

    if (oldTypeConfig.entityType !== newTypeConfig.entityType) {
      throw new Error("ÐÐµÐ»ÑÐ·Ñ Ð¼ÐµÐ½ÑÑÑ ÑÐ¸Ð¿ Ð¼ÐµÐ¶Ð´Ñ ÑÑÑÑÐ¾Ð¼ Ð¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸ÐµÐ¼. Ð¡Ð¾Ð·Ð´Ð°Ð¹ Ð½Ð¾Ð²ÑÑ ÐºÐ°ÑÑÑ Ð½ÑÐ¶Ð½Ð¾Ð³Ð¾ ÑÐ¸Ð¿Ð°.");
    }

    if (card.entityType === "safe_bucket") {
      return updateBucketEntity(card, draft);
    }

    return updateAccountEntity(card, draft);
  }


  function getAccounts() {
    const accounts = state()?.accounts;

    return Array.isArray(accounts) ? accounts : [];
  }

  function getBuckets() {
    const buckets = state()?.safeBuckets;

    return Array.isArray(buckets) ? buckets : [];
  }

  function isProbablyCashAccount(account) {
    const text = normalizeText([
      account?.name,
      account?.role,
      account?.account_role,
      account?.account_kind,
      account?.kind,
    ].filter(Boolean).join(" "));

    return text.includes("cash") || text.includes("Ð½Ð°Ð»Ð¸Ñ") || text.includes("Ð½Ð°Ð»Ð¸Ðº");
  }

  function getAccountCardType(account) {
    return isProbablyCashAccount(account) ? "cash" : "account";
  }

  function getBucketCardType() {
    return "saving";
  }

  function getEntityTitle(card) {
    return card.title || "ÐÐ°ÑÑÐ°";
  }

  function getAccountAmount(account, fallback = 0) {
    const direct = roundMoney(
      account?.balance ??
      account?.amount ??
      account?.initial_balance ??
      0
    );

    if (direct > 0) return direct;

    if (typeof bridge()?.getRawAccountBalance === "function" && account?.id) {
      const calculated = roundMoney(bridge().getRawAccountBalance(account.id));

      if (calculated > 0) return calculated;
    }

    return roundMoney(fallback);
  }

  function getBucketAmount(bucket, fallback = 0) {
    const direct = roundMoney(
      bucket?.amount ??
      bucket?.balance ??
      bucket?.current_amount ??
      0
    );

    if (direct > 0) return direct;

    if (typeof bridge()?.getSafeBucketBalance === "function" && bucket?.id) {
      const calculated = roundMoney(bridge().getSafeBucketBalance(bucket.id));

      if (calculated > 0) return calculated;
    }

    return roundMoney(fallback);
  }

  function buildEntityCards() {
    const meta = getUiMeta();
    const hidden = new Set(meta.hidden);
    const orderIndex = new Map(meta.order.map((key, index) => [key, index]));
    const cards = [];

    getAccounts().forEach((account, index) => {
      if (!account?.id) return;

      const key = entityKey("account", account.id);
      if (hidden.has(key)) return;

      const type = getAccountCardType(account);
      const typeConfig = typeOf(type);

      cards.push({
        id: key,
        entityType: "account",
        entityId: String(account.id),
        entityKey: key,
        type,
        color: colorOf(meta.colors[key] || typeConfig.defaultColor).value,
        title: String(account.name || "Ð¡ÑÑÑ").trim(),
        subtitle: typeConfig.subtitle,
        amount: getAccountAmount(account, meta.amounts[key]),
        order: orderIndex.has(key) ? orderIndex.get(key) : 1000 + index,
      });
    });

    getBuckets().forEach((bucket, index) => {
      if (!bucket?.id) return;

      const key = entityKey("safe_bucket", bucket.id);
      if (hidden.has(key)) return;

      const type = getBucketCardType(bucket);
      const typeConfig = typeOf(type);

      cards.push({
        id: key,
        entityType: "safe_bucket",
        entityId: String(bucket.id),
        entityKey: key,
        type,
        color: colorOf(meta.colors[key] || typeConfig.defaultColor).value,
        title: String(bucket.name || "ÐÐ°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ñ").trim(),
        subtitle: typeConfig.subtitle,
        amount: getBucketAmount(bucket, meta.amounts[key]),
        order: orderIndex.has(key) ? orderIndex.get(key) : 2000 + index,
      });
    });

    return cards.sort((a, b) => a.order - b.order);
  }

  function findEntityCardByKey(cardKey) {
    return buildEntityCards().find((card) => card.entityKey === cardKey) || null;
  }


  function createRoot() {
    if (byId(ROOT_ID)) return;

    const mainView = byId("mainView");
    const oldHero = $(".balance--game");

    if (!mainView || !oldHero) return;

    const section = document.createElement("section");
    section.className = "wallet-cards-v1";
    section.id = ROOT_ID;

    section.innerHTML = `
      <div class="wallet-cards-v1__head">
        <h1 class="wallet-cards-v1__title">Wallet</h1>

        <div class="wallet-cards-v1__actions">
          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsAddBtn" aria-label="ÐÐ¾Ð±Ð°Ð²Ð¸ÑÑ ÐºÐ°ÑÑÑ">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
          </button>

          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsReportBtn" aria-label="ÐÑÐºÑÑÑÑ Ð¸ÑÐ¾Ð³Ð¸">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 19V5"></path>
              <path d="M6 19h13"></path>
              <path d="M10 15v-4"></path>
              <path d="M14 15V8"></path>
              <path d="M18 15v-6"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="wallet-cards-v1__stack wallet-cards-v1__stack--deck" id="${DECK_ID}">
        <article class="wallet-card-v1 wallet-card-v1--main" id="${MAIN_CARD_ID}" role="button" tabindex="0" aria-expanded="false">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>ÐÑÐ½Ð¾Ð²Ð½Ð¾Ð¹ ÑÑÑÑ</strong>
              <span>Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð½ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸</span>
            </div>

            <strong class="wallet-card-v1__amount" id="walletMainAccountValue">0 â½</strong>
          </div>

          <div class="wallet-card-v1__details">
            <div class="wallet-card-v1__details-inner">
              <div class="wallet-card-v1__details-content">
                <div class="wallet-card-v1__panel">
                  <div class="wallet-card-v1__row">
                    <span>ÐÐ¾Ð¶Ð½Ð¾ ÑÑÐ°ÑÐ¸ÑÑ</span>
                    <strong id="walletMainDailyValue">0 â½/Ð´ÐµÐ½Ñ</strong>
                  </div>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="mandatory">
                    <span>Ð ÑÐ¿Ð¸ÑÐ°Ð½Ð¸Ñ</span>
                    <strong id="walletMainMandatoryValue">0 â½</strong>
                  </button>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="budget">
                    <span>ÐÑÐ´Ð¶ÐµÑ Ð¼ÐµÑÑÑÐ°</span>
                    <strong id="walletMainBudgetValue">0 â½ Ð¸Ð· 0 â½</strong>
                  </button>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="expected">
                    <span>ÐÐ¶Ð¸Ð´Ð°ÐµÐ¼ÑÐµ Ð´ÐµÐ½ÑÐ³Ð¸</span>
                    <strong id="walletMainExpectedValue">Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾</strong>
                  </button>

                  <p class="wallet-card-v1__hint" id="walletMainHint">ÐÐ°Ð½Ð½ÑÐµ Ð¾Ð±Ð½Ð¾Ð²ÑÑÑÑ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹.</p>
                </div>

                <div class="wallet-card-v1__quick-actions">
                  <button class="wallet-card-v1__action wallet-card-v1__action--danger" type="button" id="walletMainExpenseBtn">Ð Ð°ÑÑÐ¾Ð´</button>
                  <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletMainIncomeBtn">ÐÐ¾ÑÐ¾Ð´</button>
                  <button class="wallet-card-v1__action" type="button" id="walletMainReportBtn">ÐÑÐ¾Ð³Ð¸</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;

    mainView.insertBefore(section, oldHero);
    document.body.classList.add("wallet-cards-v1-enabled", "wallet-mode-hard");
  }

  function cardHtml(card) {
    const color = colorOf(card.color).value;
    const isActive = activeCustomCardKey === card.entityKey;

    return `
      <article class="wallet-card-v1 wallet-card-v1--custom wallet-card-v1--theme-${html(color)} ${isActive ? "is-open" : ""}" data-wallet-custom-card="true" data-wallet-card-id="${html(card.id)}" data-wallet-entity-key="${html(card.entityKey)}" role="button" tabindex="0" aria-expanded="${isActive ? "true" : "false"}">
        <div class="wallet-card-v1__summary">
          <div class="wallet-card-v1__name">
            <strong>${html(getEntityTitle(card))}</strong>
            <span>${html(card.subtitle)}</span>
          </div>

          <strong class="wallet-card-v1__amount">${html(formatMoney(card.amount))}</strong>
        </div>

        <div class="wallet-card-v1__details">
          <div class="wallet-card-v1__details-inner">
            <div class="wallet-card-v1__details-content">
              <div class="wallet-card-v1__edit-panel">
                <button class="wallet-card-v1__edit-btn" type="button" data-wallet-edit-card="${html(card.entityKey)}" aria-label="Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°ÑÑ ÐºÐ°ÑÑÑ">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 20h4.5L19.2 9.3a2.1 2.1 0 0 0 0-3l-1.5-1.5a2.1 2.1 0 0 0-3 0L4 15.5V20z"></path>
                    <path d="M13.5 6.2l4.3 4.3"></path>
                  </svg>
                </button>

                <button class="wallet-card-v1__delete-btn" type="button" data-wallet-remove-card="${html(card.entityKey)}">
                  Ð£Ð´Ð°Ð»Ð¸ÑÑ Ñ Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }


  function renderCards() {
    const node = deck();
    if (!node) return;

    $$("[data-wallet-custom-card]", node).forEach((card) => card.remove());

    const draft = byId(DRAFT_CARD_ID);

    buildEntityCards().forEach((card, index) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = cardHtml(card).trim();

      const element = wrapper.firstElementChild;
      if (!element) return;

      element.style.zIndex = activeCustomCardKey === card.entityKey ? "1000" : String(10 + index);

      if (draft) {
        node.insertBefore(element, draft);
      } else {
        node.appendChild(element);
      }
    });
  }

  function draftHtml(mode = "create", card = null) {
    const isEdit = mode === "edit" && card;
    const title = isEdit ? card.title : "";
    const amount = isEdit ? card.amount : 0;
    const type = isEdit ? card.type : "account";
    const color = isEdit ? card.color : "pearl";
    const headerTitle = isEdit ? "Ð ÐµÐ´Ð°ÐºÑÐ¸ÑÐ¾Ð²Ð°Ð½Ð¸Ðµ" : "ÐÐ¾Ð²Ð°Ñ ÐºÐ°ÑÑÐ°";
    const headerSubtitle = isEdit ? "ÐÐ·Ð¼ÐµÐ½Ð¸ Ð´Ð°Ð½Ð½ÑÐµ Ð¸ ÑÐ¾ÑÑÐ°Ð½Ð¸" : "Ð¡Ð¾Ð·Ð´Ð°Ð¹ Ð½Ð¾Ð²ÑÐ¹ ÑÑÑÑ Ð¸Ð»Ð¸ Ð½Ð°ÐºÐ¾Ð¿Ð»ÐµÐ½Ð¸Ðµ";
    const saveText = isEdit ? "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ" : "Ð¡Ð¾ÑÑÐ°Ð½Ð¸ÑÑ";

    return `
      <article class="wallet-card-v1 wallet-card-v1--draft wallet-card-v1--theme-${html(color)} is-open" id="${DRAFT_CARD_ID}" data-wallet-draft-mode="${html(mode)}" data-wallet-edit-key="${html(card?.entityKey || "")}" aria-expanded="true">
        <div class="wallet-card-v1__summary wallet-draft-card__summary">
          <div class="wallet-card-v1__name">
            <strong>${html(headerTitle)}</strong>
            <span>${html(headerSubtitle)}</span>
          </div>

          <strong class="wallet-card-v1__amount">${html(formatMoney(amount))}</strong>
        </div>

        <div class="wallet-card-v1__details">
          <div class="wallet-card-v1__details-inner">
            <div class="wallet-card-v1__details-content">
              <div class="wallet-card-v1__panel wallet-draft-card__panel">
                <label class="wallet-draft-field">
                  <span>ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ</span>
                  <input class="wallet-draft-input" id="walletDraftTitleInput" type="text" value="${html(title)}" placeholder="ÐÐ°Ð¿ÑÐ¸Ð¼ÐµÑ: ÐÐ°Ð»Ð¸ÑÐºÐ°" autocomplete="off">
                </label>

                <label class="wallet-draft-field">
                  <span>Ð¡ÑÐ¼Ð¼Ð°</span>
                  <input class="wallet-draft-input" id="walletDraftAmountInput" type="text" inputmode="decimal" value="${html(amount ? String(amount).replace(".", ",") : "")}" placeholder="0 â½">
                </label>

                <div class="wallet-draft-field">
                  <span>Ð¢Ð¸Ð¿</span>

                  <div class="wallet-draft-segment" role="radiogroup" aria-label="Ð¢Ð¸Ð¿ ÐºÐ°ÑÑÑ">
                    ${TYPES.map((item) => `
                      <button class="wallet-draft-chip ${item.value === type ? "is-active" : ""}" type="button" data-wallet-draft-type="${item.value}">
                        ${item.label}
                      </button>
                    `).join("")}
                  </div>
                </div>

                <div class="wallet-draft-field">
                  <span>Ð¦Ð²ÐµÑ</span>

                  <div class="wallet-draft-palette" role="radiogroup" aria-label="Ð¦Ð²ÐµÑ ÐºÐ°ÑÑÑ">
                    ${COLORS.map((item) => `
                      <button class="wallet-draft-color wallet-draft-color--${item.value} ${item.value === color ? "is-active" : ""}" type="button" data-wallet-draft-color="${item.value}" aria-label="${item.label}"></button>
                    `).join("")}
                  </div>
                </div>

                <p class="wallet-draft-status" id="walletDraftStatus"></p>
              </div>

              <div class="wallet-card-v1__quick-actions">
                <button class="wallet-card-v1__action" type="button" id="walletDraftCancelBtn">ÐÑÐ¼ÐµÐ½Ð°</button>
                <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletDraftSaveBtn">${html(saveText)}</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }


  function setDraftStatus(text, status = "neutral") {
    const node = byId("walletDraftStatus");
    if (!node) return;

    node.textContent = text || "";
    node.dataset.status = status;
  }

  function setDraftColor(color) {
    const draft = byId(DRAFT_CARD_ID);
    if (!draft) return;

    COLORS.forEach((item) => {
      draft.classList.remove(`wallet-card-v1--theme-${item.value}`);
    });

    draft.classList.add(`wallet-card-v1--theme-${colorOf(color).value}`);
  }

  function draftValue() {
    return {
      title: byId("walletDraftTitleInput")?.value?.trim() || "",
      amount: parseMoney(byId("walletDraftAmountInput")?.value || ""),
      type: typeOf($("[data-wallet-draft-type].is-active")?.dataset.walletDraftType).value,
      color: colorOf($("[data-wallet-draft-color].is-active")?.dataset.walletDraftColor).value,
    };
  }

  function startDraft() {
    const node = deck();
    if (!node) return;

    activeCustomCardKey = null;
    byId(DRAFT_CARD_ID)?.remove();

    node.insertAdjacentHTML("beforeend", draftHtml("create"));

    requestAnimationFrame(() => {
      byId("walletDraftTitleInput")?.focus();
    });
  }

  function findRenderedCardNode(cardKey) {
    const node = deck();
    if (!node) return null;

    return $$("[data-wallet-custom-card]", node).find((cardNode) => {
      return cardNode.dataset.walletEntityKey === cardKey;
    }) || null;
  }

  function startEdit(cardKey) {
    const node = deck();
    if (!node || !cardKey) return;

    const card = findEntityCardByKey(cardKey);
    if (!card) return;

    activeCustomCardKey = cardKey;
    byId(DRAFT_CARD_ID)?.remove();

    $$("[data-wallet-custom-card]", node).forEach((cardNode) => {
      const isActive = cardNode.dataset.walletEntityKey === cardKey;

      cardNode.classList.toggle("is-open", isActive);
      cardNode.setAttribute("aria-expanded", String(isActive));

      if (isActive) {
        cardNode.style.zIndex = "1000";
      }
    });

    const cardNode = findRenderedCardNode(cardKey);
    const htmlString = draftHtml("edit", card);

    if (cardNode) {
      cardNode.insertAdjacentHTML("afterend", htmlString);
    } else {
      node.insertAdjacentHTML("beforeend", htmlString);
    }

    requestAnimationFrame(() => {
      const input = byId("walletDraftTitleInput");
      input?.focus();
      input?.scrollIntoView?.({ block: "center", behavior: "smooth" });
    });
  }


  function cancelDraft() {
    byId(DRAFT_CARD_ID)?.remove();
  }

  async function saveDraft() {
    if (isSavingDraft) return;

    const draft = draftValue();

    if (!draft.title) {
      setDraftStatus("ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¾Ð±ÑÐ·Ð°ÑÐµÐ»ÑÐ½Ð¾.", "error");
      byId("walletDraftTitleInput")?.focus();
      return;
    }

    const draftNode = byId(DRAFT_CARD_ID);
    const mode = draftNode?.dataset.walletDraftMode || "create";
    const editKey = draftNode?.dataset.walletEditKey || "";
    const button = byId("walletDraftSaveBtn");

    isSavingDraft = true;
    if (button) button.disabled = true;
    setDraftStatus("Ð¡Ð¾ÑÑÐ°Ð½ÑÑâ¦");

    try {
      if (mode === "edit") {
        const card = findEntityCardByKey(editKey);

        await updateEntity(card, draft);

        const meta = getUiMeta();
        meta.colors[editKey] = draft.color;
        meta.amounts[editKey] = draft.amount;

        if (!meta.order.includes(editKey)) {
          meta.order.push(editKey);
        }

        meta.hidden = meta.hidden.filter((hiddenKey) => hiddenKey !== editKey);

        await saveUiMeta(meta);
      } else {
        const created = await createEntity(draft);
        const row = created.row;
        const key = entityKey(created.entityType, row.id);
        const meta = getUiMeta();

        meta.colors[key] = draft.color;
        meta.amounts[key] = draft.amount;

        if (!meta.order.includes(key)) {
          meta.order.push(key);
        }

        meta.hidden = meta.hidden.filter((hiddenKey) => hiddenKey !== key);

        await saveUiMeta(meta);

        insertEntityIntoLocalState(created.entityType, row);
      }

      cancelDraft();
      activeCustomCardKey = null;
      renderCards();
      syncMain();

      window.setTimeout(() => {
        bridge()?.loadDataFromSupabase?.();
        loadUiMetaFromSupabase();
      }, 500);
    } catch (error) {
      console.error("[Wallet Cards] saveDraft failed:", error);
      setDraftStatus(error?.message || "ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ ÑÐ¾ÑÑÐ°Ð½Ð¸ÑÑ ÐºÐ°ÑÑÑ.", "error");
    } finally {
      isSavingDraft = false;
      if (button) button.disabled = false;
    }
  }


  async function removeCard(entityKeyToHide) {
    if (!entityKeyToHide) return;

    const meta = getUiMeta();

    if (activeCustomCardKey === entityKeyToHide) {
      activeCustomCardKey = null;
    }

    if (!meta.hidden.includes(entityKeyToHide)) {
      meta.hidden.push(entityKeyToHide);
    }

    byId(DRAFT_CARD_ID)?.remove();

    const cardNode = findRenderedCardNode(entityKeyToHide);
    if (cardNode) {
      cardNode.remove();
    } else {
      renderCards();
    }

    try {
      await saveUiMeta(meta);
    } catch (error) {
      console.error("[Wallet Cards] removeCard failed:", error);
    }
  }

  function toggleCard(card) {
    if (!card) return;

    if (card.matches("[data-wallet-custom-card]")) {
      const key = card.dataset.walletEntityKey || card.dataset.walletCardId || "";

      activeCustomCardKey = activeCustomCardKey === key ? null : key;
      byId(DRAFT_CARD_ID)?.remove();
      renderCards();
      return;
    }

    const isOpen = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(isOpen));
  }

  function closestTarget(event, selector) {
    const target = event.target;

    if (target?.closest) {
      return target.closest(selector);
    }

    if (target?.parentElement?.closest) {
      return target.parentElement.closest(selector);
    }

    return null;
  }

  function safeStop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }
  }

  function handleRootClick(event) {
    const add = closestTarget(event, "#walletCardsAddBtn");
    if (add) {
      safeStop(event);
      startDraft();
      return;
    }

    const typeButton = closestTarget(event, "[data-wallet-draft-type]");
    if (typeButton) {
      safeStop(event);

      $$("[data-wallet-draft-type]", byId(ROOT_ID)).forEach((button) => {
        button.classList.remove("is-active");
      });

      typeButton.classList.add("is-active");
      return;
    }

    const colorButton = closestTarget(event, "[data-wallet-draft-color]");
    if (colorButton) {
      safeStop(event);

      $$("[data-wallet-draft-color]", byId(ROOT_ID)).forEach((button) => {
        button.classList.remove("is-active");
      });

      colorButton.classList.add("is-active");
      setDraftColor(colorButton.dataset.walletDraftColor);
      return;
    }

    if (closestTarget(event, "#walletDraftCancelBtn")) {
      safeStop(event);
      cancelDraft();
      return;
    }

    if (closestTarget(event, "#walletDraftSaveBtn")) {
      safeStop(event);
      saveDraft();
      return;
    }

    const edit = closestTarget(event, "[data-wallet-edit-card]");
    if (edit) {
      safeStop(event);

      const key =
        edit.dataset.walletEditCard ||
        edit.closest("[data-wallet-entity-key]")?.dataset.walletEntityKey ||
        "";

      startEdit(key);
      return;
    }

    const remove = closestTarget(event, "[data-wallet-remove-card]");
    if (remove) {
      safeStop(event);

      const key =
        remove.dataset.walletRemoveCard ||
        remove.closest("[data-wallet-entity-key]")?.dataset.walletEntityKey ||
        "";

      removeCard(key).catch((error) => {
        console.error("[Wallet Cards] removeCard failed:", error);
      });

      return;
    }

    if (closestTarget(event, "#walletCardsReportBtn, #walletMainReportBtn")) {
      safeStop(event);
      clickById("openMonthlyReportBtn");
      return;
    }

    if (closestTarget(event, "#walletMainExpenseBtn")) {
      safeStop(event);
      clickById("openExpenseModal");
      return;
    }

    if (closestTarget(event, "#walletMainIncomeBtn")) {
      safeStop(event);
      clickById("openIncomeModal");
      return;
    }

    const action = closestTarget(event, "[data-wallet-card-action]");
    if (action) {
      safeStop(event);
      mainAction(action.dataset.walletCardAction || "");
      return;
    }

    if (closestTarget(event, "button, input, textarea, select, label")) {
      return;
    }

    const customCard = closestTarget(event, "[data-wallet-custom-card]");
    if (customCard) {
      toggleCard(customCard);
      return;
    }

    const mainCard = closestTarget(event, `#${MAIN_CARD_ID}`);
    if (mainCard) {
      toggleCard(mainCard);
    }
  }

  function bindEvents() {
    const root = byId(ROOT_ID);

    if (!root || root.dataset.walletEventsBound === "true") return;

    root.dataset.walletEventsBound = "true";

    root.addEventListener("click", (event) => {
      try {
        handleRootClick(event);
      } catch (error) {
        console.error("[Wallet Cards] click handler failed:", error);
      }
    });

    root.addEventListener("keydown", (event) => {
      try {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (closestTarget(event, "button, input, textarea, select")) return;

        const card = closestTarget(event, `#${MAIN_CARD_ID}, [data-wallet-custom-card]`);
        if (!card) return;

        event.preventDefault();
        toggleCard(card);
      } catch (error) {
        console.error("[Wallet Cards] keydown handler failed:", error);
      }
    });
  }

  function syncMain() {
    if (!byId(ROOT_ID)) return;

    setText("walletMainAccountValue", textById("balanceFreeMoneyValue") || textById("walletLightFreeValue") || "0 â½");
    setText("walletMainDailyValue", `${textById("walletTodayCanValue", "0 â½")}/Ð´ÐµÐ½Ñ`);
    setText("walletMainMandatoryValue", textById("analyticsPendingMandatoryValue") || textById("walletCalendarPressureValue") || "0 â½");
    setText("walletMainBudgetValue", `${textById("hardMonthBudgetSpentValue", "0 â½")} ${textById("hardMonthBudgetTotalValue", "Ð¸Ð· 0 â½")}`);

    const expectedIncomeText = textById("walletExpectedIncomeValue", "");
    setText(
      "walletMainExpectedValue",
      expectedIncomeText.toLowerCase().includes("Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ðµ Ð¿Ð¾ÐºÐ° Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾")
        ? "Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾"
        : expectedIncomeText || "Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾"
    );

    setText("walletMainHint", textById("walletGameHint", "ÐÐ°Ð½Ð½ÑÐµ Ð¾Ð±Ð½Ð¾Ð²ÑÑÑÑ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð³ÑÑÐ·ÐºÐ¸ Ð¾Ð¿ÐµÑÐ°ÑÐ¸Ð¹."));

    renderCards();
  }

  function observe(id) {
    const node = byId(id);
    if (!node) return;

    new MutationObserver(syncMain).observe(node, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function start() {
    createRoot();
    bindEvents();

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
    ].forEach(observe);

    syncMain();
    loadUiMetaFromSupabase();

    window.setTimeout(syncMain, 100);
    window.setTimeout(syncMain, 350);
    window.setTimeout(syncMain, 900);
    window.setTimeout(syncMain, 1600);
    window.setTimeout(syncMain, 3000);

    window.setTimeout(loadUiMetaFromSupabase, 700);
    window.setTimeout(loadUiMetaFromSupabase, 1800);

    window.addEventListener("focus", () => {
      syncMain();
      loadUiMetaFromSupabase();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      syncMain();
      loadUiMetaFromSupabase();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
