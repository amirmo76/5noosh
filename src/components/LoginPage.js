import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { Route, Redirect } from 'react-router';

export default class LoginPage extends React.Component {

    state = {
        emailTouched: false,
        emailValid: false,
        passTouched: false,
        passValid: false
    }

    submitHandler = e => {
        e.preventDefault();
        //-------------CODE GOES HERE----------s
        if(this.state.emailValid && this.state.passValid) {
            axios({
                method: 'post',
                url: '/api/users/login',
                data: {
                    email: document.getElementById('email').value,
                    password: document.getElementById('pass').value
                }
            }).then(function (response) {
                if (response.data.status === 200) {
                    //ok
                    const json = JSON.stringify(response.data.data);
                    localStorage.setItem('user', json);
                    <Redirect to="/dashboard" />
                } else if (response.data.status === 404) {
                    //email not found
                } else if (response.data.status === 422) {
                    //validation
                } else if (response.data.status === 401) {
                    //pass
                }
            });
        }
    }

    emailChangeHandler = e => {
        this.setState(() => ({
            emailTouched: true
        }));

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = re.test(String(document.getElementById('email').value).toLowerCase());

        this.setState(() => ({
            emailValid: result
        }));

        console.log(this.state);
    }


    passChangeHandler = e => {
        this.setState(() => ({
            passTouched: true
        }));

        const result = (document.getElementById('pass').value.length >= 5);

        this.setState(() => ({
            passValid: result
        }));

    }

    render() {
        return (
            <div className="login">
                <Navigation />
                <div className="login__body">
                    <div className="login__hero"></div>
                    <div className="login__box">
                        <div className="login__error">
                            <p className="login__error-text">ایمیل و یا رمز عبور وارد شده صحیح نمی باشد</p>
                            <svg className="login__error-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.9 21.9'>
                                <path d='M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0 c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3 s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7 s-0.1-0.5-0.3-0.7L14.1,11.3z'
                                />
                            </svg>
                        </div>
                        <form className="login__form">
                            <label className="label label--secondary">ایمیل</label>
                            <input id="email" className={"input input--secondary mg-bottom-md " + (this.state.emailTouched && (this.state.emailValid ? "input--valid" : "input--unvalid"))} type="email" onChange={this.emailChangeHandler} required/>
                            <span className={"error" + ((!this.state.emailValid && this.state.emailTouched) ? ' error--show' : '')}>ایمیل وارد شده معتبر نیست</span>

                            <label className="label label--secondary">رمز عبور</label>
                            <input id="pass" className={"input input--secondary mg-bottom-md " + (this.state.passTouched && (this.state.passValid ? "input--valid" : "input--unvalid"))} type="password" onChange={this.passChangeHandler} required/>
                            <span className={"error" + ((!this.state.passValid && this.state.passTouched) ? ' error--show' : '')}>رمز عبور باید حداقل 5 کاراکتر باشد</span>

                            <button className="btn btn--fat btn--primary mg-bottom-md" type="submit" onClick={this.submitHandler}>ورود</button>
                            <div className="login__options">
                                <a>حساب کاربری ندارید؟</a>
                                <a>رمز عبور خود را فراموش کرده اید؟</a>
                            </div>
                        </form>
    
                        <div className="login__content">
                            <h2 className="login__title mg-bottom-sm">خوش آمدید</h2>
                            <p className="login__text mg-bottom-md">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                            <h2 className="login__title mg-bottom-sm">توضیحاتی کوتاه</h2>
                            <p className="login__text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    }
}