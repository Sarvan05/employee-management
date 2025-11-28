import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainApp from './App.jsx'
import { AuthenticationProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <MainApp />
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
