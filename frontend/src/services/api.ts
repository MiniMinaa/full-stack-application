import axios from "axios";
import type { Gym, Review } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
});

export const getLamps = () => api.get<Gym[]>("/lamps").then((r) => r.data);

export const getSinglelamp = (id: number) =>
  api.get<Gym>(`/lamps/${id}`).then((r) => r.data);

export const createNewLamp = (
  data: Omit<Gym, "id" | "reviews">,
  token: string,
) =>
  api
    .post<Gym>("/lamps", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data);

export const createReview = (
  gymId: number,
  data: Omit<Review, "id">,
  token: string,
) =>
  api
    .post<Review>(`/lamps/${gymId}/reviews`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data);
