import { Shelf } from "./Shelf";

export class OrderAnnotation{
  camera: string;
  timestamp: string;
  lhi: boolean;
  lho: boolean;
  rhi: boolean;
  rho: boolean;
  lprodAdd: boolean;
  rprodAdd: boolean;
  lproduct: string;
  rproduct: string;
  lquantity: number;
  rquantity: number;
  lshelf: string;
  rshelf: string;

 constructor(camera: string, timestamp: string){
  this.camera = camera;
  this.timestamp = timestamp;
  // this.movements = ["Right hand in","Left hand in"];
  // this.prodAdd = ["PEPSI","JUICE"];
  // this.prodAddQty = [1,1];
  // this.prodAddShelves = ["SHELF1","SHELF2"];
 }
}
