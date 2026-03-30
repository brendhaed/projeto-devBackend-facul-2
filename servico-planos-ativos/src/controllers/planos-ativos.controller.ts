import { Controller, Get, Param } from '@nestjs/common';
import { PlanosAtivosService } from '../application/services/planos-ativos.service';

@Controller('planosativos')
export class PlanosAtivosController {
  constructor(private readonly planosAtivosService: PlanosAtivosService) {}

  @Get('codass')
  async verificar(@Param('codass') codass: number) {
    return await this.planosAtivosService.isAtivo(codass);
  }
}
