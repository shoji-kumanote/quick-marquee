export function getElement(value: unknown): HTMLElement | null {
  if (typeof value === "string") {
    return document.querySelector(value);
  }

  if (value instanceof HTMLElement) return value;

  if (Array.isArray(value) && value[0] instanceof HTMLElement) {
    return value[0];
  }

  return null;
}
