export function getCarouselSwipeDirection(deltaX, deltaY) {
  if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return 0;
  return deltaX < 0 ? 1 : -1;
}

export function bindCarouselGestures(surface, onSwipe) {
  let start = null;
  let direction = 0;
  const begin = (x, y) => { start = { x, y }; direction = 0; };
  const move = (x, y, event) => {
    if (!start) return;
    direction = getCarouselSwipeDirection(x - start.x, y - start.y);
    if (direction && event.cancelable) event.preventDefault();
  };
  const end = () => {
    if (start && direction) onSwipe(direction);
    start = null;
    direction = 0;
  };
  surface.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) { start = null; return; }
    begin(event.touches[0].clientX, event.touches[0].clientY);
  }, { passive: true });
  surface.addEventListener('touchmove', event => {
    if (event.touches.length !== 1) { start = null; return; }
    move(event.touches[0].clientX, event.touches[0].clientY, event);
  }, { passive: false });
  surface.addEventListener('touchend', end);
  surface.addEventListener('touchcancel', () => { start = null; });
  surface.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button === 0) begin(event.clientX, event.clientY);
  });
  surface.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse' && event.buttons === 1) move(event.clientX, event.clientY, event);
  });
  surface.addEventListener('pointerup', event => { if (event.pointerType === 'mouse') end(); });
  surface.addEventListener('pointercancel', () => { start = null; });
  surface.addEventListener('dragstart', event => event.preventDefault());
}
