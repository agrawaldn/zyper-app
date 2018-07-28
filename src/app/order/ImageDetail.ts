export class ImageDetail{
 timestamp: string;
 imageURL: string;
 tx: number;
 ty: number;
 bx: number;
 by: number;

 constructor(timestamp: string, imageURL: string){
  this.timestamp = timestamp
  this.imageURL = imageURL;


 }
}
