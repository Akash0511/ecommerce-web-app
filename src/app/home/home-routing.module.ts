import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { ProductDetailResolver } from './resolver/product-detail.resolver';
import { ProductsResolver } from './resolver/products.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        resolve:{
          productList: ProductsResolver
        }
      },
      {
        path: 'product/:productId',
        component: ProductDetailPageComponent,
        resolve:{
          product: ProductDetailResolver
        }
      }
    ],
  },
  {
    path: 'order',
    loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('.././auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
