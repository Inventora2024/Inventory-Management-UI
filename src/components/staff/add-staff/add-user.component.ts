import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../../services/product-service/users.service';
import { Users } from '../../../models/users.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { StaffComponent } from '../staff.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [HttpClientModule,
  CommonModule,
  FormsModule,
  NgbModule,
 
],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

    // Track modal visibility
    isVisible: boolean = false;

    // Form data model for the new user
    userData:Users= {
      UserId: 0,
      Name: '',
      Email: '',
      Contact: '',
      Address: '',
      Role: '',      
      Password: ''
    };
  
    // Output event emitter to notify parent component on form submission
    @Output() formSubmitted = new EventEmitter<any>();
  
    constructor(private userService: UsersService) {}

    ngOnInit(): void {
      
    }
  
    // Open the modal
    openModal() {
      this.isVisible = true;
    }
  
    // Close the modal
    closeModal() {
      this.isVisible = false;
    }
  
    // Handle form submission
    onSubmit() {
      this.userService.createUser(this.userData).subscribe(
        (response) => {
          console.log('New user created successfully:', response);
          this.formSubmitted.emit(this.userData); // Emit data to parent component
          this.closeModal(); // Close the modal after submission
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }

}
