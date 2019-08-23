import { ActionReducerMap } from '@ngrx/store';
import * as usersReducer from '@store/reducers/users.reducer';

export interface State {
  users: usersReducer.State;
}

export const appReducers: ActionReducerMap<State> = {
  users: usersReducer.reducer
};
