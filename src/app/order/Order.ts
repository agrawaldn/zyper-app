import { OrderItem } from "./OrderItem";

export class Order{
 orderId: number;
 orderDate: string;
 customerId: number;
 orderItems: OrderItem[];

 constructor(orderId: number, orderDate: string, customerId: number, orderItems: OrderItem[]){
  this.orderId = orderId
  this.orderDate = orderDate;
  this.customerId = customerId;
  this.orderItems = orderItems;

 }
}
