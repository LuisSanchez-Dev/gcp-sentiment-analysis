import { ApiProperty } from '@nestjs/swagger';

export class SentimentAnalysisSentence {
  @ApiProperty({
    description: 'The text detected for this single sentence',
    example: ' Lately I have been feeling better anyways!',
  })
  text: string;

  @ApiProperty({
    description:
      'This value describes the overall strength of the emotion found in this sentence',
    example: 0.89999915824,
  })
  magnitude: number;

  @ApiProperty({
    description:
      'This value describes the overall emotional leaning found in the current sentence',
    example: -0.89999915824,
    examples: [0.89999915824, -0.89999915824],
  })
  score: number;
}

export class SentimentAnalysis {
  @ApiProperty({
    description: 'The unique identifier for this sentiment analysis',
    example: '6f30fe58ad590c6ef8d3f200',
  })
  id: string;

  @ApiProperty({
    description: 'The analyzed text',
    example:
      'I have been feeling sick for almost a month. Lately I have been feeling better anyways!',
  })
  text: string;

  @ApiProperty({
    description:
      'This value describes the overall strength of the emotion found in the entire text',
    example: 0.89999915824,
  })
  overallMagnitude: number;

  @ApiProperty({
    description:
      'This value describes the overall emotional leaning found in the entire text',
    example: 0.89999915824,
    examples: [0.89999915824, -0.89999915824],
  })
  overallScore: number;

  @ApiProperty({
    type: () => SentimentAnalysisSentence,
    description: 'The breakdown of the detected sentences in the entire text',
  })
  sentences: SentimentAnalysisSentence[];
}
