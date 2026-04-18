import { Controller, Get, Param } from '@nestjs/common';
import axios from 'axios';

@Controller('planosativos')
export class PlanosController {
  private baseUrl = 'http://localhost:3003/planosativos';

  @Get(':codAss')
  async verificar(@Param('codAss') codAss: string) {
    const { data } = await axios.get(`${this.baseUrl}/${codAss}`);
    return data;
  }

}
 