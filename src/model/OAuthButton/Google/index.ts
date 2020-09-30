import Presenter from '~presenter/OAuthButton/Google';
import { auth } from 'firebase/app';
import 'firebase/auth';

class GoogleOAuthModel implements Presenter.Model {
  public signIn(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    const credential = auth().signInWithPopup(provider);
    return credential;
  }
}

export default GoogleOAuthModel;
