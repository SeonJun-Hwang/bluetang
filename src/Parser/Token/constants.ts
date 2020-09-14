export enum STYLE_LIST {
  bgColor = 'background-color',
  bgImage = 'background',
  color = 'color',
  w = 'width',
  h = 'height',
  x = 'left',
  y = 'top',
  z = 'z-index',
}

export const STYLE_LIST_MAP = ( type: string ): string => {
  switch ( type ) {
    case 'bgColor': return 'background-color';
    case 'bgImage': return 'background';
    case 'color': return 'color';
    case 'w': return 'width';
    case 'h': return 'height';
    case 'x': return 'left';
    case 'y': return 'top';
    case 'z': return 'z-index';
    default: return '';
  }
}

export enum PAGE {
  width = 1440,
  height = 810,
};

export const IGNORE_LIST = {
  PAGE: [ 'x', 'y', 'z', 'w', 'h' ],
  IMAGE: [] as Array<string>,
  ELEMENT: [ 'w', 'h' ],
};

export const IGNORE_LIST_MAP = ( type: string ): Array<string> => {
  switch ( type ) {
    case 'PAGE': return [ 'x', 'y', 'z', 'w', 'h' ];
    case 'IMAGE': return [] as Array<string>;
  }
  return [ 'w', 'h' ];
}

export const TYPE_TABLE = {
  h1: 'ELEMENT',
  h2: 'ELEMENT',
  h3: 'ELEMENT',
  h4: 'ELEMENT',
  h5: 'ELEMENT',
  h6: 'ELEMENT',
  a: 'ELEMENT',
  img: 'IMAGE',
  li: 'ELEMENT',
  ul: 'ELEMENT',
  ol: 'ELEMENT',
  section: 'PAGE',
  pre: 'ELEMENT',
  p: 'ELEMENT',
};

export const TYPE_TABLE_MAP = ( type: string ): string => {
  switch ( type ) {
    case 'img': return 'IMAGE';
    case 'section': return 'PAGE';
  }
  return 'ELEMENT';
}
