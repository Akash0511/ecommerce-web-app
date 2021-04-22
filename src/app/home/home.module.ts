import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { SearchProductComponent } from './components/search-product/search-product.component';


@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    ProductDetailPageComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
