import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter , Route} from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ShopPage from './components/ShopPage';
import Product from './components/Product';
import Dashboard from './components/Dashboard';
import AboutusPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';


import './style/style.scss';

const routes = (
    <HashRouter>
        <div>
            <Route path='/' component={HomePage} exact={true}/>
            <Route path='/login' component={LoginPage} exact={true} />
            <Route path='/signup' component={SignupPage} exact={true} />
            <Route path='/shop' component={ShopPage} exact={true}/>
            <Route path='/product' component={Product} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/aboutus' component={AboutusPage} exact={true}/>
            <Route path='/contactus' component={ContactUsPage} exact={true}/>
        </div>
    </HashRouter>
);

ReactDOM.render(routes, document.getElementById('appRoot'));
// ReactDOM.render(<LoginPage />, document.getElementById('appRoot'));
// ReactDOM.render(<SignupPage />, document.getElementById('appRoot'));

