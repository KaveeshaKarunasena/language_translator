import React from 'react'
import ReactDOM from 'react-dom'
import {runWithAdal} from 'react-adal'
import App from './App.tsx'
import {authContext} from './adalConfig'
import './App.css'

const DO_NOT_LOGIN = false

interface TokenClaims {
  sub: string
  email: string
}

const registerServiceWorker = () => {
  // Obtain the authentication token (make it nullable)
  const token: string | null | undefined = authContext.getCachedToken(
    authContext.config.clientId
  )

  if (token !== null && token !== undefined) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const decodedToken: TokenClaims = JSON.parse(atob(base64))

    const userEmail = decodedToken.email

    console.log('User Email:', userEmail)
  } else {
    console.warn('Token is null or undefined')
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope)
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  }
}

runWithAdal(
  authContext,
  () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
    registerServiceWorker()
  },
  DO_NOT_LOGIN
)
