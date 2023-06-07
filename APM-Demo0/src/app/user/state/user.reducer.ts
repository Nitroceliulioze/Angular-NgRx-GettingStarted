import { createAction, createReducer, on } from '@ngrx/store';
import { User } from '../user';

export interface UserState{
    maskUserName: boolean;
    currentUser: User;
    users: User[];
}

export const userReducer = createReducer(
  { maskUserName: false },
  on(createAction('[User] Mask User Name'), (state) => {
    console.log('reducer function' + JSON.stringify(state));
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
