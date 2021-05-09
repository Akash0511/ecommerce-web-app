import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: any;

  cart: number = 0;

  constructor(private readonly authService: AuthService, private readonly router: Router,
    private readonly cartService: CartService, public readonly translate: TranslateService, private readonly productService: ProductService) {

    translate.addLangs(['en', 'hn']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hn/) ? browserLang : 'en');

    this.authService.isLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });

    this.cartService.getCartData().subscribe(data => {
      this.cart = data.length;
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigateByUrl('/auth/login');
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }

  changeLang(language: string): void {
    this.translate.use(language);
  }

  searchTextHandler(searchText: string): void {
    this.productService.getProductDetailsByName(searchText);
  }
}
