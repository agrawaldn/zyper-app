import { Component, OnInit } from '@angular/core';
import { Order } from "../Order";
import { OrderService } from "../order.service";
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-verify',
  templateUrl: './order-verify.component.html',
  styleUrls: ['./order-verify.component.css'],
  providers: [OrderService]
})
export class OrderVerifyComponent implements OnInit {

  order: Order;
  id: number;
  private sub: any;

  orderForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

     if (this.id) {
      this.orderService.findById(this.id).subscribe(
      order => {
          this.order = order;
       },error => {
        console.log(error);
       }
      );
     }
     /*
     this.orderForm = new FormGroup({
     orderItem.product: new FormControl('', Validators.required),
     orderItem.quantity: new FormControl('', Validators.required)
    });
    */
  }

}
