import axios from 'axios';
import {User, UserSession} from '../types';
import {getFullPath} from '../helpers/apiHelper';

const LOGIN_PATH = '/api/auth/login';

export const login = async (user: User) => {
  const url = getFullPath(LOGIN_PATH);

  const data = {
    userName: user.username,
    password: user.password,
  };

  const response = await axios.post<UserSession>(url, data);
  return response;
};
