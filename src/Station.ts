// Cette interface définit le format des données d'une station telles qu'elles sont utilisées au sein de l'application.
// Contrairement à `StationAPI`, elle représente un modèle transformé et enrichi, adapté aux besoins internes.
// Elle inclut des informations générales sur la station, ses caractéristiques techniques et géographiques,
// ainsi qu'un champ supplémentaire `favorite` pour indiquer si la station est marquée comme favorite par l'utilisateur.

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
