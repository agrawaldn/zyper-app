import { Component, OnInit } from '@angular/core';
import { Order } from "../Order";
import { OrderItem } from "../OrderItem";
import { OrderService } from "../order.service";
import { VideoService } from "../video.service";
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
//import { HashMap } from "hashmap";
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-order-verify',
  templateUrl: './order-verify.component.html',
  styleUrls: ['./order-verify.component.css'],
  providers: [OrderService, VideoService]
})
export class OrderVerifyComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  order: Order = new Order(0,"",0,[new OrderItem(0,"","",0,0,0)]);
  id: number;
  private sub: any;
  imageList: string[] = [""];
  imageSeq: number;
  //myMap: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private videoService: VideoService) {

                //this.myMap = new Map();
                this.buildImageList('728312070375');

               }

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

     this.imageSeq = -1;
     this.loadImage(this.imageList[0]);
     // TODO: initial image is blank
  }

  buildImageList(cameraId: string){
    this.videoService.findById(cameraId).subscribe(
      images => {
          this.imageList = images;
       },error => {
        console.log(error);
       }
    )

  }


  loadImage(imageURL: string) {
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    let background: HTMLImageElement = new Image();
    background.src = imageURL;
    ctx.clearRect(0, 0, 700, 500);
    background.onload = function() {
      ctx.drawImage(background,0,0);
    };
  }

  onKeyDownEvent(event){
    this.imageSeq++;
    if(this.imageSeq < this.imageList.length){
      this.loadImage(this.imageList[this.imageSeq]);
    }
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
