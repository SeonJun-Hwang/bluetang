import Animation from '..';
import { show, hide } from '~utils/DOM';

abstract class PageAnimation implements Animation {
  protected nowPage: Element;
  protected nextPage: Element;
  constructor ( nowPage: Element, nextPage: Element ) {
    this.nowPage = nowPage;
    this.nextPage = nextPage;
  }

  public abstract animate (): void;

  public rollback () {
    show( this.nowPage );
    hide( this.nextPage );
  }

  public recover () {
    show( this.nextPage );
  }
}

export default PageAnimation;
