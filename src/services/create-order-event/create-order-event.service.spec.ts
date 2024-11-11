import { TestBed } from '@angular/core/testing';

import { CreateOrderEventService } from './create-order-event.service';

describe('CreateOrderEventService', () => {
  let service: CreateOrderEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrderEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
