'use strict';

const assert = require('chai').assert;
const { isASIN } = require('../lib/common');

function assertValidAsin (id) {
  return assert(isASIN(id), `${id} is not a valid asin`);
}

module.exports = { assertValidAsin };
