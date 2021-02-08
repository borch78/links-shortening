import { Test } from '@nestjs/testing';
import { LinksService } from './links.service';
import { LINKS_REPOSITORY } from '../constants';
import { CommonModule } from '../common/common.module';

describe('LinksService', () => {
  let linksService: LinksService;
  const linksRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    insert: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [
        LinksService,
        { provide: LINKS_REPOSITORY, useValue: linksRepository },
      ],
    }).compile();
    linksService = await moduleRef.resolve(LinksService);
  });

  describe('root', () => {
    it('should return short link "Hello World!"', async () => {
      linksRepository.findOne.mockImplementation(() =>
        Promise.resolve({
          long: 'Hello World!',
          incrementCount: () => ({}),
        }),
      );

      const longLink = await linksService.getLongLink('test');
      expect(longLink).toBe('Hello World!');
    });

    it('should return null', async () => {
      linksRepository.findOne.mockImplementation(() =>
        Promise.resolve(undefined),
      );

      const longLink = await linksService.getLongLink('test');
      expect(longLink).toBe(null);
    });
  });
});
