import ElementAnimation from './index';

class Twinkle extends ElementAnimation {
  constructor ( $el: Element ) {
    super( $el );
  }

  public animate () {
    this.$el.animate( [
      { opacity: 1 },
      { opacity: 0.3 },
      { opacity: 1 },
      { opacity: 0.3 },
    ], {
      duration: 400,
    } );
  }
}

export default Twinkle;
