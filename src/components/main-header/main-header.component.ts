import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faIdCard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
})
export class MainHeaderComponent {
  faUser = faUser;
  faIdCard = faIdCard;
  faRightFromBracket = faRightFromBracket;
  brandLogoUrl = '../../assets/Images/InventoraLogo.png';
}
