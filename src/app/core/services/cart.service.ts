import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartDataSubject = new BehaviorSubject<Cart[]>([]);

  constructor() { }

  addProductToCart(cartData: Cart){
    let cartItems = this.cartDataSubject.getValue();
    let productItem = cartItems.find(item => item.product.id === cartData.product.id);
    productItem ? productItem.quantity += cartData.quantity : cartItems.push(cartData);
    this.cartDataSubject.next(cartItems);
  }

  removeProductFromCart(index: number){
    let cartItems = this.cartDataSubject.getValue();
    cartItems.splice(index, 1);
    this.cartDataSubject.next(cartItems);
  }

  getTotalCartProductPrice(): number {
    let cartItems = this.cartDataSubject.getValue();
    return cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.quantity, 0);
  }

  getCartData(): Observable<Cart[]> {
    return this.cartDataSubject.asObservable();
  }

  increaseProductQuantity(index: number) {
    let cartItems = this.cartDataSubject.getValue();
    cartItems[index].quantity += 1;
    this.cartDataSubject.next(cartItems);
  }

  decreaseProductQuantity(index: number){
    let cartItems = this.cartDataSubject.getValue();
    cartItems[index].quantity -= 1;
    this.cartDataSubject.next(cartItems);
  }

  clearCart(){
    this.cartDataSubject.next([]);
  }
}
