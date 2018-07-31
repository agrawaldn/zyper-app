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
import { Shelf } from "../Shelf";
import { OrderImage } from "../OrderImage";

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
  shelves: Shelf[];
  private images: OrderImage[];

  order: Order = new Order("","","","",[new OrderItem("",0,0)]);
  id: string;
  private sub: any;
  imageSeq: number;
  cnt: number;
  cameraInFocus: string;
  timestamp: string;

  annotationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private imageService: ImageService,
              private lookupService: LookupService) {

                //initialize form
                this.annotationForm = new FormGroup({
                  lhi: new FormControl('')
                  ,lho: new FormControl('')
                  ,rhi: new FormControl('')
                  ,rho: new FormControl('')
                  ,lprodAdd: new FormControl('')
                  ,rprodAdd: new FormControl('')
                  ,lproduct: new FormControl('')
                  ,rproduct: new FormControl('')
                  ,lquantity: new FormControl('',Validators.pattern("[1-9][0-9]{0,4}"))
                  ,rquantity: new FormControl('',Validators.pattern("[1-9][0-9]{0,4}"))
                  ,lshelf: new FormControl('')
                  ,rshelf: new FormControl('')

                });
  }

  ngOnInit() {
    this.imageSeq = 0;
    this.cnt = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    //populate product dropdown
    this.lookupService.lookupProducts().subscribe(
    products => {
        this.products = products;
     },error => {
      console.log(error);
     }
    );
    //populate shelves
    this.lookupService.lookupShelves().subscribe(
    shelves => {
        this.shelves = shelves;
     },error => {
      console.log(error);
     }
    );

     if (this.id) {
      this.orderService.findById(this.id).subscribe(
      order => {
          this.order = order;
       },error => {
        console.log(error);
       }
      );

        this.imageService.findAll(this.id).subscribe(
          images => {
            this.images = images;
          },
          err => {
            console.log(err);
        },() => {this.onLoad()}
        );
     }

  }

  renderCanvas(cameraId: string) {
     let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
     var canvas = ctx.canvas ;
     canvas.width = 1280;
     canvas.height = 720;
     let img: HTMLImageElement = new Image();
     img.src = this.imageService.getImage(cameraId,this.imageSeq, this.images);
     //ctx.clearRect(0, 0, 960, 540);

     img.onload = function() {
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
     };
     let shelves: Shelf[] = this.shelves;
     let imgList: ImageDetail[] =  this.imageService.getImageList(cameraId, this.images);
     let tx: number = imgList[this.imageSeq].tx;
     let ty: number = imgList[this.imageSeq].ty;
     let by: number = imgList[this.imageSeq].by;
     let bx: number = imgList[this.imageSeq].bx;
     let ratio: number = 1;
     setTimeout(function(){
                           ctx.font = "15px Arial";
                           //ctx.fillStyle = "red";
                           ctx.strokeStyle = 'red';
                           for(let shelf of shelves){
                              let shelfId: string = shelf.id;
                              for(let coord of shelf.shelfCoordinates){
                                if(cameraId === coord.cameraId ){
                                  ctx.beginPath();
                                  //ctx.fillText(shelfId,coord.x1*.23,coord.y1*.23);
                                  ctx.strokeText(shelfId,coord.x1*ratio,coord.y1*ratio);
                                  ctx.closePath();
                                }
                              }
                           }
                           ctx.beginPath();
                           ctx.rect(tx*ratio,ty*ratio,(bx-tx)*ratio,(by-ty)*ratio);
                           ctx.strokeStyle = 'yellow';
                           ctx.stroke();
                           ctx.closePath();

      },500);
     this.timestamp = this.imageService.getReadableTimestamp(cameraId,this.imageSeq, this.images);
  }

  onRightArrowDown(){
    let cameraId: string = this.imageService.getCameraId(this.cnt, this.images);
    this.imageSeq++;
    console.log("onRightArrowDown() called for camera "+cameraId+" "+this.imageSeq);
    if(this.imageSeq < this.imageService.getImageListLength(cameraId, this.images)){
      this.renderCanvas(cameraId);
    }else{
      //this.imageSeq = -1;
      this.imageSeq = 0;
    }
  }

  onLeftArrowDown(){
    let cameraId: string = this.imageService.getCameraId(this.cnt, this.images);
    this.imageSeq--;
    if(this.imageSeq > 0){
      this.renderCanvas(cameraId);
    }else{
      this.imageSeq = 0;
    }
  }

  onLoad(){
    this.cameraInFocus = this.imageService.getCameraId(this.cnt, this.images);
    this.renderCanvas(this.cameraInFocus);
  }

  startStop(){
    this.renderCanvas(this.cameraInFocus);
  }

  switchCamera(){
    this.cnt++;
    //this.imageSeq = -1;
    this.imageSeq = 0;

    if(this.cnt == this.imageService.getNoOfCameras(this.images)){
      this.cnt = 0;
    }
    this.cameraInFocus = this.imageService.getCameraId(this.cnt, this.images);
    //this.onRightArrowDown();
    this.renderCanvas(this.cameraInFocus);
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
    e.lprodAdd = true;
    e.rprodAdd = false;
    e.lproduct = "";
    e.lquantity= 0;
    e.rproduct = "";
    e.rquantity= 0;
    if(this.order.orderAnnotations == undefined){
        this.order.orderAnnotations = new Array<OrderAnnotation>();
    }
    this.order.orderAnnotations.push(e);

  }

  onAnnotationRemove(orderAnnotation: OrderAnnotation){
    this.order.orderAnnotations = this.order.orderAnnotations.filter(x => x.timestamp !== orderAnnotation.timestamp);
  }

  onEventDelete(oe: OrderEvent){
    this.order.orderEvents = this.order.orderEvents.filter(x => x.timestamp !== oe.timestamp);
  }

  onSaveAnnotation(orderAnnotation: OrderAnnotation){
    if (this.annotationForm.valid) {
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

      if(orderAnnotation.lquantity > 0){
        oe.lproductQuantity = orderAnnotation.lquantity;
      }

      let lprod: string = orderAnnotation.lproduct;
      if(orderAnnotation.lprodAdd){
        oe.lproductAdded = lprod;
      }else{
        oe.lproductRemoved = lprod;
      }

      if(orderAnnotation.rquantity > 0){
        oe.rproductQuantity = orderAnnotation.rquantity;
      }

      let rprod: string = orderAnnotation.rproduct;
      if(orderAnnotation.rprodAdd){
        oe.rproductAdded = rprod;
      }else{
        oe.rproductRemoved = rprod;
      }

      oe.lshelf = orderAnnotation.lshelf;
      oe.rshelf = orderAnnotation.rshelf;

      this.order.orderEvents.push(oe);
      this.order.orderAnnotations = new Array<OrderAnnotation>();
      this.annotationForm.reset();
    }
  }

  redirectOrderPage() {
    this.router.navigate(['/']);

  }

}
