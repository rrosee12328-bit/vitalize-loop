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
          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: May 25, 2026
          </p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <Section title="1. Information We Collect">
              <p className="text-muted-foreground">
                We collect information you provide when contacting us by phone, web form, or email. This may include your name, phone number, email address, and the nature of your inquiry.
              </p>
            </Section>

            <Section title="2. How We Use Your Information">
              <p className="text-muted-foreground">
                We use your information to respond to your inquiry, deliver services, and send follow-up communications including appointment confirmations, intake forms, and reminders. We do not use your information for marketing purposes without your consent.
              </p>
            </Section>

            <Section title="3. SMS / Text Messaging">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By providing your phone number and consenting during a call or form submission, you agree to receive text messages from Vektiss AI related to your inquiry or appointment. These may include confirmations, reminders, and intake form links.
                </p>

                <div className="rounded-lg border border-border bg-muted/50 p-5">
                  <ul className="space-y-3 text-sm text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>Message frequency varies. <span className="font-semibold">Message and data rates may apply.</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>To opt out at any time, <span className="font-semibold">reply STOP</span> to any message. To get help, reply HELP.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span className="font-semibold">We do not share, sell, or rent your mobile phone number to any third party for marketing purposes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="4. Data Sharing">
              <p className="text-muted-foreground">
                We do not sell or share your personal information with third parties except as required to deliver our services (e.g., our telephony and messaging providers) or as required by law.
              </p>
            </Section>

            <Section title="5. Data Security">
              <p className="text-muted-foreground">
                We take reasonable steps to protect your information from unauthorized access or disclosure.
              </p>
            </Section>

            <Section title="6. Contact Us">
              <p className="text-muted-foreground">
                If you have questions about this policy, contact us at:
              </p>
              <ul className="mt-3 list-none space-y-1 text-muted-foreground">
                <li><span className="font-medium text-foreground">Vektiss AI</span></li>
                <li><span className="font-medium text-foreground">vektiss.com</span></li>
                <li>
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
