import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { DisplayOrderComponent } from './display-order/display-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule, DisplayOrderComponent, CreateOrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {}
