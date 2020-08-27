import { TestBed } from '@angular/core/testing';

import { ShowTimelineService } from './show-timeline.service';

describe('ShowTimelineService', () => {
  let service: ShowTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
