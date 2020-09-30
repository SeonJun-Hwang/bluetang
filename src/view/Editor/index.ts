import _ from 'lodash';
import { $, $c, show, hide } from '~utils/DOM';
import BaseView from '~view/BaseView';
import EditorPresenter from '~presenter/Editor';
import { Nullable } from '~global/types';
import { DEBOUNCE_INTERVAL, DEFAULT_TEXT } from '~global/constants';

class Editor extends BaseView implements EditorPresenter.View {
  private contact: EditorPresenter.Contact;
  constructor() {
    super();
    this.contact = new EditorPresenter.Contact(this);
  }

  public notifySaveResult(result: Nullable<Date>): void {
    console.log('editor', result);
  }

  protected render(): HTMLElement {
    const $editor = $c('div', {
      className: 'editor-wrapper',
      innerHTML: `
      <div class="editor-menu-wrapper">
          <span class="editor-reset">초기화</span>
          <button type="button" id="editor-close" class="btn-close"></button>
      </div>
      <textarea class="edit-area" placeholder="Need new page tag (---)"></textarea>`,
    });

    return $editor;
  }

  protected bindEvent($el: HTMLElement): void {
    const $editor = $('.edit-area', $el);
    const $reset = $('.editor-reset', $el);
    $editor?.addEventListener('input', _.debounce(this.editorInputEvent.bind(this), DEBOUNCE_INTERVAL));
    $editor?.addEventListener('input', _.debounce(this.changeResetVisibility.bind(this), DEBOUNCE_INTERVAL));
    $reset?.addEventListener('click', this.resetText.bind(this));
  }

  private editorInputEvent(e: Event) {
    const { value } = $('.edit-area', this.$el as Element) as HTMLTextAreaElement;
    this.contact.save(value);
  }

  private changeResetVisibility(e: Event) {
    const $reset = $('.editor-reset', this.$el as HTMLElement)!;
    const { value } = $('.edit-area', this.$el as Element) as HTMLTextAreaElement;
    value !== DEFAULT_TEXT ? show($reset as Element) : hide($reset as Element);
  }

  private resetText() {
    const $editor = $('.edit-area', this.$el as HTMLElement) as HTMLInputElement;
    $editor.value = DEFAULT_TEXT;
    $editor.dispatchEvent(new InputEvent('input'));
  }
}

export default Editor;
