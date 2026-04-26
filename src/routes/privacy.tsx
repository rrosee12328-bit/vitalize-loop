import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Vektiss" },
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
        <p className="eyebrow">Legal</p>
        <h1 className="mt-6 display-2">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>

        <div className="prose prose-neutral mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-foreground">
          <Section title="Overview">
            <p className="text-muted-foreground">
              Vektiss ("we", "us") respects your privacy. This policy describes what information we
              collect when you visit our website or book a strategy call, how we use it, and your
              rights. This is template content — please replace it with policy reviewed by your
              legal counsel before going to production.
            </p>
          </Section>

          <Section title="Information we collect">
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Information you provide when booking a call (name, email, company, role).</li>
              <li>Basic technical information (browser, device, referrer, pages viewed).</li>
              <li>Communications you send to us.</li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>To schedule and conduct strategy calls.</li>
              <li>To follow up on inquiries and respond to your messages.</li>
              <li>To improve our website and services.</li>
            </ul>
          </Section>

          <Section title="Your rights">
            <p className="text-muted-foreground">
              Depending on your jurisdiction (GDPR, CCPA, etc.) you may have rights to access,
              correct, delete, or port your personal data. To exercise these rights, contact us at
              the email below.
            </p>
          </Section>

          <Section title="Contact">
            <p className="text-muted-foreground">
              Questions about this policy? Email{" "}
              <a className="font-medium text-foreground underline-offset-4 hover:underline" href="mailto:hello@vektiss.com">
                hello@vektiss.com
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
