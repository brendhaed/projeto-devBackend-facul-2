import { Injectable } from '@nestjs/common';
import { PagamentoRepositoryORM } from '../../infrastructure/repositories/pagamento.repository.orm';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FaturamentoService {
  constructor(
    private readonly pagamentoRepositoryORM: PagamentoRepositoryORM,
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
    try {
      await axios.post('http://localhost:3000/evento-pagamento', {
        codigoAssinatura,
        valorPago,
        dataPagamento,
      });
    } catch (error) {
      console.log('Erro ao enviar para servico-gestao', error.message);
    }

    // Evento  PagamentoPlanoServicoPlanosAtivos
    try {
      await axios.post('http://localhost:3002/evento-pagamento', {
        codigoAssinatura,
        valorPago,
        dataPagamento,
      });
    } catch (error) {
      console.log('Erro ao enviar para planos-ativos', error.message);
    }

    return pagamentoSalvo;
  }
}
