import { Test, TestingModule } from '@nestjs/testing';
import { KolController } from './kol.controller';
import { KolService } from './kol.service';

describe('KolController', () => {
  let controller: KolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KolController],
      providers: [KolService],
    }).compile();

    controller = module.get<KolController>(KolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
