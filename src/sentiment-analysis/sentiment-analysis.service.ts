import { Injectable } from '@nestjs/common';
import { NaturalLanguageAPIService } from 'src/modules/natural-language-api/natural-language-api.service';
import { SentimentAnalysisFactory } from './sentiment-analysis.factory';
import { SentimentAnalysis } from './sentiment-analysis';
import { SentimentAnalysisRepository } from './repositories/sentiment-analysis.repository';

@Injectable()
export class SentimentAnalysisService {
  constructor(
    private readonly naturalLanguageService: NaturalLanguageAPIService,
    private readonly analysisFactory: SentimentAnalysisFactory,
    private readonly repository: SentimentAnalysisRepository,
  ) {}

  async createAnalysis(text: string): Promise<SentimentAnalysis> {
    const analysisResults = await this.naturalLanguageService.analyzeText(text);
    const analysisBody = this.analysisFactory.fromAnalysisResults(
      text,
      analysisResults,
    );
    const createdAnalysis = await this.repository.create(analysisBody);
    return createdAnalysis;
  }
}
