import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">
                VEKTISS
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The systems company for growth-stage operators. We build the connected operating
              infrastructure that runs your business so you can lead it.
            </p>
            <Link
              to="/book"
              className="mt-6 inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Book a strategy call
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow">Site</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/" className="hover:text-foreground text-muted-foreground">Home</Link></li>
              <li><Link to="/how-we-work" className="hover:text-foreground text-muted-foreground">How we work</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground text-muted-foreground">Case studies</Link></li>
              <li><Link to="/about" className="hover:text-foreground text-muted-foreground">About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">Legal</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/privacy" className="hover:text-foreground text-muted-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground text-muted-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vektiss. All rights reserved.</p>
          <p className="font-mono tracking-wider">SYSTEMS · NOT DELIVERABLES</p>
        </div>
      </div>
    </footer>
  );
}
