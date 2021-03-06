import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GenerateProductComponent } from './components/generate-product/generate-product.component';
import { RatingComponent } from './components/rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    ProductDetailPageComponent,
    GenerateProductComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
