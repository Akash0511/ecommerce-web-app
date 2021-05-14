import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly USER_SERVICE_BASE_URL = '/assets/templates';

  constructor(private readonly http: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    const url = `${this.USER_SERVICE_BASE_URL}/user.json`;
    return this.http.get<User[]>(url);
  }

  public getUserDetail(userName: string, password: string): Observable<User> {
    return this.getAllUsers().pipe(map(data => data.filter(x => x.userName === userName
      && x.password === password)[0]));
  }
}
