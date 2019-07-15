import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IUser} from '../store/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/customers`)
      .pipe(
        // map(data => JSON.encode(data)),
        catchError((error: any) => throwError(error.json()))
      );
  }

}
