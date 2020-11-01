import PageAnimation from './index';
import { show, hide } from '~utils/DOM';

interface SlideOption {
  direction: string;
}

class Slide extends PageAnimation {
  private directionClass: string;
  constructor(nowPage: Element, nextPage: Element, option: SlideOption) {
    super(nowPage, nextPage);
    const { direction } = option;
    this.directionClass = `will-${direction}-in`;

    this.setUp();
  }

  public animate() {
    hide(this.nowPage);
    show(this.nextPage);
    window.requestAnimationFrame(() => this.nextPage.classList.add('move-in'));
  }

  public rollback() {
    this.nextPage.classList.remove('move-in');
    hide(this.nextPage);
    show(this.nowPage);
  }

  public recover() {
    this.nextPage.classList.remove('will-move', this.directionClass, 'move-in');
  }

  private setUp() {
    this.nextPage.classList.add('will-move', this.directionClass);
  }
}

export default Slide;
