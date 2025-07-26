/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export type CSSValueASTNode =
  | {
      type: 'word' | 'unicode-range',
      value: string,
      sourceIndex: number,
      sourceEndIndex: number
    }
  | {
      type: 'string' | 'comment',
      value: string,
      quote: '"' | "'",
      sourceIndex: number,
      sourceEndIndex: number,
      unclosed?: boolean
    }
  | {
      type: 'comment',
      value: string,
      sourceIndex: number,
      sourceEndIndex: number,
      unclosed?: boolean
    }
  | {
      type: 'div',
      value: ',' | '/' | ':',
      sourceIndex: number,
      sourceEndIndex: number,
      before: '' | ' ' | '  ' | '   ',
      after: '' | ' ' | '  ' | '   '
    }
  | {
      type: 'space',
      value: ' ' | '  ' | '   ',
      sourceIndex: number,
      sourceEndIndex: number
    }
  | {
      type: 'function',
      value: string,
      before: '' | ' ' | '  ' | '   ',
      after: '' | ' ' | '  ' | '   ',
      nodes: Array<CSSValueASTNode>,
      unclosed?: boolean,
      sourceIndex: number,
      sourceEndIndex: number
    };
