import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {interval, Observable, throwError} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import {IUser} from '../store/models/user.model';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  model = 'customers';

  getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }


  getUsers(): Observable<IUser[]> {
    console.log('get users')
    return this.http.get<IUser[]>(this.getUrl())
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getUserById(id): Observable<IUser> {
    console.log('get user')
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

  // getUrlForId(id){
  //   return `${this.getUrl()}/${id}`;
  // }
  //
  // all() {
  //   return this.HttpClient.get(this.getUrl());
  // }
  //
  // create(project) {
  //   return this.HttpClient.post(this.getUrl(), project)
  // }
  //
  // update(project) {
  //   return this.HttpClient.patch(this.getUrlForId(project.id), project)
  // }
  //
  // delete(projectId) {
  //   return this.HttpClient.delete(this.getUrlForId(projectId))
  // }

}
