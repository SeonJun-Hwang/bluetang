import { visible, invisible } from '~utils/DOM';
import AbsoluteAnimation from './AbsoluteAnimation';

class Uzumaki extends AbsoluteAnimation {
  constructor($el: Element) {
    super($el);
    this.setUp();
  }

  public animate() {
    const keyframes: PropertyIndexedKeyframes = {
      transform: ['rotate(1440deg)', 'rotate(0deg)'],
    };
    this.$fakeEl.animate(keyframes, { duration: 1000, easing: 'ease-in-out' }).addEventListener('finish', this.callback.bind(this));
  }

  public rollback() {
    invisible(this.$el);
    visible(this.$fakeEl);
  }

  public recover() {
    visible(this.$el);
    this.$el.parentNode!.removeChild(this.$fakeEl);
  }

  protected makeFakeNode() {
    const $fakeEl = this.$el.cloneNode(true) as HTMLElement;
    const { style } = $fakeEl;
    if (!this.isAbsolute) style.position = 'absolute';
    style.top = `${this.y}px`;
    style.left = `${this.x}px`;
    style.transform = '';
    return $fakeEl;
  }

  private setUp() {
    invisible(this.$el);
    this.$el.parentNode!.append(this.$fakeEl);
  }

  private callback() {
    visible(this.$el);
    invisible(this.$fakeEl);
  }
}

export default Uzumaki;
