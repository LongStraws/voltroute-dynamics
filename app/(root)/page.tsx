"use client";
import * as React from "react";
import MapCanvas from "@/components/shared/MapCanvas";
import { GetRoute } from "@/lib/actions/map.actions";
import { Button } from "@/components/ui/button";
export default async function Home() {
  async function getRoute() {
    const query = {
      origin: { lng: "-73.979992", lat: "40.760417" },
      destination: { lng: "-75.690057", lat: "45.421144 " },
    };
    const route = await GetRoute({
      query,
    });

    console.log(
      "test",
      `https://api.mapbox.com/directions/v5/mapbox/driving/${query.origin.lng}%2C${query.origin.lat}%3B${query.destination.lng}%2C${query.destination.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
    );
    console.log(typeof query.origin.lng);
    console.log(route);
  }
  return (
    <>
      <Button onClick={getRoute}></Button>
      <MapCanvas></MapCanvas>
    </>
  );
}
