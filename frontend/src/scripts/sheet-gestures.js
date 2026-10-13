export function getSheetGestureAction(state, deltaY, deltaX, scrollTop) {
  if (state === 'closed' || Math.abs(deltaY) < 45 || Math.abs(deltaX) >= Math.abs(deltaY)) return null;
  if (deltaY < 0 && state === 'half') return 'expand';
  if (deltaY > 0 && scrollTop <= 1) return state === 'full' ? 'collapse' : 'close';
  return null;
}

// Native touch listeners allow sheet gestures without disabling normal content scrolling.
export function bindSheetGestures(sheet, getState, onAction) {
  const header = sheet.ownerDocument?.querySelector('[data-site-header]');
  if (header) {
    const syncHeaderGap = () => {
      sheet.ownerDocument.documentElement.style.setProperty('--modal-top-gap', `${Math.ceil(header.offsetHeight + 8)}px`);
    };
    syncHeaderGap();
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(syncHeaderGap).observe(header);
  }
  let start = null;
  let suppressClickUntil = 0;
  const begin = (x, y, target) => {
    const scroller = target.closest('[class$="sheet-content"]');
    start = { x, y, scrollTop: scroller?.scrollTop ?? 0, action: null };
  };
  const move = (x, y, event) => {
    if (!start) return;
    const action = getSheetGestureAction(getState(), y - start.y, x - start.x, start.scrollTop);
    if (action) {
      start.action = action;
      if (event.cancelable) event.preventDefault();
    }
  };
  const finish = () => {
    const action = start?.action;
    start = null;
    if (action) {
      suppressClickUntil = Date.now() + 450;
      onAction(action);
    }
  };
  sheet.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) { start = null; return; }
    const touch = event.touches[0];
    begin(touch.clientX, touch.clientY, event.target);
  }, { passive: true });
  sheet.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 1) { start = null; return; }
    move(event.touches[0].clientX, event.touches[0].clientY, event);
  }, { passive: false });
  sheet.addEventListener('touchend', finish);
  sheet.addEventListener('touchcancel', () => { start = null; });
  const mouseEvents = sheet.ownerDocument ?? sheet;
  sheet.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if (event.target.closest('a, input, textarea, select, [contenteditable="true"]')) return;
    begin(event.clientX, event.clientY, event.target);
    // A mouse drag is explicitly moving the sheet, not scrolling its content.
    start.scrollTop = 0;
    if (!event.target.closest('button') && event.cancelable) event.preventDefault();
  });
  mouseEvents.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' && event.buttons === 1) move(event.clientX, event.clientY, event);
  });
  mouseEvents.addEventListener('pointerup', (event) => { if (event.pointerType === 'mouse') finish(); });
  mouseEvents.addEventListener('pointercancel', () => { start = null; });
  sheet.addEventListener('dragstart', (event) => event.preventDefault());
  sheet.addEventListener('click', (event) => {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
}
