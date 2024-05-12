import { Test, TestingModule } from '@nestjs/testing';
import { KolService } from './kol.service';

describe('KolService', () => {
  let service: KolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KolService],
    }).compile();

    service = module.get<KolService>(KolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
