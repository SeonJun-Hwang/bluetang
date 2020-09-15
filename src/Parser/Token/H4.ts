import HBase from './HBase';
import { Content, TokenOption } from '@types';

class H4 extends HBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'h4';
  }
}

export default H4;
