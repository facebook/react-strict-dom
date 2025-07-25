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

function errorUnimplemented(name: string) {
  if (__DEV__) {
    errorMsg(`unsupported method node.${name}()`);
  }
}

/*
function errorUnimplementedEvent(name: string) {
  warnMsg(
    `unsupported event type "${name}"`
  );
}
*/

type Options = {
  tagName: string
};

// $FlowFixMe[unclear-type]
type Node = any;

const originalGetBoundingClientRects = new WeakMap<Node, () => DOMRect>();

export function useStrictDOMElement<T>({ tagName }: Options): CallbackRef<T> {
  const { scale: viewportScale } = useViewportScale();
  const elementCallback = useElementCallback(
    React.useCallback(
      (node: Node) => {
        Object.defineProperty(node, 'nodeName', {
          value: tagName.toUpperCase(),
          writable: false
        });

        const { addEventListener } = node;
        if (addEventListener == null) {
          node.addEventListener = () => errorUnimplemented('addEventListener');
        }

        const { animate } = node;
        if (animate == null) {
          node.animate = () => errorUnimplemented('animate');
        }

        const { click } = node;
        if (click == null) {
          node.click = () => errorUnimplemented('click');
        }

        const { contains } = node;
        if (contains == null) {
          node.contains = () => errorUnimplemented('contains');
        }

        const { dispatchEvent } = node;
        if (dispatchEvent == null) {
          node.dispatchEvent = () => errorUnimplemented('dispatchEvent');
        }

        const { getAttribute } = node;
        if (getAttribute == null) {
          node.getAttribute = () => errorUnimplemented('getAttribute');
        }

        const { getBoundingClientRect } = node;
        if (getBoundingClientRect == null) {
          node.getBoundingClientRect = function () {
            if (node.unstable_getBoundingClientRect != null) {
              return node.unstable_getBoundingClientRect();
            } else {
              errorUnimplemented('getBoundingClientRect');
            }
          };
        }

        if (viewportScale !== 1) {
          let getBoundingClientRect = originalGetBoundingClientRects.get(node);
          if (getBoundingClientRect == null) {
            getBoundingClientRect = node.getBoundingClientRect;
            originalGetBoundingClientRects.set(node, getBoundingClientRect);
          }
          const getBoundingRectConst = getBoundingClientRect;
          node.getBoundingClientRect = function () {
            const rect = getBoundingRectConst.call(node);

            return new DOMRect(
              rect.x / viewportScale,
              rect.y / viewportScale,
              rect.width / viewportScale,
              rect.height / viewportScale
            );
          };
        }

        const { getRootNode } = node;
        if (getRootNode == null) {
          node.getRootNode = () => errorUnimplemented('getRootNode');
        }

        const { hasPointerCapture } = node;
        if (hasPointerCapture == null) {
          node.hasPointerCapture = () =>
            errorUnimplemented('hasPointerCapture');
        }

        const { releasePointerCapture } = node;
        if (releasePointerCapture == null) {
          node.releasePointerCapture = () =>
            errorUnimplemented('releasePointerCapture');
        }

        const { removeEventListener } = node;
        if (removeEventListener == null) {
          node.removeEventListener = () =>
            errorUnimplemented('removeEventListener');
        }

        const { scroll } = node;
        if (scroll == null) {
          node.scroll = () => errorUnimplemented('scroll');
        }

        const { scrollBy } = node;
        if (scrollBy == null) {
          node.scrollBy = () => errorUnimplemented('scrollBy');
        }

        const { scrollIntoView } = node;
        if (scrollIntoView == null) {
          node.scrollIntoView = () => errorUnimplemented('scrollIntoView');
        }

        const { scrollTo } = node;
        if (scrollTo == null) {
          node.scrollTo = () => errorUnimplemented('scrollTo');
        }

        const { setPointerCapture } = node;
        if (setPointerCapture == null) {
          node.setPointerCapture = () =>
            errorUnimplemented('setPointerCapture');
        }

        if (tagName === 'input' || tagName === 'textarea') {
          const { select } = node;
          if (select == null) {
            node.select = () => errorUnimplemented('select');
          }

          const { setSelectionRange } = node;
          if (setSelectionRange == null) {
            node.setSelectionRange = () =>
              errorUnimplemented('setSelectionRange');
          }
        }
        if (tagName === 'input') {
          const { showPicker } = node;
          if (showPicker == null) {
            node.showPicker = () => errorUnimplemented('showPicker');
          }
        }
        if (tagName === 'img') {
          if (node.complete == null) {
            // Assume images are never pre-loaded in React Native
            node.complete = false;
          }
        }
      },
      [tagName, viewportScale]
    )
  );

  return elementCallback;
}
