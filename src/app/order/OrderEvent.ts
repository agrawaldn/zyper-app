
export class OrderEvent{
  camera: string;
  timestamp: string;
  movements: string;

  lproductAdded: string;
  lproductRemoved: string;
  lproductQuantity: number;

  rproductAdded: string;
  rproductRemoved: string;
  rproductQuantity: number;

  lshelf: string;
  rshelf: string;
  origTS: string;

 constructor(camera: string, timestamp: string){
  this.camera = camera;
  this.timestamp = timestamp;
  // this.movements = ["Right hand in","Left hand in"];
  // this.prodAdd = ["PEPSI","JUICE"];
  // this.prodAddQty = [1,1];
  // this.prodAddShelves = ["SHELF1","SHELF2"];
 }
}
