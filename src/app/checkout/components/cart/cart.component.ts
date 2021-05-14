import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Cart[] = [];
  totalPrice = 0;

  constructor(private readonly cartService: CartService, private readonly router: Router) { }

  ngOnInit(): void {
    this.reloadCart();
  }

  removeFromCart(index: number): void {
    this.cartService.removeProductFromCart(index);
    this.reloadCart();
  }

  getCartProducts(): void {
    this.cartService.getCartData().subscribe(data => {
      this.cartItems = data;
    });
  }

  getTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalCartProductPrice();
  }

  plusOne(index: number): void {
    this.cartService.increaseProductQuantity(index);
    this.reloadCart();
  }

  minusOne(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartService.decreaseProductQuantity(index);
      this.reloadCart();
    } else {
      return;
    }
  }

  reloadCart(): void {
    this.getCartProducts();
    this.getTotalPrice();
  }

  goToCheckout(): void {
    this.router.navigateByUrl('/order/checkout');
  }

}
