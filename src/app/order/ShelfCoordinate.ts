export class ShelfCoordinate{
 cameraId: string;
 x1: number;
 x2: number;
 x3: number;
 x4: number;
 y1: number;
 y2: number;
 y3: number;
 y4: number;

 constructor(cameraId: string, x1: number, x2: number,x3: number, x4: number, y1: number, y2: number, y3:number, y4: number){
  this.cameraId = cameraId;
  this.x1 = x1;
  this.x2 = x2;
  this.x3 = x3;
  this.x4 = x4;
  this.y1 = y1;
  this.y2 = y2;
  this.y3 = y3;
  this.y4 = y4;
 }
}
