import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/user-service/users.service'; // Adjust the path for consistency with your project structure
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService],
})
export class ProfileComponent implements OnInit {
  @Input() userId: number | null = null;
  userForm: FormGroup;
  user: User | null = null;
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    public activeModal: NgbActiveModal
  ) {
    this.userForm = this.fb.group({
      userId: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/),
        ],
      ],
      contact: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: ['', Validators.required],
      role: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.usersService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user = data;
          this.userForm.patchValue({
            userId: this.user.userId,
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            contact: this.user.contact,
            address: this.user.address,
            role: this.user.role,
          });

          // Make password visible initially
          this.passwordFieldType = 'text';
          setTimeout(() => {
            this.passwordFieldType = 'password';
          }, 2000); // Delay in milliseconds (adjust as needed)
        },
        error: (error) => {
          console.error('Error fetching user data', error);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.userForm.value,
        userId: this.userId!,
      };

      this.usersService.updateUser(updatedUser.userId, updatedUser).subscribe({
        next: () => {
          this.activeModal.close(updatedUser);
        },
        error: (error) => {
          console.error('Error updating user', error);
        },
      });
    }
  }
}
