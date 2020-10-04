import { $, $c } from '~utils/DOM';

abstract class BaseModal {
  private fragment: DocumentFragment;
  protected modal: HTMLElement;

  constructor() {
    this.fragment = this.createModalFragment();
    this.modal = $('.modal', this.fragment)! as HTMLElement;
    this.baseEventlistener(this.modal);
  }

  public show() {
    document.body.appendChild(this.fragment.firstChild as Node);
  }

  protected dispose() {
    this.fragment.appendChild(document.body.removeChild(this.modal));
  }

  private createModalFragment(): DocumentFragment {
    const fragment = new DocumentFragment();
    const modal = $c('div', {
      className: 'modal',
      innerHTML: `<div class="container">
      <div class="header"></div>
      <div class="body"></div>
      <div class="footer"></div>
      <button type="button" id="close" class="close"/>
      </div>`,
    });
    const $head = $('.header', modal)! as HTMLElement;
    const $body = $('.body', modal)! as HTMLElement;
    const $footer = $('.footer', modal)! as HTMLElement;
    this.customizeModal(modal, $head, $body, $footer);
    this.customEventlistener(modal);

    fragment.appendChild(modal);
    return fragment;
  }

  protected abstract customizeModal($modal: HTMLElement, $header: HTMLElement, $body: HTMLElement, $footer: HTMLElement): void;
  protected customEventlistener($modal: HTMLElement) {}

  private baseEventlistener($container: HTMLElement): void {
    const $close = $('.close', $container);
    $close?.addEventListener('click', this.dispose.bind(this));
    $container.addEventListener('click', ({ target }: Event) => {
      if (target !== $container) return;
      this.dispose();
    });
  }
}

export default BaseModal;
