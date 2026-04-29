(() => {
  const ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY = "account_balance_adjustments_v1";

  const SAVINGS_TYPES = {
    default: {
      label: "Обычное",
      hint: "Обычное накопление: цель, копилка или отдельный денежный карман.",
    },
    reserve: {
      label: "Резерв",
      hint: "Резерв: деньги защищены и не должны считаться свободными.",
    },
    required: {
      label: "Обязательное",
      hint: "Обязательное: деньги под налоги, квартиру, платежи или фиксированную цель.",
    },
    asset: {
      label: "Актив",
      hint: "Актив: золото, валюта, крипта или другое имущество. Проценты можно выключить.",
    },
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getBridge() {
    return window.FinanceAppSavingsBridge || null;
  }

  function getState() {
    return getBridge()?.getState?.() || window.FinanceAppState?.state || null;
  }

  function getSupabaseClient() {
    return getBridge()?.getSupabaseClient?.() || null;
  }

  function roundToTwo(value) {
    const bridgeRound = getBridge()?.roundToTwo;

    if (typeof bridgeRound === "function") {
      return bridgeRound(value);
    }

    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function getActiveBucketId() {
    const bridgeId = getBridge()?.getActiveBucketId?.();

    if (bridgeId) return bridgeId;

    const modal = $("safeBucketAmountModal");

    return modal?.dataset?.bucketId || modal?.dataset?.safeBucketId || "";
  }

  function getBucketById(bucketId) {
    const fromBridge = getBridge()?.getSafeBucketById?.(bucketId);

    if (fromBridge) return fromBridge;

    const state = getState();

    return state?.safeBuckets?.find((bucket) => bucket.id === bucketId) || null;
  }

  function getVaultAccount() {
    const fromBridge = getBridge()?.getVaultAccount?.();

    if (fromBridge) return fromBridge;

    const state = getState();

    return state?.accounts?.find((account) => account.account_kind === "vault_pool") || null;
  }

  function roundRate(value) {
    const number = Number(value) || 0;

    return Math.max(0, Math.round(number * 1000000) / 1000000);
  }

  function parsePercentInput(value) {
    return (
      Number(
        String(value || "0")
          .replace(",", ".")
          .replace("%", "")
          .trim()
      ) || 0
    );
  }

  function legacyTypeFromBucket(bucket) {
    const kind = String(bucket?.kind || bucket?.bucket_kind || "").trim();

    if (kind === "tax" || kind === "housing") return "required";
    if (kind === "reserve") return "reserve";

    return "default";
  }

  function getBucketSettings(bucket) {
    const legacyRate = Number(bucket?.annual_rate) || 0;
    const type = bucket?.savings_type || legacyTypeFromBucket(bucket);

    return {
      savings_type: type,
      interest_enabled: Boolean(bucket?.interest_enabled),
      annual_rate: Boolean(bucket?.interest_enabled) ? legacyRate : 0,
      include_in_protected:
        typeof bucket?.include_in_protected === "boolean"
          ? bucket.include_in_protected
          : type !== "default",
      include_in_free_money:
        typeof bucket?.include_in_free_money === "boolean"
          ? bucket.include_in_free_money
          : false,
    };
  }

  function ensureFieldLabel(input, labelText) {
    if (!input) return;

    const field = input.closest(".field") || input.parentElement;

    if (!field) return;

    let label = field.querySelector(".savings-editor-field-label");

    if (!label) {
      label = document.createElement("div");
      label.className = "savings-editor-field-label";
      field.insertBefore(label, input);
    }

    label.textContent = labelText;
  }

  function ensureSettingsPanel() {
    const modal = $("safeBucketAmountModal");
    const interestInput = $("safeBucketInterestInput");

    if (!modal || !interestInput) return;

    ensureFieldLabel($("safeBucketNameInput"), "Название накопления");
    ensureFieldLabel($("safeBucketAmountInput"), "Текущая сумма");
    ensureFieldLabel(interestInput, "Годовой процент");

    if ($("savingsColumnsSettingsPanel")) return;

    const panel = document.createElement("div");
    panel.className = "savings-editor-settings-panel";
    panel.id = "savingsColumnsSettingsPanel";

    panel.innerHTML = `
      <div class="savings-editor-field-label">Тип накопления</div>

      <select class="input savings-editor-type-select" id="savingsTypeSelect">
        <option value="default">Обычное</option>
        <option value="reserve">Резерв</option>
        <option value="required">Обязательное</option>
        <option value="asset">Актив</option>
      </select>

      <label class="savings-editor-toggle-row" for="savingsInterestEnabledInput">
        <span>
          <strong>Начислять проценты</strong>
          <small>Выключи, если это золото, наличка, валюта, крипта или другой актив без банковской ставки.</small>
        </span>

        <input id="savingsInterestEnabledInput" type="checkbox" />

        <i aria-hidden="true"></i>
      </label>

      <div class="savings-editor-settings-hint" id="savingsSettingsHint">
        Настройки накопления сохраняются в Supabase.
      </div>
    `;

    const interestField =
      interestInput.closest(".field") ||
      interestInput.parentElement;

    if (interestField) {
      interestField.insertAdjacentElement("afterend", panel);
    }

    $("savingsTypeSelect")?.addEventListener("change", syncHint);

    $("savingsInterestEnabledInput")?.addEventListener("change", () => {
      const checkbox = $("savingsInterestEnabledInput");

      if (!checkbox?.checked && interestInput) {
        interestInput.value = "0";
      }

      syncInterestFieldState();
      syncHint();
    });
  }

  function syncInterestFieldState() {
    const checkbox = $("savingsInterestEnabledInput");
    const interestInput = $("safeBucketInterestInput");

    if (!checkbox || !interestInput) return;

    const field =
      interestInput.closest(".field") ||
      interestInput.parentElement;

    interestInput.disabled = !checkbox.checked;

    field?.classList.toggle(
      "savings-editor-interest-disabled",
      !checkbox.checked
    );
  }

  function syncHint() {
    const typeSelect = $("savingsTypeSelect");
    const checkbox = $("savingsInterestEnabledInput");
    const hint = $("savingsSettingsHint");

    if (!typeSelect || !hint) return;

    const type = typeSelect.value || "default";
    const baseHint = SAVINGS_TYPES[type]?.hint || SAVINGS_TYPES.default.hint;

    hint.textContent = checkbox?.checked
      ? `${baseHint} Проценты включены.`
      : `${baseHint} Проценты выключены.`;
  }

  function syncEditorFromBucket() {
    ensureSettingsPanel();

    const bucketId = getActiveBucketId();
    const bucket = getBucketById(bucketId);

    if (!bucket) return;

    const modal = $("safeBucketAmountModal");

    if (modal) {
      modal.dataset.bucketId = bucketId;
    }

    const settings = getBucketSettings(bucket);
    const typeSelect = $("savingsTypeSelect");
    const checkbox = $("savingsInterestEnabledInput");
    const interestInput = $("safeBucketInterestInput");
    const title = $("safeBucketAmountModalTitle");

    if (typeSelect) {
      typeSelect.value = settings.savings_type || "default";
    }

    if (checkbox) {
      checkbox.checked = Boolean(settings.interest_enabled);
    }

    if (interestInput) {
      const percent = settings.interest_enabled
        ? Math.round((Number(settings.annual_rate) || 0) * 10000) / 100
        : 0;

      interestInput.value = String(percent).replace(".", ",");
    }

    if (title) {
      title.textContent = bucket.name || "Накопление";
    }

    syncInterestFieldState();
    syncHint();
  }

  function getSettingsFromEditor() {
    const type = $("savingsTypeSelect")?.value || "default";
    const interestEnabled = Boolean($("savingsInterestEnabledInput")?.checked);
    const percent = parsePercentInput($("safeBucketInterestInput")?.value);
    const annualRate = interestEnabled ? roundRate(percent / 100) : 0;

    return {
      savings_type: type,
      interest_enabled: interestEnabled,
      annual_rate: annualRate,
      include_in_protected: type !== "default",
      include_in_free_money: false,
    };
  }

  function patchLocalBucket(bucketId, patch) {
    const state = getState();

    if (!state?.safeBuckets) return;

    const index = state.safeBuckets.findIndex((bucket) => bucket.id === bucketId);

    if (index === -1) return;

    state.safeBuckets[index] = {
      ...state.safeBuckets[index],
      ...patch,
    };
  }

  async function saveLegacyInterestRate(bucketId, annualRate) {
    const supabaseClient = getSupabaseClient();

    if (!supabaseClient || !bucketId) return;

    const state = getState();
    let ratesMap = {};

    const metaRecord = state?.appMeta?.find((item) => item.key === "safe_bucket_interest_rates");

    if (metaRecord?.value) {
      try {
        ratesMap = JSON.parse(metaRecord.value) || {};
      } catch (error) {
        ratesMap = {};
      }
    }

    if (annualRate > 0) {
      ratesMap[bucketId] = annualRate;
    } else {
      delete ratesMap[bucketId];
    }

    const setAppMetaLocalValue = getBridge()?.setAppMetaLocalValue;

    if (typeof setAppMetaLocalValue === "function") {
      setAppMetaLocalValue("safe_bucket_interest_rates", ratesMap);
    }

    await supabaseClient
      .from("app_meta")
      .upsert(
        {
          key: "safe_bucket_interest_rates",
          value: JSON.stringify(ratesMap),
        },
        {
          onConflict: "key",
        }
      );
  }

  async function saveSavingsColumnsFromEditor() {
    const bucketId = getActiveBucketId();
    const supabaseClient = getSupabaseClient();

    if (!bucketId || !supabaseClient) return;

    const patch = getSettingsFromEditor();

    patchLocalBucket(bucketId, patch);

    const { error } = await supabaseClient
      .from("safe_buckets")
      .update(patch)
      .eq("id", bucketId);

    if (error) {
      console.error("saveSavingsColumnsFromEditor error:", error);
      alert(`Не получилось сохранить настройки накопления: ${error.message || "unknown error"}`);
      return;
    }

    await saveLegacyInterestRate(bucketId, patch.annual_rate);
  }

  function calculateRawAccountBalance(account) {
    const state = getState();

    if (!state || !account) return 0;

    const accountId = account.id;
    const accountName = account.name;

    return roundToTwo(
      state.transactions.reduce((sum, transaction) => {
        const amount = roundToTwo(Number(transaction.amount) || 0);

        if (transaction.type === "income") {
          const byId = transaction.account_id && transaction.account_id === accountId;
          const legacy = !transaction.account_id && transaction.account === accountName;

          if (byId || legacy) return sum + amount;
        }

        if (transaction.type === "expense") {
          const byId = transaction.account_id && transaction.account_id === accountId;
          const legacy = !transaction.account_id && transaction.account === accountName;

          if (byId || legacy) return sum - amount;
        }

        if (transaction.type === "transfer") {
          const fromById = transaction.from_account_id && transaction.from_account_id === accountId;
          const toById = transaction.to_account_id && transaction.to_account_id === accountId;

          const fromLegacy = !transaction.from_account_id && transaction.from_account === accountName;
          const toLegacy = !transaction.to_account_id && transaction.to_account === accountName;

          if (fromById || fromLegacy) sum -= amount;
          if (toById || toLegacy) sum += amount;
        }

        return sum;
      }, 0)
    );
  }

  function getBucketsTotalBalance() {
    const state = getState();
    const getSafeBucketBalance = getBridge()?.getSafeBucketBalance;

    if (!state?.safeBuckets) return 0;

    return roundToTwo(
      state.safeBuckets.reduce((sum, bucket) => {
        const amount =
          typeof getSafeBucketBalance === "function"
            ? getSafeBucketBalance(bucket.id)
            : Number(bucket.amount || bucket.balance || 0);

        return sum + (Number(amount) || 0);
      }, 0)
    );
  }

  async function syncVaultAccountBalanceToBuckets() {
    const supabaseClient = getSupabaseClient();
    const state = getState();
    const vaultAccount = getVaultAccount();

    if (!supabaseClient || !state || !vaultAccount) return;

    const bucketTotal = getBucketsTotalBalance();

    const rawBalanceFromBridge =
      typeof getBridge()?.getRawAccountBalance === "function"
        ? getBridge().getRawAccountBalance(vaultAccount.id)
        : calculateRawAccountBalance(vaultAccount);

    const manualAdjustment = roundToTwo(bucketTotal - rawBalanceFromBridge);

    const accountAdjustmentsApi = window.FinanceAppAccountBalanceAdjustments;

    if (!accountAdjustmentsApi?.setAccountManualAdjustmentLocal) return;

    const nextAdjustments = accountAdjustmentsApi.setAccountManualAdjustmentLocal(
      state,
      vaultAccount.id,
      manualAdjustment
    );

    const { error } = await supabaseClient
      .from("app_meta")
      .upsert(
        {
          key: ACCOUNT_BALANCE_ADJUSTMENTS_META_KEY,
          value: JSON.stringify(nextAdjustments),
        },
        {
          onConflict: "key",
        }
      );

    if (error) {
      console.error("syncVaultAccountBalanceToBuckets error:", error);
      return;
    }

    getBridge()?.renderAll?.();
  }

  async function renameSavingsAccountTitle(nextTitle) {
    const supabaseClient = getSupabaseClient();
    const state = getState();
    const vaultAccount = getVaultAccount();

    const title = String(nextTitle || "").trim();

    if (!title || !supabaseClient || !state || !vaultAccount) return;

    const { error } = await supabaseClient
      .from("accounts")
      .update({
        name: title,
      })
      .eq("id", vaultAccount.id);

    if (error) {
      console.error("renameSavingsAccountTitle error:", error);
      alert(`Не получилось переименовать накопительный счёт: ${error.message || "unknown error"}`);
      return;
    }

    const account = state.accounts.find((item) => item.id === vaultAccount.id);

    if (account) {
      account.name = title;
    }

    const modalTitle = $("safeBucketsModalTitle");

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    await getBridge()?.loadDataFromSupabase?.();
    getBridge()?.renderAll?.();
  }

  function syncSavingsSectionTitle() {
    const modalTitle = $("safeBucketsModalTitle");
    const vaultAccount = getVaultAccount();

    if (!modalTitle || !vaultAccount) return;

    modalTitle.textContent = vaultAccount.name || "Накопления";
  }

  function ensureSavingsTitleEditButton() {
    const modalTitle = $("safeBucketsModalTitle");

    if (!modalTitle) return;

    const titleWrap = modalTitle.parentElement;

    if (!titleWrap) return;

    let button = $("editSavingsSectionTitleBtn");

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.id = "editSavingsSectionTitleBtn";
      button.className = "savings-section-title-edit-btn";
      button.textContent = "Переименовать";

      titleWrap.appendChild(button);
    }

    button.onclick = async () => {
      const currentTitle = getVaultAccount()?.name || "Накопления";

      const nextTitle = window.prompt(
        "Название накопительного счёта",
        currentTitle
      );

      if (nextTitle === null) return;

      await renameSavingsAccountTitle(nextTitle);
    };
  }

  function schedulePostSaveSync() {
    window.setTimeout(async () => {
      try {
        await getBridge()?.loadDataFromSupabase?.();
        await syncVaultAccountBalanceToBuckets();
        await getBridge()?.loadDataFromSupabase?.();
        getBridge()?.renderAll?.();
        syncEditorFromBucket();
      } catch (error) {
        console.error("schedulePostSaveSync error:", error);
      }
    }, 700);
  }

  function bindSavingsColumnsEditor() {
    const modal = $("safeBucketAmountModal");
    const saveBtn = $("saveSafeBucketAmountBtn");

    if (!modal || !saveBtn) return;

    const observer = new MutationObserver(() => {
      if (!modal.classList.contains("hidden")) {
        window.requestAnimationFrame(syncEditorFromBucket);
      }
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ["class"],
    });

    saveBtn.addEventListener("click", () => {
      saveSavingsColumnsFromEditor();
      schedulePostSaveSync();
    });
  }

  function bindSavingsModalTitle() {
    const modal = $("safeBucketsModal");

    if (!modal) return;

    const observer = new MutationObserver(() => {
      if (!modal.classList.contains("hidden")) {
        syncSavingsSectionTitle();
        ensureSavingsTitleEditButton();
      }
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ["class"],
    });

    syncSavingsSectionTitle();
    ensureSavingsTitleEditButton();
  }

  function boot() {
    ensureSettingsPanel();
    bindSavingsColumnsEditor();
    bindSavingsModalTitle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();