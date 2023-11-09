export function debounce<T extends (...args: unknown[]) => void>(
  waitMs: number,
  handler: T
): T {
  let timer: number | undefined;

  return ((...args: Parameters<T>): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      handler(...args);
    }, waitMs);
  }) as T;
}
