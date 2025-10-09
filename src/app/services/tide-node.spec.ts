import { TestBed } from '@angular/core/testing';

import { TideNode } from './tide-node';

describe('TideNode', () => {
  let service: TideNode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TideNode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
