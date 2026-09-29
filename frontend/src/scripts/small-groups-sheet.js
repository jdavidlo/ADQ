export function getSmallGroupsSheetState(currentState, action) {
  if (action === 'open') return 'full';
  if (action === 'close') return 'closed';
  return currentState;
}
