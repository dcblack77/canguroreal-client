import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private route: Router
  ) {}

  canActivate(): boolean {
    const { isValidate } = this.loginService.isValidate()
    if (isValidate) {
      this.route.navigateByUrl('/dashboard');
      return true;
    }
    this.route.navigateByUrl('/login');
    return false
  }
  
}
