export const TAGS = {
  USE_ORIGINAL: ['text', 'code'],
  NEED_ONLY_CONCAT: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'code', 'ul', 'ol'],
  CONVERT_TO_OBJECT: ['a', 'img', 'style'],
  IGNORE_CONTENT: ['page', 'quote'],
  HTML_CONVERTABLE: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'code'],
};

export const IMG_HREF_SPLIT_LENGTH = 3;

export const PATTERNS = {
  indent: /^([ ]{2})*/,
  a: {
    tag: /^\[(.*?)\]\((.*?)\)/,
    convert: /\[(.*?)\]\((.*?)\)/,
  },
  img: {
    tag: /^!\[(.*?)\]\((.*?)\)/,
    convert: /!\[(.*?)\]\((.*?)\)/,
  },
  code: /```(.+)/,
  quote: /^```$/,
  ul: /(^ *)([-*]$)/,
  ol: /(^ *)([\d]*)([.]$)/,
  seperator: {
    startWith: /^[-=]/,
    lengthOf: /[-=]{3}/,
    only: /[^-=]/,
  },
  style: {
    tag: /^{(.*)}$/,
    replacer: /}(.*)$/,
  },
};

export const PAIRS = {
  targets: ['`', '***', '___', '**', '__', '*', '_'],
  pattern: [/`(.*?)`/, /\*\*\*(.*?)\*\*\*/, /___(.*?)___/, /\*\*(.*?)\*\*/, /__(.*?)__/, /\*(.*?)\*/, /_(.*?)_/],
  pairs: [
    ['<code>', '</code>'],
    ['<strong><em>', '</em></strong>'],
    ['<strong><em>', '</em></strong>'],
    ['<strong>', '</strong>'],
    ['<strong>', '</strong>'],
    ['<em>', '</em>'],
    ['<em>', '</em>'],
  ],
};
