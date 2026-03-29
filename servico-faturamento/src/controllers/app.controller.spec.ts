import { Test, TestingModule } from '@nestjs/testing';
import { ServicoFaturamentoController } from './faturamento.controller';
import { FaturamentoService } from '../application/services/faturamento.service';

describe('FaturamentoController', () => {
  let appController: ServicoFaturamentoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServicoFaturamentoController],
      providers: [FaturamentoService],
    }).compile();

    appController = app.get<ServicoFaturamentoController>(ServicoFaturamentoController);
  });
});