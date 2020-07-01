import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { StatusCode } from '../models/status-code.model';
import { ApiEndpoints } from '../config/api-endpoints';
import { Observation } from '../models/observation.model';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private httpService: HttpClient,
    private storage: Storage,
    private authenticationService: AuthenticationService
  ) { }

  public getEvents(): Observable<Event[]> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<Event[]>(ApiEndpoints.EVENTS, { headers: headers }).pipe(
      map(data => data.map(data => new Event().deserialize(data))),
      catchError((err) => throwError(err))
    );
    // return from(this.storage.get("Token")).pipe(
    //   switchMap((token) => {
    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     });
    //     return this.httpService.get<Event[]>(ApiEndpoints.EVENTS, { headers: headers }).pipe(
    //       map(data => data.map(data => new Event().deserialize(data))),
    //       catchError((err) => throwError(err))
    //     );
    //   })
    // );
  }

  public getEventById(id: string): Observable<Event> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<Event>(`${ApiEndpoints.EVENTS}/${id}`, { headers: headers }).pipe(
      map(data => new Event().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public createEvent(event: Event): Observable<Event> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.post<Event>(ApiEndpoints.EVENTS, event, { headers: headers }).pipe(
      map(data => new Event().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public updateEvent(event: Event): Observable<Event> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.put<Event>(`${ApiEndpoints.EVENTS}/${event._id}`, event, { headers: headers }).pipe(
      map(data => new Event().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public deleteEvent(id: string): Observable<StatusCode> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.delete<Event>(`${ApiEndpoints.EVENTS}/${id}`, { headers: headers }).pipe(
      map(data => new StatusCode().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public getParticipants(id: string): Observable<string[]> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<string[]>(`${ApiEndpoints.EVENTS}/${id}/users`, { headers: headers }).pipe(
      catchError((err) => throwError(err))
    );
  }

  public getObservations(id: string): Observable<Observation[]> {
    let auth = this.authenticationService.getAuth();
    let headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService.get<Observation[]>(`${ApiEndpoints.EVENTS}/${id}/observations`, { headers: headers }).pipe(
      map(data => data.map(data => new Observation().deserialize(data))),
      catchError((err) => throwError(err))
    );
  }
}

