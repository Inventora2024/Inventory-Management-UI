import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
export class MainHeaderComponent implements OnInit {
  faUser = faUser;
  faIdCard = faIdCard;
  faRightFromBracket = faRightFromBracket;
  brandLogoUrl = '../../assets/Images/InventoraLogo.png';
  @Output() userSignedOut = new EventEmitter<void>();

  userId: number | null = null;
  username: string | null = null;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.userId || null;
    this.username = user.name || 'User';
  }

  openProfileModal(): void {
    if (this.userId !== null) {
      const modalRef = this.modalService.open(ProfileComponent, { size: 'lg' });
      modalRef.componentInstance.userId = this.userId;
    }
  }

  signOut(): void {
    this.userSignedOut.emit();
  }
}
