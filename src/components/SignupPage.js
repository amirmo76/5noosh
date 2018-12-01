import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';


export default class SignupPage extends React.Component {

    submitHandler = e => {
        e.preventDefault();
        //-------------CODE GOES HERE----------
        
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
                                    <input className="input input--secondary mg-bottom-md" type="text" required/>
                                </div>
    
                                <div className="input__group">
                                    <label className="label label--secondary">ایمیل</label>
                                    <input className="input input--secondary mg-bottom-md" type="email" required/>
                                </div>
                            </div>
                            
                            <label className="label label--secondary">شماره همراه</label>
                            <input className="input input--secondary mg-bottom-md" type="tel" required/>
                            <label className="label label--secondary">آدرس</label>
                            <input className="input input--secondary mg-bottom-md" type="text" required/>
    
                            <div className="input__inline-group">
                                <div className="input__group">
                                    <label className="label label--secondary">رمز عبور</label>
                                    <input className="input input--secondary mg-bottom-md" type="password" required/>
                                </div>
    
                                <div className="input__group">
                                    <label className="label label--secondary">تایید رمز عبور</label>
                                    <input className="input input--secondary mg-bottom-lg" type="password" required/>
                                </div>
                            </div>
    
                            <div className="signup__options">
                                <a className="mg-left-lg">!قبلا ثبت نام کرده اید؟ برای ورود کلیک کنید</a>
                                <button className="btn btn--outline btn--fat btn--tall btn--primary" type="submit" onClick={this.submitHandler}>ثبت نام</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    } 
}