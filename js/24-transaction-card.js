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
    function looksLikeBrokenEncoding(value) {
      const text = String(value || "");

      return (
        /[ĐÐÑŃ�]/.test(text) ||
        text.includes("â") ||
        text.includes("ð") ||
        text.includes("ñ")
      );
    }

    function getSafeText(value, fallback = "") {
      const text = String(value || "").trim();

      if (!text) return fallback;

      return looksLikeBrokenEncoding(text) ? fallback : text;
    }

    function getTransactionTitle(transaction) {
      const rawTitle = String(transaction?.title || "").trim();

      if (!rawTitle) {
        return "Операция";
      }

      /*
        Старые операции процентов уже могли попасть в Supabase
        с битой кодировкой. Базу тут не трогаем, но выводим нормально.
      */
      if (looksLikeBrokenEncoding(rawTitle)) {
        if (
          transaction.type === "income" &&
          isVaultAccountId(transaction.account_id)
        ) {
          return "Проценты по накоплению";
        }

        return "Операция";
      }

      return rawTitle;
    }

    function getSafeBucketLabel(bucketId) {
      return getSafeText(getSafeBucketName(bucketId), "Накопление");
    }

    function getSafeAccountLabel(accountId, legacyName = "") {
      return getSafeText(
        getAccountNameById(accountId) || legacyName,
        "Счёт"
      );
    }

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
        const fromAccountName = getSafeAccountLabel(
          transaction.from_account_id,
          transaction.from_account
        );

        const toAccountName = getSafeAccountLabel(
          transaction.to_account_id,
          transaction.to_account
        );

        const fromLabel = isVaultAccountId(transaction.from_account_id)
          ? `${fromAccountName} • ${getSafeBucketLabel(transaction.from_safe_bucket_id)}`
          : fromAccountName;

        const toLabel = isVaultAccountId(transaction.to_account_id)
          ? `${toAccountName} • ${getSafeBucketLabel(transaction.to_safe_bucket_id)}`
          : toAccountName;

        subtitle = `${fromLabel} → ${toLabel}`;
        signedAmount = formatMoney(transaction.amount);
        valueClass = "list-value list-value--transfer";
      } else if (transaction.type === "income") {
        const incomeAccountName = getSafeAccountLabel(
          transaction.account_id,
          transaction.account
        );

        const incomeBucketLabel =
          isVaultAccountId(transaction.account_id) && transaction.to_safe_bucket_id
            ? ` • ${getSafeBucketLabel(transaction.to_safe_bucket_id)}`
            : "";

        subtitle = `${incomeAccountName}${incomeBucketLabel} • доход`;
        signedAmount = `+${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--green";
      } else {
        const expenseAccountName = getSafeAccountLabel(
          transaction.account_id,
          transaction.account
        );

        const categoryName = getSafeText(
          getCategoryName(transaction.category_id || UNCATEGORIZED_ID),
          "Категория"
        );

        subtitle = `${categoryName} • ${expenseAccountName}`;
        signedAmount = `−${formatMoney(transaction.amount)}`;
        valueClass = "list-value list-value--red";
      }

      const shortDate = formatDateShort(transaction.created_at);
      const timeLabel = transaction.time_label || "";
      const caption = `${shortDate}${shortDate && timeLabel ? " • " : ""}${timeLabel}`;
      const title = getTransactionTitle(transaction);

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