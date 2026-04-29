import config from '../config/config.js';

const backendBaseUrl = config.apiBaseUrl.replace(/\/api\/?$/, '');

export const resolveMediaUrl = (url) => {
  if (!url) return '/coffee_mug.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${backendBaseUrl}${url}`;
  return `${backendBaseUrl}/${url}`;
};
