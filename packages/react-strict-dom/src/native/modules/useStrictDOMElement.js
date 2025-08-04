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

function errorUnimplemented(name: string) {
  if (__DEV__) {
    errorMsg(`unsupported method node.${name}()`);
  }
}

function proxy(node: Node, name: string) {
  return (...args: Array<mixed>) => {
    if (node?.[name]) {
      return node[name](...args);
    }
    errorUnimplemented(name);
  };
}

const memoizedStrictRefs: WeakMap<Node, mixed> = new WeakMap();

function getOrCreateStrictRef(
  node: Node,
  tagName: string,
  viewportScale: number
) {
  const ref = memoizedStrictRefs.get(node);
  if (ref != null) {
    return ref;
  } else {
    const strictRef = {
      get __nativeTag() {
        return node?.__nativeTag;
      },
      addEventListener: proxy(node, 'addEventListener'),
      animate: proxy(node, 'animate'),
      blur: proxy(node, 'blur'),
      click: proxy(node, 'click'),
      get complete() {
        if (tagName === 'img') {
          if (node?.complete == null) {
            // Assume images are never pre-loaded in React Native
            return false;
          } else {
            return node.complete;
          }
        }
      },
      contains: proxy(node, 'contains'),
      dispatchEvent: proxy(node, 'dispatchEvent'),
      focus: proxy(node, 'focus'),
      getAttribute: proxy(node, 'getAttribute'),
      getBoundingClientRect() {
        const getBoundingClientRect =
          node?.getBoundingClientRect ?? node?.unstable_getBoundingClientRect;
        if (getBoundingClientRect) {
          const rect = getBoundingClientRect.call(node);
          if (viewportScale !== 1) {
            return new DOMRect(
              rect.x / viewportScale,
              rect.y / viewportScale,
              rect.width / viewportScale,
              rect.height / viewportScale
            );
          }
          return rect;
        }
        return errorUnimplemented('getBoundingClientRect');
      },
      getRootNode: proxy(node, 'getRootNode'),
      hasPointerCapture: proxy(node, 'hasPointerCapture'),
      nodeName: tagName.toUpperCase(),
      releasePointerCapture: proxy(node, 'releasePointerCapture'),
      removeEventListener: proxy(node, 'removeEventListener'),
      scroll: proxy(node, 'scroll'),
      scrollBy: proxy(node, 'scrollBy'),
      scrollIntoView: proxy(node, 'scrollIntoView'),
      scrollTo: proxy(node, 'scrollTo'),
      select: proxy(node, 'select'),
      setSelectionRange: proxy(node, 'setSelectionRange'),
      setPointerCapture: proxy(node, 'setPointerCapture'),
      showPicker: proxy(node, 'showPicker')
    };

    memoizedStrictRefs.set(node, strictRef);
    return strictRef;
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
