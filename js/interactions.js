const PLACES = [
  {
    image: "kuala-lumpur",
    alt: "Petronas Twin Towers above KLCC Park at sunset",
    coordinate: "03°09′ N\n101°43′ E",
    title: "The city, in layers.",
    copy: "Glass and steel above. Market stalls below. Kuala Lumpur is best read at more than one height.",
    href: "#home",
    link: "Revisit the skyline",
  },
  {
    image: "george-town",
    alt: "Ornate heritage shophouses with green shutters in George Town, Penang",
    coordinate: "05°25′ N\n100°20′ E",
    title: "Read the street.",
    copy: "George Town’s shophouses hold more than their façades. Walk the five-foot ways; leave room for whatever catches your eye.",
    href: "#streets",
    link: "Return to street level",
  },
  {
    image: "langkawi",
    alt: "A limestone island covered with forest in Langkawi’s Kilim Geoforest Park",
    coordinate: "06°18′ N\n99°51′ E",
    title: "The long way around.",
    copy: "At Kilim, mangrove roots meet limestone and tidal water. Langkawi has a different view around every bend.",
    href: "#coast",
    link: "Find island time",
  },
  {
    image: "kinabalu",
    alt: "Mount Kinabalu rising behind green forested hills in Sabah",
    coordinate: "06°04′ N\n116°33′ E",
    title: "A mountain sets the scale.",
    copy: "Kinabalu rises to 4,095.2 metres. Below its granite summit, the forests of Sabah carry on at their own pace.",
    href: "#borneo",
    link: "Cross to Borneo",
  },
];

export function initPlaces() {
  const buttons = [...document.querySelectorAll(".place-choice")];
  const image = document.querySelector("#place-image");
  const wrapper = image.parentElement;
  const controller = new AbortController();
  let selected = 0;
  let revision = 0;
  let activeTween;
  const warmed = new Set();
  function warm(index) {
    if (warmed.has(index)) return;
    warmed.add(index);
    const img = new Image();
    img.src = `/assets/images/${PLACES[index].image}-1200.webp`;
  }
  async function select(index) {
    if (index === selected) return;
    selected = index;
    const ownRevision = ++revision;
    const place = PLACES[index];
    buttons.forEach((button, i) => {
      button.classList.toggle("is-active", i === index);
      button.setAttribute("aria-pressed", String(i === index));
    });
    const next = new Image();
    next.src = `/assets/images/${place.image}-1200.webp`;
    try {
      await next.decode();
    } catch {
      return;
    }
    if (ownRevision !== revision) return;
    activeTween?.kill();
    image.src = next.src;
    image.alt = place.alt;
    document.querySelector("#place-coordinate").textContent = place.coordinate;
    document.querySelector("#place-title").textContent = place.title;
    document.querySelector("#place-copy").textContent = place.copy;
    const link = document.querySelector("#place-link");
    link.href = place.href;
    link.replaceChildren(document.createTextNode(place.link + " "));
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    link.append(arrow);
    if (
      window.gsap &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      activeTween = gsap.fromTo(
        image,
        { clipPath: "inset(0 0 100% 0)", scale: 1.07 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 0.7,
          ease: "power3.inOut",
          clearProps: "clipPath,transform",
        },
      );
    }
  }
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => select(index), {
      signal: controller.signal,
    });
    button.addEventListener("pointerenter", () => warm(index), {
      signal: controller.signal,
    });
    button.addEventListener("focus", () => warm(index), {
      signal: controller.signal,
    });
    button.addEventListener(
      "keydown",
      (event) => {
        if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const target =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (index +
                  (event.key === "ArrowDown" ? 1 : -1) +
                  buttons.length) %
                buttons.length;
        buttons[target].focus();
        select(target);
      },
      { signal: controller.signal },
    );
  });
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        PLACES.forEach((_, i) => warm(i));
        observer.disconnect();
      }
    },
    { rootMargin: "300px" },
  );
  observer.observe(wrapper);
  return () => {
    controller.abort();
    observer.disconnect();
    activeTween?.kill();
  };
}

export function initPointer(gsap) {
  const mm = gsap.matchMedia();
  mm.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const controller = new AbortController();
      const options = { signal: controller.signal };
      const pointer = document.querySelector(".pointer");
      const moveX = gsap.quickTo(pointer, "x", {
        duration: 0.3,
        ease: "power3",
      });
      const moveY = gsap.quickTo(pointer, "y", {
        duration: 0.3,
        ease: "power3",
      });
      let visible = false;
      const show = (value) => {
        if (visible === value) return;
        visible = value;
        gsap.to(pointer, {
          opacity: value ? 1 : 0,
          scale: value ? 1 : 0.7,
          duration: 0.2,
          overwrite: true,
        });
      };
      document
        .querySelectorAll(".street-photo,.place-image-wrap")
        .forEach((target) => {
          target.addEventListener(
            "pointerenter",
            (event) => {
              gsap.set(pointer, {
                x: event.clientX - 31,
                y: event.clientY - 31,
              });
              show(true);
            },
            options,
          );
          target.addEventListener(
            "pointermove",
            (event) => {
              moveX(event.clientX - 31);
              moveY(event.clientY - 31);
            },
            options,
          );
          target.addEventListener("pointerleave", () => show(false), options);
        });
      document.querySelectorAll("[data-magnetic]").forEach((target) => {
        const x = gsap.quickTo(target, "x", { duration: 0.4, ease: "power3" });
        const y = gsap.quickTo(target, "y", { duration: 0.4, ease: "power3" });
        let box;
        target.addEventListener(
          "pointerenter",
          () => {
            box = target.getBoundingClientRect();
          },
          options,
        );
        target.addEventListener(
          "pointermove",
          (event) => {
            if (!box) return;
            x((event.clientX - box.left - box.width / 2) * 0.12);
            y((event.clientY - box.top - box.height / 2) * 0.12);
          },
          options,
        );
        target.addEventListener(
          "pointerleave",
          () => {
            x(0);
            y(0);
          },
          options,
        );
      });
      window.addEventListener("scroll", () => show(false), {
        ...options,
        passive: true,
      });
      return () => {
        controller.abort();
        gsap.set(pointer, { opacity: 0 });
      };
    },
  );
  return () => mm.revert();
}
