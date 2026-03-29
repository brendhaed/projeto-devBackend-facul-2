import { Body, Controller, Post } from '@nestjs/common';
import { FaturamentoService } from '../application/services/faturamento.service';

@Controller('servico-faturamento')
export class ServicoFaturamentoController {
  constructor(private readonly faturamentoService: FaturamentoService) {}

  // endpoint para registrar um pagamento
  @Post('registrarpagamento')
  async registrarPagamento(
    @Body('codigoPagamento') codigoPagamento: number,
    @Body('codigoAssinatura') codigoAssinatura: number,
    @Body('valorPago') valorPago: number,
    @Body('dataPagamento') dataPagamento: string,
  ) {
    return this.faturamentoService.registrarPagamento(
      codigoPagamento,
      codigoAssinatura,
      valorPago,
      new Date(dataPagamento)
    );
  }
}
