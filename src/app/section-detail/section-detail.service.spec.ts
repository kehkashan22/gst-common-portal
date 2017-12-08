import { TestBed, inject } from '@angular/core/testing';

import { SectionDetailService } from './section-detail.service';

describe('SectionDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionDetailService]
    });
  });

  it('should be created', inject([SectionDetailService], (service: SectionDetailService) => {
    expect(service).toBeTruthy();
  }));
});
