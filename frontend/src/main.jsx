import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( //montar react en html
  <StrictMode>
    <App />
  </StrictMode>,
)
