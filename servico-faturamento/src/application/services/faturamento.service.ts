import { Injectable } from '@nestjs/common';
import { PagamentoRepositoryORM } from '../../infrastructure/repositories/pagamento.repository.orm';
import { BadRequestException } from '@nestjs/common';
import { BrokerService } from './brooker.service';

@Injectable()
export class FaturamentoService {
  constructor(
    private readonly pagamentoRepositoryORM: PagamentoRepositoryORM,
    private readonly brokerService: BrokerService,
  ) {}
  async registrarPagamento(
    codigoPagamento: number,
    codigoAssinatura: number,
    valorPago: number,
    dataPagamento: Date,
  ) {
    const pagExistente =
      await this.pagamentoRepositoryORM.buscarPorCodigo(codigoPagamento);

    if (pagExistente) {
      throw new BadRequestException('Pagamento já registrado');
    }
    const pagamento = this.pagamentoRepositoryORM.criar({
      codigoPagamento,
      codigoAssinatura,
      valorPago,
      dataPagamento,
    });
    const pagamentoSalvo = await this.pagamentoRepositoryORM.salvar(pagamento);

    // Evento PagamentoPlanoServicoGestao e Evento PagamentoPlanoServicoGestao

    const payload = {
      dia: dataPagamento.getDate(),
      mes: dataPagamento.getMonth() + 1,
      ano: dataPagamento.getFullYear(),
      codigoAssinatura,
      valorPago,
    };

    await this.brokerService.publicarPagamento(payload);

    return pagamentoSalvo;
  }
}
