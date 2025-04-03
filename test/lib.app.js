'use strict';

import { assert } from 'chai';
import store from '../index.js';
import { assertValidAsin } from './common.js';

const validApp = {
  appId: 'B00V8X7XTO',
  title: 'Fox News: US & World Headlines',
};
const invalidApp = {
  appId: '1299192dki1id9o0akodklmsa',
  title: 'Invalid App',
};

describe('App method', () => {
  it('should fetch valid application data', () => {
    return store.app({appId: validApp.appId})
      .then((app) => {
        assert.isNotNull(app);
        assert.equal(app.id, validApp.appId);
        assert.include(app.title, validApp.title);
        assertValidAsin(app.id);
      });
  });

  it('should return null for invalid app', () => {
    return store.app({appId: invalidApp.appId})
      .then((app) => {
        assert.isNull(app);
      });
  });
});
