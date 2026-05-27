export interface Review {
  id: number;
  author: string;
  rating: number;
  comment?: string | null;
}

export interface Lamp {
  id: number;
  name: string;
  location: string;
  description?: string | null;
  imageUrl?: string | null;
  reviews: Review[];
}
