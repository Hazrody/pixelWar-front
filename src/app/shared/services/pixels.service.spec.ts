import { TestBed } from '@angular/core/testing';

import { PixelsService } from './pixels.service';

describe('PixelsService', () => {
  let service: PixelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
