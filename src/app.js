import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './style/style.scss';

const routes = (
    <BrowserRouter>
        <div>
            <Route path='/' component={HomePage} exact={true}/>
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('appRoot'));
// ReactDOM.render(<LoginPage />, document.getElementById('appRoot'));
// ReactDOM.render(<SignupPage />, document.getElementById('appRoot'));

