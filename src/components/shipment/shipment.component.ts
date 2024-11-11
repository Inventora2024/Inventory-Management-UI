import { Component, OnInit, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentsService } from '../../services/shipment-service/shipments.service';
import { OrdersService } from '../../services/order-service/orders.service';
import { Shipment, OnlyShipment } from '../../models/shipment.model';
import { StockOrderProducts } from '../../models/stock-order-products.model';
import { SharedModule } from '../../modules/shared.module';
import * as bootstrap from 'bootstrap';
import {
  faSortUp,
  faSortDown,
  faSort,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shipment',
  standalone: true,
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule, SharedModule],
  providers: [ShipmentsService, OrdersService],
})
export class ShipmentComponent implements OnInit {
  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  selectedOrder: StockOrderProducts | undefined;
  sortColumn: keyof Shipment | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Font Awesome icons
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faSave = faSave;

  constructor(
    private modalService: NgbModal,
    private shipmentsService: ShipmentsService,
    private ordersService: OrdersService,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentsService.getShipments().subscribe({
      next: (data) => {
        this.shipments = data;
        this.filteredShipments = data;
      },
      error: (error) => {
        console.error('Error fetching shipments', error);
      },
    });
  }

  sortBy(column: keyof Shipment): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredShipments.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  updateStatus(shipment: Shipment, status: string): void {
    shipment.status = status;
    shipment.lastUpdated = new Date(); // Update the lastUpdated field with the current date and time
  }

  saveShipment(shipment: Shipment): void {
    const updatedShipment: OnlyShipment = {
      shipmentId: shipment.shipmentId,
      status: shipment.status,
      lastUpdated: shipment.lastUpdated,
      stockOrderId: shipment.stockOrderId,
    };

    this.shipmentsService.updateShipment(updatedShipment).subscribe({
      next: () => {
        console.log('Shipment status updated successfully');
      },
      error: (error) => {
        console.error('Error updating shipment status', error);
      },
    });
  }

  openModal(orderId: number): void {
    this.ordersService.getStockOrderProducts().subscribe({
      next: (data) => {
        this.selectedOrder = data.find(
          (order) => order.stockOrderId === orderId
        );
        if (this.selectedOrder) {
          const modalElement = document.getElementById('orderModal');
          console.log(this.selectedOrder);
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }
        }
      },
      error: (error) => {
        console.error('Error fetching order details', error);
      },
    });
  }

  getSortIcon(column: string): any {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? faSortUp : faSortDown;
    }
    return faSort;
  }
}
