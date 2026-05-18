import { Link } from "@tanstack/react-router";
import { VektissLogo } from "./VektissLogo";

export function Footer() {
  return (
    <footer className="mt-32 bg-footer text-white/80">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label="Vektiss home">
              <VektissLogo variant="light" className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              The systems company for growth-stage operators. We build the connected operating
              infrastructure that runs your business so you can lead it.
            </p>
            <a href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-white/50">Solutions</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/solutions/project-intelligence" className="text-white/70 hover:text-white">
                  Vektiss Intelligence
                </Link>
              </li>
              <li>
                <Link to="/solutions/ai-assistants" className="text-white/70 hover:text-white">
                  Vektiss Voice
                </Link>
              </li>
              <li>
                <Link to="/solutions/websites-portals-apps" className="text-white/70 hover:text-white">
                  Vektiss Sites
                </Link>
              </li>
              <li>
                <Link to="/solutions/business-media" className="text-white/70 hover:text-white">
                  Vektiss Media
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-white/50">Company</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/how-we-work" className="text-white/70 hover:text-white">How we work</Link></li>
              <li><Link to="/case-studies" className="text-white/70 hover:text-white">Case studies</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-white/50">Legal</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/privacy" className="text-white/70 hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vektiss. All rights reserved.</p>
          <p className="font-mono tracking-wider">SYSTEMS · NOT DELIVERABLES</p>
        </div>
      </div>
    </footer>
  );
}
