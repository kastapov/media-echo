import { TestBed } from '@angular/core/testing';

import { PageExtractorService } from './page-extractor.service';

describe('PageExtractorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageExtractorService = TestBed.get(PageExtractorService);
    expect(service).toBeTruthy();
  });
});
