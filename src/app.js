import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter , Route, Switch} from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ShopPage from './components/ShopPage';
import Product from './components/Product';
import Dashboard from './components/Dashboard';
import AboutusPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import Cart from './components/Cart';
import Result from './components/Result';
import NotFound from './components/NotFound';


import './style/style.scss';

const routes = (
    <HashRouter>
        <Switch>
            <Route path='/' component={HomePage} exact={true}/>
            <Route path='/login' component={LoginPage} exact={true} />
            <Route path='/signup' component={SignupPage} exact={true} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/product' component={Product} />
            <Route path='/dashboard' component={Dashboard} exact={true} />
            <Route path='/dashboard/notifications' component={Dashboard} exact={true} />
            <Route path='/dashboard/histories' component={Dashboard} exact={true} />
            <Route path='/aboutus' component={AboutusPage} exact={true}/>
            <Route path='/contactus' component={ContactUsPage} exact={true}/>
            <Route path='/cart' component={Cart} exact={true}/>
            <Route path='/result' component={Result}/>
            <Route component={NotFound}/>
        </Switch>
    </HashRouter>
);

function cssPropertyValueSupported(prop, value) {
    var d = document.createElement('div');
    d.style[prop] = value;
    return d.style[prop] === value;
}

// console.log(cssPropertyValueSupported('display', 'grid'));
if (cssPropertyValueSupported('display', 'grid')) {
    ReactDOM.render(routes, document.getElementById('appRoot'));
} else {
    ReactDOM.render(routes, <h3>.نسخه مرورگر شما قدیمی می باشد. با بروزرسانی آن از پنج نوش دیدن کنید</h3>);
}
// ReactDOM.render(<LoginPage />, document.getElementById('appRoot'));
// ReactDOM.render(<SignupPage />, document.getElementById('appRoot'));

