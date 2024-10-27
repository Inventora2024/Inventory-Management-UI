import { NgModule, Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/product-service/products.service';
import { Product } from '../../models/product.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  faPlus = faPlus;

  products: Product[] = [];
  selectedProduct: Product | undefined;

  constructor(
    private productsService: ProductsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
