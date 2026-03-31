import { Controller, Get, Param } from '@nestjs/common';
import { PlanosAtivosService } from '../application/services/planos-ativos.service';

@Controller('planosativos')
export class PlanosAtivosController {
  constructor(private readonly planosAtivosService: PlanosAtivosService) {}

  @Get(':codAss')
  async verificar(@Param('codAss') codAss: string) {
    return await this.planosAtivosService.isAtivo(Number(codAss));
  }
}
