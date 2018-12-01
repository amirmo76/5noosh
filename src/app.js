import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './style/style.scss';

ReactDOM.render(<HomePage />, document.getElementById('appRoot'));
// ReactDOM.render(<LoginPage />, document.getElementById('appRoot'));
// ReactDOM.render(<SignupPage />, document.getElementById('appRoot'));

