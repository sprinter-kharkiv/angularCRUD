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
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createUser(user) {
    return this.http.post(`${this.baseUrl}/customers`, user);
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
