import BaseView from '~view/BaseView';
import { KEY_STR } from '~global/constants';
import { $, $$, $c, forceRepaint, isFullScreen, toggleFullScreen, fullScreenChangeEventName, zIndex, show, hide, clear } from '~utils/DOM';

class Slides extends BaseView {
  constructor() {
    super();
  }

  protected render(): HTMLElement {
    const $presenter = $c('div', {
      className: 'slide-wrapper',
      innerHTML: `
      <div class="slide-panel"></div>
      <div class="presentation floating-btn"><span></span></div>
      <div class="floating-btn editor-open"><span></span></div>
      <button class="slide-btn prev hide"><span></span></button>
      <button class="slide-btn next hide"><span></span></button>`,
    });
    return $presenter;
  }

  protected bindEvent($el: HTMLElement) {
    const $presentation = $('.presentation', $el);
    $presentation?.addEventListener('click', this.startPresentaionView.bind(this));
    $el?.addEventListener(fullScreenChangeEventName(), this.fullScreenChange.bind(this));
    document.addEventListener('keydown', this.fullscreenShortcut.bind(this));
  }

  private fullScreenChange() {
    if (isFullScreen()) return;
    this.finishPresentaionView();
  }

  private fullscreenShortcut(e: KeyboardEvent) {
    const { key } = e;
    if (key !== KEY_STR.F5) return;
    e.preventDefault();
    e.stopPropagation();
    this.startPresentaionView();
  }

  private startPresentaionView() {
    toggleFullScreen(this.$el!);
    const $slides = $$('.bt-slide');
    $slides.forEach((el, idx, arr) => {
      zIndex(el, (arr.length - idx).toString());
      idx ? hide(el) : show(el);
    });
    // forceRepaint($slides[0]);
  }

  private finishPresentaionView() {
    $$('.bt-slide').forEach(($el: Element) => show(clear($el)));
  }
}

export default Slides;
