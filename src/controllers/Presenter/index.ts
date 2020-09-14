import { $, $$, zIndex, show, hide, clear } from "~utils/DOM";
import Parser from "~src/Parser/index";
import Animation from "~src/Parser/Animation";

class Presenter {
  private parser = new Parser();
  private $slidePanel: Element;
  private pos = 0;
  private animationCnt = 0;
  private animationQueue: Array<Animation> = [];

  private $slides?: NodeListOf<Element> | null;
  private onAnimate?: Function;
  private onStart?: Function;
  private onFinish?: Function;

  constructor() {
    this.$slidePanel = $(".slide-wrapper > .slide-panel")!;
  }

  public notify(text: string) {
    this.parser.setText(text);
    this.renderSlide(this.parser.pages());
  }

  public start() {
    this.pos = 0;
    this.setUpAnimation();
    this.setUpPresentationView();
    this.callbackStart();
    this.callbackAnimate();
  }

  public next() {
    if (this.pos === this.animationCnt) return;
    const animation = this.animationQueue[this.pos++];
    animation.animate();
    this.callbackAnimate();
  }

  public prev() {
    if (!this.pos) return;
    const animation = this.animationQueue[--this.pos];
    animation.rollback();
    this.callbackAnimate();
  }

  public finish() {
    this.$slides!.forEach((el) => {
      clear(el);
      show(el);
    });
    this.animationQueue.forEach((animation) => animation.recover());
    this.$slides = null;
    this.animationQueue.length = 0;

    this.callbackFinish();
  }

  public setOnAnimate(callback: Function) {
    this.onAnimate = callback;
  }

  public setOnStart(callback: Function) {
    this.onStart = callback;
  }

  public setOnFinish(callback: Function) {
    this.onFinish = callback;
  }

  private renderSlide(pages: Array<string | Element>) {
    this.$slidePanel.innerHTML = "";
    this.$slidePanel.append(...pages);
  }

  private setUpAnimation() {
    this.animationQueue = this.parser.animations();
    this.animationCnt = this.animationQueue.length;
  }

  private setUpPresentationView() {
    this.$slides = $$(".-slide");
    this.$slides.forEach((el, idx, arr) => {
      zIndex(el, (arr.length - idx).toString());
      idx ? hide(el) : show(el);
    });
  }

  private callbackStart() {
    setTimeout(() => {
      if (this.onStart) this.onStart();
    }, 0);
  }

  private callbackAnimate() {
    setTimeout(() => {
      if (this.onAnimate) this.onAnimate(this.pos, !this.pos, this.pos === this.animationCnt);
    }, 0);
  }

  private callbackFinish() {
    setTimeout(() => {
      if (this.onFinish) this.onFinish();
    }, 0);
  }
}

export default Presenter;
