import TokenBase from "./TokenBase";
import LiToken from "./Li";
import { TokenOption } from "../@interface";
import { Content } from "../@types";

abstract class ListBase extends TokenBase {
  constructor(content: Content, option: TokenOption) {
    super(content, option);
    super.addChildToken(new LiToken(content, option));
  }

  public addChildToken(token: TokenBase) {
    if (this.indent === token.getIndent()) this.childTokens.push(...token.getChildTokens());
    else this.childTokens[this.childTokens.length - 1].addChildToken(token);
  }
}

export default ListBase;
