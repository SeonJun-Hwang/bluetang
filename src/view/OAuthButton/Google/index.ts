import BaseView from '~view/BaseView';
import Presenter from '~presenter/OAuthButton/Google';
import { $c } from '~utils/DOM';
import { auth } from 'firebase/app';

class GoogleOAuth extends BaseView implements Presenter.View {
  private contact: Presenter.Contact;
  constructor() {
    super();
    this.contact = new Presenter.Contact(this);
  }

  protected render(): HTMLElement {
    const $button = $c('li', {
      innerHTML: `<button class="oauth-btn google">
      <span class="oauth-name"><span data-color="blue">G</span><span data-color="red">o</span><span
              data-color="yellow">o</span><span data-color="blue">g</span><span
              data-color="green">l</span><span data-color="red">e</span></span>으로 시작하기
      </button>`,
    });
    return $button;
  }

  protected bindEvent($el: HTMLElement) {
    $el.addEventListener('click', () => this.contact.login());
  }

  public updateCredential(credential: auth.UserCredential): void {
    console.log(credential ? '로그인 되었습니다.' : '로그인에 실패했습니다.');
  }
}

export default GoogleOAuth;
