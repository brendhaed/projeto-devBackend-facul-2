import { Injectable } from '@nestjs/common';
import { PagamentoRepositoryORM } from '../../infrastructure/repositories/pagamento.repository.orm';
import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FaturamentoService {
  constructor(
    private readonly pagamentoRepositoryORM: PagamentoRepositoryORM,
    private readonly eventEmitter: EventEmitter2,
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

    // Evento PagamentoPlanoServicoGestao
    this.eventEmitter.emit('PagamentoPlanoServicoGestao', {
      codigoAssinatura,
      valorPago,
      dataPagamento,
    });

    // Evento  PagamentoPlanoServicoPlanosAtivos
    this.eventEmitter.emit('PagamentoPlanoServicoPlanosAtivos', {
      codigoAssinatura,
      valorPago,
      dataPagamento,
    });

    return pagamentoSalvo;
  }
}
