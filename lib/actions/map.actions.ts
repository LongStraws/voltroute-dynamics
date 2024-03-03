"use server";

import { Coordinates } from "@/types";
export const GetRoute = async (req: {
  query: { origin: Coordinates; destination: Coordinates };
}) => {
  const { origin, destination } = req.query;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng}%2C${origin.lat}%3B${destination.lng}%2C${destination.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
  const route = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng}%2C${origin.lat}%3B${destination.lng}%2C${destination.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
  );

  const routeJson = await route.json();
  return routeJson;
};
