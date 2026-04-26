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