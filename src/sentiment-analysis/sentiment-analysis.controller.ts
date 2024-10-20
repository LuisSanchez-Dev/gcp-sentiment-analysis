import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSentimentAnalysisDto } from './dtos/create-sentiment-analysis.dto';
import { SentimentAnalysis } from './sentiment-analysis';
import { SentimentAnalysisService } from './sentiment-analysis.service';

@Controller({ path: 'sentiment-analysis' })
@ApiTags('Sentiment analysis')
@ApiBadRequestResponse()
export class SentimentAnalysisController {
  private readonly logger = new Logger(SentimentAnalysisController.name);

  constructor(private readonly service: SentimentAnalysisService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SentimentAnalysis,
    description: 'Text analyzed successfully',
  })
  async createAnalysis(
    @Body() body: CreateSentimentAnalysisDto,
  ): Promise<SentimentAnalysis> {
    this.logger.log(
      `Attempting to create a sentiment analysis for ${body.text.slice(0, 10)}...`,
    );
    try {
      const analysis = await this.service.createAnalysis(body.text);
      this.logger.log(`Created analysis ${analysis.id} successfully`);
      return analysis;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      this.logger.error(
        `Unexpected error found while attempting to create a sentiment analysis: ${e.message}`,
        e.stack ?? e,
      );
      throw new HttpException(
        'There was an error with the service, please try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
