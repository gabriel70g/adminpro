import { TestBed } from '@angular/core/testing';

import { SubirArchivoService } from './subir-archivo.service';

describe('SubirArchivosService', () => {
  let service: SubirArchivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
