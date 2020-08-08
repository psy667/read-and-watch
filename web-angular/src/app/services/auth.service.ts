import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;

  protected token$$ = new BehaviorSubject<string>(null);

  public get token$() {
    return this.token$$.asObservable();
  }

  constructor(
      private router: Router,
  ) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token?: string | undefined | null): void {
    if (token) {
      this.isLoggedIn = true;
      localStorage.setItem('token', token);
    } else {
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      this.redirectToLogin();
    }

    this.token$$.next(token);
  }

  private redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
