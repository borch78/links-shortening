import * as config from 'config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  // eslint-disable-next-line class-methods-use-this
  public get<T>(key: string): T {
    return config.get<T>(key);
  }
}
