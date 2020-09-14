import HBase from './HBase';
import { Content } from '../@types';
import { TokenOption } from '../@interface'

class H3 extends HBase {
  constructor ( content: Content, option: TokenOption ) {
    super( content, option );
    this.tag = 'h3';
  }
}

export default H3;
