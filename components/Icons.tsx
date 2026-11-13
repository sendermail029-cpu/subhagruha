type P = { className?: string };
const base = "h-5 w-5 shrink-0";

export const PhoneIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
export const MailIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
  </svg>
);
export const PinIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
  </svg>
);
export const ArrowIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
export const ShieldIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
);
export const BuildingIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
  </svg>
);
export const UsersIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </svg>
);
export const PlayIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
);
export const WhatsAppIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 12 2.2a9.8 9.8 0 0 1 0 19.6zM12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 1 0 12 0z" />
  </svg>
);
export const FacebookIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" /></svg>
);
export const InstagramIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /></svg>
);
export const YoutubeIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z" /></svg>
);
export const XIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4zm-1.2 17.9h1.9L7.1 4.2H5.1z" /></svg>
);
export const LinkedinIcon = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>
);
