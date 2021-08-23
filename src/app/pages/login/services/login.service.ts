import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, IResponseLogin } from '../login/interfaces/login.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { IResponseSignUp, ISignUp } from '../sign-up/interfaces/sign-up.interface';

const {
  url,
  v1
} = environment;
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token = window.sessionStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { }

  login( user: ILogin ): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(`${url}/${v1}/login`, user )
      .pipe( map( data => data ) );
  }

  signup(user: ISignUp): Observable<IResponseSignUp> {
    return this.http.post<IResponseSignUp>(`${url}/${v1}/login/create`, user)
      .pipe(map(data => data));
  }

  validateToken() {
    if (this.token === '' || this.token === null || this.token === undefined) {
      return new Observable(validate => validate.next({isValidate: false}));
    }
    return this.http.get<any>(`${url}/${v1}/login/validate`, this.getHeaders())
      .pipe( map( data => data) );
  }

  private getHeaders(): object {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
  }




}
