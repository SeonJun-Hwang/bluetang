import { $, $$$, show, hide } from '~utils/DOM';

interface Base64ModalOption {
  cancelAble?: Function;
  text?: string;
  title?: string;
  ok?: string;
  cancel?: string;
  disabled?: boolean;
}

type EventType = 'accept' | 'cancel';

class Base64Modal {
  private base: Element;
  private onCancel: Array<Function> = [];
  private onAccept: Array<Function> = [];
  private cancelAble: boolean;
  private text: string;
  private disabled: boolean;
  private title: string;
  private ok: string;
  private cancel: string;
  private fragment: DocumentFragment;
  private $title: HTMLParagraphElement;
  private $text: HTMLTextAreaElement;
  private $ok: HTMLButtonElement;
  private $cancel: HTMLButtonElement;
  private $close: HTMLButtonElement;

  constructor ( option: Base64ModalOption = {} ) {
    const { cancelAble, text, title, ok, cancel, disabled } = option;
    this.base = this.createModalBase();

    this.cancelAble = !!cancelAble;
    this.disabled = !!disabled;
    this.title = title || '';
    this.text = text || '';
    this.ok = ok || '확인';
    this.cancel = cancel || '취소';

    this.fragment = this.createModalFragment();
    this.$title = $( '.modal-header > p', this.fragment ) as HTMLParagraphElement;
    this.$text = $( '.modal-body > textarea', this.fragment ) as HTMLTextAreaElement;
    this.$ok = $$$( 'modal-ok', this.fragment ) as HTMLButtonElement;
    this.$cancel = $$$( 'modal-cancel', this.fragment ) as HTMLButtonElement;
    this.$close = $$$( 'modal-close', this.fragment ) as HTMLButtonElement;
    this.onAccept.push( this.hide.bind( this ) );
    this.onCancel.push( this.hide.bind( this ) )
    this.bindEvents();
  }

  public show (): void {
    this.base.appendChild( this.fragment.firstElementChild! );
    show( this.base );
  }

  public hide (): void {
    this.fragment.appendChild( this.base.removeChild( this.base.firstElementChild! ) );
    hide( this.base );
  }

  public setTitle ( str?: string ): string {
    if ( str ) {
      this.title = str;
      ( this.$title as HTMLInputElement ).value = this.title;
    }
    return this.title;
  }

  public setText ( str?: string ): string {
    if ( str ) {
      this.text = str;
      this.$text.value = this.text;
    }
    return this.text;
  }

  public addEventListener ( type: EventType, callback: Function ): void {
    if ( type === 'accept' ) this.onAccept.unshift( callback );
    else if ( type === 'cancel' ) this.onCancel.unshift( callback );
  }

  private createModalBase (): Element {
    const base = Object.assign( document.createElement( 'div' ), { className: 'modal' } );
    base.addEventListener( 'click', e => {
      if ( e.target === this.base ) this.$close.click();
    } );
    document.body.appendChild( base );
    return hide( base );
  }

  private createModalFragment (): DocumentFragment {
    const fragment = new DocumentFragment();
    const container = Object.assign( document.createElement( 'div' ), {
      className: 'modal-container',
      innerHTML: `<div class="modal-header"><p>${this.title}</p></div>
  <div class="modal-body"><textarea ${this.disabled ? 'disabled' : ''}>${this.text}</textarea></div>
  <div class="modal-footer"><button id="modal-cancel" class="btn btn--tertiary btn--medium ${this.cancelAble ? '' : 'hide'}">${this.cancel}</button><button id="modal-ok" class="btn btn--secondary btn--medium">${this.ok}</button></div>
  <button type="button" id="modal-close" class="btn-close"></button>`,
    } );
    fragment.appendChild( container );
    return fragment;
  }

  private bindEvents (): void {
    this.bindCloseClickEvent();
    this.bindOkClickEvent();
    this.bindCancelClickEvent();
  }

  private bindCloseClickEvent (): void {
    this.$close.addEventListener( 'click', this.hide.bind( this ) );
  }

  private bindOkClickEvent (): void {
    this.$ok.addEventListener( 'click', () => this.onAccept.forEach( callback => callback( this.$text.value ) ) )
  }

  private bindCancelClickEvent () {
    if ( !this.cancelAble ) return;
    this.$cancel.addEventListener( 'click', () => this.onCancel.forEach( callback => callback().bind( this ) ) )
  }
}

export default Base64Modal;
