import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import type { StationAPI } from './StationAPI';
import { StationDto } from './Station.dto';
import { StationService } from './station.service';

@Controller('/stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  createStation(@Body() stationDto: StationDto): StationAPI {
    this.stationService.addStation({
      ...stationDto,
      observations: stationDto.observations || null,
    });
    return this.stationService.getStation(stationDto.id_station);
  }

  @Get()
  getStations(@Query('region') region: string): StationAPI[] {
    if (region) {
      return this.stationService.getStationsInRegion(region);
    }
    return this.stationService.getAllStations();
  }

  @Get(':id_station')
  getStation(@Param('id_station') id_station: string): StationAPI {
    return this.stationService.getStation(id_station);
  }

  @Delete(':id_station')
  deleteStation(@Param('id_station') id_station: string): void {
    this.stationService.remove(id_station);
  }

  @Post('search')
  @HttpCode(200)
  searchStations(@Body() { term }: { term: string }): StationAPI[] {
    return this.stationService.search(term);
  }
}
