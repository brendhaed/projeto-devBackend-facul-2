import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AssinaturasController } from './assinaturas/assinatura.controller';
import { FaturamentoController } from './faturamento/faturamento.controller';
import { PlanosController } from './planos/planos.controller';
import { GerenciaPlanosController } from './gerencia-planos/gerenciaplanos.controller';

@Module({
  imports: [],
  controllers: [
    GerenciaPlanosController,
    AssinaturasController,
    FaturamentoController,
    PlanosController,
  ],
  providers: [AppService],
})
export class AppModule {}
