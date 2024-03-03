"use client";
import * as React from "react";
import Map from "react-map-gl";
import { GetRoute } from "@/lib/actions/map.actions";

import { Button } from "../ui/button";

const MapCanvas = () => {
  return (
    <div>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: -75.6831,
          latitude: 45.4231,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/light-v11'
      />
    </div>
  );
};

export default MapCanvas;
