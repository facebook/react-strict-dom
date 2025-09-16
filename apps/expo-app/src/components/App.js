/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Button, PlatformButton, PlatformShell } from 'example-ui';
import { html } from 'react-strict-dom';

export default function App() {
  return (
    <React.StrictMode>
      <PlatformShell>
        <html.p>Hello</html.p>
        <Button>Button</Button>
        <PlatformButton>PlatformButton</PlatformButton>
      </PlatformShell>
    </React.StrictMode>
  );
}
