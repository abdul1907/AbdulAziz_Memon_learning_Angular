import { TestBed } from '@angular/core/testing';

import { TideNodeService } from './tide-node';

describe('TideNode', () => {
  let service: TideNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TideNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
