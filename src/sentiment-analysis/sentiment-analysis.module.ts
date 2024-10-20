import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NaturalLanguageAPIModule } from 'src/modules/natural-language-api/natural-language-api.module';
import { SentimentAnalysisRepository } from './repositories/sentiment-analysis.repository';
import { sentimentAnalysisModelDefinition } from './repositories/sentiment-analysis.schema';
import { SentimentAnalysisController } from './sentiment-analysis.controller';
import { SentimentAnalysisFactory } from './sentiment-analysis.factory';
import { SentimentAnalysisService } from './sentiment-analysis.service';

@Module({
  imports: [
    MongooseModule.forFeature([sentimentAnalysisModelDefinition]),
    NaturalLanguageAPIModule,
  ],
  controllers: [SentimentAnalysisController],
  providers: [
    SentimentAnalysisService,
    SentimentAnalysisFactory,
    SentimentAnalysisRepository,
  ],
})
export class SentimentAnalysisModule {}
