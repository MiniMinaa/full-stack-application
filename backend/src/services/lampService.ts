import { lamps, type Lamp, type Review } from "../models/lampModel.js";

export const getAllLamps = (): Lamp[] => {
  return lamps;
};

export const getLampById = (id: number): Lamp | undefined => {
  return lamps.find((gym) => gym.id === id);
};

export const createLamp = (lampData: Omit<Lamp, "id" | "reviews">): Lamp => {
  const newLamp: Lamp = {
    id: lamps.length + 1,
    ...lampData,
    reviews: [],
  };

  lamps.push(newLamp);

  return newLamp;
};

export const addReviewToLamp = (
  lampId: number,
  reviewData: Omit<Review, "id">,
): Review | null => {
  const lamp = lamps.find((g) => g.id === lampId);

  if (!lamp) {
    return null;
  }

  const newReview: Review = {
    id: lamp.reviews.length + 1,
    ...reviewData,
  };

  lamp.reviews.push(newReview);

  return newReview;
};
