import { Component, OnInit } from '@angular/core';
import { Order } from "../Order";
import { OrderItem } from "../OrderItem";
import { OrderService } from "../order.service";
import { VideoService } from "../video.service";
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HashMap } from "hashmap";
import { ViewChild, ElementRef } from '@angular/core';
//declare var Whammy: any;
//declare var vid: any;

@Component({
  selector: 'app-order-verify',
  templateUrl: './order-verify.component.html',
  styleUrls: ['./order-verify.component.css'],
  providers: [OrderService, VideoService]
})
export class OrderVerifyComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  order: Order;
  id: number;
  private sub: any;
  //videoMap: HashMap;
  imageList: String[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private videoService: VideoService) { }

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
     //this.videoMap = new HashMap();
     this.videoService.findById('728312070375').subscribe(
       images => {
           this.imageList = images;
        },error => {
         console.log(error);
        }
     )
     this.initCanvas();
//     this.videoMap.set('728312070375',this.imageList);
     //vid = new Whammy.Video(this.imageList);
     //vid.compile();
  }

  initCanvas() {
    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    let background: HTMLImageElement = new Image();
    background.src = "http://localhost/camera/728312070375/728312070375_1531352500_025-clr.jpg";
    ctx.drawImage(background,0,0);
  }

  onSubmit(){
    this.orderService.updateOrder(this.order).subscribe();
    this.redirectOrderPage();
  }

  onItemAdd(){
    let newItem = new OrderItem(-1,"","",0,0,0);
    this.order.orderItems.push(newItem);
  }

  onItemDelete(orderItem: OrderItem){
    this.order.orderItems = this.order.orderItems.filter(x => x.orderItemId !== orderItem.orderItemId);
  }

  redirectOrderPage() {
    this.router.navigate(['/order']);

  }
}
