/* =========================================================
   15. ANALYTICS / OPERATIONS HEAD
   Shared screen headers, filter button and analytics mode switch
   ========================================================= */

#analyticsView,
#operationsView {
  padding-bottom: 234px;
}

.analytics-hub-head,
.operations-screen {
  margin-top: 6px;
}

.analytics-hub-head__row,
.operations-screen__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.analytics-hub-head__title-wrap,
.operations-screen__head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.analytics-hub-head__title,
.operations-screen__title {
  margin: 0;
  font-size: 34px;
  line-height: 0.95;
  font-weight: 950;
  letter-spacing: -0.07em;
  color: #f7f9ff;
}

.analytics-hub-head__subtitle,
.operations-screen__subtitle {
  margin: 0;
  color: rgba(255,255,255,0.42);
  font-size: 12px;
  font-weight: 760;
  letter-spacing: -0.02em;
}

.screen-filter-btn {
  width: 46px;
  height: 46px;
  min-width: 46px;
  border: 1px solid rgba(255, 255, 255, 0.055);
  border-radius: 50%;
  background:
    linear-gradient(180deg, rgba(40, 45, 58, 0.86) 0%, rgba(25, 30, 40, 0.72) 100%);
  color: rgba(236, 242, 252, 0.84);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.16),
    0 0 14px rgba(111, 156, 255, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.screen-filter-btn svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.analytics-mode-switch {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
  padding: 6px;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(30, 33, 42, 0.88) 0%, rgba(22, 25, 34, 0.92) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow:
    0 16px 34px rgba(0,0,0,0.28),
    inset 0 1px 0 rgba(255,255,255,0.03);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.analytics-mode-switch__btn {
  min-width: 0;
  width: 100%;
  height: 54px;
  padding: 0 12px;
  border: none;
  border-radius: 24px;
  background: transparent;
  color: rgba(238,241,247,0.74);
  font-size: 16px;
  font-weight: 860;
  letter-spacing: -0.03em;
  transition:
    background 0.16s ease,
    color 0.16s ease,
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.analytics-mode-switch__btn:active {
  transform: scale(0.985);
}

.analytics-mode-switch__btn.is-active {
  background:
    linear-gradient(180deg, rgba(111, 156, 255, 0.18) 0%, rgba(111, 156, 255, 0.11) 100%);
  color: #f4f8ff;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.05),
    0 0 22px rgba(111,156,255,0.1);
}

/* Operations title cleanup */

.operations-screen__title {
  margin: 0;
}

.operations-screen__subtitle {
  margin: 0;
}

@media (max-width: 420px) {
  .analytics-hub-head__title,
  .operations-screen__title {
    font-size: 30px;
  }

  .analytics-hub-head__subtitle,
  .operations-screen__subtitle {
    font-size: 11px;
  }

  .screen-filter-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .screen-filter-btn svg {
    width: 16px;
    height: 16px;
  }

  .analytics-mode-switch {
    border-radius: 26px;
  }

  .analytics-mode-switch__btn {
    height: 48px;
    font-size: 14px;
  }
}