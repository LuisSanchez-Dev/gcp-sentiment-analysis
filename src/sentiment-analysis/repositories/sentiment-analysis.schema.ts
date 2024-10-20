import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  SentimentAnalysis,
  SentimentAnalysisSentence,
} from '../sentiment-analysis';

export type SentimentAnalysisDocument =
  HydratedDocument<SentimentAnalysisSchemaDef>;

@Schema({ _id: false })
class SentimentAnalysisSentenceSchemaDef implements SentimentAnalysisSentence {
  @Prop()
  text: string;

  @Prop()
  magnitude: number;

  @Prop()
  score: number;
}

@Schema({
  id: true,
  toJSON: { virtuals: true, versionKey: false },
})
class SentimentAnalysisSchemaDef implements SentimentAnalysis {
  id: string;

  @Prop()
  text: string;

  @Prop({
    type: [SchemaFactory.createForClass(SentimentAnalysisSentenceSchemaDef)],
  })
  sentences: SentimentAnalysisSentenceSchemaDef[];

  @Prop()
  overallMagnitude: number;

  @Prop()
  overallScore: number;
}

export const SentimentAnalysisSchema = SchemaFactory.createForClass(
  SentimentAnalysisSchemaDef,
);

export const sentimentAnalysisModelDefinition: ModelDefinition = {
  name: SentimentAnalysis.name,
  schema: SentimentAnalysisSchema,
};
