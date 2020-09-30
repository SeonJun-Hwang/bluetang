import BaseView from '~view/BaseView';
import Header from '~view/Header';
import Content from '~view/Content';
import Menu from '~view/Menu';
import AppPresenter from '~presenter/App';
import { $, $c, addClass, triggerInput } from '~utils/DOM';
import fb from 'firebase/app';
import { createUser } from '~/src/global/firebase';

class App extends BaseView implements AppPresenter.View {
  private contact: AppPresenter.Contact;
  constructor() {
    super();
    this.contact = new AppPresenter.Contact(this);
  }

  protected render(): HTMLElement {
    const $app = $c('div', { id: 'app' });
    const $header = new Header();
    const $content = new Content();
    const $menu = new Menu();
    $app.append($header.create(), $content.create(), $menu.create());
    return $app;
  }

  protected bindEvent($el: HTMLElement) {
    const $menuOpen = $('.menu-open', $el);
    const $menu = $('.menu', $el);
    $menuOpen?.addEventListener('click', () => addClass($menu as HTMLElement, 'open'));
    fb.auth().onAuthStateChanged((user) => this.contact.initBluetang(user));
  }

  public initView(title: string, text: string): void {
    const $title = $('.title', this.$el!) as HTMLInputElement;
    const $editor = $('.edit-area', this.$el!) as HTMLTextAreaElement;
    triggerInput($title, title);
    triggerInput($editor, text);
  }
}

export default App;
