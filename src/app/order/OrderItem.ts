export class OrderItem{
 productDesc: string;
 productId: number;
 quantity: number;

 constructor(productDesc: string, productId: number, quantity: number){
  this.productId = productId;
  this.productDesc = productDesc;
  this.quantity = quantity;
 }
}
