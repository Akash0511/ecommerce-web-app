import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';

import { ProductDetailPageComponent } from './product-detail-page.component';

describe('ProductDetailPageComponent', () => {
  let component: ProductDetailPageComponent;
  let fixture: ComponentFixture<ProductDetailPageComponent>;
  let testProduct: Product;
  let mockCartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (func: (value: Data) => void)=> func({
                product: testProduct,
              }),
            }
          }
        },
        CartService
      ],
      declarations: [
        ProductDetailPageComponent
      ],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
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
    testProduct = {
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
    };

    fixture = TestBed.createComponent(ProductDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add product to the cart', () => {
    mockCartService = fixture.debugElement.injector.get(CartService);
    spyOn(mockCartService, 'addProductToCart').and.callFake(() => {
      return of(true);
    });
    component.addToCart();
    expect(mockCartService.addProductToCart).toHaveBeenCalled();
  });

  it('should navigate to cart page when clicked on view cart', () => {
    const navigateSpy = spyOn(component['router'], 'navigateByUrl');
    component.viewCart();
    expect(navigateSpy).toHaveBeenCalledWith('/order/cart');
  });
 
  it('should render each div for product details', () => {
    expect(fixture.debugElement.queryAll(By.css('div')).length).toBe(5);
  });
});
