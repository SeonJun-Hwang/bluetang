import BaseView from '~view/BaseView';
import GoogleLogin from '~view/OAuthButton/Google';
import GithubLogin from '~view/OAuthButton/Github';
import Presenter from '~presenter/Header';
import { Nullable } from '~global/types';
import { getUser } from '~global/firestore';
import { DEBOUNCE_INTERVAL } from '~global/constants';
import { $, $c, addClass, removeClass, toggleClass } from '~utils/DOM';
import fb, { auth } from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';

class Header extends BaseView implements Presenter.View {
  private contact: Presenter.Contact;
  constructor() {
    super();
    this.contact = new Presenter.Contact(this);
  }

  public notifySaveResult(result: Nullable<Date>): void {
    console.log('header', result);
  }

  protected render(): HTMLElement {
    const $header = $c('header', {
      innerHTML: `<button class="menu-open"><span class="ico home-ico">메뉴</span></button>
      <input class="title" placeholder="title" value="title" />
      <div class="sign-in">
          <button class="sign-in-btn">로그인</button>
          <ul class="oauth-list"></ul>
      </div>`,
    });

    const $list = $('.oauth-list', $header);
    const googleLogin = new GoogleLogin();
    const githubLogin = new GithubLogin();
    $list?.append(googleLogin.create(), githubLogin.create());

    return $header;
  }

  protected bindEvent($el: HTMLElement): void {
    const $signInBtn = $('.sign-in-btn', $el);
    const $header = $('.title', $el);
    fb.auth().onAuthStateChanged(this.signStateChange.bind(this));
    $signInBtn?.addEventListener('click', this.signInButtonClickEvent.bind(this));
    $header?.addEventListener('input', _.debounce(this.headerInputEvent.bind(this), DEBOUNCE_INTERVAL));
  }

  private signStateChange(user: Nullable<fb.User>) {
    const $authList = $('.oauth-list', this.$el as Element);
    if (user) {
      this.toggleSignOut();
      removeClass($authList as HTMLElement, 'open');
    } else this.toggleSignIn();
  }

  private signInButtonClickEvent() {
    const $authList = $('.oauth-list', this.$el as Element);
    if (!getUser()) {
      toggleClass($authList as HTMLElement, 'open');
    } else auth().signOut();
  }

  private headerInputEvent(e: Event) {
    const { value } = $('.title', this.$el as Element) as HTMLInputElement;
    this.contact.save(value);
  }

  private toggleSignOut() {
    const $signInBtn = $('.sign-in-btn', this.$el as Element)! as Element;
    ($signInBtn as HTMLButtonElement).innerText = '로그아웃';
    addClass($signInBtn, 'out');
  }

  private toggleSignIn() {
    const $signInBtn = $('.sign-in-btn', this.$el as Element)! as Element;
    ($signInBtn as HTMLButtonElement).innerText = '로그인';
    removeClass($signInBtn, 'out');
  }
}

export default Header;
