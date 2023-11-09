export function getWidth(element: HTMLElement): number {
  const style = window.getComputedStyle(element, null);
  const left = Number.parseFloat(style.marginLeft);
  const right = Number.parseFloat(style.marginRight);

  const gap = element.parentElement
    ? Number.parseFloat(
        window.getComputedStyle(element.parentElement, null).columnGap
      )
    : 0;

  return (
    element.offsetWidth +
    (Number.isFinite(left) ? left : 0) +
    (Number.isFinite(right) ? right : 0) +
    (Number.isFinite(gap) ? gap : 0)
  );
}
