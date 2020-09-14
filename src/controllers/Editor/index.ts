import { $, show, hide, addClass, removeClass } from '~utils/DOM';
import LocalStorage from '~utils/localStorage';
import { strToBase64 } from '~utils/strings';
import lodash from '~utils/lodash';
import { KEYS, DEFAULT_TEXT } from '~controllers/constants';
import { DEBOUNCE_INTERVAL } from './constants';
import Presenter from '../Presenter'

class Editor {
  private $wrapper = $( '.editor-wrapper' ) as HTMLElement;
  private $editor = $( '.edit-area' ) as HTMLTextAreaElement;
  private $reset = $( '.editor-reset' ) as HTMLElement;
  private presenter: Presenter;

  constructor ( presenter: Presenter ) {
    this.presenter = presenter;
    this.bindEvents();
  }


  public update ( str: string, save: boolean = true ) {
    this.$editor!.value = str;
    this.presenter.notify( this.$editor!.value );
    this.updateResetIco();
    if ( save ) this.saveStorage( this.$editor.value );
    return this.$editor.value;
  }

  public text () {
    return this.$editor.value;
  }

  private bindEvents () {
    this.$editor.addEventListener( 'input', lodash.debounce( this.inputEvent.bind( this ), DEBOUNCE_INTERVAL ) as any );
    this.$wrapper.addEventListener( 'dragenter', this.dragEnterEvent.bind( this ) );
    this.$wrapper.addEventListener( 'dragover', e => e.preventDefault() );
    this.$wrapper.addEventListener( 'dragleave', this.dragLeaveEvent.bind( this ) );
    this.$wrapper.addEventListener( 'drop', this.dragDropEvent.bind( this ) );
    this.$reset.addEventListener( 'click', this.resetClickEvent.bind( this ) );
  }

  private inputEvent () {
    this.presenter.notify( this.$editor.value );
    this.updateResetIco();
    this.saveStorage( this.$editor.value );
  }

  private resetClickEvent () {
    this.update( DEFAULT_TEXT );
  }

  private dragEnterEvent ( e: DragEvent ) {
    e.preventDefault();
    addClass( this.$wrapper, 'on-drag' );
  }

  private dragLeaveEvent ( e: DragEvent ) {
    e.preventDefault();
    removeClass( this.$wrapper, 'on-drag' );
  }

  private dragDropEvent ( e: DragEvent ) {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer;
    const { items } = data!;
    if ( items ) {
      const promises = [];
      for ( let i = 0; i < items.length; i++ ) {
        if ( data!.items[ i ].kind !== 'file' ) continue;
        const file = items[ i ].getAsFile();
        const { name } = file!;
        const extensionSep = name.lastIndexOf( '.' );
        const extension = name.substring( extensionSep + 1 );
        if ( extension === 'txt' || extension === 'md' ) promises.push( file!.text() );
      }
      if ( promises.length ) Promise.all( promises ).then( outputs => this.update( outputs.join( '\n' ) ) );
    }
    removeClass( this.$wrapper, 'on-drag' );
  }

  private updateResetIco () {
    this.$editor.value !== DEFAULT_TEXT ? show( this.$reset ) : hide( this.$reset );
  }

  private saveStorage ( value: string ) {
    LocalStorage.save( KEYS.storage, strToBase64( value ) );
  }
}

export default Editor;
