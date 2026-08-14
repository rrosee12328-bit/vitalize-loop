export type MarketingAttribution = {
  landing_page_url: string;
  referrer_url?: string;
  fbp?: string;
  fbc?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const prefix = `${name}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
}

function compact(value: string | null) {
  return value?.trim() || undefined;
}

export function readMarketingAttribution(): MarketingAttribution {
  const url = new URL(window.location.href);
  const fbclid = compact(url.searchParams.get("fbclid"));
  const fbcFromCookie = getCookie("_fbc");
  const fbc = fbcFromCookie || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);

  return {
    landing_page_url: url.toString(),
    referrer_url: document.referrer || undefined,
    fbp: getCookie("_fbp"),
    fbc,
    utm_source: compact(url.searchParams.get("utm_source")),
    utm_medium: compact(url.searchParams.get("utm_medium")),
    utm_campaign: compact(url.searchParams.get("utm_campaign")),
    utm_content: compact(url.searchParams.get("utm_content")),
    utm_term: compact(url.searchParams.get("utm_term")),
  };
}

export function createMetaEventId(prefix: "lead" | "schedule") {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function trackMetaBrowserEvent(eventName: "Lead" | "Schedule", eventId: string) {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("trackSingle", pixelId, eventName, {}, { eventID: eventId });
}
