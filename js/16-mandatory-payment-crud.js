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
        alert(`Ошибка сохранения обязательных платежей: ${error.message || error}`);
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
        alert("Для списания из накоплений нужно выбрать конкретное накопление");
        return false;
      }

      const transaction = {
        id: crypto.randomUUID(),
        type: "expense",
        title: item.title || "Календарный платёж",
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
        alert(`Ошибка списания обязательного платежа: ${error.message || error}`);
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

      if (!categoryId) {
        alert("Выбери категорию платежа");
        return;
      }

      if (isVaultAccountId(linkedAccountId) && !linkedSafeBucketId) {
        alert("Выбери накопление");
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

      const ok = confirm(`Удалить обязательный платёж "${target.title}"?`);
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