import HBase from './HBase';
import { Content, TokenOption } from '~global/types';

class H5 extends HBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    this.tag = 'h5';
  }
}

export default H5;
