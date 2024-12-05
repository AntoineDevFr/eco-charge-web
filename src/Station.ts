export interface Station {
  n_operateur: string;
  n_enseigne: string;
  id_station: string;
  n_station: string;
  ad_station: string;
  code_insee: number;
  nbre_pdc: number;
  puiss_max: number;
  type_prise: string; //image
  acces_recharge: string;
  accessibilite: string;
  geo_point_borne: {
    lon: number;
    lat: number;
  };
  code_insee_commune: string;
  region: string;
  departement: string;
  favorite: boolean;
}
