import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/core/models/product';

import { GenerateProductComponent } from './generate-product.component';

describe('GenerateProductComponent', () => {
  let component: GenerateProductComponent;
  let fixture: ComponentFixture<GenerateProductComponent>;

  let dummyProduct: Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateProductComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyProduct = {
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

    fixture = TestBed.createComponent(GenerateProductComponent);
    component = fixture.componentInstance;
    component.productInfo = dummyProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
