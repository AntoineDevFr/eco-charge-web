// Cette interface représente le format des données renvoyées par l'API des stations.
// Elle définit la structure des objets de type `StationAPI`, avec leurs propriétés et types associés.
export interface StationAPI {
  n_amenageur: string;
  n_operateur: string;
  n_enseigne: string;
  id_station: string;
  n_station: string;
  ad_station: string;
  code_insee: number;
  xlongitude: number;
  ylatitude: number;
  nbre_pdc: number;
  id_pdc: string;
  puiss_max: number;
  type_prise: string;
  acces_recharge: string;
  accessibilite: string;
  observations: string | null;
  date_maj: string;
  source: string;
  geo_point_borne: {
    lon: number;
    lat: number;
  };
  code_insee_commune: string;
  region: string;
  departement: string;
}
