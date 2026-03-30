import { Controller, Get, Param } from '@nestjs/common';
import { PlanosAtivosService } from '../application/services/planos-ativos.service';

@Controller('planosativos')
export class PlanosAtivosController {
  constructor(private readonly planosAtivosService: PlanosAtivosService) {}

  @Get(':codass') 
  verificarPlanos(@Param('codass') codass: string) {
    return this.planosAtivosService.isAtivo(Number(codass));
  }

}
