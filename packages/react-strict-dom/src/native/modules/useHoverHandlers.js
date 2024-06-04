/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Styles } from '../../types/styles';

import { flattenStyle } from './flattenStyle';
import { useMemo, useState } from 'react';

type HoverHandlers = {
  hover: boolean,
  handlers:
    | {
        type: 'HOVERABLE',
        onMouseEnter: () => void,
        onMouseLeave: () => void,
        onPointerEnter: () => void,
        onPointerLeave: () => void
      }
    | { type: 'NON_HOVERABLE' }
};

export function useHoverHandlers(style: Styles): HoverHandlers {
  const [mouseHover, setMouseHover] = useState(false);
  const [pointerHover, setPointerHover] = useState(false);

  const flatStyle = flattenStyle(style);
  let isHoverStyledElement = false;
  for (const styleValue of Object.values(flatStyle)) {
    if (
      styleValue != null &&
      typeof styleValue === 'object' &&
      styleValue.hasOwnProperty(':hover')
    ) {
      isHoverStyledElement = true;
      break;
    }
  }

  const handlers = useMemo(() => {
    if (isHoverStyledElement) {
      return {
        type: 'HOVERABLE',
        onMouseEnter: () => setMouseHover(true),
        onMouseLeave: () => setMouseHover(false),
        onPointerEnter: () => setPointerHover(true),
        onPointerLeave: () => setPointerHover(false)
      };
    }
    return { type: 'NON_HOVERABLE' };
  }, [isHoverStyledElement]);

  return {
    hover: mouseHover || pointerHover,
    handlers
  };
}
