export default {
  save ( key: string, value: string ) {
    window.localStorage.setItem( key, value );
  },
  load ( key: string ) {
    return window.localStorage.getItem( key );
  },
};
