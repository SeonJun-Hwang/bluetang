import ElementAnimation from './index';

abstract class AbsoluteAnimation extends ElementAnimation {
  protected $fakeEl: Element;
  protected isAbsolute: boolean;
  protected x: number | string;
  protected y: number | string;

  constructor($el: Element) {
    super($el);
    this.isAbsolute = (this.$el as HTMLElement).style.position === 'absolute';
    [this.x, this.y] = this.parseLoc();
    this.$fakeEl = this.makeFakeNode() as Element;
  }

  public abstract animate(): void;

  protected abstract makeFakeNode(): Node;

  private parseLoc() {
    if (this.isAbsolute) return (this.$el as HTMLElement).style.transform.replace(/[^\d ]/g, '').split(' ');
    const { offsetTop, offsetLeft } = this.$el as HTMLElement;
    return [offsetLeft, offsetTop];
  }
}

export default AbsoluteAnimation;
