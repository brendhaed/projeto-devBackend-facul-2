import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { FaturamentoService } from './application/services/faturamento.service';
import { Pagamento } from './infrastructure/entities/Pagamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoRepositoryORM } from './infrastructure/repositories/pagamento.repository.orm';
import { ServicoFaturamentoController } from './controllers/app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

dotenv.config();

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Pagamento],
      synchronize: true,
    }),
  ],
  controllers: [ServicoFaturamentoController],
  providers: [FaturamentoService, PagamentoRepositoryORM],
})
export class AppModule {}
 