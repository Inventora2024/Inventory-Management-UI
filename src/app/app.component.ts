import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { MainHeaderComponent } from '../components/main-header/main-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from '../components/login/login.component';
import { DropdownService } from '../services/dropdown-service/dropdown.service'; // Ensure the correct path
import { SharedModule } from '../modules/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MainMenuComponent,
    MainHeaderComponent,
    LoginComponent,
    SharedModule,
  ],
  providers: [DropdownService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Inventory-Management-UI';
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in on init
    this.isAuthenticated = !!localStorage.getItem('token');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Adding a small delay to ensure DOM updates are complete
        setTimeout(() => {
          this.dropdownService.reinitializeDropdowns();
        }, 100);
      }
    });
  }

  onLoginSuccess() {
    this.isAuthenticated = true;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
