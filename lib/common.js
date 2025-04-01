'use strict';

const https = require('https');

function fetch(url, options) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Request failed with status code ${res.statusCode}`));
      }
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function isASIN(str) {
  return /^[A-Z0-9]{10}$/i.test(str);
}

function extractAmazonAppId(url) {
  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname.endsWith('amazon.com')) {
      return null;
    }

    const match = parsedUrl.pathname.match(/\/dp\/([A-Za-z0-9]{10})(?=[\/?]|$)/);
    if (!match || match[1].length === 0) {
      return null;
    }

    return match[1];
  } catch (err) {
    return null;
  }
}

module.exports = {
  fetch,
  isASIN,
  extractAmazonAppId,
};
