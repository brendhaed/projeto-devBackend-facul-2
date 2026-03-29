import { Injectable } from '@nestjs/common';
import { Assinatura } from 'src/infrastructure/entities/assinatura.entity';
import { AssinaturaRepositoryORM } from 'src/infrastructure/repositories/assinatura.repository.orm';
import { ClienteRepositoryORM } from 'src/infrastructure/repositories/cliente.repository.orm';
import { PlanoRepositoryORM } from 'src/infrastructure/repositories/plano.repository.orm';

@Injectable()
export class AppService {
  constructor(
    private clienteRepository: ClienteRepositoryORM,
    private planoRepository: PlanoRepositoryORM,
    private assinaturaRepository: AssinaturaRepositoryORM,
  ) {}

  getServicoGestao(): string {
    return 'Olá, seja bem-vindo ao serviço de gestão de projetos!';
  }

  // Clientes
  cadastrarCliente( nome: string, email: string) {
    return this.clienteRepository.cadastrarCliente( nome, email);
  }
  listarClientes() { 
    return this.clienteRepository.listarClientes();
  }

  // Planos
  cadastrarPlano(
    codigoPlano: number,
    nomePlano: string,
    custoMensal: number,
    dataModificacao: Date,
    descricao: string,
  ) {
    return this.planoRepository.cadastrarPlano({
      codigoPlano,
      nomePlano,
      custoMensal,
      dataModificacao,
      descricao,
    });
  }
  listarPlanos() {
    return this.planoRepository.listarPlanos();
  }

  async atualizarPlano(codigoPlano: number, custoMensal: number) {
  const plano = await this.planoRepository.buscarPorId(codigoPlano);

  if (!plano) {
    throw new Error('Plano não encontrado');
  }

  await this.planoRepository.atualizarPlano(codigoPlano, custoMensal);

  return { mensagem: 'Plano atualizado com sucesso' };
}
  // Assinaturas

  criarAssinatura(
    codCli: number,
    codPlano: number,
    custoFinal: number,
    descricao: string,
  ) {
    const inicio = new Date();
    const fim = new Date();
    fim.setFullYear(fim.getFullYear() + 1);

    const novaAssinatura = {
      codigoPlano: codPlano,
      codigoCli: codCli,
      custoFinal: custoFinal,
      descricao: descricao,
      inicioFidelidade: inicio,
      fimFidelidade: fim,
      dataUltimoPagamento: new Date(),
    };

    return this.assinaturaRepository.salvar(novaAssinatura as Assinatura);
  }

  async listarAssinaturas(tipo: string) {
    const dataAtual = new Date();
    const assinaturas = await this.assinaturaRepository.listar();

    const statusDeAssinatura = assinaturas.map((a) => {
      const dataPagamento = new Date(a.dataUltimoPagamento);

      const diffEmMs = dataAtual.getTime() - dataPagamento.getTime();
      const diffEmDias = diffEmMs / (1000 * 60 * 60 * 24);
      const status = diffEmDias <= 30 ? 'ativa' : 'cancelada';

      return {
        ...a,
        status,
      };
    });

    tipo = tipo.toUpperCase();

    if (tipo === 'TODOS') {
      return statusDeAssinatura;
    }

    if (tipo === 'ATIVA' || tipo === 'ATIVOS') {
      return statusDeAssinatura.filter((a) => a.status === 'ativa');
    }

    if (tipo === 'CANCELADA' || tipo === 'CANCELADOS') {
      return statusDeAssinatura.filter((a) => a.status === 'cancelada');
    }

    return [];
  }

  async assinaturasCliente(codcli: number) {
    return this.assinaturaRepository.buscarPorCliente(codcli);
  }

  async assinaturasPlano(codplano: number) {
    return this.assinaturaRepository.buscarPorPlano(codplano);
  }
}
