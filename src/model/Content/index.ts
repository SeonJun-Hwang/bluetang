import Presenter from '~presenter/Content';
import Parser from '~module/parser';
import Animation from '~module/parser/Animation';

class ContentModel implements Presenter.Model {
  private parser: Parser = new Parser();
  private nowIndex: number = 0;
  private animations: Array<Animation> = [];
  constructor() {}

  public paserMarkdown(markdown: string): (string | Element)[] {
    this.parser.setText(markdown);
    const pages = this.parser.pages();
    return pages;
  }

  public prevAnimate(): number {
    if (!this.nowIndex) return this.nowIndex;
    this.animations[--this.nowIndex].rollback();
    return this.nowIndex;
  }

  public nowAnimate(): number {
    return this.nowIndex;
  }

  public nextAnimate(): number {
    if (this.nowIndex === this.animations.length) return this.nowIndex;
    this.animations[this.nowIndex++].animate();
    return this.nowIndex;
  }

  public totalAnimate(): number {
    return this.animations.length;
  }

  public startPresentation(): void {
    this.nowIndex = 0;
    this.animations = this.parser.animations();
  }

  public finishPresentation(): void {
    this.animations.forEach((animation: Animation) => animation.recover());
    this.nowIndex = 0;
    this.animations = [];
  }
}

export default ContentModel;
