import { Body, Controller, Post } from '@nestjs/common';
import { PlanosAtivosService } from '../application/services/planos-ativos.service';

@Controller()
export class EventoController {
  constructor(private readonly planosService: PlanosAtivosService) {}

  @Post('evento-pagamento')
  receberEvento(@Body() data: any) {
    const { codigoAssinatura } = data;

    this.planosService.ativarPlano(codigoAssinatura);

    console.log('Plano ativado:', codigoAssinatura);

    return { ok: true };
  }
}
