import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

const USERNAME_KEY = 'AuthUserName';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  validateUserIdentitySubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  
  constructor() { }

  public logIn(username: string) : Observable<string>{
    this.saveUserName(username);
    this.validateUserIdentitySubject.next(true);
    return of("login success");
  }

  public logOut(){
    localStorage.removeItem(USERNAME_KEY);
    localStorage.clear();
    this.validateUserIdentitySubject.next(false);
  }

  public saveUserName(username: string){
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUserName(): any{
    return localStorage.getItem(USERNAME_KEY);
  }

  public isAuthenticated(): boolean{
    if(this.getUserName() !== null){
      return true;
    }
    return false;
  }

  public isLoggedIn(): Observable<boolean>{
    return this.validateUserIdentitySubject.asObservable();
  }
}
