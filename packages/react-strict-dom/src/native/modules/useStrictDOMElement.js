/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CallbackRef } from '../../types/react';

import { errorMsg } from './errorMsg';
import { useCallback } from 'react';
import { useElementCallback } from '../../shared/useElementCallback';

function errorUnimplemented(name: string) {
  errorMsg(`node.${name}() is not supported in React Native`);
}

/*
function errorUnimplementedEvent(name: string) {
  errorMsg(
    `event type "${name}" is not supported in React Native`
  );
}
*/

type Options = {
  tagName: string
};

export function useStrictDOMElement<T>({ tagName }: Options): CallbackRef<T> {
  const elementCallback = useElementCallback(
    useCallback(
      // $FlowFixMe[unclear-type]
      (node: any) => {
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
      [tagName]
    )
  );

  return elementCallback;
}
