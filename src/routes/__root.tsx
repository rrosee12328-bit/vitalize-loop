import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 display-2">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The systems company for growth-stage operators" },
      {
        name: "description",
        content:
          "Vektiss builds the connected operating infrastructure that runs your business — so you can lead it. Project intelligence, AI assistants, and integrated systems for operator-owners.",
      },
      { name: "author", content: "Vektiss" },
      { property: "og:title", content: "The systems company for growth-stage operators" },
      {
        property: "og:description",
        content:
          "Connected operating infrastructure for operator-owners. Systems, not deliverables.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The systems company for growth-stage operators" },
      { name: "description", content: "Growth Systems Hub provides integrated, AI-powered business infrastructure for growth-stage companies." },
      { property: "og:description", content: "Growth Systems Hub provides integrated, AI-powered business infrastructure for growth-stage companies." },
      { name: "twitter:description", content: "Growth Systems Hub provides integrated, AI-powered business infrastructure for growth-stage companies." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/209b6648-e492-410d-9674-1c821421f30f/id-preview-10fd757d--6dfb11c4-d2f1-41a0-88f5-bc55613be36e.lovable.app-1777176784955.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/209b6648-e492-410d-9674-1c821421f30f/id-preview-10fd757d--6dfb11c4-d2f1-41a0-88f5-bc55613be36e.lovable.app-1777176784955.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
