import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';


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
        passConfirmValid: false
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
                console.log(response.data);  
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
                        <form className="signup__form">
                            <div className="input__inline-group">
                                <div className="input__group">
                                    <label className="label label--secondary">نام و نام خانوادگی</label>
                                    <input id="name" className={"input input--secondary mg-bottom-md " + (this.state.nameTouched && (this.state.nameValid ? "input--valid" : "input--unvalid"))} onChange={this.nameChangeHandler} type="text" required/>
                                </div>
    
                                <div className="input__group">
                                    <label className="label label--secondary">ایمیل</label>
                                    <input id="email" className={"input input--secondary mg-bottom-md " + (this.state.emailTouched && (this.state.emailValid ? "input--valid" : "input--unvalid"))} onChange={this.emailChangeHandler} type="email" required/>
                                </div>
                            </div>
                            
                            <label className="label label--secondary">شماره همراه</label>
                            <input id="phone" className={"input input--secondary mg-bottom-md " + (this.state.phoneTouched && (this.state.phoneValid ? "input--valid" : "input--unvalid"))} onChange={this.phoneChangeHandler} type="tel" required/>
                            <label  className="label label--secondary">آدرس</label>
                            <input id="address" className={"input input--secondary mg-bottom-md " + (this.state.addressTouched && (this.state.addressValid ? "input--valid" : "input--unvalid"))} onChange={this.addressChangeHandler} type="text" required/>
    
                            <div className="input__inline-group">
                                <div className="input__group">
                                    <label className="label label--secondary">رمز عبور</label>
                                    <input id="pass" className={"input input--secondary mg-bottom-md " + (this.state.passTouched && (this.state.passValid ? "input--valid" : "input--unvalid"))} onChange={this.passChangeHandler} type="password" required/>
                                </div>
    
                                <div className="input__group">
                                    <label className="label label--secondary">تایید رمز عبور</label>
                                    <input id="pass-confirm" className={"input input--secondary mg-bottom-md " + (this.state.passConfirmTouched && (this.state.passConfirmValid ? "input--valid" : "input--unvalid"))} onChange={this.passConfirmChangeHandler} type="password" required/>
                                </div>
                            </div>
    
                            <div className="signup__options">
                                <a className="mg-left-lg">!قبلا ثبت نام کرده اید؟ برای ورود کلیک کنید</a>
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