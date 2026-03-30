import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BrokerService {
  async publicarPagamento(payload: any) {
    await Promise.all([
      this.enviar('http://localhost:3000/evento-pagamento', payload),
      this.enviar('http://localhost:3002/evento-pagamento', payload),
    ]);
  }

  private async enviar(url: string, payload: any) {
    try {
      await axios.post(url, payload);
    } catch (error) {
      console.log(`Erro ao enviar evento para ${url}`, error.message);
    }
  }
}