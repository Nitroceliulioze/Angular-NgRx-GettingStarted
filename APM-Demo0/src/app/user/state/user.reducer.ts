import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user-page.actions';

export interface UserState{
    maskUserName: boolean;
    currentUser: User;
    users: User[];
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMarkUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
)

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
)
export const getUsers = createSelector(
  getUserFeatureState,
  state => state.users
)

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
  users: []
}

export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
