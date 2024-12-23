/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemeCodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { IconArrow } from '@site/src/components/IconArrow';

function ButtonLink({ children, icon, to }) {
  return (
    <Link
      className={clsx(
        styles.featureButton,
        'button button--secondary button--outline button--lg'
      )}
      to={to}
    >
      <span>{children}</span>
      <span style={{ marginLeft: '0.25rem' }}>
        <IconArrow />
      </span>
    </Link>
  );
}

function CodeBlock({ children, lang = 'jsx', title }) {
  return (
    <ThemeCodeBlock className="text--left" language={lang} title={title}>
      {children}
    </ThemeCodeBlock>
  );
}

function Feature({ title, description, code, button }) {
  return (
    <div className={styles.feature}>
      <div className="text--center padding-horiz--md">
        <Heading as="h2" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={clsx(styles.featureText, 'text--')}>{description}</p>
        {code}
        {button}
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Feature
          description={
            <>
              React Strict DOM lets you create user interfaces that look and
              feel right on every platform. Web apps are rendered to HTML and
              rely on static CSS. Native apps look and feel native because the
              UI is truly native, not a web view.
            </>
          }
          key="xplat"
          title="Render platform-native components"
        />

        <Feature
          button={
            <ButtonLink to="/learn/components/">
              Learn about strict HTML
            </ButtonLink>
          }
          code={
            <CodeBlock>{`import { html } from 'react-strict-dom';

function Page() {
  return (
    <html.main>
      <html.div>
        <html.label for="name">Name</label>
        <html.input id="name" />
      </html.div>
    </html.main>
  );
}`}</CodeBlock>
          }
          description={
            <>
              Strict HTML components are type safe, tightly integrated with
              cross-platform styling, and exclude legacy attributes.
            </>
          }
          key="markup"
          title="Markup interfaces with strict HTML"
        />

        <Feature
          button={
            <ButtonLink to="/learn/styles/">Learn about strict CSS</ButtonLink>
          }
          code={
            <CodeBlock>{`import { html, css } from 'react-strict-dom';

const styles = css.create({
  button: {
    backgroundColor: {
      default: 'lightgray',
      ':hover': 'lightblue'
    },
    paddingBlock: '0.5rem'
    paddingInline: '1rem',
  },
})

function Button(props) {
  return (
    <html.button {...props} style={styles.button} />
  );
}`}</CodeBlock>
          }
          description={
            <>
              Strict CSS styling provides a battle-tested, predictable,
              optimized way to encapsulate component styles on both web and
              native.
              <br />
              On the web this is powered by{' '}
              <a href="https://stylexjs.com">StyleX</a>.
            </>
          }
          key="style"
          title="Style components with strict CSS"
        />

        <Feature
          button={<ButtonLink to="/learn/setup">Add to your app</ButtonLink>}
          code={
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '50%' }}>
                <CodeBlock title="Button.web.js">{`import {
  html,
  css
} from 'react-strict-dom'

const styles = css.create({
  button: {
    paddingBlock: '0.5rem'
  }
})

function Button(props) {
  return (
    <html.button
      {...props}
      style={styles.button}
    />
  )
}`}</CodeBlock>
              </div>
              <div style={{ width: '50%' }}>
                <CodeBlock title="Button.native.js">{`import {
  View,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10
  }
})

function Button(props) {
  return (
    <View
      {...props}
      style={styles.button}
    />
  )
}`}</CodeBlock>
              </div>
            </div>
          }
          description={
            <>
              Use platform-specific files and wrapper components to introduce
              cross-platform components to your app. Opt-in to platform-specific
              files to use the host platform's native APIs whenever required.
            </>
          }
          key="incremental"
          title="Adopt cross-platform incrementally"
        />

        {/*
        <Feature
          key="expo"
          title="Deploy cross-platform apps with Expo"
          description={
            <>
              Expo is designed for developers to create and deploy
              cross-platform apps.
            </>
          }
          button={
            <ButtonLink to="/learn/get-started/add-to-new-app">
              Get started with Expo
            </ButtonLink>
          }
        />
        */}
      </div>
    </section>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img height="100" src="./img/logo.svg" />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/learn/">
            Learn
          </Link>
          <Link
            className="button button--secondary button--outline button--lg"
            to="/api/"
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Description will go into a meta tag in <head />"
      title={`Hello from ${siteConfig.title}`}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
