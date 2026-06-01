import axios from "axios";
import type { Lamp, Review } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
  withCredentials: true,
});

export const getLamps = () => api.get<Lamp[]>("/lamps").then((r) => r.data);

export const getSinglelamp = (id: number) =>
  api.get<Lamp>(`/lamps/${id}`).then((r) => r.data);

export const createNewLamp = (
  data: Omit<Lamp, "id" | "reviews">,
  token: string,
) =>
  api
    .post<Lamp>("/lamps", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data);

export const createReview = (
  lampId: number,
  data: Omit<Review, "id">,
  token: string,
) =>
  api
    .post<Review>(`/lamps/${lampId}/reviews`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data);
