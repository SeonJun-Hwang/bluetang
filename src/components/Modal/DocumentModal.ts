import { $, $$$, show, hide } from '~utils/DOM';
import { base64ToStr } from '~utils/strings';
import { EventType } from '@types';
import { getDocsInfo, getEmail, newDoc, readData, removeDoc, updateLatestDocument } from '~/src/model/firestoreDAO';
import documentDAO from '~src/model/documentDAO';
import Editor from '~/src/controllers/Editor';

interface Info {
  id: string;
  title: string;
}

class DocumentModal {
  private base: Element;
  private onCancel: Array<Function> = [];
  private onAccept: Array<Function> = [];
  private fragment: DocumentFragment;
  private $list: HTMLDivElement;
  private $newDoc: HTMLElement;
  private $close: HTMLButtonElement;
  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
    this.base = this.createModalBase();

    this.fragment = this.createModalFragment();
    this.$list = $('.doc-list', this.fragment) as HTMLDivElement;
    this.$newDoc = $('.new-doc', this.fragment) as HTMLElement;
    this.$close = $$$('modal-close', this.fragment) as HTMLButtonElement;
    this.onAccept.push(this.hide.bind(this));
    this.onCancel.push(this.hide.bind(this));
    this.bindEvents();
  }

  public show() {
    this.updateBody();
    this.base.appendChild(this.fragment.firstElementChild!);
    show(this.base);
  }

  public hide(): void {
    this.fragment.appendChild(this.base.removeChild(this.base.firstElementChild!));
    hide(this.base);
  }

  public addEventListener(type: EventType, callback: Function): void {
    if (type === 'accept') this.onAccept.unshift(callback);
    else if (type === 'cancel') this.onCancel.unshift(callback);
  }

  private createModalBase(): Element {
    const base = Object.assign(document.createElement('div'), { className: 'modal' });
    base.addEventListener('click', (e) => {
      if (e.target === this.base) this.$close.click();
    });
    document.body.appendChild(base);
    return hide(base);
  }

  private createModalFragment(): DocumentFragment {
    const fragment = new DocumentFragment();
    const container = Object.assign(document.createElement('div'), {
      className: 'modal-container',
      innerHTML: `
  <div class="modal-body" style="height:100%">
    <ul class="doc-list" style="height:100%">
      <div class="loading">
        <span>loading...</span>
      </div>
    </ul>
    <button class="new-doc">+ Create new document</button>
  </div>
  <button type="button" id="modal-close" class="btn-close"></button>`,
    });
    fragment.appendChild(container);
    return fragment;
  }

  private bindEvents(): void {
    this.bindCloseClickEvent();
  }

  private bindCloseClickEvent(): void {
    this.$close.addEventListener('click', this.hide.bind(this));
    this.$list.addEventListener('click', this.listEvent.bind(this));
    this.$newDoc.addEventListener('click', this.newDocEvent.bind(this));
  }

  private async listEvent({ target }: Event) {
    const node = target as HTMLElement;
    const $target = node.tagName !== 'LI' ? node.parentElement : node;
    const id = $target?.dataset['id'];
    if (node.classList.contains('remove-doc')) {
      await removeDoc(getEmail()!, id!);
      $target?.removeChild(node);
      return;
    }
    const email = getEmail()!;
    const { title, data } = await readData(email, id!);
    const safeTitle = title || 'title';
    const decodedText = base64ToStr(data);
    this.editor.update(safeTitle, decodedText);
    updateLatestDocument(email, id!);
    documentDAO.getInstance().setId = id!;
    this.hide();
  }

  private async newDocEvent() {
    const info = await newDoc(getEmail()!);
    this.$list.innerHTML += this.docElement(info);
  }

  private async updateBody() {
    const email = getEmail();
    const info = await getDocsInfo(email!);
    this.$list.innerHTML = info.reduce((prev: string, info: Info) => `${prev}${this.docElement(info)}`, '');
    this.$list.style.height = '';
  }

  private docElement({ id, title }: Info) {
    return `<li class="doc-item" data-id=${id}><span class="doc-title">${title}</span><span class="ico close-ico remove-doc"></san></li>`;
  }
}

export default DocumentModal;
