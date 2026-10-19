export function initMotion(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  let mm;
  let paused = false;
  const toggle = document.querySelector(".motion-toggle");
  function build() {
    mm?.revert();
    if (paused) return;
    mm = gsap.matchMedia();
    mm.add(
      {
        base: "(min-width: 0px)",
        desktop: "(min-width: 1100px)",
        reduce: "(prefers-reduced-motion: reduce)",
        fine: "(pointer: fine)",
      },
      (context) => {
        const coast = document.querySelector(".coast");
        if (context.conditions.reduce) {
          coast?.classList.add("is-rest");
          return () => coast?.classList.remove("is-rest");
        }
        const { desktop, fine } = context.conditions;
        const events = new AbortController();
        const opts = { signal: events.signal };
        // A brief shutter opens the central print. Text is always fully opaque.
        if (scrollY < 100 && !location.hash) {
          const intro = gsap.timeline({
            defaults: { duration: 1, ease: "power3.out" },
          });
          intro
            .from(
              ".signature-image",
              {
                clipPath: "inset(0 0 100% 0)",
                scale: 1.08,
                duration: 1.15,
                clearProps: "clipPath,transform",
              },
              0,
            )
            .from(
              ".hero-copy h1,.hero-copy p,.hero-copy .button,.destination-hero h1,.destination-promise",
              { y: 24, stagger: 0.08, clearProps: "transform" },
              0.12,
            )
            .from(
              ".print-city,.print-island",
              { y: 32, stagger: 0.1, clearProps: "transform" },
              0.2,
            );
        }
        gsap.utils.toArray("[data-rise]").forEach((el) => {
          gsap.from(el, {
            y: desktop ? 30 : 18,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          });
        });
        // Move only image interiors, so captions never drift into adjacent copy.
        gsap.utils.toArray(".drift-image").forEach((image) => {
          gsap.fromTo(
            image,
            { scale: 1.08, yPercent: -2 },
            {
              scale: 1.03,
              yPercent: 2,
              ease: "none",
              scrollTrigger: {
                trigger: image.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
        gsap.utils
          .toArray(
            ".street-frame img,.studio-photos img,.print-island img,.stream img",
          )
          .forEach((image) => {
            gsap.from(image, {
              y: 28,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: image, start: "top 96%", once: true },
            });
          });
        let stageHandle;
        if (desktop && coast && window.Stage) {
          const photo = coast.querySelector(".coast-photo img");
          stageHandle = Stage.scene(coast, {
            hold: 0.85,
            phone: "rest",
            scrub: 0.65,
            build: (scene) => {
              scene.fromTo(
                photo,
                { scale: 1.45, yPercent: 7 },
                { scale: 1, yPercent: 0, ease: "none", duration: 1 },
                0,
              );
              scene.fromTo(
                coast.querySelector(".coast-photo"),
                { scaleX: 0.78 },
                { scaleX: 1, ease: "none", duration: 1 },
                0,
              );
            },
          });
        } else coast?.classList.add("is-rest");
        if (fine)
          document.querySelectorAll(".button").forEach((button) => {
            const arrow = button.querySelector("span");
            if (!arrow) return;
            const x = gsap.quickTo(arrow, "x", {
              duration: 0.3,
              ease: "power2.out",
            });
            const y = gsap.quickTo(arrow, "y", {
              duration: 0.3,
              ease: "power2.out",
            });
            button.addEventListener(
              "pointermove",
              (event) => {
                const r = button.getBoundingClientRect();
                x((event.clientX - r.left - r.width / 2) * 0.08);
                y((event.clientY - r.top - r.height / 2) * 0.12);
              },
              opts,
            );
            button.addEventListener(
              "pointerleave",
              () => {
                x(0);
                y(0);
              },
              opts,
            );
          });
        return () => {
          events.abort();
          stageHandle?.revert();
          if (stageHandle)
            Stage.scenes = Stage.scenes.filter((item) => item !== stageHandle);
          coast?.classList.remove("is-live", "is-rest");
        };
      },
    );
  }
  function change() {
    paused = !paused;
    document.body.dataset.motion = paused ? "paused" : "active";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.textContent = paused ? "Resume movement" : "Pause movement";
    build();
    ScrollTrigger.refresh();
  }
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", change);
  }
  build();
  return () => {
    mm?.revert();
    toggle?.removeEventListener("click", change);
  };
}
