import { site } from "@/content/site";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border section-padding py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a
            href="#top"
            className="font-mono text-sm font-medium text-foreground"
          >
            {site.name}
            <span className="text-accent">.</span>
          </a>
          <p className="text-xs text-muted">
            © {year} · Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-strong transition-colors hover:text-accent"
            >
              Next.js
            </a>{" "}
            +{" "}
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-strong transition-colors hover:text-accent"
            >
              claude.ai/code
            </a>
          </p>
        </div>

        <SocialLinks />
      </div>
    </footer>
  );
}
