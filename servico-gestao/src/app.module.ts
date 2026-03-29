import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestaoController } from './controllers/app.controller';
import { AppService } from './application/app.service';
import { AssinaturaRepositoryORM } from './infrastructure/repositories/assinatura.repository.orm';
import { ClienteRepositoryORM } from './infrastructure/repositories/cliente.repository.orm';
import { PlanoRepositoryORM } from './infrastructure/repositories/plano.repository.orm';
import { Seed } from './seed/seed';
import { Cliente } from './infrastructure/entities/cliente.entity';
import { Plano } from './infrastructure/entities/plano.entity';
import { Assinatura } from './infrastructure/entities/assinatura.entity';

dotenv.config();

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Assinatura, Cliente, Plano],
      synchronize: true,
    }),
     TypeOrmModule.forFeature([Assinatura, Cliente, Plano]),
  ],
  controllers: [GestaoController],
  providers: [
    AppService,
    AssinaturaRepositoryORM,
    ClienteRepositoryORM,
    PlanoRepositoryORM,
    Seed,
  ],
})
export class AppModule {}