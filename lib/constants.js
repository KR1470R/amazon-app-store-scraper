'use strict';

const AMAZON_APP_STORE_URL = `https://www.amazon.com/dp`;
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 10; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/84.4.20 like Chrome/84.0.4147.125 Safari/537.36',
  'Content-Type': 'text/html',
  'Accept': 'text/html',
};
const DEFAULT_LANGUAGE = 'en_US';
const DEFAULT_CURRENCY = 'USD';

export {
  AMAZON_APP_STORE_URL,
  HEADERS,
  DEFAULT_LANGUAGE,
  DEFAULT_CURRENCY,
};
