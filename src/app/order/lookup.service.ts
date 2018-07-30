import { Injectable } from '@angular/core';
import { Product } from "./Product";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { Shelf } from "./Shelf";
//import { Location } from '@angular/common';

@Injectable()
export class LookupService {

  //private apiUrl = '/lookup';
  private apiUrl = 'http://localhost:8082/lookup';

  //constructor(private http: Http, private location: Location) { }
  constructor(private http: Http) { }

  lookupProducts(): Observable<Product[]>  {
    return this.http.get(this.apiUrl+"/product")
    //return this.http.get(this.location.prepareExternalUrl(this.apiUrl+"/product"))
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  lookupShelves(): Observable<Shelf[]>  {
    return this.http.get(this.apiUrl+"/shelf")
    //return this.http.get(this.location.prepareExternalUrl(this.apiUrl+"/shelf"))
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
