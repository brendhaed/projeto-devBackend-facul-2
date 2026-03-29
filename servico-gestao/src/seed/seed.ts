import { Injectable, OnModuleInit } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../infrastructure/repositories/assinatura.repository.orm';
import { ClienteRepositoryORM } from '../infrastructure/repositories/cliente.repository.orm';
import { PlanoRepositoryORM } from '../infrastructure/repositories/plano.repository.orm';
import { Assinatura } from '../infrastructure/entities/assinatura.entity';

@Injectable()
export class Seed implements OnModuleInit {
  constructor(
    private clienteRepository: ClienteRepositoryORM,
    private planoRepository: PlanoRepositoryORM,
    private assinaturaRepository: AssinaturaRepositoryORM,
  ) {}

  async onModuleInit() {
    // clientes
    let clientes = await this.clienteRepository.listarClientes();

    if (clientes.length === 0) {
      clientes = await Promise.all([
        this.clienteRepository.salvar({
          nome: 'Brenda',
          email: 'brenda@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'João',
          email: 'joao@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'Maria',
          email: 'maria@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'Carlos',
          email: 'carlos@email.com',
        }),
        this.clienteRepository.salvar({ 
          nome: 'Ana', 
          email: 'ana@email.com' 
        }),
        this.clienteRepository.salvar({
          nome: 'Pedro',
          email: 'pedro@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'Luiza',
          email: 'luiza@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'Rafael',
          email: 'rafael@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'Fernanda',
          email: 'fernanda@email.com',
        }),
        this.clienteRepository.salvar({
          nome: 'Gustavo',
          email: 'gustavo@email.com',
        }),
      ]);
    }

    // planos
    let planos = await this.planoRepository.listarPlanos();

    if (planos.length === 0) {
      planos = await Promise.all([
        this.planoRepository.cadastrarPlano({
          codigoPlano: 1,
          nomePlano: 'Plano Básico',
          custoMensal: 79.99,
          dataModificacao: new Date(),
          descricao: 'Plano básico',
        }),
        this.planoRepository.cadastrarPlano({
          codigoPlano: 2,
          nomePlano: 'Plano Intermediário',
          custoMensal: 120.99,
          dataModificacao: new Date(),
          descricao: 'Plano intermediário',
        }),
        this.planoRepository.cadastrarPlano({
          codigoPlano: 3,
          nomePlano: 'Plano Alta Velocidade',
          custoMensal: 160.99,
          dataModificacao: new Date(),
          descricao: 'Plano com alta velocidade',
        }),
        this.planoRepository.cadastrarPlano({
          codigoPlano: 4,
          nomePlano: 'Plano Empresarial',
          custoMensal: 189.99,
          dataModificacao: new Date(),
          descricao: 'Plano empresarial',
        }),
      ]);
    }

    // evitar criar assinaturas duplicadas

    const criarAssinatura = async (data: Partial<Assinatura>) => {
      if (!data.codigoPlano || !data.codigoCli) {
        throw new Error('codigoPlano ou codigoCli inválido');
      }

      const existe = await this.assinaturaRepository.buscarPorPlanoECliente(
        data.codigoPlano,
        data.codigoCli,
      );

      if (!existe) {
        await this.assinaturaRepository.salvar(data);
      }
    };

    // assinaturas

    await criarAssinatura({
      codigoPlano: planos[0].codigoPlano,
      codigoCli: clientes[0].codigoCli,
      custoFinal: 79.99,
      descricao: 'Plano Básico',
      inicioFidelidade: new Date(),
      fimFidelidade: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ),
      dataUltimoPagamento: new Date(),
    });

    await criarAssinatura({
      codigoPlano: planos[1].codigoPlano,
      codigoCli: clientes[1].codigoCli,
      custoFinal: 120.99,
      descricao: 'Plano Intermediário',
      inicioFidelidade: new Date(),
      fimFidelidade: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ),
      dataUltimoPagamento: new Date(),
    });

    await criarAssinatura({
      codigoPlano: planos[2].codigoPlano,
      codigoCli: clientes[2].codigoCli,
      custoFinal: 160.99,
      descricao: 'Plano Alta Velocidade',
      inicioFidelidade: new Date(),
      fimFidelidade: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ),
      dataUltimoPagamento: new Date(),
    });

    await criarAssinatura({
      codigoPlano: planos[3].codigoPlano,
      codigoCli: clientes[3].codigoCli,
      custoFinal: 189.99,
      descricao: 'Plano Empresarial',
      inicioFidelidade: new Date(),
      fimFidelidade: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ),
      dataUltimoPagamento: new Date(),
    });

    // assinaturas canceladas ou com fidelidade vencida
    await criarAssinatura({
      codigoPlano: planos[1].codigoPlano,
      codigoCli: clientes[2].codigoCli,
      custoFinal: 120.99,
      descricao: 'Plano Intermediário',
      inicioFidelidade: new Date('2023-01-01'),
      fimFidelidade: new Date('2023-01-01'),
      dataUltimoPagamento: new Date('2023-01-01'),
    });
    await criarAssinatura({
      codigoPlano: planos[0].codigoPlano,
      codigoCli: clientes[3].codigoCli,
      custoFinal: 79.99,
      descricao: 'Plano Básico',
      inicioFidelidade: new Date('2023-01-01'),
      fimFidelidade: new Date('2023-01-01'),
      dataUltimoPagamento: new Date('2023-01-01'),
    });
    await criarAssinatura({
      codigoPlano: planos[0].codigoPlano,
      codigoCli: clientes[4].codigoCli,
      custoFinal: 79.99,
      descricao: 'Plano Básico',
      inicioFidelidade: new Date('2023-01-01'),
      fimFidelidade: new Date('2023-01-01'),
      dataUltimoPagamento: new Date('2023-01-01'),
    });
  }
}
