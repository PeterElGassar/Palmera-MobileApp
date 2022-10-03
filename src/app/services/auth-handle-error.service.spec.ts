import { TestBed } from '@angular/core/testing';

import { AuthHandleErrorService } from './auth-handle-error.service';

describe('AuthHandleErrorService', () => {
  let service: AuthHandleErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
