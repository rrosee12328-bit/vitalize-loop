import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Vektiss" },
      {
        name: "description",
        content: "Terms governing your use of the Vektiss website and services.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[800px]">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 display-2">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: May 25, 2026
          </p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <Section title="1. Acceptance of Terms">
              <p className="text-muted-foreground">
                By using Vektiss AI services, including Vektiss Voice, you agree to these Terms of Service. If you do not agree, do not use our services.
              </p>
            </Section>

            <Section title="2. Services">
              <p className="text-muted-foreground">
                Vektiss AI provides AI-powered voice assistant and communication services for businesses. Services are provided on a subscription basis and are subject to the terms outlined in your service agreement.
              </p>
            </Section>

            <Section title="3. SMS Messaging Terms">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By providing your phone number and consenting to receive text messages from Vektiss AI or any business powered by Vektiss AI, you agree to the following:
                </p>

                <ul className="list-disc space-y-2 pl-5">
                  <li>You may receive text messages including appointment confirmations, intake forms, reminders, and follow-up notifications.</li>
                  <li>Message frequency varies depending on your interactions.</li>
                </ul>

                <div className="rounded-lg border border-border bg-muted/50 p-5">
                  <ul className="space-y-3 text-sm text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span><span className="font-semibold">Message and data rates may apply</span> based on your mobile carrier plan.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>To opt out at any time, <span className="font-semibold">reply STOP</span> to any message.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span>To request help, <span className="font-semibold">reply HELP</span> to any message.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 shrink-1 rounded-full bg-primary" />
                      <span className="font-semibold">Mobile phone numbers are never shared, sold, or rented to third parties for marketing purposes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="4. User Responsibilities">
              <p className="text-muted-foreground">
                You agree to provide accurate information when interacting with our services. You agree not to use our services for unlawful purposes.
              </p>
            </Section>

            <Section title="5. Limitation of Liability">
              <p className="text-muted-foreground">
                Vektiss AI is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for services in the prior 30 days.
              </p>
            </Section>

            <Section title="6. Changes to Terms">
              <p className="text-muted-foreground">
                We may update these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.
              </p>
            </Section>

            <Section title="7. Contact">
              <p className="text-muted-foreground">
                Questions about these terms? Contact us at:
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
