import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { sendMetaWebsiteEvent } from "@/lib/meta-capi.server";

const attributionSchema = z.object({
  landing_page_url: z.string().url().max(2_000),
  referrer_url: z.string().url().max(2_000).optional(),
  fbp: z.string().max(500).optional(),
  fbc: z.string().max(500).optional(),
  utm_source: z.string().max(500).optional(),
  utm_medium: z.string().max(500).optional(),
  utm_campaign: z.string().max(500).optional(),
  utm_content: z.string().max(500).optional(),
  utm_term: z.string().max(500).optional(),
});

const intakeSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  business_name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  industry: z.string().trim().min(1).max(80),
  monthly_call_volume: z.string().trim().min(1).max(40),
  team_size: z.string().trim().min(1).max(40),
  problem_description: z.string().trim().min(1).max(4000),
  consent_contact: z.literal(true),
  tracking_consent: z.boolean(),
  meta_lead_event_id: z.string().trim().min(1).max(160).optional(),
  attribution: attributionSchema.optional(),
});

const scheduledCallSchema = z.object({
  intake_id: z.string().uuid(),
  booking_tracking_token: z.string().uuid(),
  meta_schedule_event_id: z.string().trim().min(1).max(160),
  event_source_url: z.string().url().max(2_000),
  calendly_event_uri: z.string().url().max(2_000).optional(),
  scheduled_at: z.string().datetime().optional(),
});

export type IntakeInput = z.infer<typeof intakeSchema>;

const NOTIFY_TO = "info@vektiss.com";

type StoredIntake = {
  id: string;
  booking_tracking_token: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getExternalSupabaseConfig() {
  const url = process.env.EXTERNAL_SUPABASE_URL;
  const key = process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("External Supabase env vars not configured");
  return { url, key };
}

function getRequestMetadata() {
  const request = getRequest();
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return {
    clientIpAddress:
      request.headers.get("cf-connecting-ip") ||
      forwardedFor ||
      request.headers.get("x-real-ip") ||
      undefined,
    clientUserAgent: request.headers.get("user-agent") || undefined,
  };
}

async function saveToSupabase(data: IntakeInput, bookingTrackingToken: string) {
  const { url, key } = getExternalSupabaseConfig();
  const res = await fetch(`${url}/rest/v1/implementation_intake`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ ...data, booking_tracking_token: bookingTrackingToken }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed (${res.status}): ${text}`);
  }

  const rows = (await res.json()) as StoredIntake[];
  const stored = rows[0];
  if (!stored?.id) throw new Error("Supabase did not return the stored intake ID");
  return stored;
}

async function updateScheduledCall(
  intakeId: string,
  bookingTrackingToken: string,
  patch: Record<string, unknown>,
) {
  const { url, key } = getExternalSupabaseConfig();
  const endpoint = new URL(`${url}/rest/v1/implementation_intake`);
  endpoint.searchParams.set("id", `eq.${intakeId}`);
  endpoint.searchParams.set("booking_tracking_token", `eq.${bookingTrackingToken}`);

  const res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase booking update failed (${res.status}): ${text}`);
  }

  const rows = (await res.json()) as Array<IntakeInput & StoredIntake>;
  const stored = rows[0];
  if (!stored?.id) throw new Error("Booking update was not authorized or intake was not found");
  return stored;
}

async function sendNotification(data: IntakeInput) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[intake] RESEND_API_KEY missing, skipping email");
    return;
  }

  const rows: Array<[string, string]> = [
    ["Business", data.business_name],
    ["Name", data.full_name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Industry", data.industry],
    ["Monthly call volume", data.monthly_call_volume],
    ["Team size", data.team_size],
    ["What they need help with", data.problem_description],
  ];

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0f172a">
      <h2 style="margin:0 0 4px;font-size:20px">New implementation intake</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px">${escapeHtml(data.business_name)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;width:220px;vertical-align:top">${escapeHtml(k)}</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;color:#64748b;font-size:12px">Submitted via vektiss.com/apply</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: "Vektiss <onboarding@resend.dev>",
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject: `New implementation intake — ${data.business_name}`,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`[intake] Resend send failed (${res.status}): ${text}`);
  }
}

export const submitImplementationIntake = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => intakeSchema.parse(input))
  .handler(async ({ data }) => {
    const bookingTrackingToken = crypto.randomUUID();
    const stored = await saveToSupabase(data, bookingTrackingToken);

    try {
      await sendNotification(data);
    } catch (err) {
      console.error("[intake] notification error", err);
    }

    if (data.tracking_consent && data.meta_lead_event_id && data.attribution) {
      try {
        const { clientIpAddress, clientUserAgent } = getRequestMetadata();
        await sendMetaWebsiteEvent({
          eventName: "Lead",
          eventId: data.meta_lead_event_id,
          eventSourceUrl: data.attribution.landing_page_url,
          email: data.email,
          phone: data.phone,
          fbp: data.attribution.fbp,
          fbc: data.attribution.fbc,
          externalId: stored.id,
          clientIpAddress,
          clientUserAgent,
          customData: {
            industry: data.industry,
            monthly_call_volume: data.monthly_call_volume,
          },
        });
      } catch (err) {
        console.error("[intake] Meta Lead event error", err);
      }
    }

    return {
      ok: true as const,
      intake_id: stored.id,
      booking_tracking_token: bookingTrackingToken,
    };
  });

export const recordScheduledCall = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => scheduledCallSchema.parse(input))
  .handler(async ({ data }) => {
    const stored = await updateScheduledCall(data.intake_id, data.booking_tracking_token, {
      booking_status: "scheduled",
      calendly_event_uri: data.calendly_event_uri,
      scheduled_at: data.scheduled_at,
      meta_schedule_event_id: data.meta_schedule_event_id,
    });

    if (stored.tracking_consent && stored.attribution) {
      try {
        const { clientIpAddress, clientUserAgent } = getRequestMetadata();
        await sendMetaWebsiteEvent({
          eventName: "Schedule",
          eventId: data.meta_schedule_event_id,
          eventSourceUrl: data.event_source_url,
          email: stored.email,
          phone: stored.phone,
          fbp: stored.attribution.fbp,
          fbc: stored.attribution.fbc,
          externalId: stored.id,
          clientIpAddress,
          clientUserAgent,
          customData: {
            industry: stored.industry,
            monthly_call_volume: stored.monthly_call_volume,
          },
        });
      } catch (err) {
        console.error("[intake] Meta Schedule event error", err);
      }
    }

    return { ok: true as const };
  });
