import TokenBase from './TokenBase';
import { IGNORE_LIST } from './constants';
import { Content, TokenOption } from '@types';

abstract class HBase extends TokenBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.properties = {
      innerHTML: <string>this.content,
    };
  }

  public getHtml() {
    return `<${this.tag}${this.style ? this.style.getStyle(IGNORE_LIST.ELEMENT) : ''}>${this.content}</${this.tag}>`;
  }
}

export default HBase;
