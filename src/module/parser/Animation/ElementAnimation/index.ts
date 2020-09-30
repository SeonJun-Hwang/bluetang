import Animation from '..';
import { show } from '~utils/DOM';

abstract class ElementAnimation implements Animation {
  protected $el: Element;

  constructor ( $el: Element ) {
    this.$el = $el;
  }

  public abstract animate (): void;

  public rollback () {
    show( this.$el );
  }

  public recover () {
    show( this.$el );
  }
}

export default ElementAnimation;
