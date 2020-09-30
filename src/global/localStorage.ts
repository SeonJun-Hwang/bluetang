import { LOCAL_KEY } from '~global/constants';

export const write = (title: string, text: string) => window.localStorage.setItem(LOCAL_KEY, JSON.stringify({ title, text }));
export const read = () => {
  const item = window.localStorage.getItem(LOCAL_KEY);
  return item ? JSON.parse(item) : {};
};
