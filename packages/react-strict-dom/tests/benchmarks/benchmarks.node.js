/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const Benchmark = require('benchmark');

const { css } = require('../../build/native-bench');

/**
 * Test helpers
 */

const suite = new Benchmark.Suite('react-strict-dom-benchmarks');
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
      const filepath = `${dirpath}/${name}-${timestamp}.log`;
      if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
      }
      fs.writeFileSync(filepath, `${JSON.stringify(results, null, 2)}\n`);

      // Print the markdown table
      let markdown = '';
      markdown += '| Benchmark | ops/sec | deviation (%) | samples |\n';
      markdown += '| :---      |    ---: |          ---: |    ---: |\n';
      markdown += results
        .map((data) => {
          const { name, deviation, ops, samples } = data;
          const prettyOps = parseInt(ops, 10).toLocaleString();
          return `| ${name} | ${prettyOps} | ${deviation} | ${samples} |`;
        })
        .join('\n');
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

/**
 * Fixtures
 */

const smallStyle = {
  backgroundColor: 'red',
  color: 'green'
};

const smallStyleAlt = {
  backgroundColor: 'yellow',
  color: 'blue'
};

const bigStyle = {
  backgroundColor: 'purple',
  borderColor: 'orange',
  borderStyle: 'solid',
  borderWidth: '1rem',
  boxSizing: 'content-box',
  display: 'block',
  marginBlockEnd: '2rem',
  marginBlockStart: '2rem',
  marginInline: '3rem',
  paddingBlock: '1rem',
  paddingInlineEnd: '0.5em',
  paddingInlineStart: '0.5em',
  verticalAlign: 'top',
  textDecorationLine: 'underline'
};

const complexStyle = {
  backgroundColor: 'purple',
  borderColor: 'orange',
  borderStyle: 'solid',
  borderWidth: '1rem',
  boxSizing: 'content-box',
  color: {
    default: 'pink',
    ':hover': 'var(--testColor)'
  },
  display: 'block',
  fontSize: '1rem',
  marginBlockEnd: '2rem',
  marginBlockStart: '2rem',
  marginInline: '3rem',
  paddingBlock: '1rem',
  paddingInlineEnd: '0.5em',
  paddingInlineStart: '0.5em',
  textDecorationLine: 'underline',
  verticalAlign: 'top',
  width: 300,
  // todo update to modern syntax
  '@media (min-width: 1000px)': {
    width: 500
  }
};

/**
 * css.create()
 */

test('css.create() small style', () => {
  css.create({
    smallStyle: smallStyle
  });
});

test('css.create() small styles', () => {
  css.create({
    smallStyle: smallStyle,
    smallStyleAlt: smallStyleAlt
  });
});

test('css.create() big style', () => {
  css.create({
    bigStyle: bigStyle
  });
});

test('css.create() complex style', () => {
  css.create({
    complexStyle: complexStyle
  });
});

/**
 * css.props()
 */

const styles = css.create({
  smallStyle: smallStyle,
  smallStyleAlt: smallStyleAlt,
  bigStyle: bigStyle,
  complexStyle: complexStyle
});

const arrayOfStyle = [
  styles.bigStyle,
  false,
  false,
  false,
  false,
  [
    styles.smallStyle,
    false,
    [false, false, styles.smallStyleAlt, false, [styles.complexStyle]]
  ]
];

const options = {
  customProperties: {
    testColor: 'cyan'
  },
  fontScale: 1,
  hover: true,
  inheritedFontSize: 16,
  viewportHeight: 600,
  viewportWidth: 1024
};

// BASIC

test('css.props() small style', () => {
  css.props.call(options, styles.smallStyle);
});

test('css.props() large style', () => {
  css.props.call(options, styles.bigStyle);
});

// SMALL MERGE

test('css.props() small merge', () => {
  css.props.call(options, [styles.smallStyle, styles.smallStyleAlt]);
});

// LARGE MERGE

test('css.props() large merge', () => {
  css.props.call(options, arrayOfStyle);
});

suite.run();
