export const isTrue = (val: string | boolean | undefined): boolean => val === "true" || val === true;
export const isFalse = (val: string | boolean | undefined): boolean => val === "false" || val === false;

export const getPercent = (total: number, count: number = 0) => (total ? Math.round((count / total) * 100) : 0);

export const arrayRange = <T extends object>(number: number, defaultItem?: any): T[] => {
  return Array.from(Array(number).keys()).map((item) => defaultItem || item);
};

export const sortByField = <T extends { [key: string]: any }>(arr: T[], field: string): T[] =>
  [...arr].sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0));

export const numberWithSpaces = (x: number, float = true, symbol = "."): string => {
  if (x === 0) return "0";

  const value = float ? x.toFixed(2) : x;
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return parts.join(symbol);
};

export const prepareNumber = (str: string): number | undefined => {
  const num = str?.match(/\d+/g);

  return num ? +num?.join("") : undefined;
};

export const phoneFormatter = (phone: string, format = "+* *** ***-**-**", defaultValue?: string): string => {
  if (phoneClear(phone)?.length !== 11) {
    return defaultValue !== undefined ? defaultValue : phone;
  }

  let result = format;
  let numbers = "" + prepareNumber(phone);

  while (numbers && numbers.length > 0) {
    const replaceChar = numbers[0];

    numbers = numbers.substr(1);
    result = result.replace("*", replaceChar);
  }

  return result;
};

export const phoneClear = (phone: string, prefix = ""): string => {
  if (!phone) {
    return phone;
  }

  return prefix + (phone.match(/\d+/g)?.join("") || "");
};

export const phonePrepareSearch = (phone?: string | null): string | undefined => {
  if (!phone) {
    return undefined;
  }

  let msisdn = phone ? phoneClear(phone) : undefined;

  if (!msisdn || String(msisdn).length < 4) {
    return undefined;
  }

  if (String(msisdn).length === 11) {
    const clearPhone = String(msisdn).match(/8(\d{10})/);
    msisdn = clearPhone?.[1] ? `7${clearPhone[1]}` : msisdn;
  }

  return msisdn;
};

export const phonesFromText = (text: string, clear = true): string[] => {
  const arr = text?.replace(/\r\n/g, "\n").split("\n");

  return clear ? arr.filter((val) => phoneClear(val)?.length === 11) : arr;
};

export const declOfNum = (number: number, titles: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

export const isUrlValid = (url: string, regexp?: RegExp) => {
  const res = url.match(
    regexp || /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );

  return !(res === null);
};

export const loadImage = (url: string, timeout: number = 2000): Promise<HTMLImageElement> => {
  return new Promise(function (resolve, reject) {
    let timer: NodeJS.Timeout;
    const img = new Image();

    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      reject(undefined);
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve(img);
    };
    timer = setTimeout(function () {
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = "//!!!!/test.jpg";
      reject("timeout");
    }, timeout);
    img.src = url;
  });
};

export const prepareFileName = (name: string) => {
  return name.replace(new RegExp("[ .]", "g"), "_");
};

export const downloadFile = (blob: any, name: string, bom: boolean = true, type: string = "text/csv;charset=utf-8") => {
  const url = window.URL.createObjectURL(new Blob([bom ? "\ufeff" + blob : blob], type ? { type } : undefined));
  downloadFileByUrl(url, name);
};

export const downloadFileByUrl = (url: string, name?: string, targetBlank?: boolean) => {
  const link = document.createElement("a");
  link.href = url;
  if (name) {
    link.setAttribute("download", `${name}`);
  }
  if (targetBlank) {
    link.setAttribute("target", "_blank");
  }
  document.body.appendChild(link);
  link.click();
  link.parentNode && link.parentNode.removeChild(link);
};

export const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getSizeKb = (bytes: number) => {
  return (bytes / 1024).toFixed(2);
};

export const getSizeMb = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2);
};

export const getSize = (bytes: number) => {
  if (1024 * 103 < bytes) {
    return `${getSizeMb(bytes)} МБ`;
  } else if (10 < bytes) {
    return `${getSizeKb(bytes)} КБ`;
  } else {
    return `${bytes} Б`;
  }
};

export const ucFirst = (str: string) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export const getValue = (object: any, path: string) => {
  return path
    .replace(/\[/g, ".")
    .replace(/\]/g, "")
    .split(".")
    .reduce((o, k) => (o || {})[k], object);
};

export const omit = (obj: { [key: string]: any }, keys: string[]): { [key: string]: any } =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

export const debounce = (callback: (...args: any[]) => void, wait: number = 500) => {
  let timeoutId: any = null;

  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export const isTextLarge = (element?: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  return element.offsetWidth < element.scrollWidth;
};

export const copyToClipboard = (text: string) => {
  let successful = false;

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("TextArea: Copying " + msg);
  } catch (err) {
    console.error("TextArea: Copying error", err);
  }

  if (!successful) {
    var range = document.createRange();
    range.selectNode(textArea);
    window?.getSelection?.()?.addRange(range);

    try {
      successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      console.log("Range: Copying " + msg);
    } catch (err) {
      console.error("Range: Copying error", err);
    }

    window?.getSelection?.()?.removeAllRanges();
  }

  document.body.removeChild(textArea);

  if (!successful && navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Navigator: Copying success"))
      .catch(() => console.log("Navigator: Copying error"));
    return;
  }
};

export const filterItemsByCount = <T extends Record<string, any>>(items: T[], field: string, count: number): T[] => {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const value = `${item[field]}`;
    counts[value] = counts[value] ? ++counts[value] : 1;
  }
  return items.filter((item) => counts[`${item[field]}`] === count);
};

export const phoneParser = (value: string) => {
  let stringValue = value!?.toString();
  const arr = stringValue.split("+994");
  if (arr[0].length) {
    stringValue = "+994";
  }
  const matrix = "+994 (XX) ___ __ __";
  const def = matrix.replace(/\D/g, "");
  let val = stringValue.replace(/\D/g, "");
  if (def.length >= val.length) {
    val = def;
  }
  let i = 0;
  let result = matrix.replace(/./g, (a) => {
    if (/[X\d]/.test(a) && i < val.length) {
      if (i === 3) {
        if (!["5", "7", "9", "1"].includes(val.charAt(i))) {
          i++;
          return "";
        } else {
          return val.charAt(i++);
        }
      }
      if (i === 4) {
        const c1 = val.charAt(i - 1);
        const c2 = val.charAt(i);
        const operatorCode = `${c1}${c2}`;
        if (!["50", "51", "55", "70", "77", "99", "10"].includes(operatorCode)) {
          i++;
          return "";
        }
      }
      return val.charAt(i++);
    } else {
      if (i >= val.length) {
        return "";
      } else {
        return a;
      }
    }
  });
  if (result.length > 8) {
    let j = 0;
    return result.replace(/./g, (a) => {
      if (/[_\d]/.test(a) && j < val.length) {
        return val.charAt(j++);
      } else {
        if (j >= val.length) {
          return "";
        } else {
          return a;
        }
      }
    });
  }
  return result;
};

export const amountParser = (value: string) => {
  const rawValue = value!?.toString()?.replace?.(/[^.\d]/g, "");
  const valueList = rawValue.split(".");
  if (!valueList[0]) {
    return "";
  }
  const resultList = [valueList[0]];
  if (valueList[1]) {
    const value = valueList[1].length > 2 ? valueList[1].substring(0, 2) : valueList[1];
    resultList.push(value);
  } else if (rawValue[rawValue.length - 1] === ".") {
    resultList.push("");
  }
  resultList[0] = `${Number(resultList[0])}`;
  const result = resultList.join(".");
  return result.slice(0, 16);
};

export const maxLengthParser = (value: string, maxLength: number): string => {
  // Обрезаем длину до maxLength символов
  return value.slice(0, maxLength);
};

export const subscriberCodeParsers: Record<string, (value: string) => string> = {
  AZERISHIQ: (value: string) => {
    const rawValue = value!?.toString()?.replace?.(/[^a-z0-9]/gi, "");
    return rawValue ? rawValue.slice(0, 15) : "";
  },
  AZERSU: (value: string) => {
    const rawValue = value!?.toString()?.replace?.(/[^a-z0-9]/gi, "");
    return rawValue ? rawValue.slice(0, 13) : "";
  },
  AZERIQAZ: (value: string) => {
    const rawValue = value!?.toString()?.replace?.(/[^0-9]/gi, "");
    return rawValue ? rawValue.slice(0, 15) : "";
  },
};
