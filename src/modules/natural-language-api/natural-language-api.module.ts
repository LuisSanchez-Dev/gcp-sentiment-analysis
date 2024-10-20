import { Module } from '@nestjs/common';
import { NaturalLanguageAPIService } from './natural-language-api.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [NaturalLanguageAPIService],
  exports: [NaturalLanguageAPIService],
})
export class NaturalLanguageAPIModule {}
