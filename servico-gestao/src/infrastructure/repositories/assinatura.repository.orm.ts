import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assinatura } from '../entities/assinatura.entity';

@Injectable()
export class AssinaturaRepositoryORM {
  constructor(
    @InjectRepository(Assinatura)
    private repo: Repository<Assinatura>,
  ) {}

  salvar(assinatura: Partial<Assinatura>) {
    return this.repo.save(assinatura);
  }

  listar() {
    return this.repo.find();
  }

  buscarPorCliente(codCli: number) { 
    return this.repo.find({ where: { codigoCli: codCli } });
  }

  buscarPorPlano(codPlano: number) {
    return this.repo.find({ where: { codigoPlano: codPlano } });
  }
  async buscarPorPlanoECliente(codigoPlano: number, codigoCli: number) {
    return this.repo.findOne({
      where: { codigoPlano, codigoCli },
    });
  }
  async buscarPorCodigo(codigoAssinatura: number) {
    return this.repo.findOne({ where: { codigoAssinatura } });
  }
}
