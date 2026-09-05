import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

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
      { title: "Vektiss - The systems company for growth-stage operators" },
      {
        name: "description",
        content:
          "Vektiss builds the connected operating infrastructure that runs your business — so you can lead it. Project intelligence, AI assistants, and integrated systems for operator-owners.",
      },
      { name: "author", content: "Vektiss" },
      { property: "og:title", content: "Vektiss - The systems company for growth-stage operators" },
      {
        property: "og:description",
        content:
          "Connected operating infrastructure for operator-owners. Systems, not deliverables.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Vektiss - The systems company for growth-stage operators",
      },
      {
        name: "description",
        content:
          "AI - Powered business systems for growth-stage operators. Project management, AI assistants, client portals, and business media — built and deployed by Vektiss.",
      },
      {
        property: "og:description",
        content:
          "AI - Powered business systems for growth-stage operators. Project management, AI assistants, client portals, and business media — built and deployed by Vektiss.",
      },
      {
        name: "twitter:description",
        content:
          "AI - Powered business systems for growth-stage operators. Project management, AI assistants, client portals, and business media — built and deployed by Vektiss.",
      },
      { property: "og:image", content: "https://vektiss.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:image", content: "https://vektiss.com/og-image.png" },
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
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
  const metaPixelSnippet = metaPixelId
    ? `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`
    : undefined;

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {metaPixelSnippet ? (
          <script dangerouslySetInnerHTML={{ __html: metaPixelSnippet }} />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
