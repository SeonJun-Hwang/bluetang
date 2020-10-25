import BaseModal from './BaseModal';
import { $, $ancestorTag, triggerInput } from '~utils/DOM';
import { getEmail, getDocs, removeDoc, readData, newDoc } from '~global/firestore';
import { updateLatest } from '~global/firebase';
import { firebaseDocType, firebaseDocInfoType } from '~global/types';
import { use } from '~/src/global/satellite';
import { NOW_DOC_ID } from '~/src/global/constants';

class DocumentModal extends BaseModal {
  private $body: HTMLElement;
  private $list: HTMLUListElement;
  constructor() {
    super();
    this.$body = $('.body', this.modal)! as HTMLElement;
    this.$list = $('.doc-list', this.modal)! as HTMLUListElement;
  }

  public show() {
    this.displayLoading();
    this.loadDocuments();
    super.show();
  }

  protected customizeModal($modal: HTMLElement, $header: HTMLElement, $body: HTMLElement, $footer: HTMLElement): void {
    $header.innerHTML = '<p>문서 관리</p>';
    $body.innerHTML = '<ul class="doc-list"></ul>';
    $footer.style.justifyContent = 'flex-end';
    $footer.innerHTML = '<button class="btn info create" style="box-sizing:border-box">추가</button>';
  }

  protected customEventlistener($modal: HTMLElement) {
    const $list = $('.doc-list', $modal);
    const $create = $('.create', $modal);
    $list?.addEventListener('click', this.delegateList.bind(this));
    $create?.addEventListener('click', this.createNewDoc.bind(this));
  }

  private delegateList(event: Event) {
    const node = event.target as HTMLElement;
    const target = $ancestorTag('li', node) as HTMLElement;
    const id = target?.dataset['id']!;
    if (node.classList.contains('remove-doc')) this.removeDocument(id);
    else this.switchDocument(id);
  }

  private createNewDoc() {
    newDoc(getEmail()!, new Date().toLocaleString()).then(() => this.loadDocuments());
  }

  private async switchDocument(id: string) {
    const nowId = use(NOW_DOC_ID);
    if (nowId === id) return;
    const email = getEmail()!;
    const { title, data } = await readData(email, id);
    const $title = $('.title') as HTMLInputElement;
    const $textArea = $('.edit-area') as HTMLTextAreaElement;
    triggerInput($title, title);
    triggerInput($textArea, data);
    use(NOW_DOC_ID, id);
    updateLatest(email, id);
    this.dispose();
  }

  private removeDocument(id: string) {
    if (id === 'default') {
      alert('기본 페이지는 삭제할 수 없습니다.');
      return;
    }
    removeDoc(getEmail()!, id).then(() => this.loadDocuments());
  }

  private async loadDocuments() {
    const data: firebaseDocType[] = await getDocs(getEmail()!);
    this.$list.innerHTML = data.reduce((prev: string, { id, data }: firebaseDocType) => `${prev}${this.docElement(id, data)}`, '');
  }

  private displayLoading() {
    this.$list.innerHTML = '<div class="loading"><span>loading...</span></div>';
  }

  private docElement(id: string, { title, timestamp }: firebaseDocInfoType) {
    return `<li class="doc-item" data-id=${id}>
    <p class="doc-title">${title}</p>
    <div class="doc-info">
    <span class="doc-timestamp">${timestamp.toDate().toLocaleString()}</span>
    <span class="doc-id">${id}</span>
    </div>
    ${id !== 'default' ? `<span class="ico close-ico remove-doc">삭제</span>` : ''}
    </li>`;
  }
}

export default DocumentModal;
