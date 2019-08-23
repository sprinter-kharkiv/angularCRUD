import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '@services/users.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/users.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '@store/models/user.model';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions,
              private usersService: UsersService,
              private toastr: ToastrService) {
  }

  @Effect()
  getUsers: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.GET_USERS),
    switchMap((action: {[key: string]: any}) => {
      return this.usersService.getUsers().pipe(
        map((users: {[key: string]: any}) => {
          return new actions.GetUsersSuccess(users);
        }),
        catchError(error => of(new actions.GetUsersFailed(error)))
      );
    })
  );

  @Effect()
  addUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.ADD_USER),
    switchMap((action: any) => {
      return this.usersService.createUser(action.payload).pipe(
        map((user: IUser) => {
          this.toastr.success(`User ${action.payload.name} was saved!`);
          return new actions.AddUserSuccess(user);
        }),
        catchError(error => {
          this.toastr.error(error.message, `User not saved!`);
          return of(new actions.AddUserFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.DELETE_USER),
    switchMap((action: any) => {
      return this.usersService.deleteUser(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно удалены!`);
          return new actions.DeleteUserSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные ученика не удалены!`);
          return of(new actions.DeleteUserFailed(error));
        })
      );
    })
  );

  @Effect()
  updateUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.UPDATE_USER),
    switchMap((action: any) => {
      return this.usersService.updateUser(action.payload).pipe(
        map((user: IUser) => {
          this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно изменены!`);
          return new actions.UpdateUserSuccess(user);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные ученика не изменены!`);
          return of(new actions.UpdateUserFailed(error));
        })
      );
    })
  );

  @Effect()
  getUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.GET_USER_BY_ID),
    switchMap((action: any) => {
      return this.usersService.getUserById(action.payload).pipe(
        map((user: IUser) => {
          return new actions.GetUserByIdSuccess(user);
        }),
        catchError(error => of(new actions.GetUserByIdFailed(error)))
      );
    })
  );
}
