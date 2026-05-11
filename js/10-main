(() => {
  const ROOT_ID = "walletCardsV1";
  const DECK_ID = "walletCardsDeck";
  const MAIN_CARD_ID = "walletMainAccountCard";
  const DRAFT_CARD_ID = "walletDraftCard";
  const META_KEY = "wallet_cards";

  const TYPES = [
    {
      value: "account",
      label: "Счёт",
      subtitle: "Счёт",
      entityType: "account",
      accountKind: "default",
      defaultColor: "graphite",
    },
    {
      value: "cash",
      label: "Наличные",
      subtitle: "Наличные деньги",
      entityType: "account",
      accountKind: "cash",
      defaultColor: "sand",
    },
    {
      value: "saving",
      label: "Накопления",
      subtitle: "Накопления",
      entityType: "safe_bucket",
      bucketKind: "saving",
      defaultColor: "sky",
    },
  ];

  const COLORS = [
    { value: "graphite", label: "Графит" },
    { value: "sand", label: "Песок" },
    { value: "sky", label: "Небо" },
    { value: "sage", label: "Шалфей" },
    { value: "pearl", label: "Жемчуг" },
  ];

  let uiMetaCache = null;
  let isSavingDraft = false;
  let activeCustomCardKey = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function byId(id) {
    return document.getElementById(id);
  }

  function textById(id, fallback = "") {
    return byId(id)?.textContent?.trim() || fallback;
  }

  function setText(id, value) {
    const node = byId(id);
    if (node) node.textContent = value;
  }

  function html(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cssEscape(value) {
    if (window.CSS?.escape) {
      return window.CSS.escape(String(value));
    }

    return String(value).replace(/["\\]/g, "\\$&");
  }

  function makeUiId(prefix) {
    if (window.crypto?.randomUUID) {
      return `${prefix}_${window.crypto.randomUUID()}`;
    }

    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function makeDbId() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = Math.random() * 16 | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
    });
  }

  function bridge() {
    return window.FinanceAppSavingsBridge || null;
  }

  function state() {
    return bridge()?.getState?.() || window.FinanceAppState?.state || null;
  }

  function supabase() {
    return bridge()?.getSupabaseClient?.() || window.supabaseClient || null;
  }

  function roundMoney(value) {
    const amount = Number(value) || 0;

    if (typeof bridge()?.roundToTwo === "function") {
      return bridge().roundToTwo(amount);
    }

    return Math.round(amount * 100) / 100;
  }

  function parseMoney(value) {
    const normalized = String(value || "")
      .replace(/\s+/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    return roundMoney(Number(normalized) || 0);
  }

  function formatMoney(value) {
    const amount = roundMoney(value);

    if (typeof bridge()?.formatMoney === "function") {
      return bridge().formatMoney(amount);
    }

    return `${new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: amount % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(amount)} ₽`;
  }

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function typeOf(value) {
    return TYPES.find((item) => item.value === value) || TYPES[0];
  }

  function colorOf(value) {
    return COLORS.find((item) => item.value === value) || COLORS[0];
  }

  function entityKey(entityType, entityId) {
    return `${entityType}:${entityId}`;
  }

  function deck() {
    return byId(DECK_ID);
  }

  function clickById(id) {
    const node = byId(id);
    if (!node) return false;

    node.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    return true;
  }

  function openModalFallback(modalId) {
    const modal = byId(modalId);
    if (!modal) return;

    modal.classList.add("modal");

    if (window.FinanceAppModalCore?.openAnimatedModal) {
      window.FinanceAppModalCore.openAnimatedModal(modal);
      return;
    }

    modal.classList.remove("hidden", "is-closing");

    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
    });
  }

  function isModalVisible(modalId) {
    const modal = byId(modalId);

    return Boolean(
      modal &&
      !modal.classList.contains("hidden") &&
      !modal.classList.contains("is-closing")
    );
  }

  function openTarget(triggerId, modalId) {
    clickById(triggerId);

    window.setTimeout(() => {
      if (!isModalVisible(modalId)) {
        openModalFallback(modalId);
      }
    }, 60);
  }

  function mainAction(action) {
    if (action === "mandatory") {
      openTarget("openMandatoryPaymentsModalBtn", "mandatoryPaymentsModal");
      return;
    }

    if (action === "budget") {
      openTarget("openBudgetAnalyticsModalBtn", "budgetAnalyticsModal");
      return;
    }

    if (action === "expected") {
      openTarget("openExpectedIncomeModalBtn", "expectedIncomeModal");
    }
  }

  function emptyMeta() {
    return {
      hidden: [],
      colors: {},
      order: [],
      amounts: {},
    };
  }

  function readMetaFromLocalStorage(key) {
    try {
      return window.localStorage?.getItem(`finance_app_${key}`) || "";
    } catch {
      return "";
    }
  }

  function writeMetaToLocalStorage(key, value) {
    try {
      window.localStorage?.setItem(`finance_app_${key}`, value);
    } catch {
      // localStorage может быть недоступен в приватном режиме. Это не должно ломать приложение.
    }
  }


  function readMetaFromState(key) {
    const meta = state()?.appMeta || state()?.app_meta || state()?.meta || null;

    if (!meta) return "";

    if (Array.isArray(meta)) {
      const row = meta.find((item) => {
        return item?.id === key || item?.key === key || item?.name === key || item?.meta_key === key;
      });

      return row?.value ?? row?.meta_value ?? row?.json_value ?? row?.data ?? "";
    }

    if (typeof meta === "object") {
      const value = meta[key];

      if (typeof value === "string") return value;

      if (value && typeof value === "object") {
        return value.value ?? value.meta_value ?? value.json_value ?? value.data ?? "";
      }

      return value ?? "";
    }

    return "";
  }

  function parseRawMeta(raw) {
    if (!raw) return emptyMeta();

    if (typeof raw === "object" && !Array.isArray(raw)) {
      return normalizeMeta(raw);
    }

    try {
      return normalizeMeta(JSON.parse(String(raw)));
    } catch {
      return emptyMeta();
    }
  }

  function normalizeMeta(raw) {
    const meta = emptyMeta();

    if (!raw || typeof raw !== "object") {
      return meta;
    }

    if (Array.isArray(raw.hidden)) {
      meta.hidden = raw.hidden.map(String);
    }

    if (raw.colors && typeof raw.colors === "object") {
      Object.entries(raw.colors).forEach(([key, value]) => {
        meta.colors[String(key)] = colorOf(value).value;
      });
    }

    if (Array.isArray(raw.order)) {
      meta.order = raw.order.map(String);
    }

    if (raw.amounts && typeof raw.amounts === "object") {
      Object.entries(raw.amounts).forEach(([key, value]) => {
        meta.amounts[String(key)] = roundMoney(value);
      });
    }

    // Миграция старого формата { cards: [...] }, который был в предыдущей версии.
    if (Array.isArray(raw.cards)) {
      raw.cards.forEach((card) => {
        if (!card?.entityId) return;

        const key = entityKey(
          card.entityType === "safe_bucket" ? "safe_bucket" : "account",
          card.entityId
        );

        if (card.color || card.theme) {
          meta.colors[key] = colorOf(card.color || card.theme).value;
        }

        if (Number(card.initialAmount)) {
          meta.amounts[key] = roundMoney(card.initialAmount);
        }

        if (!meta.order.includes(key)) {
          meta.order.push(key);
        }
      });
    }

    return meta;
  }

  function metaValueFromRow(row) {
    return row?.value ?? row?.meta_value ?? row?.json_value ?? row?.data ?? "";
  }

  function getUiMeta() {
    if (uiMetaCache) return uiMetaCache;

    const stateMeta = readMetaFromState(META_KEY);
    const storageMeta = readMetaFromLocalStorage(META_KEY);

    uiMetaCache = parseRawMeta(stateMeta || storageMeta);

    return uiMetaCache;
  }

  async function loadUiMetaFromSupabase() {
    const client = supabase();

    if (!client?.from) {
      uiMetaCache = parseRawMeta(readMetaFromState(META_KEY) || readMetaFromLocalStorage(META_KEY));
      renderCards();
      return;
    }

    const attempts = [
      () => client.from("app_meta").select("*").eq("id", META_KEY).maybeSingle(),
      () => client.from("app_meta").select("*").eq("key", META_KEY).maybeSingle(),
      () => client.from("app_meta").select("*").eq("name", META_KEY).maybeSingle(),
      () => client.from("app_meta").select("*").eq("meta_key", META_KEY).maybeSingle(),
    ];

    for (const attempt of attempts) {
      const { data, error } = await attempt();

      if (!error) {
        uiMetaCache = parseRawMeta(metaValueFromRow(data));
        renderCards();
        return;
      }
    }

    uiMetaCache = parseRawMeta(readMetaFromState(META_KEY) || readMetaFromLocalStorage(META_KEY));
    renderCards();
  }

  async function saveUiMeta(meta) {
    const normalized = normalizeMeta(meta);
    const value = JSON.stringify(normalized);

    uiMetaCache = normalized;
    writeMetaToLocalStorage(META_KEY, value);
    bridge()?.setAppMetaLocalValue?.(META_KEY, value);

    const client = supabase();

    if (!client?.from) return;

    const attempts = [
      () => client.from("app_meta").upsert({ id: META_KEY, key: META_KEY, value }, { onConflict: "id" }),
      () => client.from("app_meta").upsert({ id: META_KEY, key: META_KEY, value }, { onConflict: "key" }),
      () => client.from("app_meta").upsert({ key: META_KEY, value }, { onConflict: "key" }),
    ];

    let lastError = null;

    for (const attempt of attempts) {
      const { error } = await attempt();

      if (!error) return;

      lastError = error;
    }

    throw lastError || new Error("Не удалось сохранить настройки карточек.");
  }

  async function tryDb(attempts, message) {
    let lastError = null;

    for (const attempt of attempts) {
      const { data, error } = await attempt();

      if (!error) {
        if (Array.isArray(data)) return data[0] || null;
        return data || null;
      }

      lastError = error;
    }

    throw lastError || new Error(message);
  }

  async function createAccount(draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const id = makeDbId();
    const type = typeOf(draft.type);
    const now = new Date().toISOString();

    return tryDb(
      [
        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            role: type.accountKind,
            account_role: type.accountKind,
            account_kind: type.accountKind,
            kind: type.accountKind,
            primary_spend: false,
            is_primary_spend: false,
            balance: draft.amount,
            initial_balance: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            role: type.accountKind,
            account_kind: type.accountKind,
            balance: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            role: type.accountKind,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("accounts")
          .insert({
            id,
            name: draft.title,
            created_at: now,
          })
          .select("*")
          .single(),
      ],
      "Не удалось создать счёт."
    );
  }

  async function createBucket(draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const id = makeDbId();
    const now = new Date().toISOString();

    return tryDb(
      [
        () => client
          .from("safe_buckets")
          .insert({
            id,
            name: draft.title,
            kind: "saving",
            bucket_kind: "saving",
            amount: draft.amount,
            balance: draft.amount,
            current_amount: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("safe_buckets")
          .insert({
            id,
            name: draft.title,
            kind: "saving",
            amount: draft.amount,
            created_at: now,
          })
          .select("*")
          .single(),

        () => client
          .from("safe_buckets")
          .insert({
            id,
            name: draft.title,
            created_at: now,
          })
          .select("*")
          .single(),
      ],
      "Не удалось создать накопление."
    );
  }

  async function createEntity(draft) {
    if (draft.type === "saving") {
      const bucket = await createBucket(draft);

      return {
        entityType: "safe_bucket",
        row: bucket,
      };
    }

    const account = await createAccount(draft);

    return {
      entityType: "account",
      row: account,
    };
  }

  function insertEntityIntoLocalState(entityType, row) {
    const appState = state();
    if (!appState || !row?.id) return;

    if (entityType === "safe_bucket") {
      if (!Array.isArray(appState.safeBuckets)) {
        appState.safeBuckets = [];
      }

      if (!appState.safeBuckets.some((item) => String(item.id) === String(row.id))) {
        appState.safeBuckets.push(row);
      }

      return;
    }

    if (!Array.isArray(appState.accounts)) {
      appState.accounts = [];
    }

    if (!appState.accounts.some((item) => String(item.id) === String(row.id))) {
      appState.accounts.push(row);
    }
  }

  function updateEntityInLocalState(entityType, entityId, patch) {
    const appState = state();
    if (!appState || !entityId) return;

    const collectionName = entityType === "safe_bucket" ? "safeBuckets" : "accounts";
    const collection = Array.isArray(appState[collectionName]) ? appState[collectionName] : [];

    const row = collection.find((item) => String(item.id) === String(entityId));
    if (!row) return;

    Object.assign(row, patch);
  }

  async function updateAccountEntity(card, draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const accountKind = draft.type === "cash" ? "cash" : "default";

    const patchAttempts = [
      {
        name: draft.title,
        role: accountKind,
        account_role: accountKind,
        account_kind: accountKind,
        kind: accountKind,
        balance: draft.amount,
        initial_balance: draft.amount,
      },
      {
        name: draft.title,
        role: accountKind,
        account_kind: accountKind,
        balance: draft.amount,
      },
      {
        name: draft.title,
        role: accountKind,
      },
      {
        name: draft.title,
      },
    ];

    const attempts = patchAttempts.map((patch) => {
      return () => client
        .from("accounts")
        .update(patch)
        .eq("id", card.entityId)
        .select("*")
        .single();
    });

    const row = await tryDb(attempts, "Не удалось обновить счёт.");

    updateEntityInLocalState("account", card.entityId, {
      name: draft.title,
      role: accountKind,
      account_role: accountKind,
      account_kind: accountKind,
      kind: accountKind,
      balance: draft.amount,
      initial_balance: draft.amount,
      ...(row || {}),
    });

    return row;
  }

  async function updateBucketEntity(card, draft) {
    const client = supabase();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const patchAttempts = [
      {
        name: draft.title,
        amount: draft.amount,
        balance: draft.amount,
        current_amount: draft.amount,
        kind: "saving",
        bucket_kind: "saving",
      },
      {
        name: draft.title,
        amount: draft.amount,
        kind: "saving",
      },
      {
        name: draft.title,
      },
    ];

    const attempts = patchAttempts.map((patch) => {
      return () => client
        .from("safe_buckets")
        .update(patch)
        .eq("id", card.entityId)
        .select("*")
        .single();
    });

    const row = await tryDb(attempts, "Не удалось обновить накопление.");

    updateEntityInLocalState("safe_bucket", card.entityId, {
      name: draft.title,
      amount: draft.amount,
      balance: draft.amount,
      current_amount: draft.amount,
      kind: "saving",
      bucket_kind: "saving",
      ...(row || {}),
    });

    return row;
  }

  async function updateEntity(card, draft) {
    if (!card) {
      throw new Error("Карта для редактирования не найдена.");
    }

    const oldTypeConfig = typeOf(card.type);
    const newTypeConfig = typeOf(draft.type);

    if (oldTypeConfig.entityType !== newTypeConfig.entityType) {
      throw new Error("Нельзя менять тип между счётом и накоплением. Создай новую карту нужного типа.");
    }

    if (card.entityType === "safe_bucket") {
      return updateBucketEntity(card, draft);
    }

    return updateAccountEntity(card, draft);
  }


  function getAccounts() {
    const accounts = state()?.accounts;

    return Array.isArray(accounts) ? accounts : [];
  }

  function getBuckets() {
    const buckets = state()?.safeBuckets;

    return Array.isArray(buckets) ? buckets : [];
  }

  function isProbablyCashAccount(account) {
    const text = normalizeText([
      account?.name,
      account?.role,
      account?.account_role,
      account?.account_kind,
      account?.kind,
    ].filter(Boolean).join(" "));

    return text.includes("cash") || text.includes("налич") || text.includes("налик");
  }

  function getAccountCardType(account) {
    return isProbablyCashAccount(account) ? "cash" : "account";
  }

  function getBucketCardType() {
    return "saving";
  }

  function getEntityTitle(card) {
    return card.title || "Карта";
  }

  function getAccountAmount(account, fallback = 0) {
    const direct = roundMoney(
      account?.balance ??
      account?.amount ??
      account?.initial_balance ??
      0
    );

    if (direct > 0) return direct;

    if (typeof bridge()?.getRawAccountBalance === "function" && account?.id) {
      const calculated = roundMoney(bridge().getRawAccountBalance(account.id));

      if (calculated > 0) return calculated;
    }

    return roundMoney(fallback);
  }

  function getBucketAmount(bucket, fallback = 0) {
    const direct = roundMoney(
      bucket?.amount ??
      bucket?.balance ??
      bucket?.current_amount ??
      0
    );

    if (direct > 0) return direct;

    if (typeof bridge()?.getSafeBucketBalance === "function" && bucket?.id) {
      const calculated = roundMoney(bridge().getSafeBucketBalance(bucket.id));

      if (calculated > 0) return calculated;
    }

    return roundMoney(fallback);
  }

  function buildEntityCards() {
    const meta = getUiMeta();
    const hidden = new Set(meta.hidden);
    const orderIndex = new Map(meta.order.map((key, index) => [key, index]));
    const cards = [];

    getAccounts().forEach((account, index) => {
      if (!account?.id) return;

      const key = entityKey("account", account.id);
      if (hidden.has(key)) return;

      const type = getAccountCardType(account);
      const typeConfig = typeOf(type);

      cards.push({
        id: key,
        entityType: "account",
        entityId: String(account.id),
        entityKey: key,
        type,
        color: colorOf(meta.colors[key] || typeConfig.defaultColor).value,
        title: String(account.name || "Счёт").trim(),
        subtitle: typeConfig.subtitle,
        amount: getAccountAmount(account, meta.amounts[key]),
        order: orderIndex.has(key) ? orderIndex.get(key) : 1000 + index,
      });
    });

    getBuckets().forEach((bucket, index) => {
      if (!bucket?.id) return;

      const key = entityKey("safe_bucket", bucket.id);
      if (hidden.has(key)) return;

      const type = getBucketCardType(bucket);
      const typeConfig = typeOf(type);

      cards.push({
        id: key,
        entityType: "safe_bucket",
        entityId: String(bucket.id),
        entityKey: key,
        type,
        color: colorOf(meta.colors[key] || typeConfig.defaultColor).value,
        title: String(bucket.name || "Накопления").trim(),
        subtitle: typeConfig.subtitle,
        amount: getBucketAmount(bucket, meta.amounts[key]),
        order: orderIndex.has(key) ? orderIndex.get(key) : 2000 + index,
      });
    });

    return cards.sort((a, b) => a.order - b.order);
  }

  function findEntityCardByKey(cardKey) {
    return buildEntityCards().find((card) => card.entityKey === cardKey) || null;
  }


  function createRoot() {
    if (byId(ROOT_ID)) return;

    const mainView = byId("mainView");
    const oldHero = $(".balance--game");

    if (!mainView || !oldHero) return;

    const section = document.createElement("section");
    section.className = "wallet-cards-v1";
    section.id = ROOT_ID;

    section.innerHTML = `
      <div class="wallet-cards-v1__head">
        <h1 class="wallet-cards-v1__title">Wallet</h1>

        <div class="wallet-cards-v1__actions">
          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsAddBtn" aria-label="Добавить карту">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
          </button>

          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsReportBtn" aria-label="Открыть итоги">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 19V5"></path>
              <path d="M6 19h13"></path>
              <path d="M10 15v-4"></path>
              <path d="M14 15V8"></path>
              <path d="M18 15v-6"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="wallet-cards-v1__stack wallet-cards-v1__stack--deck" id="${DECK_ID}">
        <article class="wallet-card-v1 wallet-card-v1--main" id="${MAIN_CARD_ID}" role="button" tabindex="0" aria-expanded="false">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>Основной счёт</strong>
              <span>Свободные деньги</span>
            </div>

            <strong class="wallet-card-v1__amount" id="walletMainAccountValue">0 ₽</strong>
          </div>

          <div class="wallet-card-v1__details">
            <div class="wallet-card-v1__details-inner">
              <div class="wallet-card-v1__details-content">
                <div class="wallet-card-v1__panel">
                  <div class="wallet-card-v1__row">
                    <span>Можно тратить</span>
                    <strong id="walletMainDailyValue">0 ₽/день</strong>
                  </div>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="mandatory">
                    <span>К списанию</span>
                    <strong id="walletMainMandatoryValue">0 ₽</strong>
                  </button>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="budget">
                    <span>Бюджет месяца</span>
                    <strong id="walletMainBudgetValue">0 ₽ из 0 ₽</strong>
                  </button>

                  <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="expected">
                    <span>Ожидаемые деньги</span>
                    <strong id="walletMainExpectedValue">не добавлено</strong>
                  </button>

                  <p class="wallet-card-v1__hint" id="walletMainHint">Данные обновятся после загрузки операций.</p>
                </div>

                <div class="wallet-card-v1__quick-actions">
                  <button class="wallet-card-v1__action wallet-card-v1__action--danger" type="button" id="walletMainExpenseBtn">Расход</button>
                  <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletMainIncomeBtn">Доход</button>
                  <button class="wallet-card-v1__action" type="button" id="walletMainReportBtn">Итоги</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;

    mainView.insertBefore(section, oldHero);
    document.body.classList.add("wallet-cards-v1-enabled", "wallet-mode-hard");
  }

  function cardHtml(card) {
    const color = colorOf(card.color).value;
    const isActive = activeCustomCardKey === card.entityKey;

    return `
      <article class="wallet-card-v1 wallet-card-v1--custom wallet-card-v1--theme-${html(color)} ${isActive ? "is-open" : ""}" data-wallet-custom-card="true" data-wallet-card-id="${html(card.id)}" data-wallet-entity-key="${html(card.entityKey)}" role="button" tabindex="0" aria-expanded="${isActive ? "true" : "false"}">
        <div class="wallet-card-v1__summary">
          <div class="wallet-card-v1__name">
            <strong>${html(getEntityTitle(card))}</strong>
            <span>${html(card.subtitle)}</span>
          </div>

          <strong class="wallet-card-v1__amount">${html(formatMoney(card.amount))}</strong>
        </div>

        <div class="wallet-card-v1__details">
          <div class="wallet-card-v1__details-inner">
            <div class="wallet-card-v1__details-content">
              <div class="wallet-card-v1__edit-panel">
                <button class="wallet-card-v1__edit-btn" type="button" data-wallet-edit-card="${html(card.entityKey)}" aria-label="Редактировать карту" onclick="event.preventDefault(); event.stopPropagation(); window.FinanceAppWalletCardsV1?.editCard(this.dataset.walletEditCard); return false;">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 20h4.5L19.2 9.3a2.1 2.1 0 0 0 0-3l-1.5-1.5a2.1 2.1 0 0 0-3 0L4 15.5V20z"></path>
                    <path d="M13.5 6.2l4.3 4.3"></path>
                  </svg>
                </button>

                <button class="wallet-card-v1__delete-btn" type="button" data-wallet-remove-card="${html(card.entityKey)}" onclick="event.preventDefault(); event.stopPropagation(); window.FinanceAppWalletCardsV1?.removeCard(this.dataset.walletRemoveCard); return false;">
                  Удалить с главной
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }


  function renderCards() {
    const node = deck();
    if (!node) return;

    $$("[data-wallet-custom-card]", node).forEach((card) => card.remove());

    const draft = byId(DRAFT_CARD_ID);

    buildEntityCards().forEach((card, index) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = cardHtml(card).trim();

      const element = wrapper.firstElementChild;
      if (!element) return;

      element.style.zIndex = activeCustomCardKey === card.entityKey ? "1000" : String(10 + index);

      if (draft) {
        node.insertBefore(element, draft);
      } else {
        node.appendChild(element);
      }
    });
  }

  function draftHtml(mode = "create", card = null) {
    const isEdit = mode === "edit" && card;
    const title = isEdit ? card.title : "";
    const amount = isEdit ? card.amount : 0;
    const type = isEdit ? card.type : "account";
    const color = isEdit ? card.color : "pearl";
    const headerTitle = isEdit ? "Редактирование" : "Новая карта";
    const headerSubtitle = isEdit ? "Измени данные и сохрани" : "Создай новый счёт или накопление";
    const saveText = isEdit ? "Сохранить" : "Сохранить";

    return `
      <article class="wallet-card-v1 wallet-card-v1--draft wallet-card-v1--theme-${html(color)} is-open" id="${DRAFT_CARD_ID}" data-wallet-draft-mode="${html(mode)}" data-wallet-edit-key="${html(card?.entityKey || "")}" aria-expanded="true">
        <div class="wallet-card-v1__summary wallet-draft-card__summary">
          <div class="wallet-card-v1__name">
            <strong>${html(headerTitle)}</strong>
            <span>${html(headerSubtitle)}</span>
          </div>

          <strong class="wallet-card-v1__amount">${html(formatMoney(amount))}</strong>
        </div>

        <div class="wallet-card-v1__details">
          <div class="wallet-card-v1__details-inner">
            <div class="wallet-card-v1__details-content">
              <div class="wallet-card-v1__panel wallet-draft-card__panel">
                <label class="wallet-draft-field">
                  <span>Название</span>
                  <input class="wallet-draft-input" id="walletDraftTitleInput" type="text" value="${html(title)}" placeholder="Например: Наличка" autocomplete="off">
                </label>

                <label class="wallet-draft-field">
                  <span>Сумма</span>
                  <input class="wallet-draft-input" id="walletDraftAmountInput" type="text" inputmode="decimal" value="${html(amount ? String(amount).replace(".", ",") : "")}" placeholder="0 ₽">
                </label>

                <div class="wallet-draft-field">
                  <span>Тип</span>

                  <div class="wallet-draft-segment" role="radiogroup" aria-label="Тип карты">
                    ${TYPES.map((item) => `
                      <button class="wallet-draft-chip ${item.value === type ? "is-active" : ""}" type="button" data-wallet-draft-type="${item.value}">
                        ${item.label}
                      </button>
                    `).join("")}
                  </div>
                </div>

                <div class="wallet-draft-field">
                  <span>Цвет</span>

                  <div class="wallet-draft-palette" role="radiogroup" aria-label="Цвет карты">
                    ${COLORS.map((item) => `
                      <button class="wallet-draft-color wallet-draft-color--${item.value} ${item.value === color ? "is-active" : ""}" type="button" data-wallet-draft-color="${item.value}" aria-label="${item.label}"></button>
                    `).join("")}
                  </div>
                </div>

                <p class="wallet-draft-status" id="walletDraftStatus"></p>
              </div>

              <div class="wallet-card-v1__quick-actions">
                <button class="wallet-card-v1__action" type="button" id="walletDraftCancelBtn">Отмена</button>
                <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletDraftSaveBtn">${html(saveText)}</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }


  function setDraftStatus(text, status = "neutral") {
    const node = byId("walletDraftStatus");
    if (!node) return;

    node.textContent = text || "";
    node.dataset.status = status;
  }

  function setDraftColor(color) {
    const draft = byId(DRAFT_CARD_ID);
    if (!draft) return;

    COLORS.forEach((item) => {
      draft.classList.remove(`wallet-card-v1--theme-${item.value}`);
    });

    draft.classList.add(`wallet-card-v1--theme-${colorOf(color).value}`);
  }

  function draftValue() {
    return {
      title: byId("walletDraftTitleInput")?.value?.trim() || "",
      amount: parseMoney(byId("walletDraftAmountInput")?.value || ""),
      type: typeOf($("[data-wallet-draft-type].is-active")?.dataset.walletDraftType).value,
      color: colorOf($("[data-wallet-draft-color].is-active")?.dataset.walletDraftColor).value,
    };
  }

  function startDraft() {
    const node = deck();
    if (!node) return;

    activeCustomCardKey = null;
    byId(DRAFT_CARD_ID)?.remove();

    node.insertAdjacentHTML("beforeend", draftHtml("create"));

    requestAnimationFrame(() => {
      byId("walletDraftTitleInput")?.focus();
    });
  }

  function findRenderedCardNode(cardKey) {
    const node = deck();
    if (!node) return null;

    return $$("[data-wallet-custom-card]", node).find((cardNode) => {
      return cardNode.dataset.walletEntityKey === cardKey;
    }) || null;
  }

  function startEdit(cardKey) {
    const node = deck();
    if (!node || !cardKey) return;

    const card = findEntityCardByKey(cardKey);
    if (!card) return;

    activeCustomCardKey = cardKey;
    byId(DRAFT_CARD_ID)?.remove();

    $$("[data-wallet-custom-card]", node).forEach((cardNode) => {
      const isActive = cardNode.dataset.walletEntityKey === cardKey;

      cardNode.classList.toggle("is-open", isActive);
      cardNode.setAttribute("aria-expanded", String(isActive));

      if (isActive) {
        cardNode.style.zIndex = "1000";
      }
    });

    const cardNode = findRenderedCardNode(cardKey);
    const htmlString = draftHtml("edit", card);

    if (cardNode) {
      cardNode.insertAdjacentHTML("afterend", htmlString);
    } else {
      node.insertAdjacentHTML("beforeend", htmlString);
    }

    requestAnimationFrame(() => {
      byId(DRAFT_CARD_ID)?.scrollIntoView?.({ block: "center", behavior: "smooth" });
    });
  }


  function cancelDraft() {
    byId(DRAFT_CARD_ID)?.remove();
  }

  async function saveDraft() {
    if (isSavingDraft) return;

    const draft = draftValue();

    if (!draft.title) {
      setDraftStatus("Название обязательно.", "error");
      byId("walletDraftTitleInput")?.focus();
      return;
    }

    const draftNode = byId(DRAFT_CARD_ID);
    const mode = draftNode?.dataset.walletDraftMode || "create";
    const editKey = draftNode?.dataset.walletEditKey || "";
    const button = byId("walletDraftSaveBtn");

    isSavingDraft = true;
    if (button) button.disabled = true;
    setDraftStatus("Сохраняю…");

    try {
      if (mode === "edit") {
        const card = findEntityCardByKey(editKey);

        await updateEntity(card, draft);

        const meta = getUiMeta();
        meta.colors[editKey] = draft.color;
        meta.amounts[editKey] = draft.amount;

        if (!meta.order.includes(editKey)) {
          meta.order.push(editKey);
        }

        meta.hidden = meta.hidden.filter((hiddenKey) => hiddenKey !== editKey);

        await saveUiMeta(meta);
      } else {
        const created = await createEntity(draft);
        const row = created.row;
        const key = entityKey(created.entityType, row.id);
        const meta = getUiMeta();

        meta.colors[key] = draft.color;
        meta.amounts[key] = draft.amount;

        if (!meta.order.includes(key)) {
          meta.order.push(key);
        }

        meta.hidden = meta.hidden.filter((hiddenKey) => hiddenKey !== key);

        await saveUiMeta(meta);

        insertEntityIntoLocalState(created.entityType, row);
      }

      cancelDraft();
      activeCustomCardKey = null;
      renderCards();
      syncMain();

      window.setTimeout(() => {
        bridge()?.loadDataFromSupabase?.();
        loadUiMetaFromSupabase();
      }, 500);
    } catch (error) {
      console.error("[Wallet Cards] saveDraft failed:", error);
      setDraftStatus(error?.message || "Не удалось сохранить карту.", "error");
    } finally {
      isSavingDraft = false;
      if (button) button.disabled = false;
    }
  }


  async function removeCard(entityKeyToHide) {
    if (!entityKeyToHide) return;

    const meta = getUiMeta();

    if (activeCustomCardKey === entityKeyToHide) {
      activeCustomCardKey = null;
    }

    if (!meta.hidden.includes(entityKeyToHide)) {
      meta.hidden.push(entityKeyToHide);
    }

    byId(DRAFT_CARD_ID)?.remove();

    const cardNode = findRenderedCardNode(entityKeyToHide);
    if (cardNode) {
      cardNode.remove();
    } else {
      renderCards();
    }

    try {
      await saveUiMeta(meta);
    } catch (error) {
      console.error("[Wallet Cards] removeCard failed:", error);
    }
  }

  function toggleCard(card) {
    if (!card) return;

    if (card.matches("[data-wallet-custom-card]")) {
      const key = card.dataset.walletEntityKey || card.dataset.walletCardId || "";

      activeCustomCardKey = activeCustomCardKey === key ? null : key;
      byId(DRAFT_CARD_ID)?.remove();
      renderCards();
      return;
    }

    const isOpen = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(isOpen));
  }

  function closestTarget(event, selector) {
    const target = event.target;

    if (target?.closest) {
      return target.closest(selector);
    }

    if (target?.parentElement?.closest) {
      return target.parentElement.closest(selector);
    }

    return null;
  }

  function safeStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleRootClick(event) {
    const add = closestTarget(event, "#walletCardsAddBtn");
    if (add) {
      safeStop(event);
      startDraft();
      return;
    }

    const typeButton = closestTarget(event, "[data-wallet-draft-type]");
    if (typeButton) {
      safeStop(event);

      $$("[data-wallet-draft-type]", byId(ROOT_ID)).forEach((button) => {
        button.classList.remove("is-active");
      });

      typeButton.classList.add("is-active");
      return;
    }

    const colorButton = closestTarget(event, "[data-wallet-draft-color]");
    if (colorButton) {
      safeStop(event);

      $$("[data-wallet-draft-color]", byId(ROOT_ID)).forEach((button) => {
        button.classList.remove("is-active");
      });

      colorButton.classList.add("is-active");
      setDraftColor(colorButton.dataset.walletDraftColor);
      return;
    }

    if (closestTarget(event, "#walletDraftCancelBtn")) {
      safeStop(event);
      cancelDraft();
      return;
    }

    if (closestTarget(event, "#walletDraftSaveBtn")) {
      safeStop(event);
      saveDraft();
      return;
    }

    const edit = closestTarget(event, "[data-wallet-edit-card]");
    if (edit) {
      safeStop(event);

      const key =
        edit.dataset.walletEditCard ||
        edit.closest("[data-wallet-entity-key]")?.dataset.walletEntityKey ||
        "";

      startEdit(key);
      return;
    }

    const remove = closestTarget(event, "[data-wallet-remove-card]");
    if (remove) {
      safeStop(event);

      const key =
        remove.dataset.walletRemoveCard ||
        remove.closest("[data-wallet-entity-key]")?.dataset.walletEntityKey ||
        "";

      removeCard(key).catch((error) => {
        console.error("[Wallet Cards] removeCard failed:", error);
      });

      return;
    }

    if (closestTarget(event, "#walletCardsReportBtn, #walletMainReportBtn")) {
      safeStop(event);
      clickById("openMonthlyReportBtn");
      return;
    }

    if (closestTarget(event, "#walletMainExpenseBtn")) {
      safeStop(event);
      clickById("openExpenseModal");
      return;
    }

    if (closestTarget(event, "#walletMainIncomeBtn")) {
      safeStop(event);
      clickById("openIncomeModal");
      return;
    }

    const action = closestTarget(event, "[data-wallet-card-action]");
    if (action) {
      safeStop(event);
      mainAction(action.dataset.walletCardAction || "");
      return;
    }

    if (closestTarget(event, "button, input, textarea, select, label")) {
      return;
    }

    const customCard = closestTarget(event, "[data-wallet-custom-card]");
    if (customCard) {
      toggleCard(customCard);
      return;
    }

    const mainCard = closestTarget(event, `#${MAIN_CARD_ID}`);
    if (mainCard) {
      toggleCard(mainCard);
    }
  }

  function exposeWalletCardApi() {
    window.FinanceAppWalletCardsV1 = {
      editCard(cardKey) {
        try {
          startEdit(cardKey);
        } catch (error) {
          console.error("[Wallet Cards] inline edit failed:", error);
        }
      },
      removeCard(cardKey) {
        try {
          removeCard(cardKey).catch((error) => {
            console.error("[Wallet Cards] inline remove failed:", error);
          });
        } catch (error) {
          console.error("[Wallet Cards] inline remove failed:", error);
        }
      },
    };
  }

  function bindEvents() {
    const root = byId(ROOT_ID);

    if (!root || root.dataset.walletEventsBound === "true") return;

    root.dataset.walletEventsBound = "true";

    root.addEventListener("pointerup", (event) => {
      const edit = closestTarget(event, "[data-wallet-edit-card]");
      if (edit) {
        safeStop(event);
        window.FinanceAppWalletCardsV1?.editCard(edit.dataset.walletEditCard || edit.closest("[data-wallet-entity-key]")?.dataset.walletEntityKey || "");
        return;
      }

      const remove = closestTarget(event, "[data-wallet-remove-card]");
      if (remove) {
        safeStop(event);
        window.FinanceAppWalletCardsV1?.removeCard(remove.dataset.walletRemoveCard || remove.closest("[data-wallet-entity-key]")?.dataset.walletEntityKey || "");
      }
    }, true);

    root.addEventListener("click", (event) => {
      try {
        handleRootClick(event);
      } catch (error) {
        console.error("[Wallet Cards] click handler failed:", error);
      }
    });

    root.addEventListener("keydown", (event) => {
      try {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (closestTarget(event, "button, input, textarea, select")) return;

        const card = closestTarget(event, `#${MAIN_CARD_ID}, [data-wallet-custom-card]`);
        if (!card) return;

        event.preventDefault();
        toggleCard(card);
      } catch (error) {
        console.error("[Wallet Cards] keydown handler failed:", error);
      }
    });
  }

  function syncMain() {
    if (!byId(ROOT_ID)) return;

    setText("walletMainAccountValue", textById("balanceFreeMoneyValue") || textById("walletLightFreeValue") || "0 ₽");
    setText("walletMainDailyValue", `${textById("walletTodayCanValue", "0 ₽")}/день`);
    setText("walletMainMandatoryValue", textById("analyticsPendingMandatoryValue") || textById("walletCalendarPressureValue") || "0 ₽");
    setText("walletMainBudgetValue", `${textById("hardMonthBudgetSpentValue", "0 ₽")} ${textById("hardMonthBudgetTotalValue", "из 0 ₽")}`);

    const expectedIncomeText = textById("walletExpectedIncomeValue", "");
    setText(
      "walletMainExpectedValue",
      expectedIncomeText.toLowerCase().includes("ожидание пока не добавлено")
        ? "не добавлено"
        : expectedIncomeText || "не добавлено"
    );

    setText("walletMainHint", textById("walletGameHint", "Данные обновятся после загрузки операций."));

    renderCards();
  }

  function observe(id) {
    const node = byId(id);
    if (!node) return;

    new MutationObserver(syncMain).observe(node, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function start() {
    createRoot();
    exposeWalletCardApi();
    bindEvents();

    [
      "balanceFreeMoneyValue",
      "walletLightFreeValue",
      "walletTodayCanValue",
      "walletGameHint",
      "analyticsPendingMandatoryValue",
      "walletCalendarPressureValue",
      "hardMonthBudgetSpentValue",
      "hardMonthBudgetTotalValue",
      "walletExpectedIncomeValue",
    ].forEach(observe);

    syncMain();
    loadUiMetaFromSupabase();

    window.setTimeout(syncMain, 100);
    window.setTimeout(syncMain, 350);
    window.setTimeout(syncMain, 900);
    window.setTimeout(syncMain, 1600);
    window.setTimeout(syncMain, 3000);

    window.setTimeout(loadUiMetaFromSupabase, 700);
    window.setTimeout(loadUiMetaFromSupabase, 1800);

    window.addEventListener("focus", () => {
      syncMain();
      loadUiMetaFromSupabase();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;

      syncMain();
      loadUiMetaFromSupabase();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
