interface Indexable {
  [key: string]: any;
}

export interface SateliteObserver {
  satleNotify(value: any): void;
}

class Satellite {
  private static instance: Satellite;
  private table: Indexable = {};
  private listeners: Indexable = {};
  private constructor() {}

  public static getInstance() {
    if (!Satellite.instance) this.instance = new Satellite();
    return this.instance;
  }

  public get(key: string) {
    return this.table[key];
  }

  public set(key: string, value: any) {
    return (this.table[key] = value);
  }

  public exist(key: string) {
    return !!this.table[key];
  }

  public subscribers(key: string): Array<SateliteObserver | never> {
    if (this.listeners[key] === undefined) this.listeners[key] = [];
    return this.listeners[key];
  }
}

export const use = (key: string, value: any | null = null) => {
  const st = Satellite.getInstance();
  if (value) {
    st.set(key, value);
    st.subscribers(key).forEach((observers: SateliteObserver) => observers.satleNotify(value));
  }

  return st.get(key);
};

export const get = (key: string) => {
  return Satellite.getInstance().get(key);
};

export const register = (key: string, self: SateliteObserver) => {
  const st = Satellite.getInstance();
  const observers = st.subscribers(key);
  if (observers.includes(self)) return;
  observers.push(self);
};
