import GithubOAuthModel from '~model/OAuthButton/Github';
import { auth } from 'firebase/app';

namespace GithubOAuthPresenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new GithubOAuthModel();
    }

    public login() {
      this.model.signIn().then((credential) => this.view.updateCredential(credential));
    }
  }

  export interface View {
    updateCredential(credential: auth.UserCredential): void;
  }

  export interface Model {
    signIn(): Promise<auth.UserCredential>;
  }
}

export default GithubOAuthPresenter;
