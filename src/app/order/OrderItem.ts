export class OrderItem{
 orderItemId: number;
 product: string;
 comment: string;
 quantity: number;
 weight: number;
 unitPrice: number;

 constructor(orderItemId: number, product: string, comment: string, quantity: number, weight: number, unitPrice: number){
  this.orderItemId = orderItemId;
  this.product = product;
  this.comment = comment;
  this.quantity = quantity;
  this.weight = weight;
  this.unitPrice = unitPrice;

 }
}
