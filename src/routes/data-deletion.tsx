import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/data-deletion")({
  head: () => ({
    meta: [
      { title: "Data Deletion Instructions — Vektiss" },
      {
        name: "description",
        content:
          "How to request deletion of information associated with Vektiss services.",
      },
    ],
  }),
  component: DataDeletionPage,
});

function DataDeletionPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[800px]">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 display-2">Data Deletion Instructions</h1>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
            <p className="text-muted-foreground">
              You may ask Vektiss LLC to delete personal information associated
              with a website form submission, a Messenger conversation, or a
              connected Facebook Business Page.
            </p>

            <Section title="How to request deletion">
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-muted-foreground">
                <li>
                  Email{" "}
                  <a
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                    href="mailto:info@vektiss.com?subject=Data%20Deletion%20Request"
                  >
                    info@vektiss.com
                  </a>{" "}
                  with the subject “Data Deletion Request.”
                </li>
                <li>
                  Include the name and email address associated with your
                  request.
                </li>
                <li>
                  For Messenger data, include the Facebook Business Page you
                  contacted and the approximate date of the conversation.
                </li>
                <li>
                  Tell us whether you want a specific conversation or all
                  information associated with you deleted.
                </li>
              </ol>
            </Section>

            <Section title="What happens next">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We will acknowledge your request, verify that you are
                  authorized to make it, and delete or de-identify eligible
                  information from active Vektiss systems. We will confirm
                  completion using the contact information supplied with the
                  request.
                </p>
                <p>
                  We may retain information when reasonably necessary for
                  security, fraud prevention, legal compliance, dispute
                  resolution, or other lawful purposes. Residual copies may
                  remain temporarily in protected backups until those backups
                  are overwritten through their normal retention cycle.
                </p>
              </div>
            </Section>

            <Section title="Disconnecting a Facebook Page">
              <p className="text-muted-foreground">
                A Page administrator may also ask Vektiss to disconnect a
                Facebook Business Page and revoke the related integration.
                Disconnecting stops new Page data from reaching Vektiss, but it
                does not replace a deletion request for previously stored
                records.
              </p>
            </Section>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">
              Read the Privacy Policy
            </Link>
            <Link to="/" className="hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
