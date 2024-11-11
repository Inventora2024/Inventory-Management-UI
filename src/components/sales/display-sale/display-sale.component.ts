import { Component, OnInit, ApplicationRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';
import { SharedModule } from '../../../modules/shared.module';
import { SalesService } from '../../../services/sale-service/sales.service';
import { CreateOrderEventService } from '../../../services/create-order-event/create-order-event.service';
import {
  CustomerOrderProducts,
  CustomerOrderItem,
} from '../../../models/customer-order-products.model';

@Component({
  selector: 'app-display-sale',
  standalone: true,
  templateUrl: './display-sale.component.html',
  styleUrls: ['./display-sale.component.css'],
  imports: [SharedModule],
  providers: [SalesService],
})
export class DisplaySaleComponent implements OnInit {
  sales: CustomerOrderProducts[] = [];
  selectedSale: CustomerOrderProducts | undefined;

  constructor(
    private salesService: SalesService,
    private modalService: NgbModal,
    private createOrderEventService: CreateOrderEventService,
    private appRef: ApplicationRef // Inject ApplicationRef
  ) {}

  ngOnInit(): void {
    this.loadSales();
    this.createOrderEventService.orderCreated$.subscribe(() => {
      this.loadSales(); // Reload sales when event is emitted
      this.appRef.tick(); // Manually trigger change detection across the application
      console.log('Sale created event received'); // Debugging line
    });
  }

  loadSales(): void {
    this.salesService.getCustomerOrderProducts().subscribe({
      next: (data) => {
        this.sales = data;
        console.log('Sales loaded', data);
      },
      error: (error) => {
        console.error('Error fetching customer order products', error);
      },
    });
  }

  openModal(sale: CustomerOrderProducts): void {
    this.selectedSale = sale;
    const modalElement = document.getElementById('saleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
