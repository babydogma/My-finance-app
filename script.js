document.addEventListener("DOMContentLoaded", async () => {
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
const budgetCategoryIconInput = document.getElementById("budgetCategoryIconInput");
const budgetAmountInput = document.getElementById("budgetAmountInput");
const closeBudgetModalBtn = document.getElementById("closeBudgetModalBtn");
const saveBudgetBtn = document.getElementById("saveBudgetBtn");
const deleteBudgetBtn = document.getElementById("deleteBudgetBtn");

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
  const newCategoryIconInput = document.getElementById("newCategoryIconInput");
  const addCategoryBtn = document.getElementById("addCategoryBtn");

  const analyticsPeriodButtons = document.querySelectorAll("[data-analytics-period]");
  const analyticsIncomeValue = document.getElementById("analyticsIncomeValue");
  const analyticsExpenseValue = document.getElementById("analyticsExpenseValue");
  const analyticsNetValue = document.getElementById("analyticsNetValue");
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
  const analyticsCategoriesSection = document.getElementById("analyticsCategoriesSection");
  const analyticsTotalsSection = document.getElementById("analyticsTotalsSection");
  const analyticsCategoriesBreakdownSection = document.getElementById("analyticsCategoriesBreakdownSection");
  const analyticsOperationsSection = document.getElementById("analyticsOperationsSection");
  const analyticsTransactionsList = document.getElementById("analyticsTransactionsList");
  
    const insightsPeriodLabel = document.getElementById("insightsPeriodLabel");
  const insightsIncomeValue = document.getElementById("insightsIncomeValue");
  const insightsExpenseValue = document.getElementById("insightsExpenseValue");
  const insightsNetValue = document.getElementById("insightsNetValue");
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

  const insightsLimitsStatusText = document.getElementById("insightsLimitsStatusText");
  const insightsRecommendationText = document.getElementById("insightsRecommendationText");
  const insightsSafeList = document.getElementById("insightsSafeList");

  const mandatoryPaymentsModal = document.getElementById("mandatoryPaymentsModal");
  const openMandatoryPaymentsModalBtn = document.getElementById("openMandatoryPaymentsModalBtn");
  const closeMandatoryPaymentsModalBtn = document.getElementById("closeMandatoryPaymentsModalBtn");
  const mandatoryPaymentsList = document.getElementById("mandatoryPaymentsList");
  const mandatoryPaymentTitleInput = document.getElementById("mandatoryPaymentTitleInput");
  const mandatoryPaymentAmountInput = document.getElementById("mandatoryPaymentAmountInput");
  const mandatoryPaymentDueDayInput = document.getElementById("mandatoryPaymentDueDayInput");
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
  const newSafeBucketIconInput = document.getElementById("newSafeBucketIconInput");
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
const safeBucketIconInput = document.getElementById("safeBucketIconInput");
const safeBucketAmountInput = document.getElementById("safeBucketAmountInput");
const closeSafeBucketAmountModalBtn = document.getElementById("closeSafeBucketAmountModalBtn");
const cancelSafeBucketAmountBtn = document.getElementById("cancelSafeBucketAmountBtn");
const saveSafeBucketAmountBtn = document.getElementById("saveSafeBucketAmountBtn");
const deleteSafeBucketBtn = document.getElementById("deleteSafeBucketBtn");

  const period7Btn = document.getElementById("period7Btn");
  const period30Btn = document.getElementById("period30Btn");
  const balanceResultValueEl = document.getElementById("balanceResultValue");
  const balancePeriodLabelEl = document.getElementById("balancePeriodLabel");

  let currentMode = "expense";
  let editingTransactionId = null;
  let currentPeriodDays = 7;

  let analyticsFilterPeriod = "month";
  let analyticsSelectedMonth = getCurrentMonthValue();
  let analyticsRangeStart = "";
  let analyticsRangeEnd = "";

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

  function getCategoryById(categoryId) {
    return state.categories.find((item) => item.id === categoryId);
  }

  function getCategoryName(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.name : "Без категории";
  }

  function getCategoryIcon(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.icon : "📦";
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

function getSafeBucketName(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  return bucket ? bucket.name : "";
}

function getSafeBucketIcon(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  return bucket ? bucket.icon : "🗂️";
}

function getSafeAccountName() {
  return "Сейфы Яндекса";
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

  state.transactions.forEach((transaction) => {
    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "transfer") {
      if (
        transaction.to_account === getSafeAccountName() &&
        transaction.to_safe_bucket_id === bucketId
      ) {
        balance += amount;
      }

      if (
        transaction.from_account === getSafeAccountName() &&
        transaction.from_safe_bucket_id === bucketId
      ) {
        balance -= amount;
      }
    }

    if (transaction.type === "income" && transaction.account === getSafeAccountName()) {
      if (transaction.to_safe_bucket_id === bucketId) {
        balance += amount;
      }
    }

    if (transaction.type === "expense" && transaction.account === getSafeAccountName()) {
      const expenseBucketId = transaction.from_safe_bucket_id || freeBucketId;

      if (expenseBucketId === bucketId) {
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
  const totalSafeBalance = getAccountBalance(getSafeAccountName());
  const distributedBalance = getAllSafeBucketsBalance();
  return totalSafeBalance - distributedBalance;
}

function getFreeSafeBucket() {
  return (
    state.safeBuckets.find(
      (bucket) => String(bucket.name || "").trim().toLowerCase() === "свободные"
    ) || null
  );
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
  return getSafeBucketsByNames(["Налоги", "Квартира"]).reduce((sum, bucket) => {
    return sum + getSafeBucketBalance(bucket.id);
  }, 0);
}

function getSoftReserveSafeBalance() {
  return getSafeBucketsByNames(["Накопления"]).reduce((sum, bucket) => {
    return sum + getSafeBucketBalance(bucket.id);
  }, 0);
}

function getCashReserveBalance() {
  return getAccountBalance("Наличный резерв");
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
  const totalBalance = roundToTwo(calculateBalance());
  const protectedMoney = getProtectedMoneyTotal();
  return roundToTwo(Math.max(0, totalBalance - protectedMoney));
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
    alert("Сумма сейфа не может быть меньше нуля");
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
    title: "Корректировка сейфа",
    account: null,
    category_id: null,
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
    alert("Ошибка корректировки суммы сейфа");
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
    option.textContent = `${bucket.icon} ${bucket.name}`;

    if (selectedId && selectedId === bucket.id) {
      option.selected = true;
    }

    selectEl.appendChild(option);
  });
}

function updateTransferSafeFields() {
  const fromIsSafes = fromAccountSelect?.value === "Сейфы Яндекса";
  const toIsSafes = toAccountSelect?.value === "Сейфы Яндекса";

  fromSafeBucketField?.classList.toggle("hidden", !fromIsSafes);
  toSafeBucketField?.classList.toggle("hidden", !toIsSafes);

  if (!fromIsSafes && fromSafeBucketSelect) {
    fromSafeBucketSelect.value = "";
  }

  if (!toIsSafes && toSafeBucketSelect) {
    toSafeBucketSelect.value = "";
  }

  if (fromIsSafes) {
    fillSafeBucketSelect(fromSafeBucketSelect, "Из какого сейфа", fromSafeBucketSelect?.value || "");
  }

  if (toIsSafes) {
    fillSafeBucketSelect(toSafeBucketSelect, "В какой сейф", toSafeBucketSelect?.value || "");
  }
}

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

function openMandatoryPaymentsModal() {
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

      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-icon ${isPaid ? "list-icon--green" : "list-icon--red"}">
          ${isPaid ? "✓" : "!"}
        </div>

        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(item.title)}</h3>
          </div>
          <p class="list-subtitle">
            ${formatMoney(item.amount)} • до ${item.due_day} числа • ${isPaid ? "Оплачен" : "Не оплачен"}
          </p>
        </div>

        <div class="category-manager-actions">
          <button class="mini-btn mini-btn-type" type="button" data-toggle-mandatory-id="${item.id}">
            ${isPaid ? "Снять" : "Оплат."}
          </button>
          <button class="mini-btn mini-btn-delete" type="button" data-delete-mandatory-id="${item.id}">
            Удал.
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
  const dueDay = Number(mandatoryPaymentDueDayInput.value);

  if (!title) {
    alert("Введи название платежа");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Введи корректную сумму");
    return;
  }

  if (!dueDay || dueDay < 1 || dueDay > 31) {
    alert("Введи день месяца от 1 до 31");
    return;
  }

  state.mandatoryPayments.push({
    id: crypto.randomUUID(),
    title,
    amount: roundToTwo(amount),
    due_day: dueDay,
    enabled: true,
    last_paid_period: "",
  });

  const ok = await saveMandatoryPaymentsToMeta();
  if (!ok) return;

  mandatoryPaymentTitleInput.value = "";
  mandatoryPaymentAmountInput.value = "";
  mandatoryPaymentDueDayInput.value = "";

  renderMandatoryPaymentsModal();
  renderAll();
}

  function getDateOnlyString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getSafeBalance() {
    return getAccountBalance("Сейфы Яндекса");
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
      option.textContent = `${category.icon} ${category.name}`;

      if (selectedId && selectedId === category.id) {
        option.selected = true;
      }

      categorySelect.appendChild(option);
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
}

  function openBudgetModal(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return;

  activeBudgetCategoryId = categoryId;

  const existing = getBudgetLimitByCategoryId(categoryId);

  budgetModalTitle.textContent = `Редактирование: ${category.icon} ${category.name}`;
  budgetCategoryNameInput.value = category.name || "";
  budgetCategoryIconInput.value = category.icon || "";
  budgetAmountInput.value = existing ? Number(existing.monthly_limit) : "";
  deleteBudgetBtn.classList.toggle("hidden", !existing);

  budgetModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeBudgetModal() {
  budgetModal.classList.add("hidden");
  document.body.style.overflow = "";
  activeBudgetCategoryId = null;
  budgetCategoryNameInput.value = "";
  budgetCategoryIconInput.value = "";
  budgetAmountInput.value = "";
}
  
  function openSafeBucketsModal() {
  if (!safeBucketsModal) return;

  safeBucketsModalTitle.textContent = "Сейфы Яндекса";
  renderSafeBucketsModal();

  safeBucketsModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeSafeBucketsModal() {
  if (!safeBucketsModal) return;

  safeBucketsModal.classList.add("hidden");
  document.body.style.overflow = "";
  newSafeBucketNameInput.value = "";
  newSafeBucketIconInput.value = "";
}

function openSafeBucketAmountModal(bucketId) {
  const bucket = getSafeBucketById(bucketId);
  if (!bucket || !safeBucketAmountModal) return;

  activeSafeBucketAmountId = bucketId;

  const balance = getSafeBucketBalance(bucketId);

  safeBucketAmountModalTitle.textContent = `${bucket.icon} ${bucket.name}`;
  safeBucketAmountCurrentValue.textContent = `Сейчас: ${formatMoney(balance)}`;
  safeBucketNameInput.value = bucket.name || "";
  safeBucketIconInput.value = bucket.icon || "";
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
  safeBucketIconInput.value = "";
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

  const totalSafeBalance = getAccountBalance(getSafeAccountName());
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
      <div class="safe-bucket-empty__title">Сейфов пока нет</div>
      <div class="safe-bucket-empty__text">Добавь первый внутренний сейф ниже</div>
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
        <div class="safe-bucket-row__icon">${bucket.icon}</div>

        <div class="safe-bucket-row__text">
          <div class="safe-bucket-row__title">${escapeHtml(bucket.name)}</div>
          <div class="safe-bucket-row__meta">
            ${isLocked ? "Системный сейф" : "Внутренний сейф"}
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
  const icon = newSafeBucketIconInput.value.trim() || "🗂️";

  if (!name) {
    alert("Введите название сейфа");
    return;
  }

  const newSafeBucket = {
    name,
    icon,
    is_locked: false,
    sort_order: state.safeBuckets.length + 1,
  };

  const { error } = await supabaseClient
    .from("safe_buckets")
    .insert(newSafeBucket);

  if (error) {
    alert("Ошибка добавления сейфа");
    console.error(error);
    return;
  }

  newSafeBucketNameInput.value = "";
  newSafeBucketIconInput.value = "";

  await loadDataFromSupabase();
  renderAll();
  renderSafeBucketsModal();
}

async function saveSafeBucketAmount() {
  if (!activeSafeBucketAmountId) return;

  const nextName = safeBucketNameInput.value.trim();
  const nextIcon = safeBucketIconInput.value.trim();
  const normalized = safeBucketAmountInput.value.replace(/\s/g, "").replace(",", ".");
  const nextAmount = Number(normalized);

  if (!nextName) {
    alert("Введи название сейфа");
    return;
  }

  if (!nextIcon) {
    alert("Введи эмодзи сейфа");
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
      icon: nextIcon,
    })
    .eq("id", activeSafeBucketAmountId);

  if (updateBucketError) {
    alert("Ошибка сохранения сейфа");
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
    alert("Нельзя удалить сейф, пока в нём есть деньги");
    return;
  }

  const ok = confirm(`Удалить сейф "${bucket.name}"?`);
  if (!ok) return;

  const { error } = await supabaseClient
    .from("safe_buckets")
    .delete()
    .eq("id", bucket.id);

  if (error) {
    alert("Ошибка удаления сейфа");
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
      ? "💸 Переводы"
      : `${getCategoryIcon(categoryId)} ${getCategoryName(categoryId)}`;

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
    fromSafeBucketSelect.innerHTML = `<option value="">Из какого сейфа</option>`;
    fromSafeBucketSelect.value = "";
  }

  if (toSafeBucketSelect) {
    toSafeBucketSelect.innerHTML = `<option value="">В какой сейф</option>`;
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
      accountSelect.value = "Сейфы Яндекса";
    } else if (mode === "income") {
      modalTitle.textContent = "Добавить доход";
      saveBtn.textContent = "Сохранить доход";

      categoryField.classList.add("hidden");
      accountField.classList.remove("hidden");
      fromAccountField.classList.add("hidden");
      toAccountField.classList.add("hidden");

      accountSelect.value = "Яндекс Банк";
   } else if (mode === "transfer") {
  modalTitle.textContent = "Сделать перевод";
  saveBtn.textContent = "Сохранить перевод";

  categoryField.classList.add("hidden");
  accountField.classList.add("hidden");
  fromAccountField.classList.remove("hidden");
  toAccountField.classList.remove("hidden");

  fromAccountSelect.value = "Яндекс Банк";
  toAccountSelect.value = "Наличные";

  fromSafeBucketField.classList.add("hidden");
  toSafeBucketField.classList.add("hidden");

  fillSafeBucketSelect(fromSafeBucketSelect, "Из какого сейфа");
  fillSafeBucketSelect(toSafeBucketSelect, "В какой сейф");
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
      accountSelect.value = transaction.account;
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
      accountSelect.value = transaction.account;
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
  fromAccountSelect.value = transaction.from_account;
  toAccountSelect.value = transaction.to_account;
  commentInput.value = transaction.title === "Перевод" ? "" : transaction.title;

  fillSafeBucketSelect(
    fromSafeBucketSelect,
    "Из какого сейфа",
    transaction.from_safe_bucket_id || ""
  );
  fillSafeBucketSelect(
    toSafeBucketSelect,
    "В какой сейф",
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

  function getAccountBalance(accountName) {
    let balance = 0;

    state.transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "transfer") {
        if (transaction.from_account === accountName) balance -= amount;
        if (transaction.to_account === accountName) balance += amount;
        return;
      }

      if (transaction.account !== accountName) return;

      if (transaction.type === "income") balance += amount;
      if (transaction.type === "expense") balance -= amount;
    });

    return balance;
  }

  function calculateBalance() {
    return state.accounts.reduce((sum, account) => sum + getAccountBalance(account.name), 0);
  }

  function getPeriodTransactions(days) {
    const now = Date.now();
    const rangeStart = now - days * 24 * 60 * 60 * 1000;

    return state.transactions.filter((transaction) => {
      if (!transaction.created_at) return false;
      const transactionTime = new Date(transaction.created_at).getTime();
      return transactionTime >= rangeStart;
    });
  }

  function calculatePeriodResult(days) {
    const periodTransactions = getPeriodTransactions(days);

    let income = 0;
    let expense = 0;

    periodTransactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") income += amount;
      if (transaction.type === "expense") expense += amount;
    });

    return income - expense;
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
  const periodTransactions = getAnalyticsFilteredTransactions();

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
        transaction.account === getSafeAccountName() &&
        transaction.title === "Проценты по сейфу"
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
      transaction.to_account === getSafeAccountName() &&
      transaction.from_account !== getSafeAccountName()
    ) {
      savedToSafes += amount;
    }
  });

  const pendingMandatoryStats = getMandatoryPaymentsStats(getCurrentMonthKey());
  const pendingMandatory = pendingMandatoryStats.total;
  const remainingBudgets = getRemainingFlexibleBudgetsCurrentMonth();

  const totalBalance = roundToTwo(calculateBalance());
  const protectedMoney = getProtectedMoneyTotal();
  const freeMoney = getFreeMoneyTotal();

  const canSaveNowRaw = roundToTwo(
    freeMoney - pendingMandatory - remainingBudgets
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

    pendingMandatory,
    pendingMandatoryCount: pendingMandatoryStats.count,
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
        title: "Проценты по сейфу",
        account: getSafeAccountName(),
        category_id: null,
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
        alert("Ошибка начисления процентов по сейфам");
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

  function renderBalance() {
    const balance = calculateBalance();
    balanceEl.textContent = formatMoney(balance);
    accountsTotalEl.textContent = `Всего: ${formatMoney(balance)}`;
  }

  function renderBalanceResult() {
    if (!balanceResultValueEl || !balancePeriodLabelEl) return;

    const result = calculatePeriodResult(currentPeriodDays);

    balanceResultValueEl.classList.remove("is-positive", "is-negative");

    if (result > 0) {
      balanceResultValueEl.textContent = `+${formatMoney(result)}`;
      balanceResultValueEl.classList.add("is-positive");
    } else if (result < 0) {
      balanceResultValueEl.textContent = `−${formatMoney(Math.abs(result))}`;
      balanceResultValueEl.classList.add("is-negative");
    } else {
      balanceResultValueEl.textContent = formatMoney(0);
    }

    balancePeriodLabelEl.textContent =
      currentPeriodDays === 7 ? "за 7 дней" : "за месяц";

    period7Btn?.classList.toggle("is-active", currentPeriodDays === 7);
    period30Btn?.classList.toggle("is-active", currentPeriodDays === 30);
  }

  function renderAccounts() {
  accountsListEl.innerHTML = "";

  state.accounts.forEach((account) => {
    const currentBalance = getAccountBalance(account.name);

    const card = document.createElement("div");
    card.className = "list-card";

    if (account.name === getSafeAccountName()) {
      card.classList.add("list-card--clickable");
    }

    const accountTone =
      account.id === "yandex"
        ? "list-icon--green"
        : account.id === "cash"
        ? "list-icon--blue"
        : account.id === "cash_reserve"
        ? "list-icon--neutral"
        : "list-icon--amber";

    card.innerHTML = `
      <div class="list-icon ${accountTone}">${account.icon}</div>
      <div class="list-body">
        <div class="list-title-row">
          <h3 class="list-title">${escapeHtml(account.name)}</h3>
        </div>
        <p class="list-subtitle">${escapeHtml(account.subtitle)}</p>
      </div>
      <div class="list-right">
        <p class="list-value">${formatMoney(currentBalance)}</p>
      </div>
    `;

    if (account.name === getSafeAccountName()) {
      card.addEventListener("click", openSafeBucketsModal);
    }

    accountsListEl.appendChild(card);
  });
}

  function renderCategoriesManager() {
    categoriesManagerList.innerHTML = "";

    state.categories.forEach((category) => {
      const card = document.createElement("div");
      card.className = "list-card";

      const lockedAttr = category.locked ? "disabled" : "";
      const lockedSubtitle = category.locked ? "Системная категория" : "Можно редактировать";

      const managerTone =
        category.id === "food"
          ? "list-icon--green"
          : category.id === "transport"
          ? "list-icon--blue"
          : category.id === "fun"
          ? "list-icon--purple"
          : category.id === "snack"
          ? "list-icon--amber"
          : "list-icon--neutral";

      card.innerHTML = `
  <div class="list-icon ${managerTone}">${category.icon}</div>

  <div class="list-body">
    <div class="list-title-row">
      <h3 class="list-title">${escapeHtml(category.name)}</h3>
      ${category.is_required ? '<span class="category-required-flag">🚩</span>' : ""}
    </div>
    <p class="list-subtitle">${lockedSubtitle} • ${category.is_required ? "Обязательная" : "Гибкая"}</p>
  </div>

  <div class="category-manager-actions">
    <button class="mini-btn mini-btn-edit" type="button" data-edit-id="${category.id}" ${lockedAttr}>
      Изм.
    </button>
    <button class="mini-btn mini-btn-type" type="button" data-type-id="${category.id}" ${lockedAttr}>
      ${category.is_required ? "Гибкая" : "Обязат."}
    </button>
    <button class="mini-btn mini-btn-delete" type="button" data-delete-id="${category.id}" ${lockedAttr}>
      Удал.
    </button>
  </div>
`;

      const editBtn = card.querySelector("[data-edit-id]");
const typeBtn = card.querySelector("[data-type-id]");
const deleteBtn = card.querySelector("[data-delete-id]");

      editBtn?.addEventListener("click", () => {
  openBudgetModal(category.id);
});
      
      typeBtn?.addEventListener("click", async () => {
  if (category.locked) return;

  const { error } = await supabaseClient
    .from("categories")
    .update({ is_required: !category.is_required })
    .eq("id", category.id);

  if (error) {
    alert("Ошибка обновления типа категории");
    console.error(error);
    return;
  }

  await loadDataFromSupabase();
  renderAll();
});

      deleteBtn?.addEventListener("click", async () => {
        if (category.locked) return;

        const ok = confirm(
          `Удалить категорию "${category.name}"? Все старые расходы перейдут в "Без категории". Лимит бюджета тоже удалится.`
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
          alert("Ошибка удаления лимита бюджета");
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
      });

      categoriesManagerList.appendChild(card);
    });
  }

  function createTransactionCard(transaction) {
    const card = document.createElement("div");
    card.className = "list-card list-card--clickable";

    const icon =
      transaction.type === "income"
        ? "💰"
        : transaction.type === "transfer"
        ? "↗"
        : getCategoryIcon(transaction.category_id || UNCATEGORIZED_ID);

    const toneKey =
      transaction.type === "expense" ? transaction.category_id || UNCATEGORIZED_ID : "";

    const iconToneClass = getIconToneClass(transaction.type, toneKey);

    let subtitle = "";
    let signedAmount = "";
    let valueClass = "list-value";

    if (transaction.type === "transfer") {
  const fromLabel =
    transaction.from_account === "Сейфы Яндекса" && transaction.from_safe_bucket_id
      ? `${transaction.from_account} • ${getSafeBucketName(transaction.from_safe_bucket_id)}`
      : transaction.from_account;

  const toLabel =
    transaction.to_account === "Сейфы Яндекса" && transaction.to_safe_bucket_id
      ? `${transaction.to_account} • ${getSafeBucketName(transaction.to_safe_bucket_id)}`
      : transaction.to_account;

  subtitle = `${escapeHtml(fromLabel)} → ${escapeHtml(toLabel)}`;
  signedAmount = formatMoney(transaction.amount);
}

else if (transaction.type === "income") {
  const incomeBucketLabel =
    transaction.account === getSafeAccountName() && transaction.to_safe_bucket_id
      ? ` • ${getSafeBucketName(transaction.to_safe_bucket_id)}`
      : "";

  subtitle = `${escapeHtml(transaction.account)}${escapeHtml(incomeBucketLabel)} • доход`;
  signedAmount = `+${formatMoney(transaction.amount)}`;
  valueClass = "list-value list-value--green";

     } else {
      subtitle = `${escapeHtml(getCategoryName(transaction.category_id || UNCATEGORIZED_ID))} • ${escapeHtml(transaction.account)}`;
      signedAmount = `−${formatMoney(transaction.amount)}`;
      valueClass = "list-value list-value--red";
    }

    const shortDate = formatDateShort(transaction.created_at);
    const timeLabel = transaction.time_label || "";
    const caption = `${shortDate}${shortDate && timeLabel ? " • " : ""}${timeLabel}`;

    card.innerHTML = `
      <div class="list-icon ${iconToneClass}">${icon}</div>
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

    const summary = getAnalyticsSummary();
    const breakdown = getAnalyticsCategoryBreakdown();

    analyticsIncomeValue.textContent = formatMoney(summary.income);
    analyticsExpenseValue.textContent = formatMoney(summary.expense);

    analyticsNetValue.classList.remove("is-positive", "is-negative");

    if (summary.net > 0) {
      analyticsNetValue.textContent = `+${formatMoney(summary.net)}`;
      analyticsNetValue.classList.add("is-positive");
    } else if (summary.net < 0) {
      analyticsNetValue.textContent = `−${formatMoney(Math.abs(summary.net))}`;
      analyticsNetValue.classList.add("is-negative");
    } else {
      analyticsNetValue.textContent = formatMoney(0);
    }

    analyticsPeriodButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.analyticsPeriod === analyticsFilterPeriod);
    });

    analyticsTypeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.analyticsType === analyticsOperationType);
    });

    analyticsModeCategoriesBtn?.classList.toggle("is-active", analyticsMode === "categories");
    analyticsModeOperationsBtn?.classList.toggle("is-active", analyticsMode === "operations");

    analyticsCategoriesSection?.classList.toggle("hidden", analyticsMode !== "categories");
    analyticsTotalsSection?.classList.toggle("hidden", analyticsMode !== "categories");
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
  ${escapeHtml(topItem.icon)} ${escapeHtml(topItem.name)}
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
  ${escapeHtml(item.icon)} ${escapeHtml(item.name)}
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

  const summary = getInsightsSummary();
  const periodLabel = getAnalyticsPeriodLabel() || "за период";

  insightsPeriodLabel.textContent = periodLabel;

  insightsIncomeValue.textContent = formatMoney(summary.income);
  insightsExpenseValue.textContent = formatMoney(summary.expense);
  insightsRequiredValue.textContent = formatMoney(summary.requiredExpense);
  insightsFlexibleValue.textContent = formatMoney(summary.flexibleExpense);
  insightsSavedValue.textContent = formatMoney(summary.savedToSafes);
  insightsInterestValue.textContent = formatMoney(summary.safeInterest);

  insightsTotalBalanceValue.textContent = formatMoney(summary.totalBalance);
  insightsProtectedMoneyValue.textContent = formatMoney(summary.protectedMoney);
  insightsFreeMoneyValue.textContent = formatMoney(summary.freeMoney);
  insightsPendingMandatoryValue.textContent = formatMoney(summary.pendingMandatory);
  insightsRemainingBudgetsValue.textContent = formatMoney(summary.remainingBudgets);

  insightsNetValue.classList.remove("is-positive", "is-negative");
  if (summary.net > 0) {
    insightsNetValue.textContent = `+${formatMoney(summary.net)}`;
    insightsNetValue.classList.add("is-positive");
  } else if (summary.net < 0) {
    insightsNetValue.textContent = `−${formatMoney(Math.abs(summary.net))}`;
    insightsNetValue.classList.add("is-negative");
  } else {
    insightsNetValue.textContent = formatMoney(0);
  }

  insightsCanSaveNowValue.classList.remove("is-positive", "is-negative");
  if (summary.canSaveNow > 0) {
    insightsCanSaveNowValue.textContent = formatMoney(summary.canSaveNow);
    insightsCanSaveNowValue.classList.add("is-positive");
  } else {
    insightsCanSaveNowValue.textContent = formatMoney(0);
    insightsCanSaveNowValue.classList.add("is-negative");
  }

  insightsLimitsStatusText.textContent =
    `Неоплаченные обязательные: ${formatMoney(summary.pendingMandatory)} • ` +
    `Остаток лимитов: ${formatMoney(summary.remainingBudgets)}`;

  if (summary.shortageBeforeSafeSaving > 0) {
    insightsRecommendationText.textContent =
      `Откладывать сейчас рано. До покрытия обязательных платежей и остатков лимитов не хватает ${formatMoney(summary.shortageBeforeSafeSaving)}.`;
  } else if (summary.canSaveNow > 0) {
    insightsRecommendationText.textContent =
      `Сейчас можно отложить ${formatMoney(summary.canSaveNow)} без конфликта с обязательными платежами и лимитами.`;
  } else {
    insightsRecommendationText.textContent =
      `Свободные деньги полностью заняты обязательствами текущего месяца.`;
  }

  if (insightsSafeList) {
    insightsSafeList.innerHTML = "";

    state.safeBuckets.forEach((bucket) => {
      const row = document.createElement("div");
      row.className = "list-card";
      row.innerHTML = `
        <div class="list-icon list-icon--amber">${bucket.icon}</div>
        <div class="list-body">
          <div class="list-title-row">
            <h3 class="list-title">${escapeHtml(bucket.name)}</h3>
          </div>
          <p class="list-subtitle">${bucket.is_locked ? "Системный сейф" : "Внутренний сейф"}</p>
        </div>
        <div class="list-right">
          <p class="list-value">${formatMoney(getSafeBucketBalance(bucket.id))}</p>
        </div>
      `;
      insightsSafeList.appendChild(row);
    });
  }
}

  function buildTransactionFromForm() {
    const amount = Number(amountInput.value.trim());
    const comment = commentInput.value.trim();

    if (!amount || amount <= 0) {
      alert("Введи сумму");
      return null;
    }

    const selectedDate = dateInput.value || getTodayDateValue();
    const existingTimePart = editingTransactionId
      ? state.transactions.find((item) => item.id === editingTransactionId)?.created_at
      : null;

    const preservedTime = existingTimePart
      ? String(existingTimePart).slice(11, 19) || new Date().toTimeString().slice(0, 8)
      : new Date().toTimeString().slice(0, 8);

    const createdAt = `${selectedDate}T${preservedTime}`;

    if (currentMode === "transfer") {
  const fromAccount = fromAccountSelect.value;
  const toAccount = toAccountSelect.value;
  const fromSafeBucketId =
    fromAccount === "Сейфы Яндекса" ? fromSafeBucketSelect.value : null;
  const toSafeBucketId =
    toAccount === "Сейфы Яндекса" ? toSafeBucketSelect.value : null;

  if (fromAccount === "С какого счёта") {
    alert("Выбери счёт списания");
    return null;
  }

  if (toAccount === "На какой счёт") {
    alert("Выбери счёт зачисления");
    return null;
  }

  if (fromAccount === toAccount) {
    const sameBuckets =
      fromAccount !== "Сейфы Яндекса" ||
      (fromSafeBucketId && toSafeBucketId && fromSafeBucketId === toSafeBucketId);

    if (sameBuckets) {
      alert("Счета должны быть разными");
      return null;
    }
  }

  if (fromAccount === "Сейфы Яндекса" && !fromSafeBucketId) {
    alert("Выбери сейф списания");
    return null;
  }

  if (toAccount === "Сейфы Яндекса" && !toSafeBucketId) {
    alert("Выбери сейф зачисления");
    return null;
  }

  return {
    id: editingTransactionId || crypto.randomUUID(),
    type: "transfer",
    title: comment || "Перевод",
    account: null,
    category_id: null,
    from_account: fromAccount,
    to_account: toAccount,
    from_safe_bucket_id: fromSafeBucketId,
    to_safe_bucket_id: toSafeBucketId,
    amount,
    time_label: getCurrentTime(),
    created_at: createdAt,
  };
}

    const account = accountSelect.value;

    if (account === "Выбери счёт") {
      alert("Выбери счёт");
      return null;
    }

    if (currentMode === "income") {
      return {
        id: editingTransactionId || crypto.randomUUID(),
        type: "income",
        title: comment || "Новый доход",
        account,
        category_id: null,
        from_account: null,
        to_account: null,
        amount,
        time_label: getCurrentTime(),
        created_at: createdAt,
      };
    }

    const categoryId = categorySelect.value;

    if (!categoryId) {
      alert("Выбери категорию");
      return null;
    }

    const freeSafeBucket = account === getSafeAccountName() ? getFreeSafeBucket() : null;

if (account === getSafeAccountName() && !freeSafeBucket) {
  alert('Не найден сейф "Свободные". Создай его или переименуй существующий.');
  return null;
}

return {
  id: editingTransactionId || crypto.randomUUID(),
  type: "expense",
  title: comment || "Новая трата",
  account,
  category_id: categoryId,
  from_account: null,
  to_account: null,
  from_safe_bucket_id: freeSafeBucket?.id || null,
  to_safe_bucket_id: null,
  amount,
  time_label: getCurrentTime(),
  created_at: createdAt,
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

  async function addCategory() {
    const name = newCategoryNameInput.value.trim();
    const icon = newCategoryIconInput.value.trim() || "📦";

    if (!name) {
      alert("Введите название категории");
      return;
    }

    const newCategory = {
  id: crypto.randomUUID(),
  name,
  icon,
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
    newCategoryIconInput.value = "";

    await loadDataFromSupabase();
    renderAll();
  }

async function saveBudgetLimit() {
  if (!activeBudgetCategoryId) return;

  const nextName = budgetCategoryNameInput.value.trim();
  const nextIcon = budgetCategoryIconInput.value.trim();
  const amount = Number(budgetAmountInput.value.trim());

  if (!nextName) {
    alert("Введи название категории");
    return;
  }

  if (!nextIcon) {
    alert("Введи эмодзи категории");
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
      icon: nextIcon,
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

  async function deleteBudgetLimit() {
    if (!activeBudgetCategoryId) return;

    const ok = confirm("Удалить лимит для этой категории?");
    if (!ok) return;

    const { error } = await supabaseClient
      .from("budget_limits")
      .delete()
      .eq("category_id", activeBudgetCategoryId);

    if (error) {
      alert("Ошибка удаления лимита");
      console.error(error);
      return;
    }

    await loadDataFromSupabase();
    renderAll();
    closeBudgetModal();
  }

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
    alert("Ошибка загрузки сейфов из Supabase");
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
  renderBalanceResult();
  renderAccounts();
  renderCategoriesManager();
  renderTransactions();
  renderAnalytics();
  renderInsights();
}

  openExpenseModalBtn?.addEventListener("click", () => openModal("expense"));
  openIncomeModalBtn?.addEventListener("click", () => openModal("income"));
  openTransferModalBtn?.addEventListener("click", () => openModal("transfer"));
  fromAccountSelect?.addEventListener("change", updateTransferSafeFields);
toAccountSelect?.addEventListener("change", updateTransferSafeFields);

  openCategoriesManagerBtn?.addEventListener("click", openCategoriesManager);
  closeCategoriesManagerBtn?.addEventListener("click", closeCategoriesManager);

  navWalletBtn?.addEventListener("click", showWalletView);
navAnalyticsBtn?.addEventListener("click", showAnalyticsView);
navInsightsBtn?.addEventListener("click", showInsightsView);

  openMandatoryPaymentsModalBtn?.addEventListener("click", openMandatoryPaymentsModal);
  closeMandatoryPaymentsModalBtn?.addEventListener("click", closeMandatoryPaymentsModal);
  addMandatoryPaymentBtn?.addEventListener("click", addMandatoryPayment);

  mandatoryPaymentsModal?.addEventListener("click", (event) => {
    if (event.target === mandatoryPaymentsModal) closeMandatoryPaymentsModal();
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
    renderAnalytics();
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
  deleteBudgetBtn?.addEventListener("click", deleteBudgetLimit);
  closeSafeBucketsModalBtn?.addEventListener("click", closeSafeBucketsModal);
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
    if (!isAnalyticsMonthWheelOpen || !analyticsMonthWheelWrap) return;

    const clickedInsidePopover = analyticsMonthWheelWrap.contains(event.target);
    const clickedMonthBtn = analyticsMonthBtn?.contains(event.target);

    if (!clickedInsidePopover && !clickedMonthBtn) {
      closeAnalyticsMonthWheel();
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
    
    if (safeBucketsModal && !safeBucketsModal.classList.contains("hidden")) {
  closeSafeBucketsModal();
  return;
}

    if (safeBucketAmountModal && !safeBucketAmountModal.classList.contains("hidden")) {
  closeSafeBucketAmountModal();
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

    if (isAnalyticsMonthWheelOpen) {
      closeAnalyticsMonthWheel();
    }
    
    if (safeInterestRateModal && !safeInterestRateModal.classList.contains("hidden")) {
  closeSafeInterestRateModal();
  return;
}
  });

  period7Btn?.addEventListener("click", () => {
    currentPeriodDays = 7;
    renderBalanceResult();
  });

  period30Btn?.addEventListener("click", () => {
    currentPeriodDays = 30;
    renderBalanceResult();
  });

  await loadDataFromSupabase();
  await applySafeInterestIfNeeded();
  await loadDataFromSupabase();
  renderAll();
  showWalletView();
});