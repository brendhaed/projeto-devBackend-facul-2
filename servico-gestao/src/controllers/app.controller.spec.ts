import { Test, TestingModule } from '@nestjs/testing';
import { GestaoController } from './app.controller';
import { AppService } from '../application/app.service';

describe('GestaoController', () => {
  let gestaoController: GestaoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GestaoController],
      providers: [AppService],
    }).compile();

    gestaoController = app.get<GestaoController>(GestaoController);
  });

});
