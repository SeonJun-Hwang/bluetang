import ElementAnimation from './index';
import { visible, invisible } from '~utils/DOM';

class Appear extends ElementAnimation {
  constructor ( $el: Element ) {
    super( $el );

    this.setUp();
  }

  public animate () {
    visible( this.$el );
  }

  public rollback () {
    invisible( this.$el );
  }

  public recover () {
    visible( this.$el );
  }

  private setUp () {
    invisible( this.$el );
  }
}

export default Appear;
