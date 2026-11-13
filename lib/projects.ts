// RERA & layout approval numbers copied exactly from subhagruha.com project pages.
const U = "https://subhagruha.com/uploads/";

export type City = "Hyderabad" | "Vijayawada" | "Visakhapatnam";

export type Project = {
  slug: string;
  name: string;
  city: City;
  area: string;
  location: string;
  status: "Ongoing" | "Completed";
  image: string;
  registrations: { label: string; value: string }[];
  tags: string[];
  summary: string;
  amenities: string[];
  highlights: string[];
  gallery: { caption: string; src: string }[];
  geo?: { lat: number; lng: number };
  mapUrl?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "tree-shades-by-subhagruha",
    name: "Tree Shades by Subhagruha",
    city: "Hyderabad",
    area: "Shadnagar",
    location: "Burgula, Shadnagar, Hyderabad",
    status: "Ongoing",
    image: U + "477e96d2d4638bb252ef88db2a218d38.png",
    registrations: [
      { label: "TS RERA No.", value: "P02400009009" },
      { label: "T.L.P No.", value: "134/2024/H" },
    ],
    tags: ["27 Acres", "Plots from 165 Sq.Yds", "Gated Community"],
    summary:
      "A 27-acre gated community of open plots at Burgula, Shadnagar, with plots starting from 165 sq. yds, close to the Bengaluru Highway, the proposed Regional Ring Road and Rajiv Gandhi International Airport.",
    amenities: ["33 ft & 40 ft BT Roads", "Underground Electricity", "100% Vastu", "24/7 Security", "Overhead Tank · 24 hr Water", "Underground Drainage", "Avenue Plantation", "Landscaped Green Spaces", "Grand Entrance Arch", "Solar Wire Fencing"],
    highlights: ["Connectivity to Bengaluru Highway", "Close to proposed Regional Ring Road (RRR)", "Easy access to Outer Ring Road", "Near Shamshabad & Rajiv Gandhi International Airport", "Surrounded by growing developments"],
    gallery: [
      { caption: "Layout Plan", src: U + "b8e5831a8c69be7ade006e90f3dcdd23.jpeg" },
      { caption: "Location Map", src: U + "6ee71469f1637ef826a5ebe2beee8645.jpeg" },
      { caption: "Site Photo", src: U + "cada58be407628d815c11248c75070a6.jpeg" },
      { caption: "Site Photo", src: U + "e3f46954bcdd80b7aebf2657154821ac.jpeg" },
      { caption: "Site Photo", src: U + "5a2ad072e6f7ef9adc240e58b03d1120.jpeg" },
      { caption: "Site Photo", src: U + "7f939fc26189b3bb0c9192f505f7d392.png" },
    ],
    seoTitle: "Tree Shades by Subhagruha | Open Plots in Shadnagar, Hyderabad – RERA P02400009009",
    seoDescription:
      "Buy RERA-approved open plots at Tree Shades by Subhagruha, Burgula, Shadnagar. 27-acre gated community, plots from 165 sq. yds near Bengaluru Highway, RRR & airport. Book a free site visit.",
    keywords: ["open plots in Shadnagar", "plots near Shadnagar", "gated community plots Hyderabad", "Tree Shades Subhagruha", "plots near Bengaluru highway"],
  },
  {
    slug: "sukrithi-pride",
    name: "Sukrithi Pride",
    city: "Hyderabad",
    area: "Sadashivpet",
    location: "Veltur, Sadashivpet, Hyderabad",
    status: "Ongoing",
    image: U + "6dac517bd04c9734ec42b0d0a51169e0.webp",
    registrations: [
      { label: "Phase 1 TS RERA", value: "P01100006382" },
      { label: "Phase 1 LP No.", value: "110/2023/H" },
      { label: "Phase 2 TS RERA", value: "P01100007090" },
      { label: "Phase 2 T.L.P No.", value: "178/2023/H" },
    ],
    tags: ["70 Acres", "Plots from 167 Sq.Yds", "Phase 1 & 2"],
    summary:
      "A sprawling 70-acre plotted development at Veltur, Sadashivpet, near the proposed Regional Ring Road, with quick access to MRF, PepsiCo, IIT Hyderabad and the ORR.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Compound Wall", "Children's Play Area"],
    highlights: ["Near proposed Regional Ring Road (RRR)", "8 min to MRF · 10 min to PepsiCo", "20 min to Woxsen Business School", "25 min to IIT Hyderabad & GITAM University", "30 min to ORR", "Connects to Patancheru, Chandanagar, BHEL, Lingampally, Gachibowli, Hi-Tech City & Financial District"],
    gallery: [
      { caption: "Layout Plan", src: U + "2a463885f61efa3712318e6ff0573787.jpeg" },
      { caption: "Location Map", src: U + "474a7dcffa6b5715bf043f6654ddffe6.jpeg" },
      { caption: "Site Photo", src: U + "754d676e8b9ee943c64108c70dcd258c.jpg" },
      { caption: "Site Photo", src: U + "d4adb5f4cb88fbbcb48a05b8c3cfaefe.jpg" },
      { caption: "Site Photo", src: U + "5f36397da8d7c2c7344c636b1d5c37f2.JPG" },
    ],
    seoTitle: "Sukrithi Pride | Open Plots in Sadashivpet, Hyderabad – TS RERA Approved",
    seoDescription:
      "Sukrithi Pride by Subhagruha – 70-acre RERA-approved gated plots at Veltur, Sadashivpet near RRR, IIT Hyderabad & ORR. Plots from 167 sq. yds. Book your site visit today.",
    keywords: ["plots in Sadashivpet", "open plots near IIT Hyderabad", "plots near RRR Hyderabad", "Sukrithi Pride", "DTCP plots Sadashivpet"],
  },
  {
    slug: "subhagruha-sukrithi-ayatana",
    name: "Subhagruha Sukrithi Ayatana",
    city: "Hyderabad",
    area: "Nandikandi",
    location: "Mumbai Highway, Nandikandi, Sangareddy, Hyderabad",
    status: "Ongoing",
    image: U + "0159504438eb5438f13cc62142fdddb0.webp",
    registrations: [
      { label: "TS RERA No.", value: "P01100004762" },
      { label: "T.L.P No.", value: "96/2022/H" },
    ],
    tags: ["20 Acres", "165–367 Sq.Yds", "DTCP Approved"],
    summary:
      "A 20-acre DTCP-approved, highway-facing gated community of open plots on NH-65 (Mumbai Highway) at Nandikandi, Sangareddy, about 1 km from the proposed Regional Ring Road. Plots range from 165 to 367 sq. yds.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Compound Wall", "Children's Play Area", "Rain Water Harvesting Pits", "Roads with Kerbs", "Underground Drainage", "Water Supply"],
    highlights: ["Highway-facing venture on NH-65 (Hyderabad–Mumbai Highway)", "About 1 km from the proposed Regional Ring Road (RRR)", "DTCP approved layout", "Pollution-free green surroundings"],
    gallery: [
      { caption: "Layout Plan", src: U + "777020ac1340cbb3591f0dd675a70538.jpg" },
      { caption: "Location Map", src: U + "f9000ad3825aa0c7d4e0df1bebac1732.jpg" },
      { caption: "Site Photo", src: U + "82ef18fa3c42a506e98cb238bd026853.jpeg" },
      { caption: "Site Photo", src: U + "81c6d9b2ec0e969f48c0aff2ace1a4da.jpg" },
      { caption: "Site Photo", src: U + "f6647d33d7afdd7a9f361ddaf265f67c.webp" },
      { caption: "Site Photo", src: U + "5f69a53cf1e342a11a6e5329cc0f1977.jpeg" },
      { caption: "Site Photo", src: U + "9d6008ff2131e28da970f89539ef2c16.jpeg" },
      { caption: "Site Photo", src: U + "52664eb333b64aecb1cce023ec99f9ae.jpeg" },
    ],
    geo: { lat: 17.610026, lng: 77.9996037 },
    mapUrl: "https://www.google.com/maps/place/17%C2%B036'36.1%22N+77%C2%B059'58.6%22E/@17.6100311,77.9974153,747m",
    seoTitle: "Sukrithi Ayatana | DTCP Plots in Nandikandi, Sangareddy – TS RERA P01100004762",
    seoDescription:
      "Subhagruha Sukrithi Ayatana – 20-acre DTCP & TS RERA approved highway-facing plots at Nandikandi on NH-65, 1 km from RRR. Plots 165–367 sq. yds. Book a site visit.",
    keywords: ["plots in Nandikandi", "plots in Sangareddy", "DTCP plots on Mumbai highway", "Sukrithi Ayatana", "plots near RRR"],
  },
  {
    slug: "samyuktha-phase-2",
    name: "Sukrithi Samyuktha Phase 2",
    city: "Hyderabad",
    area: "Nandikandi",
    location: "Nandikandi, Sangareddy, Hyderabad",
    status: "Ongoing",
    image: U + "e9b94b391d163d2f88b9a6883da35977.png",
    registrations: [
      { label: "TS RERA No.", value: "P01100003793" },
      { label: "T.L.P No.", value: "313/2021/H" },
    ],
    tags: ["DTCP Approved", "1320–2880 Sq.Ft", "Gated Community"],
    summary:
      "An exclusive DTCP-approved, RERA-registered gated community of open plots at Nandikandi, Sangareddy, with well-laid roads, underground drainage, street lights and green parks.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "24/7 Security", "Children's Play Area", "Avenue Plantation", "Drainage", "Electricity", "Water Supply"],
    highlights: ["10 min to MRF · 10 min to PepsiCo", "15 min to IIT Hyderabad", "20 min to GITAM University", "30 min to ORR", "Easy connectivity to Patancheru, Chandanagar, BHEL, Lingampally, Gachibowli, Hi-Tech City & Financial District"],
    gallery: [
      { caption: "Layout Plan", src: U + "fa883474096d1562d02442d832667397.jpg" },
      { caption: "Location Map", src: U + "0ec950b2595ba794f63d5e6e2a45e2a4.jpg" },
      { caption: "Site Photo", src: U + "b7d19fa7f7f8c157f1f394e99532fa8a.JPG" },
      { caption: "Site Photo", src: U + "eed8725aeb3c822c8217739e7abaa633.JPG" },
      { caption: "Site Photo", src: U + "1249f23ffe041eb5320b9de5a8095855.JPG" },
      { caption: "Site Photo", src: U + "99f6fa0d1ab3c7f4233ec573605c3b6e.JPG" },
      { caption: "Site Photo", src: U + "624aa209c9f631a125e4edda0f456153.JPG" },
      { caption: "Site Photo", src: U + "3ec568738fb219e0b823ba644af7fe4b.jpg" },
    ],
    geo: { lat: 17.6095072, lng: 77.9840467 },
    mapUrl: "https://www.google.com/maps/place/17%C2%B036'34.2%22N+77%C2%B059'02.6%22E/@17.6095121,77.9818583,888m",
    seoTitle: "Sukrithi Samyuktha Phase 2 | DTCP Plots in Nandikandi, Sangareddy – TS RERA P01100003793",
    seoDescription:
      "Sukrithi Samyuktha Phase 2 by Subhagruha – DTCP & TS RERA approved gated plots at Nandikandi, Sangareddy near IIT Hyderabad, MRF & ORR. Book a free site visit.",
    keywords: ["plots in Nandikandi", "plots in Sangareddy", "Sukrithi Samyuktha", "open plots near IIT Hyderabad"],
  },
  {
    slug: "sukrithi-aarunya",
    name: "Sukrithi Aarunya",
    city: "Hyderabad",
    area: "Lemoor",
    location: "Lemoor, near Maheshwaram, Hyderabad",
    status: "Ongoing",
    image: U + "ca051994effdb9166ccf2e23415e00b2.jpg",
    registrations: [
      { label: "Approval", value: "HMDA Approved" },
      { label: "T.L.P No.", value: "13/LO/PLG/HMDA/2008" },
    ],
    tags: ["HMDA Approved", "Club House", "Swimming Pool"],
    summary:
      "HMDA final-approved premium plots at Lemoor near Maheshwaram, with a clubhouse and swimming pool, close to Rajiv Gandhi International Airport, Pharma City, Fab City and the ORR.",
    amenities: ["100% Vastu", "Wide CC Roads", "Club House", "Swimming Pool", "Electricity", "Drainage", "24/7 Security", "Children's Play Area"],
    highlights: ["Near Rajiv Gandhi International Airport", "Near Outer Ring Road", "Close to TCS Adibatla, Cognizant, Aerospace SEZ & Fab City", "PV Express Highway (Mehdipatnam–Shamshabad)", "Near proposed Mucherla Pharma City & Pharma University", "Aga Khan International School & Sri Sri Academy nearby", "Apparel Park & IT SEZs"],
    gallery: [
      { caption: "Layout Plan", src: U + "e3bb75f56c9f447d15f182c232ba1dd6.jpeg" },
      { caption: "Location Map", src: U + "be1529f34ed2203357e8bc35838bf5af.jpeg" },
      { caption: "Site Photo", src: U + "76f826320e3764b4ab1c7967b1021ee6.jpeg" },
      { caption: "Site Photo", src: U + "45872ddc1ea64783f76dbb68ff66c890.jpeg" },
      { caption: "Site Photo", src: U + "178cdc2233f8c4cee5cf864e7600b69f.jpg" },
      { caption: "Site Photo", src: U + "170d702fcc2541f90dff98c2cb626d70.jpg" },
      { caption: "Site Photo", src: U + "b791de86508d7323bb4dae9d4fc6bd61.webp" },
    ],
    mapUrl: "https://www.google.com/maps/place/Subhagruha+Sukrithi+Aarunya/@17.1360716,78.5046776,15z",
    seoTitle: "Sukrithi Aarunya | HMDA Approved Plots in Lemoor, Maheshwaram, Hyderabad",
    seoDescription:
      "Sukrithi Aarunya by Subhagruha – HMDA final-approved plots (TLP 13/LO/PLG/HMDA/2008) at Lemoor near Maheshwaram, airport, Pharma City & ORR. Clubhouse & pool.",
    keywords: ["plots in Lemoor", "HMDA plots Maheshwaram", "plots near Shamshabad airport", "Sukrithi Aarunya", "HMDA approved plots Hyderabad"],
  },
  {
    slug: "subhagruha-sukrithi-signature-vijayawada",
    name: "Subhagruha Sukrithi Signature",
    city: "Vijayawada",
    area: "Nunna",
    location: "Nunna, Vijayawada, Krishna Dt., AP",
    status: "Ongoing",
    image: U + "f6476e7f58fd4c4b11f32a39870a0e69.png",
    registrations: [
      { label: "AP RERA No.", value: "P06160135717" },
      { label: "LP / T.L.P No.", value: "23/2025/1168/VJA/DPMS" },
    ],
    tags: ["CRDA Approved", "Nunna Bypass", "Gated Community"],
    summary:
      "CRDA-approved gated-community plots at Nunna, Vijayawada, with quick access via the Nunna Bypass, Vijayawada–Nuzvid Road and Eluru Road, minutes from Gunadala and Benz Circle.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Compound Wall", "Children's Play Area", "Grand Entrance Arch", "Overhead Water Tank", "Underground Drainage", "Footpaths with Walking Tiles"],
    highlights: ["Quick access via Nunna Bypass, Vijayawada–Nuzvid Road & Eluru Road", "5 min to Gunadala · 10 min to Ramavarappadu", "15 min to Benz Circle", "16 min to Railway Station · 18 min to Bus Stand", "Near Ayush, Rainbow, New Govt., St. Ann's & Sentini hospitals", "Near DPS, St. John's, Ambitus, Narayana & Sri Chaitanya schools", "Near Vikas Engg. College, Siddhartha Medical College & NTR Health University"],
    gallery: [
      { caption: "Layout Plan", src: U + "6cda95f4372d4e33cdd64cafb9b18588.jpg" },
      { caption: "Location Map", src: U + "e8c19f08471a3410eea90d2704cbc14c.jpg" },
      { caption: "Brand Campaign", src: U + "cd1ec4bc962efbeda3d8097c94ccab8f.jpg" },
    ],
    seoTitle: "Sukrithi Signature | CRDA Approved Plots in Nunna, Vijayawada – AP RERA P06160135717",
    seoDescription:
      "Subhagruha Sukrithi Signature – AP RERA & CRDA approved gated plots in Nunna, Vijayawada near Gunadala, Benz Circle & Eluru Road. Book a free site visit.",
    keywords: ["plots in Nunna Vijayawada", "CRDA approved plots Vijayawada", "gated community plots Vijayawada", "Sukrithi Signature", "open plots Vijayawada"],
  },
  {
    slug: "subhagruha-ananda-phase-2",
    name: "Subhagruha Ananda Phase II",
    city: "Vijayawada",
    area: "Ramavarappadu",
    location: "Nunna, Ramavarappadu, Vijayawada Rural",
    status: "Ongoing",
    image: U + "b5b9c76b03dccafa9f5122b204bb3fba.png",
    registrations: [
      { label: "AP RERA No.", value: "P06160134505" },
      { label: "T.L.P No.", value: "62/2023/1168/APCRDA/DPMS" },
    ],
    tags: ["APCRDA Approved", "Phase II"],
    summary:
      "APCRDA-approved plotted layout near Ramavarappadu, Vijayawada, with BT roads, drainage, electricity, an entrance arch and a children's play area.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Compound Wall", "Children's Play Area"],
    highlights: ["CRDA approved layout", "Excellent BT roads", "Drainage system", "Electricity system", "Main gate with entrance arch", "Children's play area & avenue plantation"],
    gallery: [
      { caption: "Layout Plan", src: U + "f2e0c4d1ec2c1e22cee05170b7afde5b.jpg" },
      { caption: "Location Map", src: U + "597f54fe575ee32af7f58cbdf773044f.jpg" },
      { caption: "Brand Campaign", src: U + "788c5517dbc9e95ee15b2d98f660d7c5.jpg" },
    ],
    seoTitle: "Subhagruha Ananda Phase II | APCRDA Plots in Ramavarappadu, Vijayawada",
    seoDescription:
      "Subhagruha Ananda Phase II – AP RERA P06160134505, APCRDA approved open plots near Ramavarappadu, Vijayawada. BT roads, drainage & 24/7 security. Book a site visit.",
    keywords: ["plots in Ramavarappadu", "APCRDA plots Vijayawada", "Subhagruha Ananda", "open plots Vijayawada rural"],
  },
  {
    slug: "sukrithi-aria-phase-1-2",
    name: "Sukrithi Aria Phase 1 & 2",
    city: "Vijayawada",
    area: "Namburu",
    location: "Namburu, Vijayawada · near Mangalagiri",
    status: "Ongoing",
    image: U + "e65dac866f0930af5e3f902374493f5c.jpg",
    registrations: [
      { label: "AP RERA No.", value: "P07270020296" },
      { label: "AP RERA No.", value: "P07270021393" },
      { label: "T.L.P No.", value: "3/2020/1168/APCRDA/DPM" },
    ],
    tags: ["APCRDA Approved", "Near Mangalagiri", "Phase 1 & 2"],
    summary:
      "APCRDA-approved plots at Namburu, close to Mangalagiri, near Nagarjuna University, KL University, DPS and AIIMS Mangalagiri.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Compound Wall", "Children's Play Area"],
    highlights: ["Close to Mangalagiri", "Delhi Public School", "Nagarjuna University", "KL University", "Rain Tree Park", "RK Techno Towers · Haailand", "AIIMS Mangalagiri"],
    gallery: [
      { caption: "Layout Plan", src: U + "1718ede9240c5418f3f5a5a5839b1f38.jpg" },
      { caption: "Location Map", src: U + "fd65c4baefe6148c2959cf010b493862.jpg" },
      { caption: "Brand Campaign", src: U + "14184fad787650fc9cff679a2b6c2d4b.jpg" },
    ],
    seoTitle: "Sukrithi Aria | APCRDA Plots in Namburu near Mangalagiri – AP RERA Approved",
    seoDescription:
      "Sukrithi Aria Phase 1 & 2 – AP RERA P07270020296 & P07270021393. APCRDA-approved plots at Namburu near Mangalagiri, AIIMS, KL University & Nagarjuna University.",
    keywords: ["plots in Namburu", "plots near Mangalagiri", "plots near AIIMS Mangalagiri", "Sukrithi Aria", "APCRDA plots Guntur"],
  },
  {
    slug: "subhagruha-sukrithi-saanvi-phase-4",
    name: "Subhagruha Sukrithi Saanvi Phase 4",
    city: "Visakhapatnam",
    area: "Tagarapuvalasa",
    location: "Majjivalasa, Tagarapuvalasa, Visakhapatnam",
    status: "Ongoing",
    image: U + "df3e01256ddb60a1516fe54b69f1e718.png",
    registrations: [
      { label: "AP RERA (Phase 4)", value: "P03270056717" },
      { label: "T.L.P No.", value: "41/2026/1167/VMRDA" },
      { label: "Phase 1 RERA", value: "P03270050962" },
      { label: "Phase 2 RERA", value: "P03270051037" },
      { label: "Phase 3 RERA", value: "P03270051071" },
    ],
    tags: ["VMRDA Approved", "On NH-43", "Clear Titles"],
    summary:
      "VMRDA-approved gated plots at Majjivalasa, Tagarapuvalasa on NH-43, en route to the upcoming Bhogapuram International Airport in the Smart Vizag growth corridor.",
    amenities: ["Compound Wall", "Avenue Plantations", "Children's Play Area", "Street Lights", "24/7 Security", "Underground Electricity", "33 ft & 40 ft BT Roads", "100% Vastu", "Underground Drainage", "Grand Entrance Arch", "Landscaped Green Spaces"],
    highlights: ["On NH-43, Smart Vizag growth corridor", "En route to Bhogapuram (Alluri Sitarama Raju) International Airport", "Short drive to Ameya & Oakridge International Schools", "Near Raghu Engineering College, ANITS, Avanthi, Pydah & Lendi colleges"],
    gallery: [
      { caption: "Layout Plan", src: U + "72f5d7be18d0bbac3a1a8780f975b72d.png" },
      { caption: "Location Map", src: U + "24d1305e242016f6ff62e06377ea0a62.jpg" },
      { caption: "Site Photo", src: U + "b86a7ca7f53f32ee138b911d113c160c.jpeg" },
      { caption: "Site Photo", src: U + "0e5b66c056fcc9cdcd3d79e89c4ebde9.jpeg" },
      { caption: "Site Photo", src: U + "9529dfe1c77b199036361b926f00470d.jpeg" },
    ],
    geo: { lat: 17.967026, lng: 83.398241 },
    mapUrl: "https://www.google.com/maps/place/17%C2%B058'02.0%22N+83%C2%B023'53.7%22E/@17.96721,83.3956661,17z",
    seoTitle: "Sukrithi Saanvi Phase 4 | VMRDA Plots in Tagarapuvalasa, Vizag – AP RERA P03270056717",
    seoDescription:
      "Subhagruha Sukrithi Saanvi Phase 4 – VMRDA & AP RERA approved plots at Majjivalasa, Tagarapuvalasa on NH-43 near Bhogapuram Airport, Vizag. Book a free site visit.",
    keywords: ["plots in Tagarapuvalasa", "VMRDA plots Vizag", "plots near Bhogapuram airport", "open plots Visakhapatnam", "Sukrithi Saanvi"],
  },
  {
    slug: "sukrithi-windsor",
    name: "Sukrithi Windsor",
    city: "Visakhapatnam",
    area: "Bheemannadorapalem",
    location: "Bheemannadorapalem, near Sontyam, Visakhapatnam",
    status: "Ongoing",
    image: U + "c35f47f5472f363e469e12db0a8fe977.png",
    registrations: [
      { label: "AP RERA No.", value: "P03250126853" },
      { label: "T.L.P No.", value: "72/2026/VMRDA" },
    ],
    tags: ["VMRDA Approved", "Villa Plots", "Near Sontyam"],
    summary:
      "A premium VMRDA-approved, AP RERA-registered gated community of villa plots at Bheemannadorapalem near Sontyam, Visakhapatnam, with solar-fenced compound wall, jogging track and landscaped parks.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Compound Wall with Solar Fencing", "Children's Play Area", "Grand Entrance Arch", "Underground Drainage", "Jogging Track", "Landscaped Parks"],
    highlights: ["Near Google Data Center", "10+ engineering colleges within 4 km", "Industrial Development Area (IDA-II)", "Simhachalam – 4 km", "Gambhiram IT SEZ – 7 km · Pendurthi Railway Station – 7 km", "NAD – 15 km (20 min to airport)", "Anandapuram – 14 km · Hanumanthwaka – 16 km", "Madhurawada IT SEZ – 18 km · Bheemili – 20 km"],
    gallery: [
      { caption: "Layout Plan", src: U + "493501a99ed2afa33d4a9b79e427b208.jpg" },
      { caption: "Location Map", src: U + "22db6a18f5f1b75d7e6e01b0208fbabd.jpg" },
    ],
    mapUrl: "https://maps.app.goo.gl/3DXoPfBP95raMatp6",
    seoTitle: "Sukrithi Windsor | VMRDA Villa Plots in Bheemannadorapalem, Vizag – AP RERA P03250126853",
    seoDescription:
      "Sukrithi Windsor by Subhagruha – VMRDA & AP RERA approved gated villa plots at Bheemannadorapalem near Sontyam, Vizag. Near IDA-II, Simhachalam & Gambhiram IT SEZ.",
    keywords: ["plots in Bheemannadorapalem", "plots near Sontyam", "VMRDA villa plots Vizag", "Sukrithi Windsor", "open plots Visakhapatnam"],
  },
  {
    slug: "sukrithi-sathvik",
    name: "Sukrithi Sathvik",
    city: "Visakhapatnam",
    area: "Vizianagaram",
    location: "Gantlam Village, Savaravilli Junction, Vizianagaram",
    status: "Ongoing",
    image: U + "aba9a500902afa421b136946882a7bd3.png",
    registrations: [
      { label: "L.P No.", value: "1/2021/1167/VMRDA" },
    ],
    tags: ["VMRDA Approved", "Club House & Pool", "Near Bhogapuram Airport"],
    summary:
      "A premium VMRDA-approved gated community near Gantlam Village, Savaravilli Junction, Vizianagaram, close to the upcoming Bhogapuram International Airport, with clubhouse, swimming pool, tennis court and wide internal roads.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Rain Harvesting Pits", "24/7 Security", "Children's Play Area", "Avenue Plantation", "Electricity", "Dedicated Water Tank", "Drainage System", "Street Lights", "Compound Wall", "Walking Track"],
    highlights: ["Upcoming Bhogapuram International Airport", "Bheemili & Rushikonda beaches", "Gambhiram & Madhurawada IT SEZs", "International cricket stadium", "GITAM University & other institutions", "Divi's Labs, Dr. Reddy's & pharma companies", "Ramanaidu Film Studios & Vizag Film City"],
    gallery: [
      { caption: "Layout Plan", src: U + "e959897415654c1ed92ddbf81cd80030.jpg" },
      { caption: "Location Map", src: U + "a3563baeb21bd5d89a5a2f67a87cc389.jpeg" },
      { caption: "Site Photo", src: U + "a8e12c5c3384bc24ba07a5392339a41f.jpg" },
      { caption: "Site Photo", src: U + "64b669ed4a34c91e6353712c6a3dbe9c.jpg" },
      { caption: "Site Photo", src: U + "eeb3eccac3a735cb0a6b13303f23dae2.jpg" },
      { caption: "Site Photo", src: U + "815bb31fcec148156267e9227512819c.jpg" },
      { caption: "Site Photo", src: U + "c90faf08fdaaae3ffbfb93faea660bcb.jpg" },
    ],
    geo: { lat: 18.017841, lng: 83.443688 },
    mapUrl: "https://www.google.com/maps/place/Subhagruha+Sathvik/@18.017841,83.443688,15z",
    seoTitle: "Sukrithi Sathvik | VMRDA Plots in Vizianagaram near Bhogapuram Airport",
    seoDescription:
      "Sukrithi Sathvik by Subhagruha – VMRDA approved (LP 1/2021/1167/VMRDA) gated plots at Gantlam, Vizianagaram near Bhogapuram Airport. Clubhouse, pool & tennis court.",
    keywords: ["plots in Vizianagaram", "plots near Bhogapuram airport", "VMRDA plots Vizianagaram", "Sukrithi Sathvik", "gated community plots near Vizag"],
  },
  {
    slug: "sukrithi-sampath-phase-6",
    name: "Sukrithi Sampath Phase 6",
    city: "Visakhapatnam",
    area: "Sontyam",
    location: "Sontyam, Anandapuram, Visakhapatnam",
    status: "Ongoing",
    image: U + "40f8c3669114bbc59c6589cbb9ca17ae.png",
    registrations: [
      { label: "AP RERA No.", value: "P03250146742" },
      { label: "T.L.P No.", value: "50/2026/1167/VMRDA/DPMS" },
    ],
    tags: ["VMRDA Approved", "On National Highway", "Phase 6"],
    summary:
      "VMRDA-approved plots at Sontyam, Anandapuram, on the national highway towards Vizianagaram, with swift connectivity to IDA-II and the Gambhiram IT SEZ.",
    amenities: ["100% Vastu", "33 ft & 40 ft BT Roads", "Electricity", "24/7 Security", "Avenue Plantation", "Street Lights", "Children's Play Area", "Compound Wall"],
    highlights: ["10+ engineering colleges within 4 km", "Industrial Development Area (IDA-II)", "Pendurthi Railway Station – 7 km", "Simhachalam – 8 km", "Gambhiram – 14 km · Anandapuram – 14 km", "NAD – 15 km · Railway Station – 15 km", "Madhurawada IT SEZ – 18 km · Bheemili – 20 km"],
    gallery: [
      { caption: "Layout Plan", src: U + "fb8111cdb03d14f8d41a2ddd1891c437.png" },
      { caption: "Location Map", src: U + "9c59957d1941b238633aa42565d2832f.jpeg" },
      { caption: "Site Photo", src: U + "5c468a43339de9f71d469ace8b1e2784.jpeg" },
      { caption: "Site Photo", src: U + "047f8ad323e5a3399056edb287aec291.jpeg" },
      { caption: "Site Photo", src: U + "c30ca8d2de98b1296bdd23524eb13962.jpeg" },
    ],
    seoTitle: "Sukrithi Sampath Phase 6 | VMRDA Plots in Sontyam, Anandapuram, Vizag – AP RERA P03250146742",
    seoDescription:
      "Sukrithi Sampath Phase 6 by Subhagruha – VMRDA & AP RERA approved plots at Sontyam, Anandapuram, Vizag near IDA-II, Simhachalam & Gambhiram IT SEZ. Book a site visit.",
    keywords: ["plots in Sontyam", "plots in Anandapuram", "VMRDA plots Vizag", "Sukrithi Sampath", "open plots Visakhapatnam"],
  },
];

export type CityInfo = {
  slug: string;
  name: City;
  approvals: string;
  heading: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  completed: { name: string; image: string }[];
};

export const CITIES: CityInfo[] = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    approvals: "HMDA · DTCP · TS RERA",
    heading: "HMDA, DTCP & RERA Approved Residential Plots in Hyderabad",
    intro: "Gated-community open plots around Hyderabad's fastest-growing corridors: Shadnagar, Sadashivpet, Nandikandi and Lemoor, close to the RRR, ORR, IIT Hyderabad and the airport.",
    seoTitle: "Plots for Sale in Hyderabad | HMDA, DTCP & RERA Approved Open Plots – Subhagruha",
    seoDescription: "Buy HMDA, DTCP & TS RERA approved open plots in Hyderabad from Subhagruha: Tree Shades (Shadnagar), Sukrithi Pride (Sadashivpet), Sukrithi Ayatana, Samyuktha Phase 2 (Nandikandi) and Sukrithi Aarunya (Lemoor).",
    keywords: ["plots for sale in Hyderabad", "HMDA plots Hyderabad", "DTCP plots Hyderabad", "open plots Hyderabad", "gated community plots Hyderabad"],
    completed: [
      { name: "Sukrithi Samprada Venture", image: U + "f1a77d5b7ccb5293fad16b088f2af039.jpg" },
      { name: "Sukrithi Nivas Shankarpally", image: U + "322f642556b218d766eb014566f24247.webp" },
      { name: "Sukrithi Saanvi", image: U + "7afdd848c7df25905bb695bfb9b46f73.jpg" },
      { name: "Sahithi", image: U + "b71e95e88dae871a86eb738706d672ac.jpg" },
      { name: "Sukrithi Saharika", image: U + "7dc77f750e071f1e517827635ce2adc9.jpg" },
      { name: "Sukrithi Avanthika", image: U + "062f841187e6e71f62a298fb6f25926a.jpg" },
      { name: "Sukrithi Royal", image: U + "eca45e0a95e2161cf997ee462aaffde0.jpg" },
      { name: "Sukrithi Tech Park", image: U + "d4d3221ef96322faa91186a9ddb16405.jpg" },
      { name: "Sukrithi Ananthika", image: U + "d59bf74bc0f2d60a8fd6b67773d935a9.jpg" },
      { name: "Sukrithi Aria", image: U + "1f6b13a1da5227e8acd0b4208fa9902e.jpg" },
      { name: "Sukrithi Hills", image: U + "ad3f206457ce17824bcf1d70afa74b54.jpg" },
      { name: "Sukriti Delight", image: U + "ea449127181b6a596c5752d161e6418b.jpg" },
      { name: "Sukrithi Udbhava", image: U + "aca1dab4345b638e62bc328f1b0741f2.jpg" },
      { name: "Sukrithi Avanthi", image: U + "9fb18a9cecf25b797c47c08c298a15cb.jpg" },
      { name: "Sukrithi IIT County", image: U + "b2aeb563b7f630d0e842fd91f0581391.png" },
      { name: "Sukrithi Advika", image: U + "f3190e404d42fe804e9c97d741a27402.png" },
      { name: "Sukrithi Satvika Indresham", image: U + "e44a9e8ba21f9a95609e5d35f93fcda8.png" },
      { name: "Tanavi Grove", image: U + "463bc6a9e3cc16cb1cae1723a850f7ea.jpg" },
      { name: "Sukrithi Samyuktha Phase 1", image: U + "dd5310e2c034b5d78a150da1179722a1.png" },
      { name: "Maple Springs", image: U + "5ca04dd1a6ddd9820db48b32a5073fc1.jpg" },
    ],
  },
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    approvals: "VMRDA · AP RERA",
    heading: "VMRDA & RERA Approved Plots for Sale in Visakhapatnam (Vizag)",
    intro: "VMRDA-approved gated plots along Vizag's growth corridors: Tagarapuvalasa on NH-43, Sontyam, Bheemannadorapalem and Vizianagaram, near the upcoming Bhogapuram International Airport.",
    seoTitle: "Plots for Sale in Visakhapatnam (Vizag) | VMRDA & RERA Approved – Subhagruha",
    seoDescription: "Buy VMRDA & AP RERA approved plots in Vizag from Subhagruha: Sukrithi Saanvi Phase 4 (Tagarapuvalasa), Sukrithi Windsor, Sukrithi Sathvik (Vizianagaram) and Sukrithi Sampath Phase 6 (Sontyam).",
    keywords: ["plots for sale in Visakhapatnam", "VMRDA plots Vizag", "plots near Bhogapuram airport", "open plots Vizag", "gated community plots Visakhapatnam"],
    completed: [
      { name: "Subhagruha Sukrithi Saanvi Phase 3", image: U + "097c2bee7e10de75b5f4155cba7df51b.png" },
      { name: "Sukrithi Saavya", image: U + "b1fd43505eedb0f69847a8685a95e84b.png" },
      { name: "The Alankrita-III", image: U + "eca374a0e0e829fab36a0b3519d378c1.jpg" },
      { name: "Sukriti Sampath Phase 1 – 2", image: U + "84be47a7a9c84973e99428d2e7f3a524.webp" },
      { name: "Sukrithi Srujana", image: U + "a04e00c92b3dfbb79348fa569879eb7e.jpeg" },
      { name: "Sukruthi Ananthika", image: U + "686133c8d3070f5a329f7f8856b430b9.jpg" },
      { name: "Maple Meadows", image: U + "5724a46c06d9ac7bb9403cc027cf02c6.webp" },
      { name: "Sukrithi Saanvi Phase 1", image: U + "94f3d9de9bc2cf9a99791698c3a0ed30.jpg" },
      { name: "Sukrithi Springs", image: U + "2d2a1d7faa908cb80cba51bc25ad6017.jpg" },
      { name: "Sukrithi Nivas Phase 3", image: U + "aed18adc313ca3a0a16d3bb782da137c.jpg" },
      { name: "Sukrithi Aawas", image: U + "30aa5a9a4b4e611e990aa432cf59fbcc.jpg" },
      { name: "Sukrithi Sampath Phase 3 – 4 – 5", image: U + "2f4518fd4a3bf15ee9618b03a279d42d.png" },
      { name: "Sukrithi Nivas Phase 1", image: U + "e6ef107d9c70fc16a56f296115a3d7be.jpg" },
      { name: "Sukrithi Avanthika Vizag", image: U + "de2671415e4ce30c80eb7e567c6a2d3d.jpg" },
      { name: "Subhagruha Sukrithi Saanvi Phase 2", image: U + "9673896467db3783bb88318179db8aa6.png" },
      { name: "Sukirthi Saadhvi", image: U + "f33d4b7dcddfa645f5a65b6b080f9f42.png" },
      { name: "Sukrithi Lohitha", image: U + "03fd742b8c829325173c8b2b538cb6d5.png" },
      { name: "Sukrithi Siri", image: U + "9c14f57fad502c6ea68569f267f6cbe2.png" },
      { name: "Sukrithi Aviation City", image: U + "9dc29fcc9f413398c0d307f2fbd207f2.jpeg" },
      { name: "Sukeerthi Sadan Phase 1", image: U + "e2edb33ae0771cfd34f6c0293b91391e.png" },
      { name: "Sukeerthi Sadan Phase 2", image: U + "9495b347a535c5ca10c0556d261af67a.png" },
    ],
  },
  {
    slug: "vijayawada",
    name: "Vijayawada",
    approvals: "APCRDA · AP RERA",
    heading: "CRDA & RERA Approved Plots for Sale in Vijayawada",
    intro: "APCRDA-approved gated-community plots in and around Vijayawada: Nunna, Ramavarappadu and Namburu near Mangalagiri, with quick access to Benz Circle, Eluru Road and AIIMS.",
    seoTitle: "Plots for Sale in Vijayawada | APCRDA & RERA Approved Open Plots – Subhagruha",
    seoDescription: "Buy APCRDA & AP RERA approved plots in Vijayawada from Subhagruha: Sukrithi Aria (Namburu), Subhagruha Ananda Phase II (Ramavarappadu) and Sukrithi Signature (Nunna).",
    keywords: ["plots for sale in Vijayawada", "CRDA approved plots Vijayawada", "APCRDA plots", "open plots Vijayawada", "plots near Mangalagiri"],
    completed: [
      { name: "Sukrithi Anvika Phase 2", image: U + "5ff4ec00f8e9540a9b3adcc08d72e8de.jpg" },
      { name: "Sukrithi Aapya", image: U + "d483a6c38eed693670a0b970f0f44292.jpg" },
      { name: "Suncity", image: U + "5aa3fb0762dfdc1cfb190cab848e07fe.jpg" },
      { name: "Sukrithi Pravaraa", image: U + "dd3e7e709739289233574946fda9f447.jpg" },
      { name: "Sukrithi Anwita", image: U + "2e0a7263b8fcbd4f4ccf8c6491c2deb8.jpg" },
      { name: "Sukrithi Anantha", image: U + "466412369d453db0a57289bff23b09f0.jpg" },
      { name: "Sukrithi Vasudha", image: U + "68972bfef3b6c03106e94bb839b63b33.jpg" },
      { name: "Sukrithi Adya", image: U + "68c527c4ed2aa85f09e6d67a241b0b9d.jpg" },
      { name: "Subhagruha Anantha Nithya", image: U + "3e2894c435f5d14536ca520dd9d10d72.png" },
      { name: "Sukrithi Anvika", image: U + "934d90bab4975239cefe1f4d1805152f.jpg" },
      { name: "Sukrithi Ananda", image: U + "29f227ef404008ee314e86e9550489a1.jpg" },
    ],
  },
];

export const getCity = (slug: string) => CITIES.find((c) => c.slug === slug);

export const COMPLETED = [
  { name: "Subhagruha Sukrithi Saanvi Phase 3", city: "Visakhapatnam", image: U + "097c2bee7e10de75b5f4155cba7df51b.png", rera: "P03270051071" },
  { name: "Sukrithi Saavya", city: "Visakhapatnam", image: U + "b1fd43505eedb0f69847a8685a95e84b.png" },
  { name: "Sukrithi Samprada Venture", city: "Hyderabad", image: U + "f1a77d5b7ccb5293fad16b088f2af039.jpg" },
];

export const MORE_COMPLETED = ["Sukrithi Anvika Phase 2", "Sukrithi Aapya", "Suncity", "Sukrithi Pravaraa", "Sukrithi Anwita", "Sukrithi Anantha", "Sukrithi Vasudha", "Sukrithi Adya", "Subhagruha Anantha Nithya", "Sukrithi Anvika", "Sukrithi Ananda"];

export const VIDEOS = ["U-PgRUHyDdc", "M8eb99Re9M0", "UFoHxmdnpww", "L4KVD9lQEgc", "SbkkSLkE5do", "1Wlu2XZ_y3U", "RluY7wkTTMA", "gg4HHgffqJQ"];

export const HERO_SLIDES = [
  { src: "https://subhagruha.com/uploads/1654606028.webp", name: "Subhagruha · Hyderabad" },
  { src: "https://subhagruha.com/uploads/1750082967.png", name: "Tree Shades by Subhagruha · Hyderabad" },
  { src: "https://subhagruha.com/uploads/1693293803.webp", name: "Sukrithi Pride · Hyderabad" },
  { src: "https://subhagruha.com/uploads/1755539933.png", name: "Sukrithi Signature · Vijayawada" },
  { src: "https://subhagruha.com/uploads/1767338675.png", name: "Sukrithi Saanvi · Visakhapatnam" },
];

export const FAQS = [
  { q: "Are Subhagruha projects RERA approved?", a: "Yes. Every ongoing Subhagruha venture is registered with TS RERA or AP RERA, and layouts are approved by HMDA, VMRDA or APCRDA. The registration number for each project is listed on its project page." },
  { q: "Where are Subhagruha projects located?", a: "Subhagruha develops gated-community and villa plots in Hyderabad (Shadnagar, Sadashivpet, Nandikandi, Lemoor), Vijayawada (Nunna, Ramavarappadu, Namburu) and Visakhapatnam (Tagarapuvalasa, Sontyam, Bheemannadorapalem, Vizianagaram)." },
  { q: "How do I book a site visit?", a: "Fill in the appointment form with your preferred project, date and time slot, or call/WhatsApp us. Our team will confirm your visit and arrange pick-up and drop." },
  { q: "Can NRIs buy plots from Subhagruha?", a: "Yes. NRIs can purchase residential plots in India, and our team supports NRI buyers with documentation and virtual site tours." },
  { q: "What amenities do Subhagruha layouts offer?", a: "Typical amenities include 33 ft and 40 ft BT roads, 100% Vastu layouts, electricity, street lights, compound wall, avenue plantation, children's play area and 24/7 security." },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
