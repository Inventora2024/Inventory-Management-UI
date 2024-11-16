import { Component, OnInit } from '@angular/core';
import { CommonModule, getLocaleDateTimeFormat } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/product-service/products.service';
import { OrdersService } from '../../../services/order-service/orders.service';
import { CreateOrderEventService } from '../../../services/create-order-event/create-order-event.service';
import { ProductCategorySupplierDetails } from '../../../models/product-category-supplier.model';
import {
  CreateOrder,
  CreateOrderItem,
} from '../../../models/create-order.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import {DateTime} from 'luxon';


interface OrderItem {
  productId: number;
  quantity: number;
  supplier: string;
  suppliers: string[];
}

@Component({
  selector: 'app-create-order',
  standalone: true,
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  providers: [ProductsService, OrdersService, CreateOrderEventService],
})
export class CreateOrderComponent implements OnInit {
  products: ProductCategorySupplierDetails[] = [];
  orderItems: OrderItem[] = [
    { productId: 0, quantity: 1, supplier: '', suppliers: [] },
  ];
  submissionSuccess = false;
  submissionError = false;

  faPlus = faPlus;
  faTimes = faTimes;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private createOrderEventService: CreateOrderEventService
  ) {}

  ngOnInit(): void {
    this.productsService.getProductsWithDetails().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products with details', error);
      },
    });
  }

  addItem(): void {
    this.orderItems.push({
      productId: 0,
      quantity: 1,
      supplier: '',
      suppliers: [],
    });
  }

  removeItem(index: number): void {
    this.orderItems.splice(index, 1);
  }

  onProductChange(index: number): void {
    this.orderItems[index].productId = Number(this.orderItems[index].productId);

    const selectedProduct = this.products.find(
      (p) => p.productId === this.orderItems[index].productId
    );
    this.orderItems[index].suppliers = selectedProduct
      ? selectedProduct.suppliers
      : [];
    this.orderItems[index].supplier = '';
  }

  onQuantityChange(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.orderItems[index].quantity = Number(input.value);
  }

  onSubmit(orderForm: NgForm): void {
    if (orderForm.valid) {
      const localOrderDate = DateTime.local().toISO()
      const createOrder: CreateOrder = {
        orderDate: localOrderDate,
        orderItems: this.orderItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      this.ordersService.createOrder(createOrder).subscribe({
        next: (response) => {
          this.submissionSuccess = true;
          this.submissionError = false;
          this.resetForm(orderForm);
          this.createOrderEventService.emitOrderCreated();
          console.log('Order successfully submitted', response);
        },
        error: (error) => {
          this.submissionSuccess = false;
          this.submissionError = true;
          console.error('Error submitting order', error);
        },
      });
    } else {
      this.submissionError = true;
      this.submissionSuccess = false;
      console.error('Form is invalid');
    }
  }

  resetForm(orderForm: NgForm): void {
    orderForm.resetForm();
    this.orderItems = [
      { productId: 0, quantity: 1, supplier: '', suppliers: [] },
    ];
  }

  closeAlert(): void {
    this.submissionSuccess = false;
    this.submissionError = false;
  }
}
