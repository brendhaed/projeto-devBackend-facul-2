import { Controller, Get, Post, Patch , Param , Body } from '@nestjs/common';
import { AppService } from '../application/services/app.service';
import { AssinaturaService } from '../application/services/assinatura.service';


@Controller('gerenciaplanos') 

export class GestaoController {
  constructor(
    private readonly appService: AppService,
    private readonly assinaturaService: AssinaturaService,
  ) {}


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

  // Endpoind para receber evento
  @Post('evento-pagamento')
  async receberEventoPagamento(@Body() data: any) {
    const { dia, mes, ano, codAss, valorPago } = data;
    const dataPagamento = new Date(ano, mes - 1, dia);
    const codigoAssinatura = codAss;
    await this.assinaturaService.confirmarPagamento(
      codigoAssinatura,
      valorPago,
      dataPagamento,
    );
    return  { message: 'Evento de pagamento recebido e processado com sucesso' };
  }

  // Endpoint para listar assinaturas ativas
  @Get('assinatura/:codAss')
async verificarAssinatura(@Param('codAss') codAss: string) {
  return await this.assinaturaService.verificarAtivo(Number(codAss));
}
}
