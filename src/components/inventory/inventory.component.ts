import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product-service/products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

type FilterField = 'name' | 'description' | 'stock' | 'category';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [ProductsService],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  dropdownProducts: Product[] = []; // Secondary list for dropdown checkboxes
  uniqueCategories: string[] = []; // Unique categories list
  filter = {
    name: [] as string[],
    description: [] as string[],
    stock: { min: null, max: null },
    category: [] as string[],
  };
  sortOrder = 'asc';
  sortField: string | null = null;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faFilter = faFilter;
  showFilterDropdown: { [key in FilterField]: boolean } = {
    name: false,
    description: false,
    stock: false,
    category: false,
  };

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      this.dropdownProducts = data; // Initialize secondary list
      this.uniqueCategories = [
        ...new Set(data.map((product) => product.category.toLowerCase())),
      ]; // Get unique categories
    });
  }

  applyFilter(): void {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.filter.name.length
          ? this.filter.name.some((name) =>
              product.name.toLowerCase().includes(name.toLowerCase())
            )
          : true) &&
        (this.filter.description.length
          ? this.filter.description.some((desc) =>
              product.description.toLowerCase().includes(desc.toLowerCase())
            )
          : true) &&
        (this.filter.stock.min !== null
          ? product.stock >= this.filter.stock.min
          : true) &&
        (this.filter.stock.max !== null
          ? product.stock <= this.filter.stock.max
          : true) &&
        (this.filter.category.length
          ? this.filter.category.some((cat) =>
              product.category.toLowerCase().includes(cat.toLowerCase())
            )
          : true)
      );
    });
    if (this.sortField) {
      this.sort(this.sortField);
    }
  }

  onInputChange(
    field: 'name' | 'description' | 'category',
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    if (field === 'category') {
      this.uniqueCategories = [
        ...new Set(
          this.products
            .filter((product) =>
              product.category.toLowerCase().includes(input.value.toLowerCase())
            )
            .map((product) => product.category.toLowerCase())
        ),
      ];
    } else {
      this.dropdownProducts = this.products.filter((product) =>
        product[field].toLowerCase().includes(input.value.toLowerCase())
      ); // Update secondary list based on input
    }
  }

  onCheckboxChange(
    field: 'name' | 'description' | 'category',
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
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
      this.sortField = field;
    }
    this.filteredProducts.sort((a, b) => {
      const aField = a[field as keyof Product];
      const bField = b[field as keyof Product];
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
