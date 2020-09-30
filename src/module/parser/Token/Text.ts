import TokenBase from './TokenBase';
import { IGNORE_LIST } from './constants';
import { Content, TokenOption } from '~global/types';

class Text extends TokenBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'p';
    this.properties = {
      innerHTML: this.content as string,
      style: this.style ? this.style.getStyle(IGNORE_LIST.ELEMENT, false) : '',
    };
  }

  public getHtml() {
    return `<${this.tag}${this.style ? this.style.getStyle(IGNORE_LIST.ELEMENT) : ''}>${this.content}</${this.tag}>`;
  }
}

export default Text;
