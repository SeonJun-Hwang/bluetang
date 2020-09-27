export default {
  save(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  load(key: string) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  },
};
