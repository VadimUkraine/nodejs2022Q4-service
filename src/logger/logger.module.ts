import { Module } from '@nestjs/common';
import { CustomMyLogger } from './logger.service';

@Module({
  providers: [CustomMyLogger],
  exports: [CustomMyLogger],
})

export class LoggerModule {}