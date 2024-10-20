import { LanguageServiceClient } from '@google-cloud/language';
import { google } from '@google-cloud/language/build/protos/protos';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NaturalLanguageAPIService implements OnModuleInit {
  private client: LanguageServiceClient;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const credentialsText = this.configService.get<string>(
      'GCP_SERVICE_CREDENTIALS',
    );
    if (!credentialsText) {
      throw new Error(
        'The environment variable GCP_SERVICE_CREDENTIALS is missing',
      );
    }
    const credentials = JSON.parse(credentialsText);
    this.client = new LanguageServiceClient({ credentials });
  }

  async analyzeText(
    text: string,
  ): Promise<google.cloud.language.v1.IAnalyzeSentimentResponse> {
    const document: google.cloud.language.v1.IDocument = {
      content: text,
      type: 'PLAIN_TEXT',
    };
    const response = await this.client.analyzeSentiment({ document });
    return response[0];
  }
}
