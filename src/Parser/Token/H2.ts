import HBase from './HBase';
import { Content, TokenOption } from '@types';

class H2 extends HBase {
  constructor ( content: Content, option: TokenOption ) {
    super( content, option );
    this.tag = 'h2';
  }
}

export default H2;
