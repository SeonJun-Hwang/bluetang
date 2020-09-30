import BaseView from '~view/BaseView';
import Presenter from '~presenter/Menu';
import { $, $c, removeClass } from '~utils/DOM';
import { Nullable } from '~global/types';
import fb from 'firebase/app';

class Menu extends BaseView implements Presenter.View {
  private contact: Presenter.Contact;
  constructor() {
    super();
    this.contact = new Presenter.Contact(this);
  }

  protected render(): HTMLElement {
    const $nav = $c('nav', {
      className: 'menu',
      innerHTML: `<div class="menu-container">
        <section class="menu-header">Blue tang</section>
        <ul class="menu-list">
            <li id="save-md"><span class="ico save-ico">save-md</span> 마크다운으로 저장</li>
            <li id="save-marp"><span class="ico save-ico">save-marp</span> Marp 포맷으로 저장</li>
            <li id="help"><span class="ico help-ico">help</span>도움말</li>
        </ul>
      </div>`,
    });

    return $nav;
  }

  protected bindEvent($el: HTMLElement) {
    const $menuList = $('.menu-list', $el);
    $el.addEventListener('click', this.dispose.bind(this));
    $menuList?.addEventListener('click', this.delegateMenu.bind(this));
    fb.auth().onAuthStateChanged(this.updateUserState.bind(this));
  }

  private dispose({ target }: MouseEvent) {
    if (target !== this.$el) return;
    removeClass(this.$el as HTMLElement, 'open');
  }

  private delegateMenu({ target }: Event) {
    const id = (target as HTMLElement).id;
    if (id === 'save-md') this.contact.saveMarkdown();
    else if (id === 'save-marp') this.contact.saveMarp();
    else if (id === 'help') this.contact.openHelpPage();
  }

  private updateUserState(user: Nullable<firebase.User>) {
    if (user) this.insertUserProfile(user);
    else this.removeUserProfile();
  }

  private insertUserProfile({ displayName, email, photoURL }: firebase.User) {
    const $list = $('.menu-list', this.$el!);
    $list?.insertAdjacentHTML('beforebegin', `<div class="profile"><img class="profile-ico" src="${photoURL}"/><p class="name">${displayName}</p><p class="email">${email}</p></div>`);
  }

  private removeUserProfile() {
    const $container = $('.menu-container', this.$el!);
    const $profile = $('.profile', this.$el!);
    if (!$profile) return;
    $container?.removeChild($profile as Node);
  }
}

export default Menu;
