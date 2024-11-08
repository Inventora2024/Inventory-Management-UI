import { Injectable } from '@angular/core';
import { Sales } from '../../models/sales.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable ({
    providedIn: 'root'
})

export class SalesInfoService{

    private APIurl= '../../assets/TestData/sales.json'
    constructor(private http: HttpClient) { }

    /*public getSalesInfo() : Sales[]{
        let sales = new Sales();
        sales.Product = "Acer Aspire 5"
        sales.Quantity = 4;


        return [sales];
    }*/

    getSalesList():Observable<Sales[]>{
        return this.http.get<Sales[]>(this.APIurl);
    }

    /*addSales(val:any){
        return this.http.post(this.APIurl+'/(main-content:sales)', val)
    }

    updateSales(val:any){
        return this.http.put(this.APIurl+'/(main-content:sales)', val)
    }*/
}