import React, { PropTypes } from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = ({ children }) => {
  return (
    <div>
      <Helmet
        title="LB 17' Tradeshow"
        titleTemplate="AOA - %s"
        meta={[
          { name: 'description', content: 'Trade show management tool' },
          { property: 'og:site_name', content: 'AOA tradeshow' },
          { name: 'msapplication-TileColor', content: '#ffffff' },
          { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
          { name: 'theme-color', content: '#ffffff' },
          { property: 'og:image', content: 'https://aoatradeshow.herokuapp.com/pictures/logo.jpg' },
          { property: 'og:image:type', content: 'image/png' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
        ]}
        link={[
          { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
          { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
          { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
          { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
          { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
          { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
          { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
          { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
          { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
          { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
          { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
          { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
          { rel: 'manifest', href: '/manifest.json' },
        ]}
      />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.any,
}

export default App
