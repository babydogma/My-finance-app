(() => {
  function createMandatoryPaymentLongPress({
    getMandatoryPaymentsActiveMonthKey,
    isMandatoryPaymentPaidInMonth,
    toggleMandatoryPaymentPaid,
    openMandatoryPaymentEditor,
  }) {
    let mandatoryLongPressTimer = null;
    let mandatoryLongPressVisualTimer = null;
    let mandatoryPressStartX = 0;
    let mandatoryPressStartY = 0;
    let mandatoryPressMoved = false;
    let mandatoryLongPressTriggered = false;

    function stopNativeSelection() {
      if (!window.getSelection) return;

      const selection = window.getSelection();

      if (selection && selection.removeAllRanges) {
        selection.removeAllRanges();
      }
    }

    function startMandatoryPaymentLongPress(card, item, startX = 0, startY = 0) {
      if (!card || !item) return;

      const currentMonthKey = getMandatoryPaymentsActiveMonthKey();
      const isPaid = isMandatoryPaymentPaidInMonth(item, currentMonthKey);

      mandatoryLongPressTriggered = false;
      mandatoryPressMoved = false;
      mandatoryPressStartX = startX;
      mandatoryPressStartY = startY;

      card.classList.remove(
        "mandatory-payment-card--hold-pay",
        "mandatory-payment-card--hold-unpay"
      );

      window.clearTimeout(mandatoryLongPressVisualTimer);
      window.clearTimeout(mandatoryLongPressTimer);

      mandatoryLongPressVisualTimer = window.setTimeout(() => {
        if (mandatoryPressMoved) return;

        card.classList.add(
          isPaid
            ? "mandatory-payment-card--hold-unpay"
            : "mandatory-payment-card--hold-pay"
        );
      }, 200);

      mandatoryLongPressTimer = window.setTimeout(async () => {
        if (mandatoryPressMoved) return;

        mandatoryLongPressTriggered = true;
        await toggleMandatoryPaymentPaid(item.id);
      }, 1550);
    }

    function cancelMandatoryPaymentLongPress(card) {
      window.clearTimeout(mandatoryLongPressVisualTimer);
      window.clearTimeout(mandatoryLongPressTimer);

      mandatoryLongPressVisualTimer = null;
      mandatoryLongPressTimer = null;
      mandatoryPressMoved = false;

      if (card) {
        card.classList.remove(
          "mandatory-payment-card--hold-pay",
          "mandatory-payment-card--hold-unpay"
        );
      }
    }

    function bindMandatoryPaymentPress(card, item) {
      if (!card || !item) return;

      const cancelBecauseScroll = () => {
        mandatoryPressMoved = true;
        cancelMandatoryPaymentLongPress(card);
      };

      card.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });

      card.addEventListener("selectstart", (event) => {
        event.preventDefault();
      });

      card.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });

      card.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        stopNativeSelection();
        startMandatoryPaymentLongPress(card, item, event.clientX, event.clientY);
      });

      card.addEventListener("pointermove", (event) => {
        const dx = Math.abs(event.clientX - mandatoryPressStartX);
        const dy = Math.abs(event.clientY - mandatoryPressStartY);

        if (dx > 10 || dy > 10) {
          cancelBecauseScroll();
        }
      });

      card.addEventListener("pointerup", () => {
        stopNativeSelection();

        const triggered = mandatoryLongPressTriggered;
        const moved = mandatoryPressMoved;

        cancelMandatoryPaymentLongPress(card);

        if (!triggered && !moved) {
          openMandatoryPaymentEditor(item.id);
        }
      });

      card.addEventListener("pointerleave", () => {
        cancelBecauseScroll();
        stopNativeSelection();
      });

      card.addEventListener("pointercancel", () => {
        cancelBecauseScroll();
        stopNativeSelection();
      });
    }

    return {
      startMandatoryPaymentLongPress,
      cancelMandatoryPaymentLongPress,
      bindMandatoryPaymentPress,
    };
  }

  window.FinanceAppMandatoryPaymentLongPress = {
    create: createMandatoryPaymentLongPress,
  };
})();