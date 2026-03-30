import { Module } from '@nestjs/common';
import { PlanosAtivosController} from './controllers/planos-ativos.controller';
import { PlanosAtivosService } from './application/services/planos-ativos.service';

@Module({
  imports: [],
  controllers: [PlanosAtivosController],
  providers: [PlanosAtivosService],
})
export class AppModule {}
