import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';

const routes: Routes = [
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'checkout',
    component: PlaceOrderComponent
  },
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
