import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
});

export type IntakeInput = z.infer<typeof intakeSchema>;

const NOTIFY_TO = "info@vektiss.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function saveToSupabase(data: IntakeInput) {
  const url = process.env.EXTERNAL_SUPABASE_URL;
  const key = process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("External Supabase env vars not configured");

  const res = await fetch(`${url}/rest/v1/implementation_intake`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed (${res.status}): ${text}`);
  }
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
    await saveToSupabase(data);
    try {
      await sendNotification(data);
    } catch (err) {
      console.error("[intake] notification error", err);
    }
    return { ok: true as const };
  });
