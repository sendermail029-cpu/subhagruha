import { SITE, waLink } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";

export const SOCIAL = [
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon, hover: "hover:bg-[#1877F2]" },
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon, hover: "hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]" },
  { href: SITE.social.youtube, label: "YouTube", Icon: YoutubeIcon, hover: "hover:bg-[#FF0000]" },
  { href: waLink("Hi Subhagruha, I'm interested in your plots."), label: "WhatsApp", Icon: WhatsAppIcon, hover: "hover:bg-[#25d366]" },
];

/** Round social icons. `tone`: "dark" for dark backgrounds, "light" for light ones, "bar" for the slim top bar. */
export default function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light" | "bar"; className?: string }) {
  const base =
    tone === "bar" ? "h-7 w-7 text-white/85 hover:text-white"
    : tone === "light" ? "h-10 w-10 bg-white text-brand-ink ring-1 ring-brand-line hover:text-white hover:ring-transparent"
    : "h-10 w-10 bg-white/[.06] text-white/80 ring-1 ring-white/10 hover:text-white hover:ring-transparent";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL.map(({ href, label, Icon, hover }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          className={`grid place-items-center rounded-full transition duration-300 hover:-translate-y-0.5 ${base} ${hover}`}>
          <Icon className={tone === "bar" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </a>
      ))}
    </div>
  );
}
