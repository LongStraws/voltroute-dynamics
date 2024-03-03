"use client";
import * as React from "react";
import Map from "react-map-gl";
import { GetRoute } from "@/lib/actions/map.actions";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Button } from "../ui/button";
import { Coordinates, EVParams } from "@/types";

interface RouteProps {
  route: EVParams;
}

const MapCanvas: React.FC<RouteProps> = ({ route }) => {
  const [map, setMap] = React.useState(/** @type google.maps.Map */ null);
  React.useEffect(() => {
    try {
      const getRoute = async () => {
        const res = await GetRoute({ query: route });
        console.log(res);
      };
      getRoute();
    } catch (err) {
      console.log(err);
    }
  }, [route]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      {/* <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: -75.6831,
          latitude: 45.4231,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/light-v11'
      /> */}
      <GoogleMap
        center={{ lat: 45.4231, lng: -75.6831 }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: 620 }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map: any) => setMap(map)}
      >
        <Marker position={{ lat: 45.4231, lng: -75.6831 }} />
      </GoogleMap>
    </div>
  );
};

export default MapCanvas;
