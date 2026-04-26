import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Vektiss" },
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
        <p className="eyebrow">Legal</p>
        <h1 className="mt-6 display-2">Terms of service</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>

        <div className="mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-foreground">
          <Section title="Acceptance of terms">
            <p className="text-muted-foreground">
              By accessing or using the Vektiss website you agree to these terms. This is template
              content — please have it reviewed by your legal counsel before publishing.
            </p>
          </Section>

          <Section title="Use of the site">
            <p className="text-muted-foreground">
              You agree to use the site lawfully, not to attempt to disrupt its operation, and not
              to misuse the booking and contact mechanisms.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p className="text-muted-foreground">
              All content, branding, and materials on this site are owned by Vektiss unless
              otherwise noted. You may not reproduce them without permission.
            </p>
          </Section>

          <Section title="Disclaimer">
            <p className="text-muted-foreground">
              Information on this site is provided "as is" without warranties of any kind. Strategy
              calls are exploratory and do not constitute a contractual engagement.
            </p>
          </Section>

          <Section title="Contact">
            <p className="text-muted-foreground">
              Questions? Email{" "}
              <a className="font-medium text-foreground underline-offset-4 hover:underline" href="mailto:info@vektiss.com">
                info@vektiss.com
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
