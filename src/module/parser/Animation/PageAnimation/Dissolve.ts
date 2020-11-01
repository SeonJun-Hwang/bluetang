import PageAnimation from './index';
import { show, hide } from '~utils/DOM';

class Dissolve extends PageAnimation {
  constructor(nowPage: Element, nextPage: Element) {
    super(nowPage, nextPage);
  }

  public animate() {
    const keyFrames: PropertyIndexedKeyframes = {
      opacity: [1, 0],
    };
    show(this.nextPage);
    this.nowPage.animate(keyFrames, { duration: 700, easing: 'ease-in-out' }).addEventListener('finish', this.callback.bind(this));
  }

  public recover() {
    show(this.nowPage);
  }

  public callback() {
    hide(this.nowPage);
  }
}

export default Dissolve;
