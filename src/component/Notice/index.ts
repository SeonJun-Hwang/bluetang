import { $c } from '~utils/DOM'

type NoticeType = 'info' | 'success' | 'error';

class Notice {
  private type: string;
  private message: string;
  private fragment: DocumentFragment;
  constructor(type: NoticeType, message: string) {
    this.type = type;
    this.message = message;
    this.fragment = this.create();
  }

  public show() {
    this.fragment.firstElementChild!.animate({ opacity: [1, 0], easing: 'ease-in-out' }, { duration: 700, delay: 2000 }).addEventListener('finish', this.dispose.bind(this));
    document.body.appendChild(this.fragment.firstElementChild!);
  }

  private create() {
    const fragment = new DocumentFragment();
    const container = $c('div', {
      className: `notice ${this.type}`,
      innerHTML: `<span class="notice-ico ${this.type}">알림</span><span class="notice-msg">${this.message}</span>`,
    });
    fragment.appendChild(container);
    return fragment;
  }

  private dispose({ target }: any) {
    this.fragment.appendChild(document.body.removeChild(target.effect.target));
  }
}

export default Notice;
