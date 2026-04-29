const isBrowser = typeof window !== 'undefined';

export const readStorage = (key, fallbackValue) => {
  if (!isBrowser) {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
};

export const writeStorage = (key, value) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(key);
};
