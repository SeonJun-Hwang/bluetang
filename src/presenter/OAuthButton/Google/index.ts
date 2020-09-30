import GoogleOAuthModel from '~model/OAuthButton/Google';
import { auth } from 'firebase/app';

namespace GoogleOAuthPresenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new GoogleOAuthModel();
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

export default GoogleOAuthPresenter;
