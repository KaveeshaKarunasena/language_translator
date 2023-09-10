import React from 'react'
import ReactDOM from 'react-dom'
import {runWithAdal} from 'react-adal'
import App from './App.tsx'
import {authContext} from './adalConfig'
import './App.css'

const DO_NOT_LOGIN = false

const registerServiceWorker = () => {
  const token = authContext.getCachedToken(authContext.config.clientId)
  console.log('Authentication Token:', token)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js') // Specify the correct path to your service worker file
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
    registerServiceWorker() // Call the function to register the service worker
  },
  DO_NOT_LOGIN
)
