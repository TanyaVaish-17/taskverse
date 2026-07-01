import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-right" toastOptions={{
      style: {
        background: '#221f1c',
        color: '#e7e5e4',
        border: '1px solid #332e29',
      },
    }} />
    <App />
  </StrictMode>,
)