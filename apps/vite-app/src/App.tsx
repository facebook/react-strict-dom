import * as React from 'react'
import { Button, NativeForkButton, PlatformButton, PlatformShell, WebForkButton } from 'example-ui';
import { html } from 'react-strict-dom';

export default function App() {
  return (
    <React.StrictMode>
      <PlatformShell>
        <html.p>Hello</html.p>
        <Button>Button</Button>
        <PlatformButton>PlatformButton</PlatformButton>
        <NativeForkButton>NativeForkButton</NativeForkButton>
        <WebForkButton>WebForkButton</WebForkButton>
      </PlatformShell>
    </React.StrictMode>
  );
}
