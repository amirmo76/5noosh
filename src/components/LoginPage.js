import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class LoginPage extends React.Component {

    state = {
        emailTouched: false,
        emailValid: false,
        passTouched: false,
        passValid: false,
        error: ''
    }

    submitHandler = e => {
        e.preventDefault();
        //-------------CODE GOES HERE----------s
        const bind = this;
        if(this.state.emailValid && this.state.passValid) {
            axios({
                method: 'post',
                url: '/api/login',
                data: {
                    email: document.getElementById('email').value,
                    password: document.getElementById('pass').value,
                    remember_me: document.getElementById('remember').checked
                }
            }).then(function (response) {
                if (response.status === 200) {
                    bind.setState(() => ({error: ''}));
                    const json = JSON.stringify(response.data.data.accessToken);
                    localStorage.setItem('token', json);
                    return bind.props.history.push('/dashboard');
                }
            }).catch(function (error) {
                bind.setState(() => ({error: 'ایمیل یا رمز عبور اشتباه است'}));
            });
        } else {
            bind.setState(() => ({error: 'ورودی های خود را کنترل کنید'}));
        }
    }
    
    errorCloseHandler = e => {
        this.setState(() => ({error: ''}));
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

    componentWillMount() {
        const bind = this;
        const token = JSON.parse(localStorage.getItem('token'));
        axios({
            method: 'get',
            url: '/api/users',
            header: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            if (response.status === 200) {
                console.log('ok');
                return bind.props.history.push('/dashboard');                
            }
        }).catch(function (error) {
            console.log('not ok');
            console.log({
                'Authorization': 'Bearer ' + token
            });
            console.log(error);
        });
    }

    render() {
        return (
            <div className="login">
                <Navigation />
                <div className="login__body">
                    <div className="login__hero"></div>
                    <div className="login__box">
                        <div className={"login__error " + (this.state.error && "login__error--show")}>
                            <p className="login__error-text">{this.state.error}</p>
                            <svg className="login__error-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.9 21.9' onClick={this.errorCloseHandler}>
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
                            
                            <input type="checkbox" className="input--checkbox" id="remember" name="remember" checked/>
                            <label className="checkbox" htmlFor="remember">
                                <div className="checkbox__container">
                                    {/* <svg className="checkbox__tick" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26'>
                                        <path d='m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z'
                                        />
                                    </svg> */}
                                    <svg id='Capa_1' xmlns='http://www.w3.org/2000/svg' className="checkbox__tick"
                                    viewBox='0 0 490.434 490.433'>
                                        <path d='M472.003,58.36l-13.132-11.282c-21.798-18.732-54.554-16.644-73.799,4.697L165.39,295.359l-66.312-57.112 c-21.775-18.753-54.536-16.707-73.804,4.611l-11.611,12.848c-9.416,10.413-14.305,24.149-13.595,38.18 c0.717,14.023,6.973,27.188,17.402,36.6l121.553,111.311c10.524,9.883,24.628,15.037,39.044,14.272 c14.416-0.763,27.894-7.386,37.311-18.329l262.245-304.71c9.162-10.646,13.717-24.494,12.661-38.496 C489.229,80.522,482.655,67.512,472.003,58.36z'
                                        />
                                    </svg>
                                </div>
                                <span className="checkbox__text">من را به خاطر بسپار</span>
                            </label>

                            <button className="btn btn--fat btn--primary mg-bottom-md btn--no-up-animation btn--shadow-animation" type="submit" onClick={this.submitHandler}>ورود</button>
                            <div className="login__options">
                                <Link to="/signup" className="login__signup">حساب کاربری ندارید؟</Link>
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