import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndpoints } from '../config/api-endpoints';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface IStoredAuthInfo {
  code: number;
  token: string;
  expireDate: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth = new Auth();

  constructor(private httpService: HttpClient) {
    const savedAuthInfo = this.getSavedAuth();
    if (savedAuthInfo) {
      this.auth.code = savedAuthInfo.code;
      this.auth.token = savedAuthInfo.token;
    }
  }

  public Authenticate(usermail, password): Observable<Auth> {
    const credentials = { email: usermail, password };
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = { headers };

    return this.httpService
      .post<Auth>(`${ApiEndpoints.AUTHENTICATION}`, credentials, options)
      .pipe(
        map((data) => {
          this.setAuth(data.code, data.token);
          return this.getAuth();
        }), //new Auth().deserialize(data)),
        catchError((err) => throwError(err))
      );
  }

  public setAuth(code, token) {
    this.auth.code = code;
    this.auth.token = token;
    this.saveAuth({ code, token, expireDate: Date.now() + 60 * 60 * 1000 });
  }

  public getAuth() {
    return this.auth;
  }

  public getHeaders(token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  private saveAuth(auth: IStoredAuthInfo) {
    localStorage.setItem('LS_AUTH', JSON.stringify(auth));
  }

  private getSavedAuth(): IStoredAuthInfo | null {
    const LS_AUTH = localStorage.getItem('LS_AUTH');
    if (!LS_AUTH) {
      return null;
    }

    const savedAuthInfo: IStoredAuthInfo = JSON.parse(LS_AUTH);

    if (Date.now() > savedAuthInfo.expireDate) {
      localStorage.removeItem(LS_AUTH);
      return null;
    }

    return savedAuthInfo;
  }
}
