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
  totalPrice: number = 0;

  constructor(private readonly cartService: CartService, private readonly router: Router) { }

  ngOnInit(): void {
    this.reloadCart();
  }

  removeFromCart(index: number){
    this.cartService.removeProductFromCart(index);
    this.reloadCart();
  }

  getCartProducts(){
    this.cartService.getCartData().subscribe(data => {
      this.cartItems = data;
    });
  }

  getTotalPrice(){
    this.totalPrice = this.cartService.getTotalCartProductPrice();
  }

  plusOne(index: number){
    this.cartService.increaseProductQuantity(index);
    this.reloadCart();
  }

  minusOne(index: number){
    if(this.cartItems[index].quantity > 1){
      this.cartService.decreaseProductQuantity(index);
      this.reloadCart();
    } else{
      this.removeFromCart(index);
    }
  }

  reloadCart(){
    this.getCartProducts();
    this.getTotalPrice();
  }

  goToCheckout(){
    this.router.navigateByUrl('/order/checkout');
  }

}
