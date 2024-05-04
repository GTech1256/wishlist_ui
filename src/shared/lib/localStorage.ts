export const loadStorage = <T>(name: string): T | null => {
  try {
    const serialized = localStorage.getItem(name);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (err) {
    return null;
  }
};

export const saveStorage = <T>(name: string, data: T) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(name, serialized);
  } catch {
    // ignore write errors
  }
};

export const removeStorage = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch {
    // ignore write errors
  }
};
