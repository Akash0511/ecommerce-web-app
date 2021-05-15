import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let dummyData: Cart[];
  let mockCartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        CartService
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyData = [
      {
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
          quantity: 4,
          rating: 4.5
        },
        quantity: 1
      },
      {
        product: {
          id: '2',
          name: 'M31 Dual Sim Phone',
          brand: 'Samsung',
          color: 'Navy Blue',
          price: 10000,
          category: 'Mobile',
          description: '',
          features: '',
          imgUrl: '',
          quantity: 4,
          rating: 4.7
        },
        quantity: 1
      }
    ];

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the products present in cart', () => {
    component.cartItems = dummyData;
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'getCartData').and.callFake(() => {
      return of(dummyData);
    });
    component.getCartProducts();
    expect(component.cartItems.length).toBe(2);
    expect(mockCartService.getCartData).toHaveBeenCalled();
  });

  it('should remove the desired product from cart', () => {
    component.cartItems = dummyData;
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'removeProductFromCart').and.callFake(() => {
      return of(dummyData[0]);
    });
    component.removeFromCart(0);
    expect(mockCartService.removeProductFromCart).toHaveBeenCalled();
    expect(mockCartService.removeProductFromCart).toHaveBeenCalledOnceWith(0);
  });

  it('should increase the quantity of products present in the cart', () => {
    component.cartItems = dummyData;
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'increaseProductQuantity');
    spyOn(mockCartService, 'getCartData').and.callFake(() => {
      dummyData[0].quantity = 2;
      return of(dummyData);
    });
    component.plusOne(0);
    expect(component.cartItems[0].quantity).toBe(2);
    expect(mockCartService.increaseProductQuantity).toHaveBeenCalled();
    expect(mockCartService.increaseProductQuantity).toHaveBeenCalledWith(0);
  });

  it('should decrease the quantity of products present in the cart', () => {
    dummyData[0].quantity = 2;
    component.cartItems = dummyData;
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'decreaseProductQuantity');
    spyOn(mockCartService, 'getCartData').and.callFake(() => {
      dummyData[0].quantity = 1;
      return of(dummyData);
    });
    component.minusOne(0);
    expect(component.cartItems[0].quantity).toBe(1);
    expect(mockCartService.decreaseProductQuantity).toHaveBeenCalled();
    expect(mockCartService.decreaseProductQuantity).toHaveBeenCalledWith(0);
  });

  it('should create empty cart', () => {
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'getCartData').and.callFake(() => {
      return of([]);
    });

    spyOn(mockCartService, 'getTotalCartProductPrice').and.returnValue(0);
    component.reloadCart();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('div')).length).toBe(2);
  });

  it('should render each product in a row in the cart', () => {
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'getCartData').and.callFake(() => {
      return of(dummyData);
    });

    spyOn(mockCartService, 'getTotalCartProductPrice').and.returnValue(100);
    component.reloadCart();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('div')).length).toBe(34);
  });

  it('should disable minus button when product quantity is 1', () => {
    component.cartItems = dummyData;
    mockCartService = fixture.debugElement.injector.get(CartService);
    component.minusOne(0);
    expect(component.cartItems[0].quantity).toBe(1);
  });

  it('should get the total price of products present in the cart', () => {
    component.cartItems = dummyData;
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'getTotalCartProductPrice').and.returnValue(100);
    component.getTotalPrice();
    expect(component.totalPrice).toBe(100);
    expect(mockCartService.getTotalCartProductPrice).toHaveBeenCalled();
  });

  it('should navigate to checkout page when clicked on checkout', inject([Router], (router: Router) => {
    spyOn(router, 'navigateByUrl').and.stub();
    component.goToCheckout();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/order/checkout');
  }));

});
