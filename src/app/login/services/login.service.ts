import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, IResponseErrorLogin, IResponseLogin } from '../login/interfaces/login.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { IResponseSignUp, ISignUp } from '../sign-up/interfaces/sign-up.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.api;


  constructor(
    private http: HttpClient
  ) { }

  login( user: ILogin ): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(`${this.url}/login`, user )
      .pipe( map( data => data ) );
  }

  signup(user: ISignUp): Observable<IResponseSignUp> {
    return this.http.post<IResponseSignUp>(`${this.url}/login/create`, user)
      .pipe(map(data => data));
  }
}
