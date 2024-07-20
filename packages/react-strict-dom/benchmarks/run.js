/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');

const createTests = require('./tests/css-create-tests');
const createThemeTests = require('./tests/css-createTheme-tests');
const propsTests = require('./tests/css-props-tests');
const internalsTests = require('./tests/internals-tests');

const aggregatedResults = {};
const options = {
  callback(data, suiteName) {
    const testResults = data.reduce((acc, test) => {
      const { name, ops } = test;
      acc[name] = ops;
      return acc;
    }, {});

    aggregatedResults[suiteName] = testResults;
  }
};

console.log('Running benchmarks, please wait...');

// Run tests
createTests(options);
createThemeTests(options);
propsTests(options);
internalsTests(options);

const aggregatedResultsString = JSON.stringify(aggregatedResults, null, 2);

// Print / Write results
const args = process.argv.slice(2);
const filename = args[0];
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const timestamp = `${year}${month}${day}-${hours}${minutes}`;

const dirpath = `${process.cwd()}/logs`;
const filepath = `${dirpath}/react-strict-dom-bench-${timestamp}.json`;
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}
const finalpath = filename || filepath;
fs.writeFileSync(finalpath, `${aggregatedResultsString}\n`);

console.log(aggregatedResultsString);
console.log('Results written to', finalpath);
