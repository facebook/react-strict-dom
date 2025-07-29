/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';

import { errorMsg } from '../../shared/logUtils';
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

function proxy(nativeRef: React.RefObject<Node>, name: string) {
  return (...args: Array<mixed>) => {
    const node = nativeRef.current;
    if (node?.[name]) {
      return node[name](...args);
    }
    errorUnimplemented(name);
  };
}

export function useStrictDOMElement<T>(
  ref: React.RefSetter<Node>,
  { tagName }: Options
): React.RefObject<T | null> {
  const nativeRef = React.useRef<T | null>(null);
  const { scale: viewportScale } = useViewportScale();

  React.useImperativeHandle(ref, () => {
    return {
      __nativeTag: proxy(nativeRef, '__nativeTag'),
      addEventListener: proxy(nativeRef, 'addEventListener'),
      animate: proxy(nativeRef, 'animate'),
      blur: proxy(nativeRef, 'blur'),
      click: proxy(nativeRef, 'click'),
      get complete() {
        if (tagName === 'img') {
          const node = nativeRef.current as Node;
          if (node?.complete == null) {
            // Assume images are never pre-loaded in React Native
            return false;
          } else {
            return node.complete;
          }
        }
      },
      contains: proxy(nativeRef, 'contains'),
      dispatchEvent: proxy(nativeRef, 'dispatchEvent'),
      focus: proxy(nativeRef, 'focus'),
      getAttribute: proxy(nativeRef, 'getAttribute'),
      getBoundingClientRect() {
        const node = nativeRef.current as Node;
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
      getRootNode: proxy(nativeRef, 'getRootNode'),
      hasPointerCapture: proxy(nativeRef, 'hasPointerCapture'),
      nodeName: tagName.toUpperCase(),
      releasePointerCapture: proxy(nativeRef, 'releasePointerCapture'),
      removeEventListener: proxy(nativeRef, 'removeEventListener'),
      scroll: proxy(nativeRef, 'scroll'),
      scrollBy: proxy(nativeRef, 'scrollBy'),
      scrollIntoView: proxy(nativeRef, 'scrollIntoView'),
      scrollTo: proxy(nativeRef, 'scrollTo'),
      select: proxy(nativeRef, 'select'),
      setSelectionRange: proxy(nativeRef, 'setSelectionRange'),
      setPointerCapture: proxy(nativeRef, 'setPointerCapture'),
      showPicker: proxy(nativeRef, 'showPicker')
    };
  }, [tagName, viewportScale]);

  return nativeRef;
}
