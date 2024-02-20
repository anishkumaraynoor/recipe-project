import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './context/ContextShare.jsx';
import TokenAuth from './context/TokenAuth.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TokenAuth>
      <ContextShare>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        </ContextShare>   
    </TokenAuth>
  </React.StrictMode>,
)
