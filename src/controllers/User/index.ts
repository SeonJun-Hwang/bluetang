import { $, addClass, removeClass, toggleClass } from '~utils/DOM';
import firebase, { auth } from 'firebase/app';
import 'firebase/auth';
import { Nullable } from '~/src/@types';
import { createUserTable } from '~/src/model/firestoreDAO';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

class UserController {
  private $signBtn = $('.sign-in-btn');
  private $oauthList = $('.sign-in > .oauth-list');
  private $google = $('.oauth-list .google');
  private $github = $('.oauth-list .github');
  private $close = $('.oauth-list .close');
  private $menuList = $('.menu > .menu-list');
  private isSigned = false;

  constructor() {
    this.bindEvents();
  }

  private bindEvents() {
    firebase.auth().onAuthStateChanged(this.userChangeEvent.bind(this));
    this.$signBtn?.addEventListener('click', this.signInBtnClickEvent.bind(this));
    this.$close?.addEventListener('click', this.signCloseBtnClickEvent.bind(this));
    this.$google?.addEventListener('click', this.googleSignIn.bind(this));
    this.$github?.addEventListener('click', this.githubSignIn.bind(this));
  }

  private signInBtnClickEvent() {
    if (this.isSigned) auth().signOut();
    else toggleClass(this.$oauthList as Element, 'open');
  }

  private signCloseBtnClickEvent() {
    removeClass(this.$oauthList as Element, 'open');
  }

  private googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { additionalUserInfo } = result;
        const { isNewUser, profile } = additionalUserInfo!;
        const { email } = profile as GoogleUser;
        if (!isNewUser) return;
        createUserTable(email);
      })
      .catch((error) => {
        console.dir(error);
        alert('로그인 과정에서 문제가 발생했습니다.');
      });
  }

  private githubSignIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { additionalUserInfo } = result;
        const { isNewUser, profile } = additionalUserInfo!;
        const { email } = profile as GoogleUser;
        if (!isNewUser) return;
        createUserTable(email);
      })
      .catch((error) => {
        console.dir(error);
        alert('로그인 과정에서 문제가 발생했습니다.');
      });
  }

  private userChangeEvent(user: Nullable<firebase.User>) {
    console.log('--user');
    this.isSigned = !!user;
    user ? this.update2SignIn(user) : this.update2SignOut();
  }

  private appendUserProfile(user: firebase.User) {
    const { displayName, email, photoURL } = user;
    this.$menuList?.insertAdjacentHTML('beforebegin', `<div class="profile"><img class="profile-ico" src="${photoURL}"/><p class="name">${displayName}</p><p class="email">${email}</p></div>`);
  }

  private removeUserProfile() {
    const $menu = $('.menu');
    const $profile = $('.profile', $menu!);
    if (!$profile) return;
    $menu!.removeChild($profile as Node);
  }

  private update2SignIn(user: firebase.User) {
    this.appendUserProfile(user);
    (this.$signBtn as HTMLElement).innerText = '로그아웃';
    addClass(this.$signBtn as HTMLElement, 'out');
    removeClass(this.$oauthList as Element, 'open');
  }

  private update2SignOut() {
    this.removeUserProfile();
    (this.$signBtn as HTMLElement).innerText = '로그인';
    removeClass(this.$signBtn as HTMLElement, 'out');
  }
}

export default UserController;
