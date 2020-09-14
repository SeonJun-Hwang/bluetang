export default {
  debounce ( callback: Function, time = 0 ): Function {
    let timer: NodeJS.Timeout;
    return () => {
      if ( timer ) clearTimeout( timer );
      timer = setTimeout( () => callback(), time );
    };
  },
  chunk ( source: Array<any>, size = 1 ): Array<Array<any>> {
    return source.reduce( ( arr, item, idx ) => ( idx % size === 0
      ? [ ...arr, [ item ] ]
      : [ ...arr.slice( 0, -1 ), [ ...arr.slice( -1 )[ 0 ], item ] ] ), [] );
  },
  compact ( source: Array<any> ): Array<any> {
    return source.filter( Boolean );
  },
  flatten ( source: Array<any> ): Array<any> {
    const result: Array<any> = [];
    source.forEach( src => {
      if ( Array.isArray( src ) ) result.push( ...src );
      else result.push( src );
    } );
    return result;
  },
  omit ( source: any, ignores: Array<string> ) {
    return Object.keys( source ).reduce( ( obj, key ) => ( key in ignores ? obj : { ...obj, [ key ]: source[ key ] } ), {} );
  },
};
