(() => {
  function getDateOnlyString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  function getTodayDateValue() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getCurrentMonthValue() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  function getMandatoryPaymentsMonthLabel(monthKey) {
    const [year, month] = String(monthKey).split("-").map(Number);
    const date = new Date(year, month - 1, 1);

    return date
      .toLocaleDateString("ru-RU", {
        month: "short",
      })
      .replace(".", "");
  }

  function getMandatoryPaymentsMonthItems() {
    const current = getCurrentMonthValue();
    const [year, month] = current.split("-").map(Number);
    const baseDate = new Date(year, month - 1, 1);

    const items = [];

    for (let index = -3; index <= 3; index += 1) {
      const date = new Date(baseDate.getFullYear(), baseDate.getMonth() + index, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      items.push({
        key,
        label: getMandatoryPaymentsMonthLabel(key),
        isCurrent: key === current,
      });
    }

    return items;
  }

  function formatDateRangeLabel(fromValue, toValue) {
    if (!fromValue || !toValue) return "";
    return `${formatDateShort(fromValue)} — ${formatDateShort(toValue)}`;
  }

  function getStartOfTodayTime() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  function getTransactionDateKey(item) {
  const rawValue = item.date || item.created_at || item.createdAt;

  if (!rawValue) return "";

  const rawText = String(rawValue);

  if (/^\d{4}-\d{2}-\d{2}$/.test(rawText)) {
    return rawText;
  }

  const parsedDate = new Date(rawText);

  if (!Number.isNaN(parsedDate.getTime())) {
    return getDateOnlyString(parsedDate);
  }

  return rawText.slice(0, 10);
}

function getTransactionTime(item) {
  const dateKey = getTransactionDateKey(item);

  if (!dateKey) return 0;

  const rawValue = item.date || item.created_at || item.createdAt;
  const rawText = String(rawValue || "");

  if (/^\d{4}-\d{2}-\d{2}$/.test(rawText)) {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  const parsedDate = new Date(rawText);

  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.getTime();
  }

  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) return 0;

  return new Date(year, month - 1, day).getTime();
}

function filterTransactionsByPeriod(items, period, selectedMonth, rangeStart, rangeEnd) {
  const todayKey = getTodayDateValue();
  const currentMonth = selectedMonth || getCurrentMonthValue();
  const startOfToday = getStartOfTodayTime();

  return items.filter((item) => {
    const dateKey = getTransactionDateKey(item);

    if (!dateKey) return false;

    const time = getTransactionTime(item);

    if (period === "month") {
      return dateKey.slice(0, 7) === currentMonth;
    }

    if (period === "today") {
      return dateKey === todayKey;
    }

    if (period === "7") {
      return time >= startOfToday - 6 * 24 * 60 * 60 * 1000;
    }

    if (period === "range") {
      if (!rangeStart || !rangeEnd) return true;
      return dateKey >= rangeStart && dateKey <= rangeEnd;
    }

    return true;
  });
}

  function getCurrentTime() {
    const now = new Date();

    return now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatMoney(value) {
    return `${new Intl.NumberFormat("ru-RU").format(Number(value) || 0)} ₽`;
  }

  function formatDateShort(dateValue) {
    if (!dateValue) return "";

    const rawDate = String(dateValue).slice(0, 10);
    const [year, month, day] = rawDate.split("-");

    if (!year || !month || !day) return "";

    return `${day}.${month}.${year.slice(-2)}`;
  }

  function sortTransactionsByLatest(items) {
    return [...items].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;

      return timeB - timeA;
    });
  }

  function formatMonthLabel(monthValue) {
    if (!monthValue) return "";

    const [year, month] = monthValue.split("-").map(Number);
    if (!year || !month) return "";

    const date = new Date(year, month - 1, 1);

    return date.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  }

  function formatMonthButtonLabel(monthValue) {
    if (!monthValue) return "Месяц";

    const [year, month] = monthValue.split("-").map(Number);
    if (!year || !month) return "Месяц";

    const date = new Date(year, month - 1, 1);
    const monthLabel = date.toLocaleDateString("ru-RU", { month: "long" });

    return monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
  }

  function getRussianMonthNames() {
    return [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.FinanceAppFormatDate = {
    getDateOnlyString,
    roundToTwo,
    getTodayDateValue,
    getCurrentMonthValue,
    getMandatoryPaymentsMonthLabel,
    getMandatoryPaymentsMonthItems,
    formatDateRangeLabel,
    getStartOfTodayTime,
    filterTransactionsByPeriod,
    getCurrentTime,
    formatMoney,
    formatDateShort,
    sortTransactionsByLatest,
    formatMonthLabel,
    formatMonthButtonLabel,
    getRussianMonthNames,
    escapeHtml,
  };
})();