import AbsoluteAnimation from './AbsoluteAnimation';
import { PIVOT } from './constants';
import { visible, invisible, transform } from '~utils/DOM';

class Pivot extends AbsoluteAnimation {
  private radius: number;
  private degree: number;
  private inAnimate: boolean = false;
  private isBreak: boolean = false;
  constructor($el: Element) {
    super($el);
    const { radius, degree } = this.calcCircular();
    this.radius = radius;
    this.degree = degree;
    this.setUp();
  }

  public animate() {
    visible(this.$fakeEl);
    window.requestAnimationFrame(this.swing.bind(this, -PIVOT.SWING_DEGREE));
  }

  public rollback() {
    invisible(this.$el);
    this.resetFakeNode();
  }

  public recover() {
    if (this.inAnimate) this.isBreak = true;
    setTimeout(() => {
      visible(this.$el);
      this.$el.parentNode!.removeChild(this.$fakeEl);
      this.isBreak = false;
    }, 0);
  }

  protected makeFakeNode() {
    const $fakeEl = this.$el.cloneNode(true);
    const { style } = $fakeEl as HTMLElement;
    style.position = 'absolute';
    style.top = '0px';
    style.left = '0px';
    style.transform = `translate(${this.y}px, ${-this.x}px) rotate(-${PIVOT.SWING_DEGREE}deg)`;
    style.willChange = 'top left';
    style.visibility = 'hidden';
    return $fakeEl;
  }

  private setUp() {
    invisible(this.$el);
    this.$el.parentNode!.append(this.$fakeEl);
  }

  private calcCircular() {
    const x = Number(this.x);
    const y = Number(this.y);
    const radius = Math.sqrt(x * x + y * y);
    const degree = (Math.acos(x / radius) * PIVOT.PI_TO_DEGREE) / Math.PI;
    return { radius, degree };
  }

  private resetFakeNode() {
    const { style } = this.$fakeEl as HTMLElement;
    style.position = 'absolute';
    style.transform = `translate(${this.y}px, ${-this.x}px) rotate(-${PIVOT.SWING_DEGREE}deg)`;
    style.visibility = 'hidden';
  }

  private calcLocationByDegree(degree: number) {
    const absDegree = this.degree + degree;
    const x = Math.cos((absDegree * Math.PI) / PIVOT.PI_TO_DEGREE) * this.radius;
    const y = Math.sin((absDegree * Math.PI) / PIVOT.PI_TO_DEGREE) * this.radius;
    return [x, y];
  }

  private finish() {
    visible(this.$el);
    invisible(this.$fakeEl);
  }

  private swing(degree: number) {
    if (degree > 0 || this.isBreak) return this.finish();
    const [x, y] = this.calcLocationByDegree(degree);
    transform(this.$fakeEl as Element, `translate(${x}px, ${y}px) rotate(${degree}deg)`);
    window.requestAnimationFrame(this.swing.bind(this, degree + PIVOT.ONCE_PER_SWING_DEGREE));
  }
}

export default Pivot;
