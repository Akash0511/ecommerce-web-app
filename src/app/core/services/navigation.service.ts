import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setPreviousUrl(previousUrl: string): void {
    this.previousUrl.next(previousUrl);
  }

  getPreviousUrl(): Observable<string> {
    return this.previousUrl.asObservable();
  }
}
