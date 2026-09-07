import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vektiss" },
      {
        name: "description",
        content: "How Vektiss collects, uses, and protects your information.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[800px]">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 display-2">Privacy Policy</h1>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <p className="text-muted-foreground">
              Vektiss LLC, ("Company", "we", "us", or "our") respects your privacy and is committed to protecting it through this Privacy Policy. This policy explains how we collect, use, disclose, and safeguard your information when you visit:{" "}
              <a
                href="https://vektiss.com/"
                className="text-foreground underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vektiss.com/
              </a>{" "}
              or engage with our services, including SMS communications.
            </p>

            <Section title="1. Information We Collect">
              <p className="text-muted-foreground">
                We may collect the following information:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
                <li>
                  <span className="font-semibold text-foreground">Personal Information:</span>{" "}
                  Name, email address, phone number, mailing address.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Mobile Information:</span>{" "}
                  Phone number provided for SMS communications.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Usage Data:</span>{" "}
                  IP address, browser type, pages visited, time spent on pages.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Cookies &amp; Tracking Data:</span>{" "}
                  See Section 6 below.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Messenger Information:</span>{" "}
                  Page-scoped user identifiers, profile information made available by Meta,
                  message content, message identifiers, and timestamps when you contact a connected
                  Facebook Business Page.
                </li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p className="text-muted-foreground">
                We use your information to:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
                <li>Provide and manage our services</li>
                <li>Communicate with you regarding your account or inquiries</li>
                <li>Send SMS messages you have opted into</li>
                <li>Improve our website and services</li>
                <li>
                  Maintain Messenger conversation context, respond to inquiries, qualify prospects,
                  and identify when human follow-up is appropriate
                </li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="3. SMS Communications & Consent">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By providing your mobile phone number and opting in, you expressly consent to receive automated and non-automated SMS messages from Vektiss LLC, including but not limited to:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Customer support messages</li>
                  <li>Service updates and notifications</li>
                  <li>Appointment reminders</li>
                  <li>Promotional and marketing messages</li>
                </ul>

                <div className="rounded-lg border border-border bg-muted/50 p-5">
                  <ul className="space-y-3 text-sm text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold">Message Frequency:</span> May vary.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold">Message &amp; Data Rates:</span> Standard message and data rates may apply.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold">Opt-Out:</span> You may opt out at any time by replying STOP to any message. Reply HELP for assistance.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold">Consent Not Required for Purchase:</span> Your consent to receive SMS messages is not a condition of purchasing any goods or services.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="4. Sharing of Information">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell, rent, or share your personal information with third-party companies for their marketing purposes.
                </p>
                <p>
                  No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                </p>
              </div>
            </Section>

            <Section title="5. Data Security">
              <p className="text-muted-foreground">
                We implement reasonable administrative, technical, and physical safeguards designed to protect your information. However, no method of transmission over the internet is 100% secure.
              </p>
            </Section>

            <Section title="6. Cookies & Tracking Technologies">
              <div className="space-y-4 text-muted-foreground">
                <p>We use cookies and similar tracking technologies to:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Analyze website traffic and usage</li>
                  <li>Improve user experience</li>
                  <li>Understand user behavior</li>
                </ul>
                <p>
                  You may control cookie settings through your browser preferences. Disabling cookies may affect website functionality.
                </p>
              </div>
            </Section>

            <Section title="7. Your Rights & Choices">
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Access, correct, or delete your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw SMS consent at any time by replying STOP</li>
                </ul>
                <p>To exercise these rights, contact us using the information below.</p>
              </div>
            </Section>

            <Section title="8. Children's Privacy">
              <p className="text-muted-foreground">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect information from minors.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our SMS practices, contact us at:
              </p>
              <ul className="mt-3 list-none space-y-1 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  <a
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                    href="mailto:info@vektiss.com"
                  >
                    info@vektiss.com
                  </a>
                </li>
              </ul>
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
