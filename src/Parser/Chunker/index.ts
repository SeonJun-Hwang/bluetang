import { TAGS, PATTERNS, PAIRS, IMG_HREF_SPLIT_LENGTH } from "./constants";
import { MAX_INDENT } from "../constants";
import { imgMap, hrefMap } from "./callbacks";
import { changeValidPairStrs, changePairStr } from "~utils/strings";
import lodash from "~utils/lodash";
import { TokenOption, PairChunk, Chunk } from "../@interface";
import { Content } from "../@types";

class Chunker {
  private texts: Array<string> = [];
  private chunks: Array<Chunk> = [];

  constructor(texts = [] as Array<string>) {
    this.chunks = texts.map((text) => this.chunkText(text));
  }

  public updateTexts(texts: Array<string>) {
    this.texts = texts;
    this.chunks = this.texts.map((text) => this.chunkText(text));
  }

  public getChunks(): Array<Chunk> {
    return this.chunks;
  }

  private chunkText(text: string): Chunk {
    const indent = this.countIndent(text);
    const strs = this.removeIndent(text).split(" ");
    const tag = this.chunkTagByFirstToken(strs[0]) || this.chunkTagBySource(text);
    const rawContent = this.chunkContent(tag, strs) as Content;
    const content = this.convertHTML(tag, rawContent) as Content;
    const option = { text, indent } as TokenOption;

    return { tag, content, option } as Chunk;
  }

  private countIndent(text: string): number {
    const indents = text.match(PATTERNS.indent) || [];
    return Math.min(indents[0].length >> 1, MAX_INDENT);
  }

  private removeIndent(text: string): string {
    return text.replace(PATTERNS.indent, "");
  }

  private chunkTagByFirstToken(token: string): string {
    if (token === "#") return "h1";
    else if (token === "##") return "h2";
    else if (token === "###") return "h3";
    else if (token === "####") return "h4";
    else if (token === "#####") return "h5";
    else if (token === "######") return "h6";
    else if (token.match(PATTERNS.seperator.lengthOf) && token.match(PATTERNS.seperator.startWith) && !token.match(PATTERNS.seperator.only)) return "page";
    else if (token.match(PATTERNS.ul)) return "ul";
    else if (token.match(PATTERNS.ol)) return "ol";

    return "";
  }

  private chunkTagBySource(source: string): string {
    if (source.match(PATTERNS.img.tag)) return "img";
    else if (source.match(PATTERNS.a.tag)) return "a";
    else if (source.match(PATTERNS.code)) return "code";
    else if (source.match(PATTERNS.quote)) return "quote";
    else if (source.replace(PATTERNS.style.replacer, "}").match(PATTERNS.style.tag)) return "style";

    return "text";
  }

  private chunkContent(tag: string, strs: Array<string>): Content {
    if (TAGS.USE_ORIGINAL.includes(tag)) return strs.join(" ");
    else if (TAGS.NEED_ONLY_CONCAT.includes(tag)) return strs.slice(1).join(" ");
    else if (TAGS.IGNORE_CONTENT.includes(tag)) return "";
    else if (TAGS.CONVERT_TO_OBJECT.includes(tag)) {
      const original = strs.join(" ");

      if (tag === "a" || tag === "img") {
        const values = original.match(PATTERNS[tag].tag) || [];
        return { link: values[2] || "", text: values[1] || "" } as PairChunk;
      } else if (tag === "style")
        return original
          .trim()
          .substring(1, original.length - 1)
          .split(" ")
          .filter((str) => str.length)
          .reduce((map, cur) => {
            const [key, value] = cur.split("=");
            return map.set(key, value);
          }, new Map<string, string>());
    }

    return "";
  }

  private convertHTML(tag: string, content: Content): Content {
    if (!TAGS.HTML_CONVERTABLE.includes(tag) || typeof content !== "string") return content;

    if (tag === "code") return changePairStr(content, "```", "<code>", "</code>");
    const pairChangeed = changeValidPairStrs(content, PAIRS.targets, PAIRS.pattern, PAIRS.pairs);
    const imgChanged = lodash.chunk(pairChangeed.split(PATTERNS.img.convert), IMG_HREF_SPLIT_LENGTH).map(imgMap).join("");
    return lodash.chunk(imgChanged.split(PATTERNS.a.convert), IMG_HREF_SPLIT_LENGTH).map(hrefMap).join("");
  }
}

export default Chunker;
