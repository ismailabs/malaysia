export function initMotion(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();
  const meter = document.querySelector(".journey-meter");
  const meterFill = meter.querySelector("i");
  const percent = document.querySelector("#journey-percent");
  const label = document.querySelector("#journey-label");
  let previousPercent = -1;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    refreshPriority: -20,
    onUpdate: (self) => {
      gsap.set(meterFill, { scaleX: self.progress });
      const value = Math.round(self.progress * 100);
      if (value !== previousPercent) {
        percent.textContent = String(value).padStart(2, "0");
        previousPercent = value;
      }
      meter.style.opacity =
        self.scroll() > 200 && self.progress < 0.985 ? "1" : "0";
    },
  });
  document.querySelectorAll(".scene").forEach((scene) =>
    ScrollTrigger.create({
      trigger: scene,
      start: "top 40%",
      end: "bottom 40%",
      refreshPriority: -10,
      onToggle: (self) => {
        if (self.isActive)
          label.textContent = scene.dataset.scene.toUpperCase();
      },
    }),
  );

  mm.add(
    {
      desktop: "(min-width: 900px)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { desktop, reduce } = context.conditions;
      if (reduce) return;
      document.body.classList.add("motion-ready");
      // The entry sequence is brief and leaves native scrolling available throughout.
      if (window.scrollY < 100 && !location.hash) {
        gsap.from(".hero-title span", {
          yPercent: 115,
          opacity: 0,
          stagger: 0.045,
          duration: 1.25,
          ease: "power4.out",
          delay: 0.15,
        });
        gsap.from(".hero-image", {
          scale: 1.12,
          duration: 1.9,
          ease: "power2.out",
        });
        gsap.from(".hero-intro,.hero-edition,.hero-bottom", {
          opacity: 0,
          y: 15,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
        });
      }
      if (desktop) {
        gsap.to(".hero-title", {
          y: 110,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
        gsap.to(".hero-image", {
          yPercent: 12,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: desktop ? 55 : 24,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });

      let rail;
      let buttonEvents;
      if (desktop) {
        const stage = document.querySelector(".street-stage");
        const track = document.querySelector(".street-track");
        const windowElement = document.querySelector(".street-window");
        const prev = document.querySelector("#frame-prev");
        const next = document.querySelector("#frame-next");
        const distance = () =>
          Math.max(0, track.scrollWidth - windowElement.clientWidth);
        const counter = document.querySelector("#street-count");
        let current = 0;
        rail = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            id: "streets",
            trigger: stage,
            start: () =>
              `top ${document.querySelector(".header").offsetHeight}`,
            end: () => `+=${distance() + 300}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            refreshPriority: 10,
            onUpdate: (self) => {
              const active = Math.min(2, Math.round(self.progress * 2));
              if (active !== current) {
                current = active;
                counter.textContent = String(active + 1).padStart(2, "0");
              }
              prev.disabled = self.progress < 0.01;
              next.disabled = self.progress > 0.99;
              gsap.set(".street-progress span", {
                scaleX: 1 / 3 + (self.progress * 2) / 3,
              });
            },
          },
        });
        // Keyboard focus may move to a frame which is currently off-screen.
        buttonEvents = new AbortController();
        function frameTo(index) {
          const target = Math.max(0, Math.min(2, index));
          const st = rail.scrollTrigger;
          window.scrollTo({
            top: st.start + ((st.end - st.start) * target) / 2,
            behavior: "smooth",
          });
          document.querySelector("#frame-status").textContent =
            `Street frame ${target + 1} of 3`;
        }
        prev.addEventListener("click", () => frameTo(current - 1), {
          signal: buttonEvents.signal,
        });
        next.addEventListener("click", () => frameTo(current + 1), {
          signal: buttonEvents.signal,
        });
        document.querySelectorAll(".street-frame").forEach((frame, index) => {
          frame.addEventListener("focusin", () => frameTo(index), {
            signal: buttonEvents.signal,
          });
        });
        gsap.to(".coast-portal", {
          clipPath: "ellipse(76% 95% at 50% 50%)",
          ease: "power2.inOut",
          scrollTrigger: {
            id: "coast",
            trigger: ".coast-stage",
            start: () =>
              `top ${document.querySelector(".header").offsetHeight}`,
            end: "+=1250",
            pin: true,
            scrub: 0.6,
            refreshPriority: 9,
          },
        });
        const coast = ScrollTrigger.getById("coast");
        gsap.fromTo(
          ".coast-portal img",
          { scale: 1.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".coast",
              start: () => coast.start,
              end: () => coast.end,
              scrub: 0.6,
            },
          },
        );
        gsap.to(".coast-overlay", {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".coast",
            start: () => coast.start + 500,
            end: () => coast.start + 950,
            scrub: 0.5,
          },
        });
        gsap.to(".coast-backdrop", {
          scale: 1.15,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".coast",
            start: () => coast.start + 200,
            end: () => coast.start + 750,
            scrub: 0.5,
          },
        });
        gsap.from(".forest-photo", {
          y: 110,
          ease: "none",
          scrollTrigger: {
            trigger: ".borneo-collage",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
        gsap.from(".borneo-letter", {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: ".borneo-collage",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      } else {
        // No long pin or horizontal scroll on touch-sized screens.
        gsap.set(".coast-portal", { clipPath: "none" });
        gsap.set(".coast-overlay", { opacity: 1 });
        gsap.set(".coast-backdrop", { display: "none" });
        gsap.utils
          .toArray(".street-photo")
          .forEach((photo) =>
            gsap.from(photo, {
              clipPath: "inset(12% 0 12% 0)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: photo, start: "top 90%", once: true },
            }),
          );
      }
      gsap.from(".ending h2>span", {
        y: 90,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ending h2", start: "top 92%", once: true },
      });
      return () => {
        buttonEvents?.abort();
        document.body.classList.remove("motion-ready");
      };
    },
  );

  // Images have fixed CSS dimensions. Refresh only when final fonts affect measurements.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  return () => {
    mm.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
