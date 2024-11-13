import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faIdCard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ProfileComponent } from '../profile/profile.component';
import { SharedModule } from '../../modules/shared.module'; // Ensure the correct path

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [FontAwesomeModule, SharedModule],
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent {
  faUser = faUser;
  faIdCard = faIdCard;
  faRightFromBracket = faRightFromBracket;
  brandLogoUrl = '../../assets/Images/InventoraLogo.png';

  constructor(private modalService: NgbModal) {}

  openProfileModal(): void {
    const modalRef = this.modalService.open(ProfileComponent, { size: 'lg' });
    modalRef.componentInstance.userId = 1; // You can pass the actual user ID here
  }
}
