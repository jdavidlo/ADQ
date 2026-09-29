export function getChromeState(direction) {
  if (direction === 'up') return { headerVisible: true, dockCompact: false };
  if (direction === 'down') return { headerVisible: false, dockCompact: true };
  return null;
}

export function getScrollDirection(previousY, currentY, threshold = 4) {
  const delta = currentY - previousY;

  if (Math.abs(delta) <= threshold) return 'idle';
  return delta > 0 ? 'down' : 'up';
}
