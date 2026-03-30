import { Body, Controller, Post } from '@nestjs/common';
import { FaturamentoService } from '../application/services/faturamento.service';

@Controller()
export class ServicoFaturamentoController {
  constructor(private readonly faturamentoService: FaturamentoService) {}

  // endpoint para registrar um pagamento
  @Post('registrarpagamento')
  async registrarPagamento(
    @Body('dia') dia: number,
    @Body('mes') mes: number,
    @Body('ano') ano: number,
    @Body('codAss') codigoAssinatura: number,
    @Body('valorPago') valorPago: number,
  ) {
    const dataPagamento = new Date(ano, mes - 1, dia);
    const codigoPagamento = Date.now();

    await this.faturamentoService.registrarPagamento(
      codigoPagamento,
      codigoAssinatura,
      valorPago,
      dataPagamento,
    );

    return;
  }
}
