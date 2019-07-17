import { TestBed } from '@angular/core/testing';

import { AnaliticaService } from './analitica.service';

describe('AnaliticaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnaliticaService = TestBed.get(AnaliticaService);
    expect(service).toBeTruthy();
  });
});
