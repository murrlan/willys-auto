import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WillysAutoPrototype from './WillysAutoPrototype.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WillysAutoPrototype />
  </StrictMode>,
)
