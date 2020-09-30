import Twinkle from './Twinkle';
import Appear from './Appear';
import Disappear from './Disappear';
import Slide from './Slide';
import Pivot from './Pivot';
import Uzumaki from './Uzumaki';
import Twim from './Twim';
import Dissolve from './Dissolve';

class Factory {
  public static createAnimation ( type: string, $el: Element ) {
    switch ( type ) {
      case 'twinkle': return new Twinkle( $el );
      case 'appear': return new Appear( $el );
      case 'disappear': return new Disappear( $el );
      case 'slide-left': return new Slide( $el, { direction: 'left' } );
      case 'slide-right': return new Slide( $el, { direction: 'right' } );
      case 'slide-top': return new Slide( $el, { direction: 'top' } );
      case 'slide-bottom': return new Slide( $el, { direction: 'bottom' } );
      case 'pivot': return new Pivot( $el );
      case 'uzumaki': return new Uzumaki( $el );
      case 'twim': return new Twim( $el );
      case 'dissolve': return new Dissolve( $el );
      default:
        return null;
    }
  }
}

export default Factory;
