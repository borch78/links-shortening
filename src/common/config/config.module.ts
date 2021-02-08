import { Global, Module } from '@nestjs/common';
import { Config } from './config.service';
import { CONFIG } from '../di_registry';

@Global()
@Module({
  providers: [Config, { provide: CONFIG, useExisting: Config }],
  exports: [Config, { provide: CONFIG, useExisting: Config }],
})
export class ConfigModule {}
