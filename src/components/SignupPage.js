import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class SignupPage extends React.Component {

    state = {
        nameTouched: false,
        nameValid: false,
        phoneTouched: false,
        phoneValid: false,
        addressTouched: false,
        addressValid: false,
        emailTouched: false,
        emailValid: false,
        passTouched: false,
        passValid: false,
        passConfirmTouched: false,
        passConfirmValid: false,
        error: ''
    }

    submitHandler = e => {
        e.preventDefault();
        //-------------CODE GOES HERE----------
        if(this.state.nameValid && this.state.phoneValid && this.state.addressValid && this.state.emailValid && this.state.passValid && this.state.passConfirmValid) {
            console.log('sent');
            axios({
                method: 'post',
                url: '/api/users',
                data: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    mobile: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    password: document.getElementById('pass').value,
                    password_confirmation: document.getElementById('pass-confirm').value
                }
            }).then(function (response){
                if (response.data.status === 200) {
                    //ok
                    bind.setState(() => ({error: ''}));
                    const json = JSON.stringify(response.data.data);
                    localStorage.setItem('user', json);
                    return bind.props.history.push('/dashboard');
                } else {
                    bind.setState(() => ({error: response.data.errors}));
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

    }


    passChangeHandler = e => {
        this.setState(() => ({
            passTouched: true
        }));

        const result = (document.getElementById('pass').value.length >= 5);

        this.setState(() => ({
            passValid: result
        }));

        console.log(this.state);
    }

    passConfirmChangeHandler = e => {
        this.setState(() => ({
            passConfirmTouched: true
        }));

        const result = (document.getElementById('pass-confirm').value === document.getElementById('pass').value);

        this.setState(() => ({
            passConfirmValid: result
        }));

        console.log(this.state);
    }

    addressChangeHandler = e => {
        this.setState(() => ({
            addressTouched: true
        }));

        const result = true;

        this.setState(() => ({
            addressValid: result
        }));

        console.log(this.state);
    }

    phoneChangeHandler = e => {
        this.setState(() => ({
            phoneTouched: true
        }));

        const re = /^09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}$/;
        const result = re.test(String(document.getElementById('phone').value));

        this.setState(() => ({
            phoneValid: result
        }));

        console.log(this.state);
    }


    nameChangeHandler = e => {
        this.setState(() => ({
            nameTouched: true
        }));

        const re = /^[آ-ی ء چ]+$/;
        const result = re.test(String(document.getElementById('name').value));

        this.setState(() => ({
            nameValid: result
        }));

        console.log(this.state);
    }

    render(){
        return (
            <div className="signup">
                <Navigation />
                <div className="signup__body">
                    <div className="signup__hero"></div>
                    <div className="signup__box">
                        <div className={"signup__error " + (this.state.error && "signup__error--show")}>
                            <p className="signup__error-text">{this.state.error}</p>
                            <svg className="signup__error-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.9 21.9'>
                                <path d='M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0 c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3 s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7 s-0.1-0.5-0.3-0.7L14.1,11.3z'
                                />
                            </svg>
                        </div>
                        <form className="signup__form">
                            <div className="input__inline-group">
                                <div className="input__group">
                                    <label className="label label--secondary">نام و نام خانوادگی</label>
                                    <input id="name" className={"input input--secondary mg-bottom-md " + (this.state.nameTouched && (this.state.nameValid ? "input--valid" : "input--unvalid"))} onChange={this.nameChangeHandler} type="text" required/>
                                    <span className={"error" + ((!this.state.nameValid && this.state.nameTouched) ? ' error--show' : '')}>نام و نام خانوادگی باید با حروف فارسی نوشته شود</span>
                                </div>
    
                                <div className="input__group">
                                    <label className="label label--secondary">ایمیل</label>
                                    <input id="email" className={"input input--secondary mg-bottom-md " + (this.state.emailTouched && (this.state.emailValid ? "input--valid" : "input--unvalid"))} onChange={this.emailChangeHandler} type="email" required/>
                                    <span className={"error" + ((!this.state.emailValid && this.state.emailTouched) ? ' error--show' : '')}>ایمیل وارد شده معتبر نیست</span>
                                </div>
                            </div>
                            
                            <label className="label label--secondary">شماره همراه</label>
                            <input id="phone" className={"input input--secondary mg-bottom-md " + (this.state.phoneTouched && (this.state.phoneValid ? "input--valid" : "input--unvalid"))} onChange={this.phoneChangeHandler} type="tel" required/>
                            <span className={"error" + ((!this.state.phoneValid && this.state.phoneTouched) ? ' error--show' : '')}>شماره موبایل وارد شده معتبر نیست</span>

                            <label  className="label label--secondary">آدرس</label>
                            <input id="address" className={"input input--secondary mg-bottom-md " + (this.state.addressTouched && (this.state.addressValid ? "input--valid" : "input--unvalid"))} onChange={this.addressChangeHandler} type="text" required/>
                            <span className={"error" + ((!this.state.addressValid && this.state.addressTouched) ? ' error--show' : '')}>آدرس باید با حروف فارسی نوشته شود</span>
    
                            <div className="input__inline-group">
                                <div className="input__group">
                                    <label className="label label--secondary">رمز عبور</label>
                                    <input id="pass" className={"input input--secondary mg-bottom-md " + (this.state.passTouched && (this.state.passValid ? "input--valid" : "input--unvalid"))} onChange={this.passChangeHandler} type="password" required/>
                                    <span className={"error" + ((!this.state.passValid && this.state.passTouched) ? ' error--show' : '')}>رمز عبور باید حداقل 5 کاراکتر باشد</span>
                                </div>
    
                                <div className="input__group">
                                    <label className="label label--secondary">تایید رمز عبور</label>
                                    <input id="pass-confirm" className={"input input--secondary mg-bottom-md " + (this.state.passConfirmTouched && (this.state.passConfirmValid ? "input--valid" : "input--unvalid"))} onChange={this.passConfirmChangeHandler} type="password" required/>
                                    <span className={"error" + ((!this.state.passConfirmValid && this.state.passConfirmTouched) ? ' error--show' : '')}>با رمز عبور قبلی تطابق ندارد</span>
                                </div>
                            </div>
    
                            <div className="signup__options">
                                <Link className="mg-left-lg signup__login" to="/login">!قبلا ثبت نام کرده اید؟ برای ورود کلیک کنید</Link>
                                <button className="btn btn--outline btn--fat btn--primary" type="submit" onClick={this.submitHandler}>ثبت نام</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    } 
}