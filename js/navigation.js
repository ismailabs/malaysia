export function initNavigation() {
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let opener = null;
  document.querySelectorAll("[data-dialog]").forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const dialog = document.getElementById(button.dataset.dialog);
        opener = button;
        dialog.showModal();
        document.body.classList.add("dialog-open");
      },
      options,
    );
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog
      .querySelector(".dialog-close")
      .addEventListener("click", () => dialog.close(), options);
    dialog.addEventListener(
      "click",
      (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          dialog.close();
      },
      options,
    );
    dialog.addEventListener(
      "close",
      () => {
        document.body.classList.remove("dialog-open");
        opener?.focus({ preventScroll: true });
      },
      options,
    );
  });

  function goTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const openDialog = document.querySelector("dialog[open]");
    if (openDialog) {
      opener = null;
      openDialog.close();
    }
    const pin = window.ScrollTrigger?.getById(hash.slice(1));
    const headerHeight = document.querySelector(".header").offsetHeight;
    // Anchor positions respect pinned scene coordinates instead of transformed rectangles.
    const destination = pin
      ? pin.start
      : target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: Math.max(0, destination),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    if (location.hash !== hash) history.pushState(null, "", hash);
    const heading = target.querySelector("h1,h2") || target;
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
  document.addEventListener(
    "click",
    (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (
        !anchor ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const hash = anchor.getAttribute("href");
      if (hash.length < 2 || !document.querySelector(hash)) return;
      event.preventDefault();
      goTo(hash);
    },
    options,
  );
  // Restore a deep link after responsive pins and fonts have been measured.
  return {
    destroy: () => controller.abort(),
    restore: () => {
      if (location.hash && document.querySelector(location.hash))
        goTo(location.hash);
    },
  };
}
