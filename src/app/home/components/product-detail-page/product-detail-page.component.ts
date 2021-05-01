import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  product: any;
  addCartClick: boolean = false;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly cartService: CartService) { 
      this.addCartClick = false;
    }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data.product;
    })
  }

  addToCart() {
    // service call to add to cart, resolver
    let cartData = {"product": this.product, "quantity": 1};
    this.cartService.addProductToCart(cartData);
    this.addCartClick = true;
    //this.router.navigateByUrl('/order/cart');
  }

  viewCart(){
    this.router.navigateByUrl('/order/cart');
  }

}
