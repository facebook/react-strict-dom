/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const Benchmark = require('benchmark');

/**
 * Test helpers
 */

function createSuite(name, options) {
  const suite = new Benchmark.Suite(name);
  const test = (...args) => suite.add(...args);

  function jsonReporter(suite) {
    const benchmarks = [];
    const config = {
      folder: 'logs',
      callback(results, name, folder) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(now.getDate() + 8).padStart(2, '0'); // Add 8 days
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${year}${month}${day}-${hours}${minutes}`;

        // Write the results log
        const dirpath = `${process.cwd()}/${folder}`;
        const filepath = `${dirpath}/react-strict-dom-bench-${name}-${timestamp}.log`;
        if (!fs.existsSync(dirpath)) {
          fs.mkdirSync(dirpath);
        }
        fs.writeFileSync(filepath, `${JSON.stringify(results, null, 2)}\n`);

        // Print the markdown table
        let markdown = '';
        markdown += `| ${name} | ops/sec | deviation (%) | samples |\n`;
        markdown += '| :--- | ---: | ---: | ---: |\n';
        markdown += results
          .map((data) => {
            const { name, deviation, ops, samples } = data;
            const prettyOps = parseInt(ops, 10).toLocaleString();
            return `| ${name} | ${prettyOps} | ${deviation} | ${samples} |`;
          })
          .join('\n');
        markdown += '\n';
        console.log(markdown);
      }
    };

    suite.on('cycle', (event) => {
      benchmarks.push(event.target);
    });

    suite.on('error', (event) => {
      throw new Error(String(event.target.error));
    });

    suite.on('complete', () => {
      const timestamp = Date.now();
      const result = benchmarks.map((bench) => {
        if (bench.error) {
          return {
            name: bench.name,
            id: bench.id,
            error: bench.error
          };
        }

        return {
          name: bench.name,
          id: bench.id,
          samples: bench.stats.sample.length,
          deviation: bench.stats.rme.toFixed(2),
          ops: bench.hz.toFixed(bench.hz < 100 ? 2 : 0),
          timestamp
        };
      });
      config.callback(result, suite.name, config.folder);
    });
  }

  jsonReporter(suite);
  return { suite, test };
}

module.exports = {
  createSuite
};
