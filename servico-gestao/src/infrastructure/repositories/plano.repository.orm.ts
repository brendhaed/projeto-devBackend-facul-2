import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plano } from '../entities/plano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanoRepositoryORM {
  constructor(
    @InjectRepository(Plano)
    private repo: Repository<Plano>,
  ) {}

  listarPlanos(): Promise<Plano[]> {
    return this.repo.find();
  }

  async cadastrarPlano(plano: Partial<Plano>): Promise<Plano> {
    const planoExistente = await this.repo.findOne({
      where: { nomePlano: plano.nomePlano },
    }); // ou outro campo único
    if (planoExistente) {
      throw new Error('Plano já cadastrado!');
    }
    return this.repo.save(plano);
  }
  buscarPorId(id: number): Promise<Plano | null> {
    return this.repo.findOne({ where: { codigoPlano: id } });
  }

  async atualizarPlano(codigoPlano: number, custoMensal: number) {
    return this.repo.update(codigoPlano, { custoMensal });
  }
}
