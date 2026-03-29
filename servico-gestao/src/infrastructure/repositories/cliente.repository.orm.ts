import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteRepositoryORM {
  constructor(
    @InjectRepository(Cliente)
    private repo: Repository<Cliente>,
  ) {}

  cadastrarCliente(nome: string, email: string) {
    const cliente = this.repo.create({ nome, email });
    return this.repo.save(cliente);
  }

  listarClientes(): Promise<Cliente[]> {
    return this.repo.find();
  }

  salvar(cliente: Partial<Cliente>): Promise<Cliente> {
    return this.repo.save(cliente);
  }
}
