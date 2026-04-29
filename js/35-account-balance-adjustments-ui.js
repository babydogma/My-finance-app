(() => {
  const META_KEY = "account_balance_adjustments_v1";

  const SELECTORS = {
    accountsList: "#accountsList",
    accountCard: ".list-card",
  };

  let activeAccountId = null;
  let isAccountSavePassThrough = false;

  function $(id) {
    return document.getElementById(id);
  }

  function getState() {
    return window.FinanceAppState?.state || null;
  }

  function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;

    try {
      if (typeof supabaseClient !== "undefined") {
        return supabaseClient;
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  function roundToTwo(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function parseMoneyInput(rawValue) {
    return Number(
      String(rawValue || "")
        .replace(/\s/g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")
    ) || 0;
  }

  function formatMoneyInputValue(value) {
    const rounded = roundToTwo(value);

    return String(rounded).replace(".", ",");
  }

  function getAccountById(accountId) {
    const state = getState();

    if (!state || !Array.isArray(state.accounts)) return null;

    return state.accounts.find((account) => account.id === accountId) || null;
  }

  function getRawAccountBalance(accountId) {
    const state = getState();
    const account = getAccountById(accountId);

    if (!state || !account) return 0;

    const accountName = account.name;

    return roundToTwo(
      state.transactions.reduce((sum, transaction) => {
        const amount = roundToTwo(Number(transaction.amount) || 0);

        if (transaction.type === "income") {
          const matchesById =
            transaction.account_id && transaction.account_id === accountId;

          const matchesLegacy =
            !transaction.account_id && transaction.account === accountName;

          if (matchesById || matchesLegacy) {
            return sum + amount;
          }
        }

        if (transaction.type === "expense") {
          const matchesById =
            transaction.account_id && transaction.account_id === accountId;

          const matchesLegacy =
            !transaction.account_id && transaction.account === accountName;

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

  function getManualAdjustment(accountId) {
    const state = getState();

    return window.FinanceAppAccountBalanceAdjustments
      ?.getAccountManualAdjustment(state, accountId) || 0;
  }

  function getCorrectedAccountBalance(accountId) {
    return roundToTwo(getRawAccountBalance(accountId) + getManualAdjustment(accountId));
  }

  function setLocalAdjustment(accountId, adjustment) {
    const state = getState();

    window.FinanceAppAccountBalanceAdjustments
      ?.setAccountManualAdjustmentLocal(state, accountId, adjustment);
  }

  async function saveAdjustmentsToSupabase() {
    const state = getState();
    const client = getSupabaseClient();

    if (!client) {
      throw new Error("Supabase client не найден");
    }

    const adjustments =
      window.FinanceAppAccountBalanceAdjustments
        ?.getAccountBalanceAdjustments(state) || {};

    const serialized = JSON.stringify(adjustments);

    const { error } = await client
      .from("app_meta")
      .upsert(
        {
          key: META_KEY,
          value: serialized,
        },
        {
          onConflict: "key",
        }
      );

    if (error) {
      throw error;
    }

    try {
      window.localStorage.setItem(META_KEY, serialized);
    } catch (error) {
      // Не критично.
    }
  }

  function ensureAccountBalanceField() {
    const accountModal = $("accountModal");
    const accountNameInput = $("accountNameInput");

    if (!accountModal || !accountNameInput) return null;

    let field = $("accountModalBalanceField");

    if (field) return field;

    field = document.createElement("div");
    field.className = "account-modal-balance-field hidden";
    field.id = "accountModalBalanceField";

    field.innerHTML = `
      <div class="account-modal-balance-field__label">
        Баланс
      </div>

      <div class="account-modal-balance-field__control">
        <input
          class="input account-modal-balance-field__input"
          id="accountModalBalanceInput"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          placeholder="0"
        />

        <span class="account-modal-balance-field__symbol">₽</span>
      </div>
    `;

    const nameField =
      accountNameInput.closest(".field") ||
      accountNameInput.parentElement;

    if (nameField) {
      nameField.insertAdjacentElement("afterend", field);
    }

    return field;
  }

  function syncAccountBalanceField() {
    const field = ensureAccountBalanceField();
    const input = $("accountModalBalanceInput");
    const account = getAccountById(activeAccountId);

    if (!field || !input) return;

    if (!account) {
      field.classList.add("hidden");
      input.value = "";
      return;
    }

    field.classList.remove("hidden");
    input.value = formatMoneyInputValue(getCorrectedAccountBalance(account.id));
  }

  function bindAccountCards() {
    const state = getState();
    const accountsList = document.querySelector(SELECTORS.accountsList);

    if (!state || !accountsList || !Array.isArray(state.accounts)) return;

    const cards = Array.from(accountsList.querySelectorAll(SELECTORS.accountCard));

    cards.forEach((card, index) => {
      const account = state.accounts[index];

      if (!account || !account.id) return;

      card.dataset.accountId = account.id;

      if (card.dataset.accountBalanceInlineBound === "true") return;

      card.dataset.accountBalanceInlineBound = "true";

      card.addEventListener(
        "click",
        () => {
          activeAccountId = card.dataset.accountId || account.id;
        },
        true
      );
    });
  }

  function watchAccountsList() {
    const accountsList = document.querySelector(SELECTORS.accountsList);

    if (!accountsList) return;

    bindAccountCards();

    const observer = new MutationObserver(() => {
      bindAccountCards();
    });

    observer.observe(accountsList, {
      childList: true,
      subtree: true,
    });
  }

  function watchAccountModal() {
    const accountModal = $("accountModal");

    if (!accountModal) return;

    const observer = new MutationObserver(() => {
      if (!accountModal.classList.contains("hidden")) {
        window.requestAnimationFrame(syncAccountBalanceField);
      } else {
        activeAccountId = null;
      }
    });

    observer.observe(accountModal, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  async function saveInlineAccountBalanceBeforeAccountSave(event) {
    if (isAccountSavePassThrough) return;

    const accountModal = $("accountModal");
    const input = $("accountModalBalanceInput");
    const saveBtn = $("saveAccountModalBtn");

    if (!accountModal || !input || !saveBtn) return;
    if (accountModal.classList.contains("hidden")) return;

    const account = getAccountById(activeAccountId);

    if (!account) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const desiredBalance = parseMoneyInput(input.value);
    const rawBalance = getRawAccountBalance(account.id);
    const replacementAdjustment = roundToTwo(desiredBalance - rawBalance);

    try {
      setLocalAdjustment(account.id, replacementAdjustment);
      await saveAdjustmentsToSupabase();

      isAccountSavePassThrough = true;
      saveBtn.click();
      isAccountSavePassThrough = false;
    } catch (error) {
      isAccountSavePassThrough = false;
      alert(`Не получилось сохранить баланс счёта: ${error.message || error}`);
    }
  }

  function bindAccountSaveButton() {
    const saveBtn = $("saveAccountModalBtn");

    if (!saveBtn || saveBtn.dataset.accountBalanceInlineBound === "true") return;

    saveBtn.dataset.accountBalanceInlineBound = "true";

    saveBtn.addEventListener(
      "click",
      saveInlineAccountBalanceBeforeAccountSave,
      true
    );
  }

  function boot() {
    ensureAccountBalanceField();
    watchAccountsList();
    watchAccountModal();
    bindAccountSaveButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();