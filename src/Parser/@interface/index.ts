import { Content } from "../@types";

export interface TokenOption {
  text: string;
  indent: number;
}

export interface ObjectContent {
  link?: string;
  alt?: string;
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
  color?: string;
  bgColor?: string;
  bgImage?: string;
  animate?: string;
}

export interface Properties {
  innerHTML?: string;
  innerText?: string;
  style?: string;
  href?: string;
  target?: string;
  src?: string;
  alt?: string;
}

export interface PairChunk {
  link?: string,
  text?: string
}

export interface Chunk {
  tag: string;
  content: Content;
  option: TokenOption;
}