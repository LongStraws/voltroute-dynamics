"use client";
import * as React from "react";
import Map from "react-map-gl";
export default function Home() {
  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      />
    </>
  );
}
