import HBase from './HBase';
import { Content } from '../@types';
import { TokenOption } from '../@interface'

class H6 extends HBase {
  constructor ( content: Content, option: TokenOption ) {
    super( content, option );
    this.tag = 'h6';
  }
}

export default H6;
