import { database } from 'firebase/app';
import 'firebase/database';
import { base64ToStr, strToBase64 } from '~utils/strings';

export const createUser = (email: string) => {
  const db = database();
  db.ref(`/user/${strToBase64(email)}`).set({ latest: 'default' });
};

export const updateLatest = (email: string, latest: string) => {
  const db = database();
  db.ref(`/user/${strToBase64(email)}`).update({ latest });
};

export const getLatest = async (email: string) => {
  const db = database();
  const id = strToBase64(email);
  const snapshot = await db.ref(`/user/${id}/latest`).once('value');
  return snapshot.val();
};
