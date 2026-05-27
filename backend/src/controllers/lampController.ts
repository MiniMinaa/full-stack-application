import { type Request, type Response } from "express";

import {
  getAllLamps,
  getLampById,
  createLamp,
  addReviewToLamp,
} from "../services/lampService.js";

export const getLamps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const lamps = await getAllLamps();
    res.status(200).json(lamps);
  } catch {
    res.status(500).json({ message: "Failed to fetch lamps" });
  }
};

export const getSinglelamp = async (req: Request, res: Response): Promise<void> => {
  try {
    const lamp = await getLampById(Number(req.params.id));
    if (!lamp) {
      res.status(404).json({ message: "Lamp not found" });
      return;
    }
    res.status(200).json(lamp);
  } catch {
    res.status(500).json({ message: "Failed to fetch lamp" });
  }
};

export const createNewLamp = async (req: Request, res: Response): Promise<void> => {
  const { name, location, description, imageUrl } = req.body;

  if (!name || !location || !imageUrl) {
    res.status(400).json({ message: "Name, location, and image are required" });
    return;
  }

  try {
    const newLamp = await createLamp({ name, location, description, imageUrl });
    res.status(201).json(newLamp);
  } catch {
    res.status(500).json({ message: "Failed to create lamp" });
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  const lampId = Number(req.params.id);
  const { author, rating, comment } = req.body;

  if (!author || typeof rating !== "number") {
    res.status(400).json({ message: "Author and rating are required" });
    return;
  }

  try {
    const review = await addReviewToLamp(lampId, { author, rating, comment });
    if (!review) {
      res.status(404).json({ message: "Lamp not found" });
      return;
    }
    res.status(201).json(review);
  } catch {
    res.status(500).json({ message: "Failed to create review" });
  }
};
