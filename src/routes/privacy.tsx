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
            Last Updated: May 18, 2026
          </p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <Section title="1. Introduction">
              <p className="text-muted-foreground">
                Vektiss ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (vektiss.com) or use our services, including Vektiss Voice and our other AI infrastructure products.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p className="text-muted-foreground">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Account Information:</span> Name, email address, phone number, and billing details when you sign up for our services.
                </li>
                <li>
                  <span className="font-medium text-foreground">Service Data:</span> Information processed through our AI assistants on your behalf, including call recordings, call transcripts, caller phone numbers, and lead information captured during interactions.
                </li>
                <li>
                  <span className="font-medium text-foreground">Usage Data:</span> Analytics and dashboard data related to your use of our platform.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Provide, operate, and maintain our services.</li>
                <li>Process and route phone calls, generate summaries, and send automated follow-ups.</li>
                <li>Improve our AI models and routing algorithms to provide better service.</li>
                <li>Send you technical notices, updates, security alerts, and support messages.</li>
                <li>Process payments and prevent fraudulent transactions.</li>
              </ul>
            </Section>

            <Section title="4. Sharing Your Information">
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share your information with third-party vendors and service providers that perform services for us or on our behalf, which may include:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Telecommunications providers (e.g., Twilio) for call routing and SMS/email delivery.
                </li>
                <li>
                  AI and language model providers (e.g., OpenAI, Retell) for processing voice and text data.
                </li>
                <li>
                  Payment processors (e.g., Stripe) for handling billing.
                </li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                These third parties are bound by confidentiality obligations and are restricted from using your data for any other purpose.
              </p>
            </Section>

            <Section title="5. Data Retention and Security">
              <p className="text-muted-foreground">
                We use administrative, technical, and physical security measures to help protect your personal information. Call recordings, transcripts, and lead data are retained as necessary to provide the service and fulfill our legal obligations. You may request the deletion of your account data at any time.
              </p>
            </Section>

            <Section title="6. Contact Us">
              <p className="text-muted-foreground">
                If you have questions or comments about this Privacy Policy, please contact us at:{" "}
                <a
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                  href="mailto:support@vektiss.com"
                >
                  support@vektiss.com
                </a>
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
