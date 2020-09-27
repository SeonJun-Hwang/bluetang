import { $, addClass, removeClass } from '~utils/DOM';
import { saveFile } from '~utils/file';
import { getEmail } from '~/src/model/firestoreDAO';
import { BLUE_TANG_TO_MARP_FIRST_PAGE, HELP_PAGE_URL } from './constants';
import DocumentModal from '~components/Modal/DocumentModal';
import Notice from '~components/Notice';
import Editor from '../Editor';

class Menu {
  private editor: Editor;
  private $button = $('.menu-open');
  private $menu = $('.menu');
  private $manageDoc = $('.menu-list > #manage-doc');
  private $saveMd = $('.menu-list > #save-md');
  private $saveMarp = $('.menu-list > #save-marp');
  private $help = $('.menu-list > #help');
  private docModal: DocumentModal;
  private notice: Notice;

  constructor(editor: Editor) {
    this.editor = editor;
    this.docModal = new DocumentModal(editor);
    this.notice = new Notice('로그인 이후 사용 가능합니다.');
    this.bindEvent();
  }

  private bindEvent() {
    this.$button!.addEventListener('click', this.menuClickEvent.bind(this));
    this.$menu!.addEventListener('click', this.menuDiposeEvent.bind(this));
    this.$menu!.addEventListener('click', this.menuDelegateEvent.bind(this));
  }

  private menuClickEvent() {
    this.show();
  }

  private menuDiposeEvent({ target }: Event) {
    const $target = target as HTMLElement;
    if (this.$menu !== $target) return;
    this.hide();
  }

  private menuDelegateEvent({ target }: Event) {
    if (target === this.$manageDoc) this.manageDoc();
    else if (target === this.$saveMd) this.saveMd();
    else if (target === this.$saveMarp) this.saveMarp();
    else if (target === this.$help) this.helpPage();
    this.hide();
  }

  private show() {
    addClass(this.$menu as HTMLElement, 'open');
  }

  private hide() {
    removeClass(this.$menu as HTMLElement, 'open');
  }

  private async manageDoc() {
    const email = await getEmail();
    if (email) this.docModal.show();
    else this.notice.show();
  }

  private saveMd() {
    saveFile('blue.md', this.editor.text());
  }

  private saveMarp() {
    saveFile(
      'blue-marp.md',
      `${BLUE_TANG_TO_MARP_FIRST_PAGE}${this.editor
        .text()
        .split('\n')
        .map((str: string) => str.replace(/^{(.*)}$/, ''))
        .join('\n')}`
    );
  }

  private helpPage() {
    window.open(HELP_PAGE_URL, '_blank');
  }
}

export default Menu;
