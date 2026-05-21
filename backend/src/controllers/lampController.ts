import { type Request, type Response } from "express";

import {
  getAllLamps,
  getLampById,
  createLamp,
  addReviewToLamp,
} from "../services/lampService.js";

// Keep the original behaviour but export using the new names the routes expect.
export const getLamps = (req: Request, res: Response): void => {
  const lamps = getAllLamps();

  res.status(200).json(lamps);
};

export const getSinglelamp = (req: Request, res: Response): void => {
  const lampId = Number(req.params.id);

  const lamp = getLampById(lampId);

  if (!lamp) {
    res.status(404).json({
      message: "Lamp not found",
    });

    return;
  }

  res.status(200).json(lamp);
};

export const createNewLamp = (req: Request, res: Response): void => {
  const { name, location, description, imageUrl } = req.body;

  if (!name || !location || !imageUrl) {
    res.status(400).json({
      message: "Name, location, and image are required",
    });

    return;
  }

  const newLamp = createLamp({
    name,
    location,
    description,
    imageUrl,
  });

  res.status(201).json(newLamp);
};

export const createReview = (req: Request, res: Response): void => {
  const lampId = Number(req.params.id);

  const { author, rating, comment } = req.body;

  if (!author || typeof rating !== "number") {
    res.status(400).json({
      message: "Author and rating are required",
    });

    return;
  }

  const review = addReviewToLamp(lampId, {
    author,
    rating,
    comment,
  });

  if (!review) {
    res.status(404).json({
      message: "Lamp not found",
    });

    return;
  }

  res.status(201).json(review);
};
