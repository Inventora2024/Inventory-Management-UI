import { NgModule, Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ProductsService } from '../../services/product-service/products.service';
import { ProductCategorySupplierDetails } from '../../models/product-category-supplier.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  providers: [ProductsService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  faPlus = faPlus;
  productsWithDetails: ProductCategorySupplierDetails[] = [];
  selectedProduct: ProductCategorySupplierDetails | undefined;
  imagePathDefault = '../../assets/Images/product-images/';
  placeholderImage = '../../assets/Images/product-images/not-found.jpg'; // Path to your placeholder image

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getProductsWithDetails()
      .subscribe((data: ProductCategorySupplierDetails[]) => {
        this.productsWithDetails = data.map((product) => ({
          ...product,
          image: this.imagePathDefault + product.image,
        }));
      });
  }

  openModal(product: ProductCategorySupplierDetails): void {
    this.selectedProduct = product;
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.placeholderImage; // Replace with placeholder image
  }
}
