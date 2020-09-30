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
    }

    public finish() {
      this.model.finishPresentation();
    }

    public moveNext() {
      const index = this.model.nextAnimate();
      const total = this.model.totalAnimate();
      this.view.updateButton(index, total);
    }

    public movePrev() {
      const index = this.model.prevAnimate();
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
    nextAnimate(): number;
    prevAnimate(): number;
    totalAnimate(): number;
  }
}

export default ContentPresenter;
