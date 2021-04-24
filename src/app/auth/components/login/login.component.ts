import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(private service: AuthService, private router: Router) { }
  imgUrl: string = "../../../../assets/images/loginLogo.png";

  ngOnInit(): void {

    this.emailControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      Email: this.emailControl,
      Password: this.passwordControl,
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.service.logIn(this.loginForm.value.Email).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/order/cart');
    },
      (error) => {
        console.log("Something went wrong. Please try again!!!");
      })
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
