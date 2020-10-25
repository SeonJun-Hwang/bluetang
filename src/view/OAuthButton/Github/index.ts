import BaseView from '~view/BaseView';
import Presenter from '~presenter/OAuthButton/Github';
import Notice from '~component/Notice';
import { auth } from 'firebase/app';
import { $c } from '~utils/DOM';

class GithubOAuth extends BaseView {
  private contact: Presenter.Contact;
  constructor() {
    super();
    this.contact = new Presenter.Contact(this);
  }

  protected render(): HTMLElement {
    const $button = $c('li', {
      innerHTML: `<button class="oauth-btn github"><span class="oauth-name">Github</span>으로 시작하기</button>`,
    });
    return $button;
  }

  protected bindEvent($el: HTMLElement) {
    $el.addEventListener('click', () => this.contact.login());
  }

  public updateCredential(credential: auth.UserCredential): void {
    const type = credential ? 'success' : 'error';
    const message = credential ? '로그인 되었습니다.' : '로그인에 실패하였습니다.';
    new Notice(type, message).show();
  }
}

export default GithubOAuth;
