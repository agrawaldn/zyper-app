import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { HashMap } from "hashmap";
import { OrderImage } from "./OrderImage";

@Injectable()
export class ImageService {

  cameraList: string[] = ['728312070375','745212070402','752112070219','819112072121'];
  private images: OrderImage[];

  private apiUrl = 'http://localhost:8080/images';

  constructor(private http: Http) {
    //this.getAllImages();
  }

  // findAll(): Observable<OrderImage[]>  {
  //   return this.http.get(this.apiUrl)
  //     .map((res:Response) => res.json())
  //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  // }
  findAll(id: string): Observable<OrderImage[]>  {
    return this.http.get(this.apiUrl+ '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  // findById(id: string): Observable<OrderImage> {
  //    return this.http.get(this.apiUrl + '/' + id)
  //      .map((res:Response) => res.json())
  //      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  //  }


   getAllImages(orderId: string) {
     this.findAll(orderId).subscribe(
       images => {
         this.images = images;
       },
       err => {
         console.log(err);
       }
     );
   }

  getImageList(cameraId: string): string[]{
    for (let image of this.images) {
      if(image.cameraId == cameraId){
        return image.images;
      }
    }
  }

  getImage(cameraId: string, idx: number ){
    let imgList: string[] =  this.getImageList(cameraId);
    return imgList[idx];
  }

  getImageListLength(cameraId: string): number{
    let imgList: string[] =  this.getImageList(cameraId);
    return imgList.length;
  }
}