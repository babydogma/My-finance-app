(() => {
  const ROOT_ID = "walletCardsV1";
  const DECK_ID = "walletCardsDeck";
  const MAIN_CARD_ID = "walletMainAccountCard";
  const DRAFT_CARD_ID = "walletDraftCard";
  const META_KEY = "wallet_cards";

  const TYPES = [
    { value: "account", label: "Счёт", subtitle: "Счёт", entityType: "account", accountKind: "default" },
    { value: "cash", label: "Наличные", subtitle: "Наличные деньги", entityType: "account", accountKind: "cash" },
    { value: "saving", label: "Накопления", subtitle: "Накопления", entityType: "safe_bucket", bucketKind: "saving" },
  ];

  const COLORS = [
    { value: "graphite", label: "Графит" },
    { value: "sand", label: "Песок" },
    { value: "sky", label: "Небо" },
    { value: "sage", label: "Шалфей" },
    { value: "pearl", label: "Жемчуг" },
  ];

  let cardsCache = null;
  let isSavingDraft = false;

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

  function makeId(prefix) {
    if (window.crypto?.randomUUID) return `${prefix}_${window.crypto.randomUUID()}`;
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
    return typeof bridge()?.roundToTwo === "function"
      ? bridge().roundToTwo(amount)
      : Math.round(amount * 100) / 100;
  }

  function parseMoney(value) {
    const normalized = String(value || "").replace(/\s+/g, "").replace(",", ".").replace(/[^\d.-]/g, "");
    return roundMoney(Number(normalized) || 0);
  }

  function formatMoney(value) {
    const amount = roundMoney(value);
    if (typeof bridge()?.formatMoney === "function") return bridge().formatMoney(amount);
    return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(amount)} ₽`;
  }

  function typeOf(value) {
    return TYPES.find((item) => item.value === value) || TYPES[0];
  }

  function colorOf(value) {
    return COLORS.find((item) => item.value === value) || COLORS[0];
  }

  function deck() {
    return byId(DECK_ID);
  }

  function clickById(id) {
    const node = byId(id);
    if (!node) return false;
    node.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
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
    requestAnimationFrame(() => modal.classList.add("is-visible"));
  }

  function isModalVisible(modalId) {
    const modal = byId(modalId);
    return Boolean(modal && !modal.classList.contains("hidden") && !modal.classList.contains("is-closing"));
  }

  function openTarget(triggerId, modalId) {
    clickById(triggerId);
    window.setTimeout(() => {
      if (!isModalVisible(modalId)) openModalFallback(modalId);
    }, 60);
  }

  function mainAction(action) {
    if (action === "mandatory") return openTarget("openMandatoryPaymentsModalBtn", "mandatoryPaymentsModal");
    if (action === "budget") return openTarget("openBudgetAnalyticsModalBtn", "budgetAnalyticsModal");
    if (action === "expected") return openTarget("openExpectedIncomeModalBtn", "expectedIncomeModal");
  }

  function readMetaFromState(key) {
    const meta = state()?.appMeta || state()?.app_meta || state()?.meta || null;
    if (!meta) return "";

    if (Array.isArray(meta)) {
      const row = meta.find((item) => item?.id === key || item?.key === key || item?.name === key || item?.meta_key === key);
      return row?.value ?? row?.meta_value ?? row?.json_value ?? row?.data ?? "";
    }

    if (typeof meta === "object") {
      const value = meta[key];
      if (typeof value === "string") return value;
      if (value && typeof value === "object") return value.value ?? value.meta_value ?? value.json_value ?? value.data ?? "";
      return value ?? "";
    }

    return "";
  }

  function parseCards(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "object") return Array.isArray(raw.cards) ? raw.cards : [];
    try {
      const parsed = JSON.parse(String(raw));
      if (Array.isArray(parsed)) return parsed;
      return Array.isArray(parsed.cards) ? parsed.cards : [];
    } catch {
      return [];
    }
  }

  function normalizeCards(cards) {
    if (!Array.isArray(cards)) return [];
    return cards
      .filter((card) => card && card.id && card.entityId)
      .map((card, index) => {
        const type = typeOf(card.type || card.kind).value;
        const color = colorOf(card.color || card.theme).value;
        return {
          id: String(card.id),
          entityType: card.entityType === "safe_bucket" ? "safe_bucket" : "account",
          entityId: String(card.entityId),
          type,
          color,
          title: String(card.title || "").trim(),
          subtitle: String(card.subtitle || typeOf(type).subtitle).trim(),
          initialAmount: Number(card.initialAmount) || 0,
          order: Number.isFinite(Number(card.order)) ? Number(card.order) : index,
        };
      })
      .sort((a, b) => a.order - b.order);
  }

  function getCards() {
    if (Array.isArray(cardsCache)) return cardsCache;
    cardsCache = normalizeCards(parseCards(readMetaFromState(META_KEY)));
    return cardsCache;
  }

  function metaValueFromRow(row) {
    return row?.value ?? row?.meta_value ?? row?.json_value ?? row?.data ?? "";
  }

  async function loadCardsFromSupabase() {
    const client = supabase();
    if (!client?.from) {
      cardsCache = normalizeCards(parseCards(readMetaFromState(META_KEY)));
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
        cardsCache = normalizeCards(parseCards(metaValueFromRow(data)));
        renderCards();
        return;
      }
    }

    cardsCache = normalizeCards(parseCards(readMetaFromState(META_KEY)));
    renderCards();
  }

  async function saveCards(cards) {
    const normalized = normalizeCards(cards);
    const value = JSON.stringify({ cards: normalized });
    cardsCache = normalized;
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
      if (!error) return Array.isArray(data) ? data[0] || null : data || null;
      lastError = error;
    }
    throw lastError || new Error(message);
  }

  async function createAccount(draft) {
    const client = supabase();
    if (!client?.from) throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");

    const id = makeDbId();
    const type = typeOf(draft.type);
    const now = new Date().toISOString();

    return tryDb([
      () => client.from("accounts").insert({ id, name: draft.title, role: type.accountKind, account_role: type.accountKind, account_kind: type.accountKind, kind: type.accountKind, primary_spend: false, is_primary_spend: false, balance: draft.amount, initial_balance: draft.amount, created_at: now }).select("*").single(),
      () => client.from("accounts").insert({ id, name: draft.title, role: type.accountKind, account_kind: type.accountKind, balance: draft.amount, created_at: now }).select("*").single(),
      () => client.from("accounts").insert({ id, name: draft.title, role: type.accountKind, created_at: now }).select("*").single(),
      () => client.from("accounts").insert({ id, name: draft.title, created_at: now }).select("*").single(),
    ], "Не удалось создать счёт.");
  }

  async function createBucket(draft) {
    const client = supabase();
    if (!client?.from) throw new Error("Supabase ещё не готов. Обнови страницу и попробуй снова.");

    const id = makeDbId();
    const now = new Date().toISOString();

    return tryDb([
      () => client.from("safe_buckets").insert({ id, name: draft.title, kind: "saving", bucket_kind: "saving", amount: draft.amount, balance: draft.amount, current_amount: draft.amount, created_at: now }).select("*").single(),
      () => client.from("safe_buckets").insert({ id, name: draft.title, kind: "saving", amount: draft.amount, created_at: now }).select("*").single(),
      () => client.from("safe_buckets").insert({ id, name: draft.title, created_at: now }).select("*").single(),
    ], "Не удалось создать накопление.");
  }

  async function createEntity(draft) {
    if (draft.type === "saving") {
      const bucket = await createBucket(draft);
      return { entityType: "safe_bucket", entityId: bucket.id };
    }
    const account = await createAccount(draft);
    return { entityType: "account", entityId: account.id };
  }

  function findAccount(id) {
    const accounts = Array.isArray(state()?.accounts) ? state().accounts : [];
    return accounts.find((account) => String(account.id) === String(id)) || null;
  }

  function findBucket(id) {
    if (typeof bridge()?.getSafeBucketById === "function") {
      const bucket = bridge().getSafeBucketById(id);
      if (bucket) return bucket;
    }
    const buckets = Array.isArray(state()?.safeBuckets) ? state().safeBuckets : [];
    return buckets.find((bucket) => String(bucket.id) === String(id)) || null;
  }

  function entityTitle(card) {
    if (card.entityType === "safe_bucket") return findBucket(card.entityId)?.name || card.title || "Карта";
    return findAccount(card.entityId)?.name || card.title || "Карта";
  }

  function entityAmount(card) {
    if (card.entityType === "safe_bucket") {
      const bucket = findBucket(card.entityId);
      if (typeof bridge()?.getSafeBucketBalance === "function") {
        const value = roundMoney(bridge().getSafeBucketBalance(card.entityId));
        if (value || bucket) return value;
      }
      return roundMoney(bucket?.amount ?? bucket?.balance ?? bucket?.current_amount ?? card.initialAmount);
    }

    const account = findAccount(card.entityId);
    if (typeof bridge()?.getRawAccountBalance === "function") {
      const value = roundMoney(bridge().getRawAccountBalance(card.entityId));
      if (value || account) return value;
    }
    return roundMoney(account?.balance ?? account?.amount ?? account?.initial_balance ?? card.initialAmount);
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
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          </button>
          <button class="wallet-cards-v1__icon-btn" type="button" id="walletCardsReportBtn" aria-label="Открыть итоги">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19V5"></path><path d="M6 19h13"></path><path d="M10 15v-4"></path><path d="M14 15V8"></path><path d="M18 15v-6"></path></svg>
          </button>
        </div>
      </div>
      <div class="wallet-cards-v1__stack wallet-cards-v1__stack--deck" id="${DECK_ID}">
        <article class="wallet-card-v1 wallet-card-v1--main" id="${MAIN_CARD_ID}" role="button" tabindex="0" aria-expanded="false">
          <div class="wallet-card-v1__summary">
            <div class="wallet-card-v1__name"><strong>Основной счёт</strong><span>Свободные деньги</span></div>
            <strong class="wallet-card-v1__amount" id="walletMainAccountValue">0 ₽</strong>
          </div>
          <div class="wallet-card-v1__details"><div class="wallet-card-v1__details-inner"><div class="wallet-card-v1__details-content">
            <div class="wallet-card-v1__panel">
              <div class="wallet-card-v1__row"><span>Можно тратить</span><strong id="walletMainDailyValue">0 ₽/день</strong></div>
              <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="mandatory"><span>К списанию</span><strong id="walletMainMandatoryValue">0 ₽</strong></button>
              <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="budget"><span>Бюджет месяца</span><strong id="walletMainBudgetValue">0 ₽ из 0 ₽</strong></button>
              <button class="wallet-card-v1__row wallet-card-v1__row--button" type="button" data-wallet-card-action="expected"><span>Ожидаемые деньги</span><strong id="walletMainExpectedValue">не добавлено</strong></button>
              <p class="wallet-card-v1__hint" id="walletMainHint">Данные обновятся после загрузки операций.</p>
            </div>
            <div class="wallet-card-v1__quick-actions">
              <button class="wallet-card-v1__action wallet-card-v1__action--danger" type="button" id="walletMainExpenseBtn">Расход</button>
              <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletMainIncomeBtn">Доход</button>
              <button class="wallet-card-v1__action" type="button" id="walletMainReportBtn">Итоги</button>
            </div>
          </div></div></div>
        </article>
      </div>`;

    mainView.insertBefore(section, oldHero);
    document.body.classList.add("wallet-cards-v1-enabled", "wallet-mode-hard");
  }

  function cardHtml(card) {
    const type = typeOf(card.type);
    const color = colorOf(card.color).value;
    return `
      <article class="wallet-card-v1 wallet-card-v1--custom wallet-card-v1--theme-${html(color)}" data-wallet-custom-card="true" data-wallet-card-id="${html(card.id)}" role="button" tabindex="0" aria-expanded="false">
        <div class="wallet-card-v1__summary">
          <div class="wallet-card-v1__name"><strong>${html(entityTitle(card))}</strong><span>${html(card.subtitle || type.subtitle)}</span></div>
          <strong class="wallet-card-v1__amount">${html(formatMoney(entityAmount(card)))}</strong>
        </div>
        <div class="wallet-card-v1__details"><div class="wallet-card-v1__details-inner"><div class="wallet-card-v1__details-content">
          <div class="wallet-card-v1__panel wallet-card-v1__panel--quiet">
            <div class="wallet-card-v1__row"><span>Тип</span><strong>${html(type.label)}</strong></div>
            <div class="wallet-card-v1__row"><span>Цвет</span><strong>${html(colorOf(color).label)}</strong></div>
            <p class="wallet-card-v1__hint">Карта связана с финансовой сущностью. Цвет — только внешний вид.</p>
          </div>
          <div class="wallet-card-v1__quick-actions wallet-card-v1__quick-actions--single">
            <button class="wallet-card-v1__action wallet-card-v1__action--danger" type="button" data-wallet-remove-card="${html(card.id)}">Удалить карту</button>
          </div>
        </div></div></div>
      </article>`;
  }

  function renderCards() {
    const node = deck();
    if (!node) return;
    $$('[data-wallet-custom-card]', node).forEach((card) => card.remove());
    const draft = byId(DRAFT_CARD_ID);
    getCards().forEach((card) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = cardHtml(card).trim();
      const element = wrapper.firstElementChild;
      if (!element) return;
      if (draft) node.insertBefore(element, draft);
      else node.appendChild(element);
    });
  }

  function draftHtml() {
    return `
      <article class="wallet-card-v1 wallet-card-v1--draft wallet-card-v1--theme-pearl is-open" id="${DRAFT_CARD_ID}" aria-expanded="true">
        <div class="wallet-card-v1__summary wallet-draft-card__summary">
          <div class="wallet-card-v1__name"><strong>Новая карта</strong><span>Заполни данные и сохрани</span></div>
          <strong class="wallet-card-v1__amount">0 ₽</strong>
        </div>
        <div class="wallet-card-v1__details"><div class="wallet-card-v1__details-inner"><div class="wallet-card-v1__details-content">
          <div class="wallet-card-v1__panel wallet-draft-card__panel">
            <label class="wallet-draft-field"><span>Название</span><input class="wallet-draft-input" id="walletDraftTitleInput" type="text" placeholder="Например: Наличка" autocomplete="off"></label>
            <label class="wallet-draft-field"><span>Сумма</span><input class="wallet-draft-input" id="walletDraftAmountInput" type="text" inputmode="decimal" placeholder="0 ₽"></label>
            <div class="wallet-draft-field"><span>Тип</span><div class="wallet-draft-segment" role="radiogroup" aria-label="Тип карты">
              ${TYPES.map((type) => `<button class="wallet-draft-chip ${type.value === "account" ? "is-active" : ""}" type="button" data-wallet-draft-type="${type.value}">${type.label}</button>`).join("")}
            </div></div>
            <div class="wallet-draft-field"><span>Цвет</span><div class="wallet-draft-palette" role="radiogroup" aria-label="Цвет карты">
              ${COLORS.map((color) => `<button class="wallet-draft-color wallet-draft-color--${color.value} ${color.value === "pearl" ? "is-active" : ""}" type="button" data-wallet-draft-color="${color.value}" aria-label="${color.label}"></button>`).join("")}
            </div></div>
            <p class="wallet-draft-status" id="walletDraftStatus"></p>
          </div>
          <div class="wallet-card-v1__quick-actions">
            <button class="wallet-card-v1__action" type="button" id="walletDraftCancelBtn">Отмена</button>
            <button class="wallet-card-v1__action wallet-card-v1__action--good" type="button" id="walletDraftSaveBtn">Сохранить</button>
          </div>
        </div></div></div>
      </article>`;
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
    COLORS.forEach((item) => draft.classList.remove(`wallet-card-v1--theme-${item.value}`));
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
    if (byId(DRAFT_CARD_ID)) {
      byId("walletDraftTitleInput")?.focus();
      return;
    }
    node.insertAdjacentHTML("beforeend", draftHtml());
    requestAnimationFrame(() => byId("walletDraftTitleInput")?.focus());
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

    const button = byId("walletDraftSaveBtn");
    isSavingDraft = true;
    if (button) button.disabled = true;
    setDraftStatus("Сохраняю…");

    try {
      const entity = await createEntity(draft);
      const cards = getCards();
      cards.push({ id: makeId("wallet_card"), entityType: entity.entityType, entityId: entity.entityId, type: draft.type, color: draft.color, title: draft.title, subtitle: typeOf(draft.type).subtitle, initialAmount: draft.amount, order: cards.length });
      await saveCards(cards);
      cancelDraft();
      renderCards();
      syncMain();
      window.setTimeout(() => { bridge()?.loadDataFromSupabase?.(); loadCardsFromSupabase(); }, 500);
    } catch (error) {
      console.error("[Wallet Cards] saveDraft failed:", error);
      setDraftStatus(error?.message || "Не удалось сохранить карту.", "error");
    } finally {
      isSavingDraft = false;
      if (button) button.disabled = false;
    }
  }

  async function removeCard(cardId) {
    await saveCards(getCards().filter((card) => card.id !== cardId));
    renderCards();
  }

  function toggleCard(card) {
    if (!card) return;
    const isOpen = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(isOpen));
  }

  function bindEvents() {
    const root = byId(ROOT_ID);
    if (!root || root.dataset.walletEventsBound === "true") return;
    root.dataset.walletEventsBound = "true";

    root.addEventListener("click", (event) => {
      const add = event.target.closest("#walletCardsAddBtn");
      if (add) { event.preventDefault(); startDraft(); return; }

      const typeButton = event.target.closest("[data-wallet-draft-type]");
      if (typeButton) {
        event.preventDefault();
        $$('[data-wallet-draft-type]', root).forEach((button) => button.classList.remove("is-active"));
        typeButton.classList.add("is-active");
        return;
      }

      const colorButton = event.target.closest("[data-wallet-draft-color]");
      if (colorButton) {
        event.preventDefault();
        $$('[data-wallet-draft-color]', root).forEach((button) => button.classList.remove("is-active"));
        colorButton.classList.add("is-active");
        setDraftColor(colorButton.dataset.walletDraftColor);
        return;
      }

      if (event.target.closest("#walletDraftCancelBtn")) { event.preventDefault(); cancelDraft(); return; }
      if (event.target.closest("#walletDraftSaveBtn")) { event.preventDefault(); saveDraft(); return; }

      const remove = event.target.closest("[data-wallet-remove-card]");
      if (remove) { event.preventDefault(); removeCard(remove.dataset.walletRemoveCard); return; }

      if (event.target.closest("#walletCardsReportBtn, #walletMainReportBtn")) { event.preventDefault(); clickById("openMonthlyReportBtn"); return; }
      if (event.target.closest("#walletMainExpenseBtn")) { event.preventDefault(); clickById("openExpenseModal"); return; }
      if (event.target.closest("#walletMainIncomeBtn")) { event.preventDefault(); clickById("openIncomeModal"); return; }

      const action = event.target.closest("[data-wallet-card-action]");
      if (action) { event.preventDefault(); mainAction(action.dataset.walletCardAction || ""); return; }

      if (event.target.closest("button, input, textarea, select, label")) return;

      const customCard = event.target.closest("[data-wallet-custom-card]");
      if (customCard) { toggleCard(customCard); return; }

      const mainCard = event.target.closest(`#${MAIN_CARD_ID}`);
      if (mainCard) toggleCard(mainCard);
    });

    root.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("button, input, textarea, select")) return;
      const card = event.target.closest(`#${MAIN_CARD_ID}, [data-wallet-custom-card]`);
      if (!card) return;
      event.preventDefault();
      toggleCard(card);
    });
  }

  function syncMain() {
    if (!byId(ROOT_ID)) return;
    setText("walletMainAccountValue", textById("balanceFreeMoneyValue") || textById("walletLightFreeValue") || "0 ₽");
    setText("walletMainDailyValue", `${textById("walletTodayCanValue", "0 ₽")}/день`);
    setText("walletMainMandatoryValue", textById("analyticsPendingMandatoryValue") || textById("walletCalendarPressureValue") || "0 ₽");
    setText("walletMainBudgetValue", `${textById("hardMonthBudgetSpentValue", "0 ₽")} ${textById("hardMonthBudgetTotalValue", "из 0 ₽")}`);
    setText("walletMainExpectedValue", textById("walletExpectedIncomeValue", "").toLowerCase().includes("ожидание пока не добавлено") ? "не добавлено" : textById("walletExpectedIncomeValue", "не добавлено"));
    setText("walletMainHint", textById("walletGameHint", "Данные обновятся после загрузки операций."));
    renderCards();
  }

  function observe(id) {
    const node = byId(id);
    if (!node) return;
    new MutationObserver(syncMain).observe(node, { childList: true, characterData: true, subtree: true });
  }

  function start() {
    createRoot();
    bindEvents();
    ["balanceFreeMoneyValue", "walletLightFreeValue", "walletTodayCanValue", "walletGameHint", "analyticsPendingMandatoryValue", "walletCalendarPressureValue", "hardMonthBudgetSpentValue", "hardMonthBudgetTotalValue", "walletExpectedIncomeValue"].forEach(observe);
    syncMain();
    loadCardsFromSupabase();
    [100, 350, 900, 1600, 3000].forEach((ms) => window.setTimeout(syncMain, ms));
    [700, 1800].forEach((ms) => window.setTimeout(loadCardsFromSupabase, ms));
    window.addEventListener("focus", () => { syncMain(); loadCardsFromSupabase(); });
    document.addEventListener("visibilitychange", () => { if (!document.hidden) { syncMain(); loadCardsFromSupabase(); } });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
