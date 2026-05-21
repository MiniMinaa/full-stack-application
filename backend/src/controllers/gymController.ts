import { type Request, type Response } from "express";

import {
  getAllGyms,
  getGymById,
  createGym,
  addReviewToGym,
} from "../services/gymService.js";

// Keep the original behaviour but export using the new names the routes expect.
export const getLamps = (req: Request, res: Response): void => {
  const gyms = getAllGyms();

  res.status(200).json(gyms);
};

export const getSinglelamp = (req: Request, res: Response): void => {
  const gymId = Number(req.params.id);

  const gym = getGymById(gymId);

  if (!gym) {
    res.status(404).json({
      message: "Gym not found",
    });

    return;
  }

  res.status(200).json(gym);
};

export const createNewLamp = (req: Request, res: Response): void => {
  const { name, location, description, imageUrl } = req.body;

  if (!name || !location || !imageUrl) {
    res.status(400).json({
      message: "Name, location, and image are required",
    });

    return;
  }

  const newGym = createGym({
    name,
    location,
    description,
    imageUrl,
  });

  res.status(201).json(newGym);
};

export const createReview = (req: Request, res: Response): void => {
  const gymId = Number(req.params.id);

  const { author, rating, comment } = req.body;

  if (!author || typeof rating !== "number") {
    res.status(400).json({
      message: "Author and rating are required",
    });

    return;
  }

  const review = addReviewToGym(gymId, {
    author,
    rating,
    comment,
  });

  if (!review) {
    res.status(404).json({
      message: "Gym not found",
    });

    return;
  }

  res.status(201).json(review);
};
