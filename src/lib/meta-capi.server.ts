type MetaEventName = "Lead" | "Schedule";

type MetaWebsiteEvent = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  eventTime?: number;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
  externalId?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  customData?: Record<string, string | number | boolean | undefined>;
};

const META_GRAPH_VERSION = "v26.0";

function normalizedEmail(value?: string) {
  return value?.trim().toLowerCase() || undefined;
}

function normalizedPhone(value?: string) {
  const digits = value?.replace(/\D/g, "");
  return digits || undefined;
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashIfPresent(value?: string) {
  return value ? sha256(value) : undefined;
}

function getMetaConfig() {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const enabled = process.env.META_CAPI_ENABLED === "true";
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;

  return { pixelId, accessToken, enabled, testEventCode };
}

/**
 * Sends a website event only when explicit tracking consent and the server-side
 * META_CAPI_ENABLED switch are both present. The access token remains server-only.
 */
export async function sendMetaWebsiteEvent(event: MetaWebsiteEvent) {
  const { pixelId, accessToken, enabled, testEventCode } = getMetaConfig();

  if (!enabled) {
    return { sent: false as const, reason: "META_CAPI_ENABLED is not true" };
  }
  if (!pixelId || !accessToken) {
    console.warn("[meta-capi] Meta configuration is incomplete; event was not sent");
    return { sent: false as const, reason: "Meta configuration is incomplete" };
  }

  const email = await hashIfPresent(normalizedEmail(event.email));
  const phone = await hashIfPresent(normalizedPhone(event.phone));
  const externalId = await hashIfPresent(event.externalId);

  const userData: Record<string, string | string[]> = {};
  if (email) userData.em = [email];
  if (phone) userData.ph = [phone];
  if (externalId) userData.external_id = [externalId];
  if (event.fbp) userData.fbp = event.fbp;
  if (event.fbc) userData.fbc = event.fbc;
  if (event.clientIpAddress) userData.client_ip_address = event.clientIpAddress;
  if (event.clientUserAgent) userData.client_user_agent = event.clientUserAgent;

  const customData = Object.fromEntries(
    Object.entries(event.customData ?? {}).filter(([, value]) => value !== undefined),
  );

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        ...(Object.keys(customData).length ? { custom_data: customData } : {}),
      },
    ],
  };

  if (testEventCode) body.test_event_code = testEventCode;

  const endpoint = new URL(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${encodeURIComponent(pixelId)}/events`,
  );
  endpoint.searchParams.set("access_token", accessToken);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(`[meta-capi] event rejected (${response.status}): ${responseBody}`);
  }

  return { sent: true as const, response: responseBody };
}
