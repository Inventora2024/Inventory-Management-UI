import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { MainHeaderComponent } from '../components/main-header/main-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    MainMenuComponent,
    MainHeaderComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Inventory-Management-UI';
}
