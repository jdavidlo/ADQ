export function getNextCarouselIndex(currentIndex, slideCount, direction) {
  if (slideCount <= 0) return 0;
  return (currentIndex + direction + slideCount) % slideCount;
}
