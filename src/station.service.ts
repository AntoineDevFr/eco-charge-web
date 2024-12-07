import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { StationAPI } from './StationAPI';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { Station } from './Station';

@Injectable()
export class StationService implements OnModuleInit {
  private readonly logger = new Logger(StationService.name);
  private readonly storage: Map<string, Station> = new Map();

  constructor(private readonly httpService: HttpService) {}
  async onModuleInit() {
    this.logger.log('Loading stations from file and API');
    await Promise.all([
      //this.loadStationsFromFile(),
      this.loadStationsFromApi(),
    ]);
    this.logger.log(`${this.storage.size} stations loaded`);
  }

  private async loadStationsFromApi() {
    await firstValueFrom(
      this.httpService
        .get<{
          total_count: number;
          results: StationAPI[];
        }>(
          'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve@reseaux-energies-rte/records?limit=100',
        )
        .pipe(
          map((response) => response.data.results),
          map((apiStations) =>
            apiStations.map((apiStation) => ({
              n_operateur: apiStation.n_operateur,
              n_enseigne: apiStation.n_enseigne,
              id_station: apiStation.id_station,
              n_station: apiStation.n_station,
              ad_station: apiStation.ad_station,
              code_insee: apiStation.code_insee,
              nbre_pdc: apiStation.nbre_pdc,
              puiss_max: apiStation.puiss_max,
              type_prise: apiStation.type_prise,
              acces_recharge: apiStation.acces_recharge,
              accessibilite: apiStation.accessibilite,
              geo_point_borne: {
                lon: apiStation.geo_point_borne.lon,
                lat: apiStation.geo_point_borne.lat,
              },
              code_insee_commune: apiStation.code_insee_commune,
              region: apiStation.code_insee_commune,
              departement: apiStation.departement,
              favorite: false,
            })),
          ),
          tap((stations) =>
            stations.forEach((station) => this.addStation(station)),
          ),
        ),
    );
  }

  addStation(station: Station): Station {
    this.storage.set(station.id_station, station);
    return station;
  }

  getStation(id_station: string): Station {
    const station = this.storage.get(id_station);
    if (!station) {
      throw new Error(`Station with ID ${id_station} not found`);
    }
    return station;
  }

  getAllStations(): Station[] {
    return Array.from(this.storage.values()).sort((a, b) =>
      a.n_station.localeCompare(b.n_station),
    );
  }

  getAllFavoriteStations(): Station[] {
    return this.getAllStations()
      .filter((station) => station.favorite === true)
      .sort((a, b) => a.n_station.localeCompare(b.n_station));
  }

  getStationsInRegion(region: string): Station[] {
    return this.getAllStations()
      .filter((station) => station.region === region)
      .sort((a, b) => a.n_station.localeCompare(b.n_station));
  }

  search(term: string): Station[] {
    return Array.from(this.storage.values())
      .filter(
        (station) =>
          station.n_station.includes(term) ||
          station.n_operateur.includes(term) ||
          station.n_enseigne.includes(term),
      )
      .sort((a, b) => a.n_station.localeCompare(b.n_station));
  }

  toggleFavorite(id_station: string, isFavorite: boolean): string {
    const station = this.storage.get(id_station);
    if (!station) {
      return `Station ${id_station} introuvable.`;
    }

    if (isFavorite) {
      station.favorite = true;
      return `Station ${id_station} ajoutée aux favoris.`;
    } else {
      station.favorite = false;
      return `Station ${id_station} retirée des favoris.`;
    }
  }
}
