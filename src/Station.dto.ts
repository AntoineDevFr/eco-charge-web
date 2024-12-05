import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class StationDto {
  @IsString()
  @IsNotEmpty()
  n_amenageur!: string;

  @IsString()
  @IsNotEmpty()
  n_operateur: string;

  @IsString()
  @IsNotEmpty()
  n_enseigne: string;

  @IsString()
  @IsNotEmpty()
  id_station: string;

  @IsString()
  n_station: string;

  @IsString()
  ad_station: string;

  @IsNumber()
  code_insee: number;

  @IsNumber()
  xlongitude: number;

  @IsNumber()
  ylatitude: number;

  @IsNumber()
  nbre_pdc: number;

  @IsString()
  id_pdc: string;

  @IsNumber()
  puiss_max: number;

  @IsString()
  type_prise: string;

  @IsString()
  acces_recharge: string;

  @IsString()
  accessibilite: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsString()
  date_maj: string;

  @IsString()
  source: string;

  geo_point_borne: {
    lon: number;
    lat: number;
  };

  @IsString()
  code_insee_commune: string;

  @IsString()
  region: string;

  @IsString()
  departement: string;

  @IsBoolean()
  favorite: boolean;
}
