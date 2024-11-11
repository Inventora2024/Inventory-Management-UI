import { Component, OnInit, ApplicationRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';
import { SharedModule } from '../../../modules/shared.module';
import { OrdersService } from '../../../services/order-service/orders.service';
import { CreateOrderEventService } from '../../../services/create-order-event/create-order-event.service';
import {
  StockOrderProducts,
  StockOrderItem,
} from '../../../models/stock-order-products.model';

@Component({
  selector: 'app-display-order',
  standalone: true,
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.css'],
  imports: [SharedModule],
  providers: [OrdersService],
})
export class DisplayOrderComponent implements OnInit {
  orders: StockOrderProducts[] = [];
  selectedOrder: StockOrderProducts | undefined;

  constructor(
    private ordersService: OrdersService,
    private modalService: NgbModal,
    private createOrderEventService: CreateOrderEventService,
    private appRef: ApplicationRef // Inject ApplicationRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.createOrderEventService.orderCreated$.subscribe(() => {
      this.loadOrders(); // Reload orders when event is emitted
      this.appRef.tick(); // Manually trigger change detection across the application
      console.log('Order created event received'); // Debugging line
    });
  }

  loadOrders(): void {
    this.ordersService.getStockOrderProducts().subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Orders loaded', data);
      },
      error: (error) => {
        console.error('Error fetching stock order products', error);
      },
    });
  }

  openModal(order: StockOrderProducts): void {
    this.selectedOrder = order;
    const modalElement = document.getElementById('orderModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
