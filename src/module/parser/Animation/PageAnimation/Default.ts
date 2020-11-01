import PageAnimation from './index';
import { show, hide } from '~utils/DOM';

class Default extends PageAnimation {
  constructor(nowPage: Element, nextPage: Element) {
    super(nowPage, nextPage);
  }

  animate() {
    show(this.nextPage);
    hide(this.nowPage);
  }
}

export default Default;
