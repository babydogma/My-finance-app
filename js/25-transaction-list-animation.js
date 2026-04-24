(() => {
  function captureTransactionRects(container, excludeTransactionId = "") {
    const rects = new Map();

    if (!container) return rects;

    const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

    cards.forEach((card) => {
      if (excludeTransactionId && card.dataset.transactionId === excludeTransactionId) {
        return;
      }

      rects.set(card.dataset.transactionId, card.getBoundingClientRect());
    });

    return rects;
  }

  function playTransactionListFLIP(container, beforeRects) {
    if (!container || !beforeRects?.size) return;

    const cards = [...container.querySelectorAll(".list-card[data-transaction-id]")];

    cards.forEach((card) => {
      const id = card.dataset.transactionId;
      const prevRect = beforeRects.get(id);

      if (!prevRect) return;

      const nextRect = card.getBoundingClientRect();
      const deltaY = prevRect.top - nextRect.top;

      if (Math.abs(deltaY) < 0.5) return;

      card.classList.remove("list-card--reflow");
      card.style.transition = "none";
      card.style.transform = `translate3d(0, ${deltaY}px, 0)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add("list-card--reflow");
          card.style.transition = "";
          card.style.transform = "";

          const cleanup = () => {
            card.classList.remove("list-card--reflow");
            card.removeEventListener("transitionend", cleanup);
          };

          card.addEventListener("transitionend", cleanup, { once: true });
        });
      });
    });
  }

  function animateTransactionDelete(transactionId) {
    return new Promise((resolve) => {
      if (!transactionId) {
        resolve();
        return;
      }

      const cards = [
        ...document.querySelectorAll(`[data-transaction-id="${transactionId}"]`),
      ];

      if (!cards.length) {
        resolve();
        return;
      }

      const containers = new Map();

      cards.forEach((card) => {
        const container = card.parentElement;
        if (!container) return;

        if (!containers.has(container)) {
          containers.set(container, captureTransactionRects(container, transactionId));
        }

        card.classList.add("list-card--delete-telegram");
      });

      window.setTimeout(() => {
        cards.forEach((card) => {
          card.remove();
        });

        containers.forEach((beforeRects, container) => {
          playTransactionListFLIP(container, beforeRects);
        });

        window.setTimeout(() => {
          resolve();
        }, 480);
      }, 520);
    });
  }

  window.FinanceAppTransactionListAnimation = {
    captureTransactionRects,
    playTransactionListFLIP,
    animateTransactionDelete,
  };
})();
