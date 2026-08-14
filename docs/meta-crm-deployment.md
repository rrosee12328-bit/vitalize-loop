# Meta CRM and scheduled-call deployment guide

## What this change adds

The application now captures UTM and Meta attribution on `/apply`, creates an external CRM record before booking, uses an inline Calendly widget to detect a completed booking, and records both lead and scheduled-call events through the Meta Pixel and Conversions API with a shared event ID. Meta documents that a matching `event_name` plus event ID is the recommended browser/server deduplication method. [1]

The integration is intentionally consent-gated. Browser and server Meta events are only attempted when the intake’s optional tracking consent is selected and `META_CAPI_ENABLED=true`. Review the current privacy notice and tracking-consent language with a qualified attorney before enabling production customer-data sharing.

## Important deployment blocker

`src/routes/__root.tsx` currently redirects every route to `https://go.vektiss.com`. As a result, the new `/apply` flow will not run from this repository until the redirect is intentionally removed or the redirect target is updated to host this code. Do not deploy the new tracking flow and assume it is live without resolving this routing decision.

## Step 1: update the external Supabase CRM schema

The active intake flow writes to the external Supabase project identified in `.lovable/plan.md`, not the repository’s local Lovable Cloud schema. In that external project’s Supabase SQL Editor, run:

```text
docs/meta-crm-external-supabase-migration.sql
```

The migration adds booking status, CRM stages, attribution, Meta event identifiers, and an opaque booking token. The service-role server function uses that token to authorize the scheduled-call update after the embedded Calendly booking is completed.

## Step 2: configure Lovable server secrets

Set these values as server-side secrets in Lovable Cloud or the deployment provider. Do **not** add them to browser environment variables, source files, or Git.

| Secret | Required for | Source |
|---|---|---|
| `EXTERNAL_SUPABASE_URL` | CRM insert and booking update | External Supabase project URL |
| `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY` | CRM insert and booking update | External Supabase project service-role key |
| `RESEND_API_KEY` | Existing intake notification email | Resend |
| `META_PIXEL_ID` | Meta Conversions API | Events Manager data source |
| `META_CAPI_ACCESS_TOKEN` | Meta Conversions API | Events Manager Conversions API setup |
| `META_CAPI_ENABLED` | Enables server event delivery | Set exactly to `true` only after testing |
| `META_CAPI_TEST_EVENT_CODE` | Optional test-only Meta delivery | Events Manager Test Events; remove after verification |

Set the public browser variable separately:

| Public variable | Required for | Value |
|---|---|---|
| `VITE_META_PIXEL_ID` | Browser Pixel events | The same Pixel ID as `META_PIXEL_ID` |

The Meta access token must only ever exist in a server-side secret. The implementation sends server events to the documented versioned `/events` endpoint and supplies a required event time, action source, user data, website URL, and event ID. [2]

## Step 3: test the booking path

1. Resolve the root redirect or deploy the application where `/apply` is reachable.
2. Submit a test intake with the optional tracking consent selected.
3. Verify one new CRM row contains the UTM/Meta attribution object, a lead event identifier, and a booking token.
4. Complete a Calendly booking inside the embedded widget.
5. Verify the same CRM row updates to `booking_status = scheduled`, includes `scheduled_at`, and has a schedule event identifier.
6. In Meta Events Manager, use **Test Events** with `META_CAPI_TEST_EVENT_CODE` and verify the `Lead` and `Schedule` server events. Meta states that test events remain in measurement, so remove the test-event secret after the validation session. [2]
7. Verify the browser Pixel and server event share the same event name and event ID, then check deduplication in Events Manager. [1]

## Calendly operational backstop

The embedded widget emits `calendly.event_scheduled` to the parent window, which the application uses to update the CRM and send the paired Meta server event. Calendly documents this postMessage event for embedded scheduling. [3]

For a reliable server-side reconciliation of cancellations, no-shows, and reschedules, create a Calendly webhook subscription later. Calendly supports `invitee.created`, `invitee.canceled`, and no-show events, recommends signature validation, and advises deduplicating webhook handling. [4] [5] That follow-up requires the Calendly personal-access-token or OAuth credentials and a publicly reachable webhook URL.

## Downstream CRM stages

Use the new fields to keep the CRM as the source of truth:

| CRM state | Who updates it | Meta action |
|---|---|---|
| `new` | Automatic form intake | `Lead` browser/server pair when tracking is enabled |
| `booked` | Automatic embedded Calendly confirmation | `Schedule` browser/server pair when tracking is enabled |
| `attended` | Sales/operations | Record in CRM; prepare for future downstream feedback |
| `qualified` | Sales | Record qualification and reason |
| `opportunity` | Sales | Record expected value |
| `customer_won` | Sales/operations | Record outcome and verified value |

The currently added code covers `Lead` and `Schedule`. A future server-side CRM stage dispatcher can return qualified, opportunity, and customer-won events after those statuses are consistently maintained. Meta’s CRM integration guidance requires timely, defined sales-funnel feedback for that optimization path. [6]

## References

[1]: [Meta for Developers — Handling Duplicate Pixel and Conversions API Events](https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events)

[2]: [Meta for Developers — Using the Conversions API](https://developers.facebook.com/documentation/ads-commerce/conversions-api/using-the-api)

[3]: [Calendly Help — Advanced Calendly embed for developers](https://calendly.com/help/advanced-calendly-embed-for-developers)

[4]: [Calendly Help — Webhooks overview](https://calendly.com/help/webhooks-overview)

[5]: [Calendly Developer — Webhook signatures](https://developer.calendly.com/api-docs/4c305798a61d3-webhook-signatures)

[6]: [Meta for Developers — Conversions API for CRM integration](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration)
