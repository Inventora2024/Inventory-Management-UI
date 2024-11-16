import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data/get-data.service';
import {
  User,
  Supplier,
  Product,
  ProductCategory,
  StockOrder,
  StockOrderItem,
  CustomerOrder,
  CustomerOrderItem,
  Shipment,
} from '../../models/allModel.model';

// Import ngx-charts components and modules
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [GetDataService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [NgxChartsModule], // Add necessary modules to the component's imports
})
export class DashboardComponent implements OnInit {
  // Variables to store data
  products: Product[] = [];
  shipments: Shipment[] = [];
  stockOrderItems: StockOrderItem[] = [];
  customerOrderItems: CustomerOrderItem[] = [];
  lowStockCount: number = 0;
  maxSoldProduct: Product | null = null;
  totalStockQuantity: number = 0;
  unsoldProductsCount: number = 0;
  productStockData: { name: string; value: number }[] = [];

  // Shipment status counts
  orderConfirmedCount: number = 0;
  shippedCount: number = 0;
  outForDeliveryCount: number = 0;
  deliveredCount: number = 0;

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.getDataService.getProducts().subscribe((data) => {
      this.products = data;
      this.calculateStockDetails();
      this.prepareChartData();
    });

    this.getDataService.getShipments().subscribe((data) => {
      this.shipments = data;
      this.calculateShipmentStatus();
    });

    this.getDataService.getStockOrderItems().subscribe((data) => {
      this.stockOrderItems = data;
      this.calculateShipmentStatus();
    });

    this.getDataService.getCustomerOrderItems().subscribe((data) => {
      this.customerOrderItems = data;
      this.calculateMaxSoldProduct();
    });
  }

  calculateStockDetails(): void {
    this.lowStockCount = this.products.filter(
      (p) => p.stockQuantity < 10
    ).length;
    this.totalStockQuantity = this.products.reduce(
      (sum, p) => sum + p.stockQuantity,
      0
    );
    this.unsoldProductsCount = this.products.filter(
      (p) => p.stockQuantity > 0
    ).length;
  }

  calculateMaxSoldProduct(): void {
    const productSalesMap = new Map<number, number>();

    this.customerOrderItems.forEach((item) => {
      if (productSalesMap.has(item.productId)) {
        productSalesMap.set(
          item.productId,
          productSalesMap.get(item.productId)! + item.quantity
        );
      } else {
        productSalesMap.set(item.productId, item.quantity);
      }
    });

    let maxQuantity = 0;
    let maxProductId: number | null = null;

    productSalesMap.forEach((quantity, productId) => {
      if (quantity > maxQuantity) {
        maxQuantity = quantity;
        maxProductId = productId;
      }
    });

    this.maxSoldProduct =
      this.products.find((p) => p.productId === maxProductId) || null;
  }

  calculateShipmentStatus(): void {
    const productStatusMap: Record<string, number> = {
      'Order Confirmed': 0,
      Shipped: 0,
      'Out For Delivery': 0,
      Delivered: 0,
    };

    this.shipments.forEach((shipment) => {
      const stockOrderItemsForShipment = this.stockOrderItems.filter(
        (item) => item.stockOrderId === shipment.stockOrderId
      );
      stockOrderItemsForShipment.forEach((item) => {
        if (productStatusMap[shipment.status] !== undefined) {
          productStatusMap[shipment.status] += item.quantity;
        }
      });
    });

    this.orderConfirmedCount = productStatusMap['Order Confirmed'];
    this.shippedCount = productStatusMap['Shipped'];
    this.outForDeliveryCount = productStatusMap['Out For Delivery'];
    this.deliveredCount = productStatusMap['Delivered'];
  }

  prepareChartData(): void {
    this.productStockData = this.products.map((p) => ({
      name: p.productName,
      value: p.stockQuantity,
    }));
  }

  xAxisTickFormatting(): string {
    return ''; // Return empty string to hide x-axis labels
  }
}
