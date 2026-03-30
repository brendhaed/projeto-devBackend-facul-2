import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanosAtivosService {
  private planosAtivos = new Map<number, boolean>();

  ativarPlano(codigoAssinatura: number) {
    this.planosAtivos.set(codigoAssinatura, true);
  }

  desativarPlano(codigoAssinatura: number) {
    this.planosAtivos.set(codigoAssinatura, false);
  }

  isAtivo(codigoAssinatura: number): boolean {
    return this.planosAtivos.get(codigoAssinatura) === false;
  }
}
