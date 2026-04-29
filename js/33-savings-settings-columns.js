(() => {
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

  function getGlobalValue(name) {
    try {
      return Function(`return typeof ${name} !== "undefined" ? ${name} : undefined`)();
    } catch (error) {
      return undefined;
    }
  }

  function getActiveBucketId() {
    const activeId = getGlobalValue("activeSafeBucketAmountId");

    if (activeId) return activeId;

    const modal = $("safeBucketAmountModal");

    return modal?.dataset?.bucketId || modal?.dataset?.safeBucketId || "";
  }

  function getAppState() {
    return getGlobalValue("state") || window.state || null;
  }

  function getSupabaseClient() {
    return getGlobalValue("supabaseClient") || window.supabaseClient || null;
  }

  function getBucketById(bucketId) {
    const state = getAppState();

    return state?.safeBuckets?.find((bucket) => bucket.id === bucketId) || null;
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
    const kind = String(bucket?.kind || "").trim();

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

    $("savingsTypeSelect")?.addEventListener("change", () => {
      syncHint();
    });

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
    const state = getAppState();

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

    let ratesMap = {};

    const getRatesMap = getGlobalValue("getSafeBucketInterestRatesMap");

    if (typeof getRatesMap === "function") {
      ratesMap = {
        ...getRatesMap(),
      };
    }

    if (annualRate > 0) {
      ratesMap[bucketId] = annualRate;
    } else {
      delete ratesMap[bucketId];
    }

    const setAppMetaLocalValue = getGlobalValue("setAppMetaLocalValue");

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

    /*
      Legacy-синхронизация:
      старый код начисления процентов может ещё читать app_meta.safe_bucket_interest_rates.
      Поэтому пока дублируем туда annual_rate.
      Когда полностью уберём старую логику процентов — этот блок можно будет удалить.
    */
    await saveLegacyInterestRate(bucketId, patch.annual_rate);
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
    });
  }

  function boot() {
    ensureSettingsPanel();
    bindSavingsColumnsEditor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();