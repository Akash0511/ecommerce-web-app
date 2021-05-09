import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    ProductDetailPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
