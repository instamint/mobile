import {RDX_LOGIN, RDX_LOGOUT} from './index';
import {UserSession} from '../../types/userSession';

export function authLogin(payload: UserSession) {
  return {
    type: RDX_LOGIN,
    payload: payload,
  };
}

export function authLogout() {
  return {
    type: RDX_LOGOUT,
  };
}
