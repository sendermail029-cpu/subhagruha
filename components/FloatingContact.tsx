import { SITE, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Two round buttons in the bottom-right corner (all screen sizes): WhatsApp and Call. */
export default function FloatingContact() {
  const wa = waLink("Hi Subhagruha, I'm interested in your plots. Please share details.");
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:bottom-6 md:right-5">
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="pulse-green grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,.45)] transition hover:scale-110 md:h-14 md:w-14">
        <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
      </a>
      <a href={`tel:${SITE.phones[0].dial}`} aria-label="Call us"
        className="grid h-12 w-12 place-items-center rounded-full bg-brand-red text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,.45)] transition hover:scale-110 md:h-14 md:w-14">
        <PhoneIcon className="h-5 w-5 md:h-6 md:w-6" />
      </a>
    </div>
  );
}
