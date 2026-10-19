const quiet = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches ||
  document.body.dataset.motion === "paused";
export function initGallery() {
  const track = document.querySelector(".street-track");
  if (!track) return () => {};
  const events = new AbortController();
  const opts = { signal: events.signal };
  const frames = [...track.querySelectorAll(".street-frame")];
  const prev = document.querySelector("#frame-prev");
  const next = document.querySelector("#frame-next");
  const status = document.querySelector("#frame-status");
  const names = ["George Town", "Petaling Street", "Nasi lemak"];
  let current = 0;
  let pending = false;
  document.querySelector(".gallery-controls").hidden = false;
  function destination(i) {
    return Math.max(
      0,
      Math.min(
        track.scrollWidth - track.clientWidth,
        frames[i].offsetLeft - frames[0].offsetLeft,
      ),
    );
  }
  function update() {
    pending = false;
    const positions = frames.map((_, i) =>
      Math.abs(track.scrollLeft - destination(i)),
    );
    current = positions.indexOf(Math.min(...positions));
    prev.disabled = current === 0;
    next.disabled = current === frames.length - 1;
    status.textContent = names[current];
  }
  function go(i) {
    const target = Math.max(0, Math.min(frames.length - 1, i));
    track.scrollTo({
      left: destination(target),
      behavior: quiet() ? "instant" : "smooth",
    });
  }
  prev.addEventListener("click", () => go(current - 1), opts);
  next.addEventListener("click", () => go(current + 1), opts);
  track.addEventListener(
    "keydown",
    (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      go(
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? frames.length - 1
            : current + (event.key === "ArrowRight" ? 1 : -1),
      );
    },
    opts,
  );
  track.addEventListener(
    "scroll",
    () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    },
    { ...opts, passive: true },
  );
  window.addEventListener("resize", update, opts);
  update();
  return () => events.abort();
}

export function initPlaces() {
  const source = document.querySelector("#place-data");
  if (!source) return () => {};
  const places = JSON.parse(source.textContent);
  const buttons = [...document.querySelectorAll(".preview-button")];
  const image = document.querySelector(".place-preview img");
  const title = document.querySelector("#preview-title");
  const copy = document.querySelector("#preview-copy");
  const link = document.querySelector("#preview-link");
  const events = new AbortController();
  let revision = 0;
  let tween;
  const opts = { signal: events.signal };
  copy.parentElement.setAttribute("aria-live", "polite");
  async function select(i) {
    const mine = ++revision;
    const place = places[i];
    const preload = new Image();
    preload.src = `/assets/images/${place.image}-1200.webp`;
    try {
      await preload.decode();
    } catch {
      return;
    }
    if (mine !== revision || events.signal.aborted) return;
    buttons.forEach((b, index) =>
      b.setAttribute("aria-pressed", String(index === i)),
    );
    tween?.kill();
    image.srcset = [640, 1200, 2000]
      .map((w) => `/assets/images/${place.image}-${w}.webp ${w}w`)
      .join(", ");
    image.src = preload.src;
    image.alt = place.alt;
    image.width = place.dimensions[0];
    image.height = place.dimensions[1];
    image.style.objectPosition =
      place.slug === "langkawi" ? "center 57%" : "center";
    title.textContent = place.intro;
    copy.textContent = place.preview;
    link.href = `/destinations/${place.slug}/`;
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.replaceChildren(document.createTextNode(`Read ${place.name} `), arrow);
    if (window.gsap && !quiet())
      tween = gsap.fromTo(
        image,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
  }
  buttons.forEach((button, i) => {
    button.hidden = false;
    button.addEventListener("click", () => select(i), opts);
    button.addEventListener(
      "keydown",
      (event) => {
        if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (i + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) %
                buttons.length;
        buttons[next].focus();
        select(next);
      },
      opts,
    );
  });
  return () => {
    ++revision;
    events.abort();
    tween?.kill();
  };
}
