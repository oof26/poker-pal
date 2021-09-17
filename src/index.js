import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CookiesProvider, Provider} from 'react-cookie';
import './index.css';
import {LoginPage} from "./LoginPage";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let logged = cookies.get('loggedIn');

if (!logged){
  ReactDOM.render(
    <CookiesProvider>
      <LoginPage/>
    </CookiesProvider>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <CookiesProvider>
      <App />
    </CookiesProvider>,
    document.getElementById('root')
  );
}

