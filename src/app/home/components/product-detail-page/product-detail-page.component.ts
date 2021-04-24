import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  product: any;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.product = data.product;
    })
  }

  addToCart(productId : string){
    // service call to add to cart, resolver
    this.router.navigateByUrl('/order/cart');
  }

}
