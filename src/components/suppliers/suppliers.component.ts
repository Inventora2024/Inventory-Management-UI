import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../models/supplier.model';
import { SuppliersService } from '../../services/supplier-service/suppliers.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../modules/shared.module';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  imports: [SharedModule],
  providers: [SuppliersService],
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  selectedSupplier: Supplier = {
    supplierId: 0,
    company: '',
    description: '',
    address: '',
    spocEmail: '',
    spocContact: '',
  };
  supplierForm: FormGroup;
  private modalRef: NgbModalRef | null = null;

  constructor(
    private suppliersService: SuppliersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faEdit);

    this.supplierForm = this.fb.group({
      company: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      spocEmail: ['', [Validators.required, Validators.email]],
      spocContact: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error: (error) => {
        console.error('Error fetching suppliers', error);
      },
    });
  }

  openModal(content: TemplateRef<any>, supplier: Supplier): void {
    this.selectedSupplier = { ...supplier };
    this.supplierForm.patchValue(this.selectedSupplier);
    this.modalRef = this.modalService.open(content, { backdrop: 'static' });
  }

  onSubmit(modal: any): void {
    if (this.supplierForm.valid) {
      const updatedSupplier: Supplier = {
        ...this.selectedSupplier,
        ...this.supplierForm.value,
      };
      this.suppliersService
        .updateSupplier(updatedSupplier.supplierId, updatedSupplier)
        .subscribe({
          next: () => {
            const index = this.suppliers.findIndex(
              (s) => s.supplierId === updatedSupplier.supplierId
            );
            if (index !== -1) {
              this.suppliers[index] = updatedSupplier;
            }
            modal.close();
          },
          error: (error) => {
            console.error('Error updating supplier', error);
          },
        });
    }
  }
}
