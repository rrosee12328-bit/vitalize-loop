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
            Last Updated: May 18, 2026
          </p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <Section title="1. Agreement to Terms">
              <p className="text-muted-foreground">
                By accessing our website or using our services (including Vektiss Voice), you agree to be bound by these Terms of Service. If you do not agree with all of these terms, you are prohibited from using the site and services.
              </p>
            </Section>

            <Section title="2. Description of Service">
              <p className="text-muted-foreground">
                Vektiss provides AI-powered business infrastructure, including AI receptionists, call routing, analytics dashboards, and related software tools. The specific features available to you depend on your selected subscription plan.
              </p>
            </Section>

            <Section title="3. Fees and Payments">
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Setup Fees:</span> Any setup or onboarding fees charged by Vektiss are for professional services rendered to configure your system. Setup fees are strictly non-refundable once the build process has commenced.
                </li>
                <li>
                  <span className="font-medium text-foreground">Subscription Fees:</span> Monthly or annual subscription fees are billed in advance. You authorize us to charge your payment method on file for recurring fees.
                </li>
                <li>
                  <span className="font-medium text-foreground">30-Day Guarantee:</span> We offer a 30-day money-back guarantee on your first month's subscription fee. If you are not satisfied with the performance of the service within the first 30 days, we will refund that first month's subscription payment. This guarantee does not apply to the setup fee.
                </li>
              </ul>
            </Section>

            <Section title="4. Acceptable Use">
              <p className="text-muted-foreground">
                You agree not to use the services for any unlawful or prohibited purpose. You may not use Vektiss Voice to send spam, conduct robocalling campaigns, impersonate others, or process highly sensitive regulated data (such as HIPAA-protected health information) unless explicitly agreed upon in writing.
              </p>
            </Section>

            <Section title="5. AI Limitations and Liability">
              <p className="text-muted-foreground">
                You acknowledge that Vektiss services rely on artificial intelligence. While we strive for high accuracy, AI models may occasionally misinterpret caller intent, transcribe information incorrectly, or make errors. Vektiss is not liable for any lost revenue, lost deals, or damages resulting from missed calls, incorrect routing, or AI hallucinations. The service is provided "as is" without warranties of any kind.
              </p>
            </Section>

            <Section title="6. Intellectual Property">
              <p className="text-muted-foreground">
                The Vektiss platform, including its original code, designs, and AI configurations, is the property of Vektiss. You retain ownership of the customer data, knowledge base content, and lead information you provide to the system.
              </p>
            </Section>

            <Section title="7. Termination">
              <p className="text-muted-foreground">
                We may terminate or suspend your account and access to the services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the service will immediately cease.
              </p>
            </Section>

            <Section title="8. Contact Us">
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at:{" "}
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
