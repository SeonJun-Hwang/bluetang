import TokenFactory from './Token/TokenFactory';
import PageAnimationFactory from './Animation/PageAnimation/Factory';
import Page from './Token/Page';
import Chunker from './Chunker';
import ListBase from './Token/List';
import Quote from './Token/Quote';
import Style from './Token/Style';
import TokenBase from './Token/TokenBase';
import Animation from './Animation';

import { className } from '~utils/strings';
import { MAX_INDENT } from './constants';
import { Chunk } from '@types';

class Parser {
  private chunker: Chunker = new Chunker();
  private text: string = '';
  private tokens: Array<Page> = [];

  constructor(text = '') {
    this.setText(text);
  }

  public setText(text: string) {
    this.tokens = this.formPage(this.text2Token(text));
  }

  public getTokens(): TokenBase[] {
    return this.tokens;
  }

  public pages(): Array<string | Element> {
    return this.tokens.map((token) => token.getElement());
  }

  public animations(): Array<Animation> {
    const animations = (this.tokens[0] as Page).getAnimation();
    this.tokens.forEach((token, idx, arr) => {
      if (!idx) return;
      const type = token.pageAnimationType();
      const nowPage: Element = arr[idx - 1].getElement() as Element;
      const nextPage: Element = arr[idx].getElement() as Element;
      const pageAnimation = PageAnimationFactory.createPageAnimation(type, nowPage, nextPage);
      animations.push(pageAnimation, ...token.getAnimation());
    });
    return animations;
  }

  public html(): string {
    return this.tokens.reduce((prev, curr) => `${prev}${curr.getHtml()}`, '');
  }

  private quoting(tokens: Array<TokenBase>): Array<TokenBase> {
    let lastQuote: Quote | null = null;
    return tokens.filter((token: TokenBase) => {
      if (token instanceof Quote) return (lastQuote = lastQuote ? null : token);
      if (lastQuote) lastQuote.addChildToken(token);
      return !lastQuote;
    });
  }

  private styling(tokens: Array<TokenBase>) {
    let lastStyle: Style | null = null;
    return tokens.filter((token) => {
      if (token instanceof Style) {
        lastStyle = token;
        return false;
      }
      if (lastStyle) token.updateStyle(lastStyle);
      lastStyle = null;
      return true;
    });
  }

  private pagination(tokens: Array<TokenBase>) {
    const pages = [];
    for (const token of tokens) {
      if (token instanceof Page) pages.push(token);
      else if (pages.length) pages[pages.length - 1].addChildToken(token);
    }
    return pages;
  }

  private indentation(pages: Array<Page>) {
    pages.forEach((page) => {
      for (let i = MAX_INDENT - 1; i >= 0; i--) page.updateChildTokens(this.groupByIndent(page.getChildTokens(), i));
    });
    return pages;
  }

  private groupByIndent(tokens: Array<TokenBase>, indent: number) {
    let last: TokenBase | null = null;
    return tokens.filter((token) => {
      // 리스트 토큰이 아닌 경우
      if (!(token instanceof ListBase) || token.getIndent() < indent) {
        last = null;
        return true;
      }

      // list 태그 2개가 같은 인덴트를 가질때
      // 태그가 다르면 합치지 않는다.
      if (token.getIndent() === indent) {
        const isUnchangeLast = last && className(last) === className(token);
        isUnchangeLast ? last!.addChildToken(token) : (last = token);
        return !isUnchangeLast;
      }

      // 인덴트가 1 이상 차이가 나면
      // 상단 노드가 없다면 indent를 하나 줄여 다음에 다시 사용한다.
      last ? last.addChildToken(token) : token.decreaseIndent();
      return !last;
    });
  }

  private text2Token(text: string): Array<TokenBase> {
    const lines = text.split('\n').filter((v) => v.trim().length);
    this.chunker.updateTexts(lines);
    return this.chunker.getChunks().map((chunk: Chunk) => TokenFactory.createToken(chunk));
  }

  private formPage(tokens: Array<TokenBase>): Array<Page> {
    const reformedTokens = this.quoting(tokens);
    const styledTokens = this.styling(reformedTokens);
    const pages = this.pagination(styledTokens);
    const indentedPages = this.indentation(pages);

    return indentedPages;
  }
}

export default Parser;
