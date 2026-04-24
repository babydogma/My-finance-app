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
          ${item.isCurrent ? "<small>сейчас</small>" : ""}
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
            <h3 class="list-title">Платежей пока нет</h3>
            <p class="list-subtitle">Добавь обязательные платежи ниже</p>
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
            <h3 class="list-title">Платежей в этом месяце нет</h3>
            <p class="list-subtitle">Добавь платёж с датой в выбранном месяце</p>
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
          card.className =
            `list-card list-card--clickable mandatory-payment-card${
              isPaid ? " mandatory-payment-card--paid" : ""
            }`;

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

    return {
      renderMandatoryPaymentsMonthStrip,
      renderMandatoryPaymentsModal,
    };
  }

  window.FinanceAppMandatoryPaymentRender = {
    create: createMandatoryPaymentRender,
  };
})();