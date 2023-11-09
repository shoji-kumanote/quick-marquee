import { debounce } from "../functions/debounce";
import { getElement } from "../functions/getElement";
import { getWidth } from "../functions/getWidth";
import { QuickMarqueeOptions } from "../types/QuickMarqueeOptions";

const DEFAULT_OPTIONS: QuickMarqueeOptions = {
  pixelsPerFrame: 0.5,
  debounceMs: 20,
};

export class QuickMarquee {
  readonly target: HTMLElement | null;

  pixelsPerFrame: number;

  readonly #itemSources: HTMLElement[];

  #busy: boolean;
  #running: boolean;
  #items: HTMLElement[];
  #totalWidth: number;
  #offset: number;

  constructor(target: unknown, options: Partial<QuickMarqueeOptions> = {}) {
    this.target = getElement(target);

    this.pixelsPerFrame =
      options?.pixelsPerFrame ?? DEFAULT_OPTIONS.pixelsPerFrame;

    this.#itemSources =
      this.target !== null
        ? Array.from(this.target.querySelectorAll<HTMLElement>(":scope > *"))
        : [];

    this.#busy = false;
    this.#running = false;
    this.#items = [];
    this.#totalWidth = 0;
    this.#offset = 0;

    this.#generateItems();

    const debounceMs = options?.debounceMs ?? DEFAULT_OPTIONS.debounceMs;

    window.addEventListener(
      "resize",
      debounce(debounceMs, () => this.#generateItems())
    );
  }

  start(): this {
    if (this.#running) return this;

    this.#running = true;
    window.requestAnimationFrame(() => this.#update());

    return this;
  }

  stop(): this {
    this.#running = false;

    return this;
  }

  #generateItems(): void {
    if (this.target === null) return;

    this.#busy = true;

    this.target.innerHTML = "";
    this.#itemSources.forEach((x) => this.target?.appendChild(x));

    const gap = Number.parseFloat(
      window.getComputedStyle(this.target, null).columnGap
    );

    const widths = this.#itemSources.map((e) => e.offsetWidth);
    const fullWidths = this.#itemSources.map((e, i, a) => getWidth(e));
    const totalWidth = fullWidths.reduce((a, b) => a + b, 0);
    const containerWidth = this.target.offsetWidth;

    const items: HTMLElement[] = [];
    let width = 0;
    let index = 0;
    while (width < containerWidth + totalWidth) {
      const item = this.#itemSources[index].cloneNode(true) as HTMLElement;
      item.style.width = `${widths[index]}px`;
      items.push(item);
      width += fullWidths[index];
      index = (index + 1) % widths.length;
    }
    this.#items = items;
    this.#totalWidth = totalWidth;

    this.target.innerHTML = "";
    items.forEach((x) => this.target?.appendChild(x));

    this.#offset = this.#offset % this.#totalWidth;

    this.#busy = false;
  }

  #update(): void {
    if (this.#running) window.requestAnimationFrame(() => this.#update());

    if (this.#busy) return;

    this.#offset =
      this.pixelsPerFrame > 0
        ? (this.#offset + this.pixelsPerFrame) % this.#totalWidth
        : (this.#offset + this.#totalWidth + this.pixelsPerFrame) %
          this.#totalWidth;

    this.#items.forEach((x) => {
      x.style.transform = `translate(${-this.#offset}px, 0)`;
    });
  }
}
