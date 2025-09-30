/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import AnimatedNode from './AnimatedNode';

export default class AnimatedWithChildren<
  TOutput
> extends AnimatedNode<TOutput> {
  #children: Array<AnimatedNode<mixed>>;

  constructor() {
    super();
    this.#children = [];
  }

  __addChild(child: AnimatedNode<mixed>): void {
    if (this.#children.length === 0) {
      this.__attach();
    }
    this.#children.push(child);
  }

  __removeChild(child: AnimatedNode<mixed>): void {
    const index = this.#children.indexOf(child);
    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }
    this.#children.splice(index, 1);
    if (this.#children.length === 0) {
      this.__detach();
    }
  }

  __getChildren(): Array<AnimatedNode<mixed>> {
    return this.#children;
  }
}
