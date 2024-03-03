export type Route = {};

export type Coordinates = {
  lat: string;
  lng: string;
};

export type EVParams = {
  origin: Coordinates,
  destination: Coordinates,
  name: string,
  ev_max_charge: number,
  ev_initial_charge: number,
  ev_min_charge_at_destination: number,
  ev_min_charge_at_charging_station: number,
  ev_max_ac_charging_power: number,
  auxillary_consumption: number,
  energy_consumption_curve: string,
  ev_charging_curve: string,
  image: string
}
