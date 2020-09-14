import ElementAnimation from './index';
import { visible, invisible } from '~utils/DOM';

class Disappear extends ElementAnimation {
  constructor ( $el: Element ) {
    super( $el );
  }

  public animate () {
    invisible( this.$el );
  }

  public rollback () {
    visible( this.$el );
  }

  public recover () {
    visible( this.$el );
  }
}

export default Disappear;
