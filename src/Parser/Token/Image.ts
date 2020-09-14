import TokenBase from './TokenBase';
import { IGNORE_LIST } from './constants';
import { c$el } from '~utils/DOM';
import { PairChunk, TokenOption, Properties } from '../@interface';
import { Content } from '../@types'

class Image extends TokenBase {
  constructor ( content: Content, option: TokenOption ) {
    super( content, option );
    this.tag = 'img';
    const { link, text } = this.content as PairChunk
    this.properties = {
      src: link,
      alt: text,
      style: '',
    };
  }

  protected createElement (): Element {
    const { style, src, alt } = this.properties!;
    const properties = Object.assign( { style } as Properties, { innerHTML: `<${this.tag} src="${src}" alt="${alt}">` } as PairChunk );
    const $el = c$el( 'p', properties );
    if ( this.childTokens.length ) $el.append( ...this.childTokens.map( token => token.getElement() ) );
    return $el;
  }

  public getHtml () {
    const { link, text } = this.content as PairChunk;
    return `<p${this.style ? this.style.getStyle( IGNORE_LIST.IMAGE ) : ''}><${this.tag} src="${link}" alt="${text}"></p>`;
  }
}

export default Image;
