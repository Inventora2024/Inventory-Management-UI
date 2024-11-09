import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/product-service/products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ProductWithCategory } from '../../models/product-with-category.model';

type FilterField = 'productName' | 'category' | 'stockQuantity';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [ProductsService],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  products: ProductWithCategory[] = [];
  filteredProducts: ProductWithCategory[] = [];
  dropdownProducts: ProductWithCategory[] = []; // Secondary list for dropdown checkboxes
  uniqueCategories: string[] = []; // Unique categories list
  filter = {
    productName: [] as string[],
    stockQuantity: { min: null as number | null, max: null as number | null },
    category: [] as string[],
  };
  selectedProductNames: { [key: string]: boolean } = {};
  selectedCategories: { [key: string]: boolean } = {};
  sortOrder = 'asc';
  sortField: string | null = null;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faFilter = faFilter;
  faTimes = faTimes;
  showFilterDropdown: { [key in FilterField]: boolean } = {
    productName: false,
    stockQuantity: false,
    category: false,
  };

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProductsWithCategory().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      this.dropdownProducts = data; // Initialize secondary list
      this.uniqueCategories = [
        ...new Set(data.map((product) => product.category)),
      ]; // Get unique categories
    });
  }

  applyFilter(): void {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.filter.productName.length
          ? this.filter.productName.some((name) =>
              product.productName.toLowerCase().includes(name.toLowerCase())
            )
          : true) &&
        (this.filter.stockQuantity.min !== null
          ? product.stockQuantity >= this.filter.stockQuantity.min
          : true) &&
        (this.filter.stockQuantity.max !== null
          ? product.stockQuantity <= this.filter.stockQuantity.max
          : true) &&
        (this.filter.category.length
          ? this.filter.category.some((cat) => product.category.includes(cat))
          : true)
      );
    });
    if (this.sortField) {
      this.sort(this.sortField);
    }
  }

  onDropdownInputChange(field: 'productName' | 'category', event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dropdownProducts = this.products.filter((product) =>
      product[field].toLowerCase().includes(input.value.toLowerCase())
    ); // Update secondary list based on input
  }

  onStockInputChange(type: 'min' | 'max', event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value ? parseInt(input.value, 10) : null;
    if (type === 'min') {
      this.filter.stockQuantity.min = value;
    } else {
      this.filter.stockQuantity.max = value;
    }
    this.applyFilter();
  }

  onCheckboxChange(
    field: 'productName' | 'category',
    value: string,
    event: Event
  ): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (isChecked) {
      (this.filter[field] as string[]).push(value);
    } else {
      const index = (this.filter[field] as string[]).indexOf(value);
      if (index > -1) {
        (this.filter[field] as string[]).splice(index, 1);
      }
    }
    this.applyFilter();
    this.updateDropdownLists();
  }

  clearFilters(field: 'productName' | 'category'): void {
    this.filter[field] = [];
    this.applyFilter();
    if (field === 'productName') {
      Object.keys(this.selectedProductNames).forEach(
        (key) => (this.selectedProductNames[key] = false)
      );
    } else if (field === 'category') {
      Object.keys(this.selectedCategories).forEach(
        (key) => (this.selectedCategories[key] = false)
      );
    }
    this.updateDropdownLists();
  }

  updateDropdownLists(): void {
    if (this.filter.productName.length > 0) {
      const filteredCategories = new Set(
        this.products
          .filter((product) =>
            this.filter.productName.includes(product.productName)
          )
          .map((product) => product.category)
      );
      this.uniqueCategories = Array.from(filteredCategories);
    } else {
      this.uniqueCategories = [
        ...new Set(this.products.map((product) => product.category)),
      ];
    }

    if (this.filter.category.length > 0) {
      this.dropdownProducts = this.products.filter((product) =>
        this.filter.category.includes(product.category)
      );
    } else {
      this.dropdownProducts = this.products;
    }
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
      this.sortField = field;
    }
    this.filteredProducts.sort((a, b) => {
      const aField = a[field as keyof ProductWithCategory];
      const bField = b[field as keyof ProductWithCategory];
      if (aField < bField) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (aField > bField) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortIcon(field: string): any {
    if (this.sortField === field) {
      return this.sortOrder === 'asc' ? this.faSortUp : this.faSortDown;
    } else {
      return this.faSort;
    }
  }

  toggleDropdown(field: FilterField): void {
    this.showFilterDropdown[field] = !this.showFilterDropdown[field];
  }
}
