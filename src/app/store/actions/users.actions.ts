import { Action } from '@ngrx/store';
import { IUser } from '../models/user.model';

export const enum UserActionType {
  GET_USERS = 'GET_USERS',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_FAILED = 'GET_USERS_FAILED',
  ADD_USER = 'ADD_USER',
  ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
  ADD_USER_FAILED = 'ADD_USER_FAILED',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED = 'UPDATE_USER_FAILED',
  DELETE_USER = 'DELETE_USER',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED = 'DELETE_USER_FAILED',
  GET_USER_BY_ID = 'GET_USER_BY_ID',
  GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS',
  GET_USER_BY_ID_FAILED = 'GET_USER_BY_ID_FAILED',
  SET_USER = 'SET_USER'
}

export class GetUsers implements Action {
  readonly type = UserActionType.GET_USERS;

  constructor(public payload?: {[key: string]: any}) {
  }
}

export class GetUsersSuccess implements Action {
  readonly type = UserActionType.GET_USERS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetUsersFailed implements Action {
  readonly type = UserActionType.GET_USERS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddUser implements Action {
  readonly type = UserActionType.ADD_USER;

  constructor(public payload: IUser) {
  }
}

export class AddUserSuccess implements Action {
  readonly type = UserActionType.ADD_USER_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class AddUserFailed implements Action {
  readonly type = UserActionType.ADD_USER_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateUser implements Action {
  readonly type = UserActionType.UPDATE_USER;

  constructor(public payload: IUser) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionType.UPDATE_USER_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class UpdateUserFailed implements Action {
  readonly type = UserActionType.UPDATE_USER_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteUser implements Action {
  readonly type = UserActionType.DELETE_USER;

  constructor(public payload: IUser) {
  }
}

export class DeleteUserSuccess implements Action {
  readonly type = UserActionType.DELETE_USER_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class DeleteUserFailed implements Action {
  readonly type = UserActionType.DELETE_USER_FAILED;

  constructor(public payload: string) {
  }
}

export class GetUserById implements Action {
  readonly type = UserActionType.GET_USER_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetUserByIdSuccess implements Action {
  readonly type = UserActionType.GET_USER_BY_ID_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class GetUserByIdFailed implements Action {
  readonly type = UserActionType.GET_USER_BY_ID_FAILED;

  constructor(public payload: number) {
  }
}

export class SetUser implements Action {
  readonly type = UserActionType.SET_USER;

  constructor(public payload: IUser | {[key: string]: any}) {
  }
}


export type UsersActions =
  GetUsers |
  GetUsersSuccess |
  GetUsersFailed |
  AddUser |
  AddUserSuccess |
  AddUserFailed |
  UpdateUser |
  UpdateUserSuccess |
  UpdateUserFailed |
  DeleteUser |
  DeleteUserSuccess |
  DeleteUserFailed |
  GetUserById |
  GetUserByIdSuccess |
  GetUserByIdFailed |
  SetUser;
