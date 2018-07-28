import { Component, OnInit } from '@angular/core';
import { Order } from "../Order";
import { OrderItem } from "../OrderItem";
import { ImageDetail } from "../ImageDetail";
import { OrderAnnotation } from "../OrderAnnotation";
import { OrderEvent } from "../OrderEvent";
import { OrderService } from "../order.service";
import { ImageService } from "../image.service";
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ViewChild, ElementRef } from '@angular/core';
import { Product } from "../Product";
import { LookupService } from "../lookup.service";

@Component({
  selector: 'app-order-verify',
  templateUrl: './order-verify.component.html',
  styleUrls: ['./order-verify.component.css'],
  providers: [OrderService, ImageService, LookupService]
})
export class OrderVerifyComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  //selectedProduct:Product = new Product('-1', 'Select Product');
  products: Product[];

  order: Order = new Order("","","","",[new OrderItem("",0,0)]);
  id: string;
  private sub: any;
  imageSeq: number;
  cnt: number = 0;
  cameraInFocus: string;
  timestamp: string;
/*
  public url = 'http://localhost:8080/lookup/product';
  params = {
  hl: 'en',
  ds: 'yt',
  xhr: 't',
  client: 'youtube'
};
  public search = 'oren';
  result$;
*/
  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private imageService: ImageService,
              private lookupService: LookupService) {

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
     //populate product dropdown
     this.lookupService.lookupProducts().subscribe(
     products => {
         this.products = products;
      },error => {
       console.log(error);
      }
     );
     //this.order.orderEvents = [new OrderEvent("CAM1","TIMESTAMP1"),new OrderEvent("CAM2","TIMESTAMP2")];
     this.imageService.getAllImages(this.id);
     this.cameraInFocus = this.imageService.getCameraId(this.cnt);
     this.imageSeq = -1;
     this.renderCanvas(this.imageService.getImage(this.cameraInFocus,0));
     // TODO: initial image is blank

  }

  renderCanvas(cameraId: string) {
     let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
     var canvas = ctx.canvas ;
     let img: HTMLImageElement = new Image();
     img.src = this.imageService.getImage(cameraId,this.imageSeq);
     //ctx.clearRect(0, 0, 960, 540);
     img.onload = function() {
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
     };
     let imgList: ImageDetail[] =  this.imageService.getImageList(cameraId);
     ctx.beginPath();
     let tx: number = imgList[this.imageSeq].tx;
     let ty: number = imgList[this.imageSeq].ty;
     let by: number = imgList[this.imageSeq].by;
     let bx: number = imgList[this.imageSeq].bx;
     ctx.rect(tx*.23,ty*.23,(bx-tx)*.23,(by-ty)*.23);
     ctx.strokeStyle = 'yellow';
     ctx.stroke();
     //ctx.fill();
     this.timestamp = this.imageService.getReadableTimestamp(cameraId,this.imageSeq);
  }

  onRightArrowDown(){
    let cameraId: string = this.imageService.getCameraId(this.cnt);
    this.imageSeq++;
    if(this.imageSeq < this.imageService.getImageListLength(cameraId)){
      this.renderCanvas(cameraId);
    }else{
      this.imageSeq = -1;
    }
  }

  onLeftArrowDown(){
    let cameraId: string = this.imageService.getCameraId(this.cnt);
    this.imageSeq--;
    if(this.imageSeq > 0){
      this.renderCanvas(cameraId);
    }else{
      this.imageSeq = 0;
    }
  }

  switchCamera(){
    this.cnt++;
    this.imageSeq = -1;

    if(this.cnt == this.imageService.getNoOfCameras()){
      this.cnt = 0;
    }
    this.cameraInFocus = this.imageService.getCameraId(this.cnt);
    this.onRightArrowDown();
  }
  onSubmit(){
    this.orderService.updateOrder(this.order).subscribe();
    this.redirectOrderPage();
  }

  onAddAnnotation(){
    let e = new OrderAnnotation(this.cameraInFocus,this.timestamp);
    e.lhi = false;
    e.lho = false;
    e.rhi = false;
    e.rho = false;
    e.lprodAdd = false;
    e.rprodAdd = false;
    e.lproduct = "";
    //e.lquantity= "";
    e.rproduct = "";
    //e.rquantity= "";
    if(this.order.orderAnnotations == undefined){
        this.order.orderAnnotations = new Array<OrderAnnotation>();
    }
    this.order.orderAnnotations.push(e);
    // this.onLeftArrowDown();
    // this.onRightArrowDown();
  }

  onAnnotationRemove(orderAnnotation: OrderAnnotation){
    this.order.orderAnnotations = this.order.orderAnnotations.filter(x => x.timestamp !== orderAnnotation.timestamp);
    // this.onLeftArrowDown();
    // this.onRightArrowDown();
  }

  onEventDelete(oe: OrderEvent){
    this.order.orderEvents = this.order.orderEvents.filter(x => x.timestamp !== oe.timestamp);
  }

  onSaveAnnotation(orderAnnotation: OrderAnnotation){
    if(this.order.orderEvents == undefined){
      this.order.orderEvents = new Array<OrderEvent>();
    }
    let oe: OrderEvent = new OrderEvent(orderAnnotation.camera,orderAnnotation.timestamp);
    oe.movements="";
    if(orderAnnotation.lhi){
      oe.movements = oe.movements+"lhi ";
    }
    if(orderAnnotation.lho){
      oe.movements = oe.movements+"lho ";
    }
    if(orderAnnotation.rhi){
      oe.movements = oe.movements+"rhi ";
    }
    if(orderAnnotation.rho){
      oe.movements = oe.movements+"rho ";
    }
    let lprod: string = orderAnnotation.lproduct;
    oe.lproductQuantity = orderAnnotation.lquantity;

    if(orderAnnotation.lprodAdd){
      oe.lproductAdded = lprod;
    }else{
      oe.lproductRemoved = lprod;
    }
    let rprod: string = orderAnnotation.rproduct;
    oe.rproductQuantity = orderAnnotation.rquantity;
    if(orderAnnotation.rprodAdd){
      oe.rproductAdded = rprod;
    }else{
      oe.rproductRemoved = rprod;
    }
    this.order.orderEvents.push(oe);
    this.order.orderAnnotations = new Array<OrderAnnotation>();
    // this.onLeftArrowDown();
    // this.onRightArrowDown();
  }

  // handleResultSelected(result) {
  //   this.search = result;
  // }

  redirectOrderPage() {
    this.router.navigate(['/order']);

  }

}
