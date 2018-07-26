import { OrderItem } from "./OrderItem";
import { OrderAnnotation } from "./OrderAnnotation";
import { OrderEvent } from "./OrderEvent";

export class Order{
 orderId: string;
 orderDate: string;
 customerId: string;
 status: string;
 orderItems: OrderItem[];
 orderAnnotations: OrderAnnotation[];
 orderEvents: OrderEvent[];

 constructor(orderId: string, orderDate: string, customerId: string, status: string, orderItems: OrderItem[]){
  this.orderId = orderId
  this.orderDate = orderDate;
  this.customerId = customerId;
  this.status = status;
  this.orderItems = orderItems;
 }
}
