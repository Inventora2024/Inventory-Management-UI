import { NgModule, Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { UsersService } from '../../services/user-service/users.service';
import { UserSafeData } from '../../models/user.model';
import * as bootstrap from 'bootstrap';
import { AddStaffComponent } from './add-staff/add-staff.component';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [SharedModule, AddStaffComponent],
  providers: [UsersService],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  staffMembers: UserSafeData[] = [];
  selectedStaff: UserSafeData | undefined;
  isAdmin: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'Admin';
    this.fetchStaff();
  }

  fetchStaff(): void {
    this.usersService.getUsersDisplay().subscribe((data: UserSafeData[]) => {
      this.staffMembers = data;
    });
  }

  openModal(staff: UserSafeData): void {
    this.selectedStaff = staff;
    const modalElement = document.getElementById('staffModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openAddStaffModal(): void {
    const modalElement = document.getElementById('addStaffModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
