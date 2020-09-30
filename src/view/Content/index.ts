import BaseView from '~view/BaseView';
import Editor from '~view/Editor';
import Presenter from '~view/Presenter';
import ContentPresenter from '~presenter/Content';
import { $c, $, isFullScreen, fullScreenChangeEventName, show, hide } from '~utils/DOM';
import { DEBOUNCE_INTERVAL, KEY_STR } from '~global/constants';
import lodash from 'lodash';

class Content extends BaseView implements ContentPresenter.View {
  private contact: ContentPresenter.Contact;
  private $editor: Editor = new Editor();
  private $presenter: Presenter = new Presenter();
  constructor() {
    super();
    this.contact = new ContentPresenter.Contact(this);
  }

  public renderSlides(slides: (string | Element)[]): void {
    const $slides = $('.slide-panel', this.$el!)!;
    $slides.innerHTML = '';
    $slides.append(...slides);
  }

  protected render(): HTMLElement {
    const $content = $c('div', { className: 'content' });
    $content.append(this.$editor.create(), this.$presenter.create());
    return $content;
  }

  protected bindEvent($el: HTMLElement) {
    const $slideWrapper = $('.slide-wrapper', $el);
    const $editor = $('.edit-area', $el);
    const $prev = $('.prev', $el);
    const $next = $('.next', $el);

    document.addEventListener('keydown', this.shortcutEvent.bind(this));
    $slideWrapper?.addEventListener(fullScreenChangeEventName(), () => this.contact.start());
    $editor?.addEventListener('input', lodash.debounce(this.editorInputEvent.bind(this), DEBOUNCE_INTERVAL));
    $prev?.addEventListener('click', () => this.contact.movePrev());
    $next?.addEventListener('click', () => this.contact.moveNext());
  }

  private editorInputEvent(e: Event) {
    const { value } = $('.edit-area', this.$el as Element) as HTMLTextAreaElement;
    this.contact.convertSlide(value);
  }

  private shortcutEvent(e: KeyboardEvent) {
    const { key } = e;
    if (!isFullScreen()) return;
    if (key === KEY_STR.LEFT) this.contact.movePrev();
    else if (key === KEY_STR.RIGHT) this.contact.moveNext();
  }

  public updateButton(nowIndex: number, totalIndex: number): void {
    const $prev = $('.prev', this.$el!);
    const $next = $('.next', this.$el!);
    nowIndex ? show($prev as HTMLElement) : hide($prev as HTMLElement);
    nowIndex + 1 === totalIndex ? hide($next as HTMLElement) : show($prev as HTMLElement);
  }
}

export default Content;
