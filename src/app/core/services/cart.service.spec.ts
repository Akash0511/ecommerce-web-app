import { TestBed } from '@angular/core/testing';
import { Cart } from '../models/cart';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  let dummyProduct1: Cart;

  beforeEach(() => {
    dummyProduct1 = {
      product: {
        id: '1',
        name: 'M31 Dual Sim Phone',
        brand: 'Samsung',
        color: 'Navy Blue',
        price: 15000,
        category: 'Mobile',
        description: '',
        features: '',
        imgUrl: '',
        quantity: 4
      },
      quantity: 1
    };
    TestBed.configureTestingModule({
      providers: [
        CartService
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decrease the quantity of element of cart', () => {
    service.addProductToCart(dummyProduct1);
    service.decreaseProductQuantity(0);
    service.getCartData().subscribe(res => expect(res[0].quantity).toEqual(0));
  });

  it('should clear cart', () => {
    service.addProductToCart(dummyProduct1);
    service.clearCart();
    service.getCartData().subscribe(res => expect(res).toEqual([]));
  });

  it('should add product to the cart', () => {
    service.addProductToCart(dummyProduct1);
    service.getCartData().subscribe(res => expect(res).toEqual([dummyProduct1]));
  });

  it('should get elements of cart', () => {
    service.addProductToCart(dummyProduct1);
    service.getCartData().subscribe(res => expect(res).toEqual([dummyProduct1]));
  });

  it('should get total price of elements of cart', () => {
    service.addProductToCart(dummyProduct1);
    expect(service.getTotalCartProductPrice()).toBe(15000);
  });

  it('should remove product from the cart', () => {
    service.addProductToCart(dummyProduct1);
    service.removeProductFromCart(0);
    service.getCartData().subscribe(res => expect(res).toEqual([]));
  });

  it('should increase the quantity of element of cart', () => {
    service.addProductToCart(dummyProduct1);
    service.increaseProductQuantity(0);
    service.getCartData().subscribe(res => expect(res[0].quantity).toEqual(2));
  });

  it('should increase the quantity of product when added twice', () => {
    service.addProductToCart(dummyProduct1);
    service.addProductToCart(dummyProduct1);
    service.getCartData().subscribe(res => expect(res[0].quantity).toEqual(2));
  });
});
