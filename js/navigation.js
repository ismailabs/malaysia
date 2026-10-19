export function initNavigation() {
  const events = new AbortController();
  const opts = { signal: events.signal };
  const dialog = document.querySelector("#place-menu");
  const opener = document.querySelector(".menu-button");
  if (dialog?.showModal && opener) {
    opener.hidden = false;
    opener.setAttribute("aria-expanded", "false");
    document.querySelector(".places-fallback").hidden = true;
    opener.addEventListener(
      "click",
      () => {
        dialog.showModal();
        opener.setAttribute("aria-expanded", "true");
        document.body.classList.add("dialog-open");
        dialog.querySelector(".dialog-close").focus();
      },
      opts,
    );
    dialog
      .querySelector(".dialog-close")
      .addEventListener("click", () => dialog.close(), opts);
    dialog.addEventListener(
      "close",
      () => {
        document.body.classList.remove("dialog-open");
        opener.setAttribute("aria-expanded", "false");
        opener.focus({ preventScroll: true });
      },
      opts,
    );
    dialog.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Tab") return;
        const controls = [
          ...dialog.querySelectorAll("a[href],button:not([disabled])"),
        ].filter((el) => el.getClientRects().length);
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      },
      opts,
    );
    dialog.addEventListener(
      "click",
      (event) => {
        if (event.target !== dialog) return;
        const r = dialog.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          dialog.close();
      },
      opts,
    );
  }
  // Keep ordinary links, URL hashes and browser Back/Forward. Only add focus after
  // native same-document navigation; no pushState or smooth-scroll interception.
  function focusHash() {
    if (!location.hash) return;
    let target;
    try {
      target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
    } catch {
      return;
    }
    if (!target) return;
    const st = window.ScrollTrigger?.getById(target.id);
    if (st) window.scrollTo({ top: st.start, behavior: "instant" });
    const focus = target.matches("main,h1,h2")
      ? target
      : target.querySelector("h1,h2") || target;
    if (!focus.hasAttribute("tabindex")) focus.setAttribute("tabindex", "-1");
    focus.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", focusHash, opts);
  return () => events.abort();
}
