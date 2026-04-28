(() => {
  const META_KEY = "account_balance_adjustments_v1";

  const SELECTORS = {
    accountsList: "#accountsList",
    accountCard: ".list-card",
    accountValue: ".list-value",
    accountRight: ".list-right",
  };

  let modalEl = null;
  let activeAccountId = null;

  function getState() {
    return window.FinanceAppState?.state || null;
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

  function formatMoney(value) {
    const rounded = roundToTwo(value);

    return `${rounded.toLocaleString("ru-RU", {
      minimumFractionDigits: rounded % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })} ₽`;
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

  function ensureModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement("div");
    modalEl.className = "modal hidden account-balance-adjustment-modal";
    modalEl.id = "accountBalanceAdjustmentModal";

    modalEl.innerHTML = `
      <div class="modal-sheet account-balance-adjustment-sheet">
        <div class="modal-handle"></div>

        <h3 class="modal-title account-balance-adjustment-title">
          Изменить сумму
        </h3>

        <div class="account-balance-adjustment-card">
          <div class="account-balance-adjustment-card__label">
            Счёт
          </div>

          <div class="account-balance-adjustment-card__name" id="accountBalanceAdjustmentName">
            —
          </div>

          <div class="account-balance-adjustment-card__meta">
            По операциям:
            <strong id="accountBalanceAdjustmentRawValue">0 ₽</strong>
          </div>

          <div class="account-balance-adjustment-card__meta">
            Сейчас показывается:
            <strong id="accountBalanceAdjustmentCurrentValue">0 ₽</strong>
          </div>
        </div>

        <div class="field account-balance-adjustment-field">
          <input
            class="input account-balance-adjustment-input"
            id="accountBalanceAdjustmentInput"
            type="text"
            inputmode="decimal"
            autocomplete="off"
            placeholder="Новая сумма"
          />
          <span class="account-balance-adjustment-symbol">₽</span>
        </div>

        <div class="account-balance-adjustment-diff" id="accountBalanceAdjustmentDiff">
          Новое число заменит старое
        </div>

        <div class="account-balance-adjustment-note">
          Сумма счёта будет заменена на введённую. Операция не создаётся, в аналитику ничего не попадает.
        </div>

        <div class="modal-actions account-balance-adjustment-actions">
          <button class="btn btn-secondary" type="button" id="cancelAccountBalanceAdjustmentBtn">
            Отмена
          </button>

          <button class="btn btn-primary" type="button" id="saveAccountBalanceAdjustmentBtn">
            Сохранить сумму
          </button>

          <button class="btn btn-danger" type="button" id="resetAccountBalanceAdjustmentBtn">
            Вернуть расчёт по операциям
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    modalEl.addEventListener("click", (event) => {
      if (event.target === modalEl) {
        closeModal();
      }
    });

    modalEl
      .querySelector("#cancelAccountBalanceAdjustmentBtn")
      ?.addEventListener("click", closeModal);

    modalEl
      .querySelector("#saveAccountBalanceAdjustmentBtn")
      ?.addEventListener("click", saveActiveAdjustment);

    modalEl
      .querySelector("#resetAccountBalanceAdjustmentBtn")
      ?.addEventListener("click", resetActiveAdjustment);

    modalEl
      .querySelector("#accountBalanceAdjustmentInput")
      ?.addEventListener("input", updateDiffPreview);

    return modalEl;
  }

  function openModal(accountId) {
    const account = getAccountById(accountId);

    if (!account) return;

    activeAccountId = accountId;

    const modal = ensureModal();
    const rawBalance = getRawAccountBalance(accountId);
    const currentBalance = getCorrectedAccountBalance(accountId);

    modal.querySelector("#accountBalanceAdjustmentName").textContent = account.name;
    modal.querySelector("#accountBalanceAdjustmentRawValue").textContent = formatMoney(rawBalance);
    modal.querySelector("#accountBalanceAdjustmentCurrentValue").textContent = formatMoney(currentBalance);

    const input = modal.querySelector("#accountBalanceAdjustmentInput");

    input.value = String(currentBalance).replace(".", ",");
    updateDiffPreview();

    modal.classList.remove("hidden", "is-closing");

    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
      input.focus();
      input.select();
    });
  }

  function closeModal() {
    if (!modalEl) return;

    modalEl.classList.remove("is-visible");
    modalEl.classList.add("is-closing");

    setTimeout(() => {
      modalEl.classList.add("hidden");
      modalEl.classList.remove("is-closing");
      activeAccountId = null;
    }, 280);
  }

  function updateDiffPreview() {
    if (!modalEl || !activeAccountId) return;

    const input = modalEl.querySelector("#accountBalanceAdjustmentInput");
    const diffEl = modalEl.querySelector("#accountBalanceAdjustmentDiff");

    const desiredBalance = parseMoneyInput(input.value);
    const currentBalance = getCorrectedAccountBalance(activeAccountId);
    const differenceFromCurrent = roundToTwo(desiredBalance - currentBalance);

    if (Math.abs(differenceFromCurrent) < 0.005) {
      diffEl.textContent = "Останется текущее число";
      diffEl.classList.remove("is-negative", "is-positive");
      return;
    }

    diffEl.textContent = `Счёт станет: ${formatMoney(desiredBalance)}`;
    diffEl.classList.toggle("is-negative", differenceFromCurrent < 0);
    diffEl.classList.toggle("is-positive", differenceFromCurrent > 0);
  }

  async function saveActiveAdjustment() {
    if (!modalEl || !activeAccountId) return;

    const input = modalEl.querySelector("#accountBalanceAdjustmentInput");
    const saveBtn = modalEl.querySelector("#saveAccountBalanceAdjustmentBtn");

    const desiredBalance = parseMoneyInput(input.value);
    const rawBalance = getRawAccountBalance(activeAccountId);

    /*
      Важно:
      здесь НЕ прибавляется новая корректировка к старой.
      Старое значение для этого счёта заменяется новым:
      новое_отображаемое_число - баланс_по_операциям.
    */
    const replacementAdjustment = roundToTwo(desiredBalance - rawBalance);

    saveBtn.disabled = true;
    saveBtn.textContent = "Сохраняю…";

    try {
      setLocalAdjustment(activeAccountId, replacementAdjustment);
      await saveAdjustmentsToSupabase();

      window.location.reload();
    } catch (error) {
      alert(`Не получилось сохранить сумму: ${error.message || error}`);
      saveBtn.disabled = false;
      saveBtn.textContent = "Сохранить сумму";
    }
  }

  async function resetActiveAdjustment() {
    if (!modalEl || !activeAccountId) return;

    const resetBtn = modalEl.querySelector("#resetAccountBalanceAdjustmentBtn");

    resetBtn.disabled = true;
    resetBtn.textContent = "Возвращаю…";

    try {
      setLocalAdjustment(activeAccountId, 0);
      await saveAdjustmentsToSupabase();

      window.location.reload();
    } catch (error) {
      alert(`Не получилось вернуть расчёт по операциям: ${error.message || error}`);
      resetBtn.disabled = false;
      resetBtn.textContent = "Вернуть расчёт по операциям";
    }
  }

  function createEditButton(accountId) {
    const button = document.createElement("button");

    button.className = "account-balance-edit-btn";
    button.type = "button";
    button.dataset.accountBalanceEditBtn = "true";
    button.setAttribute("aria-label", "Изменить сумму счёта");
    button.textContent = "✎";

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      openModal(accountId);
    });

    return button;
  }

  function syncAccountCards() {
    const state = getState();
    const accountsList = document.querySelector(SELECTORS.accountsList);

    if (!state || !accountsList || !Array.isArray(state.accounts)) return;

    const cards = Array.from(accountsList.querySelectorAll(SELECTORS.accountCard));

    cards.forEach((card, index) => {
      const account = state.accounts[index];

      if (!account || !account.id) return;

      card.dataset.accountId = account.id;

      const rightSide = card.querySelector(SELECTORS.accountRight);
      const valueEl = card.querySelector(SELECTORS.accountValue);

      if (!rightSide || !valueEl) return;

      if (!rightSide.querySelector("[data-account-balance-edit-btn='true']")) {
        rightSide.appendChild(createEditButton(account.id));
      }

      const manualAdjustment = getManualAdjustment(account.id);

      card.classList.toggle(
        "account-card--has-manual-adjustment",
        Math.abs(manualAdjustment) >= 0.005
      );
    });
  }

  function startObserver() {
    const accountsList = document.querySelector(SELECTORS.accountsList);

    if (!accountsList) return;

    syncAccountCards();

    const observer = new MutationObserver(() => {
      syncAccountCards();
    });

    observer.observe(accountsList, {
      childList: true,
      subtree: true,
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    startObserver();
  });
})();