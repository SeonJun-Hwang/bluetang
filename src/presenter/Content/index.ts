import ContentModel from '~model/Content';

namespace ContentPresenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new ContentModel();
    }

    public convertSlide(markdown: string): void {
      const pages = this.model.paserMarkdown(markdown);
      this.view.renderSlides(pages);
    }

    public start() {
      this.model.startPresentation();
      this.notifyAnimateChange();
    }

    public finish() {
      this.model.finishPresentation();
      this.notifyAnimateChange();
    }

    public moveNext() {
      this.model.nextAnimate();
      this.notifyAnimateChange();
    }

    public movePrev() {
      this.model.prevAnimate();
      this.notifyAnimateChange();
    }

    private notifyAnimateChange() {
      const index = this.model.nowAnimate();
      const total = this.model.totalAnimate();
      this.view.updateButton(index, total);
    }
  }

  export interface View {
    renderSlides(slides: Array<string | Element>): void;
    updateButton(nowIndex: number, totalIndex: number): void;
  }

  export interface Model {
    paserMarkdown(markdown: string): Array<string | Element>;
    startPresentation(): void;
    finishPresentation(): void;
    prevAnimate(): number;
    nowAnimate(): number;
    nextAnimate(): number;
    totalAnimate(): number;
  }
}

export default ContentPresenter;
