import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-generate-product',
  templateUrl: './generate-product.component.html',
  styleUrls: ['./generate-product.component.scss']
})
export class GenerateProductComponent implements OnInit {

  @Input()
  productInfo!: Product;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  viewProductDetail(productId: string): void {
    this.router.navigateByUrl('/home/product/' + productId);
  }

}
