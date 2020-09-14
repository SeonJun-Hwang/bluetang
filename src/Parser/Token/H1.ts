import HBase from './HBase';
import { Content } from '../@types';
import { TokenOption } from '../@interface'

class H1 extends HBase {
  constructor ( content: Content, option: TokenOption ) {
    super( content, option );
    this.tag = 'h1';
  }
}

export default H1;
