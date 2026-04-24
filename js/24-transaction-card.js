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
    function createTransactionCard(transaction) {
      const card = document.createElement("div");

      card.className = "list-card list-card--clickable";
      card.dataset.transactionId = transaction.id;

      let subtitle = "";
      let signedAmount = "";
      let valueClass = "list-value";

      if (transaction.type === "transfer") {
        const fromAccountName =
          getAccountNameById(transaction.from_account_id) ||
          transaction.from_account ||
          "";

        const toAccountName =
          getAccountNameById(transaction.to_account_id) ||
          transaction.to_account ||
          "";

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
          getAccountNameById(transaction.account_id) ||
          transaction.account ||
          "";

        const incomeBucketLabel =
          isVaultAccountId(transaction.account_id) && transaction.to_safe_bucket_id
            ? ` • ${getSafeBucketName(transaction.to_safe_bucket_id)}`
            : "";

        subtitle = `${escapeHtml(incomeAccountName)}${escapeHtml(incomeBucketLabel)} • доход`;
        signedAmount = `+${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--green";
      } else {
        const expenseAccountName =
          getAccountNameById(transaction.account_id) ||
          transaction.account ||
          "";

        subtitle =
          `${escapeHtml(getCategoryName(transaction.category_id || UNCATEGORIZED_ID))}` +
          ` · ${escapeHtml(expenseAccountName)}`;

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

    return {
      createTransactionCard,
    };
  }

  window.FinanceAppTransactionCard = {
    create: createTransactionCardModule,
  };
})();
