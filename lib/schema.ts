import { FAQS, type Project } from "./projects";
import { SITE } from "./site";

const orgId = `${SITE.url}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  "@id": orgId,
  name: SITE.name,
  alternateName: ["Subhagruha Group", "Subhagruha Group of Companies", "Subhagruha Projects", "Subha Gruha", "సుభగృహ"],
  legalName: SITE.legalName,
  description: "Subhagruha Group develops HMDA, DTCP, VMRDA, APCRDA and RERA approved gated community and villa plots in Hyderabad, Visakhapatnam and Vijayawada since 2011.",
  url: SITE.url,
  logo: { "@type": "ImageObject", url: `${SITE.url}/icons/icon-512.png`, width: 512, height: 512 },
  image: `${SITE.url}/og.jpg`,
  slogan: SITE.tagline,
  foundingDate: SITE.founded,
  email: SITE.email,
  telephone: SITE.phones[0].dial,
  founder: { "@type": "Person", name: SITE.chairman.replace("Mr. ", "") },
  areaServed: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Telangana", "Andhra Pradesh"],
  sameAs: Object.values(SITE.social),
  contactPoint: SITE.phones.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.dial,
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Telugu", "Hindi"],
  })),
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.offices[0].street,
    addressLocality: SITE.offices[0].locality,
    addressRegion: SITE.offices[0].region,
    postalCode: SITE.offices[0].postal,
    addressCountry: "IN",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  alternateName: ["Subhagruha Group of Companies", "Subhagruha Group"],
  publisher: { "@id": orgId },
  inLanguage: "en-IN",
};

export const officesSchema = SITE.offices.map((o) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: `${SITE.name} – ${o.city} ${o.type}`,
  parentOrganization: { "@id": orgId },
  url: SITE.url,
  image: `${SITE.url}/og.jpg`,
  telephone: SITE.phones[0].dial,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: o.street,
    addressLocality: o.locality,
    addressRegion: o.region,
    postalCode: o.postal,
    addressCountry: "IN",
  },
  hasMap: o.map,
}));

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const projectSchema = (p: Project) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${SITE.url}/projects/${p.slug}#place`,
  name: p.name,
  description: p.summary,
  url: `${SITE.url}/projects/${p.slug}`,
  image: [p.image, ...p.gallery.map((g) => g.src)],
  address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: p.city === "Hyderabad" ? "Telangana" : "Andhra Pradesh", addressCountry: "IN" },
  ...(p.geo ? { geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng } } : {}),
  amenityFeature: p.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
  identifier: p.registrations.map((r) => ({ "@type": "PropertyValue", name: r.label, value: r.value })),
  containedInPlace: { "@type": "City", name: p.city },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
});
