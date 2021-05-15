import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginDetails } from 'src/app/core/models/loginDetails';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  previousUrl = '';

  loginForm!: FormGroup;

  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly userService: UserService,
    private readonly navigationService: NavigationService) { }

  imgUrl = '../../../../assets/images/loginLogo.png';

  ngOnInit(): void {

    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  onLogin(): void {
    const user: LoginDetails = this.loginForm.value as LoginDetails;
    this.userService.getUserDetail(user.email, user.password).subscribe(response => {
      if (response !== undefined) {
        this.authService.logIn(user.email).subscribe(resp => {
          this.navigationService.getPreviousUrl().subscribe(data => {
            this.previousUrl = data;
          });
          if (this.previousUrl.includes('home')) {
            this.router.navigateByUrl('/home');
          }
          else {
            this.router.navigateByUrl('/order/cart');
          }
        }, (error) => {
          console.log(error);
        });
      } else {
        console.log('Invalid login credentials');
        this.loginForm.reset();
      }
    }, (error) => {
      console.log('Something went wrong. Please try again!!!');
    });
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
