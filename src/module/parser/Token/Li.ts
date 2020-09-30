import TokenBase from './TokenBase';
import { IGNORE_LIST } from './constants';
import { Content, TokenOption } from '~global/types';

class LiToken extends TokenBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'li';
    this.properties = {
      innerText: this.content as string,
      style: '',
    };
  }

  public getHtml() {
    return `<${this.tag}${this.style ? this.style.getStyle(IGNORE_LIST.ELEMENT) : ''}>${this.content}${this.childHtml()}</${this.tag}>`;
  }
}

export default LiToken;
