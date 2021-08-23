import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, IResponseLogin } from '../login/interfaces/login.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { IResponseSignUp, ISignUp } from '../sign-up/interfaces/sign-up.interface';

const {
  url,
  v1
} = environment;

export interface IValidation {
  isValidate: boolean;
}
 
@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  isValid: IValidation = {
    isValidate: false
  };
  access_token = '';
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login( user: ILogin ): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(`${url}/${v1}/login`, user )
      .pipe( map( data => {
        window.sessionStorage.setItem("access_token", data.access_token);
        this.access_token = data.access_token;
        return data
      } ) );
  }

  signup(user: ISignUp): Observable<IResponseSignUp> {
    return this.http.post<IResponseSignUp>(`${url}/${v1}/login/create`, user)
      .pipe(map(data => data));
  }

  validateToken(): Observable<IValidation> {
    if (this.getToken() === '' || this.getToken() === null || this.getToken() === undefined) {
      return new Observable(validate => validate.next({isValidate: false}));
    }
    return this.http.get<IValidation>(`${url}/${v1}/login/validate`, this.getHeaders())
      .pipe( map( data => data) );
  }

  isValidate() {
    console.log(this.getToken());
    this.validateToken().subscribe( validate => {
      this.isValid.isValidate = validate.isValidate;
      console.log(" Dentro del subscribe ", validate)
    });
    console.log(" Variable isValidate ", this.isValid);
    return this.isValid;
  }

  private getHeaders(): object {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    }
  }

  private getToken() {
    const token = window.sessionStorage.getItem("access_token");
    return token
  }




}
