import clsx from 'clsx';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

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
