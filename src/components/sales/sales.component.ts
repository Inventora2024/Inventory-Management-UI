import { Component } from '@angular/core';
import { DisplaySaleComponent } from "./display-sale/display-sale.component";
import { CreateSaleComponent } from "./create-sale/create-sale.component";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [DisplaySaleComponent, CreateSaleComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

}
