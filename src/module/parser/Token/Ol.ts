import ListBase from './List';
import { IGNORE_LIST } from './constants';
import { Content, TokenOption } from '~global/types';

class Ol extends ListBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'ol';
    this.properties = { style: '' };
  }

  public getHtml() {
    return `<${this.tag}${this.style ? this.style.getStyle(IGNORE_LIST.ELEMENT) : ''}>${this.childHtml()}</${this.tag}>`;
  }
}

export default Ol;
