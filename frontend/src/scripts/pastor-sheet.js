const VALID_STATES = new Set(['closed', 'half', 'full']);

export function getPastorSheetState(state, action) {
  if (!VALID_STATES.has(state)) return 'closed';
  if (action === 'open' && state === 'closed') return 'half';
  if (action === 'expand' && state === 'half') return 'full';
  if (action === 'collapse' && state === 'full') return 'half';
  if (action === 'close' && state !== 'closed') return 'closed';
  if (action === 'collapse' && state === 'half') return 'closed';
  return state;
}
