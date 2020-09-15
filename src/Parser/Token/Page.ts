import { $, c$el } from '~utils/DOM';
import lodash from '~utils/lodash';
import TokenBase from './TokenBase';
import { IGNORE_LIST, PAGE } from './constants';
import { Content, TokenOption, Properties } from '@types';
import Animation from '../Animation';

class Page extends TokenBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'section';
    this.properties = {} as Properties;
  }

  public getAnimation(): Array<Animation> {
    return lodash.flatten(lodash.compact(this.childTokens.map((token) => token.getAnimation())));
  }

  public pageAnimationType(): string {
    if (!this.style) return 'default';
    return this.style.values('animate') || 'default';
  }

  public getHtml(): string {
    return `<${this.tag} class="bt-slide">
    <svg viewBox="0 0 ${PAGE.width} ${PAGE.height}">
    <foreignObject width="${PAGE.width}" height="${PAGE.height}">
    <div class="bt-content" ${this.style ? this.style.getStyle(IGNORE_LIST.PAGE) : ''}>
    ${this.childHtml()}
    </div>
    </foreignObject>
    </svg>
    </${this.tag}>`;
  }

  protected createElement(): Element {
    const fragment = c$el('div');
    fragment.innerHTML = `<${this.tag} class="bt-slide">
    <svg viewBox="0 0 ${PAGE.width} ${PAGE.height}">
    <foreignObject width="${PAGE.width}" height="${PAGE.height}">
    <div class="bt-content" ${this.style ? this.style.getStyle(IGNORE_LIST.PAGE) : ''}>
    </div>
    </foreignObject>
    </svg>
    </${this.tag}>`;
    const content = $('.bt-content', fragment);
    content!.append(...this.childTokens.map((token) => token.getElement()));
    return fragment.firstElementChild!;
  }
}

export default Page;
