import { getRepository } from 'typeorm';
import { LINK_SHORTENING__DB } from '../common/di_registry';
import { LINKS_REPOSITORY } from '../constants';
import { Links } from './links.entity';

export const linksProviders = [
  {
    provide: LINKS_REPOSITORY,
    useFactory: () => getRepository(Links),
    inject: [LINK_SHORTENING__DB],
  },
];
