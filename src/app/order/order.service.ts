import { Injectable } from '@angular/core';
import { Order } from "./Order";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
//import { Location } from '@angular/common';

@Injectable()
export class OrderService {

  //private apiUrl = './orders';
  private apiUrl = 'http://localhost:8082/orders';


  //constructor(private http: Http, private location: Location) {
  constructor(private http: Http) {
  }

  findAll(): Observable<Order[]>  {
    //console.log("invoking REST Api at: "+this.location.prepareExternalUrl(this.apiUrl));
    //return this.http.get(this.location.prepareExternalUrl(this.apiUrl))
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  findById(id: string): Observable<Order> {
     return this.http.get(this.apiUrl + '/' + id)
     //return this.http.get(this.location.prepareExternalUrl(this.apiUrl+ '/' + id))
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Error'));
   }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put(this.apiUrl, order)
    //return this.http.put(this.location.prepareExternalUrl(this.apiUrl), order)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
