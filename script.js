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
  const navInsightsBtn = document.getElementById("navInsightsBtn");
  
  const mainView = document.getElementById("mainView");
  const categoriesManagerView = document.getElementById("categoriesManagerView");
  const analyticsView = document.getElementById("analyticsView");
  const insightsView = document.getElementById("insightsView");

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

  const analyticsModeCategoriesBtn = document.getElementById("analyticsModeCategoriesBtn");
  const analyticsModeOperationsBtn = document.getElementById("analyticsModeOperationsBtn");
  const analyticsOperationTypeFilters = document.getElementById("analyticsOperationTypeFilters");
  const analyticsTypeButtons = document.querySelectorAll("[data-analytics-type]");
  const analyticsCategoriesBreakdownSection = document.getElementById("analyticsCategoriesBreakdownSection");
  const analyticsOperationsSection = document.getElementById("analyticsOperationsSection");
  const analyticsTransactionsList = document.getElementById("analyticsTransactionsList");
  const analyticsFiltersModal = document.getElementById("analyticsFiltersModal");
const openAnalyticsFiltersBtn = document.getElementById("openAnalyticsFiltersBtn");
const closeAnalyticsFiltersBtn = document.getElementById("closeAnalyticsFiltersBtn");
  
    const insightsPeriodLabel = document.getElementById("insightsPeriodLabel");
  const insightsIncomeValue = document.getElementById("insightsIncomeValue");
  const insightsExpenseValue = document.getElementById("insightsExpenseValue");
  const insightsRequiredValue = document.getElementById("insightsRequiredValue");
  const insightsFlexibleValue = document.getElementById("insightsFlexibleValue");
  const insightsSavedValue = document.getElementById("insightsSavedValue");
  const insightsInterestValue = document.getElementById("insightsInterestValue");

  const insightsPendingMandatoryValue = document.getElementById("insightsPendingMandatoryValue");
const insightsRemainingBudgetsValue = document.getElementById("insightsRemainingBudgetsValue");
const insightsTotalBalanceValue = document.getElementById("insightsTotalBalanceValue");
const insightsProtectedMoneyValue = document.getElementById("insightsProtectedMoneyValue");
const insightsFreeMoneyValue = document.getElementById("insightsFreeMoneyValue");
const insightsCanSaveNowValue = document.getElementById("insightsCanSaveNowValue");

const insightsMandatoryTotalValue = document.getElementById("insightsMandatoryTotalValue");
const insightsMandatoryCoveredValue = document.getElementById("insightsMandatoryCoveredValue");
const insightsCanSaveNowStatus = document.getElementById("insightsCanSaveNowStatus");
const insightsCanSaveNowHint = document.getElementById("insightsCanSaveNowHint");

const insightsSafeList = document.getElementById("insightsSafeList");

const insightsSafesToggleBtn = document.getElementById("insightsSafesToggleBtn");
const insightsSafesBody = document.getElementById("insightsSafesBody");
const insightsSafesArrow = document.getElementById("insightsSafesArrow");
  const insightsPeriodButtons = document.querySelectorAll("[data-insights-period]");
const insightsMonthBtn = document.getElementById("insightsMonthBtn");
const insightsMonthWheelWrap = document.getElementById("insightsMonthWheelWrap");
const insightsMonthNamesColumn = document.getElementById("insightsMonthNamesColumn");
const insightsMonthYearsColumn = document.getElementById("insightsMonthYearsColumn");
const insightsMonthResetBtn = document.getElementById("insightsMonthResetBtn");
const insightsMonthApplyBtn = document.getElementById("insightsMonthApplyBtn");
const insightsRangeFromInput = document.getElementById("insightsRangeFromInput");
const insightsRangeToInput = document.getElementById("insightsRangeToInput");
const insightsSelectedPeriodLabel = document.getElementById("insightsSelectedPeriodLabel");
const insightsFiltersModal = document.getElementById("insightsFiltersModal");
const openInsightsFiltersBtn = document.getElementById("openInsightsFiltersBtn");
const closeInsightsFiltersBtn = document.getElementById("closeInsightsFiltersBtn");

  const mandatoryPaymentsModal = document.getElementById("mandatoryPaymentsModal");
  const openMandatoryPaymentsModalBtn = document.getElementById("openMandatoryPaymentsModalBtn");
  const closeMandatoryPaymentsModalBtn = document.getElementById("closeMandatoryPaymentsModalBtn");
  const mandatoryPaymentsList = document.getElementById("mandatoryPaymentsList");
const mandatoryPaymentTitleInput = document.getElementById("mandatoryPaymentTitleInput");
const mandatoryPaymentAmountInput = document.getElementById("mandatoryPaymentAmountInput");
const mandatoryPaymentDueDayInput = document.getElementById("mandatoryPaymentDueDayInput");
const mandatoryPaymentLinkedSafeSelect = document.getElementById("mandatoryPaymentLinkedSafeSelect");
const addMandatoryPaymentBtn = document.getElementById("addMandatoryPaymentBtn");

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

const insightsExpenseRingRequired = document.getElementById("insightsExpenseRingRequired");
const insightsExpenseRingFlexible = document.getElementById("insightsExpenseRingFlexible");
const insightsPeriodCaption = document.getElementById("insightsPeriodCaption");
const openExpenseBreakdownBtn = document.getElementById("openExpenseBreakdownBtn");

  /* =========================================================
     02. UI STATE
     ========================================================= */
  let currentMode = "expense";
  let editingTransactionId = null;

  let analyticsFilterPeriod = "month";
  let analyticsSelectedMonth = getCurrentMonthValue();
  let analyticsRangeStart = "";
  let analyticsRangeEnd = "";
  
  let insightsFilterPeriod = "month";
let insightsSelectedMonth = getCurrentMonthValue();
let insightsRangeStart = "";
let insightsRangeEnd = "";

let insightsDraftMonth = "";
let insightsDraftYear = "";
let isInsightsMonthWheelOpen = false;

  let analyticsDraftMonth = "";
let analyticsDraftYear = "";
let isAnalyticsMonthWheelOpen = false;

let analyticsMonthScrollTimer = null;
let analyticsYearScrollTimer = null;

  let analyticsMode = "categories";
  let analyticsOperationType = "all";

let activeBudgetCategoryId = null;
let activeAnalyticsCategoryId = null;
let activeSafeBucketAmountId = null;
let activeAccountId = null;

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

function openMandatoryPaymentsModal() {
  fillMandatoryPaymentSafeSelect();
  mandatoryPaymentDueDayInput.value = mandatoryPaymentDueDayInput.value || getTodayDateValue();
  renderMandatoryPaymentsModal();
  mandatoryPaymentsModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeMandatoryPaymentsModal() {
  mandatoryPaymentsModal.classList.add("hidden");
  document.body.style.overflow = "";
  mandatoryPaymentTitleInput.value = "";
  mandatoryPaymentAmountInput.value = "";
  mandatoryPaymentDueDayInput.value = "";
  if (mandatoryPaymentLinkedSafeSelect) {
    mandatoryPaymentLinkedSafeSelect.value = "";
  }
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

      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
  <div class="list-body">
    <div class="list-title-row">
      <h3 class="list-title">${escapeHtml(item.title)}</h3>
    </div>
    <p class="list-subtitle">
      ${formatMoney(item.amount)} • до ${String(item.due_day).padStart(2, "0")} числа • ${coverageText} • ${isPaid ? "Оплачен" : "Не оплачен"}
    </p>
  </div>

  <div class="category-manager-actions">
  <button
    class="icon-action-btn icon-action-btn--toggle ${isPaid ? "is-active" : ""}"
    type="button"
    data-toggle-mandatory-id="${item.id}"
    aria-label="${isPaid ? "Снять оплату" : "Отметить как оплаченный"}"
    title="${isPaid ? "Снять оплату" : "Отметить как оплаченный"}"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5 9.2 16.5 19 7.5" />
    </svg>
  </button>

  <button
    class="icon-action-btn icon-action-btn--danger"
    type="button"
    data-delete-mandatory-id="${item.id}"
    aria-label="Удалить платёж"
    title="Удалить платёж"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7h14" />
      <path d="M9 7V5h6v2" />
      <path d="M8 7l1 12h6l1-12" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  </button>
</div>
      `;

      card.querySelector("[data-toggle-mandatory-id]")?.addEventListener("click", async () => {
        const target = state.mandatoryPayments.find((entry) => entry.id === item.id);
        if (!target) return;

        target.last_paid_period = isPaid ? "" : currentMonthKey;

        const ok = await saveMandatoryPaymentsToMeta();
        if (!ok) return;

        renderMandatoryPaymentsModal();
        renderAll();
      });

      card.querySelector("[data-delete-mandatory-id]")?.addEventListener("click", async () => {
        const ok = confirm(`Удалить обязательный платёж "${item.title}"?`);
        if (!ok) return;

        state.mandatoryPayments = state.mandatoryPayments.filter((entry) => entry.id !== item.id);

        const saved = await saveMandatoryPaymentsToMeta();
        if (!saved) return;

        renderMandatoryPaymentsModal();
        renderAll();
      });

      mandatoryPaymentsList.appendChild(card);
    });
}

  async function addMandatoryPayment() {
  const title = mandatoryPaymentTitleInput.value.trim();
  const amount = Number(mandatoryPaymentAmountInput.value);
  const dueDateValue = mandatoryPaymentDueDayInput.value;
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

  const dueDay = new Date(`${dueDateValue}T00:00:00`).getDate();

  state.mandatoryPayments.push({
    id: crypto.randomUUID(),
    title,
    amount: roundToTwo(amount),
    due_day: dueDay,
    linked_safe_bucket_id: linkedSafeBucketId,
    enabled: true,
    last_paid_period: "",
  });

  const ok = await saveMandatoryPaymentsToMeta();
  if (!ok) return;

  mandatoryPaymentTitleInput.value = "";
  mandatoryPaymentAmountInput.value = "";
  mandatoryPaymentDueDayInput.value = "";
  if (mandatoryPaymentLinkedSafeSelect) {
    mandatoryPaymentLinkedSafeSelect.value = "";
  }

  renderMandatoryPaymentsModal();
  renderAll();
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
  
   function renderInsightsMonthWheel() {
  if (!insightsMonthNamesColumn || !insightsMonthYearsColumn) return;

  const monthNames = getRussianMonthNames().map((label, index) => ({
    value: String(index + 1).padStart(2, "0"),
    label,
  }));

  const years = getAnalyticsWheelYears().map((year) => ({
    value: year,
    label: year,
  }));

  insightsMonthNamesColumn.innerHTML = buildWheelColumnItems(
    monthNames,
    insightsDraftMonth,
    "data-wheel-month"
  );

  insightsMonthYearsColumn.innerHTML = buildWheelColumnItems(
    years,
    insightsDraftYear,
    "data-wheel-year"
  );

  insightsMonthNamesColumn.querySelectorAll("[data-wheel-month]").forEach((btn) => {
    btn.addEventListener("click", () => {
      insightsDraftMonth = btn.dataset.wheelMonth;
      setWheelActiveState(insightsMonthNamesColumn, "data-wheel-month", insightsDraftMonth);
      snapWheelToValue(insightsMonthNamesColumn, "data-wheel-month", insightsDraftMonth, "smooth");
    });
  });

  insightsMonthYearsColumn.querySelectorAll("[data-wheel-year]").forEach((btn) => {
    btn.addEventListener("click", () => {
      insightsDraftYear = btn.dataset.wheelYear;
      setWheelActiveState(insightsMonthYearsColumn, "data-wheel-year", insightsDraftYear);
      snapWheelToValue(insightsMonthYearsColumn, "data-wheel-year", insightsDraftYear, "smooth");
    });
  });

  bindWheelScroll(insightsMonthNamesColumn, "data-wheel-month", (value) => {
    insightsDraftMonth = value;
  });

  bindWheelScroll(insightsMonthYearsColumn, "data-wheel-year", (value) => {
    insightsDraftYear = value;
  });

  requestAnimationFrame(() => {
    setWheelActiveState(insightsMonthNamesColumn, "data-wheel-month", insightsDraftMonth);
    setWheelActiveState(insightsMonthYearsColumn, "data-wheel-year", insightsDraftYear);

    snapWheelToValue(insightsMonthNamesColumn, "data-wheel-month", insightsDraftMonth, "auto");
    snapWheelToValue(insightsMonthYearsColumn, "data-wheel-year", insightsDraftYear, "auto");
  });
}

function openInsightsMonthWheel() {
  setInsightsDraftMonthFromValue(insightsSelectedMonth);
  isInsightsMonthWheelOpen = true;
  insightsMonthWheelWrap?.classList.remove("hidden");

  if (!insightsMonthNamesColumn?.children.length || !insightsMonthYearsColumn?.children.length) {
    renderInsightsMonthWheel();
  } else {
    setWheelActiveState(insightsMonthNamesColumn, "data-wheel-month", insightsDraftMonth);
    setWheelActiveState(insightsMonthYearsColumn, "data-wheel-year", insightsDraftYear);

    requestAnimationFrame(() => {
      snapWheelToValue(insightsMonthNamesColumn, "data-wheel-month", insightsDraftMonth, "auto");
      snapWheelToValue(insightsMonthYearsColumn, "data-wheel-year", insightsDraftYear, "auto");
    });
  }
}

function closeInsightsMonthWheel() {
  isInsightsMonthWheelOpen = false;
  insightsMonthWheelWrap?.classList.add("hidden");
}

function openAnalyticsFiltersModal() {
  analyticsFiltersModal?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeAnalyticsFiltersModal() {
  analyticsFiltersModal?.classList.add("hidden");
  closeAnalyticsMonthWheel();
  document.body.style.overflow = "";
}

function openInsightsFiltersModal() {
  insightsFiltersModal?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeInsightsFiltersModal() {
  insightsFiltersModal?.classList.add("hidden");
  closeInsightsMonthWheel();
  document.body.style.overflow = "";
}

function applyInsightsMonthWheel() {
  if (!insightsDraftYear || !insightsDraftMonth) {
    setInsightsDraftMonthFromValue(insightsSelectedMonth || getCurrentMonthValue());
  }

  insightsSelectedMonth = getInsightsDraftMonthValue();
  insightsFilterPeriod = "month";
  closeInsightsMonthWheel();
  renderInsights();
}

function resetInsightsMonthWheel() {
  setInsightsDraftMonthFromValue(getCurrentMonthValue());
  renderInsightsMonthWheel();
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
  
  function setInsightsDraftMonthFromValue(monthValue) {
  const safeValue = monthValue || getCurrentMonthValue();
  const [year, month] = safeValue.split("-");
  insightsDraftYear = year;
  insightsDraftMonth = month;
}

function getInsightsDraftMonthValue() {
  return `${insightsDraftYear}-${insightsDraftMonth}`;
}

function getInsightsPeriodLabel() {
  if (insightsFilterPeriod === "month") {
    return formatMonthLabel(insightsSelectedMonth);
  }

  if (insightsFilterPeriod === "today") {
    return "сегодня";
  }

  if (insightsFilterPeriod === "7") {
    return "за 7 дней";
  }

  if (insightsFilterPeriod === "range") {
    return formatDateRangeLabel(insightsRangeStart, insightsRangeEnd);
  }

  return "";
}

function getInsightsFilteredTransactions() {
  return filterTransactionsByPeriod(
    state.transactions,
    insightsFilterPeriod,
    insightsSelectedMonth,
    insightsRangeStart,
    insightsRangeEnd
  );
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

function getSavedToSafesBreakdown() {
  const items = getInsightsFilteredTransactions().filter((transaction) => {
    return (
      transaction.type === "transfer" &&
      (
        transaction.to_account_id === getSafeAccountId() ||
        (!transaction.to_account_id && transaction.to_account === getSafeAccountName())
      ) &&
      !(
        transaction.from_account_id === getSafeAccountId() ||
        (!transaction.from_account_id && transaction.from_account === getSafeAccountName())
      )
    );
  });

  return items.map((transaction) => ({
    title: transaction.title || "Перевод в накопления",
    amount: roundToTwo(Number(transaction.amount) || 0),
    date: formatDateShort(transaction.created_at),
  }));
}

function getProtectedMoneyBreakdown() {
  const rows = [];

  getProtectedAccounts().forEach((account) => {
    rows.push({
      label: account.name,
      amount: roundToTwo(getAccountBalance(account.id)),
    });
  });

  getProtectedSafeBuckets().forEach((bucket) => {
    rows.push({
      label: bucket.name,
      amount: roundToTwo(getSafeBucketBalance(bucket.id)),
    });
  });

  return rows.filter((item) => Math.abs(item.amount) > 0.009);
}

function buildFaqFormulaText(faqKey) {
  const summary = getInsightsSummary();

  if (faqKey === "required_expense") {
    return `${formatMoney(summary.requiredExpense)} = сумма всех обязательных expense-операций за выбранный период`;
  }

  if (faqKey === "flexible_expense") {
    return `${formatMoney(summary.flexibleExpense)} = сумма всех гибких expense-операций за выбранный период`;
  }

  if (faqKey === "saved_to_safes") {
    const rows = getSavedToSafesBreakdown();

    if (!rows.length) {
      return `${formatMoney(0)} = за выбранный период не было переводов в накопления`;
    }

    const parts = rows.map((item) => `${formatMoney(item.amount)} (${item.date})`);
    return `${formatMoney(summary.savedToSafes)} = ${parts.join(" + ")}`;
  }

  if (faqKey === "remaining_limits") {
    const rows = getRemainingFlexibleBudgetsBreakdownCurrentMonth();

    if (!rows.length) {
      return `${formatMoney(0)} = по гибким категориям не осталось запаса по лимитам`;
    }

    const lines = rows.map((item) => {
      return `${item.name}: ${formatMoney(item.limit)} − ${formatMoney(item.spent)} = ${formatMoney(item.remaining)}`;
    });

    return `${formatMoney(summary.remainingBudgets)} =\n${lines.join("\n")}`;
  }

  if (faqKey === "total_balance") {
    return `${formatMoney(summary.totalBalance)} = сумма балансов всех счетов приложения`;
  }

  if (faqKey === "protected_money") {
    const rows = getProtectedMoneyBreakdown();

    if (!rows.length) {
      return `${formatMoney(0)} = резервы и цели сейчас пустые`;
    }

    const parts = rows.map((item) => `${formatMoney(item.amount)} (${item.label})`);
    return `${formatMoney(summary.protectedMoney)} = ${parts.join(" + ")}`;
  }

  if (faqKey === "free_money") {
  const rows = [];

  getFreeMoneyAccounts().forEach((account) => {
  rows.push({
    label: account.name,
    amount: roundToTwo(getAccountBalance(account.id)),
  });
});

  state.safeBuckets
    .filter((bucket) => bucket.include_in_free_money === true)
    .forEach((bucket) => {
      rows.push({
        label: bucket.name,
        amount: roundToTwo(getSafeBucketBalance(bucket.id)),
      });
    });

  if (!rows.length) {
    return `${formatMoney(0)} = сейчас нет источников, помеченных как свободные деньги`;
  }

  const parts = rows.map((item) => `${formatMoney(item.amount)} (${item.label})`);
  return `${formatMoney(summary.freeMoney)} = ${parts.join(" + ")}`;
}

  if (faqKey === "can_save_now") {
    return `${formatMoney(summary.canSaveNow)} = max(0, ${formatMoney(summary.freeMoney)} − ${formatMoney(summary.pendingMandatoryToDeduct)} − ${formatMoney(summary.remainingBudgets)})`;
  }

  if (faqKey === "summary_recommendation") {
    const raw = roundToTwo(
      summary.freeMoney - summary.pendingMandatoryToDeduct - summary.remainingBudgets
    );

    if (raw >= 0) {
      return `${formatMoney(raw)} = ${formatMoney(summary.freeMoney)} − ${formatMoney(summary.pendingMandatoryToDeduct)} − ${formatMoney(summary.remainingBudgets)}`;
    }

    return `Не хватает ${formatMoney(Math.abs(raw))} = ${formatMoney(summary.pendingMandatoryToDeduct)} + ${formatMoney(summary.remainingBudgets)} − ${formatMoney(summary.freeMoney)}`;
  }

  return "—";
}

function openFaqModal(faqKey) {
  const meta = FAQ_META[faqKey];
  if (!meta || !faqModal) return;

  faqModalTitle.textContent = meta.title;
  faqModalText.textContent = meta.text;
  faqModalFormula.textContent = buildFaqFormulaText(faqKey);

  faqModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeFaqModal() {
  if (!faqModal) return;

  faqModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function toggleInsightsCollapse(bodyEl, arrowEl) {
  if (!bodyEl || !arrowEl) return;

  const willOpen = bodyEl.classList.contains("hidden");
  bodyEl.classList.toggle("hidden", !willOpen);
  bodyEl.classList.toggle("is-open", willOpen);
  arrowEl.classList.toggle("is-open", willOpen);
}

function setInsightsHeroState(summary) {
  if (!insightsCanSaveNowStatus || !insightsCanSaveNowHint) return;

  if (summary.shortageBeforeSafeSaving > 0) {
    insightsCanSaveNowStatus.textContent = "Сейчас рано";
    insightsCanSaveNowHint.textContent =
      `Не хватает ${formatMoney(summary.shortageBeforeSafeSaving)} после учёта обязательных и лимитов.`;
    return;
  }

  if (summary.canSaveNow > 0) {
    insightsCanSaveNowStatus.textContent = "Можно спокойно отложить";
    insightsCanSaveNowHint.textContent =
      "Сумма уже рассчитана с учётом обязательных платежей и лимитов.";
    return;
  }

  insightsCanSaveNowStatus.textContent = "Запаса нет";
  insightsCanSaveNowHint.textContent =
    "Свободные деньги сейчас полностью заняты обязательствами и лимитами.";
}

function getInsightsPeriodCaptionText() {
  if (insightsFilterPeriod === "month") return "за месяц";
  if (insightsFilterPeriod === "today") return "за сегодня";
  if (insightsFilterPeriod === "7") return "за 7 дней";
  if (insightsFilterPeriod === "range") return "за выбранный период";
  return "за период";
}

function setExpenseRing(requiredAmount, flexibleAmount) {
  if (!insightsExpenseRingRequired || !insightsExpenseRingFlexible) return;

  const total = Math.max(0, roundToTwo((Number(requiredAmount) || 0) + (Number(flexibleAmount) || 0)));
  const circumference = 2 * Math.PI * 46;

  insightsExpenseRingRequired.style.strokeDasharray = `${circumference}`;
  insightsExpenseRingFlexible.style.strokeDasharray = `${circumference}`;

  if (total <= 0) {
    insightsExpenseRingRequired.style.strokeDashoffset = `${circumference}`;
    insightsExpenseRingFlexible.style.strokeDashoffset = `${circumference}`;
    return;
  }

  const requiredRatio = Math.max(0, Math.min(1, requiredAmount / total));
  const flexibleRatio = Math.max(0, Math.min(1, flexibleAmount / total));

  const requiredLength = circumference * requiredRatio;
  const flexibleLength = circumference * flexibleRatio;

  insightsExpenseRingRequired.style.strokeDashoffset = `${circumference - requiredLength}`;
  insightsExpenseRingFlexible.style.strokeDashoffset = `${circumference - flexibleLength}`;

  insightsExpenseRingFlexible.style.transform = `rotate(${requiredRatio * 360}deg)`;
  insightsExpenseRingFlexible.style.transformOrigin = "50% 50%";
}

function animateCurrencyValue(el, value, options = {}) {
  if (!el) return;

  const duration = options.duration || 700;
  const startValue = 0;
  const endValue = Number(value) || 0;
  const startTime = performance.now();

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = roundToTwo(startValue + (endValue - startValue) * eased);
    el.textContent = formatMoney(current);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = formatMoney(endValue);
    }
  }

  requestAnimationFrame(frame);
}

function playInsightsIntro() {
  if (!insightsView || insightsView.classList.contains("hidden")) return;

  insightsView.querySelectorAll(".insights-reveal").forEach((node) => {
    node.classList.remove("is-visible");
  });

  requestAnimationFrame(() => {
    insightsView.querySelectorAll(".insights-reveal").forEach((node) => {
      node.classList.add("is-visible");
    });
  });
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

  function setActiveNav(viewName) {
  navWalletBtn?.classList.toggle("is-active", viewName === "wallet");
  navAnalyticsBtn?.classList.toggle("is-active", viewName === "analytics");
  navInsightsBtn?.classList.toggle("is-active", viewName === "insights");
}

  function showWalletView() {
  document.querySelector(".app")?.classList.remove("app--analytics");
  mainView.classList.remove("hidden");
  categoriesManagerView.classList.add("hidden");
  analyticsView.classList.add("hidden");
  insightsView.classList.add("hidden");
  closeAnalyticsMonthWheel();
  setActiveNav("wallet");
}

  function openCategoriesManager() {
  document.querySelector(".app")?.classList.remove("app--analytics");
  mainView.classList.add("hidden");
  categoriesManagerView.classList.remove("hidden");
  analyticsView.classList.add("hidden");
  insightsView.classList.add("hidden");
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
  analyticsView.classList.remove("hidden");
  insightsView.classList.add("hidden");
  setActiveNav("analytics");
  renderAnalytics();
}

  function showInsightsView() {
  document.querySelector(".app")?.classList.add("app--analytics");
  mainView.classList.add("hidden");
  categoriesManagerView.classList.add("hidden");
  analyticsView.classList.add("hidden");
  insightsView.classList.remove("hidden");
  closeAnalyticsMonthWheel();
  setActiveNav("insights");
  renderInsights();
  playInsightsIntro();
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
  budgetAmountInput.value = existing ? Number(existing.monthly_limit) : "";

  if (deleteCategoryBtn) {
    deleteCategoryBtn.classList.toggle("hidden", Boolean(category.locked));
  }

  budgetModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeBudgetModal() {
  budgetModal.classList.add("hidden");
  document.body.style.overflow = "";
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

  accountModal.classList.remove("hidden");
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

  accountModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeAccountModal() {
  if (!accountModal) return;

  accountModal.classList.add("hidden");
  document.body.style.overflow = "";
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

  safeBucketsModalTitle.textContent = getSafeAccountName() || "Накопления";
  renderSafeBucketsModal();

  safeBucketsModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeSafeBucketsModal() {
  if (!safeBucketsModal) return;

  safeBucketsModal.classList.add("hidden");
  document.body.style.overflow = "";
  newSafeBucketNameInput.value = "";
}

function openSafeBucketAmountModal(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  if (!bucket || !safeBucketAmountModal) return;

  activeSafeBucketAmountId = bucketId;

  const balance = getSafeBucketBalance(bucketId);

  safeBucketAmountModalTitle.textContent = bucket.name;
  safeBucketAmountCurrentValue.textContent = `Сейчас: ${formatMoney(balance)}`;
  safeBucketNameInput.value = bucket.name || "";
  safeBucketAmountInput.value = String(balance).replace(".", ",");

  if (deleteSafeBucketBtn) {
    deleteSafeBucketBtn.classList.toggle("hidden", Boolean(bucket.is_locked));
  }

  safeBucketAmountModal.classList.remove("hidden");
  safeBucketAmountInput.focus();
  safeBucketAmountInput.select();
}

function closeSafeBucketAmountModal() {
  if (!safeBucketAmountModal) return;

  safeBucketAmountModal.classList.add("hidden");
  activeSafeBucketAmountId = null;
  safeBucketNameInput.value = "";
  safeBucketAmountInput.value = "";

  if (deleteSafeBucketBtn) {
    deleteSafeBucketBtn.classList.add("hidden");
  }
}

function openSafeInterestRateModal() {
  const annualRate = getSafeInterestAnnualRate();

  safeInterestRateCurrentValue.textContent = `Сейчас: ${formatPercentLabel(annualRate)}`;
  safeInterestRateInput.value = String(roundToTwo(annualRate * 100)).replace(".", ",");

  safeInterestRateModal.classList.remove("hidden");
  safeInterestRateInput.focus();
  safeInterestRateInput.select();
}

function closeSafeInterestRateModal() {
  safeInterestRateModal.classList.add("hidden");
  safeInterestRateInput.value = "";
}

async function saveSafeInterestRate() {
  const normalized = safeInterestRateInput.value.replace(/\s/g, "").replace(",", ".");
  const percentValue = Number(normalized);

  if (Number.isNaN(percentValue) || percentValue < 0) {
    alert("Введи корректный процент");
    return;
  }

  const decimalRate = roundToTwo(percentValue / 100);

  const { error } = await supabaseClient
    .from("app_meta")
    .upsert({
      key: "safe_interest_annual_rate",
      value: String(decimalRate),
    });

  if (error) {
    alert("Ошибка сохранения годового процента");
    console.error(error);
    return;
  }

  await loadDataFromSupabase();
  renderSafeBucketsModal();
  closeSafeInterestRateModal();
}

function renderSafeBucketsModal() {
  if (!safeBucketsList) return;

  const totalSafeBalance = getAccountBalance(getSafeAccountId());
  const unassignedBalance = getUnassignedSafeBalance();

  safeBucketsModalTotalLabel.textContent = `Общий баланс: ${formatMoney(totalSafeBalance)}`;
  if (safeBucketsRateValue) {
    safeBucketsRateValue.textContent = formatPercentLabel(getSafeInterestAnnualRate());
  }
  safeBucketsUnassignedValue.textContent =
    Math.abs(unassignedBalance) < 0.009 ? formatMoney(0) : formatMoney(unassignedBalance);

  safeBucketsUnassignedCard?.classList.toggle(
    "safe-buckets-summary--danger",
    Math.abs(unassignedBalance) > 0.009
  );

  safeBucketsList.innerHTML = "";

  if (!state.safeBuckets.length) {
    const empty = document.createElement("div");
    empty.className = "safe-bucket-empty";
    empty.innerHTML = `
      <div class="safe-bucket-empty__title">Накоплений пока нет</div>
      <div class="safe-bucket-empty__text">Добавь первое накопление ниже</div>
    `;
    safeBucketsList.appendChild(empty);
    return;
  }

  state.safeBuckets.forEach((bucket) => {
    const balance = getSafeBucketBalance(bucket.id);
    const isLocked = Boolean(bucket.is_locked);

    const card = document.createElement("button");
    card.type = "button";
    card.className = `safe-bucket-row${isLocked ? " safe-bucket-row--system" : ""}`;
    card.dataset.safeBucketOpenId = bucket.id;

    card.innerHTML = `
      <div class="safe-bucket-row__left">
        <div class="safe-bucket-row__text">
          <div class="safe-bucket-row__title">${escapeHtml(bucket.name)}</div>
          <div class="safe-bucket-row__meta">
            ${isLocked ? "Системное накопление" : "Накопление"}
          </div>
        </div>
      </div>

      <div class="safe-bucket-row__amount">${formatMoney(balance)}</div>
    `;

    card.addEventListener("click", () => {
      openSafeBucketAmountModal(bucket.id);
    });

    safeBucketsList.appendChild(card);
  });
}

async function addSafeBucket() {
  const name = newSafeBucketNameInput.value.trim();

  if (!name) {
    alert("Введите название накопления");
    return;
  }

  const newSafeBucket = {
    name,
    icon: "",
    is_locked: false,
    sort_order: state.safeBuckets.length + 1,
  };

  const { error } = await supabaseClient
    .from("safe_buckets")
    .insert(newSafeBucket);

  if (error) {
    alert("Ошибка добавления накопления");
    console.error(error);
    return;
  }

  newSafeBucketNameInput.value = "";

  await loadDataFromSupabase();
  renderAll();
  renderSafeBucketsModal();
}

async function saveSafeBucketAmount() {
  if (!activeSafeBucketAmountId) return;

  const nextName = safeBucketNameInput.value.trim();
  const normalized = safeBucketAmountInput.value.replace(/\s/g, "").replace(",", ".");
  const nextAmount = Number(normalized);

  if (!nextName) {
    alert("Введи название накопления");
    return;
  }

  if (Number.isNaN(nextAmount) || nextAmount < 0) {
    alert("Введи корректную сумму");
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

    analyticsCategoryModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeAnalyticsCategoryModal() {
    analyticsCategoryModal.classList.add("hidden");
    activeAnalyticsCategoryId = null;
    document.body.style.overflow = "";
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

    modal.classList.remove("hidden");
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

      amountInput.value = transaction.amount;
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

      amountInput.value = transaction.amount;
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

  amountInput.value = transaction.amount;
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

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
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
  
  function getInsightsSummary() {
  const periodTransactions = getInsightsFilteredTransactions();

  let income = 0;
  let expense = 0;
  let requiredExpense = 0;
  let flexibleExpense = 0;
  let savedToSafes = 0;
  let safeInterest = 0;

  periodTransactions.forEach((transaction) => {
    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "income") {
      income += amount;

      if (
  (transaction.account_id === getSafeAccountId() ||
    (!transaction.account_id && transaction.account === getSafeAccountName())) &&
  transaction.title === "Проценты по накоплению"
) {
  safeInterest += amount;
}
    }

    if (transaction.type === "expense") {
      expense += amount;

      const categoryId = transaction.category_id || UNCATEGORIZED_ID;
      if (isRequiredCategory(categoryId)) {
        requiredExpense += amount;
      } else {
        flexibleExpense += amount;
      }
    }

    if (
  transaction.type === "transfer" &&
  (
    transaction.to_account_id === getSafeAccountId() ||
    (!transaction.to_account_id && transaction.to_account === getSafeAccountName())
  ) &&
  (
    transaction.from_account_id !== getSafeAccountId() &&
    transaction.from_account !== getSafeAccountName()
  )
) {
  savedToSafes += amount;
}
  });

  const mandatoryCoverage = getMandatoryPaymentsCoverageStats(getCurrentMonthKey());
  const remainingBudgets = getRemainingFlexibleBudgetsCurrentMonth();

  const totalBalance = roundToTwo(calculateBalance());
  const protectedMoney = getProtectedMoneyTotal();
  const freeMoney = getFreeMoneyTotal();

  const mandatoryToDeduct = mandatoryCoverage.chargeToFreeMoney;

  const canSaveNowRaw = roundToTwo(
    freeMoney - mandatoryToDeduct - remainingBudgets
  );

  const canSaveNow = Math.max(0, canSaveNowRaw);
  const shortageBeforeSafeSaving = Math.max(0, roundToTwo(-canSaveNowRaw));

  return {
    income: roundToTwo(income),
    expense: roundToTwo(expense),
    net: roundToTwo(income - expense),

    requiredExpense: roundToTwo(requiredExpense),
    flexibleExpense: roundToTwo(flexibleExpense),

    savedToSafes: roundToTwo(savedToSafes),
    safeInterest: roundToTwo(safeInterest),

    totalBalance,
    protectedMoney,
    freeMoney,

    pendingMandatoryTotal: mandatoryCoverage.total,
    pendingMandatoryCoveredByLinkedSafes: mandatoryCoverage.coveredByLinkedSafes,
    pendingMandatoryCoveredByProtectedSafes: mandatoryCoverage.coveredByProtectedSafes,
    pendingMandatoryUncoveredAfterLinkedSafes: mandatoryCoverage.uncoveredAfterLinkedSafes,
    pendingMandatoryToDeduct: mandatoryToDeduct,
    pendingMandatoryCount: mandatoryCoverage.count,

    remainingBudgets,

    canSaveNow,
    shortageBeforeSafeSaving,
  };
}

  async function applySafeInterestIfNeeded() {
  const annualRate = getSafeInterestAnnualRate();
  const dailyRate = annualRate / 365;

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

      if (bucketBalance <= 0) continue;

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

  balanceEl.textContent = formatMoney(balance);

  if (accountsTotalEl) {
    accountsTotalEl.textContent = "";
  }

  if (balanceFreeMoneyValueEl) {
    balanceFreeMoneyValueEl.textContent = `Свободно: ${formatMoney(freeMoney)}`;
  }
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

    latestTransactions.forEach((transaction) => {
      transactionsListEl.appendChild(createTransactionCard(transaction));
    });
  }

  function renderAnalyticsOperations() {
    if (!analyticsTransactionsList) return;

    analyticsTransactionsList.innerHTML = "";

    const items = getAnalyticsOperationsFilteredTransactions();

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "list-card";
      empty.innerHTML = `
        <div class="list-body">
          <h3 class="list-title">Ничего не найдено</h3>
          <p class="list-subtitle">За выбранный период нет операций</p>
        </div>
      `;
      analyticsTransactionsList.appendChild(empty);
      return;
    }

    items.forEach((transaction) => {
      analyticsTransactionsList.appendChild(createTransactionCard(transaction));
    });
  }

  function renderAnalytics() {
  if (!analyticsView) return;
  if (analyticsFilterPeriod !== "range" && analyticsFilterPeriod !== "month") {
  closeAnalyticsFiltersModal();
}

  const breakdown = getAnalyticsCategoryBreakdown();
  
    analyticsPeriodButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.analyticsPeriod === analyticsFilterPeriod);
    });

    analyticsTypeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.analyticsType === analyticsOperationType);
    });

    analyticsModeCategoriesBtn?.classList.toggle("is-active", analyticsMode === "categories");
    analyticsModeOperationsBtn?.classList.toggle("is-active", analyticsMode === "operations");

    analyticsCategoriesBreakdownSection?.classList.toggle("hidden", analyticsMode !== "categories");

    analyticsOperationsSection?.classList.toggle("hidden", analyticsMode !== "operations");
    analyticsOperationTypeFilters?.classList.toggle("hidden", analyticsMode !== "operations");

    const isAnalyticsRange = analyticsFilterPeriod === "range";

    setNativePickerVisibility(analyticsRangeFromInput, isAnalyticsRange);
    setNativePickerVisibility(analyticsRangeToInput, isAnalyticsRange);

    if (analyticsMonthBtn) {
      analyticsMonthBtn.textContent = formatMonthButtonLabel(analyticsSelectedMonth);
    }

    if (analyticsMonthWheelWrap) {
      analyticsMonthWheelWrap.classList.toggle("hidden", !isAnalyticsMonthWheelOpen);
    }

    if (analyticsSelectedPeriodLabel) {
      analyticsSelectedPeriodLabel.classList.add("hidden");
      analyticsSelectedPeriodLabel.textContent = "";
      analyticsSelectedPeriodLabel.style.display = "none";
    }

    renderAnalyticsOperations();

    const periodLabel = getAnalyticsPeriodLabel() || "Период";
    const totalExpense = breakdown.reduce((sum, item) => sum + item.amount, 0);

    if (!breakdown.length) {
      analyticsDonut.innerHTML = `
        <div class="analytics-panel">
          <div class="analytics-panel__eyebrow">Расходы по категориям</div>

          <div class="analytics-panel__headline">
            <div class="analytics-panel__total">${formatMoney(0)}</div>
            <div class="analytics-panel__period">${escapeHtml(periodLabel)}</div>
          </div>

          <div class="analytics-leader analytics-leader--empty">
            <div class="analytics-leader__left">
              <div class="analytics-breakdown-row__rank analytics-breakdown-row__rank--leader">#1</div>

              <div class="analytics-leader__content">
                <div class="analytics-leader__label">Лидер</div>
                <div class="analytics-leader__title">Нет данных</div>
                <div class="analytics-leader__meta">За выбранный период нет расходов</div>
              </div>
            </div>

            <div class="analytics-leader__value">—</div>
          </div>
        </div>
      `;

      analyticsLegend.innerHTML = `
        <div class="analytics-breakdown-list analytics-breakdown-list--empty">
          <div class="analytics-empty">Нет данных по расходам за выбранный период</div>
        </div>
      `;
      return;
    }

    const topItem = breakdown[0];
    const topPercent = totalExpense > 0 ? Math.round((topItem.amount / totalExpense) * 100) : 0;
    const topExceeded = isBudgetExceeded(topItem.amount, topItem.id);

    analyticsDonut.innerHTML = `
      <div class="analytics-panel">
        <div class="analytics-panel__eyebrow">Расходы по категориям</div>

        <div class="analytics-panel__headline">
          <div class="analytics-panel__total">${formatMoney(totalExpense)}</div>
          <div class="analytics-panel__period">${escapeHtml(periodLabel)}</div>
        </div>

        <button
          class="analytics-leader analytics-leader--button"
          type="button"
          data-analytics-category-id="${escapeHtml(topItem.id)}"
        >
          <div class="analytics-leader__left">
            <div class="analytics-breakdown-row__rank analytics-breakdown-row__rank--leader">#1</div>

            <div class="analytics-leader__content">
              <div class="analytics-leader__label">Лидер</div>
              <div class="analytics-leader__title">
  ${topItem.is_required ? '<span class="analytics-required-flag">🚩</span>' : ""}
  ${escapeHtml(topItem.name)}
</div>
              <div class="analytics-leader__meta">${topPercent}% от расходов</div>
            </div>
          </div>

          <div class="analytics-leader__value ${topExceeded ? "analytics-limit-value--danger" : ""}">
            ${getAnalyticsSpentLimitLabel(topItem.amount, topItem.id)}
          </div>
        </button>
      </div>
    `;

    const restItems = breakdown.slice(1);

    const listMarkup = restItems
      .map((item, index) => {
        const percent = totalExpense > 0 ? Math.round((item.amount / totalExpense) * 100) : 0;
        const exceeded = isBudgetExceeded(item.amount, item.id);

        return `
          <button
            class="analytics-breakdown-row analytics-breakdown-row--button"
            type="button"
            data-analytics-category-id="${escapeHtml(item.id)}"
          >
            <div class="analytics-breakdown-row__left">
              <div class="analytics-breakdown-row__rank">#${index + 2}</div>
              <div class="analytics-breakdown-row__body">
                <div class="analytics-breakdown-row__title">
  ${item.is_required ? '<span class="analytics-required-flag">🚩</span>' : ""}
  ${escapeHtml(item.name)}
</div>
                <div class="analytics-breakdown-row__subtitle">${percent}% от расходов</div>
              </div>
            </div>
            <div class="analytics-breakdown-row__value ${exceeded ? "analytics-limit-value--danger" : ""}">
              ${getAnalyticsSpentLimitLabel(item.amount, item.id)}
            </div>
          </button>
        `;
      })
      .join("");

    analyticsLegend.innerHTML = `
      <div class="analytics-breakdown-list">
        ${listMarkup}
      </div>
    `;

    analyticsDonut
      .querySelectorAll("[data-analytics-category-id]")
      .forEach((el) => {
        el.addEventListener("click", () => {
          openAnalyticsCategoryModal(el.dataset.analyticsCategoryId);
        });
      });

    analyticsLegend
      .querySelectorAll("[data-analytics-category-id]")
      .forEach((el) => {
        el.addEventListener("click", () => {
          openAnalyticsCategoryModal(el.dataset.analyticsCategoryId);
        });
      });
  }
  
  function renderInsights() {
  if (!insightsView) return;
  if (insightsFilterPeriod !== "range" && insightsFilterPeriod !== "month") {
    closeInsightsFiltersModal();
  }

  const summary = getInsightsSummary();

  insightsIncomeValue.textContent = formatMoney(summary.income);
  insightsRequiredValue.textContent = formatMoney(summary.requiredExpense);
  insightsFlexibleValue.textContent = formatMoney(summary.flexibleExpense);
  insightsSavedValue.textContent = formatMoney(summary.savedToSafes);
  insightsInterestValue.textContent = formatMoney(summary.safeInterest);

  insightsMandatoryTotalValue.textContent = formatMoney(summary.pendingMandatoryTotal);
  insightsMandatoryCoveredValue.textContent = formatMoney(summary.pendingMandatoryCoveredByLinkedSafes);
  insightsPendingMandatoryValue.textContent = formatMoney(summary.pendingMandatoryToDeduct);
  insightsRemainingBudgetsValue.textContent = formatMoney(summary.remainingBudgets);

  insightsCanSaveNowValue.classList.remove("is-positive", "is-negative");
  insightsCanSaveNowValue.classList.add(
    summary.canSaveNow > 0 ? "is-positive" : "is-negative"
  );
  insightsCanSaveNowValue.textContent =
    summary.canSaveNow > 0 ? formatMoney(summary.canSaveNow) : formatMoney(0);

  setInsightsHeroState(summary);

  if (insightsPeriodCaption) {
    insightsPeriodCaption.textContent = getInsightsPeriodCaptionText();
  }

  animateCurrencyValue(insightsExpenseValue, summary.expense, { duration: 720 });
  animateCurrencyValue(insightsTotalBalanceValue, summary.totalBalance, { duration: 720 });
  animateCurrencyValue(insightsFreeMoneyValue, summary.freeMoney, { duration: 720 });
  animateCurrencyValue(insightsProtectedMoneyValue, summary.protectedMoney, { duration: 720 });

  setExpenseRing(summary.requiredExpense, summary.flexibleExpense);

  if (insightsSafeList) {
    insightsSafeList.innerHTML = "";

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
      insightsSafeList.appendChild(row);
    });
  }

  insightsPeriodButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.insightsPeriod === insightsFilterPeriod);
  });

  const isInsightsRange = insightsFilterPeriod === "range";

  setNativePickerVisibility(insightsRangeFromInput, isInsightsRange);
  setNativePickerVisibility(insightsRangeToInput, isInsightsRange);

  if (insightsMonthBtn) {
    insightsMonthBtn.textContent = formatMonthButtonLabel(insightsSelectedMonth);
  }

  if (insightsMonthWheelWrap) {
    insightsMonthWheelWrap.classList.toggle("hidden", !isInsightsMonthWheelOpen);
  }

  if (insightsSelectedPeriodLabel) {
    insightsSelectedPeriodLabel.classList.add("hidden");
    insightsSelectedPeriodLabel.textContent = "";
    insightsSelectedPeriodLabel.style.display = "none";
  }
}

  /* =========================================================
     09. TRANSACTIONS CRUD
     ========================================================= */
  function buildTransactionFromForm() {
  const amount = Number(amountInput.value.trim());
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
    } else {
      const { error } = await supabaseClient
        .from("transactions")
        .insert(transaction);

      if (error) {
        alert("Ошибка сохранения операции");
        console.error(error);
        return;
      }
    }

    await loadDataFromSupabase();
    renderAll();
    closeModal();
  }

  async function deleteTransaction() {
    if (!editingTransactionId) return;

    const ok = confirm("Удалить эту операцию?");
    if (!ok) return;

    const { error } = await supabaseClient
      .from("transactions")
      .delete()
      .eq("id", editingTransactionId);

    if (error) {
      alert("Ошибка удаления операции");
      console.error(error);
      return;
    }

    await loadDataFromSupabase();
    renderAll();
    closeModal();
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
  const amount = amountRaw === "" ? 0 : Number(amountRaw);

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
  state.safeBuckets = safeBuckets || [];
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
  renderInsights();
}

  /* =========================================================
     12. EVENTS / LISTENERS
     ========================================================= */
  openExpenseModalBtn?.addEventListener("click", () => openModal("expense"));
  openIncomeModalBtn?.addEventListener("click", () => openModal("income"));
  openTransferModalBtn?.addEventListener("click", () => openModal("transfer"));
  fromAccountSelect?.addEventListener("change", updateTransferSafeFields);
toAccountSelect?.addEventListener("change", updateTransferSafeFields);

openExpenseBreakdownBtn?.addEventListener("click", () => {
  analyticsMode = "categories";
  showAnalyticsView();
});

  openCategoriesManagerBtn?.addEventListener("click", openCategoriesManager);
  closeCategoriesManagerBtn?.addEventListener("click", closeCategoriesManager);

  navWalletBtn?.addEventListener("click", showWalletView);
navAnalyticsBtn?.addEventListener("click", showAnalyticsView);
navInsightsBtn?.addEventListener("click", showInsightsView);
openAnalyticsFiltersBtn?.addEventListener("click", openAnalyticsFiltersModal);
closeAnalyticsFiltersBtn?.addEventListener("click", closeAnalyticsFiltersModal);

openInsightsFiltersBtn?.addEventListener("click", openInsightsFiltersModal);
closeInsightsFiltersBtn?.addEventListener("click", closeInsightsFiltersModal);

accountRoleSelect?.addEventListener("change", syncAccountPrimaryControls);

openCreateAccountModalBtn?.addEventListener("click", openCreateAccountModal);
closeAccountModalBtn?.addEventListener("click", closeAccountModal);
cancelAccountModalBtn?.addEventListener("click", closeAccountModal);
saveAccountModalBtn?.addEventListener("click", saveAccountModal);
deleteAccountModalBtn?.addEventListener("click", deleteAccountModalAction);

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

insightsFiltersModal?.addEventListener("click", (event) => {
  if (event.target === insightsFiltersModal) {
    closeInsightsFiltersModal();
  }
});

faqButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    openFaqModal(btn.dataset.faqKey);
  });
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
  
  insightsPeriodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    insightsFilterPeriod = btn.dataset.insightsPeriod;

    if (insightsFilterPeriod !== "month") {
      closeInsightsMonthWheel();
    }

    if (insightsFilterPeriod === "range") {
      const today = getTodayDateValue();
      insightsRangeStart = insightsRangeStart || today;
      insightsRangeEnd = insightsRangeEnd || today;

      if (insightsRangeFromInput) {
        insightsRangeFromInput.value = insightsRangeStart;
      }

      if (insightsRangeToInput) {
        insightsRangeToInput.value = insightsRangeEnd;
      }

      setNativePickerVisibility(insightsRangeFromInput, true);
      setNativePickerVisibility(insightsRangeToInput, true);
      openNativePicker(insightsRangeFromInput);
    }

    renderInsights();
  });
});

insightsMonthBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  insightsFilterPeriod = "month";

  if (isInsightsMonthWheelOpen) {
    closeInsightsMonthWheel();
  } else {
    openInsightsMonthWheel();
  }

  renderInsights();
});

insightsMonthResetBtn?.addEventListener("click", () => {
  resetInsightsMonthWheel();
});

insightsMonthApplyBtn?.addEventListener("click", () => {
  applyInsightsMonthWheel();
  closeInsightsFiltersModal();
});

insightsRangeFromInput?.addEventListener("change", () => {
  if (!insightsRangeFromInput.value) return;
  insightsRangeStart = insightsRangeFromInput.value;

  if (!insightsRangeEnd || insightsRangeEnd < insightsRangeStart) {
    insightsRangeEnd = insightsRangeStart;
    if (insightsRangeToInput) insightsRangeToInput.value = insightsRangeEnd;
  }

  insightsFilterPeriod = "range";
  closeInsightsMonthWheel();
  renderInsights();
});

insightsRangeToInput?.addEventListener("change", () => {
  if (!insightsRangeToInput.value) return;
  insightsRangeEnd = insightsRangeToInput.value;

  if (!insightsRangeStart || insightsRangeStart > insightsRangeEnd) {
    insightsRangeStart = insightsRangeEnd;
    if (insightsRangeFromInput) insightsRangeFromInput.value = insightsRangeStart;
  }

  insightsFilterPeriod = "range";
  closeInsightsMonthWheel();
  closeInsightsFiltersModal();
  renderInsights();
});

  analyticsModeCategoriesBtn?.addEventListener("click", () => {
    analyticsMode = "categories";
    renderAnalytics();
  });

  analyticsModeOperationsBtn?.addEventListener("click", () => {
    analyticsMode = "operations";
    renderAnalytics();
  });

  analyticsTypeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      analyticsOperationType = btn.dataset.analyticsType;
      analyticsMode = "operations";
      renderAnalytics();
    });
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
addMandatoryPaymentBtn?.addEventListener("click", addMandatoryPayment);
addSafeBucketBtn?.addEventListener("click", addSafeBucket);
closeSafeBucketAmountModalBtn?.addEventListener("click", closeSafeBucketAmountModal);
cancelSafeBucketAmountBtn?.addEventListener("click", closeSafeBucketAmountModal);
saveSafeBucketAmountBtn?.addEventListener("click", saveSafeBucketAmount);
deleteSafeBucketBtn?.addEventListener("click", deleteSafeBucketFromModal);
safeBucketsRateBtn?.addEventListener("click", openSafeInterestRateModal);
closeSafeInterestRateModalBtn?.addEventListener("click", closeSafeInterestRateModal);
cancelSafeInterestRateBtn?.addEventListener("click", closeSafeInterestRateModal);
saveSafeInterestRateBtn?.addEventListener("click", saveSafeInterestRate);
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

  if (isInsightsMonthWheelOpen && insightsMonthWheelWrap) {
    const clickedInsideInsightsPopover = insightsMonthWheelWrap.contains(event.target);
    const clickedInsightsMonthBtn = insightsMonthBtn?.contains(event.target);

    if (!clickedInsideInsightsPopover && !clickedInsightsMonthBtn) {
      closeInsightsMonthWheel();
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

  if (faqModal && !faqModal.classList.contains("hidden")) {
    closeFaqModal();
    return;
  }
  
  if (analyticsFiltersModal && !analyticsFiltersModal.classList.contains("hidden")) {
  closeAnalyticsFiltersModal();
  return;
}

if (insightsFiltersModal && !insightsFiltersModal.classList.contains("hidden")) {
  closeInsightsFiltersModal();
  return;
}

  if (isInsightsMonthWheelOpen) {
    closeInsightsMonthWheel();
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
});