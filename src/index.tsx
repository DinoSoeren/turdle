import './index.css'

import { CookieConsentProvider } from '@use-cookie-consent/react'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AlertProvider } from './context/AlertContext'
import { GaProvider } from './context/GaContext'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <CookieConsentProvider>
      <GaProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </GaProvider>
    </CookieConsentProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
