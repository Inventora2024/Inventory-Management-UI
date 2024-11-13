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
  ],
  providers: [DropdownService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Inventory-Management-UI';

  constructor(
    private router: Router,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Adding a small delay to ensure DOM updates are complete
        setTimeout(() => {
          this.dropdownService.reinitializeDropdowns();
        }, 100);
      }
    });
  }
}
