import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/product-service/products.service';
import { SalesService } from '../../../services/sale-service/sales.service';
import { CreateOrderEventService } from '../../../services/create-order-event/create-order-event.service';
import { ProductCategorySupplierDetails } from '../../../models/product-category-supplier.model';
import { CreateSale, CreateSaleItem } from '../../../models/create-sale.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SaleItem {
  productId: number;
  quantity: number;
}

@Component({
  selector: 'app-create-sale',
  standalone: true,
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css'],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  providers: [ProductsService, SalesService, CreateOrderEventService],
})
export class CreateSaleComponent implements OnInit {
  products: ProductCategorySupplierDetails[] = [];
  saleItems: SaleItem[] = [{ productId: 0, quantity: 1 }];
  saleDate: string = '';
  submissionSuccess = false;
  submissionError = false;

  faPlus = faPlus;
  faTimes = faTimes;

  constructor(
    private productsService: ProductsService,
    private salesService: SalesService,
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
    this.saleItems.push({ productId: 0, quantity: 1 });
  }

  removeItem(index: number): void {
    this.saleItems.splice(index, 1);
  }

  onProductChange(index: number): void {
    this.saleItems[index].productId = Number(this.saleItems[index].productId);
  }

  onQuantityChange(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.saleItems[index].quantity = Number(input.value);
  }

  onSubmit(saleForm: NgForm): void {
    if (saleForm.valid) {
      const createSale: CreateSale = {
        orderDate: new Date(), // Use the current system date and time
        saleItems: this.saleItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      console.log('Submitting sale:', createSale); // Log the payload

      this.salesService.createSale(createSale).subscribe({
        next: (response) => {
          this.submissionSuccess = true;
          this.submissionError = false;
          this.resetForm(saleForm);
          this.createOrderEventService.emitOrderCreated();
          console.log('Sale successfully submitted', response);
        },
        error: (error) => {
          this.submissionSuccess = false;
          this.submissionError = true;
          console.error('Error submitting sale', error);
        },
      });
    } else {
      this.submissionError = true;
      this.submissionSuccess = false;
      console.error('Form is invalid');
    }
  }

  resetForm(saleForm: NgForm): void {
    saleForm.resetForm();
    this.saleDate = '';
    this.saleItems = [{ productId: 0, quantity: 1 }];
  }

  closeAlert(): void {
    this.submissionSuccess = false;
    this.submissionError = false;
  }
}