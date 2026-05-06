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
    closeAnimatedModal(budgetAnalyticsModal);

    window.setTimeout(() => {
      openAnalyticsCategoryModal?.(categoryId);
    }, 140);
  },
});

function getBudgetAnalyticsPeriodNote() {
  if (budgetAnalyticsFilterPeriod === "today") {
    return `${getBudgetAnalyticsKindLabel()} за сегодня`;
  }

  if (budgetAnalyticsFilterPeriod === "7") {
    return `${getBudgetAnalyticsKindLabel()} за 7 дней`;
  }

  if (budgetAnalyticsFilterPeriod === "range") {
    if (budgetAnalyticsRangeStart && budgetAnalyticsRangeEnd) {
      return `${getBudgetAnalyticsKindLabel()} за выбранный период`;
    }

    return `${getBudgetAnalyticsKindLabel()} за период`;
  }

  return `${getBudgetAnalyticsKindLabel()} за ${formatMonthLabel(budgetAnalyticsSelectedMonth)}`;
}

function getBudgetAnalyticsKindLabel() {
  if (budgetAnalyticsKindFilter === "all") return "все расходы";
  if (budgetAnalyticsKindFilter === "required") return "обязательные расходы";

  return "гибкие расходы";
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
    analyticsRangeSelectedLabel.textContent = "Выбери период";
    return;
  }

  analyticsRangeSelectedLabel.textContent =
    `${getRangeShortDateLabel(analyticsRangeDraftStart)} — ${getRangeShortDateLabel(analyticsRangeDraftEnd)}`;
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
    alert("Сейфы Яндекса нельзя удалить как обычный счёт");
    return;
  }

  const ok = confirm(`Удалить счёт "${account.name}"? Операции останутся в истории.`);
  if (!ok) return;

  const { error: accountDetachError } = await supabaseClient
    .from("transactions")
    .update({
      account_id: null,
      account: account.name,
    })
    .eq("account_id", account.id);

  if (accountDetachError) {
    alert(`Ошибка отвязки операций счёта: ${accountDetachError.message || "unknown error"}`);
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
    alert(`Ошибка отвязки переводов со счёта: ${fromDetachError.message || "unknown error"}`);
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
    alert(`Ошибка отвязки переводов на счёт: ${toDetachError.message || "unknown error"}`);
    console.error(toDetachError);
    return;
  }

  const { error: deleteError } = await supabaseClient
    .from("accounts")
    .delete()
    .eq("id", activeAccountId);

  if (deleteError) {
    alert(`Ошибка удаления счёта: ${deleteError.message || "unknown error"}`);
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
  
  const activeSafeBucket = state.safeBuckets.find((item) => {
  return item.id === activeSafeBucketAmountId;
});

if (activeSafeBucket) {
  safeBucketAmountModalTitle.textContent = activeSafeBucket.name || "Накопление";
  safeBucketNameInput.value = activeSafeBucket.name || "";
  deleteSafeBucketBtn?.classList.remove("hidden");
}

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

  const totalSafeBalance = roundToTwo(
    getRealSafeBuckets().reduce((sum, bucket) => {
      return sum + getSafeBucketBalance(bucket.id);
    }, 0)
  );

  safeBucketsUnassignedCard?.remove();

  if (safeBucketsModalTotalLabel) {
    safeBucketsModalTotalLabel.textContent = `Общий баланс: ${formatMoney(totalSafeBalance)}`;
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
    <p class="list-subtitle">${lockedLabel}</p>
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
    
    // проверяем остаток для перевода
let fromBalance = getAccountBalance(fromAccountId);
if (isVaultAccountId(fromAccountId) && fromSafeBucketId) {
  // если переводим из накопления, берем баланс выбранного накопления
  fromBalance = getSafeBucketBalance(fromSafeBucketId);
}
if (amount > fromBalance) {
  alert("Недостаточно средств на счёте для перевода");
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
  // доход – проверка остатка не нужна, просто возвращаем объект
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
  
let accBalance = getAccountBalance(accountId);
if (isVaultAccountId(accountId)) {
  const freeBucket = getFreeSafeBucket();
  accBalance = freeBucket ? getSafeBucketBalance(freeBucket.id) : accBalance;
}
if (amount > accBalance) {
  alert("Недостаточно средств на счёте");
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
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return `Итоги ${monthNames[monthIndex]} ${year}`;
}

function getMonthlyReportMonthButtonLabel(monthIndex) {
  return [
    "янв",
    "фев",
    "март",
    "апр",
    "май",
    "июнь",
    "июль",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
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
  })} ₽`;
}

function isSafeBucketAdjustment(transaction) {
  return String(transaction.title || "").trim() === "Корректировка накопления";
}

function isSafeInterestTransaction(transaction) {
  return (
    transaction.type === "income" &&
    isVaultAccountId(transaction.account_id) &&
    transaction.to_safe_bucket_id &&
    String(transaction.title || "").trim() === "Проценты по накоплению"
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
    name: "Гибких расходов нет",
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
    "1–7",
    "8–14",
    "15–21",
    "22–28",
    `29–${lastDay}`,
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
      name: top?.name || "Нет гибких расходов",
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

    if (!rawTitle || rawTitle === "Новая трата") return;

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
      label: "Повторов нет",
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
      title: "Месяц закрыт уверенно",
      text: `Доходы оказались выше расходов на ${formatMoney(totals.difference)}. Главная гибкая трата месяца — ${topCategory.name} на ${formatMoney(topCategory.amount)}. В накопления добавлено ${formatMoney(savings.growth)}.`,
    };
  }

  if (totals.difference < 0) {
    return {
      title: "Месяц ушёл в минус",
      text: `Расходы превысили доходы на ${formatMoney(Math.abs(totals.difference))}. Главная гибкая трата — ${topCategory.name} на ${formatMoney(topCategory.amount)}. В следующем месяце стоит жёстче контролировать повторяющиеся траты.`,
    };
  }

  return {
    title: "Месяц закрыт в ноль",
    text: `Доходы и расходы почти сравнялись. Главная гибкая трата — ${topCategory.name} на ${formatMoney(topCategory.amount)}. Запаса почти нет, поэтому лучше заранее держать под контролем крупные категории.`,
  };
}

function getMonthlyReportFocus({ totals, topCategory, repeat, savings }) {
  if (repeat.count >= 3) {
    return {
      title: `Следить за “${repeat.label}”`,
      text: `Эта трата повторилась ${repeat.count} раза и суммарно забрала ${formatMoney(repeat.amount)}. Это не обязательно плохо, но теперь видно, где привычка превращается в заметную статью расходов.`,
    };
  }

  if (topCategory.amount > 0) {
    return {
      title: `Контролировать “${topCategory.name}”`,
      text: `Это главная гибкая категория месяца: ${formatMoney(topCategory.amount)}. Если в следующем месяце нужен запас, начинать резать логичнее именно отсюда.`,
    };
  }

  if (savings.growth <= 0) {
    return {
      title: "Вернуть пополнение накоплений",
      text: "За месяц накопления почти не выросли. Даже небольшое регулярное пополнение лучше, чем ждать идеального момента.",
    };
  }

  if (totals.difference > 0) {
    return {
      title: "Сохранить темп",
      text: "Месяц прошёл нормально. Главная задача — не раздувать гибкие траты после хорошего результата.",
    };
  }

  return {
    title: "Держать базу",
    text: "Критичных повторов не видно. Следующий месяц лучше начать с контроля свободных денег и обязательных платежей.",
  };
}

function getMonthlyReportAchievements({ totals, topCategory, repeat, savings }) {
  const achievements = [];

  if (totals.difference > 0) {
    achievements.push({
      type: "success",
      title: "Месяц в плюс",
      text: `Разница составила ${formatMoney(totals.difference)}`,
      icon: "up",
    });
  } else if (totals.difference < 0) {
    achievements.push({
      type: "danger",
      title: "Месяц в минус",
      text: `Расходы выше доходов на ${formatMoney(Math.abs(totals.difference))}`,
      icon: "down",
    });
  }

  if (savings.net > 0) {
    achievements.push({
      type: "success",
      title: "Сейф пополнен",
      text: `Накопления выросли на ${formatMoney(savings.net)}`,
      icon: "shield",
    });
  }

  if (repeat.count >= 3) {
    achievements.push({
      type: "warning",
      title: "Повтор месяца",
      text: `${repeat.label}: ${repeat.count} раза`,
      icon: "repeat",
    });
  }

  if (topCategory.amount > 0) {
    achievements.push({
      type: "warning",
      title: "Главная гибкая трата",
      text: `${topCategory.name}: ${formatMoney(topCategory.amount)}`,
      icon: "target",
    });
  }

  if (!achievements.length) {
    achievements.push({
      type: "success",
      title: "Спокойный месяц",
      text: "Критичных финансовых меток нет",
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
        <p>${escapeHtml(week.label)} число</p>
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
    `Итог: ${formatMoney(totals.difference)} — ${
      totals.difference > 0
        ? "месяц в плюс"
        : totals.difference < 0
          ? "месяц в минус"
          : "месяц в ноль"
    }`,
    `Доходы: ${formatMoney(totals.income)}`,
    `Расходы: ${formatMoney(totals.expense)}`,
    "",
    `Главная гибкая трата: ${topCategory.name} — ${formatMoney(topCategory.amount)}`,
    repeat.count > 1
      ? `Повтор месяца: ${repeat.label} — ${repeat.count} раза / ${formatMoney(repeat.amount)}`
      : "Повтор месяца: повторов нет",
    "",
    `Баланс: ${formatMoney(calculateBalance())}`,
    `Свободно: ${formatMoney(getFreeMoneyTotal())}`,
    "",
    `Накопления: +${formatMoney(savings.growth)}`,
    `Пополнено: ${formatMoney(savings.deposits)}`,
    `Проценты: ${formatMoney(savings.interest)}`,
    `Списано: ${formatMoney(savings.withdrawals)}`,
    "",
    `Вывод: ${insight.text}`,
  ].join("\n");
}

async function copyMonthlyReportSummary() {
  const text = buildMonthlyReportTextSummary();

  try {
    await navigator.clipboard.writeText(text);

    if (copyMonthlyReportBtn) {
      const previousText = copyMonthlyReportBtn.textContent;
      copyMonthlyReportBtn.textContent = "Скопировано";

      window.setTimeout(() => {
        copyMonthlyReportBtn.textContent = previousText || "Скопировать";
      }, 1300);
    }
  } catch (error) {
    console.error("copyMonthlyReportSummary error:", error);
    alert("Не получилось скопировать итог. Safari иногда блокирует буфер обмена.");
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
        ? "Месяц закрыт в плюс"
        : totals.difference < 0
          ? "Месяц закрыт в минус"
          : "Месяц закрыт в ноль";
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
        ? `${repeat.count} раза · ${formatMoney(repeat.amount)}`
        : "Повторов нет";
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

// обработчики для фильтров операций
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
  if (!dateKey) return "—";

  const [, monthRaw, dayRaw] = dateKey.split("-");
  const monthIndex = Number(monthRaw) - 1;
  const day = Number(dayRaw);

  const monthLabels = [
    "янв", "фев", "мар", "апр", "май", "июн",
    "июл", "авг", "сен", "окт", "ноя", "дек",
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
