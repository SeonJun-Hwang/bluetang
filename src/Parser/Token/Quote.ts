import TokenBase from './TokenBase';
import { c$el } from '~utils/DOM';
import { Content, TokenOption } from '@types';
import Style from './Style';

class Quote extends TokenBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'pre';
    this.properties = {};
  }

  protected createElement(): Element {
    const properties = {
      innerText: this.childTokens.reduce((prev, cur, idx, arr) => `${prev}${cur.getText()}${idx !== arr.length - 1 ? '\n' : ''}`, ''),
    };
    return c$el(this.tag, properties);
  }

  public getHtml(): string {
    return `<${this.tag}>${this.childTokens.reduce((prev, cur, idx, arr) => `${prev}${cur.getText()}${idx !== arr.length - 1 ? '\n' : ''}`, '')}</${this.tag}>`;
  }

  public updateStyle(style: Style) {
    this.style = style;
  }
}

export default Quote;
