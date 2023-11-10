document.querySelectorAll(".quick-marquee").forEach((e) => {
  const o = {};
  if (e.id === "reverse") o.pixelsPerFrame = -0.5;
  const qm = new QuickMarquee(e, o).start();

  if (e.id === "hover") {
    e.addEventListener("mouseenter", () => {
      qm.pixelsPerFrame = 0.2;
    });
    e.addEventListener("mouseleave", () => {
      qm.pixelsPerFrame = 0.5;
    });
  }
});
