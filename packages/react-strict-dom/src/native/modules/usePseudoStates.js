/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Style } from '../../types/styles';

import * as React from 'react';

type InteractionHandlers = {
  onBlur?: () => void,
  onFocus?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  onPointerCancel?: () => void,
  onPointerDown?: () => void,
  onPointerEnter?: () => void,
  onPointerLeave?: () => void,
  onPointerUp?: () => void
};

type Interaction = {
  active: boolean,
  focus: boolean,
  hover: boolean,
  handlers: ?InteractionHandlers
};

export function usePseudoStates(style: Style): Interaction {
  const [focus, setFocus] = React.useState(false);
  const [mouseHover, setMouseHover] = React.useState(false);
  const [pointerHover, setPointerHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  let isHoverStyledElement = false;
  let isFocusStyledElement = false;
  let isActiveStyledElement = false;

  for (const styleValue of Object.values(style)) {
    if (styleValue != null && typeof styleValue === 'object') {
      if (styleValue.hasOwnProperty(':hover')) {
        isHoverStyledElement = true;
      }
      if (styleValue.hasOwnProperty(':focus')) {
        isFocusStyledElement = true;
      }
      if (styleValue.hasOwnProperty(':active')) {
        isActiveStyledElement = true;
      }
      if (
        isHoverStyledElement &&
        isFocusStyledElement &&
        isActiveStyledElement
      ) {
        break;
      }
    }
  }

  const handlers = React.useMemo(() => {
    let value = null;
    if (isHoverStyledElement || isFocusStyledElement || isActiveStyledElement) {
      value = {} as InteractionHandlers;
      if (isHoverStyledElement) {
        value.onMouseEnter = () => setMouseHover(true);
        value.onMouseLeave = () => setMouseHover(false);
        value.onPointerEnter = () => setPointerHover(true);
        value.onPointerLeave = () => setPointerHover(false);
      }
      if (isFocusStyledElement) {
        value.onBlur = () => setFocus(false);
        value.onFocus = () => setFocus(true);
      }
      if (isActiveStyledElement) {
        value.onPointerCancel = () => setActive(false);
        value.onPointerDown = () => setActive(true);
        value.onPointerUp = () => setActive(false);
        value.onPointerLeave = () => setActive(false);
      }
    }
    return value;
  }, [isHoverStyledElement, isFocusStyledElement, isActiveStyledElement]);

  return {
    active,
    focus,
    hover: mouseHover || pointerHover,
    handlers
  };
}
