import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Observation } from '../models/observation.model';
import { ApiEndpoints } from '../config/api-endpoints';
import { map, catchError } from 'rxjs/operators';
import { StatusCode } from '../models/status-code.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ObservationsService {
  constructor(
    private httpService: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public getObservations(): Observable<Observation[]> {
    const auth = this.authenticationService.getAuth();
    const headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService
      .get<Observation[]>(ApiEndpoints.OBSERVATIONS, { headers })
      .pipe(
        map((data) => data.map((data: any) => new Observation().deserialize(data))),
        catchError((err) => throwError(err))
      );
  }

  public getObservationById(id: string): Observable<Observation> {
    const auth = this.authenticationService.getAuth();
    const headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService
      .get<Observation>(`${ApiEndpoints.OBSERVATIONS}/${id}`, {
        headers,
      })
      .pipe(
        map((data) => new Observation().deserialize(data)),
        catchError((err) => throwError(err))
      );
  }

  public createObservation(observation: Observation): Observable<Observation> {
    const auth = this.authenticationService.getAuth();
    const headers = this.authenticationService.getHeaders(auth.token);
    const body = observation.serialize();
    return this.httpService
      .post<Observation>(ApiEndpoints.OBSERVATIONS, body, { headers })
      .pipe(
        map((data) => new Observation().deserialize(data)),
        catchError((err) => throwError(err))
      );
  }

  public deleteObservation(id: string): Observable<StatusCode> {
    const auth = this.authenticationService.getAuth();
    const headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService
      .delete<Observation>(`${ApiEndpoints.OBSERVATIONS}/${id}`, {
        headers,
      })
      .pipe(
        map((data) => new StatusCode().deserialize(data)),
        catchError((err) => throwError(err))
      );
  }

  public getObstacles(): Observable<string[]> {
    const auth = this.authenticationService.getAuth();
    const headers = this.authenticationService.getHeaders(auth.token);
    return this.httpService
      .get<string[]>(ApiEndpoints.OBSTACLES, { headers })
      .pipe(catchError((err) => throwError(err)));
  }
}
