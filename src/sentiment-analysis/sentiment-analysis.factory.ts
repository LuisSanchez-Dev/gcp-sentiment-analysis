import { google } from '@google-cloud/language/build/protos/protos';
import {
  SentimentAnalysis,
  SentimentAnalysisSentence,
} from './sentiment-analysis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SentimentAnalysisFactory {
  fromAnalysisResults(
    text: string,
    analysisResults: google.cloud.language.v1.IAnalyzeSentimentResponse,
  ): SentimentAnalysis {
    const analysis = new SentimentAnalysis();
    analysis.text = text;
    analysis.overallMagnitude = analysisResults.documentSentiment.magnitude;
    analysis.overallScore = analysisResults.documentSentiment.score;
    analysis.sentences = [];

    for (const analyzedSentence of analysisResults.sentences) {
      const sentence = new SentimentAnalysisSentence();
      sentence.text = analyzedSentence.text.content;
      sentence.magnitude = analyzedSentence.sentiment.magnitude;
      sentence.score = analyzedSentence.sentiment.score;
      analysis.sentences.push(sentence);
    }

    return analysis;
  }
}
