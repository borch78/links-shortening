import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LinksService } from './links/links.service';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './common/connections/connections.module';
import { linksProviders } from './links/links.provider';
import { LINKS_SERVICE } from './constants';

@Module({
  imports: [CommonModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    LinksService,
    ...linksProviders,
    { provide: LINKS_SERVICE, useClass: LinksService },
  ],
})
export class AppModule {}
