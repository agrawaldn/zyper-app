import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderVerifyComponent } from './order-verify/order-verify.component';

const routes: Routes = [
  {path: '', component: OrderListComponent},
  {path: 'verify', component: OrderVerifyComponent},
  {path: 'verify/:id', component: OrderVerifyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
