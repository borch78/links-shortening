import * as crypto from 'crypto';
import * as shortid from 'shortid';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Config } from '../common/config';
import { Links } from './links.entity';
import { LINKS_REPOSITORY } from '../constants';

@Injectable()
export class LinksService {
  public readonly alphabet: string[];
  public readonly base: number;
  public readonly lastId: number;
  public readonly address: string;

  constructor(
    @Inject(LINKS_REPOSITORY)
    private readonly linksRepository: Repository<Links>,
    private readonly config: Config,
  ) {
    this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'.split('');
    this.base = 62;
    this.lastId = 0;
    const { address } = config.get('server');
    this.address = address;
  }

  async getLongLink(shortLink: string): Promise<string | null> {
    try {
      const linkData = await this.linksRepository.findOne({ short: shortLink });
      if (!linkData) {
        return null;
      }
      linkData.incrementCount();
      await this.linksRepository.save(linkData);
      return linkData.long;
    } catch (err) {
      throw err;
    }
  }

  async createShortLink(incomeUrl: string): Promise<string> {
    let short;
    try {
      const hash = crypto.createHash('md5').update(incomeUrl).digest('hex');
      const linkData = await this.linksRepository.findOne({ hash });
      if (linkData) {
        return `${this.address}/${linkData.short}`;
      }

      short = shortid.generate();

      const newLinkData = this.linksRepository.create({
        hash,
        long: incomeUrl,
        short,
      });
      await this.linksRepository.insert(newLinkData);
    } catch (err) {
      throw err;
    }

    return `${this.address}/${short}`;
  }
}
