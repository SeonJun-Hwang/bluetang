import { IMG_HREF_SPLIT_LENGTH } from './constants';

export const imgMap = ( v: Array<string> ) => {
  if ( v.length === IMG_HREF_SPLIT_LENGTH ) return [ `${v[ 0 ]}<img src="${v[ 2 ]}" alt="${v[ 1 ]}">` ];
  return v;
};

export const hrefMap = ( v: Array<string> ) => {
  if ( v.length === IMG_HREF_SPLIT_LENGTH ) return [ `${v[ 0 ]}<a href="${v[ 2 ]}" target="_blank">${v[ 1 ]}</a>` ];
  return v;
};
