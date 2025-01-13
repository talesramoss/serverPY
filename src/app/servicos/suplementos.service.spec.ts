import { TestBed } from '@angular/core/testing';

import { SuplementosService } from './suplementos.service';

describe('SuplementosService', () => {
  let service: SuplementosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuplementosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
