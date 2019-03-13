import { call, put, select } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';
import NavigationService from '~/services/navigation';
import api from '~/services/api';

import AuthActions from '../ducks/auth';
import TeamsActions from '../ducks/teams';

export function* init() {
  const token = yield call(AsyncStorage.getItem, '@Omni:token');

  if (token) {
    yield put(AuthActions.signInSuccess(token));
  }

  const activeTeam = yield call(AsyncStorage.getItem, '@Omni:team');

  if (activeTeam) {
    yield put(TeamsActions.selectTeam(JSON.parse(activeTeam)));
  }

  yield put(AuthActions.initCheckSuccess());
}

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    yield call(AsyncStorage.setItem, '@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    NavigationService.navigate('Main');
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Falha na operação'));
  }
}

export function* signOut() {
  yield call(AsyncStorage.clear);
}

export function* getPermissions() {
  const team = yield select(state => state.teams.active);
  const signedIn = yield select(state => state.auth.signedIn);

  if (!signedIn || !team) return;

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
