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
    name: "Fitness Hub",
    location: "Lund",
    description: "Ett modernt träningscenter med fokus på gruppträning",
    imageUrl: "/lamp_brown_light.png",
    reviews: [],
  },
  {
    id: 3,
    name: "Träningscentralen",
    location: "Stockholm",
    description: "Klassiskt gym i hjärtat av Stockholm med allt du behöver",
    imageUrl: "/lamp_red_light.png",
    reviews: [],
  },
];
