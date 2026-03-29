import { Controller, Get, Post, Patch , Param , Body } from '@nestjs/common';
import { AppService } from '../application/app.service';

@Controller('gerenciaplanos') 

export class GestaoController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServicoGestao(): string {
    return this.appService.getServicoGestao();
  }

// Endpoint para listar clientes 
  @Get('clientes')
  async listarClientes() {
  return await this.appService.listarClientes();
}

// Endpoint para listar planos 
  @Get('planos')
  listarPlanos(){
    return this.appService.listarPlanos()
  }

// Endpoint para criar assinatura 
  @Post('assinaturas')
  criarAssinatura(
  @Body('codCli') codCli: number,
  @Body('codPlano') codPlano: number,
  @Body('custoFinal') custoFinal: number,
  @Body('descricao') descricao: string,
) {
    return this.appService.criarAssinatura(codCli, codPlano, custoFinal, descricao);
  }

  // Endpoint para atualizar custo mensal do plano
  @Patch('planos/:codigoPlano')
  atualizarPlano(
    @Param('codigoPlano') codigoPlano: string,
    @Body('custoMensal') custoMensal: string,
  ){
    return this.appService.atualizarPlano(Number(codigoPlano), Number(custoMensal));
  }

  // Endpoint para listar assinaturas por tipo 
  @Get('assinaturas/:tipo')
  listarAssinaturas(
    @Param('tipo') tipo:string
  ) {
    return this.appService.listarAssinaturas(tipo);
  } 

  // Endpoint para listar assinaturas por cliente 
  @Get('assinaturascliente/:codcli')
  assinaturasCliente(
    @Param('codcli') codcli: string
  ) {
    return this.appService.assinaturasCliente(Number(codcli));
  }

  // Endpoint para listar assinaturas por plano 
  @Get('assinaturaplano/:codplano')
  assinaturasPlano(
    @Param('codplano') codplano: string
  ) {
    return this.appService.assinaturasPlano((Number(codplano)));
  }

}
