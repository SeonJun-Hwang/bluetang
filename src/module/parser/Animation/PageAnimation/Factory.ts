import Default from './Default';
import Dissolve from './Dissolve';
import Slide from './Slide';
import PageAnimation from '.';

class Factory {
  static createPageAnimation(type: string, nowPage: Element, nextPage: Element): PageAnimation {
    switch (type) {
      case 'dissolve':
        return new Dissolve(nowPage, nextPage);
      case 'slide-left':
        return new Slide(nowPage, nextPage, { direction: 'left' });
      case 'slide-right':
        return new Slide(nowPage, nextPage, { direction: 'right' });
      case 'slide-top':
        return new Slide(nowPage, nextPage, { direction: 'top' });
      case 'slide-bottom':
        return new Slide(nowPage, nextPage, { direction: 'bottom' });
      default:
        return new Default(nowPage, nextPage);
    }
  }
}

export default Factory;
