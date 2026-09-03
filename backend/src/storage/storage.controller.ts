import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalStorageService } from './local-storage.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Assets & Storage')
@Controller('api/v1/assets')
export class StorageController {
  constructor(private readonly localStorageService: LocalStorageService) {}

  @Public()
  @Get(':storageKey')
  @ApiOperation({ summary: 'Baixar ou visualizar asset público' })
  @ApiResponse({ status: 200, description: 'Asset retornado' })
  @ApiResponse({ status: 404, description: 'Asset não encontrado' })
  async getAsset(@Param('storageKey') storageKey: string, @Res() res: Response) {
    try {
      const { asset, stream } = await this.localStorageService.getByStorageKey(storageKey);
      res.setHeader('Content-Type', asset.mimeType);
      res.setHeader('Content-Length', asset.size);
      res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(asset.originalName)}"`);
      stream.pipe(res);
    } catch {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Asset não encontrado',
      });
    }
  }
}
