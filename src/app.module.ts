import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PacGeneratorService } from './pac-generator.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PacGeneratorService],
})
export class AppModule {}
