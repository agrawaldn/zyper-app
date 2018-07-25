import { Component, OnInit } from '@angular/core';
import { Order } from "../Order";
import { OrderItem } from "../OrderItem";
import { OrderService } from "../order.service";
import { ImageService } from "../image.service";
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-order-verify',
  templateUrl: './order-verify.component.html',
  styleUrls: ['./order-verify.component.css'],
  providers: [OrderService, ImageService]
})
export class OrderVerifyComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  order: Order = new Order("","","","",[new OrderItem("",0,0)]);
  id: string;
  private sub: any;
  imageSeq: number;
  cnt: number = 0;
  cameraInFocus: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private imageService: ImageService) {

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
     //this.order.orderItems = [new OrderItem("",0,0)];
     this.imageService.getAllImages(this.id);
     this.cameraInFocus = this.imageService.cameraList[this.cnt];
     this.imageSeq = -1;
     this.loadImage(this.imageService.getImage(this.cameraInFocus,0));
     // TODO: initial image is blank

  }

  loadImage(imageURL: string) {
    //console.log("loading image: "+imageURL);
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    let background: HTMLImageElement = new Image();
    background.src = imageURL;
    ctx.clearRect(0, 0, 700, 500);
    background.onload = function() {
      ctx.drawImage(background,0,0);
    };
  }

  onRightArrowDown(){
    let cameraId: string = this.imageService.cameraList[this.cnt];
    this.imageSeq++;
    if(this.imageSeq < this.imageService.getImageListLength(cameraId)){
      this.loadImage(this.imageService.getImage(cameraId,this.imageSeq));
    }else{
      this.imageSeq = -1;
    }
  }

  onLeftArrowDown(){
    let cameraId: string = this.imageService.cameraList[this.cnt];
    this.imageSeq--;
    if(this.imageSeq > 0){
      this.loadImage(this.imageService.getImage(cameraId,this.imageSeq));
    }else{
      this.imageSeq = 0;
    }
  }

  switchCamera(){
    this.cnt++;
    this.imageSeq = -1;
    if(this.cnt == this.imageService.cameraList.length){
      this.cnt = 0;
    }
    this.cameraInFocus = this.imageService.cameraList[this.cnt];
    this.onRightArrowDown();
  }
  onSubmit(){
    this.orderService.updateOrder(this.order).subscribe();
    this.redirectOrderPage();
  }

  onItemAdd(){
    let newItem = new OrderItem("",-1,0);
    this.order.orderItems.push(newItem);
  }

  onItemDelete(orderItem: OrderItem){
    this.order.orderItems = this.order.orderItems.filter(x => x.productDesc !== orderItem.productDesc);
  }

  redirectOrderPage() {
    this.router.navigate(['/order']);

  }
}
