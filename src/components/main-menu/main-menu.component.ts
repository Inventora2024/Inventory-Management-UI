import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine,
  faBoxesPacking,
  faWarehouse,
  faCartShopping,
  faTruckFast,
  faCashRegister,
  faUsersRectangle,
  faBoxes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
})
export class MainMenuComponent {
  faChartLine = faChartLine;
  faBoxesPacking = faBoxesPacking;
  faWarehouse = faWarehouse;
  faCartShopping = faCartShopping;
  faTruckFast = faTruckFast;
  faCashRegister = faCashRegister;
  faUsersRectangle = faUsersRectangle;
  faBoxes = faBoxes;
}
