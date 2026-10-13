export function getSmallGroupsSheetState(currentState, action) {
  if (action === 'open') return 'full';
  if (action === 'close') return 'closed';
  if (action === 'collapse' && currentState === 'full') return 'half';
  if (action === 'expand' && currentState === 'half') return 'full';
  return currentState;
}
