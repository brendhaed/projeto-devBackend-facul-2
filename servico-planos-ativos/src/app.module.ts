import { Module } from '@nestjs/common';
import { PlanosAtivosController} from './controllers/planos-ativos.controller';
import { PlanosAtivosService } from './application/services/planos-ativos.service';
import { EventoController } from './controllers/evento.controller';

@Module({
  imports: [],
  controllers: [PlanosAtivosController, EventoController],
  providers: [PlanosAtivosService],
})
export class AppModule {}
