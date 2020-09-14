import { $, $$$, addClass, removeClass } from '~utils/DOM';

class Mobile {
  private $contentWrapper: Element | null;
  private $editorClose: Element | null;
  private $editorOpen: Element | null;

  constructor () {
    this.$contentWrapper = $( '.content-wrapper' );
    this.$editorClose = $$$( 'editor-close' );
    this.$editorOpen = $( '.editor-open' );

    this.bindEvent();
  }

  private bindEvent () {
    this.$editorOpen!.addEventListener( 'click', this.openEditor.bind( this ) );
    this.$editorClose!.addEventListener( 'click', this.closeEditor.bind( this ) );
  }

  private openEditor () {
    addClass( this.$contentWrapper! as HTMLElement, 'open' );
  }

  private closeEditor () {
    removeClass( this.$contentWrapper! as HTMLElement, 'open' );
  }
}

export default Mobile;
