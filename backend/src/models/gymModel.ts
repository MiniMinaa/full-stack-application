export interface Review {
  id: number;
  author: string;
  rating: number;
  comment?: string;
}

export interface Gym {
  id: number;
  name: string;
  location: string;
  description?: string;
  imageUrl?: string;
  reviews: Review[];
}

export const gyms: Gym[] = [
  {
    id: 1,
    name: "Murano Glass Orb Pendant",
    location: "Italy",
    description:
      "A daringly simple silhouette, served with a dose of extraordinary detail.",
    imageUrl: "/lamp_blue_light.png",
    reviews: [],
  },
  {
    id: 2,
    name: "Brass Calla Sconce",
    location: "Spain",
    description:
      "Rendered in hand-spun brass, each sconce features a bell-shaped shade and Calla’s signature fin embellishments in a range of finishes to mix and match.",
    imageUrl: "/lamp_brown_light.png",
    reviews: [],
  },
  {
    id: 3,
    name: "Calla Pendant",
    location: "Spain",
    description:
      "A hand-blown glass pendant that pairs a graceful silhouette with eye-catching embellishment. ",
    imageUrl: "/lamp_red_light.png",
    reviews: [],
  },
];
