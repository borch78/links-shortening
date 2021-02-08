import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LinksService } from './links/links.service';
import { NewUrlDto, ShortLinkResp } from './links/links.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly linkService: LinksService) {}

  @ApiOperation({ summary: 'Redirect for origin link' })
  @ApiOkResponse({ description: 'Success redirect' })
  @ApiResponse({
    status: 404,
    description: 'Long link not found',
  })
  @Get('/:short')
  async redirectForLongLink(@Res() res, @Param('short') short: string) {
    const longLink = await this.linkService.getLongLink(short);
    if (!longLink) {
      throw new NotFoundException('LINK NOT FOUND');
    }
    return res.redirect(longLink);
  }

  @ApiOperation({ summary: 'Create short link' })
  @ApiOkResponse({
    description: 'Success create short link',
    type: ShortLinkResp,
  })
  @Post('createShortLink')
  @UsePipes(new ValidationPipe())
  async createShortLink(@Body() body: NewUrlDto): Promise<ShortLinkResp> {
    const url: string = body.url;
    const shortLink = await this.linkService.createShortLink(url);
    return { shortLink };
  }
}
