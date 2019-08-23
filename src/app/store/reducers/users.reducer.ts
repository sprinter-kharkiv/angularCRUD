import * as actions from '@store/actions/users.actions';
import { IUser } from '../models/user.model';

export interface State {
  users: IUser[];
  user: IUser;
}

export const initialState: State = {
  users: [],
  user: {} as IUser
};

export function reducer(state = initialState, action: actions.UsersActions) {
  switch (action.type) {
    case actions.UserActionType.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: [...action.payload],
        user:  action.payload[0]
      };
    }
    case actions.UserActionType.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case actions.UserActionType.DELETE_USER_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.UserActionType.GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case actions.UserActionType.SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
}
