/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CallbackRef } from '../../types/react';

import * as React from 'react';

import { errorMsg } from '../../shared/logUtils';
import { useElementCallback } from '../../shared/useElementCallback';
import { useViewportScale } from './ContextViewportScale';

type Options = {
  tagName: string
};

// $FlowFixMe[unclear-type]
type Node = any;

const memoizedStrictRefs: WeakMap<Node, mixed> = new WeakMap();

const lengthPropertySet = new Set([
  'clientHeight',
  'clientLeft',
  'clientTop',
  'clientWidth',
  'offsetHeight',
  'offsetLeft',
  'offsetTop',
  'offsetWidth',
  'scrollHeight',
  'scrollLeft',
  'scrollTop',
  'scrollWidth'
]);

/**
 * Copying the node is necessary because getBoundingClientRect is replaced to
 * polyfill viewport scaling. It means we have to forward private fields
 * to improve compatibility with most React Native code.
 *
 * We're not modifying child nodes to account for viewport scaling. Reading
 * values from those nodes after traversal is not recommended.
 */
function getOrCreateStrictRef(
  node: Node,
  tagName: string,
  viewportScale: number
) {
  const ref = memoizedStrictRefs.get(node);
  if (ref != null) {
    return ref;
  } else {
    try {
      // Create object with prototype chain intact (preserves instanceof)
      const strictRef = Object.create(Object.getPrototypeOf(node));

      // Copy all own properties including React Native internals
      const descriptors = Object.getOwnPropertyDescriptors(node);
      Object.defineProperties(strictRef, descriptors);

      const scale = (number: number) => number / viewportScale;

      // Override getBoundingClientRect for viewport-scaling
      const getBoundingClientRect = 
        node?.getBoundingClientRect ?? node?.unstable_getBoundingClientRect;
      if (getBoundingClientRect) {
        // $FlowFixMe[prop-missing]
        Object.defineProperty(strictRef, 'getBoundingClientRect', {
          value: () => {
            const rect = getBoundingClientRect.call(node);
            if (viewportScale !== 1) {
              return new DOMRect(
                scale(rect.x),
                scale(rect.y),
                scale(rect.width),
                scale(rect.height)
              );
            }
            return rect;
          },
          configurable: true,
          writable: true
        });
      }

      // Override length properties for viewport-scaling
      for (const prop of lengthPropertySet) {
        if (prop in strictRef) {
          if (viewportScale !== 1) {
            // $FlowFixMe[prop-missing]
            Object.defineProperty(strictRef, prop, {
              get() {
                const value = node[prop];
                return typeof value === 'number' ? scale(value) : value;
              }
            });
          }
        }
      }

      // $FlowFixMe[prop-missing]
      Object.defineProperty(strictRef, 'nodeName', {
        get() {
          return tagName.toUpperCase();
        }
      });
      if (tagName === 'img') {
        // $FlowFixMe[prop-missing]
        Object.defineProperty(strictRef, 'complete', {
          get() {
            if (node?.complete == null) {
              return false;
            } else {
              return node.complete;
            }
          }
        });
      }

      memoizedStrictRefs.set(node, strictRef);
      return strictRef;
    } catch (e) {
      // Fallback to original node if copying fails
      if (__DEV__) {
        errorMsg('failed to create strict ref. Falling back to original node');
        console.error(e);
      }
      return node;
    }
  }
}

export function useStrictDOMElement<T>(
  ref: React.RefSetter<Node>,
  { tagName }: Options
): CallbackRef<T> {
  const { scale: viewportScale } = useViewportScale();

  const elementCallback = useElementCallback(
    React.useCallback(
      // $FlowFixMe[unclear-type]
      (node: any) => {
        if (ref == null) {
          return undefined;
        } else {
          const strictRef = getOrCreateStrictRef(node, tagName, viewportScale);
          if (typeof ref === 'function') {
            // $FlowFixMe[incompatible-type] - Flow does not understand ref cleanup.
            const cleanup: void | (() => void) = ref(strictRef);
            return typeof cleanup === 'function'
              ? cleanup
              : () => {
                  ref(null);
                };
          } else {
            ref.current = strictRef;
            return () => {
              ref.current = null;
            };
          }
        }
      },
      [ref, tagName, viewportScale]
    )
  );

  return elementCallback;
}
