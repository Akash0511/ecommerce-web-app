import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //isLoggedIn!: boolean;
  
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    // to maintain the state that from where user come for login
    this.router.navigateByUrl('/auth/login');
  }

  logout(){
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }

}
