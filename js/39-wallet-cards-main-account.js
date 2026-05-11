(() => {
  const ROOT_ID = "walletCardsV1";
  const MAIN_CARD_ID = "walletMainAccountCard";
  const DRAFT_CARD_ID = "walletDraftCard";
  const DECK_ID = "walletCardsDeck";
  const WALLET_CARDS_META_KEY = "wallet_cards";

  const CARD_KINDS = [
    {
      value: "account",
      label: "Счёт",
      subtitle: "Обычный счёт",
      entityType: "account",
    },
    {
      value: "cash",
      label: "Наличка",
      subtitle: "Физические деньги",
      entityType: "account",
    },
    {
      value: "saving",
      label: "Накопление",
      subtitle: "Цель / накопления",
      entityType: "safe_bucket",
    },
    {
      value: "tax",
      label: "Налоги",
      subtitle: "Отложенные платежи",
      entityType: "safe_bucket",
    },
    {
      value: "reserve",
      label: "Резерв",
      subtitle: "Запас безопасности",
      entityType: "safe_bucket",
    },
  ];

  const CARD_THEMES = [
    { value: "graphite", label: "Графит" },
    { value: "sand", label: "Песок" },
    { value: "sky", label: "Небо" },
    { value: "sage", label: "Шалфей" },
    { value: "pearl", label: "Жемчуг" },
  ];

  let walletCardsMetaCache = null;
  let isSavingDraftCard = false;

  function getTextById(id, fallback = "") {
    const node = document.getElementById(id);
    const text = node?.textContent?.trim();

    return text || fallback;
  }

  function setTextById(id, value) {
    const node = document.getElementById(id);
    if (!node) return;

    node.textContent = value;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getMainAccountValue() {
    return (
      getTextById("balanceFreeMoneyValue") ||
      getTextById("walletLightFreeValue") ||
      "0 ₽"
    );
  }

  function getDailyValue() {
    return getTextById("walletTodayCanValue", "0 ₽");
  }

  function getHeroHint() {
    return getTextById(
      "walletGameHint",
      "Данные обновятся после загрузки операций."
    );
  }

  function getMandatoryValue() {
    return (
      getTextById("analyticsPendingMandatoryValue") ||
      getTextById("walletCalendarPressureValue") ||
      "0 ₽"
    );
  }

  function getBudgetSpentValue() {
    return getTextById("hardMonthBudgetSpentValue", "0 ₽");
  }

  function getBudgetTotalValue() {
    return getTextById("hardMonthBudgetTotalValue", "из 0 ₽");
  }

  function getExpectedIncomeValue() {
    const value = getTextById("walletExpectedIncomeValue", "");

    if (!value || value.toLowerCase().includes("ожидание пока не добавлено")) {
      return "не добавлено";
    }

    return value;
  }

  function getSavingsBridge() {
    return window.FinanceAppSavingsBridge || null;
  }

  function getWalletState() {
    return (
      getSavingsBridge()?.getState?.() ||
      window.FinanceAppState?.state ||
      null
    );
  }

  function getSupabaseClient() {
    return getSavingsBridge()?.getSupabaseClient?.() || window.supabaseClient || null;
  }

  function roundMoney(value) {
    const amount = Number(value) || 0;
    const round = getSavingsBridge()?.roundToTwo;

    if (typeof round === "function") {
      return round(amount);
    }

    return Math.round(amount * 100) / 100;
  }

  function parseWalletMoney(value) {
    const normalized = String(value || "")
      .replace(/\s+/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    return roundMoney(Number(normalized) || 0);
  }

  function formatWalletMoney(value) {
    const amount = roundMoney(value);
    const formatter = getSavingsBridge()?.formatMoney;

    if (typeof formatter === "function") {
      return formatter(amount);
    }

    return `${new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: amount % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(amount)} ₽`;
  }

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getKindConfig(kind) {
    return CARD_KINDS.find((item) => item.value === kind) || CARD_KINDS[0];
  }

  function getThemeConfig(theme) {
    return CARD_THEMES.find((item) => item.value === theme) || CARD_THEMES[4];
  }

  function getWalletDeck() {
    return document.getElementById(DECK_ID);
  }

  function isModalVisible(modalId) {
    const modal = document.getElementById(modalId);

    return Boolean(
      modal &&
      !modal.classList.contains("hidden") &&
      !modal.classList.contains("is-closing")
    );
  }

  function openModalFallback(modalId) {
    const modal = document.getElementById(modalId);
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

  function clickById(id) {
    const node = document.getElementById(id);
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

  function openWalletTarget(triggerId, modalId) {
    clickById(triggerId);

    window.setTimeout(() => {
      if (isModalVisible(modalId)) return;
      openModalFallback(modalId);
    }, 60);
  }

  function getStateMetaSource() {
    const state = getWalletState();

    return state?.appMeta || state?.app_meta || state?.meta || null;
  }

  function readAppMetaValue(key) {
    const meta = getStateMetaSource();

    if (!meta) return "";

    if (Array.isArray(meta)) {
      const item = meta.find((entry) => {
        return entry?.key === key || entry?.name === key || entry?.meta_key === key;
      });

      return (
        item?.value ??
        item?.meta_value ??
        item?.json_value ??
        item?.data ??
        ""
      );
    }

    if (typeof meta === "object") {
      const item = meta[key];

      if (typeof item === "string") return item;

      if (item && typeof item === "object") {
        return item.value ?? item.meta_value ?? item.json_value ?? item.data ?? "";
      }

      return item ?? "";
    }

    return "";
  }

  function parseWalletCardsMetaValue(rawValue) {
    if (!rawValue) return [];

    if (Array.isArray(rawValue)) {
      return rawValue;
    }

    if (typeof rawValue === "object") {
      if (Array.isArray(rawValue.cards)) return rawValue.cards;
      return [];
    }

    try {
      const parsed = JSON.parse(String(rawValue));

      if (Array.isArray(parsed)) return parsed;
      if (Array.isArray(parsed.cards)) return parsed.cards;

      return [];
    } catch {
      return [];
    }
  }

  function normalizeWalletCardsMeta(cards) {
    if (!Array.isArray(cards)) return [];

    return cards
      .filter((card) => card && card.id && card.entityId)
      .map((card, index) => {
        const kind = getKindConfig(card.kind).value;
        const theme = getThemeConfig(card.theme).value;

        return {
          id: String(card.id),
          entityType: card.entityType === "safe_bucket" ? "safe_bucket" : "account",
          entityId: String(card.entityId),
          kind,
          theme,
          title: String(card.title || "").trim(),
          subtitle: String(card.subtitle || getKindConfig(kind).subtitle).trim(),
          initialAmount: Number(card.initialAmount) || 0,
          order: Number.isFinite(Number(card.order)) ? Number(card.order) : index,
        };
      })
      .sort((a, b) => a.order - b.order);
  }

  function getWalletCardsMeta() {
    if (walletCardsMetaCache) return walletCardsMetaCache;

    const rawValue = readAppMetaValue(WALLET_CARDS_META_KEY);
    walletCardsMetaCache = normalizeWalletCardsMeta(parseWalletCardsMetaValue(rawValue));

    return walletCardsMetaCache;
  }

  function setMetaCacheAndLocalValue(cards) {
    const normalizedCards = normalizeWalletCardsMeta(cards);
    const value = JSON.stringify({ cards: normalizedCards });

    walletCardsMetaCache = normalizedCards;
    getSavingsBridge()?.setAppMetaLocalValue?.(WALLET_CARDS_META_KEY, value);

    return { normalizedCards, value };
  }

  async function saveWalletCardsMeta(cards) {
    const { normalizedCards, value } = setMetaCacheAndLocalValue(cards);
    const client = getSupabaseClient();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const attempts = [
      () => client
        .from("app_meta")
        .upsert({ key: WALLET_CARDS_META_KEY, value }, { onConflict: "key" }),

      () => client
        .from("app_meta")
        .upsert({ name: WALLET_CARDS_META_KEY, value }, { onConflict: "name" }),

      () => client
        .from("app_meta")
        .upsert({ meta_key: WALLET_CARDS_META_KEY, meta_value: value }, { onConflict: "meta_key" }),

      () => client
        .from("app_meta")
        .upsert({ key: WALLET_CARDS_META_KEY, json_value: { cards: normalizedCards } }, { onConflict: "key" }),
    ];

    let lastError = null;

    for (const attempt of attempts) {
      const { error } = await attempt();

      if (!error) return;

      lastError = error;
    }

    throw lastError || new Error("Не удалось сохранить настройки карточек.");
  }

  function findAccountById(accountId) {
    const state = getWalletState();
    const accounts = Array.isArray(state?.accounts) ? state.accounts : [];

    return accounts.find((account) => String(account.id) === String(accountId)) || null;
  }

  function findSafeBucketById(bucketId) {
    const bridge = getSavingsBridge();

    if (typeof bridge?.getSafeBucketById === "function") {
      const bucket = bridge.getSafeBucketById(bucketId);
      if (bucket) return bucket;
    }

    const state = getWalletState();
    const buckets = Array.isArray(state?.safeBuckets) ? state.safeBuckets : [];

    return buckets.find((bucket) => String(bucket.id) === String(bucketId)) || null;
  }

  function getAccountBalance(accountId, fallback = 0) {
    const bridge = getSavingsBridge();

    if (typeof bridge?.getRawAccountBalance === "function") {
      const amount = roundMoney(bridge.getRawAccountBalance(accountId));

      if (amount) return amount;
    }

    const account = findAccountById(accountId);

    return roundMoney(account?.balance ?? account?.amount ?? account?.initial_balance ?? fallback);
  }

  function getSafeBucketBalance(bucketId, fallback = 0) {
    const bridge = getSavingsBridge();

    if (typeof bridge?.getSafeBucketBalance === "function") {
      const amount = roundMoney(bridge.getSafeBucketBalance(bucketId));

      if (amount) return amount;
    }

    const bucket = findSafeBucketById(bucketId);

    return roundMoney(
      bucket?.balance ??
      bucket?.amount ??
      bucket?.current_amount ??
      bucket?.initial_amount ??
      fallback
    );
  }

  function getWalletCardTitle(card) {
    if (card.entityType === "safe_bucket") {
      return findSafeBucketById(card.entityId)?.name || card.title || "Карта";
    }

    return findAccountById(card.entityId)?.name || card.title || "Карта";
  }

  function getWalletCardAmount(card) {
    if (card.entityType === "safe_bucket") {
      return getSafeBucketBalance(card.entityId, card.initialAmount);
    }

    return getAccountBalance(card.entityId, card.initialAmount);
  }

  function getEntityPayloadKind(kind) {
    if (kind === "cash") return "cash";
    if (kind === "saving") return "saving";
    if (kind === "tax") return "tax";
    if (kind === "reserve") return "reserve";

    return "account";
  }

  async function trySupabaseWrite(attempts, actionLabel) {
    let lastError = null;

    for (const attempt of attempts) {
      const { data, error } = await attempt();

      if (!error) {
        if (Array.isArray(data)) return data[0] || null;
        return data || null;
      }

      lastError = error;
    }

    throw lastError || new Error(`${actionLabel}: Supabase вернул ошибку.`);
  }

  async function insertAccountEntity({ title, amount, kind, theme }) {
    const client = getSupabaseClient();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const accountKind = getEntityPayloadKind(kind);
    const createdAt = new Date().toISOString();

    const attempts = [
      () => client
        .from("accounts")
        .insert({
          name: title,
          role: accountKind,
          account_role: accountKind,
          account_kind: accountKind,
          kind: accountKind,
          wallet_card_theme: theme,
          balance: amount,
          initial_balance: amount,
          is_primary_spend: false,
          primary_spend: false,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("accounts")
        .insert({
          name: title,
          role: accountKind,
          account_kind: accountKind,
          balance: amount,
          primary_spend: false,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("accounts")
        .insert({
          name: title,
          role: accountKind,
          initial_balance: amount,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("accounts")
        .insert({
          name: title,
          role: accountKind,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("accounts")
        .insert({
          name: title,
          created_at: createdAt,
        })
        .select("*")
        .single(),
    ];

    return trySupabaseWrite(attempts, "Создание счёта");
  }

  async function insertSafeBucketEntity({ title, amount, kind, theme }) {
    const client = getSupabaseClient();

    if (!client?.from) {
      throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");
    }

    const bucketKind = getEntityPayloadKind(kind);
    const createdAt = new Date().toISOString();

    const attempts = [
      () => client
        .from("safe_buckets")
        .insert({
          name: title,
          kind: bucketKind,
          bucket_kind: bucketKind,
          wallet_card_theme: theme,
          amount,
          balance: amount,
          current_amount: amount,
          target_amount: 0,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("safe_buckets")
        .insert({
          name: title,
          kind: bucketKind,
          amount,
          target_amount: 0,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("safe_buckets")
        .insert({
          name: title,
          kind: bucketKind,
          balance: amount,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("safe_buckets")
        .insert({
          name: title,
          kind: bucketKind,
          created_at: createdAt,
        })
        .select("*")
        .single(),

      () => client
        .from("safe_buckets")
        .insert({
          name: title,
          created_at: createdAt,
        })
        .select("*")
        .single(),
    ];

    return trySupabaseWrite(attempts, "Создание накопительной карты");
  }

  async function createInitialAccountAmount(accountId, amount) {
    if (!amount) return;

    const client = getSupabaseClient();
    if (!client?.from) return;

    const createdAt = new Date().toISOString();
    const attempts = [
      () => client
        .from("transactions")
        .insert({
          type: "balance_adjustment",
          amount,
          account_id: accountId,
          created_at: createdAt,
          comment: "Стартовая сумма",
        }),

      () => client
        .from("transactions")
        .insert({
          type: "income",
          amount,
          account_id: accountId,
          created_at: createdAt,
          comment: "Стартовая сумма",
        }),

      () => client
        .from("transactions")
        .insert({
          transaction_type: "income",
          amount,
          account_id: accountId,
          created_at: createdAt,
          comment: "Стартовая сумма",
        }),

      () => client
        .from("accounts")
        .update({ balance: amount })
        .eq("id", accountId),

      () => client
        .from("accounts")
        .update({ initial_balance: amount })
        .eq("id", accountId),
    ];

    try {
      await trySupabaseWrite(attempts, "Стартовая сумма счёта");
    } catch (error) {
      console.warn("[Wallet Cards] start account amount fallback failed:", error);
    }
  }

  async function createInitialSafeBucketAmount(bucketId, amount) {
    if (!amount) return;

    const client = getSupabaseClient();
    if (!client?.from) return;

    const createdAt = new Date().toISOString();
    const attempts = [
      () => client
        .from("safe_buckets")
        .update({ amount })
        .eq("id", bucketId),

      () => client
        .from("safe_buckets")
        .update({ balance: amount })
        .eq("id", bucketId),

      () => client
        .from("safe_buckets")
        .update({ current_amount: amount })
        .eq("id", bucketId),

      () => client
        .from("transactions")
        .insert({
          type: "safe_deposit",
          amount,
          to_safe_bucket_id: bucketId,
          created_at: createdAt,
          comment: "Стартовая сумма",
        }),

      () => client
        .from("transactions")
        .insert({
          type: "income",
          amount,
          safe_bucket_id: bucketId,
          created_at: createdAt,
          comment: "Стартовая сумма",
        }),
    ];

    try {
      await trySupabaseWrite(attempts, "Стартовая сумма накопления");
    } catch (error) {
      console.warn("[Wallet Cards] start safe bucket amount fallback failed:", error);
    }
  }

  async function createWalletFinancialEntity({ title, amount, kind, theme }) {
    const kindConfig = getKindConfig(kind);

    if (kindConfig.entityType === "safe_bucket") {
      const bucket = await insertSafeBucketEntity({ title, amount, kind, theme });
      await createInitialSafeBucketAmount(bucket.id, amount);

      return {
        entityType: "safe_bucket",
        entityId: bucket.id,
      };
    }

    const account = await insertAccountEntity({ title, amount, kind, theme });
    await createInitialAccountAmount(account.id, amount);

    return {
      entityType: "account",
      entityId: account.id,
    };
  }

  function createWalletCardsRoot() {
    if (document.getElementById(ROOT_ID)) return;

    const mainView = document.getElementById("mainView");
    const oldHeroSection = document.querySelector(".balance--game");

    if (!mainView || !oldHeroSection) return;

    const section = document.createElement("section");
    section.className = "wallet-cards-v1";
    section.id = ROOT_ID;

    section.innerHTML = `
      <div class="wallet-cards-v1__head">
        <h1 class="wallet-cards-v1__title">Wallet</h1>

        <div class="wallet-cards-v1__actions">
          <button
            class="wallet-cards-v1__icon-btn"
            type="button"
            id="walletCardsAddBtn"
            aria-label="Добавить карту"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>

          <button
            class="wallet-cards-v1__icon-btn"
            type="button"
            id="walletCardsReportBtn"
            aria-label="Открыть итоги"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 19V5" />
              <path d="M6 19h13" />
              <path d="M10 15v-4" />
              <path d="M14 15V8" />
              <path d="M18 15v-6" />
            </svg>
          </button>
        </div>
      </div>

      <div class="wallet-cards-v1__stack wallet-cards-v1__stack--deck" id="${DECK_ID}">
        <article
          class="wallet-card-v1 wallet-card-v1--main"
          id="${MAIN_CARD_ID}"
          role="button"
          tabindex="0"
          aria-expanded="false"
        >
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name">
              <strong>Основной счёт</strong>
              <span>Свободные деньги</span>
            </div>

            <strong class="wallet-card-v1__amount" id="walletMainAccountValue">
              0 ₽
            </strong>
          </div>

          <div class="wallet-card-v1__details">
            <div class="wallet-card-v1__details-inner">
              <div class="wallet-card-v1__details-content">
                <div class="wallet-card-v1__panel">
                  <div class="wallet-card-v1__row">
                    <span>Можно тратить</span>
                    <strong id="walletMainDailyValue">0 ₽/день</strong>
                  </div>

                  <button
                    class="wallet-card-v1__row wallet-card-v1__row--button"
                    type="button"
                    id="walletMainMandatoryRowBtn"
                    data-wallet-card-action="mandatory"
                  >
                    <span>К списанию</span>
                    <strong id="walletMainMandatoryValue">0 ₽</strong>
                  </button>

                  <button
                    class="wallet-card-v1__row wallet-card-v1__row--button"
                    type="button"
                    id="walletMainBudgetRowBtn"
                    data-wallet-card-action="budget"
                  >
                    <span>Бюджет месяца</span>
                    <strong id="walletMainBudgetValue">0 ₽ из 0 ₽</strong>
                  </button>

                  <button
                    class="wallet-card-v1__row wallet-card-v1__row--button"
                    type="button"
                    id="walletMainExpectedRowBtn"
                    data-wallet-card-action="expected"
                  >
                    <span>Ожидаемые деньги</span>
                    <strong id="walletMainExpectedValue">не добавлено</strong>
                  </button>

                  <p class="wallet-card-v1__hint" id="walletMainHint">
                    Данные обновятся после загрузки операций.
                  </p>
                </div>

                <div class="wallet-card-v1__quick-actions">
                  <button
                    class="wallet-card-v1__action wallet-card-v1__action--danger"
                    type="button"
                    id="walletMainExpenseBtn"
                  >
                    Расход
                  </button>

                  <button
                    class="wallet-card-v1__action wallet-card-v1__action--good"
                    type="button"
                    id="walletMainIncomeBtn"
                  >
                    Доход
                  </button>

                  <button
                    class="wallet-card-v1__action"
                    type="button"
                    id="walletMainReportBtn"
                  >
                    Итоги
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;

    mainView.insertBefore(section, oldHeroSection);
    document.body.classList.add("wallet-cards-v1-enabled");
  }

  function createCustomCardHtml(card) {
    const title = getWalletCardTitle(card);
    const amount = getWalletCardAmount(card);
    const kindConfig = getKindConfig(card.kind);
    const theme = getThemeConfig(card.theme).value;

    return `
      <article
        class="wallet-card-v1 wallet-card-v1--custom wallet-card-v1--theme-${theme}"
        data-wallet-custom-card="true"
        data-wallet-card-id="${escapeHtml(card.id)}"
        role="button"
        tabindex="0"
        aria-expanded="false"
      >
        <div class="wallet-card-v1__summary">
          <div class="wallet-card-v1__name">
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(card.subtitle || kindConfig.subtitle)}</span>
          </div>

          <strong class="wallet-card-v1__amount">
            ${escapeHtml(formatWalletMoney(amount))}
          </strong>
        </div>

        <div class="wallet-card-v1__details">
          <div class="wallet-card-v1__details-inner">
            <div class="wallet-card-v1__details-content">
              <div class="wallet-card-v1__panel wallet-card-v1__panel--quiet">
                <div class="wallet-card-v1__row">
                  <span>Тип</span>
                  <strong>${escapeHtml(kindConfig.label)}</strong>
                </div>

                <div class="wallet-card-v1__row">
                  <span>Цвет</span>
                  <strong>${escapeHtml(getThemeConfig(theme).label)}</strong>
                </div>

                <p class="wallet-card-v1__hint">
                  Карта связана с реальной финансовой сущностью. Удаление здесь убирает её с главной, но не удаляет деньги.
                </p>
              </div>

              <div class="wallet-card-v1__quick-actions wallet-card-v1__quick-actions--single">
                <button
                  class="wallet-card-v1__action wallet-card-v1__action--danger"
                  type="button"
                  data-wallet-remove-card="${escapeHtml(card.id)}"
                >
                  Убрать с главной
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderWalletCustomCards() {
    const deck = getWalletDeck();
    if (!deck) return;

    deck
      .querySelectorAll("[data-wallet-custom-card]")
      .forEach((node) => node.remove());

    const draft = document.getElementById(DRAFT_CARD_ID);
    const cards = getWalletCardsMeta();

    cards.forEach((card) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = createCustomCardHtml(card).trim();

      const node = wrapper.firstElementChild;
      if (!node) return;

      if (draft) {
        deck.insertBefore(node, draft);
      } else {
        deck.appendChild(node);
      }
    });

    bindWalletCustomCards();
  }

  function createDraftCardHtml() {
    return `
      <article
        class="wallet-card-v1 wallet-card-v1--draft wallet-card-v1--theme-pearl is-open"
        id="${DRAFT_CARD_ID}"
        aria-expanded="true"
      >
        <div class="wallet-card-v1__summary wallet-draft-card__summary">
          <div class="wallet-card-v1__name">
            <strong>Новая карта</strong>
            <span>Заполни данные и сохрани</span>
          </div>

          <strong class="wallet-card-v1__amount">0 ₽</strong>
        </div>

        <div class="wallet-card-v1__details">
          <div class="wallet-card-v1__details-inner">
            <div class="wallet-card-v1__details-content">
              <div class="wallet-card-v1__panel wallet-draft-card__panel">
                <label class="wallet-draft-field">
                  <span>Название</span>
                  <input
                    class="wallet-draft-input"
                    id="walletDraftTitleInput"
                    type="text"
                    placeholder="Например: Наличка"
                    autocomplete="off"
                  />
                </label>

                <label class="wallet-draft-field">
                  <span>Сумма</span>
                  <input
                    class="wallet-draft-input"
                    id="walletDraftAmountInput"
                    type="text"
                    inputmode="decimal"
                    placeholder="0 ₽"
                  />
                </label>

                <div class="wallet-draft-field">
                  <span>Тип</span>

                  <div class="wallet-draft-segment" role="radiogroup" aria-label="Тип карты">
                    ${CARD_KINDS.map((kind) => `
                      <button
                        class="wallet-draft-chip ${kind.value === "account" ? "is-active" : ""}"
                        type="button"
                        data-wallet-draft-kind="${kind.value}"
                      >
                        ${kind.label}
                      </button>
                    `).join("")}
                  </div>
                </div>

                <div class="wallet-draft-field">
                  <span>Цвет</span>

                  <div class="wallet-draft-palette" role="radiogroup" aria-label="Цвет карты">
                    ${CARD_THEMES.map((theme) => `
                      <button
                        class="wallet-draft-color wallet-draft-color--${theme.value} ${theme.value === "pearl" ? "is-active" : ""}"
                        type="button"
                        data-wallet-draft-theme="${theme.value}"
                        aria-label="${theme.label}"
                      ></button>
                    `).join("")}
                  </div>
                </div>

                <p class="wallet-draft-status" id="walletDraftStatus"></p>
              </div>

              <div class="wallet-card-v1__quick-actions">
                <button
                  class="wallet-card-v1__action"
                  type="button"
                  id="walletDraftCancelBtn"
                >
                  Отмена
                </button>

                <button
                  class="wallet-card-v1__action wallet-card-v1__action--good"
                  type="button"
                  id="walletDraftSaveBtn"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function getDraftValue() {
    const title = document.getElementById("walletDraftTitleInput")?.value?.trim() || "";
    const amount = parseWalletMoney(document.getElementById("walletDraftAmountInput")?.value || "");
    const kind = document.querySelector("[data-wallet-draft-kind].is-active")?.dataset.walletDraftKind || "account";
    const theme = document.querySelector("[data-wallet-draft-theme].is-active")?.dataset.walletDraftTheme || "pearl";

    return {
      title,
      amount,
      kind: getKindConfig(kind).value,
      theme: getThemeConfig(theme).value,
    };
  }

  function setDraftStatus(message, type = "neutral") {
    const status = document.getElementById("walletDraftStatus");
    if (!status) return;

    status.textContent = message || "";
    status.dataset.status = type;
  }

  function setDraftTheme(theme) {
    const draft = document.getElementById(DRAFT_CARD_ID);
    if (!draft) return;

    CARD_THEMES.forEach((item) => {
      draft.classList.remove(`wallet-card-v1--theme-${item.value}`);
    });

    draft.classList.add(`wallet-card-v1--theme-${getThemeConfig(theme).value}`);
  }

  function startWalletCardDraft() {
    const deck = getWalletDeck();
    if (!deck) return;

    const existingDraft = document.getElementById(DRAFT_CARD_ID);
    if (existingDraft) {
      document.getElementById("walletDraftTitleInput")?.focus();
      return;
    }

    deck.insertAdjacentHTML("beforeend", createDraftCardHtml());
    bindWalletDraftCard();

    requestAnimationFrame(() => {
      document.getElementById("walletDraftTitleInput")?.focus();
    });
  }

  function cancelWalletCardDraft() {
    document.getElementById(DRAFT_CARD_ID)?.remove();
  }

  async function saveWalletCardDraft() {
    if (isSavingDraftCard) return;

    const draft = getDraftValue();

    if (!draft.title) {
      setDraftStatus("Название обязательно.", "error");
      document.getElementById("walletDraftTitleInput")?.focus();
      return;
    }

    isSavingDraftCard = true;
    setDraftStatus("Сохраняю карту…", "neutral");

    const saveBtn = document.getElementById("walletDraftSaveBtn");
    if (saveBtn) saveBtn.disabled = true;

    try {
      const entity = await createWalletFinancialEntity(draft);
      const cards = getWalletCardsMeta();

      cards.push({
        id: `wallet_card_${Date.now()}`,
        entityType: entity.entityType,
        entityId: entity.entityId,
        kind: draft.kind,
        theme: draft.theme,
        title: draft.title,
        subtitle: getKindConfig(draft.kind).subtitle,
        initialAmount: draft.amount,
        order: cards.length + 1,
      });

      await saveWalletCardsMeta(cards);

      setDraftStatus("Карта сохранена.", "success");

      await getSavingsBridge()?.loadDataFromSupabase?.();
      getSavingsBridge()?.renderAll?.();

      walletCardsMetaCache = null;
      cancelWalletCardDraft();
      renderWalletCustomCards();
      syncWalletMainCard();
    } catch (error) {
      console.error("[Wallet Cards] save draft failed:", error);
      setDraftStatus(error?.message || "Не удалось сохранить карту.", "error");
    } finally {
      isSavingDraftCard = false;
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  function bindWalletDraftCard() {
    const draft = document.getElementById(DRAFT_CARD_ID);
    if (!draft) return;

    draft.querySelectorAll("[data-wallet-draft-kind]").forEach((button) => {
      button.addEventListener("click", () => {
        draft
          .querySelectorAll("[data-wallet-draft-kind]")
          .forEach((item) => item.classList.remove("is-active"));

        button.classList.add("is-active");
      });
    });

    draft.querySelectorAll("[data-wallet-draft-theme]").forEach((button) => {
      button.addEventListener("click", () => {
        draft
          .querySelectorAll("[data-wallet-draft-theme]")
          .forEach((item) => item.classList.remove("is-active"));

        button.classList.add("is-active");
        setDraftTheme(button.dataset.walletDraftTheme);
      });
    });

    document.getElementById("walletDraftCancelBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      cancelWalletCardDraft();
    });

    document.getElementById("walletDraftSaveBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      saveWalletCardDraft();
    });
  }

  async function removeWalletCardFromHome(cardId) {
    const cards = getWalletCardsMeta().filter((card) => card.id !== cardId);

    await saveWalletCardsMeta(cards);
    renderWalletCustomCards();
  }

  function bindWalletCustomCards() {
    document.querySelectorAll("[data-wallet-custom-card]").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest("button")) return;

        const isOpen = card.classList.toggle("is-open");
        card.setAttribute("aria-expanded", String(isOpen));
      });

      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest("button")) return;

        event.preventDefault();

        const isOpen = card.classList.toggle("is-open");
        card.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.querySelectorAll("[data-wallet-remove-card]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();

        await removeWalletCardFromHome(button.dataset.walletRemoveCard);
      });
    });
  }

  function syncWalletMainCard() {
    if (!document.getElementById(ROOT_ID)) return;

    setTextById("walletMainAccountValue", getMainAccountValue());
    setTextById("walletMainDailyValue", `${getDailyValue()}/день`);
    setTextById("walletMainMandatoryValue", getMandatoryValue());
    setTextById("walletMainBudgetValue", `${getBudgetSpentValue()} ${getBudgetTotalValue()}`);
    setTextById("walletMainExpectedValue", getExpectedIncomeValue());
    setTextById("walletMainHint", getHeroHint());

    renderWalletCustomCards();
  }

  function toggleMainCard() {
    const card = document.getElementById(MAIN_CARD_ID);
    if (!card) return;

    const isOpen = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(isOpen));
  }

  function handleWalletCardAction(action) {
    if (action === "mandatory") {
      openWalletTarget("openMandatoryPaymentsModalBtn", "mandatoryPaymentsModal");
      return;
    }

    if (action === "budget") {
      openWalletTarget("openBudgetAnalyticsModalBtn", "budgetAnalyticsModal");
      return;
    }

    if (action === "expected") {
      openWalletTarget("openExpectedIncomeModalBtn", "expectedIncomeModal");
    }
  }

  function bindWalletCardEvents() {
    const card = document.getElementById(MAIN_CARD_ID);
    if (!card) return;

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      toggleMainCard();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("button")) return;

      event.preventDefault();
      toggleMainCard();
    });

    document.getElementById("walletCardsAddBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      startWalletCardDraft();
    });

    document.getElementById("walletCardsReportBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      clickById("openMonthlyReportBtn");
    });

    document.getElementById("walletMainExpenseBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      clickById("openExpenseModal");
    });

    document.getElementById("walletMainIncomeBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      clickById("openIncomeModal");
    });

    document.getElementById("walletMainReportBtn")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      clickById("openMonthlyReportBtn");
    });

    document.querySelectorAll("[data-wallet-card-action]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        handleWalletCardAction(button.dataset.walletCardAction || "");
      });
    });
  }

  function observeSource(id) {
    const node = document.getElementById(id);
    if (!node) return;

    const observer = new MutationObserver(syncWalletMainCard);

    observer.observe(node, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function startSync() {
    syncWalletMainCard();

    window.setTimeout(syncWalletMainCard, 100);
    window.setTimeout(syncWalletMainCard, 350);
    window.setTimeout(syncWalletMainCard, 900);
    window.setTimeout(syncWalletMainCard, 1600);
    window.setTimeout(syncWalletMainCard, 3000);
    window.setTimeout(syncWalletMainCard, 5000);
    window.setTimeout(syncWalletMainCard, 8000);
  }

  function start() {
    createWalletCardsRoot();
    bindWalletCardEvents();

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
    ].forEach(observeSource);

    startSync();

    window.addEventListener("focus", syncWalletMainCard);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      walletCardsMetaCache = null;
      syncWalletMainCard();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
