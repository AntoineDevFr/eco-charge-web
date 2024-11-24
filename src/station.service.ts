import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import type { Station } from './station';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

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
  private async loadStationsFromFile() {
    const data = await readFile('src/dataset.json', 'utf8');
    const stations = JSON.parse(data.toString()) as Station[];
    stations.forEach((station) => this.addStation(station));
  }

  private async loadStationsFromApi() {
    const apiUrl =
      'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve@reseaux-energies-rte/records?limit=100';

    try {
      const response = await firstValueFrom(
        this.httpService.get(apiUrl).pipe(map((res) => res.data)),
      );
      if (response.results && Array.isArray(response.results)) {
        const stations: Station[] = response.results.map((rawStation) => ({
          n_amenageur: rawStation.n_amenageur,
          n_operateur: rawStation.n_operateur,
          n_enseigne: rawStation.n_enseigne,
          id_station: rawStation.id_station,
          n_station: rawStation.n_station,
          ad_station: rawStation.ad_station,
          code_insee: rawStation.code_insee,
          xlongitude: rawStation.xlongitude,
          ylatitude: rawStation.ylatitude,
          nbre_pdc: rawStation.nbre_pdc,
          id_pdc: rawStation.id_pdc,
          puiss_max: rawStation.puiss_max,
          type_prise: rawStation.type_prise,
          acces_recharge: rawStation.acces_recharge,
          accessibilite: rawStation.accessibilite,
          observations: rawStation.observations ?? null,
          date_maj: rawStation.date_maj,
          source: rawStation.source,
          geo_point_borne: {
            lon: rawStation.geo_point_borne?.lon ?? 0,
            lat: rawStation.geo_point_borne?.lat ?? 0,
          },
          code_insee_commune: rawStation.code_insee_commune,
          region: rawStation.region,
          departement: rawStation.departement,
        }));
        stations.forEach((station) => this.addStation(station));
        this.logger.log(`Loaded ${stations.length} stations from API`);
      } else {
        this.logger.warn('No stations found in API response');
      }
    } catch (error) {
      this.logger.error('Failed to load stations from API', error);
    }
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

  getStationsInRegion(region: string): Station[] {
    return this.getAllStations()
      .filter((station) => station.region === region)
      .sort((a, b) => a.n_station.localeCompare(b.n_station));
  }

  getTotalNumberOfStations(): number {
    return this.storage.size;
  }

  remove(id_station: string): void {
    this.storage.delete(id_station);
  }

  search(term: string): Station[] {
    return Array.from(this.storage.values())
      .filter(
        (station) =>
          station.n_station.includes(term) ||
          station.n_amenageur.includes(term) ||
          station.n_operateur.includes(term) ||
          station.n_enseigne.includes(term),
      )
      .sort((a, b) => a.n_station.localeCompare(b.n_station));
  }
}
