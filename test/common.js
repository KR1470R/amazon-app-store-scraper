'use strict';

import { assert } from 'chai';
import { isASIN } from '../lib/common.js';

function assertValidAsin (id) {
  return assert(isASIN(id), `${id} is not a valid asin`);
}

export { assertValidAsin };
