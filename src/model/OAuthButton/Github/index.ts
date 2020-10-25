import Presenter from '~presenter/OAuthButton/Github';
import { auth } from 'firebase/app';
import { createUserTable } from '~global/firestore';
import { createUser } from '~global/firebase';
import 'firebase/auth';

class GithubOAuthModel implements Presenter.Model {
  public async signIn(): Promise<auth.UserCredential> {
    const provider = new auth.GithubAuthProvider();
    const credential = await auth().signInWithPopup(provider);
    if (credential) {
      const { additionalUserInfo, user } = credential;
      const { isNewUser } = additionalUserInfo!;
      if (isNewUser) await this.registerNewUser(user?.email!);
    }

    return credential;
  }

  private async registerNewUser(email: string) {
    await createUserTable(email!);
    await createUser(email!);
  }
}

export default GithubOAuthModel;
