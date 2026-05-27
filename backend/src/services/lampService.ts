import prisma from "../db.js";

export const getAllLamps = () => {
  return prisma.lamp.findMany({ include: { reviews: true } });
};

export const getLampById = (id: number) => {
  return prisma.lamp.findUnique({ where: { id }, include: { reviews: true } });
};

export const createLamp = (data: {
  name: string;
  location: string;
  description?: string;
  imageUrl?: string;
}) => {
  return prisma.lamp.create({ data, include: { reviews: true } });
};

export const addReviewToLamp = async (
  lampId: number,
  reviewData: { author: string; rating: number; comment?: string },
) => {
  const lamp = await prisma.lamp.findUnique({ where: { id: lampId } });
  if (!lamp) return null;
  return prisma.review.create({ data: { ...reviewData, lampId } });
};
