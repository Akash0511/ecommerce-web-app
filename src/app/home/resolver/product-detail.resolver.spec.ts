import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from 'src/app/core/services/product.service';

import { ProductDetailResolver } from './product-detail.resolver';

describe('ProductDetailResolver', () => {
  let resolver: ProductDetailResolver;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    resolver = TestBed.inject(ProductDetailResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
