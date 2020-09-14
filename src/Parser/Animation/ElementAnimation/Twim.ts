import AbsoluteAnimation from './AbsoluteAnimation';
import { visible, invisible } from '~utils/DOM';

class Twim extends AbsoluteAnimation {
  constructor ( $el: Element ) {
    super( $el );
    this.setUp();
  }

  public animate () {
    visible( this.$fakeEl );
    const keyframes: PropertyIndexedKeyframes = {
      transform: [ 'scale(0.2)', 'scale(1)' ]
    }
    this.$fakeEl.animate( keyframes, { duration: 400, easing: 'ease-in-out' } ).addEventListener( 'finish', this.callback.bind( this ) );
  }

  public rollback () {
    invisible( this.$el );
    invisible( this.$fakeEl );
  }

  public recover () {
    visible( this.$el );
    this.$el.parentNode!.removeChild( this.$fakeEl );
  }

  private setUp () {
    invisible( this.$el );
    this.$el.parentNode!.append( this.$fakeEl );
  }

  protected makeFakeNode () {
    const $fakeEl = this.$el.cloneNode( true ) as HTMLElement;
    const { style } = $fakeEl;
    style.position = 'absolute';
    style.top = `${this.y}px`;
    style.left = `${this.x}px`;
    style.transform = `scale(0.2)`;
    style.visibility = 'hidden';
    return $fakeEl;
  }

  private callback () {
    visible( this.$el );
    invisible( this.$fakeEl );
  }
}

export default Twim;
