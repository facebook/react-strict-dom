/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Strict DOM',
  tagline: 'Create cross-platform, platform-native interfaces using web APIs.',
  favicon: 'img/favicon.ico',
  url: 'https://facebook.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-strict-dom/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // GitHub pages deployment config.
  organizationName: 'facebook',
  projectName: 'react-strict-dom',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          //breadcrumbs: false,
          //editUrl: 'https://github.com/facebook/react-strict-dom/tree/main/apps/website/',
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
          sidebarCollapsed: false
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true
      },
      footer: {
        // Please do not remove the privacy and terms, it's a legal requirement.
        copyright: `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc. <a target="_blank" href="https://opensource.fb.com/">Meta Open Source</a>. <a target="_blank" href="https://opensource.fb.com/legal/privacy/">Privacy</a> & <a target="_blank" href="https://opensource.fb.com/legal/terms/">Terms</a>.`
      },
      // Replace with your project's social card
      image: './img/logo.svg',
      metadata: [
        {
          name: 'og:title',
          content: 'React Strict DOM'
        },
        {
          name: 'og:description',
          content:
            'Create cross-platform, platform-native interfaces using web APIs.'
        }
        /*
        {
          name: 'og:image',
          content: '',
        },
        */
      ],
      navbar: {
        title: 'React Strict DOM',
        logo: {
          alt: 'React Strict DOM',
          src: './img/logo.svg'
        },
        items: [
          {
            label: 'API',
            position: 'left',
            sidebarId: 'apiSidebar',
            type: 'docSidebar'
          },
          {
            label: 'Contribute',
            position: 'left',
            sidebarId: 'contributeSidebar',
            type: 'docSidebar'
          },
          {
            'aria-label': 'GitHub',
            className: 'navbar-github-link',
            href: 'https://github.com/facebook/react-strict-dom',
            position: 'right'
          }
        ]
      },
      prism: {
        darkTheme: prismThemes.dracula,
        theme: prismThemes.github
      }
    }
};

export default config;
