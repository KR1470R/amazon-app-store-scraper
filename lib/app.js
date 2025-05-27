'use strict';

import { fetchGet } from './common.js';
import cheerio from 'cheerio';
import assert from 'assert';
import {
  AMAZON_APP_STORE_URL,
  HEADERS,
  DEFAULT_LANGUAGE,
  DEFAULT_CURRENCY,
} from './constants.js';
import puppeteer from 'puppeteer';

/**
 * Fetches app details from Amazon App Store.
 * @param {Object} options - The options for fetching app details.
 * @param {string} options.appId - The ASIN of the app (required).
 * @param {string} [options.lang] - The language code (optional). i.e. 'en_US'
 * @param {string} [options.currency] - The currency code (optional). i.e. 'USD'
 * @returns {Promise<Object|null>} - A promise that resolves to the app details or null if not found.
 */
async function app(options) {
  try {
    assert(options?.appId, 'appId is required.');

    const qs = new URLSearchParams({
      language: options?.lang || DEFAULT_LANGUAGE,
      currency: options?.currency || DEFAULT_CURRENCY,
    });
    const reqUrl = `${AMAZON_APP_STORE_URL}/${options.appId}?${qs}`;

    const data = await fetchGet(
      reqUrl,
      {
        headers: HEADERS,
        method: 'get',
      }
    );
    if (!data) throw new Error('No data received on fetch');

    const $ = cheerio.load(data);

    /**
     * - categories - is not persistent on the app page at all, thus cannot be parsed.
     * - description - does not really need for our purpose
     * - screenshots - does not really need for our purpose
     * ... if needed, we can add other data later, 
     */
    let title = $('span[title]').get()?.[0]?.attribs?.title || null;
    // const categories = [];
    // const description = $('#mas-product-description').text()?.trim() || null;

    if (!title) {
      try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36'
        );
        await page.goto(reqUrl, { waitUntil: 'networkidle2' });
        title = await page.$eval('span[title]', el => el.getAttribute('title'));
        await browser.close();
      } catch (e) {
        throw new Error(e);
      }
    }

    return { id: options.appId, title };
  } catch (error) {
    console.error(`Error fetching amazon app "${options.appId}" details:`, error.message);
    return null;
  }
}

export default app;