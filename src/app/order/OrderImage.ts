import { ImageDetail } from "./ImageDetail";

export class OrderImage{
 cameraId: string;
 imageDetails: ImageDetail[];

 constructor(cameraId: string, imageDetails: ImageDetail[]){
  this.cameraId = cameraId
  this.imageDetails = imageDetails;


 }
}
