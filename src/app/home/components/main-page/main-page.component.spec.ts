import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { GenerateProductComponent } from '../generate-product/generate-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let dummyProduct: Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (func: (value: Data) => void) => func({
                products: dummyProduct,
              }),
            }
          }
        },
        ProductService
      ],
      declarations: [
        MainPageComponent,
        GenerateProductComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        NgxPaginationModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyProduct = [
      {
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
      {
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
        rating: 4.3
      }
    ];
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
