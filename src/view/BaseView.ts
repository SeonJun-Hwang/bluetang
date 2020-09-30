import { Nullable } from '~global/types';
abstract class BaseView {
  protected $el: Nullable<HTMLElement> = null;
  constructor() {}
  public create(): HTMLElement {
    this.$el = this.render();
    this.bindEvent(this.$el);
    return this.$el;
  }
  protected abstract render(): HTMLElement;
  protected bindEvent($el: HTMLElement): void {}
}

export default BaseView;
