import { TestBed } from '@angular/core/testing';

import { PlayPauseService } from './play-pause.service';

describe('PlayPauseService', () => {
  let service: PlayPauseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayPauseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
