import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import axios from 'axios';

@Controller('gerenciaplanos/assinaturas')
export class AssinaturasController {
  private baseUrl = 'http://localhost:3001/gerenciaplanos/assinaturas';

  @Post()
  async criar(@Body() body: any) {
    const { data } = await axios.post(this.baseUrl, body);
    return data;
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const { data } = await axios.get(`${this.baseUrl}/${id}`);
    return data;
  }
}