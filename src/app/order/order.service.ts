import { Injectable } from '@angular/core';
import { Order } from "./Order";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import {environment} from '../../environments/environment';

@Injectable()
export class OrderService {

  private apiUrl = environment.baseApiUrl+'/orders';


  constructor(private http: Http) {
  }

  findAll(): Observable<Order[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  findById(id: string): Observable<Order> {
     return this.http.get(this.apiUrl + '/' + id)
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Error'));
   }

  updateOrder(order: Order): Observable<Order> {
    console.log("timestamp="+order.orderEvents[0].timestamp);
    return this.http.put(this.apiUrl, order)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
