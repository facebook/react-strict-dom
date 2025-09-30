/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

/* eslint-disable no-unreachable */

import type { AnimatedStyleValue } from '../shared/SharedAnimatedTypes';
import type { ReadOnlyOutputAnimatedStyle } from './nodes/AnimatedStyle';

import AnimatedNode from './nodes/AnimatedNode';
import AnimatedStyle from './nodes/AnimatedStyle';

import nullthrows from 'nullthrows';
import {
  isValidElement,
  useCallback,
  useInsertionEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react';

type CallbackRef<T> = (T) => void;

type CompositeKeyComponent =
  | AnimatedNode<mixed>
  | $ReadOnlyArray<CompositeKeyComponent | null>
  | $ReadOnly<{ [string]: CompositeKeyComponent }>;

type $ReadOnlyCompositeKeyComponent =
  | AnimatedNode<mixed>
  | $ReadOnlyArray<$ReadOnlyCompositeKeyComponent | null>
  | $ReadOnly<{ [string]: $ReadOnlyCompositeKeyComponent }>;

function isPlainObject(value: mixed): value is $ReadOnly<{ [string]: mixed }> {
  return (
    /* $FlowFixMe[incompatible-type-guard] - Flow does not know that the prototype
   and ReactElement checks preserve the type refinement of `value`. */
    value !== null &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value).isPrototypeOf(Object) &&
    !isValidElement(value)
  );
}

function createCompositeKeyForArray(
  array: $ReadOnlyArray<mixed>
): $ReadOnlyArray<$ReadOnlyCompositeKeyComponent | null> | null {
  let compositeKey: Array<$ReadOnlyCompositeKeyComponent | null> | null = null;

  for (let ii = 0, length = array.length; ii < length; ii++) {
    const value = array[ii];

    let compositeKeyComponent;
    if (value instanceof AnimatedNode) {
      compositeKeyComponent = value;
    } else if (Array.isArray(value)) {
      compositeKeyComponent = createCompositeKeyForArray(value);
    } else if (isPlainObject(value)) {
      compositeKeyComponent = createCompositeKeyForObject(value);
    }
    if (compositeKeyComponent != null) {
      if (compositeKey == null) {
        compositeKey = new Array<$ReadOnlyCompositeKeyComponent | null>(
          array.length
        ).fill(null);
      }
      compositeKey[ii] = compositeKeyComponent;
    }
  }

  return compositeKey;
}

function createCompositeKeyForObject(
  object: $ReadOnly<{ [string]: mixed }>
): $ReadOnly<{ [string]: $ReadOnlyCompositeKeyComponent }> | null {
  let compositeKey: { [string]: $ReadOnlyCompositeKeyComponent } | null = null;

  const keys = Object.keys(object);
  for (let ii = 0, length = keys.length; ii < length; ii++) {
    const key = keys[ii];
    const value = object[key];

    let compositeKeyComponent;
    if (value instanceof AnimatedNode) {
      compositeKeyComponent = value;
    } else if (Array.isArray(value)) {
      compositeKeyComponent = createCompositeKeyForArray(value);
    } else if (isPlainObject(value)) {
      compositeKeyComponent = createCompositeKeyForObject(value);
    }
    if (compositeKeyComponent != null) {
      if (compositeKey == null) {
        compositeKey = {} as { [string]: $ReadOnlyCompositeKeyComponent };
      }
      compositeKey[key] = compositeKeyComponent;
    }
  }

  return compositeKey;
}

function areCompositeKeyComponentsEqual(
  prev: $ReadOnlyCompositeKeyComponent | null,
  next: $ReadOnlyCompositeKeyComponent | null
): boolean {
  if (prev === next) {
    return true;
  }
  if (prev instanceof AnimatedNode) {
    return prev === next;
  }
  if (Array.isArray(prev)) {
    if (!Array.isArray(next)) {
      return false;
    }
    const length = prev.length;
    if (length !== next.length) {
      return false;
    }
    for (let ii = 0; ii < length; ii++) {
      if (!areCompositeKeyComponentsEqual(prev[ii], next[ii])) {
        return false;
      }
    }
    return true;
  }
  if (isPlainObject(prev)) {
    if (!isPlainObject(next)) {
      return false;
    }
    const keys = Object.keys(prev);
    const length = keys.length;
    if (length !== Object.keys(next).length) {
      return false;
    }
    for (let ii = 0; ii < length; ii++) {
      const key = keys[ii];
      if (
        !nullthrows(next).hasOwnProperty(key) ||
        !areCompositeKeyComponentsEqual(prev[key], next[key])
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}

hook useMemoizedAnimatedStyle(
  create: () => ?AnimatedStyle,
  style: ?AnimatedStyleValue<AnimatedNode<mixed>>
): ?AnimatedStyle {
  const compositeKey = useMemo(
    () => (style != null ? createCompositeKeyForObject(style) : null),
    [style]
  );

  const [currentData, updateData] = useState<
    $ReadOnly<{
      compositeKey: typeof compositeKey,
      node: ?AnimatedStyle
    }>
  >(() => ({
    compositeKey,
    node: create()
  }));

  if (!areCompositeKeyComponentsEqual(currentData.compositeKey, compositeKey)) {
    updateData({
      compositeKey,
      node: create()
    });
  }

  return currentData.node;
}

export default hook useAnimatedStyle<TInstance: HTMLElement | null>(
  style: ?AnimatedStyleValue<AnimatedNode<mixed>>,
  parentRef?: React.RefSetter<TInstance>
): [ReadOnlyOutputAnimatedStyle, CallbackRef<TInstance>] {
  const domElemRef = useRef<TInstance | null>(null);
  const [, scheduleUpdate] = useReducer<number, void>((count) => count + 1, 0);
  const node = useMemoizedAnimatedStyle(
    () =>
      style != null
        ? new AnimatedStyle(
            style,
            () => domElemRef.current,
            () => scheduleUpdate()
          )
        : null,
    style
  );

  useInsertionEffect(() => {
    if (node != null) {
      node.__attach();
      return () => {
        node.__detach();
      };
    }
  }, [node]);

  const refHandler = useCallback(
    (instance: TInstance) => {
      domElemRef.current = instance;
      if (parentRef != null) {
        if (typeof parentRef === 'function') {
          parentRef(instance);
        } else {
          parentRef.current = instance;
        }
      }
    },
    [parentRef]
  );

  return [node?.__getValue() ?? {}, refHandler];
}
