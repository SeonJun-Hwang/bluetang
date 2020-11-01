import ElementAnimation from './index';
import { opacity } from '~utils/DOM';

class Dissolve extends ElementAnimation {
  private originalOpacity: string;
  constructor($el: Element) {
    super($el);
    this.originalOpacity = (this.$el as HTMLElement).style.opacity;

    this.setUp();
  }

  public animate() {
    const keyframes: Keyframe[] = [
      {
        opacity: '0',
      },
      {
        opacity: this.originalOpacity || '1',
      },
    ];
    this.$el.animate(keyframes, { easing: 'ease-in-out', duration: 400 }).addEventListener('finish', this.callback.bind(this));
  }

  public rollback() {
    opacity(this.$el, '0');
  }

  public recover() {
    opacity(this.$el, this.originalOpacity);
  }

  private setUp() {
    opacity(this.$el, '0');
  }

  private callback() {
    opacity(this.$el, this.originalOpacity);
  }
}

export default Dissolve;
