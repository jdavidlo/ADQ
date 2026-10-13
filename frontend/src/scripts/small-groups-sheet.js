export function getSmallGroupsSheetState(currentState, action) {
  if (action === 'open') return 'full';
  if (action === 'close' || action === 'collapse') return 'closed';
  return currentState;
}
