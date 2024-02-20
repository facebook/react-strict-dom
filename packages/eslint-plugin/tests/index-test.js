/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { RuleTester: ESLintTester } = require('eslint');
const { rules } = require('../src');

const eslintTester = new ESLintTester({
  parser: require.resolve('hermes-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

eslintTester.run('react-strict-dom-valid-styles', rules['valid-styles'], {
  valid: [
    // valid style properties
    `
      const styles = stylex.create({
        root: {
          borderEndEndRadius: 5,
          borderEndStartRadius: 5,
          borderStartEndRadius: 5,
          borderStartStartRadius: 5,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'row',
        },
      });
    `,
    `
      const styles = css.create({
        root: {
          display: 'flex',
          flexDirection: 'row',
        },
      });
    `,
    `
      const styles = stylex.create({
        root: {
          color: {
            ':hover': 'red',
          },
        },
      });
    `,
    // not a stylex.create call
    `
      const styles = {
        root: {
          display: 'flex',
          flexDirection: 'row',
        },
      };
    `,
    `
      const styles = {
        root: {
          ':active': {
            'width': '100%',
          },
        },
      };
    `,
    // skips `.web.js` modules
    {
      code: `
        const styles = stylex.create({
          root: {
            justifySelf: 'center',
          },
        });
      `,
      filename: 'foo.web.js'
    },
    // ignores inline style JSXAttribute
    `
      <View style={{display: 'flex'}} />
    `
  ],
  invalid: [
    // invalid property
    {
      // key as Identifier
      code: `
        const styles = stylex.create({
          root: {
            fooBar: 'center',
            justifySelf: 'center',
            resizeMode: 'contain',
          },
        });
      `,
      errors: [
        {
          messageId: 'invalid',
          data: {
            value: 'fooBar',
            type: 'property'
          }
        },
        {
          messageId: 'invalid',
          data: {
            value: 'justifySelf',
            type: 'property'
          }
        },
        {
          messageId: 'invalid',
          data: {
            value: 'resizeMode',
            type: 'property'
          }
        }
      ],
      output: null
    },
    {
      // key as Literal
      code: `
        const styles = stylex.create({
          root: {
            'justifySelf': 'center'
          },
        });
      `,
      errors: [
        {
          messageId: 'invalid',
          data: {
            value: 'justifySelf',
            type: 'property'
          }
        }
      ],
      output: null
    },
    {
      // invalid pseudo-selector syntax
      code: `
        const styles = stylex.create({
          root: {
            ':active': {
              width: '100%',
            },
          },
        });
      `,
      errors: [
        {
          messageId: 'invalid',
          data: {
            value: ':active',
            type: 'property'
          }
        }
      ],
      output: null
    },
    /*
    {
      // invalid pseudo-selector types
      code: `
        const styles = stylex.create({
          root: {
              width: {
                ':active': '100%',
              },
            },
          },
        });
      `,
      errors: [
        {
          messageId: 'invalid',
          data: {
            value: ':active',
            type: 'property'
          }
        }
      ],
      output: null
    },
    */
    {
      // invalid style value
      code: `
        const styles = stylex.create({
          root: {
            borderRadius: '50%',
          },
        });
      `,
      errors: [
        {
          messageId: 'invalid',
          data: {
            value: '50%',
            type: 'value'
          }
        }
      ],
      output: null
    },
    {
      // non-standard logical
      code: `
const styles = stylex.create({
  root: {
    end: 5,
    marginHorizontal: 10,
    start: 5,
  },
});`,
      errors: [
        {
          messageId: 'nonStandardLogical'
        },
        {
          messageId: 'nonStandardLogical'
        },
        {
          messageId: 'nonStandardLogical'
        }
      ],
      output: `
const styles = stylex.create({
  root: {
    insetInlineEnd: 5,
    marginInline: 10,
    insetInlineStart: 5,
  },
});`
    }
  ]
});
