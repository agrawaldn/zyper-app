import { OrderItem } from "./OrderItem";

export class Order{
 orderId: string;
 orderDate: string;
 customerId: string;
 orderItems: OrderItem[];
 status: string;

 constructor(orderId: string, orderDate: string, customerId: string, status: string, orderItems: OrderItem[]){
  this.orderId = orderId
  this.orderDate = orderDate;
  this.customerId = customerId;
  this.status = status;
  this.orderItems = orderItems;

 }
}
