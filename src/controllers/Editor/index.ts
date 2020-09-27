import { $, show, hide, addClass, removeClass } from '~utils/DOM';
import LocalStorage from '~utils/localStorage';
import { strToBase64 } from '~utils/strings';
import lodash from '~utils/lodash';
import { KEYS, DEFAULT_TEXT } from '~controllers/constants';
import { DEBOUNCE_INTERVAL } from './constants';
import Presenter from '../Presenter';
import { getEmail, updateTitle, updateData, getLatestDocument } from '~/src/model/firestoreDAO';
import DocumentDAO from '~src/model/documentDAO';

class Editor {
  private $wrapper = $('.editor-wrapper') as HTMLElement;
  private $editor = $('.edit-area') as HTMLTextAreaElement;
  private $title = $('.title') as HTMLInputElement;
  private $reset = $('.editor-reset') as HTMLElement;
  private presenter: Presenter;

  constructor(presenter: Presenter) {
    this.presenter = presenter;
    this.bindEvents();
  }

  public update(title: string, text: string, save: boolean = true) {
    this.$title.value = title;
    this.$editor!.value = text;
    this.presenter.notify(this.$editor!.value);
    this.updateResetIco();
    if (save) this.saveStorage(this.$title.value, this.$editor.value);
    return this.$editor.value;
  }

  public title(title?: string) {
    if (title) this.$title.value = title;
    return this.$title.value;
  }

  public text() {
    return this.$editor.value;
  }

  private bindEvents() {
    this.$editor.addEventListener('input', lodash.debounce(this.editorEvent.bind(this), DEBOUNCE_INTERVAL) as any);
    this.$title.addEventListener('input', lodash.debounce(this.titleEvent.bind(this), DEBOUNCE_INTERVAL) as any);
    this.$wrapper.addEventListener('dragenter', this.dragEnterEvent.bind(this));
    this.$wrapper.addEventListener('dragover', (e) => e.preventDefault());
    this.$wrapper.addEventListener('dragleave', this.dragLeaveEvent.bind(this));
    this.$wrapper.addEventListener('drop', this.dragDropEvent.bind(this));
    this.$reset.addEventListener('click', this.resetClickEvent.bind(this));
  }

  private editorEvent() {
    this.presenter.notify(this.$editor.value);
    this.updateResetIco();
    this.saveStorage(this.$title.value, this.$editor.value);
  }

  private titleEvent() {
    const email = getEmail();
    if (email) {
      const id = DocumentDAO.getInstance().getId;
      const title = this.$title.value;
      updateTitle(email, id, title);
    } else {
      this.saveStorage(this.$title.value, this.$editor.value);
    }
  }

  private resetClickEvent() {
    this.update(this.$title.value, DEFAULT_TEXT);
  }

  private dragEnterEvent(e: DragEvent) {
    e.preventDefault();
    addClass(this.$wrapper, 'on-drag');
  }

  private dragLeaveEvent(e: DragEvent) {
    e.preventDefault();
    removeClass(this.$wrapper, 'on-drag');
  }

  private dragDropEvent(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer;
    const { items } = data!;
    if (items) {
      const promises = [];
      for (let i = 0; i < items.length; i++) {
        if (data!.items[i].kind !== 'file') continue;
        const file = items[i].getAsFile();
        const { name } = file!;
        const extensionSep = name.lastIndexOf('.');
        const extension = name.substring(extensionSep + 1);
        if (extension === 'txt' || extension === 'md') promises.push(file!.text());
      }
      if (promises.length) Promise.all(promises).then((outputs) => this.update(this.$title.value, outputs.join('\n')));
    }
    removeClass(this.$wrapper, 'on-drag');
  }

  private updateResetIco() {
    this.$editor.value !== DEFAULT_TEXT ? show(this.$reset) : hide(this.$reset);
  }

  private saveStorage(title: string, value: string) {
    LocalStorage.save(KEYS.storage, { title, value: strToBase64(value) });
    this.saveInStoreage(title, value);
  }

  private async saveInStoreage(title: string, value: string) {
    const id = await getLatestDocument(getEmail()!);
    console.log(getEmail(), id);
    updateData(getEmail()!, id, title, value);
  }
}

export default Editor;
