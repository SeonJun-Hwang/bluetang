import HBase from './HBase';
import { Content, TokenOption } from '@types';

class H6 extends HBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'h6';
  }
}

export default H6;
