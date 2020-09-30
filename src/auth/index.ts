import fb from 'firebase/app';
import 'firebase/auth';
import { firebase } from '~/env.json';

export const init = () => {
  firebaseInit();
};

const firebaseInit = () => {
  fb.initializeApp(firebase);
};
