import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';

const components = [HeaderComponent, FooterComponent, SearchProductComponent];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchProductComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    components
  ]
})
export class SharedModule { }
