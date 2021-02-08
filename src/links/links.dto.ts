import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class NewUrlDto {
  @ApiProperty({ example: 'http://google.com/' })
  @IsUrl()
  url: string;
}

export class ShortLinkResp {
  @ApiProperty({ example: '0.0.0.0:3000/JE49Vn4Yj' })
  shortLink: string;
}
