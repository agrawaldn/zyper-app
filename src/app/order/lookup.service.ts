import { Injectable } from '@angular/core';
import { Product } from "./Product";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { Shelf } from "./Shelf";
import {environment} from '../../environments/environment';

@Injectable()
export class LookupService {

  private apiUrl = environment.baseApiUrl+'/lookup';

  constructor(private http: Http) { }

  lookupProducts(): Observable<Product[]>  {
    return this.http.get(this.apiUrl+"/product")
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  lookupShelves(): Observable<Shelf[]>  {
    return this.http.get(this.apiUrl+"/shelf")
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
