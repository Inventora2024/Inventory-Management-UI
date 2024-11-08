import { Component, OnInit } from '@angular/core';
import { SalesInfoService } from '../../services/product-service/sales-info.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Sales } from '../../models/sales.model';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,
  HttpClientModule,
NgxPaginationModule],
  providers: [SalesInfoService],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  
  sales: Sales[]=[];
  p : any;

  constructor(private salesInfoService: SalesInfoService){}

  ngOnInit(): void{
    this.salesInfoService.getSalesList().subscribe((data : Sales[])=>{
      this.sales = data;
      console.log(this.sales);
    });
    
    
  }

}
