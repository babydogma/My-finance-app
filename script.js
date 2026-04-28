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
    title: "ĐĄĐ˛ĐžĐąĐžĐ´Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸",
    text: "ĐĐľĐ˝ŃĐłĐ¸, ĐşĐžŃĐžŃŃĐźĐ¸ ĐźĐžĐśĐ˝Đž ĐżĐžĐťŃĐˇĐžĐ˛Đ°ŃŃŃŃ ĐąĐľĐˇ ŃĐ¸ŃĐşĐ° ĐˇĐ°Đ´ĐľŃŃ ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ ĐżĐťĐ°ŃĐľĐśĐ¸, Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń Đ¸ ĐˇĐ°ŃĐ¸ŃŃĐ˝Đ˝ŃĐľ ŃŃĐźĐźŃ.",
    formula: "ĐĄĐ˛ĐžĐąĐžĐ´Đ˝Đž = Đ´ĐžŃŃŃĐżĐ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸ â ĐˇĐ°ŃĐ¸ŃŃĐ˝Đ˝ŃĐľ ŃŃĐźĐźŃ",
  },

  protected_money: {
    title: "ĐĐ°ŃĐ¸ŃŃĐ˝Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸",
    text: "ĐĐľĐ˝ŃĐłĐ¸, ĐşĐžŃĐžŃŃĐľ ĐťŃŃŃĐľ Đ˝Đľ ŃŃĐ°ŃĐ¸ŃŃ ŃĐťŃŃĐ°ĐšĐ˝Đž: ŃĐľĐˇĐľŃĐ˛Ń, Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń, ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ ĐżĐťĐ°ŃĐľĐśĐ¸ Đ¸ Đ´ŃŃĐłĐ¸Đľ ĐžŃĐťĐžĐśĐľĐ˝Đ˝ŃĐľ ŃŃĐźĐźŃ.",
    formula: "ĐĐ°ŃĐ¸ŃŃĐ˝Đ˝ŃĐľ = ŃĐľĐˇĐľŃĐ˛Ń + Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń + ĐžĐąŃĐˇĐ°ŃĐľĐťŃŃŃĐ˛Đ°",
  },

  remaining_limits: {
    title: "ĐŃŃĐ°ŃĐžĐş ĐťĐ¸ĐźĐ¸ŃĐžĐ˛",
    text: "ĐĄĐşĐžĐťŃĐşĐž ĐľŃŃ ĐźĐžĐśĐ˝Đž ĐżĐžŃŃĐ°ŃĐ¸ŃŃ ĐżĐž ĐşĐ°ŃĐľĐłĐžŃĐ¸ŃĐź Ń ĐťĐ¸ĐźĐ¸ŃĐ°ĐźĐ¸ Đ˛ ŃĐľĐşŃŃĐľĐź ĐźĐľŃŃŃĐľ.",
    formula: "ĐŃŃĐ°ŃĐžĐş ĐťĐ¸ĐźĐ¸ŃĐžĐ˛ = ĐťĐ¸ĐźĐ¸ŃŃ â ŃĐśĐľ ĐżĐžŃŃĐ°ŃĐľĐ˝Đž",
  },

  can_save_now: {
    title: "ĐĐžĐśĐ˝Đž ĐžŃĐťĐžĐśĐ¸ŃŃ",
    text: "ĐĄŃĐźĐźĐ°, ĐşĐžŃĐžŃŃŃ ĐźĐžĐśĐ˝Đž ĐąĐľĐˇĐžĐżĐ°ŃĐ˝Đž ĐžŃĐżŃĐ°Đ˛Đ¸ŃŃ Đ˛ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń ĐżŃŃĐźĐž ŃĐľĐšŃĐ°Ń, Đ˝Đľ ĐťĐžĐźĐ°Ń ŃĐľĐşŃŃĐ¸Đš ĐźĐľŃŃŃ.",
    formula: "ĐĐžĐśĐ˝Đž ĐžŃĐťĐžĐśĐ¸ŃŃ = ŃĐ˛ĐžĐąĐžĐ´Đ˝Đž â ŃĐ°ĐąĐžŃĐ¸Đš ĐˇĐ°ĐżĐ°Ń",
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
    getFreeMoneyTotal,
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
    mandatoryPaymentEditorModal,
    mandatoryPaymentBucketPickerModal,
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
    analyticsRangeSelectedLabel.textContent = "ĐŃĐąĐľŃĐ¸ ĐżĐľŃĐ¸ĐžĐ´";
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
    alert("ĐĄŃĐźĐźĐ° Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń Đ˝Đľ ĐźĐžĐśĐľŃ ĐąŃŃŃ ĐźĐľĐ˝ŃŃĐľ Đ˝ŃĐťŃ");
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
    title: "ĐĐžŃŃĐľĐşŃĐ¸ŃĐžĐ˛ĐşĐ° Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń",
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
    alert("ĐŃĐ¸ĐąĐşĐ° ĐşĐžŃŃĐľĐşŃĐ¸ŃĐžĐ˛ĐşĐ¸ ŃŃĐźĐźŃ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
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
    title: "ĐĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ ŃĐ°ŃŃĐžĐ´Ń",
    text:
      "Đ­ŃĐž Đ˛ŃĐľ ŃĐ°ŃŃĐžĐ´Ń ĐˇĐ° Đ˛ŃĐąŃĐ°Đ˝Đ˝ŃĐš ĐżĐľŃĐ¸ĐžĐ´ ĐżĐž ĐşĐ°ŃĐľĐłĐžŃĐ¸ŃĐź, ĐşĐžŃĐžŃŃĐľ ĐżĐžĐźĐľŃĐľĐ˝Ń ĐşĐ°Đş ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ.",
  },

  flexible_expense: {
    title: "ĐĐ¸ĐąĐşĐ¸Đľ ŃĐ°ŃŃĐžĐ´Ń",
    text:
      "Đ­ŃĐž Đ˛ŃĐľ ŃĐ°ŃŃĐžĐ´Ń ĐˇĐ° Đ˛ŃĐąŃĐ°Đ˝Đ˝ŃĐš ĐżĐľŃĐ¸ĐžĐ´ ĐżĐž ĐşĐ°ŃĐľĐłĐžŃĐ¸ŃĐź, ĐşĐžŃĐžŃŃĐľ Đ˝Đľ ĐżĐžĐźĐľŃĐľĐ˝Ń ĐşĐ°Đş ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ.",
  },

saved_to_safes: {
  title: "ĐŃĐťĐžĐśĐľĐ˝Đž Đ˛ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń",
  text:
    "Đ­ŃĐž ŃĐşĐžĐťŃĐşĐž Đ´ĐľĐ˝ĐľĐł ŃŃ ĐżĐľŃĐľĐ˛ŃĐť Đ˛ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń Đ¸Đˇ ĐžĐąŃŃĐ˝ŃŃ ŃŃĐľŃĐžĐ˛ ĐˇĐ° Đ˛ŃĐąŃĐ°Đ˝Đ˝ŃĐš ĐżĐľŃĐ¸ĐžĐ´. ĐĐ˝ŃŃŃĐľĐ˝Đ˝Đ¸Đľ ĐżĐľŃĐľĐşĐťĐ°Đ´ŃĐ˛Đ°Đ˝Đ¸Ń ĐźĐľĐśĐ´Ń ŃĐ°ĐźĐ¸ĐźĐ¸ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸ŃĐźĐ¸ ŃŃĐ´Đ° Đ˝Đľ Đ˛ŃĐžĐ´ŃŃ.",
},

  remaining_limits: {
    title: "ĐŃŃĐ°ŃĐžĐş ĐťĐ¸ĐźĐ¸ŃĐžĐ˛",
    text:
      "Đ­ŃĐž ŃĐşĐžĐťŃĐşĐž ĐľŃŃ ĐźĐžĐśĐ˝Đž ĐżĐžŃŃĐ°ŃĐ¸ŃŃ ĐżĐž ĐłĐ¸ĐąĐşĐ¸Đź ĐşĐ°ŃĐľĐłĐžŃĐ¸ŃĐź Đ˛ ŃĐľĐşŃŃĐľĐź ĐźĐľŃŃŃĐľ, ĐľŃĐťĐ¸ ŃĐžŃĐľŃŃ ĐžŃŃĐ°ŃŃŃŃ Đ˛ ŃĐ°ĐźĐşĐ°Ń ŃĐ˛ĐžĐ¸Ń ĐťĐ¸ĐźĐ¸ŃĐžĐ˛.",
  },

  total_balance: {
    title: "ĐĐąŃĐ¸Đš ĐąĐ°ĐťĐ°Đ˝Ń",
    text:
      "Đ­ŃĐž ŃŃĐźĐźĐ° Đ´ĐľĐ˝ĐľĐł ĐżĐž Đ˛ŃĐľĐź ŃŃĐľŃĐ°Đź ĐżŃĐ¸ĐťĐžĐśĐľĐ˝Đ¸Ń Đ˝Đ° ŃĐľĐşŃŃĐ¸Đš ĐźĐžĐźĐľĐ˝Ń.",
  },

  protected_money: {
    title: "ĐĐľĐżŃĐ¸ĐşĐžŃĐ°ĐšĐźŃĐľ",
    text:
      "Đ­ŃĐž Đ´ĐľĐ˝ŃĐłĐ¸, ĐşĐžŃĐžŃŃĐľ ĐżŃĐ¸ĐťĐžĐśĐľĐ˝Đ¸Đľ ŃŃĐ¸ŃĐ°ĐľŃ Đ˝Đľ Đ´ĐťŃ ĐžĐąŃŃĐ˝ŃŃ ŃŃĐ°Ń.",
  },

  free_money: {
  title: "ĐĄĐ˛ĐžĐąĐžĐ´Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸",
  text:
  "Đ­ŃĐž Đ´ĐľĐ˝ŃĐłĐ¸ Đ¸Đˇ ŃŃĐľŃĐžĐ˛ Đ¸ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đš, ĐşĐžŃĐžŃŃĐľ ĐżĐžĐźĐľŃĐľĐ˝Ń ĐşĐ°Đş Đ´ĐžŃŃŃĐżĐ˝ŃĐľ Đ´ĐťŃ ĐžĐąŃŃĐ˝ŃŃ ŃŃĐ°Ń.",
},

  can_save_now: {
    title: "ĐĐžĐśĐ˝Đž ĐžŃĐťĐžĐśĐ¸ŃŃ ŃĐľĐšŃĐ°Ń",
    text:
      "Đ­ŃĐž ŃŃĐźĐźĐ°, ĐşĐžŃĐžŃŃŃ ĐźĐžĐśĐ˝Đž ŃĐąŃĐ°ŃŃ Đ˛ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń ĐąĐľĐˇ ĐşĐžĐ˝ŃĐťĐ¸ĐşŃĐ° Ń Đ˝ĐľĐżĐžĐşŃŃŃŃĐźĐ¸ ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐźĐ¸ ĐżĐťĐ°ŃĐľĐśĐ°ĐźĐ¸ Đ¸ ĐžŃŃĐ°ŃĐşĐžĐź ĐťĐ¸ĐźĐ¸ŃĐžĐ˛.",
  },

  summary_recommendation: {
    title: "ĐŃĐ˛ĐžĐ´",
    text:
      "Đ­ŃĐž Đ¸ŃĐžĐłĐžĐ˛ŃĐš ŃĐľĐˇŃĐťŃŃĐ°Ń Đ˝Đ° ĐžŃĐ˝ĐžĐ˛Đľ ŃĐ˛ĐžĐąĐžĐ´Đ˝ŃŃ Đ´ĐľĐ˝ĐľĐł, Đ˝ĐľĐżĐžĐşŃŃŃŃŃ ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃŃ ĐżĐťĐ°ŃĐľĐśĐľĐš Đ¸ ĐžŃŃĐ°ŃĐşĐ° ĐťĐ¸ĐźĐ¸ŃĐžĐ˛.",
  },
};

function buildFaqFormulaText(faqKey) {
  const summary = getAnalyticsOverviewSummary();

  if (faqKey === "total_balance") {
    return `ĐĐąŃĐ¸Đš ĐąĐ°ĐťĐ°Đ˝Ń = ${formatMoney(summary.totalBalance)}`;
  }

  if (faqKey === "free_money") {
    return `ĐĄĐ˛ĐžĐąĐžĐ´Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸ = ${formatMoney(summary.freeMoney)}`;
  }

  if (faqKey === "protected_money") {
    return `ĐĐ°ŃĐ¸ŃŃĐ˝Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸ = ${formatMoney(summary.protectedMoney)}`;
  }

  if (faqKey === "remaining_limits") {
    return `ĐŃŃĐ°ŃĐžĐş ĐťĐ¸ĐźĐ¸ŃĐžĐ˛ = ${formatMoney(summary.remainingBudgets)}`;
  }

  if (faqKey === "can_save_now") {
    return `ĐĐžĐśĐ˝Đž ĐžŃĐťĐžĐśĐ¸ŃŃ = ĐĄĐ˛ĐžĐąĐžĐ´Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸ (${formatMoney(summary.freeMoney)}) â Đ Đ˛ŃŃĐľŃŃ Đ¸Đˇ ŃĐ˛ĐžĐąĐžĐ´Đ˝ŃŃ (${formatMoney(summary.pendingMandatoryToDeduct)}) â ĐŃŃĐ°ŃĐžĐş ĐťĐ¸ĐźĐ¸ŃĐžĐ˛ (${formatMoney(summary.remainingBudgets)})`;
  }

  if (faqKey === "saved_to_safes") {
    return "ĐĄŃĐ¸ŃĐ°ŃŃŃŃ ŃĐžĐťŃĐşĐž ĐżĐľŃĐľĐ˛ĐžĐ´Ń Đ˛ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń Đ¸Đˇ ĐžĐąŃŃĐ˝ŃŃ ŃŃĐľŃĐžĐ˛ ĐˇĐ° Đ˛ŃĐąŃĐ°Đ˝Đ˝ŃĐš ĐżĐľŃĐ¸ĐžĐ´.";
  }

  if (faqKey === "required_expense") {
    return "ĐĄŃĐźĐźĐ° ŃĐ°ŃŃĐžĐ´ĐžĐ˛ ĐżĐž ĐşĐ°ŃĐľĐłĐžŃĐ¸ŃĐź, ĐżĐžĐźĐľŃĐľĐ˝Đ˝ŃĐź ĐşĐ°Đş ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ.";
  }

  if (faqKey === "flexible_expense") {
    return "ĐĄŃĐźĐźĐ° ŃĐ°ŃŃĐžĐ´ĐžĐ˛ ĐżĐž ĐşĐ°ŃĐľĐłĐžŃĐ¸ŃĐź, Đ˝Đľ ĐżĐžĐźĐľŃĐľĐ˝Đ˝ŃĐź ĐşĐ°Đş ĐžĐąŃĐˇĐ°ŃĐľĐťŃĐ˝ŃĐľ.";
  }

  return "Đ¤ĐžŃĐźŃĐťĐ° Đ˝ĐľĐ´ĐžŃŃŃĐżĐ˝Đ° Đ´ĐťŃ ŃŃĐžĐłĐž ĐżĐžĐşĐ°ĐˇĐ°ŃĐľĐťŃ.";
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
     07. MODALS: BUDGET / ACCOUNTS / ĐĐĐĐĐĐĐĐĐĐŻ
     ========================================================= */
function openBudgetModal(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return;

  activeBudgetCategoryId = categoryId;

  const existing = getBudgetLimitByCategoryId(categoryId);

  budgetModalTitle.textContent = category.name || "ĐĐ°ŃĐľĐłĐžŃĐ¸Ń";
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
        "ĐĐ°ĐşĐžĐżĐ¸ŃĐľĐťŃĐ˝ŃĐš ŃŃŃŃ Đ˝ĐľĐťŃĐˇŃ Đ´ĐľĐťĐ°ŃŃ ĐžŃĐ˝ĐžĐ˛Đ˝ŃĐź. ĐĐ˝ Đ¸ŃĐżĐžĐťŃĐˇŃĐľŃŃŃ ĐşĐ°Đş ĐşĐžĐ˝ŃĐľĐšĐ˝ĐľŃ Đ´ĐťŃ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đš.";
    } else if (role === "reserve") {
      accountPrimaryNote.textContent =
        "Đ ĐľĐˇĐľŃĐ˛Đ˝ŃĐš ŃŃŃŃ Đ˝ĐľĐťŃĐˇŃ Đ´ĐľĐťĐ°ŃŃ ĐžŃĐ˝ĐžĐ˛Đ˝ŃĐź Đ´ĐťŃ ĐľĐśĐľĐ´Đ˝ĐľĐ˛Đ˝ŃŃ ŃĐżĐ¸ŃĐ°Đ˝Đ¸Đš.";
    } else {
      accountPrimaryNote.textContent =
        "Đ­ŃĐžŃ ŃŃŃŃ ĐąŃĐ´ĐľŃ ĐżĐžĐ´ŃŃĐ°Đ˛ĐťŃŃŃŃŃ ĐżĐž ŃĐźĐžĐťŃĐ°Đ˝Đ¸Ń Đ˛ ŃĐ°ŃŃĐžĐ´Đ°Ń Đ¸ Đ´ĐžŃĐžĐ´Đ°Ń.";
    }
  }
}

function openCreateAccountModal() {
  if (!accountModal) return;

  activeAccountId = null;

  accountModalTitle.textContent = "ĐĐžĐ˛ŃĐš ŃŃŃŃ";
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
    alert("ĐĐ˛ĐľĐ´Đ¸ Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸Đľ ŃŃŃŃĐ°");
    return;
  }

  const duplicateName = state.accounts.find((account) => {
    if (activeAccountId && account.id === activeAccountId) return false;
    return String(account.name || "").trim().toLowerCase() === nextName.toLowerCase();
  });

  if (duplicateName) {
    alert("ĐĄŃŃŃ Ń ŃĐ°ĐşĐ¸Đź Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸ĐľĐź ŃĐśĐľ ŃŃŃĐľŃŃĐ˛ŃĐľŃ");
    return;
  }

  const flags = getAccountRoleFlags(nextRole);
  const isPrimary = canAccountBePrimary(nextRole) && accountPrimarySpendInput.checked;

  const currentVaultAccount = getVaultAccount();
  if (nextRole === "vault_pool") {
    const anotherVaultExists =
      currentVaultAccount && currentVaultAccount.id !== activeAccountId;

    if (anotherVaultExists) {
      alert("ĐĐ°ĐşĐžĐżĐ¸ŃĐľĐťŃĐ˝ŃĐš ŃŃŃŃ ŃĐśĐľ ŃŃŃĐľŃŃĐ˛ŃĐľŃ. Đ ĐżŃĐ¸ĐťĐžĐśĐľĐ˝Đ¸Đ¸ Đ´ĐžĐťĐśĐľĐ˝ ĐąŃŃŃ ŃĐžĐťŃĐşĐž ĐžĐ´Đ¸Đ˝ ŃĐ°ĐşĐžĐš ŃŃŃŃ.");
      return;
    }
  }

  if (isPrimary) {
    const { error: resetPrimaryError } = await supabaseClient
      .from("accounts")
      .update({ is_primary_spend: false })
      .neq("id", activeAccountId || "");

    if (resetPrimaryError) {
      alert("ĐŃĐ¸ĐąĐşĐ° ŃĐąŃĐžŃĐ° ĐžŃĐ˝ĐžĐ˛Đ˝ĐžĐłĐž ŃŃŃŃĐ°");
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
      alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžŃŃĐ°Đ˝ĐľĐ˝Đ¸Ń ŃŃŃŃĐ°");
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
      alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžĐˇĐ´Đ°Đ˝Đ¸Ń ŃŃŃŃĐ°");
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
    alert("ĐĐ°ĐşĐžĐżĐ¸ŃĐľĐťŃĐ˝ŃĐš ŃŃŃŃ ŃĐ´Đ°ĐťŃŃŃ Đ˝ĐľĐťŃĐˇŃ");
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
    alert("ĐĐľĐťŃĐˇŃ ŃĐ´Đ°ĐťĐ¸ŃŃ ŃŃŃŃ, ĐşĐžŃĐžŃŃĐš ŃĐśĐľ Đ¸ŃĐżĐžĐťŃĐˇŃĐľŃŃŃ Đ˛ ĐžĐżĐľŃĐ°ŃĐ¸ŃŃ");
    return;
  }

  const ok = confirm(`ĐŁĐ´Đ°ĐťĐ¸ŃŃ ŃŃŃŃ "${account.name}"?`);
  if (!ok) return;

  const { error } = await supabaseClient
    .from("accounts")
    .delete()
    .eq("id", activeAccountId);

  if (error) {
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐ´Đ°ĐťĐľĐ˝Đ¸Ń ŃŃŃŃĐ°");
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
      safeBucketsModalTitle.textContent = getSafeAccountName() || "ĐĐ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń";
    }

    renderSafeBucketsModal();
    openAnimatedModal(safeBucketsModal);
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("safeBucketsModal open error:", error);
    alert("ĐŃĐ¸ĐąĐşĐ° ĐžŃĐşŃŃŃĐ¸Ń Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đš. ĐĄĐźĐžŃŃĐ¸ console.");
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
  safeBucketAmountModalTitle.textContent = activeSafeBucket.name || "ĐĐ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ";
  safeBucketNameInput.value = activeSafeBucket.name || "";
  deleteSafeBucketBtn?.classList.remove("hidden");
}

  const balance = getSafeBucketBalance(bucketId);
  const annualRate = getSafeBucketInterestAnnualRate(bucketId);

  safeBucketAmountModalTitle.textContent = bucket.name;
  safeBucketAmountCurrentValue.textContent = `ĐĄĐľĐšŃĐ°Ń: ${formatMoney(balance)}`;
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
    safeBucketsModalTotalLabel.textContent = `ĐĐąŃĐ¸Đš ĐąĐ°ĐťĐ°Đ˝Ń: ${formatMoney(totalSafeBalance)}`;
  }
  safeBucketsList.innerHTML = "";

  if (!state.safeBuckets.length) {
    const empty = document.createElement("div");
    empty.className = "list-card";
    empty.innerHTML = `
      <div class="list-body">
        <h3 class="list-title">ĐĐ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đš ĐżĐžĐşĐ° Đ˝ĐľŃ</h3>
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
    alert("ĐĐ˛ĐľĐ´Đ¸ŃĐľ Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸Đľ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
    return;
  }

  const duplicate = state.safeBuckets.find(
    (bucket) => String(bucket.name || "").trim().toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    alert("Đ˘Đ°ĐşĐžĐľ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ ŃĐśĐľ ĐľŃŃŃ");
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
    alert(`ĐŃĐ¸ĐąĐşĐ° Đ´ĐžĐąĐ°Đ˛ĐťĐľĐ˝Đ¸Ń Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń: ${error.message || "unknown error"}`);
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
    alert("ĐĐ˛ĐľĐ´Đ¸ Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸Đľ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
    return;
  }

  if (Number.isNaN(nextInterestPercent) || nextInterestPercent < 0) {
    alert("ĐĐ˛ĐľĐ´Đ¸ ĐşĐžŃŃĐľĐşŃĐ˝ŃĐš ĐłĐžĐ´ĐžĐ˛ĐžĐš ĐżŃĐžŃĐľĐ˝Ń");
    return;
  }

  if (Number.isNaN(nextAmount) || nextAmount < 0) {
    alert("ĐĐ˛ĐľĐ´Đ¸ ĐşĐžŃŃĐľĐşŃĐ˝ŃŃ ŃŃĐźĐźŃ");
    return;
  }

  const duplicate = state.safeBuckets.find((bucket) => {
    if (bucket.id === activeSafeBucketAmountId) return false;
    return String(bucket.name || "").trim().toLowerCase() === nextName.toLowerCase();
  });

  if (duplicate) {
    alert("ĐĐ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ Ń ŃĐ°ĐşĐ¸Đź Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸ĐľĐź ŃĐśĐľ ŃŃŃĐľŃŃĐ˛ŃĐľŃ");
    return;
  }

  const { error: updateBucketError } = await supabaseClient
    .from("safe_buckets")
    .update({
      name: nextName,
    })
    .eq("id", activeSafeBucketAmountId);

  if (updateBucketError) {
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžŃŃĐ°Đ˝ĐľĐ˝Đ¸Ń Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
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
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžŃŃĐ°Đ˝ĐľĐ˝Đ¸Ń ĐżŃĐžŃĐľĐ˝ŃĐ° Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
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
    alert("ĐĐľĐťŃĐˇŃ ŃĐ´Đ°ĐťĐ¸ŃŃ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ, ĐżĐžĐşĐ° Đ˛ Đ˝ŃĐź ĐľŃŃŃ Đ´ĐľĐ˝ŃĐłĐ¸");
    return;
  }

  const ok = confirm(`ĐŁĐ´Đ°ĐťĐ¸ŃŃ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ "${bucket.name}"?`);
  if (!ok) return;

  const { error } = await supabaseClient
    .from("safe_buckets")
    .delete()
    .eq("id", bucket.id);

  if (error) {
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐ´Đ°ĐťĐľĐ˝Đ¸Ń Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
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
  categorySelect.innerHTML = `<option value="">ĐŃĐąĐľŃĐ¸ ĐşĐ°ŃĐľĐłĐžŃĐ¸Ń</option>`;
  accountSelect.selectedIndex = 0;
  fromAccountSelect.selectedIndex = 0;
  toAccountSelect.selectedIndex = 0;

  if (fromSafeBucketSelect) {
    fromSafeBucketSelect.innerHTML = `<option value="">ĐĐˇ ĐşĐ°ĐşĐžĐłĐž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń</option>`;
    fromSafeBucketSelect.value = "";
  }

  if (toSafeBucketSelect) {
    toSafeBucketSelect.innerHTML = `<option value="">Đ ĐşĐ°ĐşĐžĐľ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ</option>`;
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
    modalTitle.textContent = "ĐĐžĐąĐ°Đ˛Đ¸ŃŃ ŃĐ°ŃŃĐžĐ´";
    saveBtn.textContent = "ĐĄĐžŃŃĐ°Đ˝Đ¸ŃŃ ŃĐ°ŃŃĐžĐ´";

    categoryField.classList.remove("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillExpenseCategorySelect();
    fillAccountSelect(accountSelect, "ĐŃĐąĐľŃĐ¸ ŃŃŃŃ");

    const defaultExpenseAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    accountSelect.value = defaultExpenseAccountId;
  } else if (mode === "income") {
    modalTitle.textContent = "ĐĐžĐąĐ°Đ˛Đ¸ŃŃ Đ´ĐžŃĐžĐ´";
    saveBtn.textContent = "ĐĄĐžŃŃĐ°Đ˝Đ¸ŃŃ Đ´ĐžŃĐžĐ´";

    categoryField.classList.add("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillAccountSelect(accountSelect, "ĐŃĐąĐľŃĐ¸ ŃŃŃŃ");

    const defaultIncomeAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    accountSelect.value = defaultIncomeAccountId;
  } else if (mode === "transfer") {
    modalTitle.textContent = "ĐĄĐ´ĐľĐťĐ°ŃŃ ĐżĐľŃĐľĐ˛ĐžĐ´";
    saveBtn.textContent = "ĐĄĐžŃŃĐ°Đ˝Đ¸ŃŃ ĐżĐľŃĐľĐ˛ĐžĐ´";

    categoryField.classList.add("hidden");
    accountField.classList.add("hidden");
    fromAccountField.classList.remove("hidden");
    toAccountField.classList.remove("hidden");

    fillAccountSelect(fromAccountSelect, "ĐĄ ĐşĐ°ĐşĐžĐłĐž ŃŃŃŃĐ°");
    fillAccountSelect(toAccountSelect, "ĐĐ° ĐşĐ°ĐşĐžĐš ŃŃŃŃ");

    const defaultFromAccountId =
      getPrimarySpendAccountId() || getSpendableAccounts()[0]?.id || "";

    const cashFallbackId =
      getCashAccountId() ||
      getSpendableAccounts().find((account) => account.id !== defaultFromAccountId)?.id ||
      "";

    fromAccountSelect.value = defaultFromAccountId;
    fillAccountSelect(toAccountSelect, "ĐĐ° ĐşĐ°ĐşĐžĐš ŃŃŃŃ", cashFallbackId, {
      excludeId: defaultFromAccountId,
    });
    toAccountSelect.value = cashFallbackId;

    fromSafeBucketField.classList.add("hidden");
    toSafeBucketField.classList.add("hidden");

    fillSafeBucketSelect(fromSafeBucketSelect, "ĐĐˇ ĐşĐ°ĐşĐžĐłĐž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń");
    fillSafeBucketSelect(toSafeBucketSelect, "Đ ĐşĐ°ĐşĐžĐľ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ");
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
    modalTitle.textContent = "Đ ĐľĐ´Đ°ĐşŃĐ¸ŃĐžĐ˛Đ°ŃŃ ŃĐ°ŃŃĐžĐ´";
    saveBtn.textContent = "ĐĄĐžŃŃĐ°Đ˝Đ¸ŃŃ";

    categoryField.classList.remove("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    fillExpenseCategorySelect(transaction.category_id || UNCATEGORIZED_ID);

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();
    fillAccountSelect(accountSelect, "ĐŃĐąĐľŃĐ¸ ŃŃŃŃ", transaction.account_id);
    accountSelect.value = transaction.account_id || "";
    commentInput.value = transaction.title === "ĐĐžĐ˛Đ°Ń ŃŃĐ°ŃĐ°" ? "" : transaction.title;
  } else if (transaction.type === "income") {
    modalTitle.textContent = "Đ ĐľĐ´Đ°ĐşŃĐ¸ŃĐžĐ˛Đ°ŃŃ Đ´ĐžŃĐžĐ´";
    saveBtn.textContent = "ĐĄĐžŃŃĐ°Đ˝Đ¸ŃŃ";

    categoryField.classList.add("hidden");
    accountField.classList.remove("hidden");
    fromAccountField.classList.add("hidden");
    toAccountField.classList.add("hidden");

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();
    fillAccountSelect(accountSelect, "ĐŃĐąĐľŃĐ¸ ŃŃŃŃ", transaction.account_id);
    accountSelect.value = transaction.account_id || "";
    commentInput.value = transaction.title === "ĐĐžĐ˛ŃĐš Đ´ĐžŃĐžĐ´" ? "" : transaction.title;
  } else if (transaction.type === "transfer") {
    modalTitle.textContent = "Đ ĐľĐ´Đ°ĐşŃĐ¸ŃĐžĐ˛Đ°ŃŃ ĐżĐľŃĐľĐ˛ĐžĐ´";
    saveBtn.textContent = "ĐĄĐžŃŃĐ°Đ˝Đ¸ŃŃ";

    categoryField.classList.add("hidden");
    accountField.classList.add("hidden");
    fromAccountField.classList.remove("hidden");
    toAccountField.classList.remove("hidden");

    amountInput.value = String(transaction.amount).replace(".", ",");
    dateInput.value = transaction.created_at
      ? String(transaction.created_at).slice(0, 10)
      : getTodayDateValue();

    fillAccountSelect(fromAccountSelect, "ĐĄ ĐşĐ°ĐşĐžĐłĐž ŃŃŃŃĐ°", transaction.from_account_id);
    fillAccountSelect(toAccountSelect, "ĐĐ° ĐşĐ°ĐşĐžĐš ŃŃŃŃ", transaction.to_account_id, {
      excludeId: transaction.from_account_id,
    });

    fromAccountSelect.value = transaction.from_account_id || "";
    toAccountSelect.value = transaction.to_account_id || "";
    commentInput.value = transaction.title === "ĐĐľŃĐľĐ˛ĐžĐ´" ? "" : transaction.title;

    fillSafeBucketSelect(
      fromSafeBucketSelect,
      "ĐĐˇ ĐşĐ°ĐşĐžĐłĐž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń",
      transaction.from_safe_bucket_id || ""
    );
    fillSafeBucketSelect(
      toSafeBucketSelect,
      "Đ ĐşĐ°ĐşĐžĐľ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ",
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
        title: "ĐŃĐžŃĐľĐ˝ŃŃ ĐżĐž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń",
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
        alert("ĐŃĐ¸ĐąĐşĐ° Đ˝Đ°ŃĐ¸ŃĐťĐľĐ˝Đ¸Ń ĐżŃĐžŃĐľĐ˝ŃĐžĐ˛ ĐżĐž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸ŃĐź");
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
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžŃŃĐ°Đ˝ĐľĐ˝Đ¸Ń Đ´Đ°ŃŃ Đ˝Đ°ŃĐ¸ŃĐťĐľĐ˝Đ¸Ń ĐżŃĐžŃĐľĐ˝ŃĐžĐ˛");
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
animateLabeledCurrencyValue(balanceFreeMoneyValueEl, "ĐĄĐ˛ĐžĐąĐžĐ´Đ˝Đž: ", freeMoney, {
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

    const typeLabel = category.is_required ? "ĐĐąŃĐˇĐ°ŃĐľĐťŃĐ˝Đ°Ń" : "ĐĐ¸ĐąĐşĐ°Ń";
const lockedLabel = category.locked ? "ĐĄĐ¸ŃŃĐľĐźĐ˝Đ°Ń" : "Đ ĐľĐ´Đ°ĐşŃĐ¸ŃŃĐľĐźĐ°Ń";

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
    <span class="category-row__chevron">âş</span>
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
    alert("ĐĐ˛ĐľĐ´Đ¸ ŃŃĐźĐźŃ");
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
      alert("ĐŃĐąĐľŃĐ¸ ŃŃŃŃ ŃĐżĐ¸ŃĐ°Đ˝Đ¸Ń");
      return null;
    }

    if (!toAccountId) {
      alert("ĐŃĐąĐľŃĐ¸ ŃŃŃŃ ĐˇĐ°ŃĐ¸ŃĐťĐľĐ˝Đ¸Ń");
      return null;
    }

    if (fromAccountId === toAccountId) {
      const sameBuckets =
        !isVaultAccountId(fromAccountId) ||
        (fromSafeBucketId && toSafeBucketId && fromSafeBucketId === toSafeBucketId);

      if (sameBuckets) {
        alert("ĐĄŃĐľŃĐ° Đ´ĐžĐťĐśĐ˝Ń ĐąŃŃŃ ŃĐ°ĐˇĐ˝ŃĐźĐ¸");
        return null;
      }
    }

    if (isVaultAccountId(fromAccountId) && !fromSafeBucketId) {
      alert("ĐŃĐąĐľŃĐ¸ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ ŃĐżĐ¸ŃĐ°Đ˝Đ¸Ń");
      return null;
    }

    if (isVaultAccountId(toAccountId) && !toSafeBucketId) {
      alert("ĐŃĐąĐľŃĐ¸ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ ĐˇĐ°ŃĐ¸ŃĐťĐľĐ˝Đ¸Ń");
      return null;
    }
    
    // ĐżŃĐžĐ˛ĐľŃŃĐľĐź ĐžŃŃĐ°ŃĐžĐş Đ´ĐťŃ ĐżĐľŃĐľĐ˛ĐžĐ´Đ°
let fromBalance = getAccountBalance(fromAccountId);
if (isVaultAccountId(fromAccountId) && fromSafeBucketId) {
  // ĐľŃĐťĐ¸ ĐżĐľŃĐľĐ˛ĐžĐ´Đ¸Đź Đ¸Đˇ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń, ĐąĐľŃĐľĐź ĐąĐ°ĐťĐ°Đ˝Ń Đ˛ŃĐąŃĐ°Đ˝Đ˝ĐžĐłĐž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Ń
  fromBalance = getSafeBucketBalance(fromSafeBucketId);
}
if (amount > fromBalance) {
  alert("ĐĐľĐ´ĐžŃŃĐ°ŃĐžŃĐ˝Đž ŃŃĐľĐ´ŃŃĐ˛ Đ˝Đ° ŃŃŃŃĐľ Đ´ĐťŃ ĐżĐľŃĐľĐ˛ĐžĐ´Đ°");
  return null;
}

    return {
      id: editingTransactionId || crypto.randomUUID(),
      type: "transfer",
      title: comment || "ĐĐľŃĐľĐ˛ĐžĐ´",
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
    alert("ĐŃĐąĐľŃĐ¸ ŃŃŃŃ");
    return null;
  }

  if (currentMode === "income") {
  // Đ´ĐžŃĐžĐ´ â ĐżŃĐžĐ˛ĐľŃĐşĐ° ĐžŃŃĐ°ŃĐşĐ° Đ˝Đľ Đ˝ŃĐśĐ˝Đ°, ĐżŃĐžŃŃĐž Đ˛ĐžĐˇĐ˛ŃĐ°ŃĐ°ĐľĐź ĐžĐąŃĐľĐşŃ
  return {
    id: editingTransactionId || crypto.randomUUID(),
    type: "income",
    title: comment || "ĐĐžĐ˛ŃĐš Đ´ĐžŃĐžĐ´",
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
    alert("ĐŃĐąĐľŃĐ¸ ĐşĐ°ŃĐľĐłĐžŃĐ¸Ń");
    return null;
  }

  const freeSafeBucket = isVaultAccountId(accountId) ? getFreeSafeBucket() : null;

  if (isVaultAccountId(accountId) && !freeSafeBucket) {
    alert("ĐĐľ Đ˝Đ°ĐšĐ´ĐľĐ˝Đž Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ, ĐżĐžĐźĐľŃĐľĐ˝Đ˝ĐžĐľ ĐşĐ°Đş ŃĐ˛ĐžĐąĐžĐ´Đ˝ŃĐľ Đ´ĐľĐ˝ŃĐłĐ¸.");
    return null;
  }
  
let accBalance = getAccountBalance(accountId);
if (isVaultAccountId(accountId)) {
  const freeBucket = getFreeSafeBucket();
  accBalance = freeBucket ? getSafeBucketBalance(freeBucket.id) : accBalance;
}
if (amount > accBalance) {
  alert("ĐĐľĐ´ĐžŃŃĐ°ŃĐžŃĐ˝Đž ŃŃĐľĐ´ŃŃĐ˛ Đ˝Đ° ŃŃŃŃĐľ");
  return null;
}

  return {
    id: editingTransactionId || crypto.randomUUID(),
    type: "expense",
    title: comment || "ĐĐžĐ˛Đ°Ń ŃŃĐ°ŃĐ°",
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
      alert("ĐŃĐ¸ĐąĐşĐ° ĐžĐąĐ˝ĐžĐ˛ĐťĐľĐ˝Đ¸Ń ĐžĐżĐľŃĐ°ŃĐ¸Đ¸");
      console.error(error);
      return;
    }

    justCreatedTransactionId = null;
  } else {
    const { error } = await supabaseClient
      .from("transactions")
      .insert(transaction);

    if (error) {
      alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžŃŃĐ°Đ˝ĐľĐ˝Đ¸Ń ĐžĐżĐľŃĐ°ŃĐ¸Đ¸");
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
  const ok = confirm("ĐŁĐ´Đ°ĐťĐ¸ŃŃ ŃŃŃ ĐžĐżĐľŃĐ°ŃĐ¸Ń?");
  if (!ok) return;

  closeModal();

  await animateTransactionDelete(transactionId);

  const { error } = await supabaseClient
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐ´Đ°ĐťĐľĐ˝Đ¸Ń ĐžĐżĐľŃĐ°ŃĐ¸Đ¸");
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
    alert("ĐĐ˛ĐľĐ´Đ¸ŃĐľ Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸Đľ ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸");
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
    alert("ĐŃĐ¸ĐąĐşĐ° Đ´ĐžĐąĐ°Đ˛ĐťĐľĐ˝Đ¸Ń ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸");
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
    alert("ĐĐ˛ĐľĐ´Đ¸ Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸Đľ ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸");
    return;
  }

  if (Number.isNaN(amount) || amount < 0) {
    alert("ĐĐ˛ĐľĐ´Đ¸ ĐşĐžŃŃĐľĐşŃĐ˝ŃĐš ĐťĐ¸ĐźĐ¸Ń");
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
    alert("ĐŃĐ¸ĐąĐşĐ° ĐžĐąĐ˝ĐžĐ˛ĐťĐľĐ˝Đ¸Ń ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸");
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
      alert("ĐŃĐ¸ĐąĐşĐ° ĐžĐąĐ˝ĐžĐ˛ĐťĐľĐ˝Đ¸Ń ĐťĐ¸ĐźĐ¸ŃĐ°");
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
      alert("ĐŃĐ¸ĐąĐşĐ° ŃĐžŃŃĐ°Đ˝ĐľĐ˝Đ¸Ń ĐťĐ¸ĐźĐ¸ŃĐ°");
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
    `ĐŁĐ´Đ°ĐťĐ¸ŃŃ ĐşĐ°ŃĐľĐłĐžŃĐ¸Ń "${category.name}"? ĐŃĐľ ŃŃĐ°ŃŃĐľ ŃĐ°ŃŃĐžĐ´Ń ĐżĐľŃĐľĐšĐ´ŃŃ Đ˛ "ĐĐľĐˇ ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸".`
  );
  if (!ok) return;

  const { error: txError } = await supabaseClient
    .from("transactions")
    .update({ category_id: UNCATEGORIZED_ID })
    .eq("type", "expense")
    .eq("category_id", category.id);

  if (txError) {
    alert("ĐŃĐ¸ĐąĐşĐ° ĐżĐľŃĐľĐ˝ĐžŃĐ° ŃŃĐ°ŃŃŃ ŃĐ°ŃŃĐžĐ´ĐžĐ˛");
    console.error(txError);
    return;
  }

  const { error: budgetDeleteError } = await supabaseClient
    .from("budget_limits")
    .delete()
    .eq("category_id", category.id);

  if (budgetDeleteError) {
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐ´Đ°ĐťĐľĐ˝Đ¸Ń ĐťĐ¸ĐźĐ¸ŃĐ° ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸");
    console.error(budgetDeleteError);
    return;
  }

  const { error: deleteError } = await supabaseClient
    .from("categories")
    .delete()
    .eq("id", category.id);

  if (deleteError) {
    alert("ĐŃĐ¸ĐąĐşĐ° ŃĐ´Đ°ĐťĐľĐ˝Đ¸Ń ĐşĐ°ŃĐľĐłĐžŃĐ¸Đ¸");
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
    alert("ĐŃĐ¸ĐąĐşĐ° ĐˇĐ°ĐłŃŃĐˇĐşĐ¸ ŃŃĐľŃĐžĐ˛ Đ¸Đˇ Supabase");
    return;
  }

  if (categoriesError) {
    console.error(categoriesError);
    alert("ĐŃĐ¸ĐąĐşĐ° ĐˇĐ°ĐłŃŃĐˇĐşĐ¸ ĐşĐ°ŃĐľĐłĐžŃĐ¸Đš Đ¸Đˇ Supabase");
    return;
  }

  if (transactionsError) {
    console.error(transactionsError);
    alert("ĐŃĐ¸ĐąĐşĐ° ĐˇĐ°ĐłŃŃĐˇĐşĐ¸ ĐžĐżĐľŃĐ°ŃĐ¸Đš Đ¸Đˇ Supabase");
    return;
  }

  if (budgetLimitsError) {
    console.error(budgetLimitsError);
    alert("ĐŃĐ¸ĐąĐşĐ° ĐˇĐ°ĐłŃŃĐˇĐşĐ¸ ĐťĐ¸ĐźĐ¸ŃĐžĐ˛ ĐąŃĐ´ĐśĐľŃĐ° Đ¸Đˇ Supabase");
    return;
  }

  if (safeBucketsError) {
    console.error(safeBucketsError);
    alert("ĐŃĐ¸ĐąĐşĐ° ĐˇĐ°ĐłŃŃĐˇĐşĐ¸ Đ˝Đ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đš Đ¸Đˇ Supabase");
    return;
  }

  if (appMetaError) {
    console.error(appMetaError);
    alert("ĐŃĐ¸ĐąĐşĐ° ĐˇĐ°ĐłŃŃĐˇĐşĐ¸ ŃĐťŃĐśĐľĐąĐ˝ŃŃ Đ´Đ°Đ˝Đ˝ŃŃ ĐżŃĐ¸ĐťĐžĐśĐľĐ˝Đ¸Ń");
    return;
  }

    state.accounts = accounts || [];
  state.categories = categories || [];
  state.transactions = transactions || [];
  state.budgetLimits = budgetLimits || [];
    state.safeBuckets = (safeBuckets || []).map((bucket, index) => ({
    ...bucket,
    id: bucket.id || `safe-bucket-${index + 1}`,
    name: bucket.name || "ĐĐ°ĐşĐžĐżĐťĐľĐ˝Đ¸Đľ",
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

navWalletBtn?.addEventListener("click", showWalletView);
navAnalyticsBtn?.addEventListener("click", showAnalyticsView);
navOperationsBtn?.addEventListener("click", showOperationsView);

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

// ĐžĐąŃĐ°ĐąĐžŃŃĐ¸ĐşĐ¸ Đ´ĐťŃ ŃĐ¸ĐťŃŃŃĐžĐ˛ ĐžĐżĐľŃĐ°ŃĐ¸Đš
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
    "ŃĐ˝Đ˛", "ŃĐľĐ˛", "ĐźĐ°Ń", "Đ°ĐżŃ", "ĐźĐ°Đš", "Đ¸ŃĐ˝",
    "Đ¸ŃĐť", "Đ°Đ˛Đł", "ŃĐľĐ˝", "ĐžĐşŃ", "Đ˝ĐžŃ", "Đ´ĐľĐş",
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
