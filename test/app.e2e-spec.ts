import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SentimentAnalysisRepository } from 'src/sentiment-analysis/repositories/sentiment-analysis.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: SentimentAnalysisRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = app.get(SentimentAnalysisRepository);
  });

  it('/sentiment-analysis (POST)', async () => {
    const { body: createdAnalysis } = await request(app.getHttpServer())
      .post('/sentiment-analysis')
      .send({
        text: 'I hate this hot dog. I hate this pizza.',
      })
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body.id).toBeDefined();
        expect(body.text).toBeDefined();
        expect(body.overallMagnitude).toBeDefined();
        expect(body.overallScore).toBeDefined();
        expect(body.sentences).toBeInstanceOf(Array);
      });
    const retrievedAnalysis = await repository.findById(createdAnalysis.id);
    expect(retrievedAnalysis).toBeDefined();
    expect(retrievedAnalysis.id).toEqual(createdAnalysis.id);
    expect(retrievedAnalysis.text).toEqual(createdAnalysis.text);
    expect(retrievedAnalysis.sentences).toHaveLength(
      createdAnalysis.sentences.length,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
