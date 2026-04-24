document.addEventListener("DOMContentLoaded", async () => {
  /* =========================================================
     01. DOM REFERENCES
     ========================================================= */
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
  
  
  const mainView = document.getElementById("mainView");
  const categoriesManagerView = document.getElementById("categoriesManagerView");
  const analyticsView = document.getElementById("analyticsView");

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
const openMandatoryPaymentEditorBtn = document.getElementById("openMandatoryPaymentEditorBtn");

const mandatoryPaymentEditorModal = document.getElementById("mandatoryPaymentEditorModal");
const mandatoryPaymentEditorTitle = document.getElementById("mandatoryPaymentEditorTitle");
const closeMandatoryPaymentEditorModalBtn = document.getElementById("closeMandatoryPaymentEditorModalBtn");

const mandatoryPaymentTitleInput = document.getElementById("mandatoryPaymentTitleInput");
const mandatoryPaymentAmountInput = document.getElementById("mandatoryPaymentAmountInput");
const mandatoryPaymentDueDayInput = document.getElementById("mandatoryPaymentDueDayInput");
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

const FAQ_CONTENT = {
  free_money: {
    title: "Свободные деньги",
    text: "Деньги, которыми можно пользоваться без риска задеть обязательные платежи, накопления и защищённые суммы.",
    formula: "Свободно = доступные деньги − защищённые суммы",
  },

  protected_money: {
    title: "Защищённые деньги",
    text: "Деньги, которые лучше не тратить случайно: резервы, накопления, обязательные платежи и другие отложенные суммы.",
    formula: "Защищённые = резервы + накопления + обязательства",
  },

  remaining_limits: {
    title: "Остаток лимитов",
    text: "Сколько ещё можно потратить по категориям с лимитами в текущем месяце.",
    formula: "Остаток лимитов = лимиты − уже потрачено",
  },

  can_save_now: {
    title: "Можно отложить",
    text: "Сумма, которую можно безопасно отправить в накопления прямо сейчас, не ломая текущий месяц.",
    formula: "Можно отложить = свободно − рабочий запас",
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

const navOperationsBtn = document.getElementById("navOperationsBtn");
const operationsView = document.getElementById("operationsView");

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

bindMoneyInput(amountInput);
bindMoneyInput(budgetAmountInput);
bindMoneyInput(mandatoryPaymentAmountInput);
bindMoneyInput(safeBucketAmountInput);

  /* =========================================================
     02. UI STATE
     ========================================================= */
  let currentMode = "expense";
  let editingTransactionId = null;

  let analyticsFilterPeriod = "month";
  let analyticsSelectedMonth = getCurrentMonthValue();
  let analyticsRangeStart = "";
  let analyticsRangeEnd = "";
  let analyticsOperationType = "all";
  
  let analyticsTab = "overview";
  
  let analyticsDraftMonth = "";
let analyticsDraftYear = "";
let isAnalyticsMonthWheelOpen = false;

let analyticsMonthScrollTimer = null;
let analyticsYearScrollTimer = null;

let activeBudgetCategoryId = null;
let activeAnalyticsCategoryId = null;
let activeSafeBucketAmountId = null;
let activeAccountId = null;
let activeMandatoryPaymentId = null;
let mandatoryLongPressTimer = null;
let mandatoryLongPressVisualTimer = null;
let mandatoryPressStartX = 0;
let mandatoryPressStartY = 0;
let mandatoryPressMoved = false;
let mandatoryLongPressTriggered = false;
let justCreatedTransactionId = null;
const MODAL_ANIMATION_MS = 420;
const modalCloseTimers = new WeakMap();

  const UNCATEGORIZED_ID = "uncategorized";

  /* =========================================================
     03. APP STATE
     ========================================================= */
  const state = {
  transactions: [],
  accounts: [],
  categories: [],
  budgetLimits: [],
  safeBuckets: [],
  appMeta: [],
  mandatoryPayments: [],
};

  /* =========================================================
     04. HELPERS: CATEGORIES / ACCOUNTS / BUCKETS
     ========================================================= */
  function getCategoryById(categoryId) {
    return state.categories.find((item) => item.id === categoryId);
  }

  function getCategoryName(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.name : "Без категории";
  }

  function getCategoryIcon(categoryId) {
  return "";
}
  
  function isRequiredCategory(categoryId) {
  const category = getCategoryById(categoryId);
  return Boolean(category?.is_required);
}

function getCategoryTypeLabel(categoryId) {
  return isRequiredCategory(categoryId) ? "Обязательная" : "Гибкая";
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

function getSafeBucketsByKind(kinds) {
  const list = Array.isArray(kinds) ? kinds : [kinds];
  return state.safeBuckets.filter((bucket) => list.includes(bucket.bucket_kind));
}

function getFreeSafeBucket() {
  return state.safeBuckets.find((bucket) => bucket.include_in_free_money === true) || null;
}

function getProtectedSafeBuckets() {
  return state.safeBuckets.filter((bucket) => bucket.is_protected === true);
}

function getSpendableAccounts() {
  return state.accounts.filter((account) => account.account_kind !== "vault_pool");
}

function getSafeBucketName(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  return bucket ? bucket.name : "";
}

function getSafeBucketIcon(bucketId) {
  return "";
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
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch (error) {
    console.error("Ошибка safe_bucket_interest_rates", error);
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

function getSafeBucketBalance(bucketId) {
  let balance = 0;
  const freeBucketId = getFreeSafeBucket()?.id || null;
  const safeAccountId = getSafeAccountId();
  const safeAccountName = getSafeAccountName();

  state.transactions.forEach((transaction) => {
    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "transfer") {
      const goesToSafe =
        (transaction.to_account_id && transaction.to_account_id === safeAccountId) ||
        (!transaction.to_account_id && transaction.to_account === safeAccountName);

      const goesFromSafe =
        (transaction.from_account_id && transaction.from_account_id === safeAccountId) ||
        (!transaction.from_account_id && transaction.from_account === safeAccountName);

      if (goesToSafe && transaction.to_safe_bucket_id === bucketId) {
        balance += amount;
      }

      if (goesFromSafe && transaction.from_safe_bucket_id === bucketId) {
        balance -= amount;
      }
    }

    if (transaction.type === "income") {
      const incomeToSafe =
        (transaction.account_id && transaction.account_id === safeAccountId) ||
        (!transaction.account_id && transaction.account === safeAccountName);

      if (incomeToSafe && transaction.to_safe_bucket_id === bucketId) {
        balance += amount;
      }
    }

    if (transaction.type === "expense") {
      const expenseFromSafe =
        (transaction.account_id && transaction.account_id === safeAccountId) ||
        (!transaction.account_id && transaction.account === safeAccountName);

      const expenseBucketId = transaction.from_safe_bucket_id || freeBucketId;

      if (expenseFromSafe && expenseBucketId === bucketId) {
        balance -= amount;
      }
    }
  });

  return roundToTwo(balance);
}

function getAllSafeBucketsBalance() {
  return state.safeBuckets.reduce((sum, bucket) => {
    return sum + getSafeBucketBalance(bucket.id);
  }, 0);
}

function getUnassignedSafeBalance() {
  const totalSafeBalance = getAccountBalance(getSafeAccountId());
  const distributedBalance = getAllSafeBucketsBalance();
  return totalSafeBalance - distributedBalance;
}

function normalizeMoneyBucketName(value) {
  return String(value || "").trim().toLowerCase();
}

function getSafeBucketsByNames(names) {
  const normalizedNames = names.map(normalizeMoneyBucketName);

  return state.safeBuckets.filter((bucket) =>
    normalizedNames.includes(normalizeMoneyBucketName(bucket.name))
  );
}

function getFreeSafeBalance() {
  const freeBucket = getFreeSafeBucket();
  return freeBucket ? getSafeBucketBalance(freeBucket.id) : 0;
}

function getStrictSafeBalance() {
  return getSafeBucketsByKind(["tax", "housing"]).reduce((sum, bucket) => {
    return sum + getSafeBucketBalance(bucket.id);
  }, 0);
}

function getSoftReserveSafeBalance() {
  return getSafeBucketsByKind(["reserve"]).reduce((sum, bucket) => {
    return sum + getSafeBucketBalance(bucket.id);
  }, 0);
}

function getCashReserveBalance() {
  return getProtectedAccounts()
    .filter((account) => account.account_kind === "reserve")
    .reduce((sum, account) => sum + getAccountBalance(account.id), 0);
}

function getSecondLineReserveBalance() {
  return getSoftReserveSafeBalance() + getCashReserveBalance();
}

function getAvailableNowBalance() {
  return roundToTwo(getFreeSafeBalance());
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

function getProtectedMoneyTotal() {
  return roundToTwo(getStrictSafeBalance() + getSecondLineReserveBalance());
}

function getFreeMoneyTotal() {
  const accountsPart = getFreeMoneyAccounts().reduce((sum, account) => {
    return sum + getAccountBalance(account.id);
  }, 0);

  const bucketsPart = state.safeBuckets
    .filter((bucket) => bucket.include_in_free_money === true)
    .reduce((sum, bucket) => {
      return sum + getSafeBucketBalance(bucket.id);
    }, 0);

  return roundToTwo(Math.max(0, accountsPart + bucketsPart));
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

function getInsightsCanSaveNow(availableNowBalance, workingMinimum, exceededCount, nearLimitCount) {
  let canSave = Math.max(0, roundToTwo(availableNowBalance - workingMinimum));

  if (exceededCount > 0) {
    return 0;
  }

  if (nearLimitCount > 0) {
    canSave = roundToTwo(canSave * 0.5);
  }

  return Math.max(0, canSave);
}

async function setSafeBucketTargetAmount(bucketId, nextAmount) {
  const target = roundToTwo(Number(nextAmount) || 0);

  if (target < 0) {
    alert("Сумма накопления не может быть меньше нуля");
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
    title: "Корректировка накопления",
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
    alert("Ошибка корректировки суммы накопления");
    console.error(error);
    return false;
  }

  return true;
}

function fillSafeBucketSelect(selectEl, placeholder, selectedId = "") {
  if (!selectEl) return;

  selectEl.innerHTML = `<option value="">${placeholder}</option>`;

  state.safeBuckets.forEach((bucket) => {
    const option = document.createElement("option");
    option.value = bucket.id;
    option.textContent = bucket.name;

    if (selectedId && selectedId === bucket.id) {
      option.selected = true;
    }

    selectEl.appendChild(option);
  });
}

function updateTransferSafeFields() {
  const fromIsSafes = isVaultAccountId(fromAccountSelect?.value);
const toIsSafes = isVaultAccountId(toAccountSelect?.value);

  fromSafeBucketField?.classList.toggle("hidden", !fromIsSafes);
  toSafeBucketField?.classList.toggle("hidden", !toIsSafes);

  if (!fromIsSafes && fromSafeBucketSelect) {
    fromSafeBucketSelect.value = "";
  }

  if (!toIsSafes && toSafeBucketSelect) {
    toSafeBucketSelect.value = "";
  }

  if (fromIsSafes) {
    fillSafeBucketSelect(fromSafeBucketSelect, "Из какого накопления", fromSafeBucketSelect?.value || "");
  }

  if (toIsSafes) {
    fillSafeBucketSelect(toSafeBucketSelect, "В какое накопление", toSafeBucketSelect?.value || "");
  }
}

  /* =========================================================
     05. HELPERS: BUDGETS / META / MANDATORY PAYMENTS
     ========================================================= */
  function getBudgetLimitByCategoryId(categoryId) {
    return state.budgetLimits.find((item) => item.category_id === categoryId);
  }

  function getBudgetLimitLabel(categoryId) {
    const record = getBudgetLimitByCategoryId(categoryId);
    const amount = record ? Number(record.monthly_limit) || 0 : 0;
    return amount > 0 ? formatMoney(amount) : "—";
  }

  function getAnalyticsSpentLimitLabel(spent, categoryId) {
    return `${formatMoney(spent)} / ${getBudgetLimitLabel(categoryId)}`;
  }

  function isBudgetExceeded(spent, categoryId) {
    const record = getBudgetLimitByCategoryId(categoryId);
    const limit = record ? Number(record.monthly_limit) || 0 : 0;
    return limit > 0 && spent > limit;
  }

  function getAppMetaValue(key) {
    const item = state.appMeta.find((entry) => entry.key === key);
    return item ? item.value : "";
  }
  
  function parseMandatoryPaymentsFromMeta() {
  const raw = getAppMetaValue("mandatory_payments");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => ({
      id: item.id || crypto.randomUUID(),
      title: String(item.title || "").trim(),
      amount: roundToTwo(Number(item.amount) || 0),
      due_day: Math.min(31, Math.max(1, Number(item.due_day) || 1)),
      linked_account_id: item.linked_account_id || "",
linked_safe_bucket_id: item.linked_safe_bucket_id || "",
      enabled: item.enabled !== false,
      last_paid_period: item.last_paid_period || "",
    }));
  } catch (error) {
    console.error("Ошибка mandatory_payments", error);
    return [];
  }
}

async function saveMandatoryPaymentsToMeta() {
  const { error } = await supabaseClient
    .from("app_meta")
    .upsert({
      key: "mandatory_payments",
      value: JSON.stringify(state.mandatoryPayments),
    });

  if (error) {
    alert("Ошибка сохранения обязательных платежей");
    console.error(error);
    return false;
  }

  return true;
}

function getCurrentMonthKey() {
  return getCurrentMonthValue();
}

function getMandatoryPaymentsStats(monthKey = getCurrentMonthKey()) {
  const unpaidItems = state.mandatoryPayments.filter((item) => {
    if (item.enabled === false) return false;
    return item.last_paid_period !== monthKey;
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

function fillMandatoryPaymentAccountSelect(selectedId = "") {
  if (!mandatoryPaymentAccountSelect) return;

  mandatoryPaymentAccountSelect.innerHTML = `<option value="">Без привязки</option>`;

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

function syncMandatoryPaymentLinkedSafeField() {
  const accountId = mandatoryPaymentAccountSelect?.value || "";
  const isVault = isVaultAccountId(accountId);

  mandatoryPaymentLinkedSafeField?.classList.toggle("hidden", !isVault);

  if (!isVault) {
    if (mandatoryPaymentLinkedSafeSelect) mandatoryPaymentLinkedSafeSelect.value = "";
    if (openMandatoryPaymentBucketPickerBtn) {
      openMandatoryPaymentBucketPickerBtn.textContent = "Выбрать накопление";
    }
    return;
  }

  if (openMandatoryPaymentBucketPickerBtn) {
    const currentBucketName =
      getSafeBucketName(mandatoryPaymentLinkedSafeSelect?.value || "") || "Выбрать накопление";
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
        <h3 class="list-title">Накоплений пока нет</h3>
        <p class="list-subtitle">Сначала создай накопление</p>
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
        <p class="list-subtitle">Накопление</p>
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

function fillMandatoryPaymentSafeSelect(selectedId = "") {
  if (!mandatoryPaymentLinkedSafeSelect) return;

  mandatoryPaymentLinkedSafeSelect.innerHTML = `<option value="">Без привязки к накоплению</option>`;

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

function isProtectedSafeBucket(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  return Boolean(bucket?.is_protected);
}

function getMandatoryPaymentsCoverageStats(monthKey = getCurrentMonthKey()) {
  const unpaidItems = state.mandatoryPayments.filter((item) => {
    if (item.enabled === false) return false;
    return item.last_paid_period !== monthKey;
  });

  let total = 0;
  let coveredByLinkedSafes = 0;
  let coveredByProtectedSafes = 0;
  let uncoveredAfterLinkedSafes = 0;
  let chargeToFreeMoney = 0;

  unpaidItems.forEach((item) => {
    const amount = roundToTwo(Number(item.amount) || 0);
    total += amount;

    const linkedSafeId = item.linked_safe_bucket_id || "";
    const linkedSafeBalance = linkedSafeId
      ? Math.max(0, roundToTwo(getSafeBucketBalance(linkedSafeId)))
      : 0;

    const coveredByThisSafe = Math.min(amount, linkedSafeBalance);
    coveredByLinkedSafes += coveredByThisSafe;

    const coveredByProtected = linkedSafeId && isProtectedSafeBucket(linkedSafeId)
      ? coveredByThisSafe
      : 0;

    coveredByProtectedSafes += coveredByProtected;

    const uncoveredAfterLinked = Math.max(0, roundToTwo(amount - coveredByThisSafe));
    uncoveredAfterLinkedSafes += uncoveredAfterLinked;

    const toChargeFromFreeMoney = Math.max(
      0,
      roundToTwo(amount - coveredByProtected)
    );

    chargeToFreeMoney += toChargeFromFreeMoney;
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

function resetMandatoryPaymentForm() {
  activeMandatoryPaymentId = null;

  mandatoryPaymentTitleInput.value = "";
  mandatoryPaymentAmountInput.value = "";
  mandatoryPaymentDueDayInput.value = "";
  mandatoryPaymentAccountSelect.value = "";
  mandatoryPaymentLinkedSafeSelect.value = "";

  fillMandatoryPaymentAccountSelect("");
  fillMandatoryPaymentSafeSelect("");

  if (mandatoryPaymentEditorTitle) {
    mandatoryPaymentEditorTitle.textContent = "Новый платёж";
  }

  if (addMandatoryPaymentBtn) {
    addMandatoryPaymentBtn.textContent = "Добавить платёж";
  }

  if (openMandatoryPaymentBucketPickerBtn) {
    openMandatoryPaymentBucketPickerBtn.textContent = "Выбрать накопление";
  }

  syncMandatoryPaymentLinkedSafeField();
  deleteMandatoryPaymentBtn?.classList.add("hidden");
}

function closeMandatoryPaymentEditorModal() {
  closeAnimatedModal(mandatoryPaymentBucketPickerModal, { keepBodyLocked: true });
closeAnimatedModal(
  mandatoryPaymentEditorModal,
  { keepBodyLocked: Boolean(mandatoryPaymentsModal && !mandatoryPaymentsModal.classList.contains("hidden")) }
);

if (mandatoryPaymentsModal && !mandatoryPaymentsModal.classList.contains("hidden")) {
  document.body.style.overflow = "hidden";
}

resetMandatoryPaymentForm();
}

function openMandatoryPaymentEditor(paymentId) {
  const item = state.mandatoryPayments.find((entry) => entry.id === paymentId);
  if (!item) return;

  activeMandatoryPaymentId = paymentId;

  mandatoryPaymentTitleInput.value = item.title || "";
  mandatoryPaymentAmountInput.value = String(Number(item.amount) || 0).replace(".", ",");
  mandatoryPaymentDueDayInput.value = buildDateFromDueDay(item.due_day);

  fillMandatoryPaymentAccountSelect(item.linked_account_id || "");
  fillMandatoryPaymentSafeSelect(item.linked_safe_bucket_id || "");

  if (mandatoryPaymentAccountSelect) {
    mandatoryPaymentAccountSelect.value = item.linked_account_id || "";
  }

  if (mandatoryPaymentLinkedSafeSelect) {
    mandatoryPaymentLinkedSafeSelect.value = item.linked_safe_bucket_id || "";
  }

  syncMandatoryPaymentLinkedSafeField();

  if (openMandatoryPaymentBucketPickerBtn) {
    openMandatoryPaymentBucketPickerBtn.textContent =
      getSafeBucketName(item.linked_safe_bucket_id || "") || "Выбрать накопление";
  }

  if (mandatoryPaymentEditorTitle) {
    mandatoryPaymentEditorTitle.textContent = "Редактирование платежа";
  }

  if (addMandatoryPaymentBtn) {
    addMandatoryPaymentBtn.textContent = "Сохранить платёж";
  }

  deleteMandatoryPaymentBtn?.classList.remove("hidden");

  openMandatoryPaymentEditorModal();
  mandatoryPaymentTitleInput.focus();
}

function buildDateFromDueDay(dueDay) {
  const currentMonth = getCurrentMonthValue();
  const [year, month] = currentMonth.split("-");
  const safeDay = String(Math.min(31, Math.max(1, Number(dueDay) || 1))).padStart(2, "0");
  return `${year}-${month}-${safeDay}`;
}

async function toggleMandatoryPaymentPaid(paymentId) {
  const item = state.mandatoryPayments.find((entry) => entry.id === paymentId);
  if (!item) return false;

  const currentMonthKey = getCurrentMonthKey();
  const isPaid = item.last_paid_period === currentMonthKey;

  if (!isPaid) {
    const transactionOk = await createMandatoryPaymentExpense(item);
    if (!transactionOk) return false;
    item.last_paid_period = currentMonthKey;
  } else {
    item.last_paid_period = "";
  }

  const ok = await saveMandatoryPaymentsToMeta();
  if (!ok) return false;

  await loadDataFromSupabase();
  renderMandatoryPaymentsModal();
  renderAll();
  return true;
}

async function createMandatoryPaymentExpense(item) {
  const accountId = item.linked_account_id || "";
  if (!accountId) return true;

  const account = getAccountById(accountId);
  if (!account) return true;

  if (isVaultAccountId(account.id) && !item.linked_safe_bucket_id) {
    alert("Для списания из накоплений нужно выбрать конкретное накопление");
    return false;
  }

  const transaction = {
    id: crypto.randomUUID(),
    type: "expense",
    title: item.title || "Обязательный платёж",
    amount: roundToTwo(Number(item.amount) || 0),
    account_id: account.id,
    account: account.name,
    category_id: UNCATEGORIZED_ID,
    from_account_id: null,
    to_account_id: null,
    from_account: null,
    to_account: null,
    from_safe_bucket_id: isVaultAccountId(account.id) ? (item.linked_safe_bucket_id || null) : null,
    to_safe_bucket_id: null,
    created_at: new Date().toISOString(),
    time_label: getCurrentTime(),
  };

  const { error } = await supabaseClient
    .from("transactions")
    .insert(transaction);

  if (error) {
    alert("Ошибка списания обязательного платежа");
    console.error(error);
    return false;
  }

  return true;
}

function startMandatoryPaymentLongPress(card, item, startX = 0, startY = 0) {
  if (!card || !item) return;

  const currentMonthKey = getCurrentMonthKey();
  const isPaid = item.last_paid_period === currentMonthKey;

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
      isPaid ? "mandatory-payment-card--hold-unpay" : "mandatory-payment-card--hold-pay"
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

  const stopNativeSelection = () => {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.removeAllRanges) {
        selection.removeAllRanges();
      }
    }
  };

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

function openMandatoryPaymentEditorModal() {
  openAnimatedModal(mandatoryPaymentEditorModal);
document.body.style.overflow = "hidden";
}

function closeMandatoryPaymentsModal() {
  closeAnimatedModal(mandatoryPaymentBucketPickerModal, { keepBodyLocked: true });
closeAnimatedModal(mandatoryPaymentEditorModal, { keepBodyLocked: true });
closeAnimatedModal(mandatoryPaymentsModal);
resetMandatoryPaymentForm();
}

function openMandatoryPaymentsModal() {
  renderMandatoryPaymentsModal();
  openAnimatedModal(mandatoryPaymentsModal);
document.body.style.overflow = "hidden";
}

function renderMandatoryPaymentsModal() {
  if (!mandatoryPaymentsList) return;

  mandatoryPaymentsList.innerHTML = "";

  if (!state.mandatoryPayments.length) {
    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">Платежей пока нет</h3>
        <p class="list-subtitle">Добавь обязательные платежи ниже</p>
      </div>
    `;
    mandatoryPaymentsList.appendChild(empty);
    return;
  }

  const currentMonthKey = getCurrentMonthKey();

  state.mandatoryPayments
    .slice()
    .sort((a, b) => a.due_day - b.due_day)
    .forEach((item) => {
      const isPaid = item.last_paid_period === currentMonthKey;

      const linkedSafeName = item.linked_safe_bucket_id
        ? getSafeBucketName(item.linked_safe_bucket_id)
        : "";

      const linkedSafeBalance = item.linked_safe_bucket_id
        ? Math.max(0, roundToTwo(getSafeBucketBalance(item.linked_safe_bucket_id)))
        : 0;

      const covered = Math.min(Number(item.amount) || 0, linkedSafeBalance);

      const coverageText = item.linked_safe_bucket_id
        ? `накопление: ${linkedSafeName} • покрыто ${formatMoney(covered)}`
        : "без привязки к накоплению";

      const card = document.createElement("button");
      card.type = "button";
      card.className = `list-card list-card--clickable mandatory-payment-card${isPaid ? " mandatory-payment-card--paid" : ""}`;
      card.dataset.mandatoryId = item.id;
      card.dataset.paid = String(isPaid);

      card.innerHTML = `
        <div class="mandatory-payment-card__progress"></div>

        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(item.title)}</h3>
          </div>
          <p class="list-subtitle">
            ${formatMoney(item.amount)} • до ${String(item.due_day).padStart(2, "0")} числа • ${coverageText}
          </p>
        </div>

        <div class="list-right mandatory-payment-card__status-wrap">
          <p class="mandatory-payment-card__status ${isPaid ? "is-paid" : "is-unpaid"}">
            ${isPaid ? "Оплачен" : "Не оплачен"}
          </p>
        </div>
      `;

      bindMandatoryPaymentPress(card, item);
      mandatoryPaymentsList.appendChild(card);
    });
}

async function saveMandatoryPayment() {
  const title = mandatoryPaymentTitleInput.value.trim();
  const amount = parseMoneyInputValue(mandatoryPaymentAmountInput.value);
  const dueDateValue = mandatoryPaymentDueDayInput.value;
  const linkedAccountId = mandatoryPaymentAccountSelect?.value || "";
  const linkedSafeBucketId = mandatoryPaymentLinkedSafeSelect?.value || "";

  if (!title) {
    alert("Введи название платежа");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Введи корректную сумму");
    return;
  }

  if (!dueDateValue) {
    alert("Выбери дату платежа");
    return;
  }

  if (isVaultAccountId(linkedAccountId) && !linkedSafeBucketId) {
    alert("Выбери накопление");
    return;
  }

  const dueDay = new Date(`${dueDateValue}T00:00:00`).getDate();

  if (activeMandatoryPaymentId) {
    const target = state.mandatoryPayments.find((entry) => entry.id === activeMandatoryPaymentId);
    if (!target) return;

    target.title = title;
    target.amount = roundToTwo(amount);
    target.due_day = dueDay;
    target.linked_account_id = linkedAccountId;
    target.linked_safe_bucket_id = linkedSafeBucketId;
  } else {
    state.mandatoryPayments.push({
      id: crypto.randomUUID(),
      title,
      amount: roundToTwo(amount),
      due_day: dueDay,
      linked_account_id: linkedAccountId,
      linked_safe_bucket_id: linkedSafeBucketId,
      enabled: true,
      last_paid_period: "",
    });
  }

  const ok = await saveMandatoryPaymentsToMeta();
  if (!ok) return;

  renderMandatoryPaymentsModal();
  renderAll();
  closeMandatoryPaymentEditorModal();
}

async function deleteMandatoryPaymentFromEditor() {
  if (!activeMandatoryPaymentId) return;

  const target = state.mandatoryPayments.find((entry) => entry.id === activeMandatoryPaymentId);
  if (!target) return;

  const ok = confirm(`Удалить обязательный платёж "${target.title}"?`);
  if (!ok) return;

  state.mandatoryPayments = state.mandatoryPayments.filter(
    (entry) => entry.id !== activeMandatoryPaymentId
  );

  const saved = await saveMandatoryPaymentsToMeta();
  if (!saved) return;

  renderMandatoryPaymentsModal();
renderAll();
closeMandatoryPaymentEditorModal();
}

  /* =========================================================
     06. HELPERS: DATE / FORMAT / FILTERS
     ========================================================= */
  function getDateOnlyString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getSafeBalance() {
  return getAccountBalance(getSafeAccountId());
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

  function formatDateRangeLabel(fromValue, toValue) {
    if (!fromValue || !toValue) return "";
    return `${formatDateShort(fromValue)} — ${formatDateShort(toValue)}`;
  }

  function getStartOfTodayTime() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

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

  function filterTransactionsByPeriod(items, period, selectedMonth, rangeStart, rangeEnd) {
    const todayKey = getTodayDateValue();
    const currentMonth = selectedMonth || getCurrentMonthValue();
    const startOfToday = getStartOfTodayTime();

    return items.filter((item) => {
      if (!item.created_at) return false;

      const dateKey = String(item.created_at).slice(0, 10);
      const time = new Date(item.created_at).getTime();

      if (period === "month") {
        return dateKey.slice(0, 7) === currentMonth;
      }

      if (period === "today") {
        return dateKey === todayKey;
      }

      if (period === "7") {
        return time >= startOfToday - 6 * 24 * 60 * 60 * 1000;
      }

      if (period === "range") {
        if (!rangeStart || !rangeEnd) return true;
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
    for (let year = currentYear - 3; year <= currentYear + 4; year++) {
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

  container.addEventListener(
    "scroll",
    () => {
      const timerName = attrName === "data-wheel-month"
        ? "analyticsMonthScrollTimer"
        : "analyticsYearScrollTimer";

      clearTimeout(window[timerName]);

      const centeredValue = getCenteredWheelValue(container, attrName);
      if (centeredValue) {
        onChange(centeredValue);
        setWheelActiveState(container, attrName, centeredValue);
      }

      window[timerName] = setTimeout(() => {
        const finalValue = getCenteredWheelValue(container, attrName);
        if (!finalValue) return;

        onChange(finalValue);
        setWheelActiveState(container, attrName, finalValue);
        snapWheelToValue(container, attrName, finalValue, "smooth");
      }, 90);
    },
    { passive: true }
  );
}

function updateAnalyticsWheelDraftFromScroll() {
  const nextMonth = getCenteredWheelValue(analyticsMonthNamesColumn, "data-wheel-month");
  const nextYear = getCenteredWheelValue(analyticsMonthYearsColumn, "data-wheel-year");

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
      setWheelActiveState(analyticsMonthNamesColumn, "data-wheel-month", analyticsDraftMonth);
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
      setWheelActiveState(analyticsMonthYearsColumn, "data-wheel-year", analyticsDraftYear);
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
    setWheelActiveState(analyticsMonthNamesColumn, "data-wheel-month", analyticsDraftMonth);
    setWheelActiveState(analyticsMonthYearsColumn, "data-wheel-year", analyticsDraftYear);

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
  setAnalyticsDraftMonthFromValue(analyticsSelectedMonth);
  isAnalyticsMonthWheelOpen = true;
  analyticsMonthWheelWrap?.classList.remove("hidden");

  if (!analyticsMonthNamesColumn?.children.length || !analyticsMonthYearsColumn?.children.length) {
    renderAnalyticsMonthWheel();
  } else {
    setWheelActiveState(analyticsMonthNamesColumn, "data-wheel-month", analyticsDraftMonth);
    setWheelActiveState(analyticsMonthYearsColumn, "data-wheel-year", analyticsDraftYear);

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
}

  function closeAnalyticsMonthWheel() {
    isAnalyticsMonthWheelOpen = false;
    analyticsMonthWheelWrap?.classList.add("hidden");
  }

  function applyAnalyticsMonthWheel() {
  if (!analyticsDraftYear || !analyticsDraftMonth) {
    setAnalyticsDraftMonthFromValue(analyticsSelectedMonth || getCurrentMonthValue());
  }

  analyticsSelectedMonth = getAnalyticsDraftMonthValue();
  analyticsFilterPeriod = "month";
  closeAnalyticsMonthWheel();
  renderAnalytics();
}

  function resetAnalyticsMonthWheel() {
    setAnalyticsDraftMonthFromValue(getCurrentMonthValue());
    renderAnalyticsMonthWheel();
  }


function openAnalyticsFiltersModal() {
  openAnimatedModal(analyticsFiltersModal);
document.body.style.overflow = "hidden";
}

function closeAnalyticsFiltersModal() {
  closeAnimatedModal(analyticsFiltersModal);
closeAnalyticsMonthWheel();
}

  function getAnalyticsPeriodLabel() {
    if (analyticsFilterPeriod === "month") {
      return formatMonthLabel(analyticsSelectedMonth);
    }

    if (analyticsFilterPeriod === "today") {
      return "сегодня";
    }

    if (analyticsFilterPeriod === "7") {
      return "за 7 дней";
    }

    if (analyticsFilterPeriod === "range") {
      return formatDateRangeLabel(analyticsRangeStart, analyticsRangeEnd);
    }

    return "";
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  
  const FAQ_META = {
  required_expense: {
    title: "Обязательные расходы",
    text:
      "Это все расходы за выбранный период по категориям, которые помечены как обязательные.",
  },

  flexible_expense: {
    title: "Гибкие расходы",
    text:
      "Это все расходы за выбранный период по категориям, которые не помечены как обязательные.",
  },

saved_to_safes: {
  title: "Отложено в накопления",
  text:
    "Это сколько денег ты перевёл в накопления из обычных счетов за выбранный период. Внутренние перекладывания между самими накоплениями сюда не входят.",
},

  remaining_limits: {
    title: "Остаток лимитов",
    text:
      "Это сколько ещё можно потратить по гибким категориям в текущем месяце, если хочешь остаться в рамках своих лимитов.",
  },

  total_balance: {
    title: "Общий баланс",
    text:
      "Это сумма денег по всем счетам приложения на текущий момент.",
  },

  protected_money: {
    title: "Неприкосаймые",
    text:
      "Это деньги, которые приложение считает не для обычных трат.",
  },

  free_money: {
  title: "Свободные деньги",
  text:
  "Это деньги из счетов и накоплений, которые помечены как доступные для обычных трат.",
},

  can_save_now: {
    title: "Можно отложить сейчас",
    text:
      "Это сумма, которую можно убрать в накопления без конфликта с непокрытыми обязательными платежами и остатком лимитов.",
  },

  summary_recommendation: {
    title: "Вывод",
    text:
      "Это итоговый результат на основе свободных денег, непокрытых обязательных платежей и остатка лимитов.",
  },
};

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

function buildFaqFormulaText(faqKey) {
  const summary = getAnalyticsOverviewSummary();

  if (faqKey === "total_balance") {
    return `Общий баланс = ${formatMoney(summary.totalBalance)}`;
  }

  if (faqKey === "free_money") {
    return `Свободные деньги = ${formatMoney(summary.freeMoney)}`;
  }

  if (faqKey === "protected_money") {
    return `Защищённые деньги = ${formatMoney(summary.protectedMoney)}`;
  }

  if (faqKey === "remaining_limits") {
    return `Остаток лимитов = ${formatMoney(summary.remainingBudgets)}`;
  }

  if (faqKey === "can_save_now") {
    return `Можно отложить = Свободные деньги (${formatMoney(summary.freeMoney)}) − К вычету из свободных (${formatMoney(summary.pendingMandatoryToDeduct)}) − Остаток лимитов (${formatMoney(summary.remainingBudgets)})`;
  }

  if (faqKey === "saved_to_safes") {
    return "Считаются только переводы в накопления из обычных счетов за выбранный период.";
  }

  if (faqKey === "required_expense") {
    return "Сумма расходов по категориям, помеченным как обязательные.";
  }

  if (faqKey === "flexible_expense") {
    return "Сумма расходов по категориям, не помеченным как обязательные.";
  }

  return "Формула недоступна для этого показателя.";
}

function openAnimatedModal(modalEl) {
  if (!modalEl) return;

  const existingTimer = modalCloseTimers.get(modalEl);
  if (existingTimer) {
    clearTimeout(existingTimer);
    modalCloseTimers.delete(modalEl);
  }

  modalEl.classList.remove("hidden", "is-closing");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modalEl.classList.add("is-visible");
    });
  });
}

function closeAnimatedModal(modalEl, options = {}) {
  if (!modalEl) return;

  const { keepBodyLocked = false } = options;

  if (modalEl.classList.contains("hidden")) {
    if (!keepBodyLocked) document.body.style.overflow = "";
    return;
  }

  modalEl.classList.remove("is-visible");
  modalEl.classList.add("is-closing");

  const timer = window.setTimeout(() => {
    modalEl.classList.add("hidden");
    modalEl.classList.remove("is-closing");
    modalCloseTimers.delete(modalEl);

    if (!keepBodyLocked) {
      document.body.style.overflow = "";
    }
  }, MODAL_ANIMATION_MS);

  modalCloseTimers.set(modalEl, timer);
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
      .filter((item) => item.type === "income" && item.title === "Проценты по накоплению")
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

function getAnalyticsExpensesPeriodNote() {
  if (analyticsFilterPeriod === "month") return "за месяц";
  if (analyticsFilterPeriod === "today") return "за сегодня";
  if (analyticsFilterPeriod === "7") return "за 7 дней";
  if (analyticsFilterPeriod === "range") return "за выбранный период";
  return "за период";
}

function getCategoryAccent(categoryId) {
  const palette = [
    ["#ff4d94", "#ff8ac4"],
    ["#6f9cff", "#9abaff"],
    ["#00e5cc", "#00b8a9"],
    ["#ff8c42", "#ffb36b"],
    ["#b27cff", "#d0a8ff"],
    ["#ffd84d", "#ffe68f"],
    ["#5de27a", "#99f0ad"],
    ["#ff6c7e", "#ff9aa5"],
    ["#4dd2ff", "#8ce8ff"],
    ["#8f73d8", "#baa3f4"],
  ];

  const ids = state.categories.map((c) => c.id);
  const index = Math.max(0, ids.indexOf(categoryId));
  return palette[index % palette.length];
}

function renderAnalyticsOverview() {
  const summary = getAnalyticsOverviewSummary();

  analyticsTotalBalanceValue.textContent = formatMoney(summary.totalBalance);
  analyticsFreeMoneyValue.textContent = formatMoney(summary.freeMoney);
  analyticsProtectedMoneyValue.textContent = formatMoney(summary.protectedMoney);
  analyticsPendingMandatoryValue.textContent = formatMoney(summary.pendingMandatoryToDeduct);
  analyticsMandatoryTotalValue.textContent = formatMoney(summary.pendingMandatoryTotal);
  analyticsMandatoryCoveredValue.textContent = formatMoney(summary.pendingMandatoryCoveredByLinkedSafes);
  analyticsRemainingBudgetsValue.textContent = formatMoney(summary.remainingBudgets);

  analyticsCanSaveNowValue.classList.remove("is-positive", "is-negative");
  analyticsCanSaveNowValue.classList.add(summary.canSaveNow > 0 ? "is-positive" : "is-negative");
  analyticsCanSaveNowValue.textContent = formatMoney(summary.canSaveNow > 0 ? summary.canSaveNow : 0);

  if (summary.canSaveNow > 0) {
    analyticsCanSaveNowStatus.textContent = "Можно";
    analyticsCanSaveNowHint.textContent = `После обязательных платежей и лимитов остаётся ${formatMoney(summary.canSaveNow)}.`;
  } else {
    analyticsCanSaveNowStatus.textContent = "Сейчас рано";
    const deficit = Math.abs(roundToTwo(summary.freeMoney - summary.pendingMandatoryTotal - summary.remainingBudgets));
    analyticsCanSaveNowHint.textContent = `Не хватает ${formatMoney(deficit)} после учёта обязательных и лимитов.`;
  }
}

function renderAnalyticsExpensesByCategory() {
  const expenseTransactions = getAnalyticsFilteredTransactions().filter((item) => item.type === "expense");
  const totalExpense = roundToTwo(expenseTransactions.reduce((sum, item) => sum + item.amount, 0));

  analyticsExpenseValue.textContent = formatMoney(totalExpense);
  analyticsExpensesPeriodNote.textContent = getAnalyticsExpensesPeriodNote();
  analyticsExpensesCategoriesList.innerHTML = "";

  const byCategory = new Map();

  expenseTransactions.forEach((item) => {
    const key = item.category_id || "uncategorized";
    if (!byCategory.has(key)) byCategory.set(key, 0);
    byCategory.set(key, roundToTwo(byCategory.get(key) + item.amount));
  });

  const rows = [...byCategory.entries()]
    .map(([categoryId, amount]) => {
      const category = getCategoryById(categoryId);
      return {
        categoryId,
        name: category?.name || "Без категории",
        amount,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  if (!rows.length) {
    if (analyticsExpensesRingPremium){
      analyticsExpensesRingPremium.style.background =
        "conic-gradient(from -90deg, rgba(255,255,255,0.08) 0deg 360deg)";
    }

    if (analyticsExpensesRingPremiumCenterValue) analyticsExpensesRingCenterValue.textContent = "0%";
    if (analyticsExpensesRingCenterLabel) analyticsExpensesRingCenterLabel.textContent = "Категория";

    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">Расходов нет</h3>
        <p class="list-subtitle">За выбранный период пока нет расходов по категориям</p>
      </div>
    `;
    analyticsExpensesCategoriesList.appendChild(empty);
    return;
  }

  const leader = rows[0];
  const leaderPercent = totalExpense > 0 ? Math.round((leader.amount / totalExpense) * 100) : 0;

  if (analyticsExpensesRingCenterValue) {
    analyticsExpensesRingCenterValue.textContent = `${leaderPercent}%`;
  }

  if (analyticsExpensesRingCenterLabel) {
    analyticsExpensesRingCenterLabel.textContent = leader.name;
  }

  const segments = [];
  let currentDeg = 0;

  rows.forEach((row) => {
    const [startColor] = getCategoryAccent(row.categoryId);
    const percent = totalExpense > 0 ? row.amount / totalExpense : 0;
    const deg = percent * 360;

    segments.push(`${startColor} ${currentDeg}deg ${currentDeg + deg}deg`);
    currentDeg += deg;
  });

  if (currentDeg < 360) {
    segments.push(`rgba(255,255,255,0.08) ${currentDeg}deg 360deg`);
  }

  if (analyticsExpensesRing) {
    analyticsExpensesRing.style.background = `conic-gradient(from -90deg, ${segments.join(", ")})`;
  }

  rows.forEach((row) => {
    const [startColor] = getCategoryAccent(row.categoryId);
    const percent = totalExpense > 0 ? Math.round((row.amount / totalExpense) * 100) : 0;

    const node = document.createElement("button");
    node.type = "button";
    node.className = "analytics-expense-category-row";
    node.innerHTML = `
      <div class="analytics-expense-category-row__left">
        <span class="analytics-expense-category-dot" style="color:${startColor}; background:${startColor};"></span>

        <div class="analytics-expense-category-meta">
          <div class="analytics-expense-category-meta__name">${escapeHtml(row.name)}</div>
          <div class="analytics-expense-category-meta__sub">${percent}% от расходов</div>
        </div>
      </div>

      <div class="analytics-expense-category-value">
        <div class="analytics-expense-category-value__amount" style="color:${startColor};">
          ${formatMoney(row.amount)}
        </div>
      </div>
    `;

    node.addEventListener("click", () => {
      openAnalyticsCategoryModal(row.categoryId);
    });

    analyticsExpensesCategoriesList.appendChild(node);
  });
}

function renderAnalyticsSafes() {
  const summary = getAnalyticsOverviewSummary();
  analyticsInterestValue.textContent = formatMoney(summary.safeInterest);

  analyticsSafeList.innerHTML = "";

  state.safeBuckets.forEach((bucket) => {
    const row = document.createElement("div");
    row.className = "list-card";
    row.innerHTML = `
      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(bucket.name)}</h3>
        </div>
        <p class="list-subtitle">${bucket.is_locked ? "Системное накопление" : "Накопление"}</p>
      </div>
      <div class="list-right">
        <p class="list-value">${formatMoney(getSafeBucketBalance(bucket.id))}</p>
      </div>
    `;
    analyticsSafeList.appendChild(row);
  });
}

function renderOperationsView() {
  if (!operationsTransactionsList) return;

  const items = [...state.transactions]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  operationsTransactionsList.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">Операций пока нет</h3>
        <p class="list-subtitle">История появится после добавления операций</p>
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

function setAnalyticsTab(nextTab) {
  analyticsTab = nextTab;
  renderAnalytics();
}

  function getIconToneClass(type, extra = "") {
    if (type === "income") return "list-icon--green";
    if (type === "transfer") return "list-icon--blue";

    if (type === "expense") {
      if (extra === "transport") return "list-icon--blue";
      if (extra === "fun") return "list-icon--purple";
      if (extra === "snack") return "list-icon--amber";
      if (extra === "food") return "list-icon--green";
      if (extra === "uncategorized") return "list-icon--neutral";
      return "list-icon--red";
    }

    return "list-icon--neutral";
  }

  function ensureUncategorizedCategory() {
    const exists = state.categories.some((item) => item.id === UNCATEGORIZED_ID);

    if (!exists) {
      state.categories.unshift({
  id: UNCATEGORIZED_ID,
  name: "Без категории",
  icon: "📦",
  locked: true,
  is_required: false,
  sort_order: 1,
});
    }
  }

  function fillExpenseCategorySelect(selectedId = "") {
  categorySelect.innerHTML = `<option value="">Выбери категорию</option>`;

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

  function setActiveNav(next) {
  navWalletBtn.classList.toggle("is-active", next === "wallet");
  navAnalyticsBtn.classList.toggle("is-active", next === "analytics");
  navOperationsBtn.classList.toggle("is-active", next === "operations");
}

  function showWalletView() {
  document.querySelector(".app")?.classList.remove("app--analytics");
  mainView.classList.remove("hidden");
  categoriesManagerView.classList.add("hidden");
  analyticsView.classList.add("hidden");
  operationsView.classList.add("hidden");
  closeAnalyticsMonthWheel();
  setActiveNav("wallet");
}

  function openCategoriesManager() {
  document.querySelector(".app")?.classList.remove("app--analytics");
  mainView.classList.add("hidden");
  categoriesManagerView.classList.remove("hidden");
  analyticsView.classList.add("hidden");
  operationsView.classList.add("hidden");
  closeAnalyticsMonthWheel();
  setActiveNav("wallet");
}

  function closeCategoriesManager() {
    showWalletView();
  }

  function showAnalyticsView() {
  document.querySelector(".app")?.classList.add("app--analytics");
  mainView.classList.add("hidden");
  categoriesManagerView.classList.add("hidden");
  operationsView.classList.add("hidden");
  analyticsView.classList.remove("hidden");
  setActiveNav("analytics");
  renderAnalytics();
}

  /* =========================================================
     07. MODALS: BUDGET / ACCOUNTS / НАКОПЛЕНИЯ
     ========================================================= */
function openBudgetModal(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return;

  activeBudgetCategoryId = categoryId;

  const existing = getBudgetLimitByCategoryId(categoryId);

  budgetModalTitle.textContent = category.name || "Категория";
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
        "Накопительный счёт нельзя делать основным. Он используется как контейнер для накоплений.";
    } else if (role === "reserve") {
      accountPrimaryNote.textContent =
        "Резервный счёт нельзя делать основным для ежедневных списаний.";
    } else {
      accountPrimaryNote.textContent =
        "Этот счёт будет подставляться по умолчанию в расходах и доходах.";
    }
  }
}

function openCreateAccountModal() {
  if (!accountModal) return;

  activeAccountId = null;

  accountModalTitle.textContent = "Новый счёт";
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

  accountModalTitle.textContent = `Счёт: ${account.name}`;
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
    alert("Введи название счёта");
    return;
  }

  const duplicateName = state.accounts.find((account) => {
    if (activeAccountId && account.id === activeAccountId) return false;
    return String(account.name || "").trim().toLowerCase() === nextName.toLowerCase();
  });

  if (duplicateName) {
    alert("Счёт с таким названием уже существует");
    return;
  }

  const flags = getAccountRoleFlags(nextRole);
  const isPrimary = canAccountBePrimary(nextRole) && accountPrimarySpendInput.checked;

  const currentVaultAccount = getVaultAccount();
  if (nextRole === "vault_pool") {
    const anotherVaultExists =
      currentVaultAccount && currentVaultAccount.id !== activeAccountId;

    if (anotherVaultExists) {
      alert("Накопительный счёт уже существует. В приложении должен быть только один такой счёт.");
      return;
    }
  }

  if (isPrimary) {
    const { error: resetPrimaryError } = await supabaseClient
      .from("accounts")
      .update({ is_primary_spend: false })
      .neq("id", activeAccountId || "");

    if (resetPrimaryError) {
      alert("Ошибка сброса основного счёта");
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
      alert("Ошибка сохранения счёта");
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
      alert("Ошибка создания счёта");
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
    alert("Накопительный счёт удалять нельзя");
    return;
  }

  const hasTransactions = state.transactions.some((transaction) => {
    const byId =
      transaction.account_id === account.id ||
      transaction.from_account_id === account.id ||
      transaction.to_account_id === account.id;

    const byLegacyName =
      (!transaction.account_id && transaction.account === account.name) ||
      (!transaction.from_account_id && transaction.from_account === account.name) ||
      (!transaction.to_account_id && transaction.to_account === account.name);

    return byId || byLegacyName;
  });

  if (hasTransactions) {
    alert("Нельзя удалить счёт, который уже используется в операциях");
    return;
  }

  const ok = confirm(`Удалить счёт "${account.name}"?`);
  if (!ok) return;

  const { error } = await supabaseClient
    .from("accounts")
    .delete()
    .eq("id", activeAccountId);

  if (error) {
    alert("Ошибка удаления счёта");
    console.error(error);
    return;
  }

  await loadDataFromSupabase();
  renderAll();
  closeAccountModal();
}
  
function openSafeBucketsModal() {
  if (!safeBucketsModal) return;

  try {
    if (safeBucketsModalTitle) {
      safeBucketsModalTitle.textContent = getSafeAccountName() || "Накопления";
    }

    renderSafeBucketsModal();
    openAnimatedModal(safeBucketsModal);
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("safeBucketsModal open error:", error);
    alert("Ошибка открытия накоплений. Смотри console.");
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

  const balance = getSafeBucketBalance(bucketId);
  const annualRate = getSafeBucketInterestAnnualRate(bucketId);

  safeBucketAmountModalTitle.textContent = bucket.name;
  safeBucketAmountCurrentValue.textContent = `Сейчас: ${formatMoney(balance)}`;
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

  const totalSafeBalance = getAccountBalance(getSafeAccountId());
  const unassignedBalance = getUnassignedSafeBalance();

  if (safeBucketsModalTotalLabel) {
    safeBucketsModalTotalLabel.textContent = `Общий баланс: ${formatMoney(totalSafeBalance)}`;
  }

  if (safeBucketsUnassignedValue) {
    safeBucketsUnassignedValue.textContent =
      Math.abs(unassignedBalance) < 0.009 ? formatMoney(0) : formatMoney(unassignedBalance);
  }

  if (safeBucketsUnassignedCard) {
    safeBucketsUnassignedCard.classList.toggle(
      "safe-buckets-wallet-row--danger",
      Math.abs(unassignedBalance) > 0.009
    );
  }

  safeBucketsList.innerHTML = "";

  if (!state.safeBuckets.length) {
    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">Накоплений пока нет</h3>
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
    alert("Введите название накопления");
    return;
  }

  const duplicate = state.safeBuckets.find(
    (bucket) => String(bucket.name || "").trim().toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    alert("Такое накопление уже есть");
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
    alert(`Ошибка добавления накопления: ${error.message || "unknown error"}`);
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
    alert("Введи название накопления");
    return;
  }

  if (Number.isNaN(nextInterestPercent) || nextInterestPercent < 0) {
    alert("Введи корректный годовой процент");
    return;
  }

  if (Number.isNaN(nextAmount) || nextAmount < 0) {
    alert("Введи корректную сумму");
    return;
  }

  const duplicate = state.safeBuckets.find((bucket) => {
    if (bucket.id === activeSafeBucketAmountId) return false;
    return String(bucket.name || "").trim().toLowerCase() === nextName.toLowerCase();
  });

  if (duplicate) {
    alert("Накопление с таким названием уже существует");
    return;
  }

  const { error: updateBucketError } = await supabaseClient
    .from("safe_buckets")
    .update({
      name: nextName,
    })
    .eq("id", activeSafeBucketAmountId);

  if (updateBucketError) {
    alert("Ошибка сохранения накопления");
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
    alert("Ошибка сохранения процента накопления");
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
    alert("Нельзя удалить накопление, пока в нём есть деньги");
    return;
  }

  const ok = confirm(`Удалить накопление "${bucket.name}"?`);
  if (!ok) return;

  const { error } = await supabaseClient
    .from("safe_buckets")
    .delete()
    .eq("id", bucket.id);

  if (error) {
    alert("Ошибка удаления накопления");
    console.error(error);
    return;
  }

  await loadDataFromSupabase();
  renderAll();
  renderSafeBucketsModal();
  closeSafeBucketAmountModal();
}

  function openAnalyticsCategoryModal(categoryId) {
    activeAnalyticsCategoryId = categoryId;

    const isTransferCategory = categoryId === "transfers";
    const title = isTransferCategory
  ? "Переводы"
  : getCategoryName(categoryId);

    const periodLabel = getAnalyticsPeriodLabel() || "Период";
    const transactions = getAnalyticsTransactionsByCategory(categoryId);

    analyticsCategoryModalTitle.textContent = title;
    analyticsCategoryModalPeriodLabel.textContent = periodLabel;
    analyticsCategoryTransactionsList.innerHTML = "";

    if (analyticsCategoryBudgetBtn) {
      if (isTransferCategory) {
        analyticsCategoryBudgetBtn.textContent = "—";
        analyticsCategoryBudgetBtn.onclick = null;
        analyticsCategoryBudgetBtn.disabled = true;
      } else {
        analyticsCategoryBudgetBtn.textContent = getBudgetLimitLabel(categoryId);
        analyticsCategoryBudgetBtn.disabled = false;
        analyticsCategoryBudgetBtn.onclick = () => openBudgetModal(categoryId);
      }
    }
    
    if (analyticsCategoryTypeBtn) {
  if (isTransferCategory) {
    analyticsCategoryTypeBtn.textContent = "Гибкая";
    analyticsCategoryTypeBtn.disabled = true;
    analyticsCategoryTypeBtn.onclick = null;
    analyticsCategoryTypeBtn.classList.remove("analytics-category-type-btn--required");
    analyticsCategoryTypeBtn.classList.add("analytics-category-type-btn--flex");
  } else {
    const required = isRequiredCategory(categoryId);

    analyticsCategoryTypeBtn.textContent = required ? "Обязательная" : "Гибкая";
    analyticsCategoryTypeBtn.disabled = false;
    analyticsCategoryTypeBtn.classList.toggle("analytics-category-type-btn--required", required);
    analyticsCategoryTypeBtn.classList.toggle("analytics-category-type-btn--flex", !required);

    analyticsCategoryTypeBtn.onclick = async () => {
      const { error } = await supabaseClient
        .from("categories")
        .update({ is_required: !required })
        .eq("id", categoryId);

      if (error) {
        alert("Ошибка обновления типа категории");
        console.error(error);
        return;
      }

      await loadDataFromSupabase();
      openAnalyticsCategoryModal(categoryId);
      renderAll();
    };
  }
}

    if (!transactions.length) {
      const empty = document.createElement("div");
      empty.className = "list-card";
      empty.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">Операций нет</h3>
          <p class="list-subtitle">За выбранный период ничего не найдено</p>
        </div>
      `;
      analyticsCategoryTransactionsList.appendChild(empty);
    } else {
      transactions.forEach((transaction) => {
        analyticsCategoryTransactionsList.appendChild(createTransactionCard(transaction));
      });
    }

    openAnimatedModal(analyticsCategoryModal);
document.body.style.overflow = "hidden";
  }

  function closeAnalyticsCategoryModal() {
    closeAnimatedModal(analyticsCategoryModal);
activeAnalyticsCategoryId = null;
  }

  function resetForm() {
  amountInput.value = "";
  dateInput.value = getTodayDateValue();
  commentInput.value = "";
  categorySelect.innerHTML = `<option value="">Выбери категорию</option>`;
  accountSelect.selectedIndex = 0;
  fromAccountSelect.selectedIndex = 0;
  toAccountSelect.selectedIndex = 0;

  if (fromSafeBucketSelect) {
    fromSafeBucketSelect.innerHTML = `<option value="">Из какого накопления</option>`;
    fromSafeBucketSelect.value = "";
  }

  if (toSafeBucketSelect) {
    toSafeBucketSelect.innerHTML = `<option value="">В какое накопление</option>`;
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
    modalTitle.textContent = "Добавить расход";
    saveBtn.textContent = "Сохранить расход";

    categoryField.classList.remove("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillExpenseCategorySelect();
    fillAccountSelect(accountSelect, "Выбери счёт");

    const defaultExpenseAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    accountSelect.value = defaultExpenseAccountId;
  } else if (mode === "income") {
    modalTitle.textContent = "Добавить доход";
    saveBtn.textContent = "Сохранить доход";

    categoryField.classList.add("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillAccountSelect(accountSelect, "Выбери счёт");

    const defaultIncomeAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    accountSelect.value = defaultIncomeAccountId;
  } else if (mode === "transfer") {
    modalTitle.textContent = "Сделать перевод";
    saveBtn.textContent = "Сохранить перевод";

    categoryField.classList.add("hidden");
    accountField.classList.add("hidden");
    fromAccountField.classList.remove("hidden");
    toAccountField.classList.remove("hidden");

    fillAccountSelect(fromAccountSelect, "С какого счёта");
    fillAccountSelect(toAccountSelect, "На какой счёт");

    const defaultFromAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    const cashFallbackId =
      getCashAccountId() ||
      getSpendableAccounts().find((account) => account.id !== defaultFromAccountId)?.id ||
      "";

    fromAccountSelect.value = defaultFromAccountId;
    fillAccountSelect(toAccountSelect, "На какой счёт", cashFallbackId, {
      excludeId: defaultFromAccountId,
    });
    toAccountSelect.value = cashFallbackId;

    fromSafeBucketField.classList.add("hidden");
    toSafeBucketField.classList.add("hidden");

    fillSafeBucketSelect(fromSafeBucketSelect, "Из какого накопления");
    fillSafeBucketSelect(toSafeBucketSelect, "В какое накопление");
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
    modalTitle.textContent = "Редактировать расход";
    saveBtn.textContent = "Сохранить";

    categoryField.classList.remove("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillExpenseCategorySelect(transaction.category_id || UNCATEGORIZED_ID);

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();
    fillAccountSelect(accountSelect, "Выбери счёт", transaction.account_id);
    accountSelect.value = transaction.account_id || "";
    commentInput.value = transaction.title === "Новая трата" ? "" : transaction.title;
  } else if (transaction.type === "income") {
    modalTitle.textContent = "Редактировать доход";
    saveBtn.textContent = "Сохранить";

    categoryField.classList.add("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();
    fillAccountSelect(accountSelect, "Выбери счёт", transaction.account_id);
    accountSelect.value = transaction.account_id || "";
    commentInput.value = transaction.title === "Новый доход" ? "" : transaction.title;
  } else if (transaction.type === "transfer") {
    modalTitle.textContent = "Редактировать перевод";
    saveBtn.textContent = "Сохранить";

    categoryField.classList.add("hidden");
    accountField.classList.add("hidden");
    fromAccountField.classList.remove("hidden");
    toAccountField.classList.remove("hidden");

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();

    fillAccountSelect(fromAccountSelect, "С какого счёта", transaction.from_account_id);
    fillAccountSelect(toAccountSelect, "На какой счёт", transaction.to_account_id, {
      excludeId: transaction.from_account_id,
    });

    fromAccountSelect.value = transaction.from_account_id || "";
    toAccountSelect.value = transaction.to_account_id || "";
    commentInput.value = transaction.title === "Перевод" ? "" : transaction.title;

    fillSafeBucketSelect(
      fromSafeBucketSelect,
      "Из какого накопления",
      transaction.from_safe_bucket_id || ""
    );
    fillSafeBucketSelect(
      toSafeBucketSelect,
      "В какое накопление",
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

  function getAccountBalance(accountNameOrId) {
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
        const matchesById = transaction.account_id && transaction.account_id === accountId;
        const matchesLegacy = !transaction.account_id && transaction.account === accountName;

        if (matchesById || matchesLegacy) {
          return sum + amount;
        }
      }

      if (transaction.type === "expense") {
        const matchesById = transaction.account_id && transaction.account_id === accountId;
        const matchesLegacy = !transaction.account_id && transaction.account === accountName;

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
  
  function getAccountRoleLabel(account) {
  if (account.account_kind === "vault_pool") return "Накопления";
  if (account.account_kind === "reserve") return "Резерв";
  if (account.account_kind === "cash") return "Наличные";
  return account.is_primary_spend ? "Основной счёт" : "Обычный счёт";
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
  return state.accounts.reduce((sum, account) => sum + getAccountBalance(account.id), 0);
}

  function getAnalyticsFilteredTransactions() {
    return filterTransactionsByPeriod(
      state.transactions,
      analyticsFilterPeriod,
      analyticsSelectedMonth,
      analyticsRangeStart,
      analyticsRangeEnd
    );
  }

  function getAnalyticsSummary() {
    const items = getAnalyticsFilteredTransactions();

    let income = 0;
    let expense = 0;

    items.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") income += amount;
      if (transaction.type === "expense") expense += amount;
    });

    return {
      income,
      expense,
      net: income - expense,
    };
  }

  function getAnalyticsCategoryBreakdown() {
    const items = getAnalyticsFilteredTransactions();
    const map = new Map();

    items.forEach((transaction) => {
      if (transaction.type !== "expense") return;

      const categoryId = transaction.category_id || UNCATEGORIZED_ID;
      const amount = Number(transaction.amount) || 0;
      const current = map.get(categoryId) || 0;
      map.set(categoryId, current + amount);
    });

    return [...map.entries()]
      .map(([categoryId, amount]) => {
        const category = getCategoryById(categoryId) || getCategoryById(UNCATEGORIZED_ID);

        return {
  id: category.id,
  name: category.name,
  icon: category.icon,
  is_required: Boolean(category.is_required),
  amount,
};
      })
      .sort((a, b) => b.amount - a.amount);
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

  function getAnalyticsOperationsFilteredTransactions() {
    let items = getAnalyticsFilteredTransactions();

    if (analyticsOperationType !== "all") {
      items = items.filter((transaction) => transaction.type === analyticsOperationType);
    }

    return sortTransactionsByLatest(items);
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
        title: "Проценты по накоплению",
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
        alert("Ошибка начисления процентов по накоплениям");
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
    alert("Ошибка сохранения даты начисления процентов");
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
animateLabeledCurrencyValue(balanceFreeMoneyValueEl, "Свободно: ", freeMoney, {
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

    const typeLabel = category.is_required ? "Обязательная" : "Гибкая";
    const lockedLabel = category.locked ? "Системная" : "Редактируемая";

    card.innerHTML = `
      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(category.name)}</h3>
        </div>
        <p class="list-subtitle">${lockedLabel} • ${typeLabel}</p>
      </div>

      <div class="category-row__meta">
        <span class="category-row__pill ${category.is_required ? "category-row__pill--required" : ""}">
          ${typeLabel}
        </span>
        <span class="category-row__chevron">›</span>
      </div>
    `;

    card.addEventListener("click", () => {
      openBudgetModal(category.id);
    });

    categoriesManagerList.appendChild(card);
  });
}

  function createTransactionCard(transaction) {
  const card = document.createElement("div");
card.className = "list-card list-card--clickable";
card.dataset.transactionId = transaction.id;

  let subtitle = "";
  let signedAmount = "";
  let valueClass = "list-value";

  if (transaction.type === "transfer") {
    const fromAccountName =
      getAccountNameById(transaction.from_account_id) || transaction.from_account || "";

    const toAccountName =
      getAccountNameById(transaction.to_account_id) || transaction.to_account || "";

    const fromLabel = isVaultAccountId(transaction.from_account_id)
      ? `${fromAccountName} • ${getSafeBucketName(transaction.from_safe_bucket_id)}`
      : fromAccountName;

    const toLabel = isVaultAccountId(transaction.to_account_id)
      ? `${toAccountName} • ${getSafeBucketName(transaction.to_safe_bucket_id)}`
      : toAccountName;

    subtitle = `${escapeHtml(fromLabel)} → ${escapeHtml(toLabel)}`;
    signedAmount = formatMoney(transaction.amount);
  } else if (transaction.type === "income") {
    const incomeAccountName =
      getAccountNameById(transaction.account_id) || transaction.account || "";

    const incomeBucketLabel =
      isVaultAccountId(transaction.account_id) && transaction.to_safe_bucket_id
        ? ` • ${getSafeBucketName(transaction.to_safe_bucket_id)}`
        : "";

    subtitle = `${escapeHtml(incomeAccountName)}${escapeHtml(incomeBucketLabel)} • доход`;
    signedAmount = `+${formatMoney(transaction.amount)}`;
    valueClass = "list-value list-value--green";
  } else {
    const expenseAccountName =
      getAccountNameById(transaction.account_id) || transaction.account || "";

    subtitle = `${escapeHtml(getCategoryName(transaction.category_id || UNCATEGORIZED_ID))} · ${escapeHtml(expenseAccountName)}`;
    signedAmount = `−${formatMoney(transaction.amount)}`;
    valueClass = "list-value list-value--red";
  }

  const shortDate = formatDateShort(transaction.created_at);
  const timeLabel = transaction.time_label || "";
  const caption = `${shortDate}${shortDate && timeLabel ? " • " : ""}${timeLabel}`;

  card.innerHTML = `
    <div class="list-body">
      <div class="list-title-row">
        <h3 class="list-title">${escapeHtml(transaction.title)}</h3>
      </div>
      <p class="list-subtitle">${subtitle}</p>
    </div>
    <div class="list-right">
      <p class="${valueClass}">${signedAmount}</p>
      <div class="list-caption">${caption}</div>
    </div>
  `;

  card.addEventListener("click", () => openEditModal(transaction.id));
  return card;
}

function captureTransactionRects(container, excludeTransactionId = "") {
  const rects = new Map();

  if (!container) return rects;

  const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

  cards.forEach((card) => {
    if (excludeTransactionId && card.dataset.transactionId === excludeTransactionId) return;

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

    const cards = [...document.querySelectorAll(`[data-transaction-id="${transactionId}"]`)];
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

  function renderTransactions() {
  transactionsListEl.innerHTML = "";

  const latestTransactions = sortTransactionsByLatest(state.transactions).slice(0, 5);

  if (latestTransactions.length === 0) {
    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">Операций пока нет</h3>
        <p class="list-subtitle">Добавь первую операцию через кнопки сверху</p>
      </div>
    `;
    transactionsListEl.appendChild(empty);
    return;
  }

  let freshCard = null;

  latestTransactions.forEach((transaction) => {
    const card = createTransactionCard(transaction);

    if (!freshCard && justCreatedTransactionId && transaction.id === justCreatedTransactionId) {
      card.classList.add("list-card--fresh-sticker");
      freshCard = card;
    }

    transactionsListEl.appendChild(card);
  });

  if (freshCard) {

    window.setTimeout(() => {
      freshCard?.classList.remove("list-card--fresh-sticker");
      justCreatedTransactionId = null;
    }, 2200);
  } else if (justCreatedTransactionId) {
    justCreatedTransactionId = null;
  }
}

  function renderAnalytics() {
  const isOverview = analyticsTab === "overview";
  const isExpenses = analyticsTab === "expenses";
  const isSafes = analyticsTab === "safes";

  analyticsOverviewSection.classList.toggle("hidden", !isOverview);
  analyticsExpensesSection.classList.toggle("hidden", !isExpenses);
  analyticsSafesSection.classList.toggle("hidden", !isSafes);

  analyticsTabOverviewBtn.classList.toggle("is-active", isOverview);
  analyticsTabExpensesBtn.classList.toggle("is-active", isExpenses);
  analyticsTabSafesBtn.classList.toggle("is-active", isSafes);

  if (isOverview) renderAnalyticsOverview();
  if (isExpenses) renderAnalyticsExpensesByCategory();
  if (isSafes) renderAnalyticsSafes();
}

  /* =========================================================
     09. TRANSACTIONS CRUD
     ========================================================= */
  function buildTransactionFromForm() {
  const amount = parseMoneyInputValue(amountInput.value);
  const comment = commentInput.value.trim();

  if (!amount || amount <= 0) {
    alert("Введи сумму");
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
      alert("Выбери счёт списания");
      return null;
    }

    if (!toAccountId) {
      alert("Выбери счёт зачисления");
      return null;
    }

    if (fromAccountId === toAccountId) {
      const sameBuckets =
        !isVaultAccountId(fromAccountId) ||
        (fromSafeBucketId && toSafeBucketId && fromSafeBucketId === toSafeBucketId);

      if (sameBuckets) {
        alert("Счета должны быть разными");
        return null;
      }
    }

    if (isVaultAccountId(fromAccountId) && !fromSafeBucketId) {
      alert("Выбери накопление списания");
      return null;
    }

    if (isVaultAccountId(toAccountId) && !toSafeBucketId) {
      alert("Выбери накопление зачисления");
      return null;
    }

    return {
      id: editingTransactionId || crypto.randomUUID(),
      type: "transfer",
      title: comment || "Перевод",
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
    alert("Выбери счёт");
    return null;
  }

  if (currentMode === "income") {
    return {
      id: editingTransactionId || crypto.randomUUID(),
      type: "income",
      title: comment || "Новый доход",
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
    alert("Выбери категорию");
    return null;
  }

  const freeSafeBucket = isVaultAccountId(accountId) ? getFreeSafeBucket() : null;

  if (isVaultAccountId(accountId) && !freeSafeBucket) {
    alert("Не найдено накопление, помеченное как свободные деньги.");
    return null;
  }

  return {
    id: editingTransactionId || crypto.randomUUID(),
    type: "expense",
    title: comment || "Новая трата",
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
      alert("Ошибка обновления операции");
      console.error(error);
      return;
    }

    justCreatedTransactionId = null;
  } else {
    const { error } = await supabaseClient
      .from("transactions")
      .insert(transaction);

    if (error) {
      alert("Ошибка сохранения операции");
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
  const ok = confirm("Удалить эту операцию?");
  if (!ok) return;

  closeModal();

  await animateTransactionDelete(transactionId);

  const { error } = await supabaseClient
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    alert("Ошибка удаления операции");
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
    alert("Введите название категории");
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
    alert("Ошибка добавления категории");
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
    alert("Введи название категории");
    return;
  }

  if (Number.isNaN(amount) || amount < 0) {
    alert("Введи корректный лимит");
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
    alert("Ошибка обновления категории");
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
      alert("Ошибка обновления лимита");
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
      alert("Ошибка сохранения лимита");
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
    `Удалить категорию "${category.name}"? Все старые расходы перейдут в "Без категории".`
  );
  if (!ok) return;

  const { error: txError } = await supabaseClient
    .from("transactions")
    .update({ category_id: UNCATEGORIZED_ID })
    .eq("type", "expense")
    .eq("category_id", category.id);

  if (txError) {
    alert("Ошибка переноса старых расходов");
    console.error(txError);
    return;
  }

  const { error: budgetDeleteError } = await supabaseClient
    .from("budget_limits")
    .delete()
    .eq("category_id", category.id);

  if (budgetDeleteError) {
    alert("Ошибка удаления лимита категории");
    console.error(budgetDeleteError);
    return;
  }

  const { error: deleteError } = await supabaseClient
    .from("categories")
    .delete()
    .eq("id", category.id);

  if (deleteError) {
    alert("Ошибка удаления категории");
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
    alert("Ошибка загрузки счетов из Supabase");
    return;
  }

  if (categoriesError) {
    console.error(categoriesError);
    alert("Ошибка загрузки категорий из Supabase");
    return;
  }

  if (transactionsError) {
    console.error(transactionsError);
    alert("Ошибка загрузки операций из Supabase");
    return;
  }

  if (budgetLimitsError) {
    console.error(budgetLimitsError);
    alert("Ошибка загрузки лимитов бюджета из Supabase");
    return;
  }

  if (safeBucketsError) {
    console.error(safeBucketsError);
    alert("Ошибка загрузки накоплений из Supabase");
    return;
  }

  if (appMetaError) {
    console.error(appMetaError);
    alert("Ошибка загрузки служебных данных приложения");
    return;
  }

    state.accounts = accounts || [];
  state.categories = categories || [];
  state.transactions = transactions || [];
  state.budgetLimits = budgetLimits || [];
    state.safeBuckets = (safeBuckets || []).map((bucket, index) => ({
    ...bucket,
    id: bucket.id || `safe-bucket-${index + 1}`,
    name: bucket.name || "Накопление",
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

  /* =========================================================
     12. EVENTS / LISTENERS
     ========================================================= */
  openExpenseModalBtn?.addEventListener("click", () => openModal("expense"));
  openIncomeModalBtn?.addEventListener("click", () => openModal("income"));
  openTransferModalBtn?.addEventListener("click", () => openModal("transfer"));
  fromAccountSelect?.addEventListener("change", updateTransferSafeFields);
toAccountSelect?.addEventListener("change", updateTransferSafeFields);

  openCategoriesManagerBtn?.addEventListener("click", openCategoriesManager);
  closeCategoriesManagerBtn?.addEventListener("click", closeCategoriesManager);

openAnalyticsFiltersBtn?.addEventListener("click", openAnalyticsFiltersModal);
closeAnalyticsFiltersBtn?.addEventListener("click", closeAnalyticsFiltersModal);

navWalletBtn?.addEventListener("click", showWalletView);
navAnalyticsBtn?.addEventListener("click", showAnalyticsView);
navOperationsBtn?.addEventListener("click", showOperationsView);

analyticsTabOverviewBtn?.addEventListener("click", () => setAnalyticsTab("overview"));
analyticsTabExpensesBtn?.addEventListener("click", () => setAnalyticsTab("expenses"));
analyticsTabSafesBtn?.addEventListener("click", () => setAnalyticsTab("safes"));

accountRoleSelect?.addEventListener("change", syncAccountPrimaryControls);

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

  analyticsPeriodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      analyticsFilterPeriod = btn.dataset.analyticsPeriod;

      if (analyticsFilterPeriod !== "month") {
        closeAnalyticsMonthWheel();
      }

      if (analyticsFilterPeriod === "range") {
        const today = getTodayDateValue();
        analyticsRangeStart = analyticsRangeStart || today;
        analyticsRangeEnd = analyticsRangeEnd || today;

        if (analyticsRangeFromInput) {
          analyticsRangeFromInput.value = analyticsRangeStart;
        }

        if (analyticsRangeToInput) {
          analyticsRangeToInput.value = analyticsRangeEnd;
        }

        setNativePickerVisibility(analyticsRangeFromInput, true);
        setNativePickerVisibility(analyticsRangeToInput, true);
        openNativePicker(analyticsRangeFromInput);
      }

      renderAnalytics();
    });
  });

  analyticsMonthBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    analyticsFilterPeriod = "month";

    if (isAnalyticsMonthWheelOpen) {
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
  closeAnalyticsFiltersModal();
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
openMandatoryPaymentEditorBtn?.addEventListener("click", () => {
  resetMandatoryPaymentForm();
  fillMandatoryPaymentAccountSelect("");
  fillMandatoryPaymentSafeSelect("");
  syncMandatoryPaymentLinkedSafeField();

  if (openMandatoryPaymentBucketPickerBtn) {
    openMandatoryPaymentBucketPickerBtn.textContent = "Выбрать накопление";
  }

  openMandatoryPaymentEditorModal();
});

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
  if (isAnalyticsMonthWheelOpen && analyticsMonthWheelWrap) {
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

  if (isAnalyticsMonthWheelOpen) {
    closeAnalyticsMonthWheel();
    return;
  }
});

  await loadDataFromSupabase();
  await applySafeInterestIfNeeded();
  await loadDataFromSupabase();
  renderAll();
  showWalletView();
  
/* =========================================================
   PREMIUM EXPENSES ANALYTICS VIEW
   ========================================================= */

let analyticsExpenseCategoryFilter = "all";

const premiumAnalyticsExpenseValue =
  document.getElementById("analyticsExpenseValuePremium") ||
  document.getElementById("analyticsExpenseValue");

const premiumAnalyticsExpensesPeriodNote =
  document.getElementById("analyticsExpensesPeriodNotePremium") ||
  document.getElementById("analyticsExpensesPeriodNote");

const premiumAnalyticsExpensesRing =
  document.getElementById("analyticsExpensesRingPremium") ||
  document.getElementById("analyticsExpensesRing");

const premiumAnalyticsExpensesRingCenterValue =
  document.getElementById("analyticsExpensesRingCenterValuePremium") ||
  document.getElementById("analyticsExpensesRingCenterValue");

const premiumAnalyticsExpensesRingCenterLabel =
  document.getElementById("analyticsExpensesRingCenterLabelPremium") ||
  document.getElementById("analyticsExpensesRingCenterLabel");

const premiumAnalyticsExpensesCategoriesList =
  document.getElementById("analyticsExpensesCategoriesListPremium") ||
  document.getElementById("analyticsExpensesCategoriesList");

const premiumAnalyticsExpensesMonthStrip =
  document.getElementById("analyticsExpensesMonthStrip");

const premiumAnalyticsExpensesTotalRowValue =
  document.getElementById("analyticsExpensesTotalRowValue");

const ANALYTICS_EXPENSE_COLORS = [
  "#B878F2",
  "#FF8A45",
  "#55C7E8",
  "#FF5252",
  "#9BE22D",
  "#6D9CF8",
  "#F95FA3",
  "#4DD6C8",
  "#F2F2F2",
  "#FFD166",
  "#9D7CFF",
  "#A3E635",
  "#F97316",
  "#60A5FA",
  "#FACC15",
  "#C084FC",
  "#2DD4BF",
  "#FB7185",
  "#93C5FD",
  "#BEF264",
  "#FDBA74",
  "#E879F9",
  "#67E8F9",
  "#FDE68A",
];

function normalizeAnalyticsMonthValuePremium(value) {
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

  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }

  return hash;
}

function getAnalyticsExpenseColor(categoryId) {
  const categoryIds = state.categories.map((category) => category.id);
  const allCategoryIds = Array.from(new Set([...categoryIds, UNCATEGORIZED_ID]));
  const index = allCategoryIds.indexOf(categoryId);

  if (index >= 0) {
    return ANALYTICS_EXPENSE_COLORS[index % ANALYTICS_EXPENSE_COLORS.length];
  }

  return ANALYTICS_EXPENSE_COLORS[
    getAnalyticsColorHash(categoryId) % ANALYTICS_EXPENSE_COLORS.length
  ];
}

function getAnalyticsExpenseBaseTransactionsPremium() {
  const transactions = Array.isArray(state.transactions) ? state.transactions : [];

  analyticsSelectedMonth = normalizeAnalyticsMonthValuePremium(analyticsSelectedMonth);

  return filterTransactionsByPeriod(
    transactions,
    analyticsFilterPeriod,
    analyticsSelectedMonth,
    analyticsRangeStart,
    analyticsRangeEnd
  ).filter((transaction) => transaction.type === "expense");
}

function getAnalyticsExpenseFilteredTransactionsPremium() {
  const expenseTransactions = getAnalyticsExpenseBaseTransactionsPremium();

  if (analyticsExpenseCategoryFilter === "all") {
    return expenseTransactions;
  }

  return expenseTransactions.filter((transaction) => {
    const categoryId = transaction.category_id || UNCATEGORIZED_ID;
    return categoryId === analyticsExpenseCategoryFilter;
  });
}

function getAnalyticsExpenseItemsPremium(expenseTransactions) {
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

function renderAnalyticsExpensesRingPremium(items, total) {
  if (!premiumAnalyticsExpensesRing) return;

  if (!total || total <= 0 || items.length === 0) {
    const emptyGradient = "conic-gradient(rgba(255,255,255,0.09) 0deg 360deg)";

    premiumAnalyticsExpensesRing.style.background = emptyGradient;
    premiumAnalyticsExpensesRing.style.setProperty("--analytics-ring-gradient", emptyGradient);

    if (premiumAnalyticsExpensesRingCenterValue) {
      premiumAnalyticsExpensesRingCenterValue.textContent = "0%";
    }

    if (premiumAnalyticsExpensesRingCenterLabel) {
      premiumAnalyticsExpensesRingCenterLabel.textContent = "Нет расходов";
    }

    return;
  }

  let cursor = 0;

  const gradientParts = items.map((item) => {
    const percent = (item.amount / total) * 100;
    const start = cursor;
    const end = cursor + percent;

    cursor = end;

    return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
  });

  const gradient = `conic-gradient(${gradientParts.join(", ")})`;

  premiumAnalyticsExpensesRing.style.background = gradient;
  premiumAnalyticsExpensesRing.style.setProperty("--analytics-ring-gradient", gradient);

  const topItem = items[0];
  const topPercent = Math.round((topItem.amount / total) * 100);

  if (premiumAnalyticsExpensesRingCenterValue) {
    premiumAnalyticsExpensesRingCenterValue.textContent = `${topPercent}%`;
  }

  if (premiumAnalyticsExpensesRingCenterLabel) {
    premiumAnalyticsExpensesRingCenterLabel.textContent = topItem.name;
  }
}

function renderAnalyticsExpensesCategoriesPremium(items, total) {
  if (!premiumAnalyticsExpensesCategoriesList) return;

  premiumAnalyticsExpensesCategoriesList.innerHTML = "";

  if (!total || total <= 0 || items.length === 0) {
    premiumAnalyticsExpensesCategoriesList.innerHTML = `
      <div class="analytics-expenses-empty">
        За выбранный период расходов нет
      </div>
    `;
    return;
  }

  items.forEach((item) => {
    const percent = total > 0 ? Math.round((item.amount / total) * 100) : 0;

    const row = document.createElement("button");
    row.className = "analytics-expense-category-row analytics-expense-category-row--premium";
    row.type = "button";
    row.dataset.categoryId = item.categoryId;

    row.innerHTML = `
      <div class="analytics-expense-category-row__icon" style="--category-color: ${item.color}">
        <span>${item.name.slice(0, 1).toUpperCase()}</span>
      </div>

      <div class="analytics-expense-category-row__main">
        <div class="analytics-expense-category-row__top">
          <div class="analytics-expense-category-row__name">${item.name}</div>
          <div class="analytics-expense-category-row__amount">${formatMoney(item.amount)}</div>
        </div>

        <div class="analytics-expense-category-row__bottom">
          <div class="analytics-expense-category-row__bar">
            <div
              class="analytics-expense-category-row__bar-fill"
              style="width: ${Math.max(2, percent)}%; background: ${item.color};"
            ></div>
          </div>

          <div class="analytics-expense-category-row__percent">${percent}%</div>
        </div>
      </div>
    `;

    row.addEventListener("click", () => {
      activeAnalyticsCategoryId = item.categoryId;

      if (typeof openAnalyticsCategoryModal === "function") {
        openAnalyticsCategoryModal(item.categoryId);
      }
    });

    premiumAnalyticsExpensesCategoriesList.appendChild(row);
  });
}

function getAnalyticsMonthDateFromValue(value) {
  const normalized = normalizeAnalyticsMonthValuePremium(value);
  const match = normalized.match(/^(\d{4})-(\d{2})$/);

  return new Date(Number(match[1]), Number(match[2]) - 1, 1);
}

function getAnalyticsMonthKeyFromDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getAnalyticsMonthShortLabel(date) {
  const labels = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];

  return labels[date.getMonth()];
}

function setAnalyticsExpensesMonthPremium(monthKey) {
  analyticsFilterPeriod = "month";
  analyticsSelectedMonth = normalizeAnalyticsMonthValuePremium(monthKey);
  analyticsRangeStart = "";
  analyticsRangeEnd = "";

  analyticsPeriodButtons.forEach((periodButton) => {
    periodButton.classList.toggle(
      "is-active",
      periodButton.dataset.analyticsPeriod === "month"
    );
  });

  const date = getAnalyticsMonthDateFromValue(analyticsSelectedMonth);

  if (analyticsMonthBtn) {
    analyticsMonthBtn.textContent = getAnalyticsMonthShortLabel(date);
  }

  renderAnalyticsExpensesPremium();
}

function renderAnalyticsExpensesMonthStripPremium() {
  if (!premiumAnalyticsExpensesMonthStrip) return;

  const baseDate = getAnalyticsMonthDateFromValue(getCurrentMonthValue());
  const months = [];

  for (let index = 10; index >= 0; index -= 1) {
    const date = new Date(baseDate.getFullYear(), baseDate.getMonth() - index, 1);
    const key = getAnalyticsMonthKeyFromDate(date);

    const monthTransactions = filterTransactionsByPeriod(
      state.transactions,
      "month",
      key,
      "",
      ""
    ).filter((transaction) => transaction.type === "expense");

    const total = monthTransactions.reduce((sum, transaction) => {
      return sum + (Number(transaction.amount) || 0);
    }, 0);

    months.push({
      key,
      date,
      total: roundToTwo(total),
    });
  }

  const maxTotal = Math.max(...months.map((item) => item.total), 1);

  premiumAnalyticsExpensesMonthStrip.innerHTML = "";

  months.forEach((item) => {
    const height = Math.max(4, Math.round((item.total / maxTotal) * 34));
    const isActive = item.key === normalizeAnalyticsMonthValuePremium(analyticsSelectedMonth);

    const button = document.createElement("button");
    button.className = `analytics-expenses-month-item${isActive ? " is-active" : ""}`;
    button.type = "button";

    button.innerHTML = `
      <div class="analytics-expenses-month-item__bar" style="height: ${height}px"></div>
      <div class="analytics-expenses-month-item__label">${getAnalyticsMonthShortLabel(item.date)}</div>
    `;

    button.addEventListener("click", () => {
      setAnalyticsExpensesMonthPremium(item.key);
    });

    premiumAnalyticsExpensesMonthStrip.appendChild(button);
  });
}

function getAnalyticsExpensesPeriodTextPremium() {
  if (analyticsFilterPeriod === "today") {
    return "за сегодня";
  }

  if (analyticsFilterPeriod === "7") {
    return "за 7 дней";
  }

  if (analyticsFilterPeriod === "range") {
    return "за выбранный период";
  }

  const date = getAnalyticsMonthDateFromValue(analyticsSelectedMonth);
  const month = date.toLocaleDateString("ru-RU", {
    month: "long",
  });

  return `за ${month}`;
}

function renderAnalyticsExpensesPremium() {
  analyticsSelectedMonth = normalizeAnalyticsMonthValuePremium(analyticsSelectedMonth);

  const baseExpenseTransactions = getAnalyticsExpenseBaseTransactionsPremium();
  const filteredExpenseTransactions = getAnalyticsExpenseFilteredTransactionsPremium();

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

  const ringItems = getAnalyticsExpenseItemsPremium(baseExpenseTransactions);
  const listItems = getAnalyticsExpenseItemsPremium(filteredExpenseTransactions);

  if (premiumAnalyticsExpenseValue) {
    premiumAnalyticsExpenseValue.textContent =
      analyticsExpenseCategoryFilter === "all"
        ? formatMoney(totalAll)
        : formatMoney(totalFiltered);
  }

  if (premiumAnalyticsExpensesTotalRowValue) {
    premiumAnalyticsExpensesTotalRowValue.textContent =
      analyticsExpenseCategoryFilter === "all"
        ? formatMoney(totalAll)
        : formatMoney(totalFiltered);
  }

  if (premiumAnalyticsExpensesPeriodNote) {
    premiumAnalyticsExpensesPeriodNote.textContent = getAnalyticsExpensesPeriodTextPremium();
  }

  renderAnalyticsExpensesRingPremium(ringItems, totalAll);
  renderAnalyticsExpensesMonthStripPremium();
  renderAnalyticsExpensesCategoriesPremium(listItems, analyticsExpenseCategoryFilter === "all" ? totalAll : totalFiltered);
}

analyticsTabExpensesBtn?.addEventListener("click", () => {
  requestAnimationFrame(renderAnalyticsExpensesPremium);
});

analyticsPeriodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    requestAnimationFrame(renderAnalyticsExpensesPremium);
  });
});

analyticsMonthApplyBtn?.addEventListener("click", () => {
  setTimeout(() => {
    analyticsSelectedMonth = normalizeAnalyticsMonthValuePremium(analyticsSelectedMonth);
    renderAnalyticsExpensesPremium();
  }, 0);
});

analyticsMonthResetBtn?.addEventListener("click", () => {
  setTimeout(() => {
    analyticsSelectedMonth = normalizeAnalyticsMonthValuePremium(getCurrentMonthValue());
    renderAnalyticsExpensesPremium();
  }, 0);
});

analyticsRangeFromInput?.addEventListener("change", () => {
  requestAnimationFrame(renderAnalyticsExpensesPremium);
});

analyticsRangeToInput?.addEventListener("change", () => {
  requestAnimationFrame(renderAnalyticsExpensesPremium);
});

let premiumAnalyticsLastSignature = "";

function getPremiumAnalyticsStateSignature() {
  const transactions = Array.isArray(state.transactions) ? state.transactions : [];
  const categories = Array.isArray(state.categories) ? state.categories : [];

  const transactionsSignature = transactions
    .map((transaction) => {
      return [
        transaction.id || "",
        transaction.created_at || "",
        transaction.type || "",
        transaction.amount || 0,
        transaction.category_id || "",
        transaction.account_id || "",
        transaction.from_account_id || "",
        transaction.to_account_id || "",
        transaction.from_safe_bucket_id || "",
        transaction.to_safe_bucket_id || "",
      ].join(":");
    })
    .join("|");

  const categoriesSignature = categories
    .map((category) => {
      return [
        category.id || "",
        category.name || "",
        category.is_required ? "1" : "0",
      ].join(":");
    })
    .join("|");

  return [
    analyticsFilterPeriod,
    normalizeAnalyticsMonthValuePremium(analyticsSelectedMonth),
    analyticsRangeStart,
    analyticsRangeEnd,
    analyticsExpenseCategoryFilter,
    transactionsSignature,
    categoriesSignature,
  ].join("||");
}

function renderAnalyticsExpensesPremiumSynced() {
  renderAnalyticsExpensesPremium();
  premiumAnalyticsLastSignature = getPremiumAnalyticsStateSignature();
}

function startPremiumAnalyticsAutoSync() {
  const sync = () => {
    const nextSignature = getPremiumAnalyticsStateSignature();

    if (nextSignature !== premiumAnalyticsLastSignature) {
      renderAnalyticsExpensesPremiumSynced();
    }
  };

  requestAnimationFrame(renderAnalyticsExpensesPremiumSynced);

  setTimeout(renderAnalyticsExpensesPremiumSynced, 0);
  setTimeout(renderAnalyticsExpensesPremiumSynced, 120);
  setTimeout(renderAnalyticsExpensesPremiumSynced, 350);
  setTimeout(renderAnalyticsExpensesPremiumSynced, 800);
  setTimeout(renderAnalyticsExpensesPremiumSynced, 1600);

  setInterval(sync, 350);
}

startPremiumAnalyticsAutoSync();
  
});