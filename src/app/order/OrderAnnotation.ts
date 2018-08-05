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
  origTS: string;

 constructor(camera: string, timestamp: string){
  this.camera = camera;
  this.timestamp = timestamp;
 }
}
