import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {interval, Observable, throwError} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import {IUser} from '../store/models/user.model';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) {}

  model = 'customers';

  getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.getUrl())
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getUserById(id): Observable<IUser> {
    return this.http.get<IUser>(this.getUrlForId(id))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createUser(user) {
    return this.http.post(this.getUrl(), user).pipe(
      delay(1000)
    );
  }

  updateUser(user) {
    return this.http.patch(this.getUrlForId(user.id), user);
  }

  deleteUser(id) {
    return this.http.delete(this.getUrlForId(id));
  }
}
