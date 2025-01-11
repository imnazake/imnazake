// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nazake',
  tagline: 'Game Development',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://imnazake.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/imnazake',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'imnazake', // Usually your GitHub org/user name.
  projectName: 'imnazake', // Usually your repo name.
  trailingSlash: false,


  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      fontFamily: 'Roboto, sans-serif',
      
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Home',
        logo: {
          alt: '',
          src: 'img/docusaurus.png',
          style: { marginRight: '10px' },
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Blogs',
          },                     
        ],
      },
      footer: {
        style: 'dark',
        links: [     
          {
            title: 'Community',
            items: [
              {
                label: 'Patreon',
                href: 'https://www.patreon.com/imnazake',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },  
            ],
          },
          {
            title: 'Socials',
            items: [
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/@itsnazake',
              },          
              {
                label: 'Twitter (X)',
                href: 'https://x.com/imnazake',
              },           
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/imnazake',
              },
              {
                label: 'Tiktok',
                href: 'https://www.tiktok.com/@imnazake',
              },
             
            ],
          },
          {
            title: 'Others',
            items: [
              {
                label: 'Fab',
                href: 'https://www.fab.com/sellers/Nazake',
              },
              {
                label: 'Github',
                href: 'https://github.com/imnazake',
              },        
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Email',
                href: 'mailto:imnazake@gmail.com',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/users/654926717911302145',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nazake, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
      },
    }),
};

export default config;
