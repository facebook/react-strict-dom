import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button, NativeForkButton, PlatformButton, PlatformShell, WebForkButton } from 'example-ui';
import { html } from 'react-strict-dom';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
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
  )
}
