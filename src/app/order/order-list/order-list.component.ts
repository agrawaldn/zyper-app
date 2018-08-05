import { Component, OnInit } from '@angular/core';
import { Order } from "../Order";
import { OrderService } from "../order.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService]
})
export class OrderListComponent implements OnInit {

  private orders: Order[];
  private sub: any;
  private msg: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router, private orderService: OrderService) { }

  ngOnInit() { //when component loading get all users and set the users[]
    this.sub = this.route.params.subscribe(params => {
      this.msg = params['msg'];
    });
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.findAll().subscribe(
      orders => {
        this.orders = orders;
      },
      err => {
        console.log(err);
      }
    );
  }

  verifyOrderPage(order: Order) {
    if (order) {
      this.router.navigate(['/verify', order.orderId]);
    }
  }

}
