import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  successMessage: string = 'Order placed successfully!!!';
  products: Cart[] = [];
  totalPrice: number = 0;
  deliveryDetailsForm!: FormGroup;

  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  phoneControl!: FormControl;
  paymentModeControl!: FormControl;
  addressControl!: FormControl;
  cityControl!: FormControl;
  stateControl!: FormControl;
  pinCodeControl!: FormControl;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartData().subscribe(data => {
      this.products = data;
    });
    if (this.products.length === 0) {
      this.router.navigateByUrl('/order/cart');
      return;
    }

    this.totalPrice = this.cartService.getTotalCartProductPrice();

    this.firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3),
    Validators.pattern('[a-zA-Z ,]+')]);
    this.lastNameControl = new FormControl('', [Validators.required, Validators.minLength(4),
    Validators.pattern('[a-zA-Z ,]+')]);
    this.emailControl = new FormControl('', [Validators.required, Validators.minLength(4),
    Validators.email]);
    this.phoneControl = new FormControl('', [Validators.required, Validators.maxLength(10),
    Validators.minLength(10)]);
    this.paymentModeControl = new FormControl('', [Validators.required]);
    this.addressControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.cityControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]);
    this.stateControl = new FormControl('', [Validators.required]);
    this.pinCodeControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);

    this.deliveryDetailsForm = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      phone: this.phoneControl,
      paymentMode: this.paymentModeControl,
      address: this.addressControl,
      city: this.cityControl,
      state: this.stateControl,
      pinCode: this.pinCodeControl
    });
  }
  onFormSubmit(): void {
    this.cartService.clearCart();
    this.openSnackBar();
    this.router.navigateByUrl('/');
  }

  openSnackBar(): void {
    this.snackBar.open(this.successMessage, '', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'end', panelClass: ['green-snackbar'] });
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  onCancelClicked(): void {
    this.deliveryDetailsForm.reset();
    this.router.navigateByUrl('/order/cart');
  }
}
