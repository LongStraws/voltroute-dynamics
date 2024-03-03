"use server";

import { Coordinates, EVParams } from "@/types";
export const GetRoute = async (req: {
  query: EVParams
}) => {
  const { origin, destination, ev_initial_charge, ev_charging_curve, ev_max_ac_charging_power, ev_max_charge, ev_min_charge_at_charging_station, ev_min_charge_at_destination, energy_consumption_curve, auxillary_consumption } = req.query;

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng}%2C${origin.lat}%3B${destination.lng}%2C${destination.lat}?alternatives=false&annotations=state_of_charge%2Cduration&geometries=geojson&language=en&overview=full&steps=true&engine=electric&ev_initial_charge=${ev_initial_charge}&ev_max_charge=${ev_max_charge}&ev_connector_types=ccs_combo_type1%2Cccs_combo_type2&energy_consumption_curve=${energy_consumption_curve}&ev_charging_curve=${ev_charging_curve}&ev_max_ac_charging_power=${ev_max_ac_charging_power}&ev_min_charge_at_destination=${ev_min_charge_at_destination}&ev_min_charge_at_charging_station=${ev_min_charge_at_charging_station}&auxiliary_consumption=${auxillary_consumption}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;

  const route = await fetch(url);

  const routeJson = await route.json();
  return routeJson;
};