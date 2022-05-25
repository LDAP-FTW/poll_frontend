import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthProvider } from 'react-auth-kit'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authType='localstorage' authName='_ldap'>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
