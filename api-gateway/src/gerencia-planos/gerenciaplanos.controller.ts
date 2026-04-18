import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('gerenciaplanos')
export class GerenciaPlanosController {

  // serviços
  private gestaoUrl = 'http://localhost:3001';

  // clientes
  @Get('clientes')
  async listarClientes() {
    const { data } = await axios.get(`${this.gestaoUrl}/gerenciaplanos/clientes`);
    return data;
  }

  // planos
  @Get('planos')
  async listarPlanos() {
    const { data } = await axios.get(`${this.gestaoUrl}/gerenciaplanos/planos`);
    return data;
  }

  @Patch('planos/:id')
  async atualizarPlano(@Param('id') id: string, @Body() body: any) {
    const { data } = await axios.patch(`${this.gestaoUrl}/gerenciaplanos/planos/${id}`, body);
    return data;
  }

  // assinaturas
  @Post('assinaturas')
  async criarAssinatura(@Body() body: any) {
    const { data } = await axios.post(`${this.gestaoUrl}/gerenciaplanos/assinaturas`, body);
    return data;
  }

  // listar assinaturas por tipo (ativas, canceladas, etc)
  @Get('assinaturas/:tipo')
  async listarAssinaturas(@Param('tipo') tipo: string) {
    const { data } = await axios.get(`${this.gestaoUrl}/gerenciaplanos/assinaturas/${tipo}`);
    return data;
  }

  // assinaturas por cliente 
  // @Get('asscli/:id')
  // getAssinaturasPorCliente(@Param('id') id: string) {
  //   return this.service.buscarPorCliente(Number(id));
  // }

  // assinaturas por plano
  @Get('assinaturaplano/:codplano')
  async assinaturasPorPlano(@Param('codplano') codplano: string) {
    const { data } = await axios.get(`${this.gestaoUrl}/gerenciaplanos/assinaturaplano/${codplano}`);
    return data;
  }
}