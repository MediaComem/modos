import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { ApiEndpoints } from '../config/api-endpoints';
import { map, catchError } from 'rxjs/operators';
import { StatusCode } from '../models/status-code.model';
import { Event } from '../models/event.model';
import { Observation } from '../models/observation.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    public httpService: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  public getUsers(): Observable<User[]> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<User[]>(ApiEndpoints.USERS, { headers: headers}).pipe(
      map(data => data.map(data => new User().deserialize(data))),
      catchError((err) => throwError(err))
    );
  }

  public getUserById(id: string): Observable<User> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<User>(`${ApiEndpoints.USERS}/${id}`, { headers: headers}).pipe(
      map(data => new User().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public createUser(user: User): Observable<User> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.post<User>(ApiEndpoints.USERS, user, { headers: headers}).pipe(
      map(data => new User().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public updateUser(user: User): Observable<User> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.put<User>(`${ApiEndpoints.USERS}/${user._id}`, user, { headers: headers}).pipe(
      map(data => new User().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public deleteUser(id: string): Observable<StatusCode> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.delete<User>(`${ApiEndpoints.USERS}/${id}`, { headers: headers}).pipe(
      map(data => new StatusCode().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public getUserEvents(id: string): Observable<Event[]> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<Event[]>(`${ApiEndpoints.USERS}/${id}/events`, { headers: headers}).pipe(
      map(data => data.map(data => new Event().deserialize(data))),
      catchError((err) => throwError(err))
    );
  }

  public getUserObservations(id: string): Observable<Observation[]> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<Observation[]>(`${ApiEndpoints.USERS}/${id}/observations`, { headers: headers}).pipe(
      map(data => data.map(data => new Observation().deserialize(data))),
      catchError((err) => throwError(err))
    );
  }

  public joinEvent(userId: string, eventId: string): Observable<User> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.post<User>(`${ApiEndpoints.USERS}/${userId}/join/${eventId}`, {}, { headers: headers}).pipe(
      map(data => new User().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }


}
