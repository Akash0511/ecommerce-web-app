import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/core/models/product-category';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  productCategoryData: Category[] = [];

  @Output()
  productCategory: EventEmitter<string> = new EventEmitter();

  constructor(private readonly productService: ProductService) {
    this.productService.getAllProductCategories();
    this.productService.getProductCategory().subscribe(data => {
      this.productCategoryData = data;
    });
  }

  ngOnInit(): void {
  }

  onProductCategorySelected(selectedCategory: string): void {
    this.productCategory.emit(selectedCategory);
  }

}
