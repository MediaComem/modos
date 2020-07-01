import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndpoints } from '../config/api-endpoints';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth = new Auth();

  constructor(private httpService: HttpClient) { }

  public Authenticate(usermail, password) : Observable<Auth> {
    var credentials = {"email": usermail, "password": password};
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let options = { 'headers': headers };

    return this.httpService.post<Auth>(`${ApiEndpoints.AUTHENTICATION}`, credentials, options).pipe(
      map(data => new Auth().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public setAuth(code, token) {
    this.auth.code = code;
    this.auth.token = token;
  }
  
  public getAuth() {
    return this.auth;
  }

  public getHeaders(token) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
