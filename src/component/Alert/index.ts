import { $, $c } from '~utils/DOM';

class Alert {
  private title: string;
  private message: string;
  private fragment: DocumentFragment;
  private cancleAble: boolean;

  private okCallbacks: Array<Function>;
  private cancelCallbacks: Array<Function>;
  constructor(message: string, title: string = '확인', cancelAble: boolean = false) {
    this.message = message;
    this.title = title;
    this.cancleAble = cancelAble;
    this.fragment = this.create();
    this.bindEvents();
    this.okCallbacks = [this.dispose.bind(this)];
    this.cancelCallbacks = [this.dispose.bind(this)];
  }

  public show() {
    this.fragment.firstElementChild!.animate({ opacity: [0.3, 1], top: ['-30px', '0'], easing: 'ease-in-out' }, { duration: 700 });
    document.body.appendChild(this.fragment.firstElementChild!);
  }

  private create() {
    const fragment = new DocumentFragment();
    const container = $c('div', {
      className: `alert`,
      innerHTML: `<div class="container"><h3>${this.title}</h3><p>${this.message}</p><div class="btns">${this.cancleAble ? `<button id="cancel">취소</button>` : ''}<button id="ok">확인</button></div></div>`,
    });

    fragment.appendChild(container);
    return fragment;
  }

  private bindEvents() {
    $('#ok', this.fragment)?.addEventListener('click', () => this.okCallbacks.forEach((callback) => callback()));
    if (this.cancleAble) $('#cancel', this.fragment)?.addEventListener('click', () => this.cancelCallbacks.forEach((callback) => callback()));
  }

  private dispose() {
    const $alert = $('.alert');
    $alert?.animate({ opacity: [1, 0.3], top: ['0', '-30px'], easing: 'ease-in-out' }, { duration: 700 }).addEventListener('finish', () => {
      this.fragment.appendChild(document.body.removeChild($alert as Node));
    });
  }
}

export default Alert;
