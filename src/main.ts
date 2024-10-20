import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NaturalLanguageAPIService } from './modules/natural-language-api/natural-language-api.service';
import { SentimentAnalysisService } from './sentiment-analysis/sentiment-analysis.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Sentiment analysis API')
    .setDescription(
      'Use this API to analyze your texts for positive or negative sentiment',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  return;
  const service = app.get(SentimentAnalysisService);
  const res = await service.createAnalysis(
    'I have noticed happiness on my life!',
  );
  // res = await lang.analyzeText('I have been loving summers since I was 10 years old');
  console.log(JSON.stringify(res, null, 3));
}
bootstrap();
