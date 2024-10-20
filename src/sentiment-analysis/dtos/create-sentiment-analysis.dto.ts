import { PickType } from '@nestjs/swagger';
import { SentimentAnalysis } from '../sentiment-analysis';
import { IsString, Length } from 'class-validator';

export class CreateSentimentAnalysisDto extends PickType(SentimentAnalysis, [
  'text',
]) {
  @IsString()
  @Length(1, 2000)
  text: string;
}
