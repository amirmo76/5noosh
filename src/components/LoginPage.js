import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';


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
            console.log('sent');
            axios({
                method: 'post',
                url: 'localhost:8080/api/user/login',
                data: {
                    email: document.getElementById('email').value,
                    password: document.getElementById('pass').value
                }
            }).then(function (response) {
                console.log(response);
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

        console.log(this.state);
    }

    render() {
        return (
            <div className="login">
                <Navigation />
                <div className="login__body">
                    <div className="login__hero"></div>
                    <div className="login__box">
                        <form className="login__form">
                            <label className="label label--secondary">ایمیل</label>
                            <input id="email" className={"input input--secondary mg-bottom-md " + (this.state.emailTouched && (this.state.emailValid ? "input--valid" : "input--unvalid"))} type="email" onChange={this.emailChangeHandler} required/>
                            <label className="label label--secondary">رمز عبور</label>
                            <input id="pass" className={"input input--secondary mg-bottom-lg " + (this.state.passTouched && (this.state.passValid ? "input--valid" : "input--unvalid"))} type="password" onChange={this.passChangeHandler} required/>
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