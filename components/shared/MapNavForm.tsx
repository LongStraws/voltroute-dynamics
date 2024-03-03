"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MapCanvas from "./MapCanvas";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";

const MapNavForm = () => {
  const testEVData = {
    name: "Ford Mustang Mach-E GT",
    ev_max_charge: 130000,
    ev_initial_charge: 104000,
    ev_min_charge_at_destination: 19500,
    ev_min_charge_at_charging_station: 19500,
    ev_max_ac_charging_power: 11500,
    auxillary_consumption: 2000,
    energy_consumption_curve:
    "10,450;20,340;40,320;60,300;80,350;100,400;120,420",
    ev_charging_curve:
    "13000,200000;26000,190000;39000,180000;65000,160000;78000,150000;91000,100000;104000,60000;117000,50000",
    image:
    "https://buildfoc.ford.com/dig/Ford/Mache/2023/HD-TILE/Image[Ford|Mache|2023|1|1.|400A...PAE...895.64C.AWD.60P.99X.]/EXT/4/vehicle.png",
    origin: {
      name: "",
      lat: "",
      lng: "",
    },
    destination: {
      name: "",
      lat: "",
      lng: "",
    }
  };
  const [routeQuery, setRouteQuery] = React.useState(testEVData);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create a Loader instance with the Google Maps API key and version
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });

    // Load the Google Maps API
    const google = await loader.load();

    // Create a Geocoder instance
    const geocoder = new google.maps.Geocoder();

    // Helper function to geocode an address
    const geocodeAddress = (address: string) => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results: any, status) => {
          if (status === "OK") {
            resolve(results[0].geometry.location);
          } else {
            reject(status);
          }
        });
      });
    };

    try {
      // Geocode the origin and destination addresses
      const originLocation = (await geocodeAddress(e.target[0].value)) as any;
      const destinationLocation = (await geocodeAddress(
        e.target[1].value
      )) as any;

      //   // Log the latitude and longitude of the origin and destination
      //   console.log('Origin:', 'Latitude:', originLocation.lat(), 'Longitude:', originLocation.lng());
      //   console.log('Destination:', 'Latitude:', destinationLocation.lat(), 'Longitude:',destinationLocation.lng());

      // Update the state with the geocoded addresses
      setRouteQuery((prevState) => ({
        ...prevState,
        origin: {
          name: e.target[0].value,
          lat: originLocation.lat(),
          lng: originLocation.lng(),
        },
        destination: {
          name: e.target[1].value,
          lat: destinationLocation.lat(),
          lng: destinationLocation.lng(),
        },
      }));
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <div>
      <Card className=" w-[500] shadow-lg justify-center items-center mt-10">
        <CardContent className=" mt-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row items-center gap-2"
          >
            <div className="flex-1">
              <Label htmlFor="origin" className="sr-only">
                Origin
              </Label>
              <Autocomplete>
                <Input id="origin" placeholder="Origin" className="w-full" />
              </Autocomplete>
            </div>
            <div className="flex-1">
              <Label htmlFor="destination" className="sr-only">
                Destination
              </Label>
              <Autocomplete>
                <Input
                  id="destination"
                  placeholder="Destination"
                  className="w-full"
                />
              </Autocomplete>
            </div>
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              Calculate Route
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700">
              Distance:
            </Label>
            <div className="mt-1">
              <Input
                className="w-full bg-gray-100"
                disabled
                placeholder="Not calculated"
              />
            </div>
          </div>
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700">
              Duration:
            </Label>
            <div className="mt-1">
              <Input
                className="w-full bg-gray-100"
                disabled
                placeholder="Not calculated"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
      <MapCanvas route={routeQuery} />
    </div>
  );
};

export default MapNavForm;
