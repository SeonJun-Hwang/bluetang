import AbsoluteAnimation from './AbsoluteAnimation';
import { visible, invisible } from '~utils/DOM';
import { SLIDE } from './constants';

interface SlideOption {
  direction: string;
}

class Slide extends AbsoluteAnimation {
  private direction: string;
  constructor($el: Element, { direction }: SlideOption) {
    super($el);
    this.direction = direction;
    this.setUp();
  }

  public animate() {
    visible(this.$fakeEl);
    const keyframes: PropertyIndexedKeyframes = {
      margin: [this.getDirectionMargin(), '0'],
    };
    this.$fakeEl.animate(keyframes, { duration: 700, easing: 'ease-in-out' }).addEventListener('finish', this.callback.bind(this));
  }

  public rollback() {
    invisible(this.$el);
    invisible(this.$fakeEl);
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
    style.margin = this.getDirectionMargin();
    invisible($fakeEl);
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

  private getDirectionMargin() {
    switch (this.direction) {
      case 'left':
        return SLIDE.left;
      case 'right':
        return SLIDE.right;
      case 'top':
        return SLIDE.top;
      case 'bottom':
        return SLIDE.bottom;
      default:
        return '';
    }
  }
}

export default Slide;
