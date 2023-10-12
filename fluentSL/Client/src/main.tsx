import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import {AuthProviderComponent} from './auth/AuthProvider.tsx'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <AuthProviderComponent>
        <App />
      </AuthProviderComponent>
    </BrowserRouter>
  </>
)
