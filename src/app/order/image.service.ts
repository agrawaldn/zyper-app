import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { HashMap } from "hashmap";
import { OrderImage } from "./OrderImage";
import { ImageDetail } from "./ImageDetail";
import { DatePipe } from '@angular/common';

@Injectable()
export class ImageService {

  private images: OrderImage[];

  private apiUrl = 'http://localhost:8080/images';

  constructor(private http: Http) {
    //this.getAllImages();
  }

  findAll(id: string): Observable<OrderImage[]>  {
    return this.http.get(this.apiUrl+ '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

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
  getCameraId(idx: number): string{
     return this.images[idx].cameraId;
  }
  getImageList(cameraId: string): ImageDetail[]{
    for (let image of this.images) {
      if(image.cameraId == cameraId){
        return image.imageDetails;
      }
    }
  }
  getTimestamp(cameraId: string, idx: number){
    let imgList: ImageDetail[] =  this.getImageList(cameraId);
    return imgList[idx].timestamp;
  }

  getReadableTimestamp(cameraId: string, idx: number ){
    let datepipe: DatePipe = new DatePipe('en-us');
    let d: Date = new Date(0);
    let ts = this.getTimestamp(cameraId, idx);
    d.setTime(+ts);
    let ds = datepipe.transform(d,'MM/dd/yy-HH:mm:ss.SSS');
    return ds;
  }

  getImage(cameraId: string, idx: number ){
    let imgList: ImageDetail[] =  this.getImageList(cameraId);
    return imgList[idx].imageURL;
  }

  getImageListLength(cameraId: string): number{
    let imgList: ImageDetail[] =  this.getImageList(cameraId);
    return imgList.length;
  }
}
