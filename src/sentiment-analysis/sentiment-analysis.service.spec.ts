import { Test } from '@nestjs/testing';
import { NaturalLanguageAPIService } from 'src/modules/natural-language-api/natural-language-api.service';
import { SentimentAnalysisRepository } from './repositories/sentiment-analysis.repository';
import { SentimentAnalysisFactory } from './sentiment-analysis.factory';
import { SentimentAnalysisService } from './sentiment-analysis.service';

describe(SentimentAnalysisService.name, () => {
  let service: SentimentAnalysisService;
  let langService: jest.Mocked<NaturalLanguageAPIService>;
  let repository: jest.Mocked<SentimentAnalysisRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SentimentAnalysisService,
        {
          provide: SentimentAnalysisFactory,
          useValue: {
            fromAnalysisResults: jest.fn(),
          },
        },
        {
          provide: SentimentAnalysisRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: NaturalLanguageAPIService,
          useValue: {
            analyzeText: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get(SentimentAnalysisService);
    langService = module.get(NaturalLanguageAPIService);
    repository = module.get(SentimentAnalysisRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should attempt to store the sentiment analysis', async () => {
    langService.analyzeText.mockResolvedValue({});

    await service.createAnalysis('Sample text');
    expect(repository.create).toHaveBeenCalled();
  });
});
