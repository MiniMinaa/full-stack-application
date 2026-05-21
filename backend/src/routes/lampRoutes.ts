import express from "express";

import {
  getLamps,
  getSinglelamp,
  createNewLamp,
  createReview,
} from "../controllers/gymController.js";

const router = express.Router();

router.get("/", getLamps);

router.get("/:id", getSinglelamp);

router.post("/", createNewLamp);

router.post("/:id/reviews", createReview);

export default router;

/*
GET    /lamps
GET    /lamps/:id
POST   /lamps              (protected)
POST   /lamps/:id/reviews  (protected)
*/
