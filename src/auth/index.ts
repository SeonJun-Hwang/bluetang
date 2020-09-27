import fb from 'firebase/app';
import { firebase } from '~/env.json';

export const init = () => {
  fb.initializeApp(firebase);
};
