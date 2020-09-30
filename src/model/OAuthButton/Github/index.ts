import Presenter from '~presenter/OAuthButton/Github';
import { auth } from 'firebase/app';
import 'firebase/auth';

class GithubOAuthModel implements Presenter.Model {
  public async signIn(): Promise<auth.UserCredential> {
    const provider = new auth.GithubAuthProvider();
    const credential = await auth().signInWithPopup(provider);
    return credential;
  }
}

export default GithubOAuthModel;
