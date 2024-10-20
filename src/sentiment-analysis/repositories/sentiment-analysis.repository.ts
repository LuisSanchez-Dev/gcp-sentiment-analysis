import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SentimentAnalysis } from '../sentiment-analysis';

@Injectable()
export class SentimentAnalysisRepository {
  constructor(
    @InjectModel(SentimentAnalysis.name)
    private analysisModel: Model<SentimentAnalysis>,
  ) {}

  async create(
    analysis: Omit<SentimentAnalysis, 'id'>,
  ): Promise<SentimentAnalysis> {
    return this.analysisModel.create(analysis);
  }

  async findById(analysisId: string): Promise<SentimentAnalysis | null> {
    return this.analysisModel.findById(analysisId);
  }
}
