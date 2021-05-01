import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products: Product[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data.productList;
    })
  }

  viewProductDetail(productId: string){
    this.router.navigateByUrl('/home/product/' + productId);
  }

}
