import TokenBase from './TokenBase';
import { STYLE_LIST, STYLE_LIST_MAP } from './constants';
import { ObjectContent } from '~global/types';

interface Pair {
  key: string;
  value: string;
}

class Style extends TokenBase {
  public getStyle(ignores: Array<string>, isHtml = true): string {
    const keys = Array.from((this.content as Map<string, string>).keys());
    const filteredFields = keys.filter((key) => key in STYLE_LIST && !ignores.includes(key));
    if (!filteredFields.length) return '';

    const styleTable = filteredFields.filter((field) => !['x', 'y'].includes(field)).map(this.styleMapper.bind(this));
    const styles = `${this.position(filteredFields)}${styleTable.reduce(this.styleReducer, '')}`;
    return isHtml ? ` style="${styles}"` : styles;
  }

  public values(key: string): string | undefined {
    return (this.content as Map<string, string>).get(key);
  }

  public getContent(): string {
    return JSON.stringify(this.content);
  }

  public getHtml(): string {
    return '';
  }

  private hasXYZField(fields: Array<string>) {
    return fields.some((field) => field === 'x' || field === 'y' || field === 'z');
  }

  private position(filteredFields: Array<string>) {
    if (!this.hasXYZField(filteredFields)) return '';
    const content = this.content as Map<string, string>;
    const x = content.get('x') || 0;
    const y = content.get('y') || 0;

    return `position: absolute; left: 0; top: 0; transform: translate(${x}px, ${y}px); `;
  }

  private styleMapper(key: string) {
    return {
      key: STYLE_LIST_MAP(key),
      value: (this.content as Map<string, string>).get(key)! as string,
    } as Pair;
  }

  private styleReducer(pre: string, cur: Pair): string {
    const { key, value } = cur;
    const htmlValue = ['width', 'height'].includes(key) ? `${value}px` : value;

    if (key === STYLE_LIST.bgImage) return `${pre}${key}: center / cover no-repeat url(${htmlValue});`;

    return `${pre}${key}: ${htmlValue};`;
  }

  public generateElement() {
    throw new TypeError('Cannot generate element');
  }
}

export default Style;
