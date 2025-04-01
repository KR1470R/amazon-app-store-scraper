'use strict';

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
  isASIN,
  extractAmazonAppId,
};
