import { ShelfCoordinate } from "./ShelfCoordinate";

export class Shelf{
 id: string;
 defaultProduct: string;
 shelfCoordinates: ShelfCoordinate[];

 constructor(id: string, defaultProduct: string, shelfCoordinates: ShelfCoordinate[]){
  this.id = id;
  this.defaultProduct = defaultProduct;
  this.shelfCoordinates = shelfCoordinates;
 }
}
