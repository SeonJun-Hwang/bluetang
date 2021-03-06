import { ElementOption } from '~global/types';

export const $c = (tag: string, option?: ElementOption): HTMLElement => {
  const $el = document.createElement(tag);
  return Object.assign($el, option);
};

export const $ = (selector: string, target: Element | Document | DocumentFragment = document) => target.querySelector(selector);
export const $$ = (selector: string, target: Element | Document | DocumentFragment = document) => target.querySelectorAll(selector);
export const $$$ = (id: string, target: Document | DocumentFragment = document) => target.getElementById(id);

export const zIndex = ($el: Element, idx?: string) => {
  ($el as HTMLElement).style.zIndex = idx || '';
  return $el;
};

export const show = ($el: Element) => {
  if ($el.classList.contains('hide')) $el.classList.remove('hide');
  return $el;
};

export const hide = ($el: Element) => {
  if (!$el.classList.contains('hide')) $el.classList.add('hide');
  return $el;
};

export const visible = ($el: Element) => {
  ($el as HTMLElement).style.visibility = 'visible';
  return $el;
};

export const invisible = ($el: Element) => {
  ($el as HTMLElement).style.visibility = 'hidden';
};

export const opacity = ($el: Element, opacity: string) => {
  ($el as HTMLElement).style.opacity = opacity;
};

export const transform = ($el: Element, trans: string) => {
  ($el as HTMLElement).style.transform = trans;
};

export const addClass = ($el: Element, className: string) => {
  if (!$el.classList.contains(className)) $el.classList.add(className);
  return $el;
};

export const removeClass = ($el: Element, className: string) => {
  if ($el.classList.contains(className)) $el.classList.remove(className);
  return $el;
};

export const toggleClass = ($el: Element, className: string) => {
  $el.classList.contains(className) ? $el.classList.remove(className) : $el.classList.add(className);
  return $el;
};

export const clear = ($el: Element) => {
  $el.removeAttribute('style');
  return $el;
};

export const forceRepaint = ($el: Element) => {
  const { style } = $el as HTMLElement;
  const { border } = style;
  style.border = 'solid 0px transparent';
  style.border = border;
};

export const triggerInput = ($el: HTMLInputElement | HTMLTextAreaElement, value: string) => {
  $el.value = value;
  $el.dispatchEvent(new InputEvent('input'));
};

// 호환성 개선
export const toggleFullScreen = ($el: Element) => {
  const doc = window.document;
  const reqFullScreen = $el.requestFullscreen;
  const cancelFullScreen = doc.exitFullscreen;
  const isFullScreen = doc.fullscreenElement;

  isFullScreen ? cancelFullScreen.call(doc) : reqFullScreen.call($el);
};

export const isFullScreen = () => {
  const doc = window.document;
  return doc.fullscreenElement;
};

export const fullScreenChangeEventName = () => {
  return 'fullscreenchange';
};
