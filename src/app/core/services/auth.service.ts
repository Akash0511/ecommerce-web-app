import { Injectable } from '@angular/core';

const USERNAME_KEY = 'AuthUserName';
const USERID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public logOut(){
    localStorage.clear();
  }

  public saveUserName(username: string){
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUserName(): any{
    return localStorage.getItem(USERNAME_KEY);
  }

  public getUserId(): any{
    return localStorage.getItem(USERID_KEY);
  }

  public saveUserId(username: string){
    localStorage.removeItem(USERID_KEY);
    localStorage.setItem(USERID_KEY, username);
  }

  public isAuthenticated(): boolean{
    if(this.getUserName() !== null){
      return true;
    }
    return false;
  }
}
