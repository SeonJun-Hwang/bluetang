export const changePairStr = (source: string, target: string, pairOpen: string, pairClose: string) => {
  const splitedSource = source.split(target);
  return splitedSource.reduce((prev, cur, idx) => prev + (idx % 2 ? pairOpen : pairClose) + cur);
};

export const changeValidPairStrs = (source: string, targets: Array<string>, validators: Array<RegExp>, pairs: Array<Array<string>>) => {
  let result = source;

  for (let i = 0; i < targets.length; i++) {
    if (!result.match(validators[i])) continue;
    const splitedSource = result.split(targets[i]);
    if (splitedSource.length & 1) result = splitedSource.reduce((prev, cur, idx) => prev + (idx % 2 ? pairs[i][0] : pairs[i][1]) + cur);
    else result = splitedSource.slice(0, splitedSource.length - 1).reduce((prev, cur, idx) => prev + (idx % 2 ? pairs[i][0] : pairs[i][1]) + cur) + targets[i] + splitedSource[splitedSource.length - 1];
  }
  return result;
};

export const className = (element: Object) => element.constructor.name;

export const strToBase64 = (str: string) => btoa(encodeURIComponent(str));

export const base64ToStr = (code: string, defaultString: string) => {
  let result;
  try {
    result = decodeURIComponent(atob(code));
  } catch {
    result = defaultString;
  }
  return result;
};
