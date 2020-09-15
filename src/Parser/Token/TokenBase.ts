import Factory from '../Animation/ElementAnimation/Factory';
import { PAGE, TYPE_TABLE_MAP, IGNORE_LIST_MAP } from './constants';
import { c$el } from '~utils/DOM';
import lodash from '~utils/lodash';
import { Content, TokenOption, Properties } from '@types';
import Style from './Style';
import Animation from '../Animation';

abstract class TokenBase {
  protected text: string;
  protected content: Content;

  protected display: boolean = true;
  protected indent: number;
  protected style: Style | null = null;
  protected childTokens: Array<TokenBase> = [];

  protected tag: string = '';
  protected properties: Properties | null = null;
  protected element: Element | null = null;
  protected html: string | null = null;

  constructor(content: Content, option: TokenOption) {
    const { text, indent } = option;
    this.text = text;
    this.content = content;
    this.indent = indent || 0;
  }

  public getText(): string {
    return this.text;
  }

  public getContent(): Content {
    return this.content;
  }

  public abstract getHtml(): string;

  public getElement(): string | Element {
    if (!this.display) return '';
    if (!this.element) this.element = this.createElement();
    return this.element;
  }

  protected childHtml() {
    return this.childTokens.reduce((prev, cur) => `${prev}${cur.getHtml()}`, '');
  }

  public getAnimation(): Array<Animation> | null {
    if (!this.display) return null;
    const childrenAnimation = this.childTokens.map((child) => child.getAnimation());
    const myAnimation = this.style ? Factory.createAnimation(this.style.values('animate')!, this.getElement() as Element) : null;
    const result = [myAnimation, ...childrenAnimation];
    const filtered = lodash.compact(result);
    return filtered.length ? filtered : null;
  }

  public increaseIndent() {
    this.indent++;
  }

  public decreaseIndent() {
    this.indent--;
  }

  public getIndent() {
    return this.indent;
  }

  public addChildToken(token: TokenBase) {
    this.childTokens.push(token);
  }

  public updateChildTokens(tokens: Array<TokenBase>) {
    this.childTokens = tokens;
  }

  public getChildTokens(): Array<TokenBase> {
    return this.childTokens;
  }

  public updateStyle(style: Style) {
    this.style = style;
    this.properties!.style = this.style.getStyle(IGNORE_LIST_MAP(TYPE_TABLE_MAP(this.tag)), false);
    this.updateDisplay();
  }

  protected createElement(): Element {
    const $el = c$el(this.tag, this.properties!);
    if (this.childTokens.length) $el.append(...this.childTokens.map((token) => token.getElement()));
    return $el;
  }

  private updateDisplay() {
    const x = this.style!.values('x') || 0;
    const y = this.style!.values('y') || 0;
    this.display = x < PAGE.width && y < PAGE.height;
  }
}

export default TokenBase;
