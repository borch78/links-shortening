import { Module, Global } from '@nestjs/common';
import { providers } from './db.providers';

@Global()
@Module({
  providers,
  exports: providers,
})
export class DatabaseModule {}
