import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class FaturamentoController {
  private faturamentoUrl = 'http://localhost:3002';

  @Post('registrarpagamento')
  async registrar(@Body() body: any) {
    const { data } = await axios.post(`${this.faturamentoUrl}/registrarpagamento`, body);
    return data;
  }
} 