"use client";

import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Magnetic } from "@/components/ui/magnetic";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const items = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon, external: true },
  { label: "GitHub", href: site.socials.github, icon: GithubIcon, external: true },
  { label: "Email", href: site.socials.email, icon: Mail, external: false },
  { label: "Resume", href: site.resumePath, icon: FileText, external: true, download: true },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {items.map(({ label, href, icon: Icon, external, download }) => (
        <li key={label}>
          <Magnetic strength={0.35}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(download ? { download: "" } : {})}
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-strong transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
            >
              <Icon size={18} />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  );
}
