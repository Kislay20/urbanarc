import { footerLinks } from "@/config/navigation";
import { brandConfig } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-heading text-sm font-semibold">
              {brandConfig.name}
            </div>
            <p className="mt-2 text-[0.7rem]">{brandConfig.tagline}</p>
          </div>

          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Info" links={footerLinks.info} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-6 flex items-center justify-between text-[0.65rem]">
          <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
          <div className="flex gap-3">
            <a href={brandConfig.socials.instagram} className="hover:text-white">
              IG
            </a>
            <a href={brandConfig.socials.twitter} className="hover:text-white">
              X
            </a>
            <a href={brandConfig.socials.youtube} className="hover:text-white">
              YT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-2 text-[0.75rem] font-semibold uppercase tracking-wide text-white">
        {title}
      </h4>
      <ul className="space-y-1">
        {links.map((link, idx) => (
          // use unique key: label+href+index ensures uniqueness even for '#'
          <li key={`${link.label}-${link.href}-${idx}`}>
            <a href={link.href} className="hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
