import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Profile } from '../models/profile.model';
import { ApiEndpoints } from '../config/api-endpoints';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(
    public httpService: HttpClient
  ) { }

  public getProfile(id: string): Observable<Profile> {
    return this.httpService.get<Profile>(`${ApiEndpoints.USERS}/${id}/profile`).pipe(
      map(data => new Profile().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public createProfile(id: string, profile: Profile): Observable<Profile> {
    return this.httpService.post<Profile>(`${ApiEndpoints.USERS}/${id}/profile`, profile).pipe(
      map(data => new Profile().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }

  public updateProfile(id: string, profile: Profile): Observable<Profile> {
    return this.httpService.put<Profile>(`${ApiEndpoints.USERS}/${id}/profile`, profile).pipe(
      map(data => new Profile().deserialize(data)),
      catchError((err) => throwError(err))
    );
  }
}
