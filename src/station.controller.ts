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

@Controller('/stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  createStation(@Body() stationDto: StationDto): Station {
    this.stationService.addStation({
      ...stationDto,
    });
    return this.stationService.getStation(stationDto.id_station);
  }

  @Get()
  getStations(@Query('region') region: string): Station[] {
    if (region) {
      return this.stationService.getStationsInRegion(region);
    }
    return this.stationService.getAllStations();
  }

  @Get(':id_station')
  getStation(@Param('id_station') id_station: string): Station {
    return this.stationService.getStation(id_station);
  }

  @Post('search')
  @HttpCode(200)
  searchStations(@Body() { term }: { term: string }): Station[] {
    return this.stationService.search(term);
  }

  @Get('favorites')
  getFavorites(): Station[] {
    return this.stationService.getAllFavoriteStations();
  }

  @Put('favorites/:id')
  toggleFavorite(
    @Param('id') id: string,
    @Body('isFavorite') isFavorite: boolean,
  ) {
    return this.stationService.toggleFavorite(id, isFavorite);
  }
}
