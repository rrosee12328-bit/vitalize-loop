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
          <h1 className="mt-6 display-2">Terms of Services</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: June 5, 2026
          </p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <Section title="1. SMS Program Description">
              <p className="text-muted-foreground">
                Vektiss LLC, offers SMS messaging programs that may include:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Account notifications</li>
                <li>Customer support communications</li>
                <li>Appointment reminders</li>
                <li>Promotional offers and updates (where consent is provided)</li>
              </ul>
            </Section>

            <Section title="2. Opt-In & Opt-Out">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By opting into our SMS program, you agree to receive text messages as described above.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li><span className="font-semibold text-foreground">Opt-Out:</span> Reply STOP at any time to unsubscribe.</li>
                  <li><span className="font-semibold text-foreground">Help:</span> Reply HELP or contact: info@vektiss.com</li>
                </ul>
              </div>
            </Section>

            <Section title="3. Message Frequency & Costs">
              <p className="text-muted-foreground">
                Message frequency may vary. Message and data rates may apply depending on your carrier plan.
              </p>
            </Section>

            <Section title="4. Carrier Disclaimer">
              <p className="text-muted-foreground">
                Wireless carriers are not liable for delayed or undelivered messages.
              </p>
            </Section>

            <Section title="5. Eligibility (18+)">
              <p className="text-muted-foreground">
                You must be at least 18 years old to participate in our SMS programs.
              </p>
            </Section>

            <Section title="6. Customer Support">
              <p className="text-muted-foreground">
                For SMS-related support, contact:
              </p>
              <p className="mt-2 text-muted-foreground">
                <span className="font-semibold text-foreground">Email:</span>{" "}
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href="mailto:info@vektiss.com"
                >
                  info@vektiss.com
                </a>
              </p>
            </Section>

            <Section title="7. Privacy Policy">
              <p className="text-muted-foreground">
                Your participation in our SMS program is subject to our{" "}
                <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  Privacy Policy
                </Link>
                . By opting in, you agree to the collection and use of information as described therein.
              </p>
            </Section>

            <Section title="8. Modifications">
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. Continued use of the services constitutes acceptance of updated Terms.
              </p>
            </Section>

            <Section title="9. Governing Law">
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the United States.
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
