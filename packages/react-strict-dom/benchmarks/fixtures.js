/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const styles = {
  small: {
    borderWidth: 10,
    height: 1000,
    margin: 16,
    padding: 32,
    width: 1000
  },
  smallWithUnits: {
    borderWidth: '0.5rem',
    height: '90vh',
    margin: '1rem',
    padding: '2em',
    width: '90vw'
  },
  smallWithVariables: {
    borderWidth: 'var(--borderWidth)',
    height: 'var(--height)',
    margin: 'var(--margin)',
    padding: 'var(--padding)',
    width: 'var(--width)'
  },
  large: {
    backgroundColor: 'purple',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 10,
    boxSizing: 'border-box',
    display: 'flex',
    marginBlockEnd: 16,
    marginBlockStart: 16,
    marginInline: 16,
    paddingBlock: 32,
    paddingInlineEnd: 32,
    paddingInlineStart: 32,
    verticalAlign: 'top',
    textDecorationLine: 'underline'
  },
  largeWithPolyfills: {
    backgroundColor: 'var(--backgroundColor)',
    borderColor: 'var(--color)',
    borderStyle: 'solid',
    borderWidth: '1rem',
    boxSizing: 'content-box',
    display: 'block',
    marginBlockEnd: 'var(--margin)',
    marginBlockStart: 'var(--margin)',
    marginInline: '3rem',
    paddingBlock: '1rem',
    paddingInlineEnd: 'var(--padding)',
    paddingInlineStart: 'var(--padding)',
    verticalAlign: 'top',
    textDecorationLine: 'underline'
  },
  complex: {
    backgroundColor: 'var(--backgroundColor)',
    borderColor: 'var(--color)',
    borderStyle: 'solid',
    borderWidth: '1rem',
    boxSizing: 'content-box',
    color: {
      default: 'pink',
      ':hover': 'var(--color)'
    },
    display: 'block',
    fontSize: '1rem',
    marginBlockEnd: 'var(--margin)',
    marginBlockStart: 'var(--margin)',
    marginInline: '3rem',
    paddingBlock: '1rem',
    paddingInlineEnd: 'var(--padding)',
    paddingInlineStart: '0.5em',
    textDecorationLine: 'underline',
    verticalAlign: 'top',
    width: 300,
    '::placeholder': {
      color: 'gray'
    },
    // todo update to modern syntax
    '@media (min-width: 1000px)': {
      width: '90vw'
    }
  },
  unsupported: {
    backgroundColor: 'var(--missingVar)',
    boxSizing: 'border-box',
    color: 'currentcolor',
    display: 'inline',
    invalid: 'foo',
    margin: '1px 2px 3px',
    padding: 10,
    placeContent: 'unsafe center',
    position: 'fixed',
    textShadow: '0 0 10px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #000',
    width: '100%',
    '::placeholder': {
      borderColor: 'red'
    }
  }
};

const customProperties = {
  simple: {
    backgroundColor: 'red',
    borderWidth: 10,
    color: 'green',
    height: 1000,
    margin: 16,
    padding: 32,
    width: 1000
  },
  polyfills: {
    backgroundColor: {
      default: 'yellow',
      '@media (prefers-color-scheme:dark)': 'orange'
    },
    borderWidth: '0.5rem',
    color: 'blue',
    height: '90vh',
    margin: '1rem',
    padding: '2em',
    width: '90vw'
  }
};

module.exports = { customProperties, styles };
