// Collection is deliberately disconnected until a genuine property and consent
// integration exist. No storage, PII, query strings or network requests.
export function initAnalytics() {
  const controller = new AbortController();
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest("a[data-cta-placement]");
      if (!link) return;
      const destination = new URL(link.href);
      if (destination.origin !== "https://ismailstudio.my") return;
      const detail = Object.freeze({
        event: "portfolio_outbound_click",
        cta_placement: link.dataset.ctaPlacement,
        source_path: location.pathname,
        destination_host: destination.hostname,
        consent_state: "no-collection",
      });
      window.dispatchEvent(
        new CustomEvent("malaysia:portfolio_outbound_click", { detail }),
      );
    },
    { signal: controller.signal },
  );
  return () => controller.abort();
}
