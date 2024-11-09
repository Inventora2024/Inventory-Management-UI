import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';
import { SharedModule } from '../../../modules/shared.module';
import { OrdersService } from '../../../services/order-service/orders.service';
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
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.ordersService.getStockOrderProducts().subscribe({
      next: (data) => {
        this.orders = data;
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
