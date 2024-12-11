import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import type { Station } from './Station';
import { StationDto } from './Station.dto';
import { StationService } from './station.service';

@Controller('/stations') // Définit la route de base pour ce contrôleur : toutes les routes ici commenceront par '/stations'.
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post() // Définit une route POST pour créer une nouvelle station.
  createStation(@Body() stationDto: StationDto): Station {
    this.stationService.addStation({
      ...stationDto,
    });
    return this.stationService.getStation(stationDto.id_station);
  }

  @Get() // Définit une route GET pour récupérer les stations.
  getStations(@Query('region') region: string): Station[] {
    // Si un paramètre de région est fourni, retourne uniquement les stations de cette région.
    if (region) {
      return this.stationService.getStationsInRegion(region);
    }
    // Sinon, retourne toutes les stations.
    return this.stationService.getAllStations();
  }

  @Get('favorites') // Définit une route GET pour récupérer toutes les stations favorites.
  getFavorites(): Station[] {
    return this.stationService.getAllFavoriteStations();
  }

  @Get(':id_station') // Définit une route GET dynamique pour récupérer une station spécifique par son ID.
  getStation(@Param('id_station') id_station: string): Station {
    return this.stationService.getStation(id_station);
  }

  @Post('search') // Définit une route POST pour rechercher des stations.
  @HttpCode(200)
  searchStations(@Body() { term }: { term: string }): Station[] {
    return this.stationService.search(term);
  }

  @Put('favorites/:id') // Définit une route PUT pour modifier l'état favori d'une station.
  toggleFavorite(
    @Param('id') id: string,
    @Body('isFavorite') isFavorite: boolean,
  ) {
    return this.stationService.toggleFavorite(id, isFavorite);
  }
}
