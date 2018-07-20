import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { HashMap } from "hashmap";

@Injectable()
export class VideoService {


  private apiUrl = 'http://localhost:8080/images';

  constructor(private http: Http) {
  }

  findById(id: string): Observable<String[]> {
     return this.http.get(this.apiUrl + '/' + id)
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Error'));
   }
}
