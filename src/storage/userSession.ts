import EncryptedStorage from 'react-native-encrypted-storage';
import { UserSession } from "../types/userSession";

const KEY = 'session'

export const save = async (session: UserSession) => {
  try {
    await EncryptedStorage.setItem(KEY, JSON.stringify(session));
  } catch (error) {
      console.log(error)
  }
};

export const get = async () => {
  try {
    const session = await EncryptedStorage.getItem(KEY);
    return session
  } catch (error) {
    console.log(error)
  }
};

export const remove = async () => {
  try {
    await EncryptedStorage.removeItem(KEY);
  } catch (error) {
    console.log(error)
  }
};
