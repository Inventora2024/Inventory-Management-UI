import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/user-service/users.service';
import { User } from '../../../models/user.model';
import * as bootstrap from 'bootstrap';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css'],
  standalone: true,
  imports: [SharedModule],
  providers: [UsersService],
})
export class AddStaffComponent {
  @Output() staffAdded = new EventEmitter<void>();

  addStaffForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.addStaffForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addStaffForm.valid) {
      const newUser: User = this.addStaffForm.value;
      this.usersService.createUser(newUser).subscribe(() => {
        this.staffAdded.emit();
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('addStaffModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
