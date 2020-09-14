class Notice {
  private message: string;
  private fragment: DocumentFragment;
  constructor ( message: string ) {
    this.message = message;
    this.fragment = this.create();
  }

  public show () {
    this.fragment.firstElementChild!.animate( { opacity: [ 1, 0 ], easing: 'ease-in-out' }, { duration: 700, delay: 2000 } )
      .addEventListener( 'finish', this.dispose.bind( this ) );
    document.body.appendChild( this.fragment.firstElementChild! );
  }

  private create () {
    const fragment = new DocumentFragment();
    const container = Object.assign( document.createElement( 'div' ),
      {
        className: 'notice',
        innerHTML: `<span class="notice-ico">알림</span><span class="notice-msg">${this.message}</span>`,
      }
    );
    fragment.appendChild( container );
    return fragment;
  }

  private dispose ( ev: any ) {
    this.fragment.appendChild( document.body.removeChild( ev.target.effect.target ) );
  }
}

export default Notice;
