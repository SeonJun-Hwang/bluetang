import TokenBase from './TokenBase';
import { IGNORE_LIST } from './constants';
import { Content } from '../@types';
import { TokenOption, PairChunk } from '../@interface';

class Href extends TokenBase {
  constructor ( content: Content, option: TokenOption ) {
    super( content, option );
    this.tag = 'a';
    const { link, text } = this.content as PairChunk;
    this.properties = {
      href: link,
      target: '_blank',
      innerText: text,
      style: '',
    };
  }

  public getHtml (): string {
    const { link, text } = this.content as PairChunk;
    return `<${this.tag}${this.style ? this.style!.getStyle( IGNORE_LIST.ELEMENT ) : ''} href="${link}" target="_blank">${text}</${this.tag}>`;
  }
}

export default Href;
