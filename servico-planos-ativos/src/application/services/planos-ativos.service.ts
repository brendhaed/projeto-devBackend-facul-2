import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanosAtivosService {
  private cache = new Map<number, boolean>();

  async isAtivo(codigoAssinatura: number): Promise<boolean> {
  if (this.cache.has(codigoAssinatura)) {
    return this.cache.get(codigoAssinatura)!;
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/gerenciaplanos/assinatura/${codigoAssinatura}`
    );

    const ativo = response.data.ativo;

    this.cache.set(codigoAssinatura, ativo);

    return ativo;
  } catch (error) {
    console.error('Erro ao verificar plano ativo:', error);
    return false;
  }
}

  removerDoCache(codigoAssinatura: number) {
    this.cache.delete(codigoAssinatura);
  }
}
