import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { CartService } from 'src/app/core/services/cart.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { PlaceOrderComponent } from './place-order.component';
import { Cart } from 'src/app/core/models/cart';

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;
  let dummyProduct: Cart[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CartService],
      declarations: [PlaceOrderComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule,
        MatSnackBarModule,
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
    dummyProduct = [
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
          quantity: 4
        },
        quantity: 1
      }
    ];

    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;
    component.products = dummyProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
