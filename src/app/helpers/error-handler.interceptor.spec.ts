import { TestBed } from '@angular/core/testing';
import {ErrorInterceptor} from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
