import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default class Result extends React.Component {

    state = {
        success: false,
        error: false
    }

    componentDidMount () {
        const id = this.props.location.pathname.split('/')[2];

        if (!id || (id !== 'success' && id !== 'failure')){
            this.setState(() => ({error: true}));
            return;  
        }

        if (id === 'success') {
            this.setState(() => ({success: true}));
        }
    }

    render () {
        if (this.state.error) {
            return (
                <p>this is a placeholder for 404 page</p>
            );
        }
        
        return (
            <div className="result-page">
                <Navigation />
                <div className="result">
                    {
                        this.state.success ? (
                            <div className="result__answer">
                                <svg className="result__icon" id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 504.12 504.12'>
                                    <circle cx='252.06' cy='252.06' r='252.06' fill='#3db39e' />
                                    <path d='M463.163,114.609L240.246,345.403l0.394,24.812h10.24l241.428-194.56	C485.218,153.994,475.372,133.12,463.163,114.609z'
                                    fill='#37a18e' />
                                    <path d='M499.397,103.582l-44.505-44.111c-5.908-5.908-15.754-5.908-22.055,0L242.609,256l-82.314-81.132	c-5.908-5.908-15.754-5.908-22.055,0l-39.385,38.991c-5.908,5.908-5.908,15.754,0,21.662L230.4,365.883	c3.545,3.545,8.271,4.726,12.997,4.332c4.726,0.394,9.452-0.788,12.997-4.332l243.003-240.246	C505.305,119.335,505.305,109.489,499.397,103.582z'
                                    fill='#f2f1ef' />
                                    <path d='M256.394,365.883l243.003-240.246c5.908-5.908,5.908-15.754,0-21.662l-7.089-6.695L243.003,342.252	L105.157,207.951l-5.908,5.908c-5.908,5.908-5.908,15.754,0,21.662l131.545,130.363c3.545,3.545,8.271,4.726,12.997,4.332	C248.123,370.609,252.849,369.428,256.394,365.883z'
                                    fill='#e6e5e3' />
                                </svg>
                                <p className="result__text">.سفارش شما با موفقیت ثبت شد. می توانید
                                    در
                                    &nbsp;                            
                                    <Link to="/dashboard" className="result__dashboard-link">
                                    پنل کاربری 
                                    </Link>    
                                    &nbsp;                     
                                    سفارش خود را پیگیری کنید
                                </p>
                            </div>
                        ) : (
                            <div className="result__answer">
                                <svg className="result__icon" id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
                                    <circle cx='25' cy='25' r='25' fill='#d75a4a' />
                                    <polyline points='16,34 25,25 34,16' fill='none' stroke='#fff' strokeWidth='2'
                                    strokeLinecap='round' strokeMiterlimit='10' />
                                    <polyline points='16,16 25,25 34,34' fill='none' stroke='#fff' strokeWidth='2'
                                    strokeLinecap='round' strokeMiterlimit='10' />
                                </svg>
                                <p className="result__text">.ثبت سفارش شما با موفقیت انجام نشد</p>
                            </div>
                        )
                    }
                </div>
                <Footer />
            </div>
        );
    }
}