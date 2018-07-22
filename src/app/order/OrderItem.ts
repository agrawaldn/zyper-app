export class OrderItem{
 productDesc: string;
 productId: number;

 constructor(productDesc: string, productId: number){
  this.productId = productId;
  this.productDesc = productDesc;
 }
}
