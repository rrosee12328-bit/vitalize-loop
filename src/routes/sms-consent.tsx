import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/sms-consent")({
  head: () => ({
    meta: [
      { title: "SMS Consent & Opt-In Policy — Vektiss" },
      {
        name: "description",
        content:
          "Vektiss LLC SMS messaging consent and opt-in policy. How we collect consent, types of messages, frequency, and how to opt out.",
      },
      { property: "og:title", content: "SMS Consent & Opt-In Policy — Vektiss" },
      {
        property: "og:description",
        content:
          "Vektiss LLC SMS messaging consent and opt-in policy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SMS Consent & Opt-In Policy — Vektiss" },
      {
        name: "twitter:description",
        content:
          "Vektiss LLC SMS messaging consent and opt-in policy.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://vektiss.com/sms-consent" },
    ],
  }),
  component: SmsConsentPage,
});

function SmsConsentPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[800px]">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 display-2">
            Vektiss LLC — SMS Messaging Consent & Opt-In Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Effective Date: June 2026
          </p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <Section title="How We Collect Consent">
              <p className="text-muted-foreground">
                Vektiss LLC collects SMS consent through the contact form located at{" "}
                <Link
                  to="/contact"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  vektiss.com/contact
                </Link>
                . The form includes two separate, unchecked opt-in checkboxes that users must actively select:
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-border bg-muted/50 p-5">
                  <p className="text-sm font-semibold text-foreground">Transactional SMS Consent</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "I agree to receive non-marketing SMS messages from Vektiss LLC, regarding appointment confirmations, project updates, service notifications, support messages, invoices, account information, and customer support communications. Message frequency may vary. Reply HELP for assistance or STOP to unsubscribe. Standard message and data rates may apply."
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-5">
                  <p className="text-sm font-semibold text-foreground">Marketing SMS Consent</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "I agree to receive marketing SMS messages from Vektiss LLC, regarding promotional offers, discounts, and related marketing communications. Message frequency may vary. Reply HELP for assistance or STOP to unsubscribe. Standard message and data rates may apply."
                  </p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                Neither checkbox is pre-selected. Users must actively check each box to opt in. Consent to SMS messaging is not required to use our services.
              </p>
            </Section>

            <Section title="Types of Messages We Send">
              <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
                <li>Appointment confirmations and reminders</li>
                <li>Project status updates</li>
                <li>Service notifications and support communications</li>
                <li>Invoices and account information</li>
                <li>Promotional offers and discounts (marketing opt-in only)</li>
                <li>Booking links and intake forms related to your inquiry</li>
              </ul>
            </Section>

            <Section title="Message Frequency">
              <p className="text-muted-foreground">
                Message frequency varies based on your interactions with Vektiss. You may receive up to 4 messages per month for transactional communications.
              </p>
            </Section>

            <Section title="How to Opt Out">
              <p className="text-muted-foreground">
                Reply STOP to any SMS message to unsubscribe immediately. You will receive one confirmation message and no further messages will be sent. Reply HELP for assistance or contact us at{" "}
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href="mailto:info@vektiss.com"
                >
                  info@vektiss.com
                </a>
                .
              </p>
            </Section>

            <Section title="Contact Information">
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold text-foreground">Vektiss LLC</p>
                <p>525 North Sam Houston Pkwy East, Suite 415</p>
                <p>Houston, TX 77060</p>
                <p>
                  Phone:{" "}
                  <a
                    className="underline underline-offset-4 hover:text-foreground"
                    href="tel:+13465947686"
                  >
                    (346) 594-7686
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    className="underline underline-offset-4 hover:text-foreground"
                    href="mailto:info@vektiss.com"
                  >
                    info@vektiss.com
                  </a>
                </p>
              </div>
              <p className="mt-4 text-muted-foreground">
                For our full Privacy Policy visit{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  vektiss.com/privacy
                </Link>
                . For our Terms of Service visit{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  vektiss.com/terms
                </Link>
                .
              </p>
            </Section>
          </div>

          <div className="mt-16">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
