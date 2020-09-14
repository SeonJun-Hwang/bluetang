import TokenBase from "./TokenBase";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";
import Text from "./Text";
import Page from "./Page";
import Href from "./Href";
import Image from "./Image";
import Ul from "./Ul";
import Ol from "./OL";
import Quote from "./Quote";
import Style from "./Style";
import { Chunk } from "../@interface";

class TokenFactory {
  static createToken({ tag, content, option }: Chunk): TokenBase {
    switch (tag) {
      case "h1":
        return new H1(content, option);
      case "h2":
        return new H2(content, option);
      case "h3":
        return new H3(content, option);
      case "h4":
        return new H4(content, option);
      case "h5":
        return new H5(content, option);
      case "h6":
        return new H6(content, option);
      case "text":
        return new Text(content, option);
      case "page":
        return new Page(content, option);
      case "a":
        return new Href(content, option);
      case "img":
        return new Image(content, option);
      case "ul":
        return new Ul(content, option);
      case "ol":
        return new Ol(content, option);
      case "quote":
        return new Quote(content, option);
      case "style":
        return new Style(content, option);
      default:
        throw new TypeError("Undefined token");
    }
  }
}

export default TokenFactory;
