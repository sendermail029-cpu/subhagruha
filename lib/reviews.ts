// Customer reviews shown in the homepage carousel.
// Only add genuine reviews (with the customer's permission). Copy one block and edit it.
export type Review = {
  quote: string;
  name: string;
  role?: string;      // e.g. "Software Engineer"
  project?: string;   // e.g. "Sukrithi Avanthika"
  city?: string;      // e.g. "Hyderabad"
  rating?: number;    // 1–5, default 5
};

export const REVIEWS: Review[] = [
  {
    quote: "They have got all of the approvals for the venture. I bought a plot in their venture near Sangareddy.",
    name: "Kumar Swamy",
    role: "Software Engineer",
    city: "Hyderabad",
  },
  {
    quote: "Subhagruha Group is the best place to invest in real estate. I bought a plot in the Sukrithi Avanthika venture.",
    name: "Prasanna Kumar Rao",
    role: "IT Manager",
    project: "Sukrithi Avanthika",
  },
];
