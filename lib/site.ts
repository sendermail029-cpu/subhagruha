// ============================================================
//  SITE CONFIG — change phone numbers / domain here only.
// ============================================================
export const SITE = {
  name: "Subhagruha",
  legalName: "Subhagruha Projects (India) Pvt Ltd",
  url: "https://www.subhagruha.com",
  tagline: "Brings a Legacy of Success to a Historic Setting",
  teluguTagline: "అందమైన ఊహకు.. పొందికైన రూపం.",
  founded: "2011",
  // Banner photo for inner pages. Put a bright, wide photo (e.g. a villa render, 1920px+) in /public/images/
  // and set it here, e.g. "/images/hero-villa.jpg". Empty = use a project site photo.
  heroImage: "" as string,
  chairman: "Mr. Namburu Kalyan Chakravarthy",
  email: "moreinfosubhagruha@gmail.com",
  phones: [
    { display: "+91 95538 63456", dial: "+919553863456" },
    { display: "+91 99667 76366", dial: "+919966776366" },
  ],
  whatsapp: { display: "+91 99667 76366", number: "919966776366" },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61596427862344",
    instagram: "https://www.instagram.com/subhagruhagroups/",
    youtube: "https://www.youtube.com/@SubhagruhaGroupOfCompanies",
  },
  offices: [
    {
      city: "Hyderabad",
      type: "Corporate Office",
      street: "4th Floor, Lumbini Jewel Mall, Road No. 2, Venkateshwara Nagar, Aurora Colony, Banjara Hills",
      locality: "Hyderabad",
      region: "Telangana",
      postal: "500034",
      map: "https://www.google.com/maps/search/?api=1&query=Lumbini+Jewel+Mall+Road+No+2+Banjara+Hills+Hyderabad",
    },
    {
      city: "Vijayawada",
      type: "Branch Office",
      street: "54-15-1/2D, Sri Surya Premier, 4th Floor, 5211/1, Service Road, Beside Union Bank, Veterinary Colony",
      locality: "Vijayawada",
      region: "Andhra Pradesh",
      postal: "520008",
      map: "https://www.google.com/maps/search/?api=1&query=Sri+Surya+Premier+Veterinary+Colony+Vijayawada",
    },
    {
      city: "Visakhapatnam",
      type: "Branch Office",
      street: "H. No. 50-50-33/3, 1st Floor, J R Plaza, Gurudwara Junction, NH-5",
      locality: "Visakhapatnam",
      region: "Andhra Pradesh",
      postal: "530013",
      map: "https://www.google.com/maps/search/?api=1&query=J+R+Plaza+Gurudwara+Junction+Visakhapatnam",
    },
  ],
} as const;

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(text)}`;
