import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from '../entities/Pagamento.entity';

@Injectable()
export class PagamentoRepositoryORM {
  constructor(
    @InjectRepository(Pagamento)
    private repo: Repository<Pagamento>,
  ) {}

  salvar(pagamento: Pagamento): Promise<Pagamento> {
    return this.repo.save(pagamento);
  }

  async buscarPorCodigo(codigoPagamento: number): Promise<Pagamento | null> {
    return this.repo.findOne({ where: { codigoPagamento } });
  }

  async buscarTodos(): Promise<Pagamento[]> {
    return this.repo.find();
  }
  criar(pagamentoData: Partial<Pagamento>): Pagamento {
    return this.repo.create(pagamentoData);
  }
}
