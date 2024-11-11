import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderEventService {
  private orderCreatedSource = new Subject<void>();

  orderCreated$ = this.orderCreatedSource.asObservable();

  emitOrderCreated(): void {
    this.orderCreatedSource.next();
  }
}
