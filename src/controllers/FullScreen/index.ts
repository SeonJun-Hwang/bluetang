import { $, show, hide, forceRepaint, toggleFullScreen, isFullScreen, fullScreenChangeEventName } from "~utils/DOM";
import { KEY_CODE } from "./constants";
import Presenter from "../Presenter";

class FullScreen {
  private presenter: Presenter;
  private $wrapper = $(".slide-wrapper");
  private $prevBtn = $(".slide-wrapper > .prev");
  private $nextBtn = $(".slide-wrapper > .next");
  private $presentationBtn = $(".presentation");

  constructor(presenter: Presenter) {
    this.presenter = presenter;

    this.bindEvents();
  }

  private bindEvents() {
    this.$presentationBtn!.addEventListener("click", this.startFullScreen.bind(this));
    this.$wrapper!.addEventListener(fullScreenChangeEventName(), this.fullScreenChange.bind(this));
    this.$prevBtn!.addEventListener("click", this.movePrevSlide.bind(this));
    this.$nextBtn!.addEventListener("click", this.moveNextSlide.bind(this));

    document.addEventListener("keydown", this.fullscreenKeyEvent.bind(this));
    document.addEventListener("keydown", this.shortCutKeyEvent.bind(this));
    this.presenter.setOnStart(this.onStart.bind(this));
    this.presenter.setOnAnimate(this.onAnimate.bind(this));
    this.presenter.setOnFinish(this.onFinish.bind(this));
  }

  private startFullScreen() {
    toggleFullScreen(this.$wrapper!);
  }

  private fullScreenChange() {
    isFullScreen() ? this.presenter.start() : this.presenter.finish();
  }

  private fullscreenKeyEvent(e: KeyboardEvent) {
    if (!isFullScreen()) return;
    const { keyCode } = e;
    if (keyCode === KEY_CODE.LEFT) this.movePrevSlide();
    else if (keyCode === KEY_CODE.RIGHT) this.moveNextSlide();
  }

  private shortCutKeyEvent(e: KeyboardEvent) {
    const { keyCode } = e;
    if (keyCode !== KEY_CODE.F5) return;
    e.preventDefault();
    this.startFullScreen();
  }

  private movePrevSlide() {
    this.presenter.prev();
  }

  private moveNextSlide() {
    this.presenter.next();
  }

  private onStart() {
    forceRepaint($("foreignObject") as HTMLElement);
  }

  private onAnimate(_: number, isFirst: boolean, isLast: boolean) {
    isFirst ? hide(this.$prevBtn as HTMLElement) : show(this.$prevBtn as HTMLElement);
    isLast ? hide(this.$nextBtn as HTMLElement) : show(this.$nextBtn as HTMLElement);
  }

  private onFinish() {
    hide(this.$prevBtn as HTMLElement);
    hide(this.$nextBtn as HTMLElement);
  }
}

export default FullScreen;
