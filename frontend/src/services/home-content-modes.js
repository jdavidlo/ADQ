import catalog from '../../../data/catalogs/home-content-modes.json' with { type: 'json' };

export function getHomeContentModes() {
  return catalog;
}

export function getHomeContentMode(value) {
  const mode = catalog.modes.find(item => item.value === value);
  if (!mode) throw new RangeError(`Unsupported home content mode: ${value}`);
  return mode;
}

export function getSermonPreview(value = null) {
  const option = catalog.sermonPreviews.find(item => item.value === value);
  if (!option) throw new RangeError(`Unknown sermon preview: ${value}`);
  return option.value === null ? null : option;
}
