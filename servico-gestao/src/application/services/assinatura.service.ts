import { Injectable } from '@nestjs/common';
import { AssinaturaRepositoryORM } from 'src/infrastructure/repositories/assinatura.repository.orm';

@Injectable()
export class AssinaturaService {
  constructor(private readonly assinaturaRepository: AssinaturaRepositoryORM) {}

  async confirmarPagamento(
    codigoAssinatura: number,
    valorPago: number,
    dataPagamento: Date,
  ) {
    const assinatura =
      await this.assinaturaRepository.buscarPorCodigo(codigoAssinatura);

    if (!assinatura) {
      throw new Error('Assinatura não encontrada');
    }

    // atualiza último pagamento
    assinatura.dataUltimoPagamento = dataPagamento;

    // atualiza validade (+30 dias)
    const novaValidade = new Date(dataPagamento);
    novaValidade.setDate(novaValidade.getDate() + 30);

    assinatura.fimFidelidade = novaValidade;

    return await this.assinaturaRepository.salvar(assinatura);
  }

// verificar se a assinatura está ativa
  async verificarAtivo(codigoAssinatura: number) {
    const assinatura =
      await this.assinaturaRepository.buscarPorCodigo(codigoAssinatura);

    if (!assinatura || !assinatura.dataUltimoPagamento) {
      return { ativo: false };
    }

    const hoje = new Date();
    const diff =
      hoje.getTime() - new Date(assinatura.dataUltimoPagamento).getTime();
    const dias = diff / (1000 * 60 * 60 * 24);

    return { ativo: dias <= 30 };
  }
}
