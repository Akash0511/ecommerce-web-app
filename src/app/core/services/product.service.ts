import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCT_SERVICE_BASE_URL = "/assets/templates";

  constructor(private readonly http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url);
  }

  public getProductDetail(productId : string): Observable<Product> {
    return this.getProducts().pipe(map(data => data.filter(x => x.id === productId)[0]));
  }
}
