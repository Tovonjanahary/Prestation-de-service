import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalState from './context/GlobalState';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

ReactDOM.render(      
  <BrowserRouter>
    <GlobalState>
        <Layout>
          <App />
        </Layout>
    </GlobalState>
  </BrowserRouter>
,
  document.getElementById('root')
);

