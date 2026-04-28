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

        subtitle = `${fromLabel} → ${toLabel}`;
        signedAmount = formatMoney(transaction.amount);
        valueClass = "list-value list-value--transfer";
      } else if (transaction.type === "income") {
        const incomeAccountName =
          getAccountNameById(transaction.account_id) ||
          transaction.account ||
          "";

        const incomeBucketLabel =
          isVaultAccountId(transaction.account_id) && transaction.to_safe_bucket_id
            ? ` • ${getSafeBucketName(transaction.to_safe_bucket_id)}`
            : "";

        subtitle = `${incomeAccountName}${incomeBucketLabel} • доход`;
        signedAmount = `+${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--green";
      } else {
        const expenseAccountName =
          getAccountNameById(transaction.account_id) ||
          transaction.account ||
          "";

        subtitle =
          `${getCategoryName(transaction.category_id || UNCATEGORIZED_ID)}` +
          ` • ${expenseAccountName}`;

        signedAmount = `−${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--red";
      }

      const shortDate = formatDateShort(transaction.created_at);
      const timeLabel = transaction.time_label || "";
      const caption = `${shortDate}${shortDate && timeLabel ? " • " : ""}${timeLabel}`;
      const title = transaction.title || "Операция";

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