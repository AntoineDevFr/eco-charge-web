import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StationModule } from '../src/station.module';

describe('StationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/stations (GET) - should return all stations', async () => {
    const response = await request(app.getHttpServer())
      .get('/stations')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('/stations/:id (GET) - should return a single station by ID', async () => {
    const id = 'test-id';
    const station = {
      id_station: id,
      n_station: 'Test Station',
      n_amenageur: 'Test Amenageur',
      ad_station: 'Test Address',
      region: 'Test Region',
    };
    await request(app.getHttpServer())
      .post('/stations')
      .send(station)
      .expect(201);
    const response = await request(app.getHttpServer())
      .get(`/stations/${id}`)
      .expect(200);

    expect(response.body).toMatchObject(station);
  });

  it('/stations (POST) - should create a new station', async () => {
    const station = {
      id_station: 'new-id',
      n_station: 'New Station',
      n_amenageur: 'New Amenageur',
      ad_station: 'New Address',
      region: 'New Region',
    };

    const response = await request(app.getHttpServer())
      .post('/stations')
      .send(station)
      .expect(201);

    expect(response.body).toMatchObject(station);
  });

  it('/stations?region=Test Region (GET) - should return stations in a specific region', async () => {
    const station = {
      id_station: 'region-id',
      n_station: 'Regional Station',
      n_amenageur: 'Regional Amenageur',
      ad_station: 'Regional Address',
      region: 'Test Region',
    };
    await request(app.getHttpServer())
      .post('/stations')
      .send(station)
      .expect(201);
    const response = await request(app.getHttpServer())
      .get('/stations?region=Test Region')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toMatchObject(station);
  });
});
