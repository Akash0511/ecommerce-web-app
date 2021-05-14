import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  product: any;
  addCartClick = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cartService: CartService) {
    this.addCartClick = false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
    });
  }

  addToCart(): void {
    const cartData: Cart = { product: this.product, quantity: 1 };
    this.cartService.addProductToCart(cartData);
    this.addCartClick = true;
  }

  viewCart(): void {
    this.router.navigateByUrl('/order/cart');
  }

}
