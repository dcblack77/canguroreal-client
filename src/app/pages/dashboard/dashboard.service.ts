import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IRerservas } from './intefaces/dashboard.interface';


const {
  url,
  v1
} = environment;


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getReservas(): Observable<IRerservas[]> { 
    return this.http.get<IRerservas[]>(`${url}/${v1}/reserves`, this.getHeaders())
      .pipe( map( r => r ) );
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
