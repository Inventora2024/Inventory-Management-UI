import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';
import { UsersService } from '../../services/product-service/users.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-staff/add-user.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule,
  NgbModule,
HttpClientModule,
FormsModule],
  providers: [UsersService],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit{
  faPLus = faPlus;
  users:Users[]=[];

  selectedUser: Users | undefined;

  constructor(private userService : UsersService){}

  ngOnInit(): void {
    this.userService.getUserList().subscribe((data : Users[])=>{
      this.users = data;
      console.log(this.users);
    });
  }

  openModal(users: Users): void {
    this.selectedUser = users;
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  handleFormSubmit(userData: Users) {
    console.log('New User Created:', userData);
    // Here, you can handle the created user (e.g., show in a list or update UI)
  }

}
